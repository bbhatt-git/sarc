import type { Metadata } from 'next';
import GeneralNoticeView from './view';
import { getExcelData } from '@/lib/excel-data';

export const metadata: Metadata = {
  title: 'General Notices',
  description: 'Stay updated with the latest announcements, news, and general notices from SARC Education Foundation.',
};

export default function GeneralNoticePage() {
  const generalNotices = getExcelData('General');
  return <GeneralNoticeView initialNotices={generalNotices} />;
}
