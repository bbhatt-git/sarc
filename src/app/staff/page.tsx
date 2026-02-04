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
                title="Our Staff &amp; Faculty"
                subtitle="A dedicated team of educators, mentors, and leaders committed to student success."
                backgroundImage={placeholderImages.placeholderImages[23].imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {staffProfiles.map(staff => {
                             const image = placeholderImages.placeholderImages.find(img => img.id === staff.image);
                            return (
                                <Link key={staff.id} href={`/staff/${staff.id}`} className="group">
                                    <Card className="glass-card h-full text-center hover:bg-card/90 transition-colors duration-300 flex flex-col items-center">
                                        <CardHeader className="items-center">
                                            <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                                                {image && <AvatarImage src={image.imageUrl} alt={staff.name} />}
                                                <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <CardTitle className="font-headline text-lg">{staff.name}</CardTitle>
                                            <p className="text-sm text-primary font-medium">{staff.designation}</p>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <Badge variant="secondary">{staff.credentials}</Badge>
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
