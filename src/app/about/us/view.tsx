'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import Image from 'next/image';
import { Check } from 'lucide-react';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';

const missionItems = [
    { text: "Providing quality education that fosters critical thinking, innovation, and lifelong learning.", color: "border-sky-500" },
    { text: "Encouraging student-centered learning with a focus on practical knowledge and research-based education.", color: "border-emerald-500" },
    { text: "Promoting ethical leadership and social responsibility through value-based education.", color: "border-rose-500" },
    { text: "Creating a nurturing and inclusive environment where students can explore their full potential.", color: "border-amber-500" },
];

export default function AboutView() {
    return (
        <div>
            <PageHeader title="About Us" subtitle="Our Story, Vision, and Commitment" imageUrl="/images/hero/4.jpg" />
            
            <section 
                className="container mx-auto px-4 py-20"
            >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <SectionTitle title="Nurturing Future Leaders Since 2017" subtitle="WELCOME TO SARC" align="left" />
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            SARC Education Foundation, located in Bhimdatta, Kanchanpur, is a leading educational institution dedicated to providing high-quality education with a focus on academic excellence, innovation, and holistic student development.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                             We are committed to shaping future leaders, thinkers, and innovators by fostering a culture of critical thinking, creativity, and ethical values. With a team of experienced faculty, state-of-the-art infrastructure, and a student-centric approach, SARC provides an ideal environment for academic and personal growth.
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
            </section>

            <section 
                className="container mx-auto px-4"
            >
                <div className="bg-card/50 backdrop-blur-sm border p-12 text-center relative overflow-hidden rounded-2xl">
                    <h2 className="text-3xl font-bold text-foreground mb-4 relative">Our Vision</h2>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed relative">
                        To be a leading institution in Nepal that sets benchmarks in academic excellence, research, and technological innovation. We aim to develop globally competent students and bridge the gap between academia and industry.
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
                        className={`bg-card/50 backdrop-blur-sm flex items-start gap-4 p-6 border-l-4 ${item.color}`}>
                           <Check className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                           <p className="text-foreground text-lg">{item.text}</p>
                       </div>
                   ))}
                </div>
            </section>

            <section 
                className="container mx-auto px-4 py-24"
            >
                <SectionTitle title="Why Choose SARC?" subtitle="Our Unique Features" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
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
            </section>
        </div>
    )
}
