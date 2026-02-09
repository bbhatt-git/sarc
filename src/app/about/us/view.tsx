'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Timeline } from '@/app/components/timeline';
import PageHeader from '@/app/components/page-header';

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
    
    const timelineData = milestones.map(item => ({
        title: item.year.toString(),
        content: (
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg rounded-xl p-6 relative overflow-hidden">
                <h3 className="text-xl font-bold text-foreground">{item.event}</h3>
            </div>
        )
    }));

    return (
        <div>
            <PageHeader title="About Us" subtitle="Our Story, Vision, and Commitment" imageUrl="/images/hero/4.jpg" />
            
            <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 py-20"
            >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-foreground">Nurturing Future Leaders</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Established in 2017, SARC has been a beacon of holistic education. We are dedicated to nurturing not just academic brilliance, but also the character, values, and skills that shape future leaders and responsible global citizens. Our philosophy is rooted in providing an environment that encourages curiosity, critical thinking, and a lifelong passion for learning.
                        </p>
                    </div>
                    <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src="/images/hero/0.jpg"
                            alt="SARC Campus"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.section>

            <motion.section 
                {...fadeIn}
                className="container mx-auto px-4"
            >
                <div className="bg-card/50 backdrop-blur-sm border p-12 text-center relative overflow-hidden rounded-2xl">
                    <h2 className="text-3xl font-bold text-foreground mb-4 relative">Our Vision</h2>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed relative">
                        To be a premier educational institution recognized for its excellence in developing future-ready leaders, innovators, and compassionate global citizens who contribute positively to society.
                    </p>
                </div>
            </motion.section>

            <motion.section 
                 {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Mission</h2>
                <div className="grid md:grid-cols-2 gap-8">
                   {missionItems.map((item, index) => (
                       <motion.div 
                        key={index} 
                        {...fadeIn}
                        transition={{...fadeIn.transition, delay: index * 0.1}}
                        className={`bg-card/50 backdrop-blur-sm flex items-start gap-4 p-6 border-l-4 ${item.color}`}>
                           <Check className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                           <p className="text-foreground text-lg">{item.text}</p>
                       </motion.div>
                   ))}
                </div>
            </motion.section>

            <motion.section
                className="container mx-auto px-4 mt-12"
            >
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our History: Journey & Achievements</h2>
                <Timeline data={timelineData} />
            </motion.section>

            <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Unique Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {WHY_US_ITEMS.map((item, index) => (
                         <div key={item.title} className="bg-card/50 backdrop-blur-sm border p-8 text-center transition-transform hover:-translate-y-2 h-full rounded-2xl">
                            <div className="inline-block bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

             <motion.section 
                 {...fadeIn}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">Future Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {futureGoals.map((goal, index) => (
                        <motion.div 
                            key={index} 
                            {...fadeIn}
                            transition={{...fadeIn.transition, delay: index * 0.1}}
                            className="bg-card/50 backdrop-blur-sm border flex items-center gap-3 p-4 rounded-2xl">
                            <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p className="text-foreground">{goal}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

             <motion.section 
                {...fadeIn}
                className="container mx-auto px-4 mt-24 pb-12"
            >
                 <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Programs</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                    {['School (ECD-10)', 'Bridge Course', '+2 Science', '+2 Management', '+2 Law', 'CTEVT Programs'].map(program => (
                        <div key={program} className="bg-card/50 backdrop-blur-sm border p-4 rounded-2xl">
                            <p className="text-foreground font-semibold">{program}</p>
                        </div>
                    ))}
                 </div>
            </motion.section>
        </div>
    )
}
