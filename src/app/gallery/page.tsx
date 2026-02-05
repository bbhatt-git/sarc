'use client';
import Image from 'next/image';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES } from '@/lib/constants';
import Marquee from '@/app/components/marquee';

export default function GalleryPage() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Gallery" subtitle="Explore moments of learning, discovery, and community at SARC." />

            <div className="mt-16 space-y-8 overflow-hidden">
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
        </div>
    );
}
