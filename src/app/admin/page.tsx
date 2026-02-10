import AdminView from './view';
import { getExcelFileAsBase64 } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileX } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Manage website content and settings.',
};

export default async function AdminPage() {
  const initialData = await getExcelFileAsBase64();

  if (!initialData) {
    return (
      <div className="container mx-auto p-4 md:p-8 mt-24">
        <Alert variant="destructive">
          <FileX className="h-4 w-4" />
          <AlertTitle>Error Loading File</AlertTitle>
          <AlertDescription>
            Could not load the Excel file from /public/data/notice.xlsx. Please ensure the file exists and the server has read permissions.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <AdminView initialBase64Data={initialData} />;
}
