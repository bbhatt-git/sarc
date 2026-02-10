'use client';

import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, PlusCircle } from 'lucide-react';
import { saveExcelFile } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type GridData = any[][];

export default function AdminView({ initialBase64Data }: { initialBase64Data: string }) {
  const { toast } = useToast();
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [activeSheetName, setActiveSheetName] = useState<string>('');
  const [gridData, setGridData] = useState<GridData>([]);
  const [isSaving, setIsSaving] = useState(false);

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
        const data: GridData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
        setGridData(data);
      }
    }
  }, [workbook, activeSheetName]);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedGridData = [...gridData];
    // rowIndex is from the bodyData, so add 1 to get the correct index in gridData
    const actualRowIndex = rowIndex + 1;
    if (updatedGridData[actualRowIndex]) {
        const newRow = [...updatedGridData[actualRowIndex]];
        newRow[colIndex] = value;
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

  // Memoize derived data
  const { sheetNames, headers, bodyData } = useMemo(() => {
    const sheetNames = workbook?.SheetNames || [];
    const headers = gridData[0] || [];
    const bodyData = gridData.slice(1);
    return { sheetNames, headers, bodyData };
  }, [workbook, gridData]);

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
              <CardDescription>Edit `public/data/notice.xlsx`. Changes are saved per sheet.</CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <Button onClick={handleAddNewRow} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Row</Button>
                <Button onClick={handleSaveChanges} disabled={isSaving} size="sm">
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
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
                    {headers.map((header, colIndex) => (
                      <TableHead key={colIndex} className="p-2.5 text-center font-bold whitespace-nowrap">
                         {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bodyData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                       <TableCell className="sticky left-0 z-10 w-16 border-r text-center font-medium bg-muted">
                            {rowIndex + 1}
                       </TableCell>
                      {headers.map((_, colIndex) => (
                        <TableCell key={colIndex} className="p-0">
                          <Input
                            type="text"
                            value={row[colIndex] || ''}
                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                            className="w-full h-full p-2 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary/50 bg-transparent"
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
