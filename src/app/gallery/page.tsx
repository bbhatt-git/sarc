'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Marquee from '@/app/components/marquee';

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const filteredImages = activeCategory === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === activeCategory);

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Gallery" subtitle="Explore moments of learning, discovery, and community at SARC." />

            <div className="container mx-auto px-4 mt-16">
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors",
                            activeCategory === 'All' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        )}
                    >
                        All
                    </button>
                    {GALLERY_CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors",
                                activeCategory === category ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="masonry-grid"
                >
                    {filteredImages.map((image, index) => (
                        <motion.div
                            layout
                            key={image.src + index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="masonry-item"
                        >
                             <div className="overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={image.src}
                                    alt={image.hint}
                                    width={500}
                                    height={700}
                                    data-ai-hint={image.hint}
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                />
                             </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="mt-24 space-y-8 overflow-hidden">
                <Marquee direction="right">
                    {GALLERY_IMAGES.slice(0, Math.ceil(GALLERY_IMAGES.length / 2)).map((image, i) => (
                        <div key={`marquee-1-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                 <Marquee>
                    {GALLERY_IMAGES.slice(Math.ceil(GALLERY_IMAGES.length / 2)).map((image, i) => (
                         <div key={`marquee-2-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
            </div>

            <style jsx>{`
                .masonry-grid {
                    column-count: 1;
                    column-gap: 1.5rem;
                }
                @media (min-width: 640px) {
                    .masonry-grid {
                        column-count: 2;
                    }
                }
                @media (min-width: 1024px) {
                    .masonry-grid {
                        column-count: 3;
                    }
                }
                .masonry-item {
                    display: inline-block;
                    width: 100%;
                    margin-bottom: 1.5rem;
                    break-inside: avoid;
                }
            `}</style>
        </div>
    );
}
