import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal, Rocket } from "lucide-react";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';
import { stats } from "@/lib/data";

export default function AboutPage() {
    const headerImage = placeholderImages.placeholderImages.find(img => img.id === 'page-header-about');
    const principalImage = placeholderImages.placeholderImages.find(img => img.id === 'principal');
    const missionVisionImage = placeholderImages.placeholderImages.find(img => img.id === 'mission-vision');

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="About SARC"
                subtitle="Fostering a legacy of community, character, and lifelong learning."
                backgroundImage={headerImage?.imageUrl}
            />

            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Our History & Purpose</h2>
                            <p className="text-muted-foreground text-lg">
                                The Student-Alumni Relations Cell (SARC) at Padma Kanya Multiple Campus is a student-led initiative established to bridge the gap between current students and the vast network of successful alumni. Founded in 2015, our primary goal has been to create a symbiotic relationship where alumni can give back to their alma mater through mentorship and support, and students can gain invaluable insights and opportunities to kickstart their careers.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                We believe that learning extends beyond the classroom. By organizing workshops, networking events, and community outreach programs, we aim to provide a holistic development experience for every student.
                            </p>
                        </div>
                        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl animated-float">
                            {missionVisionImage && (
                                <Image 
                                    src={missionVisionImage.imageUrl}
                                    alt={missionVisionImage.description}
                                    data-ai-hint={missionVisionImage.imageHint}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-20 lg:py-28 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-headline">Our Mission</h3>
                                    <p className="text-muted-foreground mt-2 text-lg">To empower students by connecting them with alumni, providing resources for skill development, and fostering a culture of lifelong learning and community engagement.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-6">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <Goal className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-headline">Our Vision</h3>
                                    <p className="text-muted-foreground mt-2 text-lg">To build a vibrant and supportive ecosystem where every student and alumnus is an active partner in the growth and success of the SARC community.</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-center">
                             {stats.map((stat) => (
                                <div key={stat.label} className="glass-card p-8 rounded-lg hover:-translate-y-2">
                                    <p className="text-4xl font-bold text-primary font-headline">{stat.number}</p>
                                    <p className="text-muted-foreground mt-2 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             <section className="py-20 lg:py-24">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                     <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8 font-headline">Message from the Principal</h2>
                     {principalImage && (
                         <Image
                            src={principalImage.imageUrl}
                            alt="Principal Dr. Evelyn Reed"
                            width={120}
                            height={120}
                            className="rounded-full mx-auto mb-6 ring-4 ring-primary/20"
                        />
                     )}
                    <p className="text-xl text-muted-foreground italic max-w-3xl mx-auto">
                        "SARC represents the very best of our campus spirit—initiative, community, and a commitment to mutual growth. I am incredibly proud of our students who run this organization and our alumni who so generously give their time and expertise. This is where leaders are made."
                    </p>
                    <p className="font-semibold mt-6 text-lg">Dr. Evelyn Reed</p>
                    <p className="text-sm text-muted-foreground">Principal</p>
                </div>
            </section>
        </div>
    )
}
