'use client';

import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, PlusCircle, Trash2 } from 'lucide-react';
import { saveExcelFile } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type GridData = any[][];

export default function AdminView({ initialBase64Data }: { initialBase64Data: string }) {
  const { toast } = useToast();
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [activeSheetName, setActiveSheetName] = useState<string>('');
  const [gridData, setGridData] = useState<GridData>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);

  useEffect(() => {
    try {
      const wb = XLSX.read(initialBase64Data, { type: 'base64', cellDates: true });
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
        // Use raw: false to get formatted strings for dates
        const data: GridData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
        setGridData(data);
        setSelectedCol(null);
        setSelectedRow(null);
      }
    }
  }, [workbook, activeSheetName]);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedGridData = gridData.map((row, rIdx) => {
        if (rIdx === rowIndex) {
            const newRow = [...row];
            newRow[colIndex] = value;
            return newRow;
        }
        return row;
    });
    setGridData(updatedGridData);
  };
  
  const handleAddNewRow = () => {
    const numCols = gridData[0]?.length || 1;
    const newRow = Array(numCols).fill('');
    setGridData([...gridData, newRow]);
    toast({ title: 'Row Added' });
  };

  const handleAddColumn = () => {
    if (gridData.length === 0) {
      setGridData([['']]);
    } else {
      const updatedGridData = gridData.map(row => [...row, '']);
      setGridData(updatedGridData);
    }
    toast({ title: 'Column Added' });
  };

  const handleDeleteRow = () => {
    if (selectedRow === null) {
      toast({ variant: 'destructive', title: 'No row selected' });
      return;
    }
    const updatedGridData = gridData.filter((_, index) => index !== selectedRow);
    setGridData(updatedGridData);
    const deletedRowNumber = selectedRow + 1;
    setSelectedRow(null);
    toast({ title: `Row ${deletedRowNumber} deleted` });
  };

  const handleDeleteColumn = () => {
    if (selectedCol === null) {
      toast({ variant: 'destructive', title: 'No column selected' });
      return;
    }
    if (gridData.length > 0 && gridData[0].length <= 1) {
      toast({ variant: 'destructive', title: 'Cannot delete the last column.' });
      return;
    }
    const updatedGridData = gridData.map(row => row.filter((_, index) => index !== selectedCol));
    setGridData(updatedGridData);
    const colName = String.fromCharCode(65 + selectedCol);
    setSelectedCol(null);
    toast({ title: `Column ${colName} deleted` });
  };

  const handleSaveChanges = async () => {
    if (!workbook || !activeSheetName) return;

    setIsSaving(true);
    try {
      const newWorkbook: XLSX.WorkBook = { ...workbook };
      newWorkbook.Sheets = { ...workbook.Sheets };
      
      const newSheet = XLSX.utils.aoa_to_sheet(gridData);
      newWorkbook.Sheets[activeSheetName] = newSheet;

      const newBase64 = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'base64' });
      const result = await saveExcelFile(newBase64);

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
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

  const sheetNames = useMemo(() => workbook?.SheetNames || [], [workbook]);
  const numCols = useMemo(() => gridData[0]?.length || 0, [gridData]);

  if (!workbook) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4">
      <Card className="testimonial-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Excel Content Editor</CardTitle>
              <CardDescription>Edit `public/data/notice.xlsx`. Click headers to select rows/columns.</CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <Button onClick={handleAddNewRow} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Row</Button>
                <Button onClick={handleAddColumn} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Column</Button>
                <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>
                <Button onClick={handleDeleteRow} variant="outline" size="sm" disabled={selectedRow === null}><Trash2 className="mr-2 h-4 w-4" />Row</Button>
                <Button onClick={handleDeleteColumn} variant="outline" size="sm" disabled={selectedCol === null}><Trash2 className="mr-2 h-4 w-4" />Column</Button>
                <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>
                <Button onClick={handleSaveChanges} disabled={isSaving} size="sm">
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSheetName} onValueChange={setActiveSheetName} className="w-full">
            <TabsList>
              {sheetNames.map((name) => (
                <TabsTrigger key={name} value={name}>
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6 relative max-h-[65vh] overflow-auto border rounded-lg">
              <Table className="min-w-full border-collapse">
                <TableHeader className="sticky top-0 z-20 bg-muted/80 backdrop-blur-sm">
                  <TableRow>
                    <TableHead className="sticky left-0 z-30 w-16 border-r bg-muted/95 text-center font-bold">#</TableHead>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <TableHead key={colIndex} className="border-b p-0 text-center font-bold">
                         <button
                            onClick={() => { setSelectedCol(colIndex); setSelectedRow(null); }}
                            className={cn(
                                "w-full h-full p-2.5 hover:bg-accent transition-colors",
                                selectedCol === colIndex && "bg-primary/20 text-primary-foreground"
                            )}
                         >
                            {String.fromCharCode(65 + colIndex)}
                         </button>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gridData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} data-selected={selectedRow === rowIndex} className="group/row">
                       <TableCell className="sticky left-0 z-10 w-16 border-r p-0 text-center font-medium bg-muted group-data-[selected=true]:bg-primary/20">
                         <button
                            onClick={() => { setSelectedRow(rowIndex); setSelectedCol(null); }}
                            className={cn(
                                "w-full h-full p-2.5 hover:bg-accent transition-colors",
                                selectedRow === rowIndex && "bg-primary/20 text-primary-foreground"
                            )}
                          >
                            {rowIndex + 1}
                          </button>
                       </TableCell>
                      {Array.from({ length: numCols }).map((_, colIndex) => (
                        <TableCell key={colIndex} className={cn("p-0", selectedCol === colIndex && "bg-primary/10")}>
                          <Input
                            type="text"
                            value={row[colIndex] || ''}
                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                            onFocus={() => { setSelectedCol(colIndex); setSelectedRow(rowIndex); }}
                            className="w-full h-full p-2 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary/50"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
