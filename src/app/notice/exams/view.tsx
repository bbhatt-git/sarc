'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { FileText, ClipboardCheck, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const examNotices = [
    { title: 'Mid-Term Exam Routine - Grade 11 & 12', date: '2081-04-10', type: 'Routine', link: '#' },
    { title: 'First Terminal Exam Results - Grade 11', date: '2081-03-25', type: 'Result', link: '#' },
    { title: 'NEB Board Exam Form Fill-up Notice', date: '2081-03-15', type: 'Notice', link: '#' },
    { title: 'Pre-Board Exam Routine - Grade 12', date: '2081-03-05', type: 'Routine', link: '#' },
];

export default function ExamsView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Exams & Results" subtitle="Schedules and Outcomes" />
            <div className="container mx-auto px-4 mt-16 max-w-5xl">
                <Card className="shadow-lg relative overflow-hidden">
                    <CardHeader>
                        <CardTitle>Examination Notices</CardTitle>
                        <CardDescription>Find all exam-related announcements, routines, and results here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {examNotices.map((notice, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${notice.type === 'Result' ? 'bg-emerald-100' : 'bg-sky-100'}`}>
                                            {notice.type === 'Result' ? <ClipboardCheck className="w-6 h-6 text-emerald-600" /> : <FileText className="w-6 h-6 text-sky-600" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{notice.title}</h3>
                                            <p className="text-sm text-muted-foreground">Published on: {notice.date}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <a href={notice.link}><Download className="mr-2 h-4 w-4" /> Download</a>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
