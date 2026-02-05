'use client';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '@/app/components/section-title';

const futureGoals = [
    "Upgrade all labs with state-of-the-art equipment.",
    "Forge international partnerships for student exchange programs.",
    "Launch a comprehensive scholarship program for underprivileged students.",
    "Integrate AI and Machine Learning into the core curriculum.",
    "Establish a dedicated research and innovation hub on campus.",
    "Expand our sports infrastructure to include a swimming pool and indoor stadium."
]

const missionItems = [
    { text: "To provide a challenging and supportive learning environment.", color: "border-sky-500" },
    { text: "To foster creativity, critical thinking, and problem-solving skills.", color: "border-emerald-500" },
    { text: "To instill a sense of social responsibility and ethical values.", color: "border-rose-500" },
    { text: "To prepare students for success in a rapidly changing global landscape.", color: "border-amber-500" },
];

export default function VisionPage() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Vision, Mission & Values" subtitle="The principles that guide us" />
            
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-12 text-center relative overflow-hidden">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4 relative">Our Vision</h2>
                    <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed relative">
                        To be a premier educational institution recognized for its excellence in developing future-ready leaders, innovators, and compassionate global citizens who contribute positively to society.
                    </p>
                </div>
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Mission</h2>
                <div className="grid md:grid-cols-2 gap-8">
                   {missionItems.map((item, index) => (
                       <div key={index} className={`bg-white border border-slate-200 shadow-md rounded-lg p-6 flex items-start gap-4 ${item.color}`}>
                           <Check className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                           <p className="text-slate-700 text-lg">{item.text}</p>
                       </div>
                   ))}
                </div>
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto px-4 mt-24"
            >
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Future Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {futureGoals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p className="text-slate-700">{goal}</p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    )
}
