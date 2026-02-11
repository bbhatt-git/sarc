'use client';

import PageHeader from '@/app/components/page-header';
import DomeGallery from '@/app/components/DomeGallery';
import { GALLERY_IMAGES } from '@/lib/constants';

export default function GalleryView() {
  const imagesForDome = GALLERY_IMAGES.map(image => ({ src: image.src, alt: `Gallery image: ${image.category}` }));

  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="Moments of Discovery and Community at SARC"
        imageUrl="/images/hero/4.jpg"
      />
      <div className="w-full h-[80vh] min-h-[700px] py-10">
         <DomeGallery images={imagesForDome} autoRotate={true} grayscale={false} />
      </div>
    </div>
  );
}
