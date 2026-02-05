'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';
import { heroCarouselItems } from '@/lib/data';

export default function HeroSection() {
  const allImages = placeholderImages.placeholderImages;

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden -mt-20 pt-20">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroCarouselItems.map((item, index) => {
             const image = allImages.find(img => img.id === item.image);
             return image ? (
                <CarouselItem key={index} className="h-full relative">
                <Image
                    src={image.imageUrl}
                    alt={item.title}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                    priority={index === 0}
                />
                </CarouselItem>
             ) : null;
          })}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container mx-auto px-4 z-10 animated-fade-in">
        <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            className="w-full max-w-4xl mx-auto text-center"
        >
             <CarouselContent>
                 {heroCarouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="py-8">
                             <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-shadow">
                                {item.title}
                            </h1>
                            <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl text-shadow">
                                {item.subtitle}
                            </p>
                        </div>
                    </CarouselItem>
                 ))}
             </CarouselContent>
        </Carousel>
         <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            <Link href="/admissions">Apply Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
