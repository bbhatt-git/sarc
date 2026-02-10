import AdminView from './view';
import { getExcelFileAsBase64 } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Manage website content and settings.',
};

export default async function AdminPage() {
  const result = await getExcelFileAsBase64();

  if (!result || result.error) {
    return (
      <div className="container mx-auto p-4 md:p-8 mt-24">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            {result?.error || 'Could not load data from GitHub.'} Please ensure the GitHub environment variables (GITHUB_REPO_OWNER, GITHUB_REPO_NAME, GITHUB_FILE_PATH, GITHUB_TOKEN) are correctly set in your deployment environment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!result.base64Data && !result.sha) {
    console.log("No initial file found on GitHub. The editor will start with a blank state. A new file will be created on the first save.");
  }

  return <AdminView initialBase64Data={result.base64Data} initialSha={result.sha} />;
}
