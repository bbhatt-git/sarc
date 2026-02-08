'use client';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES } from '@/lib/constants';
import Marquee from '@/app/components/marquee';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function GalleryView() {
    const [pausedRow, setPausedRow] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const rows = [
        { images: GALLERY_IMAGES.slice(0, 10), direction: 'left' as const },
        { images: GALLERY_IMAGES.slice(10, 20), direction: 'right' as const },
        { images: GALLERY_IMAGES.slice(20, 30), direction: 'left' as const },
        { images: GALLERY_IMAGES.slice(30, 40), direction: 'right' as const },
    ];

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setPausedRow(null); // Unpause any paused row when modal opens
    };
    
    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Gallery" subtitle="Explore moments of learning, discovery, and community at SARC." />

            <div className="mt-16 space-y-4 overflow-hidden">
                {rows.map((row, rowIndex) => (
                    <div 
                        key={rowIndex}
                        onMouseEnter={() => !selectedImage && setPausedRow(rowIndex + 1)} 
                        onMouseLeave={() => setPausedRow(null)}
                    >
                        <Marquee direction={row.direction} paused={pausedRow === (rowIndex + 1) || !!selectedImage}>
                            {row.images.map((image, i) => (
                                <button
                                    key={`marquee-${rowIndex}-${i}`}
                                    className="relative mx-2 flex-shrink-0 w-80 h-56 focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl overflow-hidden"
                                    onClick={() => handleImageClick(image.src)}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.hint}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </button>
                            ))}
                        </Marquee>
                    </div>
                ))}
            </div>
            
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image 
                                src={selectedImage}
                                alt="Selected gallery image"
                                width={1200}
                                height={800}
                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                            <button 
                                onClick={handleClose}
                                className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-slate-800 hover:bg-slate-200 transition-colors shadow-lg z-10"
                                aria-label="Close image view"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
