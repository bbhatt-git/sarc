import type { Metadata } from 'next';
import HolidayNoticeView from './view';
import { getExcelData } from '@/lib/excel-data';

export const metadata: Metadata = {
  title: 'Holiday Notices',
  description: 'View the academic calendar and information about upcoming holidays and breaks at SARC.',
};

export default async function HolidayNoticePage() {
  const notices = await getExcelData('Holiday', 'notice');
  const reversedNotices = notices.reverse();
  // Ensure data is a plain object before passing to client component
  const holidayNotices = JSON.parse(JSON.stringify(reversedNotices));
  return <HolidayNoticeView initialHolidays={holidayNotices} />;
}
