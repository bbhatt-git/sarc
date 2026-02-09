'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, Landmark, Briefcase, GraduationCap, Home } from 'lucide-react';
import { BorderBeam } from '@/app/components/BorderBeam';

const programs = [
    { name: '+2 Science', icon: FlaskConical, description: 'A rigorous program focusing on scientific principles and research, preparing students for careers in medicine, engineering, and technology.' },
    { name: '+2 Management', icon: Briefcase, description: 'Develop business acumen and leadership skills with our comprehensive management curriculum, covering finance, marketing, and economics.' },
    { name: '+2 Law', icon: Landmark, description: 'Explore the foundations of legal systems and justice. This stream prepares students for a career in law and public policy.' },
    { name: 'CTEVT Programs', icon: GraduationCap, description: 'Gain practical, job-oriented skills through our vocational programs, designed to meet industry demands.' },
    { name: 'Bridge Course', icon: BookOpen, description: 'Prepare for your +2 journey with our intensive bridge course, designed to strengthen your academic foundation.' },
    { name: 'School (ECD-10)', icon: Home, description: 'A nurturing environment for young learners, focusing on holistic development from early childhood to grade 10.' },
];

export default function ProgramsView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Academic Programs" subtitle="Pathways to Your Future" />
            <div className="container mx-auto px-4 mt-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="testimonial-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full"
                        >
                            <BorderBeam />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-emerald-100 p-3 rounded-full">
                                    <program.icon className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{program.name}</h3>
                            </div>
                            <p className="text-slate-600">{program.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
