'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, PlusCircle, Inbox, Trash2, User, Phone, GraduationCap, Users2, Building, Bell, FileText, Calendar, Upload } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const iconOptions = [
        { value: 'Bell', icon: <Bell className="h-4 w-4" /> },
        { value: 'FileText', icon: <FileText className="h-4 w-4" /> },
        { value: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
    ];

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
    
    const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const wb = XLSX.read(data, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const importedData: GridData = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });

                if (!importedData || importedData.length === 0) {
                    toast({
                        variant: 'destructive',
                        title: 'Import Error',
                        description: 'The selected file is empty or could not be read.',
                    });
                    return;
                }
                
                setGridData(importedData);
                toast({
                    title: 'Import Successful',
                    description: `Data from "${file.name}" has been loaded. Review and click "Save Changes" to make it permanent.`,
                });

            } catch (error) {
                console.error("Failed to import file:", error);
                toast({
                    variant: 'destructive',
                    title: 'Import Error',
                    description: 'Failed to read the file. Please ensure it is a valid Excel or CSV file.',
                });
            } finally {
                if (event.target) {
                    event.target.value = "";
                }
            }
        };
        reader.readAsBinaryString(file);
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
                <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-none sm:inline-flex sm:w-auto">
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
                                    {headers.map((header, colIndex) => {
                                        const headerName = String(header).toLowerCase();
                                        const isGeneralNoticeIconColumn = activeSheetName === 'GeneralNotices' && headerName === 'icon';

                                        return (
                                            <TableCell key={colIndex} className="p-0 border-r">
                                                {isGeneralNoticeIconColumn ? (
                                                    <Select
                                                        value={row[colIndex] || ''}
                                                        onValueChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                                                    >
                                                        <SelectTrigger className="w-full h-full p-2 border-none rounded-none focus:ring-1 focus:ring-primary/50 bg-transparent text-sm">
                                                            <SelectValue placeholder="Select icon..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {iconOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.value}>
                                                                    <div className="flex items-center gap-2">
                                                                        {opt.icon}
                                                                        <span>{opt.value}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Input
                                                        type="text"
                                                        value={row[colIndex] || ''}
                                                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                                        className="w-full h-full p-2 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary/50 bg-transparent"
                                                    />
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell className="sticky right-0 z-10 p-1 bg-card border-r">
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
                
                {activeSheetName === 'Results' && (
                    <div className="flex justify-start mt-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileImport}
                            className="hidden"
                            accept=".xlsx, .xls, .csv"
                        />
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            Import Results
                        </Button>
                    </div>
                )}
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
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const formatTime = (timestamp: Timestamp | Date | undefined) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

type Inquiry = {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    nationality: string;
    citizenshipNo?: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    permanentAddress: string;
    district: string;
    province: string;
    applyingFor?: string;
    previousSchool: string;
    lastClassCompleted: string;
    gpa: string;
    achievements?: string;
    fatherName: string;
    fatherPhone: string;
    fatherOccupation: string;
    fatherEmail?: string;
    motherName: string;
    motherPhone: string;
    motherOccupation: string;
    motherEmail?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianRelationship?: string;
    guardianEmail?: string;
    createdAt: Timestamp;
};


type Message = {
    id: string; fullName: string; email: string; subject: string; message: string; createdAt: Timestamp;
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
    value ? (
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <Label className="text-right text-muted-foreground pt-1">{label}</Label>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    ) : null
);

const DetailSection = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="space-y-4">
        <h4 className="flex items-center gap-3 font-semibold text-lg text-primary border-b pb-2">
            <Icon className="w-5 h-5" />
            <span>{title}</span>
        </h4>
        <div className="space-y-3 pl-2">{children}</div>
    </div>
);


const AdmissionsTab = () => {
    const firestore = useFirestore();
    const inquiriesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'admissionInquiries'), orderBy('createdAt', 'desc'));
    }, [firestore]);
    const { data: inquiries, loading } = useCollection<Inquiry>(inquiriesQuery);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

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
    
    const formatApplyingFor = (value?: string) => {
        if (!value) return 'Not Specified';
        return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <>
            <div className="border-b border-border/50 pb-4 mb-6">
                <h3 className="text-lg font-semibold">Received Applications ({inquiries.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inquiries.map((inquiry) => (
                    <Card
                        key={inquiry.id}
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
                        onClick={() => setSelectedInquiry(inquiry)}
                    >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b">
                            <CardTitle className="text-base font-semibold">{inquiry.firstName} {inquiry.lastName}</CardTitle>
                             <div className="text-xs text-muted-foreground text-right shrink-0 ml-2">
                                <div>{formatDate(inquiry.createdAt)}</div>
                                <div className='text-gray-400'>{formatTime(inquiry.createdAt)}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-sm text-muted-foreground">
                                Applying for: <span className="font-medium text-foreground/80">{formatApplyingFor(inquiry.applyingFor)}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <Dialog open={!!selectedInquiry} onOpenChange={(isOpen) => !isOpen && setSelectedInquiry(null)}>
                <DialogContent className="sm:max-w-3xl bg-card/80 backdrop-blur-xl p-0">
                    <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="text-2xl">Admission Inquiry</DialogTitle>
                        <DialogDescription>
                            Submitted by {selectedInquiry?.firstName} {selectedInquiry?.lastName} on {formatDate(selectedInquiry?.createdAt)}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInquiry && (
                        <div className="grid gap-8 py-4 px-6 text-sm max-h-[75vh] overflow-y-auto">
                            <DetailSection icon={User} title="Personal Information">
                                <DetailItem label="Full Name" value={`${selectedInquiry.firstName} ${selectedInquiry.lastName}`} />
                                <DetailItem label="Date of Birth" value={selectedInquiry.dob} />
                                <DetailItem label="Gender" value={selectedInquiry.gender} />
                                <DetailItem label="Nationality" value={selectedInquiry.nationality} />
                                <DetailItem label="Citizenship No." value={selectedInquiry.citizenshipNo} />
                            </DetailSection>

                            <DetailSection icon={Phone} title="Contact Information">
                                <DetailItem label="Email" value={selectedInquiry.email} />
                                <DetailItem label="Phone" value={selectedInquiry.phone} />
                                <DetailItem label="Alternate Phone" value={selectedInquiry.alternatePhone} />
                                <DetailItem label="Address" value={`${selectedInquiry.permanentAddress}, ${selectedInquiry.district}, ${selectedInquiry.province}`} />
                            </DetailSection>

                            <DetailSection icon={GraduationCap} title="Academic Information">
                                <DetailItem label="Applying For" value={formatApplyingFor(selectedInquiry.applyingFor)} />
                                <DetailItem label="Previous School" value={selectedInquiry.previousSchool} />
                                <DetailItem label="Last Class Completed" value={selectedInquiry.lastClassCompleted} />
                                <DetailItem label="GPA / Percentage" value={selectedInquiry.gpa} />
                                <DetailItem label="Achievements" value={selectedInquiry.achievements} />
                            </DetailSection>
                            
                            <DetailSection icon={Users2} title="Parent/Guardian Information">
                                <h5 className="font-semibold text-foreground/90 text-md">Father's Details</h5>
                                <div className="border-l-2 border-border/30 pl-4 space-y-3">
                                  <DetailItem label="Name" value={selectedInquiry.fatherName} />
                                  <DetailItem label="Phone" value={selectedInquiry.fatherPhone} />
                                  <DetailItem label="Occupation" value={selectedInquiry.fatherOccupation} />
                                  <DetailItem label="Email" value={selectedInquiry.fatherEmail} />
                                </div>

                                <h5 className="font-semibold text-foreground/90 text-md pt-4 mt-4 border-t border-border/50">Mother's Details</h5>
                                 <div className="border-l-2 border-border/30 pl-4 space-y-3">
                                    <DetailItem label="Name" value={selectedInquiry.motherName} />
                                    <DetailItem label="Phone" value={selectedInquiry.motherPhone} />
                                    <DetailItem label="Occupation" value={selectedInquiry.motherOccupation} />
                                    <DetailItem label="Email" value={selectedInquiry.motherEmail} />
                                </div>

                                {selectedInquiry.guardianName && (
                                    <>
                                    <h5 className="font-semibold text-foreground/90 text-md pt-4 mt-4 border-t border-border/50">Guardian's Details</h5>
                                     <div className="border-l-2 border-border/30 pl-4 space-y-3">
                                        <DetailItem label="Name" value={selectedInquiry.guardianName} />
                                        <DetailItem label="Relationship" value={selectedInquiry.guardianRelationship} />
                                        <DetailItem label="Phone" value={selectedInquiry.guardianPhone} />
                                        <DetailItem label="Email" value={selectedInquiry.guardianEmail} />
                                     </div>
                                    </>
                                )}
                            </DetailSection>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

const ContactTab = () => {
    const firestore = useFirestore();
    const messagesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'messages'), orderBy('createdAt', 'desc'));
    }, [firestore]);
    const { data: messages, loading } = useCollection<Message>(messagesQuery);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);


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
        <>
            <div className="border-b border-border/50 pb-4 mb-6">
                <h3 className="text-lg font-semibold">Received Messages ({messages.length})</h3>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages.map((msg) => (
                    <Card
                        key={msg.id}
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
                        onClick={() => setSelectedMessage(msg)}
                    >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b">
                            <CardTitle className="text-base font-semibold">{msg.fullName}</CardTitle>
                            <div className="text-xs text-muted-foreground text-right shrink-0 ml-2">
                                <div>{formatDate(msg.createdAt)}</div>
                                <div className='text-gray-400'>{formatTime(msg.createdAt)}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-sm text-muted-foreground truncate" title={msg.subject}>
                                Subject: <span className="font-medium text-foreground/80">{msg.subject}</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <Dialog open={!!selectedMessage} onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}>
                <DialogContent className="sm:max-w-[600px] bg-card/80 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Contact Message</DialogTitle>
                        <DialogDescription>
                            From {selectedMessage?.fullName} on {formatDate(selectedMessage?.createdAt)}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedMessage && (
                        <div className="grid gap-6 py-4 text-sm">
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="name" className="text-right text-muted-foreground">From</Label>
                                <p id="name" className="font-semibold text-foreground">{selectedMessage.fullName}</p>
                            </div>
                             <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="email" className="text-right text-muted-foreground">Email</Label>
                                <p id="email" className="text-foreground">{selectedMessage.email}</p>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <Label htmlFor="subject" className="text-right text-muted-foreground">Subject</Label>
                                <p id="subject" className="font-semibold text-foreground">{selectedMessage.subject}</p>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                                <Label htmlFor="message" className="text-right text-muted-foreground pt-1">Message</Label>
                                <p id="message" className="text-foreground bg-muted/50 p-4 rounded-md border whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default function AdminView({ initialBase64Data }: { initialBase64Data: string }) {
    const [activeTab, setActiveTab] = useState("admissions");

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
                        <TabsList className="grid w-full h-auto grid-cols-1 rounded-lg md:h-12 md:grid-cols-3 md:rounded-full max-w-lg mx-auto">
                            <TabsTrigger value="admissions">Admissions</TabsTrigger>
                            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
                            <TabsTrigger value="notice">Notice Editor</TabsTrigger>
                        </TabsList>
                        <TabsContent value="admissions" className='mt-6'>
                           <AdmissionsTab />
                        </TabsContent>
                        <TabsContent value="contact" className='mt-6'>
                           <ContactTab />
                        </TabsContent>
                         <TabsContent value="notice" className='mt-6'>
                           <ExcelEditor initialBase64Data={initialBase64Data} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
