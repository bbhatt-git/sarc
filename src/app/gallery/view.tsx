'use client';
import Image from 'next/image';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES } from '@/lib/constants';
import Marquee from '@/app/components/marquee';

export default function GalleryView() {
    const row1Images = GALLERY_IMAGES.slice(0, 10);
    const row2Images = GALLERY_IMAGES.slice(10, 20);
    const row3Images = GALLERY_IMAGES.slice(20, 30);
    const row4Images = GALLERY_IMAGES.slice(30, 40);

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Gallery" subtitle="Explore moments of learning, discovery, and community at SARC." />

            <div className="mt-16 space-y-8 overflow-hidden">
                <Marquee direction="left">
                    {row1Images.map((image, i) => (
                        <div key={`marquee-1-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill sizes="320px" className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                 <Marquee direction="right">
                    {row2Images.map((image, i) => (
                         <div key={`marquee-2-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill sizes="320px" className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                <Marquee direction="left">
                    {row3Images.map((image, i) => (
                        <div key={`marquee-3-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill sizes="320px" className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
                 <Marquee direction="right">
                    {row4Images.map((image, i) => (
                         <div key={`marquee-4-${i}`} className="relative w-80 h-56 mx-4 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl glass-card p-2">
                            <Image src={image.src} alt={image.hint} data-ai-hint={image.hint} fill sizes="320px" className="object-cover rounded-xl" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
