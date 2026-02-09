import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

export function getExcelData(sheetName: string): any[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'notice.xlsx');
    const file = fs.readFileSync(filePath);
    // Use cellDates: true to parse dates as JS Date objects
    const workbook = XLSX.read(file, { type: 'buffer', cellDates: true });
    
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      console.warn(`Sheet "${sheetName}" not found in the Excel file.`);
      return [];
    }
    
    const data: any[] = XLSX.utils.sheet_to_json(sheet);

    // Sanitize data: convert Date objects to strings and ensure plain objects
    const sanitizedData = data.map(row => {
      const newRow: { [key: string]: any } = {};
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          const value = row[key];
          if (value instanceof Date) {
            // Format date to 'YYYY-MM-DD' to make it a plain string
            newRow[key] = value.toISOString().split('T')[0];
          } else {
            newRow[key] = value;
          }
        }
      }
      return newRow;
    });

    return sanitizedData;

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('Error: The file /public/data/notice.xlsx could not be found.');
    } else {
      console.error('An error occurred while reading the Excel file:', error);
    }
    return [];
  }
}
