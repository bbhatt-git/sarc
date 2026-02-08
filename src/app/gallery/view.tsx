'use client';

import DomeGallery from '@/app/components/DomeGallery';

export default function GalleryView() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 112px)' }}>
      <DomeGallery
        fit={0.8}
        minRadius={600}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        grayscale={false}
      />
    </div>
  );
}
