'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { CalendarDays, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const holidays = [
    { name: 'Dashain Vacation', date: 'Kartik 4 - Kartik 14, 2081', details: 'The college will remain closed for the auspicious occasion of Dashain.' },
    { name: 'Tihar Holiday', date: 'Kartik 25 - Kartik 29, 2081', details: 'Wishing all our students and staff a happy and prosperous Tihar.' },
    { name: 'Chhath Parva Holiday', date: 'Mangsir 4, 2081', details: 'The college will be closed to observe Chhath Parva.' },
    { name: 'Winter Break', date: 'Poush 15 - Magh 1, 2081', details: 'Enjoy the winter break. The college will resume from Magh 2.' },
];

export default function HolidayNoticeView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Holiday Notices" subtitle="Academic Calendar & Breaks" />
            <div className="container mx-auto px-4 mt-16 max-w-4xl">
                <Card className="bg-card/50 backdrop-blur-lg relative overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Info className="w-5 h-5" />
                            Upcoming Holidays (2081 B.S.)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {holidays.map((holiday, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="flex items-start gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border"
                                >
                                    <div className="bg-rose-100 p-3 rounded-full">
                                        <CalendarDays className="w-6 h-6 text-rose-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">{holiday.name}</h3>
                                        <p className="font-semibold text-rose-600">{holiday.date}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{holiday.details}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
