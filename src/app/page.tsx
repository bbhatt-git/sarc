'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Building, Users, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FACILITIES, NEWS_ITEMS, STATS, TESTIMONIALS } from '@/lib/constants';
import SectionTitle from './components/section-title';

const SpotlightCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`relative glass-container p-8 overflow-hidden group ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(5, 150, 105, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};


const Marquee = ({ children, direction = 'left' }: { children: React.ReactNode, direction?: 'left' | 'right' }) => {
    const marqueeVariants = {
        animate: {
            x: direction === 'left' ? [0, '-50%'] : ['-50%', 0],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className="w-full overflow-hidden">
            <motion.div
                className="flex whitespace-nowrap"
                variants={marqueeVariants}
                animate="animate"
            >
                {children}{children}
            </motion.div>
        </div>
    );
};

const TextReveal = ({ text }: { text: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const words = text.split(" ");
    return (
        <p ref={ref} className="flex flex-wrap gap-x-2 text-2xl md:text-3xl leading-tight">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                return (
                    <motion.span key={i} style={{ opacity }} className="text-slate-200">{word}</motion.span>
                );
            })}
        </p>
    );
};

export default function Home() {
  const facilitiesRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: facilitiesRef,
    offset: ['start end', 'end start']
  });

  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center">

      {/* Hero Section */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/hero/0.jpg"
          alt="SARC campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <div className='inline-block bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-4'>
            Affiliated to NEB
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-shadow-lg">
            Pioneering Futures
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-slate-200 mt-2 text-shadow-md">
            Honoring Traditions
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
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

      {/* Stats & Intro */}
      <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-24">
                {STATS.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="animated-fade-in"
                  >
                    <p className="text-5xl font-bold text-emerald-500">{stat.number}</p>
                    <p className="text-slate-400 mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                  </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="space-y-6">
                    <SectionTitle title="Legacy of Excellence" subtitle="WELCOME TO SARC" align='left' />
                    <TextReveal text="Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character and values that shape future leaders and responsible global citizens." />
                    <Button asChild size="lg" className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4'>
                        <Link href="/about/us">Learn More <ArrowRight className="ml-2" /></Link>
                    </Button>
                </motion.div>
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-950">
                    <Image 
                      src="/images/hero/1.jpg" 
                      alt="Students collaborating"
                      fill
                      className="object-cover" 
                    />
                </motion.div>
            </div>
        </div>
      </section>
      
      {/* Programs Preview */}
      <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
            <SectionTitle title="Academic Programs" subtitle="EXPLORE OUR OFFERINGS" />
            <div className="grid md:grid-cols-2 gap-8 mt-16">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Link href="#" className='block group'>
                        <div className="glass-container p-8 h-full transition-transform group-hover:-translate-y-2">
                            <h3 className="text-3xl font-bold text-white mb-4">Science Stream (+2)</h3>
                            <p className="text-slate-400 mb-6">A rigorous program designed for aspiring doctors, engineers, and scientists, focusing on deep conceptual understanding and practical application.</p>
                            <div className='flex flex-wrap gap-2'>
                                <span className='text-xs bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full'>Physics</span>
                                <span className='text-xs bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full'>Chemistry</span>
                                <span className='text-xs bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full'>Biology</span>
                                <span className='text-xs bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full'>Computer</span>
                            </div>
                        </div>
                    </Link>
                </motion.div>
                 <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Link href="#" className='block group'>
                         <div className="glass-container p-8 h-full transition-transform group-hover:-translate-y-2">
                            <h3 className="text-3xl font-bold text-white mb-4">Management Stream (+2)</h3>
                            <p className="text-slate-400 mb-6">Equipping future entrepreneurs and business leaders with a strong foundation in economics, accounting, and business studies.</p>
                            <div className='flex flex-wrap gap-2'>
                                <span className='text-xs bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full'>Economics</span>
                                <span className='text-xs bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full'>Business Studies</span>
                                <span className='text-xs bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full'>Hotel Management</span>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionTitle title="Our Facilities" subtitle="WORLD-CLASS INFRASTRUCTURE" />
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {FACILITIES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <SpotlightCard className="text-center h-full">
                    <div className="mb-4 inline-block bg-slate-800 p-4 rounded-full border border-slate-700">
                        <item.icon className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400 mt-2 text-sm">{item.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
           <div className="md:hidden mt-16 space-y-8" ref={facilitiesRef}>
              <motion.div style={{ y: card1Y }}><SpotlightCard>{FACILITIES[0].title}</SpotlightCard></motion.div>
              <motion.div style={{ y: card2Y }}><SpotlightCard>{FACILITIES[1].title}</SpotlightCard></motion.div>
              <motion.div style={{ y: card3Y }}><SpotlightCard>{FACILITIES[2].title}</SpotlightCard></motion.div>
              <SpotlightCard>{FACILITIES[3].title}</SpotlightCard>
           </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="w-full py-20 lg:py-28 overflow-hidden">
        <SectionTitle title="Student Voices" subtitle="TESTIMONIALS" />
        <div className="mt-16 flex flex-col gap-8">
            <Marquee direction="left">
                {TESTIMONIALS.slice(0, 4).map((testimonial, i) => (
                    <div key={i} className="glass-container mx-4 p-6 w-80 md:w-96 flex-shrink-0">
                       <p className="text-slate-300">"{testimonial.text}"</p>
                       <div className='flex items-center gap-4 mt-4'>
                          <Image src={testimonial.image} alt={testimonial.author} width={40} height={40} className="rounded-full" />
                          <div>
                            <h4 className="font-bold text-white">{testimonial.author}</h4>
                            <p className='text-sm text-slate-400'>{testimonial.role}</p>
                          </div>
                       </div>
                    </div>
                ))}
            </Marquee>
             <Marquee direction="right">
                {TESTIMONIALS.slice(4).map((testimonial, i) => (
                    <div key={i} className="glass-container mx-4 p-6 w-80 md:w-96 flex-shrink-0">
                       <p className="text-slate-300">"{testimonial.text}"</p>
                       <div className='flex items-center gap-4 mt-4'>
                          <Image src={testimonial.image} alt={testimonial.author} width={40} height={40} className="rounded-full" />
                          <div>
                            <h4 className="font-bold text-white">{testimonial.author}</h4>
                            <p className='text-sm text-slate-400'>{testimonial.role}</p>
                          </div>
                       </div>
                    </div>
                ))}
            </Marquee>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full mt-20">
         <div className="bg-gradient-to-tr from-emerald-800 to-sky-800 skew-y-[-3deg]">
            <div className="skew-y-[3deg] container mx-auto px-4 py-24 text-center text-white">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-shadow">
                    Shape Your Future With Us
                </h2>
                <p className="mx-auto max-w-2xl md:text-lg mt-4 text-slate-200">
                    Join a community dedicated to excellence. Apply for admission and start your journey at SARC today.
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-10 bg-white text-slate-900 hover:bg-slate-200 hover:scale-105 transition-all duration-300 rounded-full">
                    <Link href="/admissions">Apply for Admissions <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>
         </div>
      </section>
    </motion.div>
  );
}
