import type { Metadata } from 'next';
import ServicesView from './view';

export const metadata: Metadata = {
  title: 'Student Services',
  description: 'Discover the support services SARC offers to ensure a holistic and enriching educational experience for every student.',
};

export default function ServicesPage() {
  return <ServicesView />;
}
