'use client';

import PageHeader from '@/app/components/page-header';
import { ThreeDMarquee } from '@/app/components/3d-marquee';

const galleryImages = Array.from({ length: 41 }, (_, i) => `/images/gallery/${i}.jpg`);

export default function GalleryView() {
  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="Moments of Discovery and Community at SARC"
        imageUrl="/images/hero/4.jpg"
      />
      <div className="container mx-auto px-4 py-20">
        <ThreeDMarquee images={galleryImages} />
      </div>
    </div>
  );
}
