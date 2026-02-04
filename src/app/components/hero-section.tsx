'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const heroImages = [
    { src: '/images/hero/0.jpg', alt: 'SARC campus view' },
    { src: '/images/hero/1.jpg', alt: 'Students in a modern classroom' },
    { src: '/images/hero/2.jpg', alt: 'A state-of-the-art science laboratory' },
    { src: '/images/hero/3.jpg', alt: 'Students collaborating on a project' },
    { src: '/images/hero/4.jpg', alt: 'Graduation ceremony with students celebrating' },
  ];

  const headline = {
    headline: "Fostering Excellence, Building Character",
    subHeadline: "A transformative education for the leaders of tomorrow."
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-white overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full relative">
              <Image
                src={image.src}
                alt={image.alt}
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
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-shadow-lg">
          {headline.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl text-shadow">
          {headline.subHeadline}
        </p>
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
