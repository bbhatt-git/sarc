import type { Metadata } from 'next';
import WhyUsView from './view';

export const metadata: Metadata = {
  title: 'Why Choose SARC?',
  description: 'Discover the unique features and commitments that make SARC the ideal choice for your academic and personal growth.',
};

export default function WhyUsPage() {
  return <WhyUsView />;
}
