import type { Metadata } from 'next';
import GeneralNoticeView from './view';
import { getExcelData } from '@/lib/excel-data';

export const metadata: Metadata = {
  title: 'General Notices',
  description: 'Stay updated with the latest announcements, news, and general notices from SARC Education Foundation.',
};

export default async function GeneralNoticePage() {
  const notices = await getExcelData('General');
  // Ensure data is a plain object before passing to client component
  const generalNotices = JSON.parse(JSON.stringify(notices));
  return <GeneralNoticeView initialNotices={generalNotices} />;
}
