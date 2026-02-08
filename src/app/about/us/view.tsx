'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/app/components/section-title';
import { Check } from 'lucide-react';
import TiltedCard from '@/app/components/tilted-card';

const milestones = [
    { year: 2017, event: "SARC Education Foundation was established with a vision for modern education." },
    { year: 2018, event: "First batch of +2 students graduated with excellent, district-topping results." },
    { year: 2019, event: "Introduced Management and Law streams for +2, expanding academic offerings." },
    { year: 2020, event: "Launched CTEVT programs to offer practical, vocational training for students." },
    { year: 2022, event: "Recognized as one of the top emerging colleges in the region for academic excellence." },
    { year: 2024, event: "Expanded campus with new state-of-the-art science and computer labs." }
];

const futureGoals = [
    "Upgrade all labs with state-of-the-art equipment.",
    "Forge international partnerships for student exchange programs.",
    "Launch a comprehensive scholarship program for underprivileged students.",
    "Integrate AI and Machine Learning into the core curriculum.",
    "Establish a dedicated research and innovation hub on campus.",
    "Expand our sports infrastructure to include a swimming pool and indoor stadium."
];

const missionItems = [
    { text: "To provide a challenging and supportive learning environment.", color: "border-sky-500" },
    { text: "To foster creativity, critical thinking, and problem-solving skills.", color: "border-emerald-500" },
    { text: "To instill a sense of social responsibility and ethical values.", color: "border-rose-500" },
    { text: "To prepare students for success in a rapidly changing global landscape.", color: "border-amber-500" },
];


export default function AboutView() {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: 'easeOut' },
        viewport: { once: true, amount: 0.2 }
    };

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="About Us" subtitle="Our Story, Vision, and Commitment" />
            
            <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 mt-16"
            >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">Nurturing Future Leaders</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
                        </p>
                    </div>
                    <div className="h-96">
                        <TiltedCard
                            imageSrc="https://picsum.photos/seed/about1/800/600"
                            altText="SARC Campus"
                            containerHeight="100%"
                            containerWidth="100%"
                            imageHeight="100%"
                            imageWidth="100%"
                            scaleOnHover={1.05}
                            rotateAmplitude={8}
                            showTooltip={false}
                        />
                    </div>
                </div>
            </motion.section>

            <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <div className="testimonial-card p-12 text-center relative overflow-hidden">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4 relative">Our Vision</h2>
                    <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed relative">
                        To be a premier educational institution recognized for its excellence in developing future-ready leaders, innovators, and compassionate global citizens who contribute positively to society.
                    </p>
                </div>
            </motion.section>

            <motion.section 
                 {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Mission</h2>
                <div className="grid md:grid-cols-2 gap-8">
                   {missionItems.map((item, index) => (
                       <motion.div 
                        key={index} 
                        {...fadeIn}
                        transition={{...fadeIn.transition, delay: index * 0.1}}
                        className={`testimonial-card flex items-start gap-4 border-l-4 ${item.color}`}>
                           <Check className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                           <p className="text-slate-700 text-lg">{item.text}</p>
                       </motion.div>
                   ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our History: Journey & Achievements</h2>
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
                                <div className="testimonial-card p-6 ml-4">
                                    <p className="text-lg font-bold text-emerald-600">{item.year}</p>
                                    <h3 className="text-xl font-semibold text-slate-800 mt-1">{item.event}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Unique Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {WHY_US_ITEMS.map((item, index) => (
                         <div key={item.title} className="testimonial-card p-8 text-center transition-transform hover:-translate-y-2 h-full">
                            <div className="inline-block bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-slate-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

             <motion.section 
                 {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Future Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {futureGoals.map((goal, index) => (
                        <motion.div 
                            key={index} 
                            {...fadeIn}
                            transition={{...fadeIn.transition, delay: index * 0.1}}
                            className="testimonial-card flex items-center gap-3 p-4">
                            <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p className="text-slate-700">{goal}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

             <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                 <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Programs</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                    {['School (ECD-10)', 'Bridge Course', '+2 Science', '+2 Management', '+2 Law', 'CTEVT Programs'].map(program => (
                        <div key={program} className="testimonial-card p-4">
                            <p className="text-slate-700 font-semibold">{program}</p>
                        </div>
                    ))}
                 </div>
            </motion.section>
        </div>
    )
}
