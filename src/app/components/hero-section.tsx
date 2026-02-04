'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

type HeroSectionProps = {
  headlines: {
    headline: string;
    subHeadline: string;
  }[];
};

const backgroundImages = [
  '/images/hero/0.jpg',
  '/images/hero/1.jpg',
  '/images/hero/2.jpg',
  '/images/hero/3.jpg',
  '/images/hero/4.jpg',
];

export default function HeroSection({ headlines }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-white overflow-hidden">
       <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          {backgroundImages.map((src, index) => (
            <CarouselItem key={index} className="h-full relative">
              <Image
                src={src}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container mx-auto px-4 text-center z-10 animated-fade-in">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {headlines.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-shadow-lg">
                    {item.headline}
                  </h1>
                  <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl text-shadow">
                    {item.subHeadline}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30 border-none" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30 border-none" />
          </div>
        </Carousel>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/admissions">Apply Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
