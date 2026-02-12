'use client';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
    Cpu, BrainCircuit, Leaf, CircuitBoard, 
    FlaskConical, Rocket, Microscope, Building, Globe 
} from 'lucide-react';

const innovationProjects = [
    {
        icon: Cpu,
        title: "Robotics & AI Lab",
        description: "Students build robots, program intelligent systems, and compete in national robotics challenges."
    },
    {
        icon: BrainCircuit,
        title: "Machine Learning Projects",
        description: "Hands-on experience with neural networks, computer vision, and predictive algorithms."
    },
    {
        icon: Leaf,
        title: "Corn Husk Doll Crafts",
        description: "Traditional crafts meet innovation — designing and marketing cultural products."
    },
    {
        icon: CircuitBoard,
        title: "IoT & Electronics",
        description: "Building smart devices, automation systems, and sustainable energy solutions."
    }
];

const educationalTours = [
    {
        icon: FlaskConical,
        title: "Bioengineering Facility Visits",
        description: "Exposure to cutting-edge research in genetic engineering and biotechnology."
    },
    {
        icon: Rocket,
        title: "Science Exhibitions",
        description: "Participation in national and regional science fairs and innovation competitions."
    },
    {
        icon: Microscope,
        title: "Research Lab Tours",
        description: "Behind-the-scenes access to university labs and research institutions."
    },
    {
        icon: Building,
        title: "Industry Visits",
        description: "Real-world learning at technology companies, manufacturing plants, and startups."
    },
    {
        icon: Globe,
        title: "International Trips",
        description: "Educational tours to India and beyond for global exposure."
    }
];

export default function InnovationView() {
    return (
        <div>
            <PageHeader 
                title="Innovation & Practical Learning" 
                subtitle="Where theory meets practice — Building tomorrow's solutions today" 
            />
            
            <div className="py-20 space-y-24">
                <section className="container mx-auto px-4 max-w-6xl">
                    <SectionTitle title="Hands-On Innovation Projects" subtitle="Real projects solving real problems — Learning by creating" />
                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                        {innovationProjects.map((project, index) => (
                            <div
                                key={project.title}
                                className="testimonial-card p-8 flex items-start gap-6 h-full transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="bg-primary/10 p-4 rounded-full border border-primary/20">
                                    <project.icon className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground text-lg">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-4 max-w-6xl">
                    <SectionTitle title="Educational Tours & Visits" subtitle="Learning extends beyond our campus — Exposure to real-world innovation" />
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {educationalTours.map((tour, index) => (
                            <div
                                key={tour.title}
                                className="testimonial-card p-6 flex flex-col items-center text-center gap-4 h-full transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="bg-sky-100 p-4 rounded-full border border-sky-200">
                                    <tour.icon className="w-8 h-8 text-sky-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{tour.title}</h3>
                                    <p className="text-muted-foreground">{tour.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section className="container mx-auto px-4 max-w-4xl">
                     <div className="bg-card/50 backdrop-blur-sm border p-12 text-center relative overflow-hidden rounded-2xl">
                        <h2 className="text-3xl font-bold text-foreground mb-4 relative">Building Tomorrow's Innovators</h2>
                        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed relative">
                           Our students don't just learn about technology — they create it. From designing robots that solve local problems to developing AI models, from crafting traditional art to engineering sustainable solutions, SARC students are hands-on innovators.
                        </p>
                         <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed relative mt-4">
                           Through our partnerships with research institutions, industry leaders, and innovation hubs, we provide exposure that transforms curious students into confident creators ready to tackle global challenges.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
