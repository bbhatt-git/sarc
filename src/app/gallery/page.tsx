'use client';
import Image from 'next/image';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES } from '@/lib/constants';
import Marquee from '@/app/components/marquee';

export default function GalleryPage() {
    const firstRowImages = GALLERY_IMAGES.slice(0, Math.ceil(GALLERY_IMAGES.length / 2));
    const secondRowImages = GALLERY_IMAGES.slice(Math.ceil(GALLERY_IMAGES.length / 2));
    // Create some variation for the next rows by rotating the array
    const thirdRowImages = [...GALLERY_IMAGES.slice(5), ...GALLERY_IMAGES.slice(0, 5)];
    const fourthRowImages = [...GALLERY_IMAGES.slice(10), ...GALLERY_IMAGES.slice(0, 10)];

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Gallery" subtitle="Explore moments of learning, discovery, and community at SARC." />

            <div className="mt-16 space-y-8 overflow-hidden">
                <Marquee direction="right">
                    {firstRowImages.map((image, i) => (
                        <div key={`marquee-1-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                 <Marquee>
                    {secondRowImages.map((image, i) => (
                         <div key={`marquee-2-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                <Marquee direction="right">
                    {thirdRowImages.map((image, i) => (
                        <div key={`marquee-3-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                 <Marquee>
                    {fourthRowImages.map((image, i) => (
                         <div key={`marquee-4-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
