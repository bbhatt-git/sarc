'use server';

import { promises as fs } from 'fs';
import path from 'path';

export async function getExcelFileAsBase64(): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'notice.xlsx');
    const fileBuffer = await fs.readFile(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return null;
  }
}

export async function saveExcelFile(base64Data: string): Promise<{ success: boolean; message: string }> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'notice.xlsx');
    const fileBuffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(filePath, fileBuffer);
    return { success: true, message: 'File saved successfully!' };
  } catch (error) {
    console.error('Error saving Excel file:', error);
    if ((error as NodeJS.ErrnoException).code === 'EACCES') {
        return { success: false, message: 'Permission denied. The server process does not have write access to the file.' };
    }
    return { success: false, message: 'Failed to save the file.' };
  }
}
