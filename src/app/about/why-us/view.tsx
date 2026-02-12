
'use client';
import { WHY_US_ITEMS } from '@/lib/constants';
import PageHeader from '@/app/components/page-header';

export default function WhyUsView() {
    return (
        <div>
            <PageHeader title="Why Choose SARC?" subtitle="Our Commitment to Your Success" imageUrl="/images/hero/1.jpg" />

            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {WHY_US_ITEMS.map((item, index) => (
                        <div
                            key={item.title}
                            className="testimonial-card p-8 flex items-start gap-6 h-full"
                        >
                            <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                                <item.icon className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-lg">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
