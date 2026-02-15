'use server';

import { getExcelData } from '@/lib/excel-data';

// The checkResult function has been removed as the logic is now handled on the client-side in /results/view.tsx
// using a direct Firestore query. This was done to remove the dependency on Excel files for results data.
