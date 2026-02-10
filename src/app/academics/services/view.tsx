'use client';
import PageHeader from '@/app/components/page-header';
import { motion } from 'framer-motion';
import { Library, Bus, Utensils, HeartHandshake, Computer, Microscope } from 'lucide-react';

const facilities = [
    { title: 'Resourceful Library', icon: Library, description: 'Access a vast collection of books, journals, and digital resources to support your academic journey.' },
    { title: 'Transportation', icon: Bus, description: 'Safe and reliable bus services covering various routes across Kathmandu valley for your convenience.' },
    { title: 'Hygienic Cafeteria', icon: Utensils, description: 'Enjoy healthy and delicious meals in our clean and welcoming cafeteria.' },
    { title: 'Counseling & Support', icon: HeartHandshake, description: 'Confidential counseling and career guidance to support your personal and academic growth.' },
    { title: 'Modern Labs', icon: Microscope, description: 'Fully equipped science and computer labs for practical, hands-on learning experiences.' },
    { title: 'E-Learning Platform', icon: Computer, description: 'Access course materials, assignments, and lectures anytime through our online portal.' },
];

export default function FacilitiesView() {
    return (
        <div>
            <PageHeader title="Our Facilities" subtitle="World-Class Infrastructure & Support" imageUrl="/images/hero/0.jpg" />
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={facility.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="testimonial-card p-8 flex items-start gap-6 h-full"
                        >
                            <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                                <facility.icon className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">{facility.title}</h3>
                                <p className="text-muted-foreground text-lg">{facility.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
