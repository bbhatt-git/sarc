'use client';

import PageHeader from '@/app/components/page-header';
import DomeGallery from '@/app/components/DomeGallery';
import { GALLERY_IMAGES } from '@/lib/constants';
import { imageData } from '@/lib/image-data';

export default function GalleryView() {
  const imagesForDome = imageData.gallery.map((image, index) => ({
    src: image.src,
    alt: `Gallery image: ${GALLERY_IMAGES[index]?.category || 'SARC Gallery'}`
  }));


  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="Moments of Discovery and Community at SARC"
        imageUrl={imageData.hero[4].src}
      />
      <div className="w-full h-[80vh] min-h-[700px] py-10">
         <DomeGallery images={imagesForDome} autoRotate={true} grayscale={false} />
      </div>
    </div>
  );
}
