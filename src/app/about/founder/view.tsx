'use client';
import SectionTitle from '@/app/components/section-title';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FounderView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Founder" subtitle="The Visionary Behind SARC" />
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="grid md:grid-cols-3 gap-12 items-center">
                    <motion.div 
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.7, delay: 0.2 }}
                         className="md:col-span-1"
                    >
                        <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-lg">
                            <Image
                                src="/images/founder.png"
                                alt="Laxman Basnet, Founder of SARC"
                                fill
                                className="object-cover"
                            />
                        </div>
                         <div className="mt-4 text-center">
                            <h3 className="text-2xl font-bold text-foreground">Laxman Basnet, Ph.D.</h3>
                            <p className="text-emerald-600 font-medium">Founder & Visionary</p>
                            <p className="text-sm text-muted-foreground">Ph.D. in Education | 20+ Years Experience</p>
                            <p className="text-sm font-semibold text-muted-foreground mt-1">Educational Innovator</p>
                        </div>
                    </motion.div>
                    <div className="space-y-6 md:col-span-2">
                        <h2 className="text-3xl font-bold text-foreground">A Message from the Founder</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            SARC believes education should be modern, practical, and useful for real life. We combine books with activities, projects, and technology so students learn with purpose and grow with confidence.
                        </p>
                         <blockquote className="border-l-4 border-emerald-500 pl-4 italic">
                            <p className="text-xl font-semibold text-foreground">
                                “Learn with Purpose. Lead with Confidence.”
                            </p>
                        </blockquote>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Since our inception, the goal has been to create more than just a school. We envisioned a vibrant community dedicated to nurturing not just academic brilliance, but also the character, values, and essential life skills that shape future leaders and responsible global citizens. 
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Our philosophy is rooted in providing an environment that encourages curiosity, fosters critical thinking, and ignites a lifelong passion for learning. We believe in empowering our students to explore their potential, to challenge conventions, and to dare to dream big. At SARC, we are not just preparing students for exams; we are preparing them for life.
                        </p>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
