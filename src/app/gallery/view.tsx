
'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { Marquee } from '@/app/components/marquee';
import { imageData } from '@/lib/image-data';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Camera, Share2, Facebook, Instagram, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { GALLERY_CATEGORIES } from '@/lib/constants';

const TikTokIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
    <path
      fill="currentColor"
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.63-1.1-6-3.02-1.3-1.82-1.55-4.15-1.5-6.25.08-3.55 1.7-6.79 4.4-8.89 1.35-1.03 2.87-1.66 4.51-1.85.01 2.19-.01 4.38-.01 6.57 0 1.21-.43 2.38-1.19 3.26-1.28 1.55-3.53 2.05-5.22 1.15-1.2-.63-1.85-2.01-1.8-3.34.02-1.35.53-2.61 1.58-3.44.82-.65 1.83-1.02 2.85-1.1.02 1.48.01 2.96.01 4.44z"
    />
  </svg>
);

// Component for the Lightbox
const Lightbox = ({ images, selectedIndex, onClose, onPrev, onNext }: { images: typeof imageData.gallery, selectedIndex: number, onClose: () => void, onPrev: () => void, onNext: () => void }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.classList.add('lightbox-open');
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('lightbox-open');
        };
    }, [onClose, onNext, onPrev]);

    const image = images[selectedIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div 
                layoutId={`gallery-image-${image.src}`}
                className="relative w-full h-full max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-contain"
                />
            </motion.div>

            {/* Close Button */}
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close image viewer" className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full">
                <X size={32} />
            </button>

            {/* Prev Button */}
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full">
                <ArrowLeft size={32} />
            </button>
            
            {/* Next Button */}
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full">
                <ArrowRight size={32} />
            </button>
        </motion.div>
    );
};

export default function GalleryView() {
    const allImages = imageData.gallery;
    
    // Marquee rows
    const marqueeRows = [
        allImages.slice(0, 9),
        allImages.slice(9, 18),
        allImages.slice(18, 27),
        allImages.slice(27, 36),
    ];

    // Lightbox state
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };
    
    const handleCloseLightbox = () => {
        setSelectedImageIndex(null);
    };

    const handleNext = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! + 1) % allImages.length);
    };

    const handlePrev = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);
    };
    
    // Category filter state
    const [activeCategory, setActiveCategory] = useState('All');
    const filteredImages = activeCategory === 'All'
        ? allImages
        : allImages.filter(img => img.category === activeCategory);

    // Social Modal state
    const [socialModalOpen, setSocialModalOpen] = useState(false);

    return (
        <div>
            <PageHeader
                title="Our Gallery"
                subtitle="Moments of Discovery and Community"
            />
            
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <Lightbox
                        images={allImages}
                        selectedIndex={selectedImageIndex}
                        onClose={handleCloseLightbox}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
            
            <div className="py-20 space-y-28">

                {/* Section 1: Marquee */}
                <section>
                    <SectionTitle
                        title="Sights of SARC: A Visual Journey"
                        subtitle="Campus Life in Motion"
                        className="mb-16"
                    />
                    <div className="relative flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
                        {marqueeRows.map((row, rowIndex) => (
                             <Marquee key={rowIndex} reverse={rowIndex % 2 !== 0} pauseOnHover className="[--gap:1rem]">
                                {row.map(image => {
                                    const imageIndex = allImages.findIndex(img => img.src === image.src);
                                    return (
                                        <motion.div
                                            key={image.src}
                                            layoutId={`gallery-image-${image.src}`}
                                            onClick={() => handleImageClick(imageIndex)}
                                            className="w-80 h-56 relative rounded-xl overflow-hidden cursor-pointer shadow-lg"
                                        >
                                            <Image
                                                src={image.src}
                                                alt={image.title}
                                                fill
                                                className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                                data-ai-hint={image.hint}
                                            />
                                        </motion.div>
                                    )
                                })}
                            </Marquee>
                        ))}
                    </div>
                </section>
                
                {/* Section 2: Explore by Category */}
                <section className="container mx-auto px-4">
                    <SectionTitle
                        title="Discover by Category"
                        subtitle="Explore Our World"
                        className="mb-12"
                    />
                    <div className="flex justify-center flex-wrap gap-2 mb-12">
                        {GALLERY_CATEGORIES.map(category => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredImages.map(image => (
                             <div key={image.src} className="testimonial-card group overflow-hidden">
                                <div className="relative h-56">
                                     <Image
                                        src={image.src}
                                        alt={image.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        data-ai-hint={image.hint}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-foreground truncate">{image.title}</h3>
                                    <p className="text-sm text-muted-foreground">{image.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Coming Soon */}
                <section className="container mx-auto px-4">
                     <div className="bg-card/50 backdrop-blur-sm border p-12 text-center relative overflow-hidden rounded-2xl flex flex-col items-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-6 border border-primary/20">
                             <Camera className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-4 relative">More Photos Coming Soon!</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed relative">
                           We're continuously updating our gallery with new photos showcasing student projects, campus life, educational tours, and innovation labs. Check back soon for more!
                        </p>
                        <Button className="mt-8" onClick={() => setSocialModalOpen(true)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Follow Us on Social Media
                        </Button>
                    </div>
                </section>

            </div>

             <Dialog open={socialModalOpen} onOpenChange={setSocialModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle>Follow Our Journey</DialogTitle>
                        <DialogDescription>
                            Stay connected with SARC on social media for the latest updates, events, and moments.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-around items-center py-8">
                        <Link href="https://www.facebook.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="p-4 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-16 h-16 flex items-center justify-center">
                            <Facebook size={32} />
                        </Link>
                        <Link href="https://instagram.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="p-4 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-16 h-16 flex items-center justify-center">
                           <Instagram size={32} />
                        </Link>
                        <Link href="https://www.tiktok.com/@sarceducationfoun" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="p-4 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-16 h-16 flex items-center justify-center">
                            <TikTokIcon />
                        </Link>
                        <Link href="https://github.com/sarceducationfoundation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Github" className="p-4 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-16 h-16 flex items-center justify-center">
                            <Github size={32} />
                        </Link>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}
