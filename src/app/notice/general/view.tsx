'use client';
import PageHeader from '@/app/components/page-header';
import { motion } from 'framer-motion';
import { Bell, FileText, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

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
    const getIconColor = (iconName: keyof typeof iconMap) => {
        switch(iconName) {
            case 'Bell': return 'bg-sky-500/10 text-sky-500';
            case 'FileText': return 'bg-amber-500/10 text-amber-500';
            case 'Calendar': return 'bg-rose-500/10 text-rose-500';
            default: return 'bg-sky-500/10 text-sky-500';
        }
    }

    return (
        <div>
            <PageHeader title="General Notices" subtitle="Stay Informed" imageUrl="/images/hero/4.jpg" />
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="space-y-6">
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
                                    className="testimonial-card p-6"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={cn('p-3 rounded-full', getIconColor(notice.icon))}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground">{notice.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Published on: {notice.date}</p>
                                            <p className="text-muted-foreground mt-3">{notice.summary}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="testimonial-card text-center p-8">
                            <p className="text-muted-foreground">No general notices found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
