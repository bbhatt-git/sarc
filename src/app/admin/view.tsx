'use client';

import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, PlusCircle, Inbox, Trash2 } from 'lucide-react';
import { saveExcelFile } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query, Timestamp } from 'firebase/firestore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Excel Editor Component
type GridData = any[][];

const calculateGradeFromGPA = (gpa: number): { grade: string; remarks: 'Pass' | 'Fail' } => {
    if (gpa >= 3.6) return { grade: 'A+', remarks: 'Pass' };
    if (gpa >= 3.2) return { grade: 'A', remarks: 'Pass' };
    if (gpa >= 2.8) return { grade: 'B+', remarks: 'Pass' };
    if (gpa >= 2.4) return { grade: 'B', remarks: 'Pass' };
    if (gpa >= 2.0) return { grade: 'C+', remarks: 'Pass' };
    if (gpa >= 1.6) return { grade: 'C', remarks: 'Pass' };
    if (gpa >= 1.2) return { grade: 'D+', remarks: 'Pass' };
    if (gpa >= 0.8) return { grade: 'D', remarks: 'Pass' };
    return { grade: 'NG', remarks: 'Fail' };
};

const ExcelEditor = ({ initialBase64Data }: { initialBase64Data: string }) => {
    const { toast } = useToast();
    const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
    const [activeSheetName, setActiveSheetName] = useState<string>('');
    const [gridData, setGridData] = useState<GridData>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);

    useEffect(() => {
        try {
            const wb = XLSX.read(initialBase64Data, { type: 'base64', cellDates: true, dateNF: 'yyyy-mm-dd' });
            setWorkbook(wb);
            const firstSheetName = wb.SheetNames[0];
            if (firstSheetName) {
                setActiveSheetName(firstSheetName);
            }
        } catch (error) {
            console.error("Failed to parse Excel data:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to read the Excel file format.',
            });
        }
    }, [initialBase64Data, toast]);

    useEffect(() => {
        if (workbook && activeSheetName) {
            const worksheet = workbook.Sheets[activeSheetName];
            if (worksheet) {
                const data: GridData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
                setGridData(data);
            }
        }
    }, [workbook, activeSheetName]);

    const { sheetNames, headers, bodyData } = useMemo(() => {
        const sheetNames = workbook?.SheetNames || [];
        const headers = gridData[0] || [];
        const bodyData = gridData.slice(1);
        return { sheetNames, headers, bodyData };
    }, [workbook, gridData]);

    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const updatedGridData = [...gridData];
        const actualRowIndex = rowIndex + 1;

        if (updatedGridData[actualRowIndex]) {
            const newRow = [...updatedGridData[actualRowIndex]];
            newRow[colIndex] = value;

            if (activeSheetName === 'Results' && headers.length > 0) {
                const gpaIndex = headers.findIndex(h => String(h).toLowerCase() === 'gpa');
                const gradeIndex = headers.findIndex(h => String(h).toLowerCase() === 'grade');
                const remarksIndex = headers.findIndex(h => String(h).toLowerCase() === 'remarks');

                if (colIndex === gpaIndex && gpaIndex !== -1 && gradeIndex !== -1 && remarksIndex !== -1) {
                    const gpa = parseFloat(value);
                    if (!isNaN(gpa)) {
                        const { grade, remarks } = calculateGradeFromGPA(gpa);
                        newRow[gradeIndex] = grade;
                        newRow[remarksIndex] = remarks;
                    } else {
                        newRow[gradeIndex] = '';
                        newRow[remarksIndex] = '';
                    }
                }
            }
            updatedGridData[actualRowIndex] = newRow;
            setGridData(updatedGridData);
        }
    };

    const handleAddNewRow = () => {
        const numCols = gridData[0]?.length || 1;
        const newRow = Array(numCols).fill('');
        setGridData([...gridData, newRow]);
        toast({ title: 'Row Added', description: 'A new row has been added to the end of the sheet.' });
    };
    
    const triggerRemoveRow = (rowIndex: number) => {
        setRowToDelete(rowIndex);
    };

    const confirmRemoveRow = () => {
        if (rowToDelete === null) return;
        
        const updatedGridData = gridData.filter((_, index) => index !== rowToDelete + 1);
        setGridData(updatedGridData);
        toast({ 
            title: 'Row Removed', 
            description: `Row ${rowToDelete + 1} has been removed. Save your changes to make it permanent.` 
        });
        setRowToDelete(null);
    };

    const handleSaveChanges = async () => {
        if (!workbook || !activeSheetName) return;

        setIsSaving(true);
        try {
            const newWorkbook: XLSX.WorkBook = { ...workbook };
            newWorkbook.Sheets = { ...workbook.Sheets };

            const newSheet = XLSX.utils.aoa_to_sheet(gridData, { dateNF: 'yyyy-mm-dd' });
            newWorkbook.Sheets[activeSheetName] = newSheet;

            const newBase64 = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'base64' });
            const result = await saveExcelFile(newBase64);

            if (result.success) {
                toast({ title: 'Success!', description: result.message });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Failed to save Excel data:", error);
            toast({
                variant: 'destructive',
                title: 'Error Saving File',
                description: error instanceof Error ? error.message : 'An unknown error occurred.',
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (!workbook) {
        return <div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <p className="text-sm text-muted-foreground flex-1">
                    Note: The changes you commit here will be saved in the <code>public/data/notice.xlsx</code> file.
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button onClick={handleAddNewRow} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Row</Button>
                    <Button onClick={handleSaveChanges} disabled={isSaving} size="sm">
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>
            <Tabs value={activeSheetName} onValueChange={setActiveSheetName} className="w-full">
                <TabsList>
                    {sheetNames.map((name) => (
                        <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
                    ))}
                </TabsList>

                <div className="mt-6 relative max-h-[65vh] overflow-auto border rounded-lg">
                    <Table>
                        <TableHeader className="sticky top-0 z-20 bg-muted/80 backdrop-blur-sm">
                            <TableRow>
                                <TableHead className="sticky left-0 z-30 w-16 border-r bg-muted/95 text-center font-bold">#</TableHead>
                                {headers.map((header, colIndex) => (
                                    <TableHead key={colIndex} className="p-2.5 text-center font-bold whitespace-nowrap border-r">{header}</TableHead>
                                ))}
                                <TableHead className="sticky right-0 z-30 p-2.5 text-center font-bold bg-muted/95">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bodyData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    <TableCell className="sticky left-0 z-10 w-16 border-r text-center font-medium bg-muted">{rowIndex + 1}</TableCell>
                                    {headers.map((_, colIndex) => (
                                        <TableCell key={colIndex} className="p-0 border-r">
                                            <Input
                                                type="text"
                                                value={row[colIndex] || ''}
                                                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                                className="w-full h-full p-2 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary/50 bg-transparent"
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell className="sticky right-0 z-10 p-1 bg-card">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/50"
                                            onClick={() => triggerRemoveRow(rowIndex)}
                                            aria-label="Remove row"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Tabs>
            <AlertDialog open={rowToDelete !== null} onOpenChange={(open) => !open && setRowToDelete(null)}>
                <AlertDialogContent className="bg-card/60 backdrop-blur-xl border-border/50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete row {rowToDelete !== null ? rowToDelete + 1 : ''}. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="bg-transparent pt-4">
                        <AlertDialogCancel onClick={() => setRowToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmRemoveRow} 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete Row
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const formatDate = (timestamp: Timestamp | Date | undefined) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return date.toLocaleDateString();
}

const AdmissionsTab = () => {
    const firestore = useFirestore();
    const inquiriesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'admissionInquiries'), orderBy('createdAt', 'desc'));
    }, [firestore]);
    const { data: inquiries, loading } = useCollection<{
        id: string; parentName: string; studentName: string; studentAge: number; email: string; phone: string; gradeLevel: string; message?: string; createdAt: Timestamp;
    }>(inquiriesQuery);

    if (loading) return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (!inquiries || inquiries.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
                <Inbox className="h-12 w-12" />
                <h3 className="text-lg font-semibold">No Inquiries Yet</h3>
                <p>New admission inquiries will appear here as they are submitted.</p>
            </div>
        );
    }

    return (
        <div className="mt-6 relative max-h-[70vh] overflow-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
                    <TableRow>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Parent Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="min-w-[200px]">Message</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                            <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                            <TableCell className="font-medium">{inquiry.studentName}</TableCell>
                            <TableCell>{inquiry.studentAge}</TableCell>
                            <TableCell>{inquiry.gradeLevel}</TableCell>
                            <TableCell>{inquiry.parentName}</TableCell>
                            <TableCell>{inquiry.email}</TableCell>
                            <TableCell>{inquiry.phone}</TableCell>
                            <TableCell>{inquiry.message || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const ContactTab = () => {
    const firestore = useFirestore();
    const messagesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'messages'), orderBy('createdAt', 'desc'));
    }, [firestore]);
    const { data: messages, loading } = useCollection<{
        id: string; fullName: string; email: string; subject: string; message: string; createdAt: Timestamp;
    }>(messagesQuery);

    if (loading) return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (!messages || messages.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
                <Inbox className="h-12 w-12" />
                <h3 className="text-lg font-semibold">No Messages Yet</h3>
                <p>New contact messages will appear here as they are submitted.</p>
            </div>
        );
    }
    
    return (
        <div className="mt-6 relative max-h-[70vh] overflow-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
                    <TableRow>
                        <TableHead>Received</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="min-w-[300px]">Message</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messages.map((msg) => (
                        <TableRow key={msg.id}>
                            <TableCell>{formatDate(msg.createdAt)}</TableCell>
                            <TableCell className="font-medium">{msg.fullName}</TableCell>
                            <TableCell>{msg.email}</TableCell>
                            <TableCell>{msg.subject}</TableCell>
                            <TableCell>{msg.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default function AdminView({ initialBase64Data }: { initialBase64Data: string }) {
    const [activeTab, setActiveTab] = useState("notice");

    return (
        <div className="container mx-auto px-4">
            <Card className="testimonial-card">
                <CardHeader>
                    <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                    {activeTab === 'notice' && <CardDescription>Manage website notices and result data.</CardDescription>}
                    {activeTab === 'admissions' && <CardDescription>View all submitted admission inquiries.</CardDescription>}
                    {activeTab === 'contact' && <CardDescription>View all submitted contact form messages.</CardDescription>}
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-lg">
                            <TabsTrigger value="notice">Notice Editor</TabsTrigger>
                            <TabsTrigger value="admissions">Admissions</TabsTrigger>
                            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
                        </TabsList>
                        <TabsContent value="notice">
                           <ExcelEditor initialBase64Data={initialBase64Data} />
                        </TabsContent>
                        <TabsContent value="admissions">
                           <AdmissionsTab />
                        </TabsContent>
                        <TabsContent value="contact">
                           <ContactTab />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
