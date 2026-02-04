import PageHeader from "@/app/components/page-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { galleryItems, newsItems } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function NewsAndGalleryPage() {
    const allImages = placeholderImages.placeholderImages;

    const findImage = (id: string) => allImages.find(img => img.id === id);

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="News &amp; Gallery"
                subtitle="A glimpse into the vibrant life and latest happenings at SARC."
                backgroundImage={placeholderImages.placeholderImages[24].imageUrl}
            />

            <section id="news" className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-12">Latest News</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map(item => {
                            const image = findImage(item.image);
                            return (
                                <Card key={item.id} className="glass-card flex flex-col overflow-hidden group">
                                    {image && (
                                        <div className="relative h-56 overflow-hidden">
                                            <Image 
                                                src={image.imageUrl}
                                                alt={image.description}
                                                data-ai-hint={image.imageHint}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{format(new Date(item.date), 'MMMM dd, yyyy')}</p>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">{item.summary}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href="#" className="font-semibold text-primary group-hover:underline flex items-center">
                                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            
            <section id="gallery" className="py-16 lg:py-24 bg-secondary/50">
                 <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-12">Campus Life Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryItems.map(item => {
                            const image = findImage(item.image);
                            return image ? (
                                <div key={item.id} className="relative aspect-w-4 aspect-h-3 rounded-xl overflow-hidden group shadow-lg">
                                    <Image 
                                        src={image.imageUrl}
                                        alt={image.description}
                                        data-ai-hint={image.imageHint}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-sm font-medium -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.description}</p>
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
