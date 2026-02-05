import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { curriculumDetails } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';
import { BookOpen } from "lucide-react";

export default function AcademicsPage() {
    const headerImage = placeholderImages.placeholderImages.find(img => img.id === 'page-header-academics');

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="Our Programs"
                subtitle="A diverse range of academic programs designed to foster intellectual growth and professional success."
                backgroundImage={headerImage?.imageUrl}
            />

            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Curriculum Overview</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Our curriculum is designed to be both rigorous and relevant, providing students with the theoretical knowledge and practical skills needed to thrive in their chosen fields. We emphasize critical thinking, collaboration, and a hands-on approach to learning.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {curriculumDetails.map(program => (
                            <Card key={program.id} className="glass-card flex flex-col hover:-translate-y-2">
                                <CardHeader>
                                  <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                      <BookOpen className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                      <CardTitle className="text-2xl font-headline">{program.title}</CardTitle>
                                      <p className="text-sm text-primary/80">{program.summary}</p>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{program.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
