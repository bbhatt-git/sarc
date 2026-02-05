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

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Curriculum Overview</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Our curriculum is designed to be both rigorous and relevant, providing students with the theoretical knowledge and practical skills needed to thrive in their chosen fields. We emphasize critical thinking, collaboration, and a hands-on approach to learning.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {curriculumDetails.map(program => (
                            <Card key={program.id} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader>
                                  <div className="flex items-center gap-4 mb-2">
                                    <BookOpen className="w-8 h-8 text-primary" />
                                    <div>
                                      <CardTitle className="text-2xl">{program.title}</CardTitle>
                                      <p className="text-sm text-muted-foreground">{program.summary}</p>
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
