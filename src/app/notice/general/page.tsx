import type { Metadata } from 'next';
import GeneralNoticeView from './view';

export const metadata: Metadata = {
  title: 'General Notices',
  description: 'Stay updated with the latest announcements, news, and general notices from SARC Education Foundation.',
};

export default function GeneralNoticePage() {
  return <GeneralNoticeView />;
}
