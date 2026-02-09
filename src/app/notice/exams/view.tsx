
'use client';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import PageHeader from '@/app/components/page-header';
import { FileText, ClipboardCheck, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const examNotices = [
    { title: 'Mid-Term Exam Routine - Grade 11 & 12', date: '2081-04-10', type: 'Routine', link: '#' },
    { title: 'First Terminal Exam Results - Grade 11', date: '2081-03-25', type: 'Result', link: '#' },
    { title: 'NEB Board Exam Form Fill-up Notice', date: '2081-03-15', type: 'Notice', link: '#' },
    { title: 'Pre-Board Exam Routine - Grade 12', date: '2081-03-05', type: 'Routine', link: '#' },
];

export default function ExamsView() {
    return (
        <div>
            <PageHeader title="Exams & Results" subtitle="Schedules and Outcomes" imageUrl="/images/hero/3.jpg" />
            <div className="container mx-auto px-4 py-20 max-w-5xl">
                {/* Result Checker Card - making it more prominent */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Card className="testimonial-card mb-12 shadow-2xl shadow-slate-500/10">
                        <CardHeader className='text-center'>
                            <div className="mx-auto bg-emerald-500/10 text-emerald-500 p-4 rounded-full mb-2">
                                <ClipboardCheck className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl">Check Your Exam Results</CardTitle>
                            <CardDescription>Enter your symbol number and date of birth to view your results instantly.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-base font-semibold rounded-full shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105">
                                        Check Results Now
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-card/80 backdrop-blur-lg border-border">
                                    <DialogHeader>
                                        <DialogTitle>Check Exam Result</DialogTitle>
                                        <DialogDescription>
                                            Please provide your details below to view your exam result.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="symbol">Symbol No.</Label>
                                            <Input id="symbol" placeholder="e.g., 12345678" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="year">Date of Birth (BS)</Label>
                                            <div className="flex items-center gap-2">
                                                <Input id="year" name="year" placeholder="YYYY" />
                                                <Input id="month" name="month" placeholder="MM" />
                                                <Input id="day" name="day" placeholder="DD" />
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className='w-full bg-emerald-600 hover:bg-emerald-700'>Check Result</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notices Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-foreground mb-6">Latest Examination Notices</h2>
                    <div className="space-y-4">
                        {examNotices.map((notice, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="testimonial-card p-4"
                            >
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                     <div className={cn(
                                         'p-3 rounded-full',
                                         notice.type === 'Result' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-sky-500/10 text-sky-500'
                                     )}>
                                         {notice.type === 'Result' ? <ClipboardCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                                     </div>
                                     <div>
                                         <h3 className="font-bold text-foreground">{notice.title}</h3>
                                         <p className="text-sm text-muted-foreground">Published on: {notice.date}</p>
                                     </div>
                                 </div>
                                 <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                                     <a href={notice.link}><Download className="mr-2 h-4 w-4" /> Download</a>
                                 </Button>
                               </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
