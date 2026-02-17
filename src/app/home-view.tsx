
'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, ShieldCheck, Users, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TESTIMONIALS, WHY_US_ITEMS } from '@/lib/constants';
import SectionTitle from './components/section-title';
import { Marquee } from './components/marquee';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { imageData } from '@/lib/image-data';
import { HeroCarousel } from './components/hero-carousel';
import { cn } from '@/lib/utils';


const TestimonialCard = ({
  image,
  author,
  role,
  text,
}: {
  image: string;
  author: string;
  role: string;
  text: string;
}) => {
  return (
    <div className="w-80 h-48 flex-shrink-0 p-6 testimonial-card relative">
      <Quote className="absolute -top-2 -left-2 w-24 h-24 text-primary/5 opacity-50" />
        <div className="flex items-center gap-4 relative z-10">
            <Avatar>
                <AvatarImage src={image} alt={author}/>
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-foreground">{author}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
        </div>
        <blockquote className="mt-4 text-foreground/90 italic relative z-10 before:content-['“'] after:content-['”'] line-clamp-3">
            {text}
        </blockquote>
    </div>
  );
};


export default function HomeView() {
  
  const testimonialsRow1 = TESTIMONIALS.slice(0, 8);
  const testimonialsRow2 = TESTIMONIALS.slice(8, 15);
  
  const STATS = [
    { number: '2017', label: 'Established', icon: Calendar },
    { number: '5k+', label: 'Graduates', icon: BookOpen },
    { number: '50+', label: 'Expert Faculty', icon: Users },
    { number: '99%', label: 'Success Rate', icon: ShieldCheck },
];
const aspectRatios = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/3]'];

  return (
    <div
      className="flex flex-col items-center"
    >
      {/* Hero Section */}
      <section className="relative w-full h-screen text-white overflow-hidden">
        <HeroCarousel />
      </section>

      {/* Stats Section */}
       <section className="w-full py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="testimonial-card p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="relative text-4xl lg:text-5xl font-bold text-foreground">{stat.number}</p>
                <p className="relative text-muted-foreground mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
       <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle title="A Legacy of Educational Excellence" subtitle="WELCOME TO SARC" align='left' />
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
              </p>
              <Button asChild size="lg" className='rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mt-8'>
                <Link href="/about/us">Learn More</Link>
              </Button>
            </div>
            <div className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-lg group">
                <Image
                    src={imageData.hero[3].src}
                    alt="Students collaborating on a project"
                    fill
                    className="object-cover relative rounded-[11px]"
                    data-ai-hint={imageData.hero[3].hint}
                />
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Marquee Section */}
      <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="A Glimpse of SARC Life"
            subtitle="OUR GALLERY"
            className="mb-12"
          />
          <div className="relative h-[600px] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-hidden rounded-lg [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <Marquee vertical className="h-full [--duration:60s] [--gap:1rem]">
                {imageData.gallery.slice(0, 6).map((image, i) => (
                    <div key={`col1-${i}`} className={cn("relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg", aspectRatios[i % aspectRatios.length])}>
                        <Image src={image.src} alt={image.title} fill className="object-cover" data-ai-hint={image.hint} />
                    </div>
                ))}
            </Marquee>
            <Marquee vertical reverse className="h-full [--duration:60s] [--gap:1rem]">
                 {imageData.gallery.slice(6, 12).map((image, i) => (
                    <div key={`col2-${i}`} className={cn("relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg", aspectRatios[i % aspectRatios.length])}>
                        <Image src={image.src} alt={image.title} fill className="object-cover" data-ai-hint={image.hint} />
                    </div>
                ))}
            </Marquee>
            <Marquee vertical className="h-full [--duration:60s] [--gap:1rem] hidden sm:flex">
                 {imageData.gallery.slice(12, 18).map((image, i) => (
                    <div key={`col3-${i}`} className={cn("relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg", aspectRatios[i % aspectRatios.length])}>
                        <Image src={image.src} alt={image.title} fill className="object-cover" data-ai-hint={image.hint}/>
                    </div>
                ))}
            </Marquee>
            <Marquee vertical reverse className="h-full [--duration:60s] [--gap:1rem] hidden md:flex">
                 {imageData.gallery.slice(18, 24).map((image, i) => (
                    <div key={`col4-${i}`} className={cn("relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg", aspectRatios[i % aspectRatios.length])}>
                        <Image src={image.src} alt={image.title} fill className="object-cover" data-ai-hint={image.hint}/>
                    </div>
                ))}
            </Marquee>
            <Marquee vertical className="h-full [--duration:60s] [--gap:1rem] hidden lg:flex">
                 {imageData.gallery.slice(24, 30).map((image, i) => (
                    <div key={`col5-${i}`} className={cn("relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg", aspectRatios[i % aspectRatios.length])}>
                        <Image src={image.src} alt={image.title} fill className="object-cover" data-ai-hint={image.hint}/>
                    </div>
                ))}
            </Marquee>
            <Marquee vertical reverse className="h-full [--duration:60s] [--gap:1rem] hidden lg:flex">
                 {imageData.gallery.slice(30, 36).map((image, i) => (
                    <div key={`col6-${i}`} className={cn("relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg", aspectRatios[i % aspectRatios.length])}>
                        <Image src={image.src} alt={image.title} fill className="object-cover" data-ai-hint={image.hint}/>
                    </div>
                ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-20 lg:py-28 bg-card/20">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose SARC?" subtitle="OUR COMMITMENT" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {WHY_US_ITEMS.map((item, index) => (
              <div
                key={item.title}
                className="transition-all duration-300 hover:-translate-y-2"
              >
                <div className="testimonial-card text-center h-full p-8">
                  <div className="relative mb-4 inline-block bg-primary/10 p-4 rounded-full">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="relative text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="relative text-muted-foreground mt-2 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="w-full py-20 lg:py-28">
        <SectionTitle title="What Our Community Says" subtitle="TESTIMONIALS" />
         <div className="relative mt-16 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <Marquee className="[--duration:60s] [--gap:1rem]">
              {testimonialsRow1.map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} {...testimonial} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:60s] [--gap:1rem]">
              {testimonialsRow2.map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} {...testimonial} />
              ))}
            </Marquee>
        </div>
      </section>


       {/* CTA Footer */}
      <section className="w-full mt-20">
         <div className="bg-primary">
            <div className="container mx-auto px-4 py-20 text-center text-primary-foreground">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-shadow">
                    Shape Your Future With Us
                </h2>
                <p className="mx-auto max-w-2xl md:text-lg mt-4 text-primary-foreground/80">
                    Join a community dedicated to excellence. Apply for admission and start your journey at SARC today.
                </p>
                <div>
                    <Button asChild size="lg" className="mt-10 bg-white text-primary hover:bg-slate-200 hover:scale-105 transition-all duration-300 rounded-full font-semibold">
                        <Link href="/admissions">Apply Now</Link>
                    </Button>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
}
