'use client';
import SectionTitle from '@/app/components/section-title';
import { GALLERY_IMAGES } from '@/lib/constants';
import Marquee from '@/app/components/marquee';
import TiltedCard from '../components/tilted-card';
import { useState } from 'react';

export default function GalleryView() {
    const [pausedRow, setPausedRow] = useState<number | null>(null);

    const row1Images = GALLERY_IMAGES.slice(0, 10);
    const row2Images = GALLERY_IMAGES.slice(10, 20);
    const row3Images = GALLERY_IMAGES.slice(20, 30);
    const row4Images = GALLERY_IMAGES.slice(30, 40);

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Gallery" subtitle="Explore moments of learning, discovery, and community at SARC." />

            <div className="mt-16 space-y-8 overflow-hidden">
                <div onMouseEnter={() => setPausedRow(1)} onMouseLeave={() => setPausedRow(null)}>
                    <Marquee direction="left" paused={pausedRow === 1}>
                        {row1Images.map((image, i) => (
                            <div key={`marquee-1-${i}`} className="mx-4 flex-shrink-0 w-80 h-56 testimonial-card p-2">
                                <TiltedCard
                                    imageSrc={image.src}
                                    altText={image.hint}
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    imageHeight="100%"
                                    imageWidth="100%"
                                    scaleOnHover={1.15}
                                    rotateAmplitude={8}
                                    showTooltip={false}
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
                 <div onMouseEnter={() => setPausedRow(2)} onMouseLeave={() => setPausedRow(null)}>
                    <Marquee direction="right" paused={pausedRow === 2}>
                        {row2Images.map((image, i) => (
                             <div key={`marquee-2-${i}`} className="mx-4 flex-shrink-0 w-80 h-56 testimonial-card p-2">
                                <TiltedCard
                                    imageSrc={image.src}
                                    altText={image.hint}
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    imageHeight="100%"
                                    imageWidth="100%"
                                    scaleOnHover={1.15}
                                    rotateAmplitude={8}
                                    showTooltip={false}
                                />
                            </div>
                        ))}
                    </Marquee>
                 </div>
                <div onMouseEnter={() => setPausedRow(3)} onMouseLeave={() => setPausedRow(null)}>
                    <Marquee direction="left" paused={pausedRow === 3}>
                        {row3Images.map((image, i) => (
                            <div key={`marquee-3-${i}`} className="mx-4 flex-shrink-0 w-80 h-56 testimonial-card p-2">
                                <TiltedCard
                                    imageSrc={image.src}
                                    altText={image.hint}
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    imageHeight="100%"
                                    imageWidth="100%"
                                    scaleOnHover={1.15}
                                    rotateAmplitude={8}
                                    showTooltip={false}
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
                 <div onMouseEnter={() => setPausedRow(4)} onMouseLeave={() => setPausedRow(null)}>
                    <Marquee direction="right" paused={pausedRow === 4}>
                        {row4Images.map((image, i) => (
                             <div key={`marquee-4-${i}`} className="mx-4 flex-shrink-0 w-80 h-56 testimonial-card p-2">
                                <TiltedCard
                                    imageSrc={image.src}
                                    altText={image.hint}
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    imageHeight="100%"
                                    imageWidth="100%"
                                    scaleOnHover={1.15}
                                    rotateAmplitude={8}
                                    showTooltip={false}
                                />
                            </div>
                        ))}
                    </Marquee>
                 </div>
            </div>
        </div>
    );
}
