'use client';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES } from '@/lib/constants';
import Marquee from '@/app/components/marquee';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

type GalleryImage = {
    src: string;
    hint: string;
    category: string;
};

export default function GalleryView() {
    const [pausedRow, setPausedRow] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const rows = [
        { images: GALLERY_IMAGES.slice(0, 10), direction: 'left' as const },
        { images: GALLERY_IMAGES.slice(10, 20), direction: 'right' as const },
        { images: GALLERY_IMAGES.slice(20, 30), direction: 'left' as const },
        { images: GALLERY_IMAGES.slice(30, 40), direction: 'right' as const },
    ];

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setPausedRow(null);
    };
    
    const handleClose = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const header = document.querySelector('header');
        if (!header) return;

        if (selectedImage) {
            header.style.display = 'none';
        } else {
            header.style.display = 'flex';
        }
        
        return () => {
            if (header) {
                header.style.display = 'flex';
            }
        };
    }, [selectedImage]);

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
                                <motion.div
                                    layoutId={image.src}
                                    key={`marquee-${rowIndex}-${i}`}
                                    className="relative mx-2 flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden shadow-md cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.hint}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
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
                            layoutId={selectedImage.src}
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image 
                                src={selectedImage.src}
                                alt={selectedImage.hint}
                                width={1200}
                                height={800}
                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                         <motion.button 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={handleClose}
                            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors z-10"
                            aria-label="Close image view"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
