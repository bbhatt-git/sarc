'use client';

import type { HeroHeadlinesOutput } from '@/ai/flows/generate-hero-headlines';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import Link from 'next/link';

type HeroSectionProps = {
  headlines: HeroHeadlinesOutput['headlines'];
};

export default function HeroSection({ headlines }: HeroSectionProps) {
  const heroBg = placeholderImages.placeholderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {heroBg && (
        <Image
          src={heroBg.imageUrl}
          alt={heroBg.description}
          data-ai-hint={heroBg.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
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
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-shadow-lg">
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
