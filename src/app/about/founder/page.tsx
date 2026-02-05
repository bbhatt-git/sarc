'use client';
import SectionTitle from '@/app/components/section-title';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FounderPage() {
    return (
        <div className="pt-32 pb-20">
            <SectionTitle title="Our Founder" subtitle="The Visionary Behind SARC" />
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">A Message from the Founder</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Content about the founder will go here. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-3xl overflow-hidden">
                        <Image src="https://picsum.photos/seed/401/800/600" alt="SARC Founder" fill className="object-cover" />
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
