'use client';

import { useState, useRef, FormEvent } from 'react';
import PageHeader from "@/app/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import placeholderImages from '@/lib/placeholder-images.json';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { z } from "zod";
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const inquirySchema = z.object({
  parentName: z.string().min(2, "Name is too short"),
  studentName: z.string().min(2, "Name is too short"),
  studentAge: z.coerce.number().min(5, "Age must be at least 5").max(18, "Age must be at most 18"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
});

type State = {
  message: string | null;
  errors: Record<string, string[] | undefined> | null;
  success: boolean;
};

export default function AdmissionsPage() {
    const [state, setState] = useState<State>({ message: null, errors: null, success: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const firestore = useFirestore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!firestore) return;

        setIsSubmitting(true);
        setState({ message: null, errors: null, success: false });

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const validatedFields = inquirySchema.safeParse(rawData);

        if (!validatedFields.success) {
            const errors = validatedFields.error.flatten().fieldErrors;
            setState({
                errors,
                message: 'Error: Please check your input.',
                success: false,
            });
            setIsSubmitting(false);
            toast({
                variant: 'destructive',
                title: 'Submission Error',
                description: 'Please correct the errors in the form.',
            });
            return;
        }

        const inquiryData = {
          ...validatedFields.data,
          createdAt: serverTimestamp(),
        };

        const collRef = collection(firestore, "admissionInquiries");
        
        addDoc(collRef, inquiryData).then(() => {
          setState({
              message: `Thank you, ${validatedFields.data.parentName}! Your inquiry has been received. We will be in touch shortly.`,
              errors: null,
              success: true
          });
          formRef.current?.reset();
        }).catch((serverError) => {
          const permissionError = new FirestorePermissionError({
            path: collRef.path,
            operation: 'create',
            requestResourceData: inquiryData,
          });
          errorEmitter.emit('permission-error', permissionError);

          setState({
              message: 'Server Error: Could not submit your inquiry. Please try again later.',
              errors: null,
              success: false
          });
          toast({
              variant: 'destructive',
              title: 'Submission Error',
              description: 'Could not submit your inquiry. Please try again later.',
          });
        }).finally(() => {
          setIsSubmitting(false);
        });
    }

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="Admissions"
                subtitle="Join a community where curiosity is celebrated and potential is realized."
                backgroundImage={placeholderImages.placeholderImages[2].imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter font-headline mb-4">The Admissions Process</h2>
                            <p className="text-muted-foreground text-lg mb-6">
                                We welcome applications from students who are intellectually curious, motivated, and eager to contribute to our vibrant school community. Our admissions process is designed to be holistic and personal, allowing us to get to know each applicant as an individual.
                            </p>
                            <ol className="list-decimal list-inside space-y-4 text-muted-foreground text-lg">
                                <li><strong>Submit an Inquiry:</strong> Begin by completing the form on this page to receive our admissions brochure and connect with our team.</li>
                                <li><strong>Application:</strong> Complete our online application and submit the required documents, including transcripts and teacher recommendations.</li>
                                <li><strong>Interview &amp; Assessment:</strong> We invite qualified applicants for a personal interview and a grade-level assessment to ensure a good fit.</li>
                                <li><strong>Decision:</strong> Admissions decisions are communicated in early spring. We look forward to welcoming new families to SARC!</li>
                            </ol>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tighter font-headline mb-4">Key Dates</h3>
                             <ul className="space-y-2 text-muted-foreground text-lg">
                                <li><strong>Applications Open:</strong> September 1st</li>
                                <li><strong>Application Deadline:</strong> January 15th</li>
                                <li><strong>Decision Notification:</strong> March 10th</li>
                            </ul>
                        </div>
                    </div>

                    <Card className="glass-card sticky top-24">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Request Information</CardTitle>
                            <CardDescription>
                                Complete this form to begin your journey with SARC.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="parentName">Parent's Name</Label>
                                    <Input id="parentName" name="parentName" placeholder="e.g. Jane Doe" required />
                                    {state.errors?.parentName && <p className="text-sm text-destructive">{state.errors.parentName[0]}</p>}
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="studentName">Student's Name</Label>
                                        <Input id="studentName" name="studentName" placeholder="e.g. John Doe" required />
                                        {state.errors?.studentName && <p className="text-sm text-destructive">{state.errors.studentName[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="studentAge">Student's Age</Label>
                                        <Input id="studentAge" name="studentAge" type="number" placeholder="e.g. 14" required />
                                        {state.errors?.studentAge && <p className="text-sm text-destructive">{state.errors.studentAge[0]}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                    {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message (Optional)</Label>
                                    <Textarea id="message" name="message" placeholder="Tell us about your child's interests or any questions you have." />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                     ) : 'Submit Inquiry'}
                                </Button>
                                {state.success && state.message && (
                                    <Alert variant="default" className="mt-4 bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-300">
                                      <CheckCircle className="h-4 w-4" />
                                      <AlertTitle>Success!</AlertTitle>
                                      <AlertDescription>
                                        {state.message}
                                      </AlertDescription>
                                    </Alert>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
