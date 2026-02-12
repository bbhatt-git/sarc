'use client';
import PageHeader from '@/app/components/page-header';
import { CalendarDays, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { imageData } from '@/lib/image-data';

type Holiday = {
    name: string;
    date: string;
    details: string;
};

interface HolidayNoticeViewProps {
  initialHolidays: Holiday[];
}

export default function HolidayNoticeView({ initialHolidays }: HolidayNoticeViewProps) {
    return (
        <div>
            <PageHeader title="Holiday Notices" subtitle="Academic Calendar & Breaks" imageUrl={imageData.hero[0].src} />
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <Card className="testimonial-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Info className="w-5 h-5" />
                            Upcoming Holidays (2081 B.S.)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {initialHolidays && initialHolidays.length > 0 ? (
                            <div className="space-y-6">
                                {initialHolidays.map((holiday, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border"
                                    >
                                        <div className="bg-rose-100 dark:bg-rose-900/50 p-3 rounded-full">
                                            <CalendarDays className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">{holiday.name}</h3>
                                            <p className="font-semibold text-rose-500">{holiday.date}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{holiday.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-muted-foreground text-center">No holiday notices found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
