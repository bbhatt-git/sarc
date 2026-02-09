'use client';

import { ThreeDMarquee } from '@/app/components/3d-marquee';
import PageHeader from '@/app/components/page-header';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const galleryImages = Array.from({ length: 33 }, (_, i) => `/images/gallery/${i + 1}.jpg`);

export default function GalleryView() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
      <div className="container mx-auto px-4 py-20">
        <ThreeDMarquee images={galleryImages} onImageClick={setSelectedImage} />
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
              onClick={handlePrev}
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
              onClick={handleNext}
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
