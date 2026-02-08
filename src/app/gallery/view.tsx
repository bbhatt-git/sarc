'use client';

import DomeGallery from '@/app/components/DomeGallery';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const galleryImages = Array.from({ length: 41 }, (_, i) => ({
  src: `/images/gallery/${i}.jpg`,
  alt: `SARC gallery image ${i + 1}`,
}));


export default function GalleryView() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const overlayColor = mounted && resolvedTheme === 'light' ? '#f9fafb' : '#060010';

  if (!mounted) {
    // Render a placeholder during SSR to avoid hydration mismatch
    return <div style={{ width: '100%', height: 'calc(100vh - 112px)' }} />;
  }

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 112px)' }}>
      <DomeGallery
        images={galleryImages}
        fit={0.8}
        minRadius={600}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        grayscale={false}
        overlayBlurColor={overlayColor}
      />
    </div>
  );
}
