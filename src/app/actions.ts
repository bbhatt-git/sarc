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

// Helper function to get a property from an object with case-insensitivity
function getProperty(obj: any, key: string): any {
    const lowerKey = key.toLowerCase();
    const foundKey = Object.keys(obj).find(k => k.toLowerCase() === lowerKey);
    return foundKey ? obj[foundKey] : undefined;
}


export async function checkResult(symbolNo: string, dob: string): Promise<Result | null> {
  try {
    const resultsData: any[] = getExcelData('Results');
    
    const studentResult = resultsData.find(
      (row) => {
        const rowSymbolNo = getProperty(row, 'SymbolNo');
        const rowDOB = getProperty(row, 'DOB');

        // The DOB from Excel might be a Date object which was converted to YYYY-MM-DD
        // The input from the form is also YYYY-MM-DD
        return rowSymbolNo && rowDOB &&
               String(rowSymbolNo).trim().toLowerCase() === symbolNo.trim().toLowerCase() && 
               String(rowDOB) === dob;
      }
    );

    if (studentResult) {
      const gpa = getProperty(studentResult, 'GPA');
      const remarks = getProperty(studentResult, 'Remarks');

      // Basic validation for required fields
      if (!remarks || (remarks !== 'Pass' && remarks !== 'Fail')) {
          console.error("Invalid or missing 'Remarks' value in Excel:", remarks);
          return null;
      }
      
      return {
        StudentName: getProperty(studentResult, 'StudentName') || 'N/A',
        SymbolNo: getProperty(studentResult, 'SymbolNo') || 'N/A',
        DOB: getProperty(studentResult, 'DOB') || 'N/A',
        Grade: getProperty(studentResult, 'Grade') || 'N/A',
        GPA: Number(gpa) || 0,
        Remarks: remarks,
      };
    }
    
    return null;

  } catch (e) {
    console.error("Error checking result:", e);
    return null;
  }
}
