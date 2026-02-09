'use client';

import PageHeader from '@/app/components/page-header';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Marquee } from '@/app/components/marquee';

const galleryImages = Array.from({ length: 33 }, (_, i) => `/images/gallery/${i + 1}.jpg`);

const MarqueeImage = ({ src, onImageClick }: { src: string; onImageClick: () => void }) => {
    return (
        <div
            className="relative aspect-video w-72 shrink-0 cursor-pointer overflow-hidden rounded-xl md:aspect-square md:w-80"
            onClick={onImageClick}
        >
            <Image
                src={src}
                alt={`Gallery image`}
                fill
                className="object-cover transition-all duration-300 hover:scale-110"
            />
        </div>
    );
};

export default function GalleryView() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const row1 = galleryImages.slice(0, 9);
  const row2 = galleryImages.slice(9, 17);
  const row3 = galleryImages.slice(17, 25);
  const row4 = galleryImages.slice(25, 33);

  const handleImageClick = (imageSrc: string) => {
    const index = galleryImages.findIndex(src => src === imageSrc);
    if (index !== -1) {
        setSelectedImage(index);
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="Moments of Discovery and Community at SARC"
        imageUrl="/images/hero/4.jpg"
      />
      <div className="flex flex-col gap-4 py-20 overflow-hidden">
          <Marquee pauseOnHover reverse className="[--duration:50s]">
              {row1.map((src) => <MarqueeImage key={src} src={src} onImageClick={() => handleImageClick(src)} />)}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:40s]">
              {row2.map((src) => <MarqueeImage key={src} src={src} onImageClick={() => handleImageClick(src)} />)}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:50s]">
              {row3.map((src) => <MarqueeImage key={src} src={src} onImageClick={() => handleImageClick(src)} />)}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:40s]">
              {row4.map((src) => <MarqueeImage key={src} src={src} onImageClick={() => handleImageClick(src)} />)}
          </Marquee>
      </div>
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          >
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75"
            >
              <ChevronLeft size={32} />
              <span className="sr-only">Previous Image</span>
            </button>
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage]}
                alt={`Gallery image ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75"
            >
              <ChevronRight size={32} />
              <span className="sr-only">Next Image</span>
            </button>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75"
            >
              <X size={24} />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
