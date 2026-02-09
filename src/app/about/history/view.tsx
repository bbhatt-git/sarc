'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const milestones = [
    { year: 2017, event: "SARC Education Foundation was established with a vision for modern education." },
    { year: 2018, event: "First batch of +2 students graduated with excellent, district-topping results." },
    { year: 2019, event: "Introduced Management and Law streams for +2, expanding academic offerings." },
    { year: 2020, event: "Launched CTEVT programs to offer practical, vocational training for students." },
    { year: 2022, event: "Recognized as one of the top emerging colleges in the region for academic excellence." },
    { year: 2024, event: "Expanded campus with new state-of-the-art science and computer labs." }
];

export default function HistoryView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our History" subtitle="Journey & Achievements" />
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-8 relative pl-8 border-l-2 border-slate-200">
                        {milestones.map((item, index) => (
                            <motion.div 
                                key={item.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -left-12 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 ring-4 ring-white">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-6 ml-4 relative overflow-hidden">
                                    <p className="text-lg font-bold text-emerald-600">{item.year}</p>
                                    <h3 className="text-xl font-semibold text-foreground mt-1">{item.event}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
