'use client';
import { STAFF_MEMBERS } from '@/lib/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionTitle from '@/app/components/section-title';

export default function FacultiesView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Faculties" subtitle="Expert Educators, Passionate Mentors" />
            <div className="container mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {STAFF_MEMBERS.map((staff, index) => (
                        <motion.div 
                            key={staff.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-card/50 backdrop-blur-sm border rounded-2xl shadow-lg overflow-hidden p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                        >
                            <div className="relative w-32 h-32 mx-auto">
                                <Image
                                    src={staff.image}
                                    alt={`Portrait of ${staff.name}`}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mt-4">{staff.name}</h3>
                            <p className="text-emerald-600 font-medium">{staff.role}</p>
                            <p className="text-xs text-muted-foreground mt-1">{staff.credentials}</p>
                            <p className="text-sm text-muted-foreground mt-4 italic">"{staff.philosophy}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
