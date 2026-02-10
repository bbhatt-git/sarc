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
      const wb = XLSX.read(initialBase64Data, { type: 'base64' });
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
        const data: GridData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setGridData(data);
      }
    }
  }, [workbook, activeSheetName]);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedGridData = [...gridData];
    if (!updatedGridData[rowIndex]) {
        updatedGridData[rowIndex] = [];
    }
    updatedGridData[rowIndex][colIndex] = value;
    setGridData(updatedGridData);
  };
  
  const handleAddNewRow = () => {
    const numCols = gridData[0]?.length || 1;
    const newRow = Array(numCols).fill('');
    setGridData([...gridData, newRow]);
  };

  const handleSaveChanges = async () => {
    if (!workbook || !activeSheetName) return;

    setIsSaving(true);
    try {
      // Create a new workbook object to avoid mutation issues
      const newWorkbook: XLSX.WorkBook = {
        SheetNames: [...workbook.SheetNames],
        Sheets: {}
      };

      // Copy all sheets from the old workbook to the new one
      workbook.SheetNames.forEach(sheetName => {
        if (sheetName === activeSheetName) {
          // If it's the active sheet, use the updated gridData
          newWorkbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(gridData);
        } else {
          // Otherwise, copy the original sheet
          newWorkbook.Sheets[sheetName] = workbook.Sheets[sheetName];
        }
      });

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
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle className="text-2xl">Excel Content Editor</CardTitle>
                <CardDescription>Edit the content of `public/data/notice.xlsx` directly.</CardDescription>
            </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddNewRow} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Row
            </Button>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
            </Button>
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

            <div className="mt-4 overflow-x-auto">
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    {gridData[0]?.map((_, colIndex) => (
                      <TableHead key={colIndex} className="border bg-muted/50 p-2 text-center font-bold">
                        {String.fromCharCode(65 + colIndex)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gridData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Array.from({ length: gridData[0]?.length || 0 }).map((_, colIndex) => (
                        <TableCell key={colIndex} className="border p-0">
                          <Input
                            type="text"
                            value={row[colIndex] || ''}
                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                            className="w-full h-full p-2 border-none rounded-none focus-visible:ring-1 focus-visible:ring-ring"
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
