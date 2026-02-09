'use client';
import PageHeader from '@/app/components/page-header';
import { motion } from 'framer-motion';
import { Bell, FileText, Calendar } from 'lucide-react';

const iconMap = {
    Bell,
    FileText,
    Calendar,
    Default: Bell
};

type Notice = {
    title: string;
    date: string;
    summary: string;
    icon: keyof typeof iconMap;
};

interface GeneralNoticeViewProps {
    initialNotices: Notice[];
}

export default function GeneralNoticeView({ initialNotices }: GeneralNoticeViewProps) {
    return (
        <div>
            <PageHeader title="General Notices" subtitle="Stay Informed" imageUrl="/images/hero/4.jpg" />
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="space-y-8">
                    {initialNotices && initialNotices.length > 0 ? (
                        initialNotices.map((notice, index) => {
                            const IconComponent = iconMap[notice.icon] || iconMap.Default;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="testimonial-card border-l-4 border-emerald-500"
                                >
                                    <div className="flex items-start gap-4">
                                        <IconComponent className="w-6 h-6 text-emerald-600 mt-1" />
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xl font-bold text-foreground">{notice.title}</h3>
                                                <span className="text-sm text-muted-foreground bg-slate-100 px-2 py-1 rounded">{notice.date}</span>
                                            </div>
                                            <p className="text-muted-foreground mt-2">{notice.summary}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="testimonial-card text-center">
                            <p className="text-muted-foreground">No general notices found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
