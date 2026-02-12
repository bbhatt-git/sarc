'use client';

import PageHeader from '@/app/components/page-header';
import { imageData } from '@/lib/image-data';
import { ThreeDMarquee } from '../components/3d-marquee';

export default function GalleryView() {
  const imagesForMarquee = imageData.gallery.map(image => image.src);

  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="Moments of Discovery and Community at SARC"
      />
      <div className="w-full py-20 lg:py-28">
         <ThreeDMarquee images={imagesForMarquee} />
      </div>
    </div>
  );
}
