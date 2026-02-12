'use client';
import PageHeader from '@/app/components/page-header';
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
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                <h3 className="text-xl font-bold text-foreground">{item.event}</h3>
            </div>
        )
    }));

    return (
        <div>
            <PageHeader 
                title="Our History" 
                subtitle="Journey & Achievements" 
            />
            <section
                className="container mx-auto px-4 py-20"
            >
                <Timeline data={timelineData} />
            </section>
        </div>
    );
}
