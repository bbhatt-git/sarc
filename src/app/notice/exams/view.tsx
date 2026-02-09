'use client';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import PageHeader from '@/app/components/page-header';
import { FileText, ClipboardCheck, Download, Search, Loader2, UserX, CheckCircle, XCircle } from 'lucide-react';
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
const ResultDisplay = ({ result }: { result: Result }) => {
    const isPass = result.Remarks === 'Pass';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-8"
        >
            <Card className={cn(
                "relative overflow-hidden border-2 shadow-lg",
                isPass ? "border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-900/10" : "border-rose-500/50 bg-rose-500/5 dark:bg-rose-900/10"
            )}>
                 <div className={cn(
                    "absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20",
                    isPass ? "bg-emerald-500" : "bg-rose-500"
                 )}></div>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        {isPass ? <CheckCircle className="h-8 w-8 text-emerald-500" /> : <XCircle className="h-8 w-8 text-rose-500" />}
                        <div>
                            <CardTitle className="text-xl">Result for {result.SymbolNo}</CardTitle>
                            <CardDescription>
                                {isPass ? `Congratulations, ${result.StudentName}!` : `Result details for ${result.StudentName}.`}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border">
                            <p className="text-sm font-medium text-muted-foreground">Grade</p>
                            <p className="text-3xl font-bold text-foreground">{result.Grade}</p>
                        </div>
                        <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border">
                            <p className="text-sm font-medium text-muted-foreground">GPA</p>
                            <p className="text-3xl font-bold text-foreground">{result.GPA.toFixed(2)}</p>
                        </div>
                        <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border col-span-2">
                             <p className="text-sm font-medium text-muted-foreground">Remarks</p>
                             <p className={cn(
                                "text-3xl font-bold",
                                isPass ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                            )}>
                                {result.Remarks}
                            </p>
                        </div>
                    </div>
                     <div className="text-sm text-muted-foreground pt-4 border-t space-y-1">
                        <p><span className='font-semibold text-foreground'>Student Name:</span> {result.StudentName}</p>
                        <p><span className='font-semibold text-foreground'>Symbol Number:</span> {result.SymbolNo}</p>
                        <p><span className='font-semibold text-foreground'>Date of Birth:</span> {result.DOB}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};


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
                {/* Results Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-16"
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
                                {result && <ResultDisplay result={result} />}
                            </div>

                        </CardContent>
                    </Card>
                </motion.div>

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
            </div>
        </div>
    );
}
