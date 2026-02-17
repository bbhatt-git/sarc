'use client';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Rocket, Users, Building, Briefcase, Star, Trophy, Target, Sparkles, GraduationCap, Calendar, Linkedin, Facebook, MessageSquare, Instagram } from 'lucide-react';
import { imageData } from '@/lib/image-data';
import { ALUMNI_MEMBERS, TOP_STUDENTS } from '@/lib/constants';

const stats = [
    { number: '50+', label: 'Awards' },
    { number: '200+', label: 'Alumni' },
    { number: '95%', label: 'Success Rate' },
];

const awards = [
    {
        title: 'Provincial Innovation Award',
        year: '2024',
        description: 'Recognized for pioneering practical learning with robotics, AI labs, and tours.',
        category: 'Science & Technology',
        icon: Rocket,
    },
    {
        title: 'International Academic Participation',
        year: '2023',
        description: 'Students presented projects at international conferences and science exhibitions.',
        category: 'International Recognition',
        icon: Users,
    },
    {
        title: 'Best School (Innovation)',
        year: '2023',
        description: 'Honored for integrating technology and experiential learning in Sudurpaschim.',
        category: 'Institutional Excellence',
        icon: Building,
    },
    {
        title: 'Student Entrepreneurship',
        year: '2024',
        description: 'Teams won entrepreneurship challenges with sustainable, community-focused solutions.',
        category: 'Business Innovation',
        icon: Briefcase,
    }
];

export default function AchievementsView() {
    
  return (
    <div>
      <PageHeader 
        title="Alumni Network" 
        subtitle="Celebrating excellence, innovation, and the remarkable success of our students and alumni" 
      />

      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="testimonial-card p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <p className="text-5xl font-bold text-primary">{stat.number}</p>
                <p className="text-muted-foreground mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/20">
        <div className="container mx-auto">
          <SectionTitle title="Alumni Network Hub" subtitle="Making a Difference" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Meet our successful alumni who are making a difference in the world.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {ALUMNI_MEMBERS.map((person, index) => (
              <div
                key={person.name}
                className="testimonial-card overflow-hidden p-0 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative h-56">
                    <Image src={person.image} alt={person.name} fill className="object-cover" data-ai-hint="person" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                        <Star className="w-5 h-5 text-amber-300" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-5">
                        <h3 className="text-2xl font-bold text-white text-shadow-md">{person.name}</h3>
                        <p className="text-md font-semibold text-primary">{person.role}</p>
                    </div>
                </div>
                <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <blockquote className="text-muted-foreground italic text-sm">
                        "{person.quote}"
                    </blockquote>
                    <p className="text-foreground/90 text-sm">{person.story}</p>
                    
                    <div className="mt-auto pt-4 space-y-3">
                        <h4 className="font-semibold text-foreground text-sm">Key Achievements:</h4>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {person.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                <span>{ach}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50 mt-auto">
                       {person.socials.linkedin && (
                            <Link href={person.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-sky-700">
                                <Linkedin size={20} />
                            </Link>
                        )}
                        {person.socials.facebook && (
                            <Link href={person.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-blue-600">
                                <Facebook size={20} />
                            </Link>
                        )}
                         {person.socials.instagram && (
                            <Link href={person.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-pink-500">
                                <Instagram size={20} />
                            </Link>
                        )}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 w-full">
        <div className="container mx-auto">
          <div className="bg-primary text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold">Are You an SARC Alumnus?</h2>
            <p className="mt-4 max-w-xl mx-auto opacity-90">We'd love to hear your story and feature you in our network. Reconnect with us and inspire the next generation!</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/contact">Share Your Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/20">
        <div className="container mx-auto">
          <SectionTitle title="Top Students" subtitle="Future Leaders" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Celebrating our current students who are excelling in academics and beyond.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {TOP_STUDENTS.map((student, index) => (
              <div
                key={student.name}
                className="testimonial-card overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48">
                    <Image src={student.image} alt={student.name} fill className="object-cover" data-ai-hint="student" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                        <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold text-white text-shadow-md">{student.name}</h3>
                        <p className="text-sm text-white/90">{student.class}</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <blockquote className="text-muted-foreground italic text-center text-sm">
                        "{student.quote}"
                    </blockquote>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <p><span className="font-semibold text-foreground">GPA:</span> {student.gpa.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Achievements:</h4>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                            {student.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center gap-4 pt-4 border-t border-border/50">
                        {student.socials.linkedin && student.socials.linkedin !== '#' && (
                            <Link href={student.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-sky-700">
                                <Linkedin size={20} />
                            </Link>
                        )}
                        {student.socials.facebook && student.socials.facebook !== '#' && (
                            <Link href={student.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-blue-600">
                                <Facebook size={20} />
                            </Link>
                        )}
                        {student.socials.instagram && student.socials.instagram !== '#' && (
                            <Link href={student.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-pink-500">
                                <Instagram size={20} />
                            </Link>
                        )}
                    </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">Meet More Students</Button>
          </div>
        </div>
      </section>

      <section className="py-20 w-full">
        <div className="container mx-auto">
          <div className="bg-primary text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold">Join Our Success Story</h2>
            <p className="mt-4 max-w-xl mx-auto">Be part of the next generation of innovators, leaders, and changemakers.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button asChild size="lg" className="rounded-full bg-white text-emerald-600 hover:bg-white/90">
                <Link href="/about/us">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
