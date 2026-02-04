import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { curriculumDetails, departmentDetails } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';
import { cn } from "@/lib/utils";

export default function AcademicsPage() {
    return (
        <div className="animated-fade-in">
            <PageHeader
                title="Academics"
                subtitle="A rigorous and inspiring curriculum designed to cultivate intellectual curiosity and a passion for lifelong learning."
                backgroundImage={placeholderImages.placeholderImages[22].imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Our Educational Philosophy</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We believe that education is not merely the memorization of facts, but the development of the whole person. Our approach integrates challenging academics with character education, encouraging students to think critically, act ethically, and lead with compassion. We foster a dynamic learning environment where students are active participants in their own education.
                        </p>
                    </div>

                    <Tabs defaultValue="primary" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto">
                            {curriculumDetails.map(level => (
                                <TabsTrigger key={level.id} value={level.id} className="py-2.5 text-base">
                                    {level.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {curriculumDetails.map(level => (
                             <TabsContent key={level.id} value={level.id} className="mt-8">
                                <Card className="glass-card overflow-hidden">
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-2xl font-bold font-headline mb-4">{level.title} Curriculum</h3>
                                        <p className="text-muted-foreground text-lg">{level.description}</p>
                                    </div>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Our Departments</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Our faculty are experts in their fields, bringing passion and deep knowledge to the classroom. Explore the core departments that form the heart of our academic program.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {departmentDetails.map(dept => (
                            <Card key={dept.id} className="glass-card">
                                <CardHeader className="items-center text-center">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                                        <dept.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <CardTitle className="font-headline text-xl">{dept.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-center">{dept.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
