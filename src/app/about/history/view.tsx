'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { Timeline } from '@/app/components/timeline';

const milestones = [
    { year: 2017, event: "SARC Education Foundation was established with a vision for modern education." },
    { year: 2018, event: "First batch of +2 students graduated with excellent, district-topping results." },
    { year: 2019, event: "Introduced Management and Law streams for +2, expanding academic offerings." },
    { year: 2020, event: "Launched CTEVT programs to offer practical, vocational training for students." },
    { year: 2022, event: "Recognized as one of the top emerging colleges in the region for academic excellence." },
    { year: 2024, event: "Expanded campus with new state-of-the-art science and computer labs." }
];

export default function HistoryView() {
    const timelineData = milestones.map(item => ({
        title: item.year.toString(),
        content: (
            <div className="bg-card border shadow-sm rounded-lg p-6 relative overflow-hidden">
                <h3 className="text-xl font-semibold text-foreground mt-1">{item.event}</h3>
            </div>
        )
    }));

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Our History" subtitle="Journey & Achievements" />
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4"
            >
                <Timeline data={timelineData} />
            </motion.section>
        </div>
    );
}
