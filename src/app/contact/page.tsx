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
import { CheckCircle, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message is too short"),
});

type State = {
  message: string | null;
  errors: Record<string, string[] | undefined> | null;
  success: boolean;
};

export default function ContactPage() {
    const [state, setState] = useState<State>({ message: null, errors: null, success: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const headerImage = placeholderImages.placeholderImages.find(img => img.id === 'page-header-contact');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setState({ message: null, errors: null, success: false });

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const validatedFields = contactSchema.safeParse(rawData);

        if (!validatedFields.success) {
            const errors = validatedFields.error.flatten().fieldErrors;
            setState({
                errors,
                message: 'Please check your input.',
                success: false,
            });
             toast({
                variant: 'destructive',
                title: 'Submission Error',
                description: 'Please correct the errors in the form.',
            });
            setIsSubmitting(false);
            return;
        }

        setState({
            message: `Thank you, ${validatedFields.data.fullName}! Your message has been sent. We'll get back to you soon.`,
            errors: null,
            success: true
        });
        toast({
            title: 'Message Sent!',
            description: 'We will be in touch shortly.',
        });
        formRef.current?.reset();
        setIsSubmitting(false);
    }

    return (
        <div className="animated-fade-in">
            <PageHeader
                title="Contact Us"
                subtitle="We're here to help. Reach out to us with any questions or inquiries."
                backgroundImage={headerImage?.imageUrl}
            />

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-1 space-y-8">
                         <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
                         <div className="space-y-6 text-muted-foreground">
                            <div className='flex items-start gap-4'>
                                <MapPin className='text-primary mt-1 shrink-0' />
                                <div>
                                    <h3 className='font-semibold text-foreground'>Our Address</h3>
                                    <p>Padma Kanya Multiple Campus, Bagbazar, Kathmandu, Nepal</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-4'>
                                <Phone className='text-primary mt-1 shrink-0' />
                                <div>
                                    <h3 className='font-semibold text-foreground'>Call Us</h3>
                                    <p>+977-1-4242424</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-4'>
                                <Mail className='text-primary mt-1 shrink-0' />
                                <div>
                                    <h3 className='font-semibold text-foreground'>Email Us</h3>
                                    <p>info@sarc.edu.np</p>
                                </div>
                            </div>
                         </div>
                    </div>

                    <div className="lg:col-span-2">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we will get back to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                     <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input id="fullName" name="fullName" placeholder="e.g. John Doe" required />
                                            {state.errors?.fullName && <p className="text-sm text-destructive">{state.errors.fullName[0]}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                            {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" name="subject" placeholder="e.g. Admission Inquiry" required />
                                        {state.errors?.subject && <p className="text-sm text-destructive">{state.errors.subject[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" name="message" placeholder="Your message here..." required rows={5} />
                                        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : 'Send Message'}
                                    </Button>
                                    {state.success && state.message && (
                                        <Alert variant="default" className="mt-4 border-green-500/50 bg-green-50 text-green-800">
                                            <CheckCircle className="h-4 w-4 !text-green-600" />
                                            <AlertTitle className="font-semibold">Success!</AlertTitle>
                                            <AlertDescription>
                                                {state.message}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
