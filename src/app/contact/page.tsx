'use client';

import { useState, useRef, FormEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { z } from "zod";
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SectionTitle from '../components/section-title';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';

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
    const firestore = useFirestore();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!firestore) return;

        setIsSubmitting(true);
        setState({ message: null, errors: null, success: false });

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());
        const validatedFields = contactSchema.safeParse(rawData);

        if (!validatedFields.success) {
            const errors = validatedFields.error.flatten().fieldErrors;
            setState({ errors, message: "Please correct the errors.", success: false });
            setIsSubmitting(false);
            toast({ variant: 'destructive', title: 'Submission Error' });
            return;
        }

        const contactData = { ...validatedFields.data, createdAt: serverTimestamp() };

        const collRef = collection(firestore, "messages");
        
        addDoc(collRef, contactData).then(() => {
          setState({ message: "Thank you for your message! We will get back to you shortly.", errors: null, success: true });
          formRef.current?.reset();
        }).catch((serverError) => {
          const permissionError = new FirestorePermissionError({
            path: collRef.path,
            operation: 'create',
            requestResourceData: contactData,
          });
          errorEmitter.emit('permission-error', permissionError);
          setState({ message: 'Server Error: Could not send message.', errors: null, success: false });
          toast({ variant: 'destructive', title: 'Server Error' });
        }).finally(() => {
          setIsSubmitting(false);
        });
    }

    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="Contact Us" subtitle="Get In Touch With SARC" />

            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="container mx-auto px-4 mt-16"
            >
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="glass-card p-8 md:p-12">
                        <h3 className="text-2xl font-bold mb-2 text-slate-100">Send Us a Message</h3>
                        <p className="text-slate-400 mb-8">We'll get back to you as soon as possible.</p>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" name="fullName" placeholder="e.g. John Doe" required />
                                    {state.errors?.fullName && <p className="text-sm text-rose-500">{state.errors.fullName[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                    {state.errors?.email && <p className="text-sm text-rose-500">{state.errors.email[0]}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="e.g. Admission Inquiry" required />
                                {state.errors?.subject && <p className="text-sm text-rose-500">{state.errors.subject[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" placeholder="Your message here..." required rows={5} />
                                {state.errors?.message && <p className="text-sm text-rose-500">{state.errors.message[0]}</p>}
                            </div>
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : 'Send Message'}
                            </Button>
                            {state.success && state.message && (
                                <Alert variant="default" className="mt-4 bg-emerald-900/50 border-emerald-700 text-emerald-300">
                                  <CheckCircle className="h-4 w-4 !text-emerald-400" />
                                  <AlertTitle className="font-semibold">Success!</AlertTitle>
                                  <AlertDescription>{state.message}</AlertDescription>
                                </Alert>
                            )}
                        </form>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-lg overflow-hidden border border-slate-800">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.391735118744!2d85.31633887546813!3d27.705417076184245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18e2c9a7ab33%3A0x26f1a4c90353a44!2sPadma%20Kanya%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1720272097723!5m2!1sen!2snp" 
                                width="100%" 
                                height="300" 
                                style={{border: 0}} 
                                allowFullScreen={false} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className='grayscale-[80%] invert-[90%] contrast-125'
                            ></iframe>
                        </div>
                        <div className="space-y-6">
                            <InfoCard icon={MapPin} title="Address" text="Padma Kanya Multiple Campus, Bagbazar, KTM" />
                            <InfoCard icon={Phone} title="Phone" text="+977-1-4242424" href="tel:+97714242424"/>
                            <InfoCard icon={Mail} title="Email" text="info@sarc.edu.np" href="mailto:info@sarc.edu.np"/>
                            <InfoCard icon={Clock} title="Working Hours" text="Sun - Fri: 9:00 AM - 5:00 PM"/>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

const InfoCard = ({ icon: Icon, title, text, href }: { icon: React.ElementType, title: string, text: string, href?: string }) => (
    <div className="flex items-start gap-4">
        <div className="bg-emerald-900/50 p-3 rounded-full border border-emerald-700/50">
            <Icon className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
            <h4 className="font-semibold text-lg text-slate-100">{title}</h4>
            {href ? (
                 <a href={href} className="text-slate-400 hover:text-emerald-400 transition-colors">{text}</a>
            ) : (
                <p className="text-slate-400">{text}</p>
            )}
        </div>
    </div>
)
