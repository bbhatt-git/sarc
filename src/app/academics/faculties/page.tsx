import type { Metadata } from 'next';
import FacultiesView from './view';

export const metadata: Metadata = {
  title: 'Our Faculties',
  description: 'Meet the experienced and dedicated faculties at SARC who are experts in their fields and committed to student success.',
};

export default function FacultiesPage() {
  return <FacultiesView />;
}
