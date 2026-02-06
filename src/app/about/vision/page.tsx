import type { Metadata } from 'next';
import VisionView from './view';

export const metadata: Metadata = {
  title: 'Vision, Mission & Future Goals',
  description: 'Learn about the core principles, vision, mission, and future goals that guide SARC Education Foundation.',
};

export default function VisionPage() {
  return <VisionView />;
}
