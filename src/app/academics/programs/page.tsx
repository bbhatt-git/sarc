import type { Metadata } from 'next';
import ProgramsView from './view';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description: 'Explore the comprehensive range of academic programs offered at SARC, from +2 to CTEVT courses.',
};

export default function ProgramsPage() {
  return <ProgramsView />;
}
