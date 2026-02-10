import type { Metadata } from 'next';
import FacultiesView from './view';

export const metadata: Metadata = {
  title: 'Our Faculties',
  description: 'Explore the Science and Management faculties at SARC, including specializations in biological science, computer science, business, and computer commerce.',
};

export default function FacultiesPage() {
  return <FacultiesView />;
}
