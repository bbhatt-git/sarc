'use client';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Rocket, Users, Building, Briefcase, Star, Trophy, Target, Sparkles, GraduationCap, Calendar, Linkedin, Facebook, MessageSquare } from 'lucide-react';
import { imageData } from '@/lib/image-data';

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

const alumni = [
    {
        name: 'Mr Bikash Pandeya',
        role: 'CEO, NoteSwift',
        quote: "SARC gave me the foundation to think beyond textbooks and solve real-world problems.",
        education: 'Bachelors in Computer Science',
        university: 'Far-Western University',
        graduated: 2024,
        achievements: [
            'Nation Representative at Techfest, IIT Bombay',
            'Founder and CEO at Note Swift',
        ],
        image: 'https://picsum.photos/seed/bikash/400/400',
    },
    {
        name: 'Rajesh Sharma',
        role: 'Founder & CEO, TechNepal',
        quote: "The innovation lab at SARC taught me that failure is just a stepping stone to success.",
        education: 'B.E. in Computer Engineering',
        university: 'IIT Delhi',
        graduated: 2019,
        achievements: [
            'Founded 3 successful startups',
            'Employed 50+ people',
        ],
        image: 'https://picsum.photos/seed/rajesh/400/400',
    },
    {
        name: 'Priya Thapa',
        role: 'Biomedical Engineer at Johns Hopkins',
        quote: "SARC's hands-on approach made me realize my passion for helping others through technology.",
        education: 'M.S. in Biomedical Engineering',
        university: 'Johns Hopkins University',
        graduated: 2020,
        achievements: [
            'Developed life-saving medical device',
            'International recognition',
        ],
        image: 'https://picsum.photos/seed/priya/400/400',
    },
    {
        name: 'Amit Gurung',
        role: 'Data Scientist at Microsoft',
        quote: "The project-based learning at SARC prepared me for the real challenges in tech industry.",
        education: 'M.S. in Data Science',
        university: 'MIT',
        graduated: 2021,
        achievements: [
            'Developed AI models for healthcare',
            'Open source contributor',
        ],
        image: 'https://picsum.photos/seed/amit/400/400',
    },
];

const topStudents = [
    {
        name: 'Harish Pathak',
        class: '12 Science',
        quote: "SARC's innovative teaching methods made learning fun and meaningful.",
        gpa: 3.95,
        subjects: 'Physics, Robotics, Environmental Science',
        achievements: [
            'Social Media Manager at SAKDU - SAK Digital University',
            'Robotics Club President',
        ],
        image: 'https://picsum.photos/seed/harish/400/400',
    },
    {
        name: 'Bikram Thapa',
        class: '12 Management',
        quote: "The practical business simulations at SARC gave me real-world experience.",
        gpa: 3.92,
        subjects: 'Entrepreneurship, Economics, Leadership',
        achievements: [
            'Business Plan Competition Winner',
            'Debate Team Captain',
        ],
        image: 'https://picsum.photos/seed/bikram/400/400',
    },
    {
        name: 'Chandra Gurung',
        class: '10',
        quote: "SARC's holistic approach helped me excel in both academics and extracurriculars.",
        gpa: 3.98,
        subjects: 'Mathematics, Sports, Music',
        achievements: [
            'Mathematics Olympiad Winner',
            'Science Fair Champion',
        ],
        image: 'https://picsum.photos/seed/chandra/400/400',
    },
    {
        name: 'Deepa Shrestha',
        class: '11 Science',
        quote: "SARC taught me that education is not just about grades, but about making a difference.",
        gpa: 3.89,
        subjects: 'Chemistry, Environmental Science, Community Service',
        achievements: [
            'Chemistry Lab Assistant',
            'Environmental Club Leader',
        ],
        image: 'https://picsum.photos/seed/deepa/400/400',
    }
];

export default function AchievementsView() {
    
  return (
    <div>
      <PageHeader 
        title="Our Achievements" 
        subtitle="Celebrating excellence, innovation, and the remarkable success of our students and alumni" 
        imageUrl={imageData.hero[2].src} 
      />

      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="testimonial-card p-8"
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
          <SectionTitle title="Awards & Recognition" subtitle="Our Accolades" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Our commitment to excellence has been recognized at national and international levels.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {awards.map((award, index) => (
              <div
                key={award.title}
                className="testimonial-card p-6 text-center h-full"
              >
                <div className="inline-block bg-sky-100 dark:bg-sky-900/50 p-4 rounded-full mb-4">
                  <award.icon className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                </div>
                <p className="font-bold text-sky-500">{award.year}</p>
                <h3 className="text-lg font-bold text-foreground mt-2">{award.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{award.description}</p>
                <p className="text-xs font-semibold text-primary mt-4 uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-full inline-block">{award.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto">
          <SectionTitle title="Our Alumni" subtitle="Making a Difference" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Meet our successful alumni who are making a difference in the world.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {alumni.map((person, index) => (
              <div
                key={person.name}
                className="testimonial-card overflow-hidden p-0 h-full flex flex-col"
              >
                <div className="relative h-48">
                    <Image src={person.image} alt={person.name} fill className="object-cover" data-ai-hint="person" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                        <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold text-white text-shadow-md">{person.name}</h3>
                        <p className="text-sm text-white/90">{person.role}</p>
                    </div>
                </div>
                <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <blockquote className="text-muted-foreground italic text-center text-sm">
                        "{person.quote}"
                    </blockquote>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-md">
                            <GraduationCap className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                            <div>
                                <span className="font-semibold text-foreground">Education:</span> {person.education}
                            </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-md">
                            <Building className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                            <div>
                                <span className="font-semibold text-foreground">University:</span> {person.university}
                            </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-md">
                            <Calendar className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                            <div>
                                <span className="font-semibold text-foreground">Graduated:</span> {person.graduated}
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4">
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Achievements:</h4>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {person.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                <span>{ach}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="flex justify-center gap-2 pt-3 border-t border-border/50 mt-4">
                        <Link href="#" className="inline-block text-muted-foreground hover:text-white hover:bg-blue-700 transition-colors bg-slate-200 dark:bg-slate-700 p-2 rounded-full"><Linkedin size={16} /></Link>
                        <Link href="#" className="inline-block text-muted-foreground hover:text-white hover:bg-blue-500 transition-colors bg-slate-200 dark:bg-slate-700 p-2 rounded-full"><Facebook size={16} /></Link>
                        <Link href="#" className="inline-block text-muted-foreground hover:text-white hover:bg-primary-600 transition-colors bg-slate-200 dark:bg-slate-700 p-2 rounded-full"><MessageSquare size={16} /></Link>
                    </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">View All Alumni Stories</Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/20">
        <div className="container mx-auto">
          <SectionTitle title="Top Students" subtitle="Future Leaders" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Celebrating our current students who are excelling in academics and beyond.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {topStudents.map((student, index) => (
              <div
                key={student.name}
                className="testimonial-card overflow-hidden p-0"
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
                     <div className="flex justify-center gap-2 pt-3 border-t border-border/50">
                        <Link href="#" className="inline-block text-muted-foreground hover:text-white hover:bg-blue-700 transition-colors bg-slate-200 dark:bg-slate-700 p-2 rounded-full"><Linkedin size={16} /></Link>
                        <Link href="#" className="inline-block text-muted-foreground hover:text-white hover:bg-blue-500 transition-colors bg-slate-200 dark:bg-slate-700 p-2 rounded-full"><Facebook size={16} /></Link>
                        <Link href="#" className="inline-block text-muted-foreground hover:text-white hover:bg-primary-600 transition-colors bg-slate-200 dark:bg-slate-700 p-2 rounded-full"><MessageSquare size={16} /></Link>
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
              <Button asChild variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white/10">
                <Link href="/about/us">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
