import type { Metadata } from 'next';
import AchievementsView from './view';

export const metadata: Metadata = {
  title: 'Our Achievements',
  description: 'Celebrating excellence, innovation, and the remarkable success of our students and alumni at SARC Education Foundation.',
};

export default function AchievementsPage() {
  return <AchievementsView />;
}
