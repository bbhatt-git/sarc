'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageData } from '@/lib/image-data';
import { AnimatePresence, motion } from 'framer-motion';

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageData.hero.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <Image
            src={imageData.hero[index].src}
            alt={imageData.hero[index].hint}
            fill
            className="object-cover"
            priority={index === 0}
            data-ai-hint={imageData.hero[index].hint}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
