'use client';
import PageHeader from '@/app/components/page-header';
import {
    FlaskConical, Briefcase, Check, Package, Bus, Cpu, Users, Presentation, Network, School, Book, BookCopy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTitle from '@/app/components/section-title';

// Data for the page sections
const schoolProgramFeatures = [
    "Comprehensive curriculum aligned with national standards",
    "Hands-on science and math labs",
    "Cultural and artistic development programs",
    "Sports and physical education",
    "Early exposure to coding and robotics",
    "Character building and leadership skills",
];

const specializations = {
    science: {
        title: "Science Stream",
        icon: FlaskConical,
        coreSubjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Nepali"],
        specialFeatures: [
            "Advanced laboratory facilities",
            "Research project opportunities",
            "Preparation for medical and engineering entrance exams",
            "Biotechnology workshops",
        ]
    },
    management: {
        title: "Management Stream",
        icon: Briefcase,
        coreSubjects: ["Business Studies", "Accountancy", "Economics", "Marketing", "English", "Nepali"],
        specialFeatures: [
            "Entrepreneurship workshops",
            "Business simulation projects",
            "Industry visits and internships",
            "Financial literacy programs",
        ]
    }
};

const teachingApproaches = [
    { icon: Package, title: "Project-Based Learning", description: "Students work on real-world problems and create tangible solutions." },
    { icon: Bus, title: "Experiential Tours", description: "Regular visits to research labs, industries, and science exhibitions." },
    { icon: Cpu, title: "Technology Integration", description: "AI, robotics, and digital tools embedded in daily learning." },
    { icon: Users, title: "Collaborative Environment", description: "Group projects, peer learning, and mentorship programs." },
    { icon: Presentation, title: "Assessment Beyond Exams", description: "Portfolio-based evaluation, presentations, and project demonstrations." },
    { icon: Network, title: "Industry Connect", description: "Guest lectures from innovators, entrepreneurs, and researchers." },
];

const subjectGroups = {
    science: {
        grade11: ["Com. English", "Com. Nepali", "Physics", "Chemistry", "Mathematics", "Biology/Computer Science"],
        grade12: ["Com. English", "Com. Nepali", "Physics", "Chemistry", "Biology/Mathematics", "Computer Science"]
    },
    management: {
        grade11: ["Com. English", "Com. Nepali", "Accountancy", "Economics", "Hotel Management / Business Studies / Mathematics", "Computer Science (Any 1)"],
        grade12: ["Com. English", "Business Mathematics/Marketing", "Accountancy", "Economics", "Hotel Management / Business Studies / Mathematics", "Computer Science (Any 1)"]
    }
};

export default function ProgramsView() {
    return (
        <div>
            <PageHeader title="Academic Programs" subtitle="Pathways to Your Future" imageUrl="/images/hero/4.jpg" />
            
            <div className="py-20 space-y-24">
                {/* School Program Section */}
                <section className="container mx-auto px-4 max-w-5xl">
                    <Card className="testimonial-card overflow-hidden">
                        <CardHeader className="bg-card/50 p-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-100 p-3 rounded-full">
                                    <School className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">School Program (ECD to Class 10)</CardTitle>
                                    <p className="text-muted-foreground mt-1">Foundation years focusing on holistic development and core academic excellence.</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 grid md:grid-cols-2 gap-x-8 gap-y-4">
                            {schoolProgramFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                    <p className="text-foreground">{feature}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                {/* 10+2 Specializations Section */}
                <section className="container mx-auto px-4 max-w-6xl">
                    <SectionTitle title="10+2 Specializations" subtitle="Choose Your Path" />
                    <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Choose your path and prepare for university and career success.</p>
                    <div className="grid md:grid-cols-2 gap-8 mt-12 items-stretch">
                        {Object.values(specializations).map((spec, index) => (
                            <Card key={index} className="testimonial-card flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-sky-100 p-4 rounded-full">
                                            <spec.icon className="w-8 h-8 text-sky-600" />
                                        </div>
                                        <CardTitle className="text-2xl">{spec.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3 text-foreground">Core Subjects</h4>
                                        <div className="space-y-2">
                                        {spec.coreSubjects.map(subject => (
                                            <div key={subject} className="flex items-center gap-3">
                                                <Book className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">{subject}</span>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3 text-foreground">Special Features</h4>
                                        <div className="space-y-2">
                                        {spec.specialFeatures.map(feature => (
                                            <div key={feature} className="flex items-center gap-3">
                                                <Check className="w-5 h-5 text-emerald-500" />
                                                <span className="text-foreground">{feature}</span>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Teaching Approach Section */}
                <section className="container mx-auto px-4 max-w-6xl">
                    <SectionTitle title="Our Teaching Approach" subtitle="Learning for the 21st Century" />
                     <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Learning methods designed for the 21st century and beyond.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {teachingApproaches.map((item, index) => (
                             <div key={item.title} className="testimonial-card text-center p-8 h-full">
                                <div className="inline-block bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Subject Groups Section */}
                <section className="container mx-auto px-4 max-w-5xl">
                    <SectionTitle title="+2 Subject Groups" subtitle="Official Combinations" />
                     <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Official combinations for Science and Management (Grade XI/XII).</p>
                    <Tabs defaultValue="science" className="w-full mt-12">
                        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                            <TabsTrigger value="science">Science</TabsTrigger>
                            <TabsTrigger value="management">Management</TabsTrigger>
                        </TabsList>
                        <TabsContent value="science">
                            <SubjectGroupTable group={subjectGroups.science} />
                        </TabsContent>
                        <TabsContent value="management">
                            <SubjectGroupTable group={subjectGroups.management} />
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </div>
    );
}

function SubjectGroupTable({ group }: { group: { grade11: string[], grade12: string[] } }) {
    return (
        <Card className="testimonial-card p-0 mt-6">
            <div className="grid md:grid-cols-2 gap-px bg-border/20 rounded-lg overflow-hidden">
                <div className="bg-card p-6">
                    <h3 className="font-bold text-xl mb-4 text-foreground">Grade XI</h3>
                    <ul className="space-y-3">
                        {group.grade11.map(subject => (
                            <li key={subject} className="flex items-center gap-3">
                                <BookCopy className="w-4 h-4 text-sky-500" />
                                <span className="text-muted-foreground">{subject}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-card p-6">
                    <h3 className="font-bold text-xl mb-4 text-foreground">Grade XII</h3>
                    <ul className="space-y-3">
                        {group.grade12.map(subject => (
                            <li key={subject} className="flex items-center gap-3">
                                <BookCopy className="w-4 h-4 text-emerald-500" />
                                <span className="text-muted-foreground">{subject}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    )
}
