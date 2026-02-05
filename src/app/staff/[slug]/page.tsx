import { staffProfiles } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';
import PageHeader from "@/app/components/page-header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
    return staffProfiles.map((staff) => ({
        slug: staff.id,
    }));
}

export default function StaffProfilePage({ params }: { params: { slug: string } }) {
    const staffMember = staffProfiles.find(p => p.id === params.slug);

    if (!staffMember) {
        notFound();
    }
    
    const image = placeholderImages.placeholderImages.find(img => img.id === staffMember.image);
    const headerImage = placeholderImages.placeholderImages.find(img => img.id === 'page-header-staff');

    return (
        <div className="animated-fade-in">
             <PageHeader
                title={staffMember.name}
                subtitle={staffMember.designation}
                backgroundImage={headerImage?.imageUrl}
            />
            <div className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-12">
                            <Button variant="outline" asChild>
                                <Link href="/staff" className="inline-flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to All Faculty
                                </Link>
                            </Button>
                        </div>
                        <div className="glass-card grid md:grid-cols-3 gap-8 md:gap-12 p-8 rounded-lg">
                            <div className="md:col-span-1 flex flex-col items-center text-center">
                                {image && (
                                     <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg mb-6 ring-4 ring-primary/20">
                                        <Image
                                            src={image.imageUrl}
                                            alt={`Portrait of ${staffMember.name}`}
                                            data-ai-hint={image.imageHint}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold font-headline">{staffMember.name}</h1>
                                <p className="text-primary font-medium text-lg">{staffMember.designation}</p>
                                <Badge variant="secondary" className="mt-4">{staffMember.credentials}</Badge>
                            </div>
                            <div className="md:col-span-2 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-semibold border-b-2 border-primary/50 pb-3 mb-4 font-headline">Educational Philosophy</h2>
                                    <p className="text-muted-foreground text-lg whitespace-pre-line italic">"{staffMember.philosophy}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
