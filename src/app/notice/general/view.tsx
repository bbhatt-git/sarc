'use client';
import PageHeader from '@/app/components/page-header';
import { motion } from 'framer-motion';
import { Bell, FileText, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


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
    details?: string;
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
                            
                            const noticeCard = (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="testimonial-card p-6 w-full text-left"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={cn('p-3 rounded-full', getIconColor(notice.icon))}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground">{notice.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Published on (AD): {notice.date}</p>
                                            <p className="text-muted-foreground mt-3">{notice.summary}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );

                            if (!notice.details) {
                                return <div key={index}>{noticeCard}</div>;
                            }

                            return (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                        <div className="cursor-pointer">
                                            {noticeCard}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px] bg-card/80 backdrop-blur-xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-foreground">{notice.title}</DialogTitle>
                                            <DialogDescription className="text-sm text-muted-foreground pt-2">
                                                Published on (AD): {notice.date}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 text-foreground/90 whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
                                            {notice.details}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            );
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
