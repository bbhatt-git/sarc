'use client';
import PageHeader from '@/app/components/page-header';
import { motion } from 'framer-motion';
import { Library, Bus, Utensils, HeartHandshake, Computer, Microscope, Wifi, ShieldCheck, Gamepad2, Presentation } from 'lucide-react';

const facilities = [
    { title: 'Modern Science & Computer Labs', icon: Microscope, description: 'Fully equipped physics, chemistry, biology, and computer labs for practical, hands-on learning.' },
    { title: 'Resourceful Library', icon: Library, description: 'Access a vast collection of books, journals, and digital resources to support your academic journey.' },
    { title: 'Smart Classrooms', icon: Presentation, description: 'Interactive and tech-based learning with modern audio-visual aids to enhance engagement.' },
    { title: 'Wi-Fi Campus', icon: Wifi, description: 'High-speed internet access available across the entire campus for students and faculty.' },
    { title: 'Transportation', icon: Bus, description: 'Safe and reliable bus services covering various routes for your convenience.' },
    { title: 'Hygienic Cafeteria', icon: Utensils, description: 'Enjoy healthy, delicious, and affordable meals in our clean and welcoming cafeteria.' },
    { title: 'Sports Facilities', icon: Gamepad2, description: 'Encouraging physical fitness with facilities for various indoor and outdoor sports.' },
    { title: 'Counseling & Support', icon: HeartHandshake, description: 'Confidential counseling and career guidance to support your personal and academic growth.' },
    { title: 'Health Care', icon: ShieldCheck, description: 'Basic first-aid and health care services available on campus for student well-being.' },
];

export default function FacilitiesView() {
    return (
        <div>
            <PageHeader title="Our Facilities" subtitle="World-Class Infrastructure & Support" imageUrl="/images/hero/0.jpg" />
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={facility.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="testimonial-card p-8 flex flex-col items-center text-center gap-4 h-full"
                        >
                            <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                                <facility.icon className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{facility.title}</h3>
                                <p className="text-muted-foreground">{facility.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
