'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/app/components/section-title';

export default function AboutUsPage() {
    return (
        <div className="pt-32 pb-20">
            <SectionTitle title="About SARC" subtitle="A Legacy of Excellence Since 2017" />
            
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Nurturing Future Leaders</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-3xl overflow-hidden">
                        <Image src="/images/hero/2.jpg" alt="SARC Campus" fill className="object-cover" />
                    </div>
                </div>
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-white text-center mb-12">Our Unique Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {WHY_US_ITEMS.map((item, index) => (
                         <div key={item.title} className="glass-container p-8 text-center transition-transform hover:-translate-y-2">
                            <div className="inline-block bg-slate-800 p-4 rounded-full border border-slate-700 mb-4">
                                <item.icon className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

             <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="container mx-auto px-4 mt-24"
            >
                 <h2 className="text-3xl font-bold text-white text-center mb-12">Our Programs</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                    {['School (ECD-10)', 'Bridge Course', '+2 Science', '+2 Management', '+2 Law', 'CTEVT Programs'].map(program => (
                        <div key={program} className="glass-container p-4">
                            <p className="text-white font-semibold">{program}</p>
                        </div>
                    ))}
                 </div>
            </motion.section>
        </div>
    )
}
