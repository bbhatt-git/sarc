import type { Metadata } from 'next';
import InnovationView from './view';

export const metadata: Metadata = {
  title: 'Innovation & Practical Learning',
  description: 'Explore SARC\'s hands-on approach to education, from robotics and AI labs to educational tours and industry visits. See how we build tomorrow\'s innovators.',
};

export default function InnovationPage() {
  return <InnovationView />;
}
