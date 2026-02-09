'use client';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import PageHeader from '@/app/components/page-header';
import { FileText, ClipboardCheck, Download, Search, Loader2, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, FormEvent } from 'react';
import { checkResult } from '@/app/actions';
import type { Result } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Notice type remains the same
type Notice = {
  title: string;
  date: string;
  type: 'Routine' | 'Result' | 'Notice';
  link?: string;
};

interface ExamsViewProps {
  initialNotices: Notice[];
}

// Result card component
const ResultCard = ({ result }: { result: Result }) => (
    <Card className="mt-6 border-emerald-500 bg-emerald-500/5">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <UserCheck />
                Result Found
            </CardTitle>
            <CardDescription>Result for Symbol No: {result.SymbolNo}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-semibold text-foreground">Student Name</p>
                    <p className="text-muted-foreground">{result.StudentName}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Symbol Number</p>
                    <p className="text-muted-foreground">{result.SymbolNo}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Grade</p>
                    <p className="text-foreground font-bold text-lg">{result.Grade}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">GPA</p>
                    <p className="text-foreground font-bold text-lg">{result.GPA.toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold text-foreground">Remarks</p>
                    <p className={cn(
                        "font-bold text-lg",
                        result.Remarks === 'Pass' ? 'text-emerald-600' : 'text-rose-600'
                    )}>
                        {result.Remarks}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);


export default function ExamsView({ initialNotices }: ExamsViewProps) {
    const [symbolNo, setSymbolNo] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<Result | null>(null);

    const handleResultCheck = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);

        if (!symbolNo || !dob) {
            setError("Please enter both Symbol Number and Date of Birth.");
            setIsLoading(false);
            return;
        }

        try {
            const foundResult = await checkResult(symbolNo, dob);
            if (foundResult) {
                setResult(foundResult);
            } else {
                setError("No result found for the provided Symbol Number and Date of Birth. Please check your inputs and try again.");
            }
        } catch (e) {
            setError("An error occurred while checking your result. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    <Card className="testimonial-card">
                        <CardHeader>
                            <CardTitle>Check Your Exam Result</CardTitle>
                            <CardDescription>Enter your symbol number and date of birth to view your result.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleResultCheck} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="symbolNo">Symbol Number</Label>
                                        <Input
                                            id="symbolNo"
                                            value={symbolNo}
                                            onChange={(e) => setSymbolNo(e.target.value)}
                                            placeholder="e.g., 12345A"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth (YYYY-MM-DD)</Label>
                                        <Input
                                            id="dob"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                            placeholder="e.g., 2005-04-15"
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="mr-2 h-4 w-4" />
                                            Check Result
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6">
                                {error && (
                                    <Alert variant="destructive">
                                        <UserX className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                {result && <ResultCard result={result} />}
                            </div>

                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
