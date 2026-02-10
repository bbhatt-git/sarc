import type { Metadata } from 'next';
import HolidayNoticeView from './view';
import { getExcelData } from '@/lib/excel-data';

export const metadata: Metadata = {
  title: 'Holiday Notices',
  description: 'View the academic calendar and information about upcoming holidays and breaks at SARC.',
};

export default function HolidayNoticePage() {
  const holidayNotices = getExcelData('Holiday');
  return <HolidayNoticeView initialHolidays={holidayNotices} />;
}
