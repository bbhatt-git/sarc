'use client';
import PageHeader from '@/app/components/page-header';
import { FlaskConical, Briefcase, Leaf, Computer, BarChart, ShoppingCart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { imageData } from '@/lib/image-data';

const faculties = [
    {
        name: 'Science Faculty',
        icon: FlaskConical,
        description: "Our Science Faculty is dedicated to fostering innovation and critical thinking, preparing students for careers in technology, research, and healthcare.",
        streams: [
            {
                name: 'Bio Science',
                description: 'For students aspiring to careers in medicine, dentistry, pharmacy, and other health sciences, with a focus on biology, zoology, and botany.',
                icon: Leaf,
            },
            {
                name: 'Computer Science & Engineering',
                description: 'For students aiming for careers in engineering, IT, and software development, with in-depth knowledge of software development, programming, hardware, and algorithms.',
                icon: Computer,
            },
        ],
    },
    {
        name: 'Management Faculty',
        icon: Briefcase,
        description: "The Management Faculty equips students with the entrepreneurial and managerial skills needed to excel in the global business environment.",
        streams: [
            {
                name: 'Business',
                description: 'Focuses on core business principles including marketing, finance, and economics. Ideal for future entrepreneurs and corporate leaders.',
                icon: BarChart,
            },
            {
                name: 'Computer Commerce',
                description: 'A modern blend of commerce and information technology, preparing students for tech-driven business roles and e-commerce.',
                icon: ShoppingCart,
            },
        ],
    },
];

export default function FacultiesView() {
    return (
        <div>
            <PageHeader title="Our Faculties" subtitle="Expertise in Science & Management" imageUrl={imageData.hero[3].src} />
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {faculties.map((faculty, index) => (
                        <div
                            key={faculty.name}
                            className="h-full"
                        >
                            <Card className="testimonial-card h-full flex flex-col">
                                <CardHeader className="text-center items-center p-8">
                                    <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                                        <faculty.icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <CardTitle className="text-3xl">{faculty.name}</CardTitle>
                                    <CardDescription className="pt-2 max-w-md mx-auto">{faculty.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8 flex-grow">
                                    {faculty.streams.map((stream) => (
                                        <div key={stream.name} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/70 hover:border-primary/50 transition-colors duration-300">
                                             <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full mt-1">
                                                <stream.icon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-foreground">{stream.name}</h4>
                                                <p className="text-muted-foreground text-sm">{stream.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
