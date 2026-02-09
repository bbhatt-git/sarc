'use client';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import PageHeader from '@/app/components/page-header';
import { FileText, ClipboardCheck, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define types for the data coming from Excel
type Notice = {
  title: string;
  date: string;
  type: 'Routine' | 'Result' | 'Notice';
  link?: string;
};

type Result = {
  StudentName: string;
  SymbolNo: string;
  Grade: string;
  GPA: number;
  Remarks: 'Pass' | 'Fail';
};

interface ExamsViewProps {
  initialNotices: Notice[];
  initialResults: Result[];
}

export default function ExamsView({ initialNotices, initialResults }: ExamsViewProps) {
    return (
        <div>
            <PageHeader title="Exams & Results" subtitle="Schedules and Outcomes" imageUrl="/images/hero/3.jpg" />
            <div className="container mx-auto px-4 py-20 max-w-5xl">
                {/* Notices Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-foreground mb-6">Latest Examination Notices</h2>
                    {initialNotices && initialNotices.length > 0 ? (
                        <div className="space-y-4">
                            {initialNotices.map((notice, index) => (
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
                                     {notice.link && (
                                         <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                                             <a href={notice.link} target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-4 w-4" /> Download</a>
                                         </Button>
                                     )}
                                   </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No notices found.</p>
                    )}
                </motion.div>

                {/* Results Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl font-bold text-foreground mb-6">Exam Results</h2>
                     <Card className="testimonial-card">
                        <CardContent className="p-0">
                            {initialResults && initialResults.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student Name</TableHead>
                                            <TableHead>Symbol No.</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>GPA</TableHead>
                                            <TableHead>Remarks</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialResults.map((result, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{result.StudentName}</TableCell>
                                                <TableCell>{result.SymbolNo}</TableCell>
                                                <TableCell>{result.Grade}</TableCell>
                                                <TableCell>{result.GPA}</TableCell>
                                                <TableCell className={cn(result.Remarks === 'Pass' ? 'text-emerald-600' : 'text-rose-600')}>{result.Remarks}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="p-6 text-muted-foreground">No results found.</p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
