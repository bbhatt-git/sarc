'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal } from 'lucide-react';
import { BorderBeam } from '@/app/components/BorderBeam';

const achievements = [
    { title: 'District Topper in +2 Science', year: 2023, icon: Trophy, description: 'Our student, Anish Shrestha, secured the top position in the district in the NEB +2 Science examinations.' },
    { title: 'National Robotics Competition Winner', year: 2023, icon: Award, description: 'The SARC robotics club, "Innovate Nepal", won first place in the National Robotics Competition for their innovative drone project.' },
    { title: 'Best Debating Team in Valley', year: 2022, icon: Star, description: 'Our debate team was crowned the best in the Kathmandu Valley after a series of intense inter-college competitions.' },
    { title: 'Social Service Excellence Award', year: 2022, icon: Medal, description: 'Recognized for our extensive community service and outreach programs, including health camps and literacy drives.' },
    { title: 'Top Law Entrance Exam Results', year: 2021, icon: Trophy, description: 'A record number of our law students secured top ranks in the university entrance examinations for LLB programs.' },
    { title: 'Regional Sports Championship', year: 2020, icon: Star, description: 'Our basketball team emerged as champions in the regional inter-college sports meet.' },
];

export default function AchievementsView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our Achievements" subtitle="A Legacy of Excellence" />
            <div className="container mx-auto px-4 mt-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="testimonial-card flex items-start gap-6 h-full"
                        >
                            <BorderBeam />
                            <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                                <item.icon className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-emerald-600">{item.year}</p>
                                <h3 className="text-lg font-bold text-foreground mt-1">{item.title}</h3>
                                <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
