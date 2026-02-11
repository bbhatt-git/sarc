'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import dynamic from 'next/dynamic';

import { TESTIMONIALS, STATS, WHY_US_ITEMS, HERO_IMAGES } from '@/lib/constants';
import SectionTitle from './components/section-title';
import { Marquee } from './components/marquee';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const CodeRobot = dynamic(() => import('./components/code-robot').then(mod => mod.default), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
        </div>
    )
});

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
    <div className="w-80 p-6 testimonial-card">
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarImage src={image} alt={author}/>
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-foreground">{author}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
        </div>
        <blockquote className="mt-4 text-foreground/90 italic before:content-['“'] after:content-['”']">
            {text}
        </blockquote>
    </div>
  );
};


export default function HomeView() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
    viewport: { once: true, amount: 0.2 }
  };
  
  const testimonialsRow1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const testimonialsRow2 = [...TESTIMONIALS.slice(3, 6), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3, 6), ...TESTIMONIALS.slice(0, 3)];
  const testimonialsRow3 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center"
    >
      {/* Hero Section */}
      <section className="relative w-full h-screen text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
        <Carousel
            className="absolute inset-0 w-full h-full"
            plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: false,
                }),
            ]}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent className="h-full">
                {HERO_IMAGES.map((image, index) => (
                    <CarouselItem key={index} className="relative h-full">
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
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-black/60 z-10" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 inline-block">
              <p className="text-sm font-medium text-slate-200">Your Partner For Education</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-shadow-lg max-w-4xl">
              Welcome to SARC Education Foundation
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-200 mt-4 text-shadow-md max-w-3xl">
              Leading the way in Science & Management education in Far-West Nepal. Fostering academic excellence, moral integrity, and global competence since 2017.
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
               <Button asChild size="lg" className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-transform hover:scale-105'>
                <Link href="/about/us">Learn More</Link>
              </Button>
              <Button asChild size="lg" className='rounded-full bg-sky-500/10 backdrop-blur-sm border border-sky-400/50 text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 hover:scale-105'>
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
       <section className="w-full py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                className="testimonial-card p-8"
              >
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <p className="relative text-4xl lg:text-5xl font-bold text-emerald-600 dark:text-emerald-400">{stat.number}</p>
                <p className="relative text-muted-foreground mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
       <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeIn}>
              <SectionTitle title="A Legacy of Educational Excellence" subtitle="WELCOME TO SARC" align='left' />
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
              </p>
              <Button asChild size="lg" className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white mt-8'>
                <Link href="/about/us">Learn More <ArrowRight className="ml-2" /></Link>
              </Button>
            </motion.div>
            <motion.div {...fadeIn} className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-lg group">
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <Image
                    src="/images/hero/3.jpg"
                    alt="Students collaborating on a project"
                    fill
                    className="object-cover relative rounded-[11px]"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive AI Learning Section */}
      <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }}>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 dark:bg-sky-900/50 px-4 py-2 border border-sky-200/50 dark:border-sky-800/50 mb-6">
                    <Sparkles className="w-5 h-5 text-sky-500" />
                    <p className="font-semibold text-sm text-sky-600 dark:text-sky-400">Next-Gen AI Technology</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    Interactive <span className="text-sky-500">AI</span><br />
                    <span className="text-emerald-500">Learning</span>
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
                    Experience the future of AI-powered automation. Our voice agents and MVP solutions create immersive experiences that capture attention and drive conversions. Students learn through interactive AI companions, adaptive learning systems, and real-time personalized feedback.
                </p>
                <Button asChild size="lg" className="rounded-full bg-sky-500 hover:bg-sky-600 text-white mt-8 shadow-lg shadow-sky-500/20 transition-transform hover:scale-105">
                    <Link href="#">Explore Our Solutions</Link>
                </Button>
            </motion.div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.4 }} className="relative w-full h-[450px]">
                <div className="testimonial-card h-full flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 overflow-hidden">
                    <div className="relative w-full h-full">
                        <CodeRobot />
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm border border-white/10 shadow-lg pointer-events-none">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Alex talking...
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-20 lg:py-28 bg-card/20">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose SARC?" subtitle="OUR COMMITMENT" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {WHY_US_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <div className="testimonial-card text-center h-full p-8">
                   <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="relative mb-4 inline-block bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-full">
                    <item.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="relative text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="relative text-muted-foreground mt-2 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="w-full py-20 lg:py-28">
        <SectionTitle title="What Our Community Says" subtitle="TESTIMONIALS" />
         <div className="relative mt-16 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <Marquee reverse className="[--duration:180s]">
              {testimonialsRow1.map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} {...testimonial} />
              ))}
            </Marquee>
            <Marquee className="[--duration:180s]">
              {testimonialsRow2.map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} {...testimonial} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:180s]">
              {testimonialsRow3.map((testimonial, index) => (
                <TestimonialCard key={`row3-${index}`} {...testimonial} />
              ))}
            </Marquee>
        </div>
      </section>


       {/* CTA Footer */}
      <section className="w-full mt-20">
         <div className="bg-emerald-600">
            <div className="container mx-auto px-4 py-20 text-center text-white">
                <motion.h2 {...fadeIn} className="text-3xl lg:text-4xl font-bold tracking-tight text-shadow">
                    Shape Your Future With Us
                </motion.h2>
                <motion.p {...fadeIn} transition={{...fadeIn.transition, delay: 0.1}} className="mx-auto max-w-2xl md:text-lg mt-4 text-emerald-100">
                    Join a community dedicated to excellence. Apply for admission and start your journey at SARC today.
                </motion.p>
                <motion.div {...fadeIn} transition={{...fadeIn.transition, delay: 0.2}}>
                    <Button asChild size="lg" className="mt-10 bg-white text-slate-800 hover:bg-slate-200 hover:scale-105 transition-all duration-300 rounded-full font-semibold">
                        <Link href="/admissions">Apply Now <ArrowRight className="ml-2" /></Link>
                    </Button>
                </motion.div>
            </div>
         </div>
      </section>
    </motion.div>
  );
}
