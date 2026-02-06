import type { Metadata } from 'next';
import AboutUsView from './view';

export const metadata: Metadata = {
  title: 'About Our School',
  description: 'Discover SARC, a beacon of holistic education in Kathmandu. Learn about our campus, programs, and unique educational approach.',
};

export default function AboutUsPage() {
  return <AboutUsView />;
}
