'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { TESTIMONIALS, STATS, HERO_IMAGES, WHY_US_ITEMS } from '@/lib/constants';
import SectionTitle from './components/section-title';
import Marquee from './components/marquee';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);
  
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center"
    >
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-80px)] text-white overflow-hidden">
        <AnimatePresence>
            <motion.div
                key={currentImageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
                <Image
                    src={HERO_IMAGES[currentImageIndex].src}
                    alt={HERO_IMAGES[currentImageIndex].alt}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-slate-900/60" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <div className='inline-block bg-black/20 border border-white/20 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm mb-4'>
            Your Partner For Education
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-shadow-lg">
            Pioneering Futures
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-slate-200 mt-2 text-shadow-md">
            Honoring Traditions
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200">
            A Legacy of Excellence in Education Since 2017.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105'>
              <Link href="/about/why-us">Explore Programs</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className='rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-transform hover:scale-105'>
              <Link href="/admissions">Online Admission</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <p className="text-4xl lg:text-5xl font-bold text-emerald-600">{stat.number}</p>
                <p className="text-slate-500 mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
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
              <p className="mt-6 text-slate-600 leading-relaxed">
                Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
              </p>
              <Button asChild size="lg" className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white mt-8'>
                <Link href="/about/us">Learn More <ArrowRight className="ml-2" /></Link>
              </Button>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://picsum.photos/seed/homepage/800/600"
                alt="Students collaborating"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose SARC?" subtitle="OUR COMMITMENT" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {WHY_US_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <div className="bg-white text-center h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-500/10 rounded-lg shadow-md">
                  <div className="mb-4 inline-block bg-emerald-100 text-emerald-600 p-4 rounded-full">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                  <p className="text-slate-600 mt-2 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="w-full py-20 lg:py-28 overflow-hidden">
        <SectionTitle title="What Our Community Says" subtitle="TESTIMONIALS" />
        <div className="mt-16 space-y-8">
            <Marquee>
                {TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2)).map((testimonial, i) => (
                    <div key={i} className="glass-card w-[80vw] max-w-xs sm:w-[450px] sm:max-w-none mx-6 flex-shrink-0 p-8 rounded-3xl relative whitespace-normal">
                        <Quote className="absolute top-6 left-6 w-16 h-16 text-emerald-600/10" strokeWidth={1.5} />
                        <div className="relative z-10 flex flex-col h-full">
                            <p className="text-slate-600 text-lg font-medium leading-relaxed flex-grow italic">"{testimonial.text}"</p>
                            <div className='flex items-center gap-4 mt-6 pt-6 border-t border-slate-200/50'>
                                <Image src={testimonial.image} alt={testimonial.author} width={56} height={56} className="rounded-full border-2 border-white/50" />
                                <div>
                                    <h4 className="font-semibold text-slate-800">{testimonial.author}</h4>
                                    <p className='text-sm text-slate-500'>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Marquee>
            <Marquee direction="right">
                {TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2)).map((testimonial, i) => (
                     <div key={i} className="glass-card w-[80vw] max-w-xs sm:w-[450px] sm:max-w-none mx-6 flex-shrink-0 p-8 rounded-3xl relative whitespace-normal">
                        <Quote className="absolute top-6 left-6 w-16 h-16 text-emerald-600/10" strokeWidth={1.5} />
                        <div className="relative z-10 flex flex-col h-full">
                            <p className="text-slate-600 text-lg font-medium leading-relaxed flex-grow italic">"{testimonial.text}"</p>
                            <div className='flex items-center gap-4 mt-6 pt-6 border-t border-slate-200/50'>
                                <Image src={testimonial.image} alt={testimonial.author} width={56} height={56} className="rounded-full border-2 border-white/50" />
                                <div>
                                    <h4 className="font-semibold text-slate-800">{testimonial.author}</h4>
                                    <p className='text-sm text-slate-500'>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <Link href="/admissions">Apply for Admissions <ArrowRight className="ml-2" /></Link>
                    </Button>
                </motion.div>
            </div>
         </div>
      </section>
    </motion.div>
  );
}
