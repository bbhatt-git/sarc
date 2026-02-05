import PageHeader from "@/app/components/page-header";
import { staffProfiles } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StaffPage() {
    const headerImage = placeholderImages.placeholderImages.find(img => img.id === 'page-header-staff');

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="Our Faculty"
                subtitle="A dedicated team of educators, mentors, and leaders committed to student success."
                backgroundImage={headerImage?.imageUrl}
            />

            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {staffProfiles.map(staff => {
                             const image = placeholderImages.placeholderImages.find(img => img.id === staff.image);
                            return (
                                <Link key={staff.id} href={`/staff/${staff.id}`} className="group">
                                    <Card className="glass-card h-full text-center flex flex-col items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                        <CardHeader className="items-center p-0">
                                            <Avatar className="w-32 h-32 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all group-hover:scale-105">
                                                {image && <AvatarImage src={image.imageUrl} alt={staff.name} />}
                                                <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{staff.name}</CardTitle>
                                            <p className="text-sm text-primary font-medium">{staff.designation}</p>
                                        </CardHeader>
                                        <CardContent className="flex-grow mt-4 p-0">
                                            <Badge variant="secondary" className="font-normal">{staff.credentials}</Badge>
                                        </CardContent>
                                        <CardFooter className="p-0 mt-4">
                                          <div className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors flex items-center">
                                              View Profile <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                          </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
