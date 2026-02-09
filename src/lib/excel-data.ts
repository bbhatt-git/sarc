import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

export function getExcelData(sheetName: string): any[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'school_data.xlsx');
    const file = fs.readFileSync(filePath);
    const workbook = XLSX.read(file, { type: 'buffer' });
    
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      console.warn(`Sheet "${sheetName}" not found in the Excel file.`);
      return [];
    }
    
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('Error: The file /data/school_data.xlsx could not be found.');
    } else {
      console.error('An error occurred while reading the Excel file:', error);
    }
    return [];
  }
}
