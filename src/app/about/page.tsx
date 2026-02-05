import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Goal, Rocket } from "lucide-react";
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
                subtitle="Fostering community, skills, and opportunities."
                backgroundImage={headerImage?.imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our History & Purpose</h2>
                            <p className="text-muted-foreground text-lg">
                                The Student-Alumni Relations Cell (SARC) at Padma Kanya Multiple Campus is a student-led initiative established to bridge the gap between current students and the vast network of successful alumni. Founded in 2015, our primary goal has been to create a symbiotic relationship where alumni can give back to their alma mater through mentorship and support, and students can gain invaluable insights and opportunities to kickstart their careers.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                We believe that learning extends beyond the classroom. By organizing workshops, networking events, and community outreach programs, we aim to provide a holistic development experience for every student.
                            </p>
                        </div>
                        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
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
            
            <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Our Mission</h3>
                                    <p className="text-muted-foreground mt-1 text-lg">To empower students by connecting them with alumni, providing resources for skill development, and fostering a culture of lifelong learning and community engagement.</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Goal className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Our Vision</h3>
                                    <p className="text-muted-foreground mt-1 text-lg">To build a vibrant and supportive ecosystem where every student and alumnus is an active partner in the growth and success of the SARC community.</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-center">
                             {stats.map((stat) => (
                                <div key={stat.label} className="bg-background p-6 rounded-lg shadow-sm">
                                    <p className="text-3xl font-bold text-primary">{stat.number}</p>
                                    <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                     <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Message from the Principal</h2>
                     {principalImage && (
                         <Image
                            src={principalImage.imageUrl}
                            alt="Principal Dr. Evelyn Reed"
                            width={100}
                            height={100}
                            className="rounded-full mx-auto mb-4"
                        />
                     )}
                    <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                        "SARC represents the very best of our campus spirit—initiative, community, and a commitment to mutual growth. I am incredibly proud of our students who run this organization and our alumni who so generously give their time and expertise. This is where leaders are made."
                    </p>
                    <p className="font-semibold mt-4">Dr. Evelyn Reed</p>
                    <p className="text-sm text-muted-foreground">Principal</p>
                </div>
            </section>
        </div>
    )
}
