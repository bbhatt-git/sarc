'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, PlusCircle, Inbox, Trash2, User, Phone, GraduationCap, Users2, Building, Bell, FileText, Calendar as CalendarIcon, Upload, AlertTriangle, Award, School, Bold, Italic, Heading3, List, Edit, Download } from 'lucide-react';
import { saveExcelFile } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query, Timestamp } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
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
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const ToolbarButton = ({ onClick, children, label }: { onClick: () => void, children: React.ReactNode, label: string }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className="h-8 w-8 text-muted-foreground"
    onClick={onClick}
    aria-label={label}
    title={label}
  >
    {children}
  </Button>
);

const NoticeModal = ({ isOpen, onClose, onSubmit, sheetName, headers, iconOptions, examTypeOptions, isEditing, initialData }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, string>) => Promise<boolean>;
    sheetName: string;
    headers: string[];
    iconOptions: { value: string; icon: React.ReactNode }[];
    examTypeOptions: { value: string }[];
    isEditing: boolean;
    initialData?: Record<string, any> | null;
}) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const detailsTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (isOpen) {
            const initialFormData: Record<string, string> = {};
            if (isEditing && initialData) {
                headers.forEach(header => {
                    initialFormData[header] = initialData[header] || '';
                });
            } else {
                 headers.forEach(header => {
                    const headerLower = String(header).toLowerCase();
                    if (headerLower === 'date') {
                        const today = new Date();
                        initialFormData[header] = today.toISOString().split('T')[0]; // YYYY-MM-DD
                    } else {
                        initialFormData[header] = '';
                    }
                });
            }
            setFormData(initialFormData);
        }
    }, [isOpen, headers, initialData, isEditing]);

    const handleDateChange = (header: string, date: Date | undefined) => {
        if (date) {
            setFormData(prev => ({ ...prev, [header]: format(date, 'yyyy-MM-dd') }));
        }
    };

    const handleFormat = (format: 'bold' | 'italic' | 'h3' | 'list') => {
        const textarea = detailsTextareaRef.current;
        if (!textarea) return;
    
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const selectedText = value.substring(start, end);
    
        let prefix = '';
        let suffix = '';
        let newText = selectedText;
        let newStart = start;
        let newEnd = end;
    
        if (format === 'bold') {
            prefix = '**';
            suffix = '**';
        } else if (format === 'italic') {
            prefix = '*';
            suffix = '*';
        } else if (format === 'h3' || format === 'list') {
            const marker = format === 'h3' ? '### ' : '- ';
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            
            const updatedValue = value.substring(0, lineStart) + marker + value.substring(lineStart);
            setFormData(prev => ({ ...prev, details: updatedValue }));
            
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + marker.length, end + marker.length);
            }, 0);
            return;
        }
    
        if (selectedText) {
            newText = prefix + selectedText + suffix;
            newStart = start;
            newEnd = start + newText.length;
        } else {
            newText = prefix + suffix;
            newStart = start + prefix.length;
            newEnd = newStart;
        }
    
        const updatedValue = value.substring(0, start) + newText + value.substring(end);
        setFormData(prev => ({ ...prev, details: updatedValue }));
    
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newStart, newEnd);
        }, 0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await onSubmit(formData);
        setIsSubmitting(false);
        if (success) {
            onClose();
        }
    };

    const renderField = (header: string) => {
        const headerLower = String(header).toLowerCase();
        const capitalizedHeader = header.charAt(0).toUpperCase() + header.slice(1);
        
        if (sheetName.toLowerCase() === 'general' && headerLower === 'icon') {
            return (
                <div key={header} className="space-y-2">
                    <Label htmlFor={header}>Icon</Label>
                    <Select name={header} onValueChange={(value) => handleSelectChange(header, value)} value={formData[header] || ''}>
                        <SelectTrigger id={header}><SelectValue placeholder="Select an icon" /></SelectTrigger>
                        <SelectContent>
                            {iconOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    <div className="flex items-center gap-2">{opt.icon}<span>{opt.value}</span></div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            );
        }

        if (sheetName.toLowerCase() === 'exams' && headerLower === 'type') {
            return (
                <div key={header} className="space-y-2">
                    <Label htmlFor={header}>Type</Label>
                    <Select name={header} onValueChange={(value) => handleSelectChange(header, value)} value={formData[header] || ''}>
                        <SelectTrigger id={header}><SelectValue placeholder="Select a type" /></SelectTrigger>
                        <SelectContent>
                            {examTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.value}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            );
        }
        
        if (headerLower === 'date') {
            if (sheetName.toLowerCase() === 'holiday') {
                return (
                    <div key={header} className="space-y-2">
                        <Label htmlFor={header}>{capitalizedHeader}</Label>
                        <Input 
                            id={header} 
                            name={header} 
                            value={formData[header] || ''} 
                            onChange={handleChange} 
                            placeholder="e.g., 2081-07-25" 
                            type="text"
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter the date in your desired text format.
                        </p>
                    </div>
                );
            }
            
            const dateString = formData[header];
            const parsedDate = dateString ? parse(dateString, "yyyy-MM-dd", new Date()) : undefined;
            const selectedDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : undefined;

            return (
                <div key={header} className="space-y-2">
                    <Label htmlFor={header}>{capitalizedHeader}</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => handleDateChange(header, date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            );
        }

        if (headerLower === 'details') {
            return (
                 <div key={header} className="space-y-2">
                    <Label htmlFor={header}>{capitalizedHeader}</Label>
                    <div className="rounded-md border">
                         <div className="flex items-center gap-1 border-b p-1">
                            <ToolbarButton onClick={() => handleFormat('bold')} label="Bold">
                                <Bold className="h-4 w-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => handleFormat('italic')} label="Italic">
                                <Italic className="h-4 w-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => handleFormat('h3')} label="Heading">
                                <Heading3 className="h-4 w-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => handleFormat('list')} label="List">
                                <List className="h-4 w-4" />
                            </ToolbarButton>
                        </div>
                        <Textarea 
                            ref={detailsTextareaRef}
                            id={header} 
                            name={header} 
                            value={formData[header] || ''} 
                            onChange={handleChange} 
                            placeholder={`Enter notice details...`}
                            rows={5}
                            className="border-0 focus-visible:ring-0"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Use the toolbar or Markdown for formatting. E.g., `**bold**`, `*italic*`, `### Heading`.
                    </p>
                </div>
            );
        }

        if (headerLower === 'summary') {
            return (
                <div key={header} className="space-y-2">
                    <Label htmlFor={header}>{capitalizedHeader}</Label>
                    <Textarea id={header} name={header} value={formData[header] || ''} onChange={handleChange} placeholder={`Enter ${header}...`} />
                </div>
            );
        }

        return (
            <div key={header} className="space-y-2">
                <Label htmlFor={header}>{capitalizedHeader}</Label>
                <Input id={header} name={header} value={formData[header] || ''} onChange={handleChange} placeholder={`Enter ${header}...`} type={'text'} />
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg bg-card/80 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? `Edit ${sheetName} Notice` : `New ${sheetName} Notice`}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? `Update the details for this notice.` : `Fill out the form below to create a new notice.`}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="custom-scrollbar space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                    {headers.map(header => renderField(header))}
                    <DialogFooter className="pt-4 bg-transparent">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Publish Notice')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const iconMap = {
    Bell,
    FileText,
    Calendar,
    Award,
    School,
    GraduationCap,
    Default: Bell
};

const NoticeCard = ({ notice, headers, sheetName, onEdit, onDelete }: {
  notice: any[],
  headers: string[],
  sheetName: string,
  onEdit: () => void,
  onDelete: () => void,
}) => {
  const noticeData = headers.reduce((obj, header, index) => {
    obj[String(header)] = notice[index];
    return obj;
  }, {} as Record<string, any>);

  const title = noticeData.title || noticeData.name;
  const date = noticeData.date;
  const summary = noticeData.summary;
  const iconName = noticeData.icon as keyof typeof iconMap;
  const type = noticeData.type;
  const link = noticeData.link;

  const IconComponent = sheetName.toLowerCase() === 'general' 
      ? (iconMap[iconName] || iconMap.Default) 
      : sheetName.toLowerCase() === 'holiday' 
      ? Calendar
      : FileText;

    const getIconColor = (sheetName: string) => {
        const lowerSheet = sheetName.toLowerCase();
        if (lowerSheet.includes('exam')) return 'bg-sky-500/10 text-sky-500';
        if (lowerSheet.includes('holiday')) return 'bg-rose-500/10 text-rose-500';
        return 'bg-amber-500/10 text-amber-500';
    }

  return (
    <Card className="testimonial-card overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-4">
            <div className="flex items-start gap-4 flex-1 overflow-hidden">
                <div className={cn("rounded-lg p-3 mt-1", getIconColor(sheetName))}>
                    <IconComponent className="w-6 h-6 " />
                </div>
                <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-foreground text-lg truncate" title={title}>{title}</h3>
                    <p className="text-sm text-muted-foreground">Published: {date}</p>
                    {summary && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{summary}</p>}
                    {type && <Badge variant="secondary" className="mt-2">{type}</Badge>}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                {link && <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground"><a href={link} target="_blank" rel="noopener noreferrer"><Download/></a></Button>}
                <Button onClick={onEdit} size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground"><Edit /></Button>
                <Button onClick={onDelete} size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/50"><Trash2 /></Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};


type GridData = any[][];
type WorkbookState = {
    workbook: XLSX.WorkBook | null;
    sha: string;
};

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

const NoticeSheetEditor = ({ wbState, onStateChange }: { wbState: WorkbookState, onStateChange: (newState: WorkbookState) => void }) => {
    const { toast } = useToast();
    const [activeSheetName, setActiveSheetName] = useState<string>('General');
    const [isSaving, setIsSaving] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<{ sheetName: string; rowIndex: number } | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<{data: Record<string, any>, index: number} | null>(null);

    const iconOptions = [
        { value: 'Bell', icon: <Bell className="h-4 w-4" /> },
        { value: 'FileText', icon: <FileText className="h-4 w-4" /> },
        { value: 'Calendar', icon: <CalendarIcon className="h-4 w-4" /> },
        { value: 'Award', icon: <Award className="h-4 w-4" /> },
        { value: 'GraduationCap', icon: <GraduationCap className="h-4 w-4" /> },
        { value: 'School', icon: <School className="h-4 w-4" /> },
    ];
    
    const examTypeOptions = [ { value: 'Routine' }, { value: 'Result' }, { value: 'Notice' }];
    
    const noticeSheetNames = useMemo(() => {
        return wbState.workbook?.SheetNames.filter(name => ['General', 'Holiday'].includes(name)) || [];
    }, [wbState.workbook]);

    useEffect(() => {
        if (!noticeSheetNames.includes(activeSheetName)) {
            setActiveSheetName(noticeSheetNames[0] || '');
        }
    }, [noticeSheetNames, activeSheetName]);

    const { headers, bodyData } = useMemo(() => {
        if (!wbState.workbook || !activeSheetName) return { headers: [], bodyData: [] };
        const worksheet = wbState.workbook.Sheets[activeSheetName];
        if (!worksheet) return { headers: [], bodyData: [] };

        const data: GridData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
        return { headers: data[0] || [], bodyData: data.slice(1) };
    }, [wbState.workbook, activeSheetName]);

    const handleOpenNewModal = () => {
        setEditingNotice(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (rowIndex: number) => {
        const rowDataArray = bodyData[rowIndex];
        const rowDataObject = headers.reduce((obj, header, index) => {
            obj[String(header)] = rowDataArray[index];
            return obj;
        }, {} as Record<string, any>);
        setEditingNotice({ data: rowDataObject, index: rowIndex });
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => setIsModalOpen(false);

    const commitChanges = async (newWorkbook: XLSX.WorkBook): Promise<{ success: boolean; message: string; newSha?: string }> => {
        setIsSaving(true);
        try {
            const newBase64 = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'base64' });
            const result = await saveExcelFile(newBase64, wbState.sha);

            if (result.success && result.newSha) {
                onStateChange({ workbook: newWorkbook, sha: result.newSha });
                return { success: true, message: result.message };
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Failed to save Excel data:", error);
            const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred.';
            if (errorMsg.includes('sha') || errorMsg.includes('409')) {
                return { success: false, message: 'File has been updated by someone else. Please refresh the page and try again.' };
            }
            return { success: false, message: errorMsg };
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleNoticeSubmit = async (formData: Record<string, string>): Promise<boolean> => {
        if (!wbState.workbook) return false;

        const newRow = headers.map(header => formData[String(header)] || '');
        const currentSheetData: GridData = XLSX.utils.sheet_to_json(wbState.workbook.Sheets[activeSheetName], { header: 1 });
        
        let newGridData: GridData;
        if (editingNotice !== null) { // Editing existing
            newGridData = [...currentSheetData];
            newGridData[editingNotice.index + 1] = newRow;
        } else { // Creating new
            newGridData = [...currentSheetData, newRow];
        }

        const newWorkbook = { ...wbState.workbook, Sheets: { ...wbState.workbook.Sheets } };
        newWorkbook.Sheets[activeSheetName] = XLSX.utils.aoa_to_sheet(newGridData, { dateNF: 'yyyy-mm-dd' });

        const result = await commitChanges(newWorkbook);
        if (result.success) {
            toast({ title: 'Success!', description: `Notice has been ${editingNotice ? 'updated' : 'published'} successfully.` });
            handleCloseModal();
            return true;
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.message });
            return false;
        }
    };

    const confirmRemoveRow = async () => {
        if (rowToDelete === null || !wbState.workbook) return;

        const { sheetName, rowIndex } = rowToDelete;
        const currentSheetData: GridData = XLSX.utils.sheet_to_json(wbState.workbook.Sheets[sheetName], { header: 1 });
        const updatedGridData = currentSheetData.filter((_, index) => index !== rowIndex + 1);

        const newWorkbook = { ...wbState.workbook, Sheets: { ...wbState.workbook.Sheets } };
        newWorkbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(updatedGridData);
        
        const result = await commitChanges(newWorkbook);
        if (result.success) {
            toast({ title: 'Row Removed', description: `The notice has been successfully removed.` });
        } else {
            toast({ variant: 'destructive', title: 'Error Deleting Row', description: result.message });
        }
        setRowToDelete(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground flex-1">
                    Manage website notices. Add, edit, or delete notices using the buttons on each card.
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button onClick={handleOpenNewModal} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />New Notice</Button>
                </div>
            </div>

            <Tabs value={activeSheetName} onValueChange={setActiveSheetName} className="w-full">
                <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-none sm:inline-flex sm:w-auto">
                    {noticeSheetNames.map((name) => (
                        <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
                    ))}
                </TabsList>
                <div className="mt-6 relative">
                    <div className="space-y-4">
                        {bodyData.length > 0 ? bodyData.map((row, rowIndex) => (
                            <NoticeCard
                                key={rowIndex}
                                notice={row}
                                headers={headers}
                                sheetName={activeSheetName}
                                onEdit={() => handleOpenEditModal(rowIndex)}
                                onDelete={() => setRowToDelete({ sheetName: activeSheetName, rowIndex })}
                            />
                        )) : (
                            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4 border rounded-lg bg-card/50">
                                <Inbox className="h-12 w-12" />
                                <h3 className="text-lg font-semibold">No Notices Yet</h3>
                                <p>Click "New Notice" to publish the first one in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Tabs>

            <NoticeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleNoticeSubmit}
                sheetName={activeSheetName}
                headers={headers}
                iconOptions={iconOptions}
                examTypeOptions={examTypeOptions}
                isEditing={!!editingNotice}
                initialData={editingNotice?.data}
            />
            
            <AlertDialog open={rowToDelete !== null} onOpenChange={(open) => !open && setRowToDelete(null)}>
                <AlertDialogContent className="bg-card/60 backdrop-blur-xl border-border/50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this notice and save the changes. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="bg-transparent pt-4">
                        <AlertDialogCancel onClick={() => setRowToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmRemoveRow} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

const ResultsEditor = ({ wbState, onStateChange }: { wbState: WorkbookState, onStateChange: (newState: WorkbookState) => void }) => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);

    const [gridData, setGridData] = useState<GridData>([]);

    useEffect(() => {
        if (wbState.workbook) {
            const worksheet = wbState.workbook.Sheets['Results'];
            if (worksheet) {
                const data: GridData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
                setGridData(data);
            }
        }
    }, [wbState.workbook]);

    const { headers, bodyData } = useMemo(() => {
        const headers = gridData[0] || [];
        const bodyData = gridData.slice(1);
        return { headers, bodyData };
    }, [gridData]);

    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const updatedGridData = [...gridData];
        const actualRowIndex = rowIndex + 1;

        if (updatedGridData[actualRowIndex]) {
            const newRow = [...updatedGridData[actualRowIndex]];
            newRow[colIndex] = value;

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
            updatedGridData[actualRowIndex] = newRow;
            setGridData(updatedGridData);
        }
    };

    const commitChanges = async (newGridData: GridData): Promise<{ success: boolean; message: string; newSha?: string }> => {
        if (!wbState.workbook) return { success: false, message: 'Workbook not ready.' };

        setIsSaving(true);
        try {
            const newWorkbook: XLSX.WorkBook = { ...wbState.workbook, Sheets: { ...wbState.workbook.Sheets } };
            const newSheet = XLSX.utils.aoa_to_sheet(newGridData, { dateNF: 'yyyy-mm-dd' });
            newWorkbook.Sheets['Results'] = newSheet;

            const newBase64 = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'base64' });
            const result = await saveExcelFile(newBase64, wbState.sha);

            if (result.success && result.newSha) {
                onStateChange({ workbook: newWorkbook, sha: result.newSha });
                return { success: true, message: result.message };
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Failed to save Excel data:", error);
            const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred.';
            if (errorMsg.includes('sha') || errorMsg.includes('409')) {
                return { success: false, message: 'File has been updated by someone else. Please refresh the page and try again.' };
            }
            return { success: false, message: errorMsg };
        } finally {
            setIsSaving(false);
        }
    };
    
    const confirmRemoveRow = async () => {
        if (rowToDelete === null) return;
        const updatedGridData = gridData.filter((_, index) => index !== rowToDelete + 1);
        const result = await commitChanges(updatedGridData);
        if (result.success) {
            toast({ title: 'Row Removed', description: `Row ${rowToDelete + 1} has been successfully removed and saved.` });
        } else {
            toast({ variant: 'destructive', title: 'Error Deleting Row', description: result.message });
            setGridData(gridData); // Revert UI on failure
        }
        setRowToDelete(null);
    };

    const handleSaveChanges = async () => {
        const result = await commitChanges(gridData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
        } else {
            toast({ variant: 'destructive', title: 'Error Saving File', description: result.message });
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

                if (!importedData || importedData.length < 2) {
                    toast({ variant: 'destructive', title: 'Import Error', description: 'The selected file is empty or contains no data rows.' });
                    return;
                }
                
                const currentHeader = gridData[0] || [];
                const importedBody = importedData.slice(1);
                setGridData([currentHeader, ...importedBody]);
                toast({ title: 'Import Successful', description: `Data from "${file.name}" has been loaded. Review and save changes.` });
            } catch (error) {
                console.error("Failed to import file:", error);
                toast({ variant: 'destructive', title: 'Import Error', description: 'Failed to read the file. Please ensure it is a valid Excel or CSV file.' });
            } finally {
                if (event.target) event.target.value = "";
            }
        };
        reader.readAsBinaryString(file);
    };
    
    return (
        <div className="space-y-6">
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                 <p className="text-sm text-muted-foreground flex-1">
                    Manage student result data. Click "Save Changes" to publish.
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button onClick={handleSaveChanges} disabled={isSaving} size="sm">
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>
            
            <div className="max-h-[65vh] overflow-auto border rounded-lg">
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
                                <TableCell className="sticky right-0 z-10 p-1 bg-card border-r">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/50"
                                        onClick={() => setRowToDelete(rowIndex)}
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
             <div className="flex justify-start">
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

            <AlertDialog open={rowToDelete !== null} onOpenChange={(open) => !open && setRowToDelete(null)}>
                <AlertDialogContent className="bg-card/60 backdrop-blur-xl border-border/50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete row {rowToDelete !== null ? rowToDelete + 1 : ''} and save the changes. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="bg-transparent pt-4">
                        <AlertDialogCancel onClick={() => setRowToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmRemoveRow} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

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
                        <div className="custom-scrollbar grid gap-8 py-4 px-6 text-sm max-h-[75vh] overflow-y-auto">
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

export default function AdminView({ initialBase64Data, initialSha }: { initialBase64Data: string, initialSha: string }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("admissions");
    const [wbState, setWbState] = useState<WorkbookState>({ workbook: null, sha: initialSha });
     const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            if (initialBase64Data) {
                const wb = XLSX.read(initialBase64Data, { type: 'base64', cellDates: true, dateNF: 'yyyy-mm-dd' });
                setWbState({ workbook: wb, sha: initialSha });
            } else {
                const wb = XLSX.utils.book_new();
                const ws_general = XLSX.utils.aoa_to_sheet([["icon", "title", "summary", "date", "details"]]);
                const ws_holiday = XLSX.utils.aoa_to_sheet([["name", "date", "details"]]);
                const ws_results = XLSX.utils.aoa_to_sheet([["SymbolNo", "StudentName", "DOB", "Grade", "GPA", "Remarks"]]);
                
                XLSX.utils.book_append_sheet(wb, ws_general, "General");
                XLSX.utils.book_append_sheet(wb, ws_holiday, "Holiday");
                XLSX.utils.book_append_sheet(wb, ws_results, "Results");
                setWbState({ workbook: wb, sha: initialSha });
            }
        } catch (error) {
            console.error("Failed to parse Excel data:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to read the Excel file format.' });
        } finally {
            setIsLoading(false);
        }
    }, [initialBase64Data, initialSha, toast]);

    const handleWbStateChange = (newState: WorkbookState) => {
        setWbState(newState);
    }
    
    if (isLoading) {
        return (
             <div className="container mx-auto px-4">
                <Card className="testimonial-card p-8">
                     <div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
                </Card>
             </div>
        )
    }

    return (
        <div className="container mx-auto px-4">
            <Card className="testimonial-card">
                <CardHeader>
                    <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                    <CardDescription>
                        {
                            activeTab === 'admissions' ? 'View all submitted admission inquiries.' :
                            activeTab === 'contact' ? 'View all submitted contact form messages.' :
                            activeTab === 'notice' ? 'Manage website notices and announcements.' :
                            'Manage student result data.'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full h-auto grid-cols-2 rounded-lg sm:h-12 sm:grid-cols-4 sm:rounded-full max-w-2xl mx-auto">
                            <TabsTrigger value="admissions">Admissions</TabsTrigger>
                            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
                            <TabsTrigger value="notice">Notice Editor</TabsTrigger>
                            <TabsTrigger value="results">Results Editor</TabsTrigger>
                        </TabsList>
                        <TabsContent value="admissions" className='mt-6'>
                           <AdmissionsTab />
                        </TabsContent>
                        <TabsContent value="contact" className='mt-6'>
                           <ContactTab />
                        </TabsContent>
                         <TabsContent value="notice" className='mt-6'>
                           {wbState.workbook && <NoticeSheetEditor wbState={wbState} onStateChange={handleWbStateChange} />}
                        </TabsContent>
                         <TabsContent value="results" className='mt-6'>
                           {wbState.workbook && <ResultsEditor wbState={wbState} onStateChange={handleWbStateChange} />}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
