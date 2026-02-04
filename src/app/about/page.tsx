import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';

const coreValues = [
    "Integrity and Ethical Conduct",
    "Excellence in All Endeavors",
    "Lifelong Learning and Curiosity",
    "Compassion and Global Citizenship",
    "Resilience and Courage",
    "Community and Collaboration",
];

export default function AboutPage() {
    return (
        <div className="animated-fade-in">
            <PageHeader
                title="About SARC"
                subtitle="Shaping the future through a legacy of excellence and a vision for a better world."
                backgroundImage={placeholderImages.placeholderImages[20].imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Our History</h2>
                            <p className="text-muted-foreground text-lg">
                                Founded in 1985 by a group of visionary educators and philanthropists, the SARC Education Foundation was established with a simple yet profound mission: to create an institution that would set a new standard for academic excellence and character development. From our humble beginnings with a single building and 50 students, we have grown into a world-renowned institution that nurtures the minds of thousands.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Throughout our history, we have remained steadfast in our commitment to fostering an environment of intellectual curiosity, ethical leadership, and a deep-seated sense of community. Our journey is one of continuous evolution, driven by a passion for education and a belief in the limitless potential of every child.
                            </p>
                        </div>
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <Image 
                                src={placeholderImages.placeholderImages[21].imageUrl}
                                alt={placeholderImages.placeholderImages[21].description}
                                data-ai-hint={placeholderImages.placeholderImages[21].imageHint}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                             <Image 
                                src={placeholderImages.placeholderImages[20].imageUrl}
                                alt={placeholderImages.placeholderImages[20].description}
                                data-ai-hint={placeholderImages.placeholderImages[20].imageHint}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4 order-1 md:order-2">
                             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Vision &amp; Mission</h2>
                            <p className="text-muted-foreground text-lg">
                                <strong>Our Vision:</strong> To be a global leader in education, recognized for empowering students to lead lives of purpose and impact.
                            </p>
                             <p className="text-muted-foreground text-lg">
                                <strong>Our Mission:</strong> To provide a transformative education that develops knowledgeable, compassionate, and ethical citizens of the world. We achieve this through a rigorous curriculum, a commitment to character building, and a vibrant community that inspires lifelong learning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {coreValues.map((value) => (
                            <div key={value} className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-primary" />
                                <span className="font-medium text-left">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Card className="glass-card">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Governance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center text-muted-foreground text-lg">
                            <p>
                                The SARC Education Foundation is governed by a dedicated Board of Trustees composed of leaders in education, business, and the arts. The Board is responsible for the long-term strategic direction and financial health of the foundation, ensuring we remain true to our mission.
                            </p>
                            <p>
                                Day-to-day leadership is provided by our Principal and senior administrative team, who work in close collaboration with our faculty to deliver an exceptional educational experience. We are committed to transparency, accountability, and ethical governance in all our operations.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
