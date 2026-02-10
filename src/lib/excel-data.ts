import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

export function getExcelData(sheetIdentifier: string): any[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'notice.xlsx');
    const file = fs.readFileSync(filePath);
    // Use cellDates: true to have xlsx parse Excel date cells into JS Date objects
    const workbook = XLSX.read(file, { type: 'buffer', cellDates: true });
    
    // Find the sheet with some flexibility
    const targetName = sheetIdentifier.toLowerCase();
    let sheetName = workbook.SheetNames.find(name => name.toLowerCase() === targetName);

    if (!sheetName) {
      // If exact match fails, try to find a sheet that contains the identifier
      sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes(targetName));
    }
    
    const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
    
    if (!sheet) {
      console.warn(`Sheet matching "${sheetIdentifier}" not found in the Excel file.`);
      return [];
    }
    
    // This will produce an array of objects, with Date objects for date cells
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    // To make the data serializable for Client Components, we need to convert Date objects to strings.
    const serializableData = jsonData.map(row => {
      const newRow: { [key: string]: any } = {};
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          const value = row[key];
          if (value instanceof Date) {
            // Format date to YYYY-MM-DD. This makes it a plain string.
            newRow[key] = value.toISOString().split('T')[0];
          } else {
            newRow[key] = value;
          }
        }
      }
      return newRow;
    });

    return serializableData;

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('Error: The file /public/data/notice.xlsx could not be found.');
    } else {
      console.error('An error occurred while reading the Excel file:', error);
    }
    return [];
  }
}
