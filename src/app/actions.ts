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

// Helper function to normalize DOB input
function normalizeDate(dob: string): string {
  // Remove all non-digit characters
  const digitsOnly = dob.replace(/\D/g, '');
  
  // Check if it's in YYYYMMDD format
  if (digitsOnly.length === 8) {
    const year = digitsOnly.substring(0, 4);
    const month = digitsOnly.substring(4, 6);
    const day = digitsOnly.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  
  // Assume it's already in a delimited format like YYYY-MM-DD or YYYY/MM/DD
  // Just replace slashes with dashes for consistency
  return dob.replace(/\//g, '-');
}


export async function checkResult(symbolNo: string, dob: string): Promise<Result | null> {
  try {
    const resultsData: any[] = await getExcelData('Results');
    const normalizedDob = normalizeDate(dob);
    
    const studentResult = resultsData.find(
      (row) => {
        const rowSymbolNo = getProperty(row, 'SymbolNo');
        const rowDOB = getProperty(row, 'DOB');

        // The DOB from Excel is already normalized to YYYY-MM-DD
        return rowSymbolNo && rowDOB &&
               String(rowSymbolNo).trim().toLowerCase() === symbolNo.trim().toLowerCase() && 
               String(rowDOB) === normalizedDob;
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
