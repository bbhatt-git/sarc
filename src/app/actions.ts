'use server';

import { getExcelData } from '@/lib/excel-data';

export type Result = {
  StudentName: string;
  SymbolNo: string;
  DOB: string;
  Grade: string;
  GPA: number;
  Remarks: 'Pass' | 'Fail';
};

export async function checkResult(symbolNo: string, dob: string): Promise<Result | null> {
  try {
    const resultsData: any[] = getExcelData('Results');
    
    const studentResult = resultsData.find(
      (row) => 
        String(row.SymbolNo).trim().toLowerCase() === symbolNo.trim().toLowerCase() && 
        String(row.DOB) === dob
    );

    if (studentResult) {
      return {
        StudentName: studentResult.StudentName,
        SymbolNo: studentResult.SymbolNo,
        DOB: studentResult.DOB,
        Grade: studentResult.Grade,
        GPA: studentResult.GPA,
        Remarks: studentResult.Remarks,
      };
    }
    
    return null;

  } catch (e) {
    console.error("Error checking result:", e);
    return null;
  }
}
