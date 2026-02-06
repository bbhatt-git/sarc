import type { Metadata } from 'next';
import AchievementsView from './view';

export const metadata: Metadata = {
  title: 'Our Achievements',
  description: 'Celebrate the outstanding achievements and accolades of SARC students and faculty.',
};

export default function AchievementsPage() {
  return <AchievementsView />;
}
