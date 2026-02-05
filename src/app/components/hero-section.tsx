'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

const heroImages = [
  { src: '/images/hero/0.jpg', alt: 'SARC campus view' },
  { src: '/images/hero/1.jpg', alt: 'Students in a modern classroom' },
  { src: '/images/hero/2.jpg', alt: 'A state-of-the-art science laboratory' },
  { src: '/images/hero/3.jpg', alt: 'Students collaborating on a project' },
  { src: '/images/hero/4.jpg', alt: 'Graduation ceremony with students celebrating' },
];

const heroCarouselItems = [
  {
    id: 'hero-1',
    title: 'Pioneering Futures, Honoring Traditions',
    subtitle: 'At SARC, we are dedicated to fostering an environment of academic excellence, innovation, and character development for the leaders of tomorrow.',
  },
  {
    id: 'hero-2',
    title: 'A Legacy of Educational Excellence',
    subtitle: 'Discover a transformative learning experience that challenges the mind and inspires the spirit.',
  },
  {
    id: 'hero-3',
    title: 'Shape Your Future With Us',
    subtitle: 'Join a vibrant community of scholars, innovators, and successful alumni who are making a difference in the world.',
  }
];

export default function HeroSection() {

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden -mt-20 pt-20">
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

      <div className="relative container mx-auto px-4 z-10 animated-fade-in text-center">
        <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            className="w-full max-w-4xl mx-auto"
        >
             <CarouselContent>
                 {heroCarouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="py-8">
                             <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-6xl md:text-7xl text-shadow">
                                {item.title}
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-neutral-200 text-shadow">
                                {item.subtitle}
                            </p>
                        </div>
                    </CarouselItem>
                 ))}
             </CarouselContent>
        </Carousel>
         <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg" className="hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-transform">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-transform">
            <Link href="/admissions">Apply Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
