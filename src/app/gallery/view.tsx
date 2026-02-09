'use client';

import PageHeader from '@/app/components/page-header';
import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryImages = Array.from({ length: 41 }, (_, i) => ({
  src: `/images/gallery/${i}.jpg`,
  alt: `SARC gallery image ${i + 1}`,
}));

export default function GalleryView() {
  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="Moments of Discovery and Community at SARC"
        imageUrl="/images/hero/4.jpg"
      />
      <div className="container mx-auto px-4 py-20">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.05 }}
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="overflow-hidden rounded-2xl shadow-lg break-inside-avoid group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
