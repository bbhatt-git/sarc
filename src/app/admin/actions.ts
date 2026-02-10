'use server';

export async function getExcelFileAsBase64(): Promise<{ base64Data: string; sha: string; error?: string } | null> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = process.env.GITHUB_FILE_PATH;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !path || !token) {
    const errorMsg = 'GitHub environment variables for Excel data are not set.';
    console.error(errorMsg);
    return { base64Data: '', sha: '', error: errorMsg };
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store', // Always fetch fresh data for the admin editor
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`File not found at ${apiUrl}. A new file will be created on first save.`);
        return { base64Data: '', sha: '' }; // No file exists yet, return empty
      }
      const errorText = await response.text();
      throw new Error(`Failed to fetch from GitHub API: ${response.statusText}. Details: ${errorText}`);
    }

    const fileData = await response.json();
    return { base64Data: fileData.content, sha: fileData.sha };
  } catch (error) {
    console.error('Error reading Excel file from GitHub:', error);
    return { base64Data: '', sha: '', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function saveExcelFile(base64Data: string, sha: string): Promise<{ success: boolean; message: string; newSha?: string; }> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = process.env.GITHUB_FILE_PATH;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !path || !token) {
    const errorMsg = 'GitHub environment variables are not configured for saving.';
    console.error(errorMsg);
    return { success: false, message: errorMsg };
  }
  
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const body: { message: string; content: string; sha?: string } = {
      message: `Update ${path} from SARC website admin`,
      content: base64Data,
    };
    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${errorData.message || 'Failed to save file'}`);
    }
    
    const responseData = await response.json();

    return { success: true, message: 'File saved to GitHub successfully!', newSha: responseData.content.sha };
  } catch (error) {
    console.error('Error saving Excel file to GitHub:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to save the file.' };
  }
}
