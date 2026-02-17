import * as XLSX from 'xlsx';

async function fetchExcelFromGithub(): Promise<Buffer | null> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = process.env.GITHUB_FILE_PATH;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !path || !token) {
    console.error('GitHub environment variables for Excel data are not set.');
    return null;
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store' // Fetch fresh data on every request
    });

    if (!response.ok) {
      console.error(`Failed to fetch from GitHub API: ${response.statusText}`);
      return null;
    }

    const fileData = await response.json();
    if (fileData.content) {
        const content = Buffer.from(fileData.content, 'base64');
        return content;
    }
    return null;
  } catch (error) {
    console.error('Error fetching Excel file from GitHub:', error);
    return null;
  }
}

export async function getExcelData(sheetIdentifier: string): Promise<any[]> {
    const fileBuffer = await fetchExcelFromGithub();
    if (!fileBuffer) {
        return [];
    }

    try {
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const targetName = sheetIdentifier.toLowerCase();
        let sheetName = workbook.SheetNames.find(name => name.toLowerCase() === targetName);

        if (!sheetName) {
            sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes(targetName));
        }
        
        const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
        
        if (!sheet) {
          console.warn(`Sheet matching "${sheetIdentifier}" not found in the Excel file.`);
          return [];
        }
        
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

        // Sort notices by date in descending order if a 'date' column exists
        if (jsonData.length > 0 && 'date' in jsonData[0]) {
          return jsonData.sort((a, b) => {
            // Handle non-standard date strings gracefully
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateB.getTime() - dateA.getTime();
            }
            // Fallback for non-date strings or different formats
            return 0;
          });
        }

        return jsonData;
    } catch (error) {
        console.error('An error occurred while parsing the Excel file:', error);
        return [];
    }
}
