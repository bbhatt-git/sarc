import PageHeader from "@/app/components/page-header";
import { staffProfiles } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StaffPage() {
    return (
        <div className="animated-fade-in">
            <PageHeader
                title="Our Staff & Faculty"
                subtitle="A dedicated team of educators, mentors, and leaders committed to student success."
                backgroundImage={placeholderImages.placeholderImages[22].imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {staffProfiles.map(staff => {
                             const image = placeholderImages.placeholderImages.find(img => img.id === staff.image);
                            return (
                                <Link key={staff.id} href={`/staff/${staff.id}`} className="group">
                                    <Card className="glass-card h-full text-center flex flex-col items-center p-4">
                                        <CardHeader className="items-center">
                                            <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all group-hover:scale-105">
                                                {image && <AvatarImage src={image.imageUrl} alt={staff.name} />}
                                                <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">{staff.name}</CardTitle>
                                            <p className="text-sm text-primary font-medium">{staff.designation}</p>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <Badge variant="secondary" className="bg-primary/10 text-primary-foreground/80">{staff.credentials}</Badge>
                                        </CardContent>
                                        <div className="pb-6 text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                                            View Profile <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </div>
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
