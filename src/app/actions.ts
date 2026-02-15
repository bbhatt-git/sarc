'use server';

import { getExcelData } from '@/lib/excel-data';

export type Result = {
  StudentName: string;
  SymbolNo: string;
  DOB: string; // YYYY-MM-DD
  Grade: string;
  GPA: number;
  Remarks: 'Pass' | 'Fail';
};

function normalizeDate(dob: string): string {
  if (!dob) return '';
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
  return String(dob).replace(/\//g, '-');
}

export async function checkResult(symbolNo: string, dob: string): Promise<Result | null> {
  const resultsData: any[] = await getExcelData('Results');
  
  if (!resultsData || resultsData.length === 0) {
    return null;
  }

  const normalizedDob = normalizeDate(dob);

  const foundRow = resultsData.find(row => 
    String(row.SymbolNo).trim().toLowerCase() === symbolNo.trim().toLowerCase() && 
    normalizeDate(String(row.DOB)) === normalizedDob
  );

  if (foundRow) {
    return {
      StudentName: String(foundRow.StudentName),
      SymbolNo: String(foundRow.SymbolNo),
      DOB: String(foundRow.DOB),
      Grade: String(foundRow.Grade),
      GPA: Number(foundRow.GPA),
      Remarks: foundRow.Remarks === 'Pass' ? 'Pass' : 'Fail',
    };
  }

  return null;
}
