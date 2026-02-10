import type { Metadata } from 'next';
import ExamsView from './view';
import { getExcelData } from '@/lib/excel-data';

export const metadata: Metadata = {
  title: 'Exams & Results',
  description: 'Find important information about examination schedules, routines, and results at SARC Education Foundation.',
};

export default function ExamsPage() {
  const examNotices = getExcelData('Exams');
  
  return <ExamsView initialNotices={examNotices} />;
}
