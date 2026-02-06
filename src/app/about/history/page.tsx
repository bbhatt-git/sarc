import type { Metadata } from 'next';
import HistoryView from './view';

export const metadata: Metadata = {
  title: 'Our History & Achievements',
  description: 'Explore the journey and key milestones of SARC Education Foundation since its establishment in 2017.',
};

export default function HistoryPage() {
  return <HistoryView />;
}
