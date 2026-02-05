import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { galleryItems, newsItems } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function NewsAndGalleryPage() {
    const allImages = placeholderImages.placeholderImages;
    const headerImage = allImages.find(img => img.id === 'page-header-news');

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="News & Gallery"
                subtitle="A glimpse into the vibrant life and latest happenings at SARC."
                backgroundImage={headerImage?.imageUrl}
            />

            <section id="news" className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold tracking-tight text-center mb-16 sm:text-5xl font-headline">Latest News</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map(item => {
                            const image = allImages.find(img => img.id === item.image);
                            return (
                                <Card key={item.id} className="glass-card flex flex-col overflow-hidden group hover:-translate-y-2">
                                    {image && (
                                        <div className="relative h-60 overflow-hidden">
                                            <Image 
                                                src={image.imageUrl}
                                                alt={item.title}
                                                data-ai-hint={image.imageHint}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                            <Badge variant="outline">{item.category}</Badge>
                                            <div className="flex items-center gap-2">
                                              <Calendar className="w-4 h-4" />
                                              <span>{format(new Date(item.date), 'MMMM dd, yyyy')}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground line-clamp-4">{item.summary}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href="#" className="font-semibold text-primary group-hover:underline flex items-center">
                                            Read More <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            
            <section id="gallery" className="py-20 lg:py-28 bg-secondary/30">
                 <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold tracking-tight text-center mb-16 sm:text-5xl font-headline">Campus Life Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryItems.map(item => {
                            const image = allImages.find(img => img.id === item.image);
                            return image ? (
                                <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden group shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                    <Image 
                                        src={image.imageUrl}
                                        alt={item.description}
                                        data-ai-hint={image.imageHint}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-shadow">{item.description}</p>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                 </div>
            </section>
        </div>
    )
}
