'use client';

import { useState, useRef, FormEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from 'lucide-react';
import { z } from "zod";
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '../components/page-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const admissionSchema = z.object({
  parentName: z.string().min(2, "Parent's name is too short"),
  studentName: z.string().min(2, "Student's name is too short"),
  studentAge: z.preprocess((val) => Number(val), z.number().min(3, "Student's age must be at least 3")),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  gradeLevel: z.string().min(1, "Please select a grade level"),
  message: z.string().optional(),
});

type State = {
  message: string | null;
  errors: Record<string, string[] | undefined> | null;
  success: boolean;
};

export default function AdmissionsView() {
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

        const validatedFields = admissionSchema.safeParse(rawData);

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
              message: `Thank you, ${validatedFields.data.parentName}! Your admission inquiry has been received. We will be in touch shortly.`,
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
        <div>
            <PageHeader title="Admissions" subtitle="Begin Your Journey at SARC" imageUrl="/images/hero/1.jpg" />
            <div className="container mx-auto px-4 max-w-4xl py-20">
                 <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Online Admission Form</h3>
                    <p className="text-muted-foreground mb-8">Fill out the form below to start the admission process.</p>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="parentName">Parent/Guardian Full Name</Label>
                                <Input id="parentName" name="parentName" placeholder="e.g. Jane Doe" required />
                                {state.errors?.parentName && <p className="text-sm text-rose-500">{state.errors.parentName[0]}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="studentName">Student's Full Name</Label>
                                <Input id="studentName" name="studentName" placeholder="e.g. John Doe" required />
                                {state.errors?.studentName && <p className="text-sm text-rose-500">{state.errors.studentName[0]}</p>}
                            </div>
                        </div>
                         <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="studentAge">Student's Age</Label>
                                <Input id="studentAge" name="studentAge" type="number" placeholder="e.g. 16" required />
                                {state.errors?.studentAge && <p className="text-sm text-rose-500">{state.errors.studentAge[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                {state.errors?.email && <p className="text-sm text-rose-500">{state.errors.email[0]}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="+977-..." required />
                                {state.errors?.phone && <p className="text-sm text-rose-500">{state.errors.phone[0]}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="gradeLevel">Applying for Grade</Label>
                                <Select name="gradeLevel">
                                  <SelectTrigger id="gradeLevel">
                                    <SelectValue placeholder="Select a grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ecd">ECD</SelectItem>
                                    <SelectItem value="1-8">School Section (1-8)</SelectItem>
                                    <SelectItem value="9-10">School Section (9-10)</SelectItem>
                                    <SelectItem value="bridge">Bridge Course</SelectItem>
                                    <SelectItem value="+2-science">+2 Science</SelectItem>
                                    <SelectItem value="+2-management">+2 Management</SelectItem>
                                    <SelectItem value="+2-law">+2 Law</SelectItem>
                                  </SelectContent>
                                </Select>
                                {state.errors?.gradeLevel && <p className="text-sm text-rose-500">{state.errors.gradeLevel[0]}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea id="message" name="message" placeholder="Any questions you have for us?" />
                        </div>
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                             ) : 'Submit Inquiry'}
                        </Button>
                        {state.success && state.message && (
                             <Alert variant="default" className="mt-4 bg-emerald-50 border-emerald-200 text-emerald-800">
                              <CheckCircle className="h-4 w-4 !text-emerald-600" />
                              <AlertTitle className="font-semibold">Success!</AlertTitle>
                              <AlertDescription>
                                {state.message}
                              </AlertDescription>
                            </Alert>
                        )}
                         {state.message && !state.success && state.errors && (
                            <Alert variant="destructive" className="mt-4">
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>
                                {Object.values(state.errors).flat().join(' ')}
                              </AlertDescription>
                            </Alert>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
