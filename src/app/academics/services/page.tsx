import type { Metadata } from 'next';
import FacilitiesView from './view';

export const metadata: Metadata = {
  title: 'Our Facilities',
  description: 'Explore the modern facilities and support services at SARC, designed for a world-class educational experience.',
};

export default function FacilitiesPage() {
  return <FacilitiesView />;
}
