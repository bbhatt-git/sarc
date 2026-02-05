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
            <div className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <Button variant="outline" asChild>
                                <Link href="/staff" className="inline-flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to All Staff
                                </Link>
                            </Button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 md:gap-12 bg-card p-8 rounded-lg shadow-md">
                            <div className="md:col-span-1 flex flex-col items-center text-center">
                                {image && (
                                     <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg mb-4 ring-4 ring-primary/20">
                                        <Image
                                            src={image.imageUrl}
                                            alt={`Portrait of ${staffMember.name}`}
                                            data-ai-hint={image.imageHint}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h1 className="text-2xl font-bold">{staffMember.name}</h1>
                                <p className="text-primary font-medium">{staffMember.designation}</p>
                                <Badge variant="secondary" className="mt-2">{staffMember.credentials}</Badge>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold border-b-2 border-primary/50 pb-2 mb-3">Educational Philosophy</h2>
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
