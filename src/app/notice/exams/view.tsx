'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SectionTitle from '@/app/components/section-title';
import { FileText, ClipboardCheck, Download, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const examNotices = [
    { title: 'Mid-Term Exam Routine - Grade 11 & 12', date: '2081-04-10', type: 'Routine', link: '#' },
    { title: 'First Terminal Exam Results - Grade 11', date: '2081-03-25', type: 'Result', link: '#' },
    { title: 'NEB Board Exam Form Fill-up Notice', date: '2081-03-15', type: 'Notice', link: '#' },
    { title: 'Pre-Board Exam Routine - Grade 12', date: '2081-03-05', type: 'Routine', link: '#' },
];

export default function ExamsView() {
    const [date, setDate] = useState<Date>();

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Exams & Results" subtitle="Schedules and Outcomes" />
            <div className="container mx-auto px-4 mt-16 max-w-5xl">
                <Card className="shadow-lg relative overflow-hidden bg-card/50 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle>Check Your Exam Results</CardTitle>
                        <CardDescription>Enter your symbol number and date of birth to view your results.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">Check Results Now</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg">
                                <DialogHeader>
                                    <DialogTitle>Check Exam Result</DialogTitle>
                                    <DialogDescription>
                                        Please provide your details below to view your exam result.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="symbol" className="text-right">
                                            Symbol No.
                                        </Label>
                                        <Input id="symbol" placeholder="e.g., 12345678" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dob" className="text-right">
                                            Date of Birth
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-3 justify-start text-left font-normal bg-transparent",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className='bg-emerald-600 hover:bg-emerald-700'>Check Result</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>

                <Card className="shadow-lg relative overflow-hidden bg-card/50 backdrop-blur-sm">
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
                                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${notice.type === 'Result' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                                            {notice.type === 'Result' ? <ClipboardCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
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
