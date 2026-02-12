'use client';
import { Check } from 'lucide-react';
import PageHeader from '@/app/components/page-header';

const futureGoals = [
    "Upgrade all labs with state-of-the-art equipment.",
    "Forge international partnerships for student exchange programs.",
    "Launch a comprehensive scholarship program for underprivileged students.",
    "Integrate AI and Machine Learning into the core curriculum.",
    "Establish a dedicated research and innovation hub on campus.",
    "Expand our sports infrastructure to include a swimming pool and indoor stadium."
]

const missionItems = [
    { text: "Providing quality education that fosters critical thinking, innovation, and lifelong learning.", color: "border-sky-500" },
    { text: "Encouraging student-centered learning with a focus on practical knowledge and research-based education.", color: "border-emerald-500" },
    { text: "Promoting ethical leadership and social responsibility through value-based education.", color: "border-rose-500" },
    { text: "Creating a nurturing and inclusive environment where students can explore their full potential.", color: "border-amber-500" },
];

export default function VisionView() {
    return (
        <div>
            <PageHeader title="Vision, Mission & Values" subtitle="The principles that guide us" />
            
            <div className="py-20">
                <section 
                    className="container mx-auto px-4"
                >
                    <div className="bg-card/50 backdrop-blur-sm shadow-lg rounded-2xl p-12 text-center relative overflow-hidden">
                        <h2 className="text-3xl font-bold text-foreground mb-4 relative">Our Vision</h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed relative">
                            To become a leading institution in Nepal that sets benchmarks in academic excellence, research, and technological innovation. We aim to develop globally competent students equipped with 21st-century skills and to bridge the gap between academia and industry.
                        </p>
                    </div>
                </section>

                <section 
                    className="container mx-auto px-4 mt-24"
                >
                    <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Mission</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                       {missionItems.map((item, index) => (
                           <div 
                            key={index} 
                            className={`bg-card/50 backdrop-blur-sm shadow rounded-lg p-6 flex items-start gap-4 border-l-4 ${item.color} relative overflow-hidden`}>
                               <Check className="w-6 h-6 text-primary shrink-0 mt-1" />
                               <p className="text-foreground text-lg">{item.text}</p>
                           </div>
                       ))}
                    </div>
                </section>

                <section 
                    className="container mx-auto px-4 mt-24"
                >
                    <h2 className="text-3xl font-bold text-foreground text-center mb-12">Future Goals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {futureGoals.map((goal, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-3 bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border relative overflow-hidden">
                                <Check className="w-5 h-5 text-primary shrink-0" />
                                <p className="text-foreground">{goal}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
