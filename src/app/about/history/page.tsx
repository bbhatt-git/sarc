'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const milestones = [
    { year: 2017, event: "SARC Education Foundation was established." },
    { year: 2018, event: "First batch of +2 students graduated with excellent results." },
    { year: 2019, event: "Introduced Management and Law streams for +2." },
    { year: 2020, event: "Launched CTEVT programs to offer vocational training." },
    { year: 2022, event: "Recognized as one of the top colleges in the region." },
    { year: 2024, event: "Expanded campus with new state-of-the-art science labs." }
];

export default function HistoryPage() {
    return (
        <div className="pt-32 pb-20">
            <SectionTitle title="Our History" subtitle="Journey & Achievements" />
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-8 relative pl-8 border-l-2 border-slate-700">
                        {milestones.map((item, index) => (
                            <motion.div 
                                key={item.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -left-11 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 ring-4 ring-slate-900">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div className="glass-container p-6">
                                    <p className="text-lg font-bold text-emerald-400">{item.year}</p>
                                    <h3 className="text-xl font-semibold text-white mt-1">{item.event}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
