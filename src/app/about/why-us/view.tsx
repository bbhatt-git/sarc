'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import SectionTitle from '@/app/components/section-title';
import { BorderBeam } from '@/app/components/BorderBeam';

export default function WhyUsView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Why Choose SARC?" subtitle="Our Commitment to Your Success" />

            <div className="container mx-auto px-4 mt-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {WHY_US_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="testimonial-card p-8 flex items-start gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                        >
                            <BorderBeam />
                            <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                                <item.icon className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-lg">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
