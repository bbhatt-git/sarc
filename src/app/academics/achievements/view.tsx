'use client';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Rocket, Users, Building, Briefcase, Star, Trophy, Target, Sparkles, GraduationCap, Calendar, Linkedin, Facebook, MessageSquare, Instagram } from 'lucide-react';
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
        story: "Bikash's journey from a curious SARC student to a Techfest representative at IIT Bombay and now the founder of NoteSwift showcases the entrepreneurial spirit we nurture. His work in digital education tools is making learning more accessible for students everywhere.",
        quote: "SARC gave me the foundation to think beyond textbooks and solve real-world problems.",
        education: 'Bachelors in Computer Science',
        university: 'Far-Western University',
        graduated: 2024,
        achievements: [
            'Nation Representative at Techfest, IIT Bombay',
            'Founder and CEO at Note Swift',
        ],
        image: '/images/alumni/bikash_pandeya.jpg',
        socials: {
            linkedin: 'https://www.linkedin.com/in/bikash-pandeya-bb53b4246/',
            facebook: 'https://www.facebook.com/bikash.pandeya.69',
            instagram: 'https://www.instagram.com/its_bikash_pandeya'
        }
    },
    {
        name: 'Rajesh Sharma',
        role: 'Founder & CEO, TechNepal',
        story: "Rajesh credits SARC's innovation labs for sparking his passion for entrepreneurship. Today, his company TechNepal is a leading force in the local tech scene, creating jobs and driving innovation.",
        quote: "The innovation lab at SARC taught me that failure is just a stepping stone to success.",
        education: 'B.E. in Computer Engineering',
        university: 'IIT Delhi',
        graduated: 2019,
        achievements: [
            'Founded 3 successful startups',
            'Employed 50+ people',
        ],
        image: 'https://picsum.photos/seed/rajesh/400/400',
         socials: {
            linkedin: '#',
            facebook: '#',
        }
    },
    {
        name: 'Priya Thapa',
        role: 'Biomedical Engineer, Johns Hopkins',
        story: "Priya's passion for blending technology and healthcare was ignited at SARC. Her groundbreaking work on a life-saving medical device has earned her international recognition and is a testament to the hands-on learning approach at SARC.",
        quote: "SARC's hands-on approach made me realize my passion for helping others through technology.",
        education: 'M.S. in Biomedical Engineering',
        university: 'Johns Hopkins University',
        graduated: 2020,
        achievements: [
            'Developed life-saving medical device',
            'International recognition',
        ],
        image: 'https://picsum.photos/seed/priya/400/400',
         socials: {
            linkedin: '#',
            facebook: '#',
        }
    },
    {
        name: 'Amit Gurung',
        role: 'Data Scientist, Microsoft',
        story: "Amit's experience with project-based learning at SARC gave him a competitive edge. At Microsoft, he now develops advanced AI models for healthcare, continuing to solve real-world problems with the skills he first honed on our campus.",
        quote: "The project-based learning at SARC prepared me for the real challenges in tech industry.",
        education: 'M.S. in Data Science',
        university: 'MIT',
        graduated: 2021,
        achievements: [
            'Developed AI models for healthcare',
            'Open source contributor',
        ],
        image: 'https://picsum.photos/seed/amit/400/400',
         socials: {
            linkedin: '#',
            facebook: '#',
        }
    },
    {
        name: 'Sunita Rai',
        role: 'Lead Architect, Urban Designs',
        story: "Sunita's creative vision was nurtured at SARC. She now leads major urban design projects that focus on sustainability and community living, proving that a strong foundation in science can lead to a beautiful and functional world.",
        quote: "SARC's creative environment allowed me to merge art with science seamlessly.",
        education: 'B.Arch',
        university: 'Pulchowk Campus',
        graduated: 2018,
        achievements: [
            'National Award for Sustainable Architecture',
            'Designed two public parks',
        ],
        image: 'https://picsum.photos/seed/sunita/400/400',
        socials: {
            linkedin: '#',
            facebook: '#',
        }
    },
    {
        name: 'Kiran Thapa',
        role: 'Law Associate, Pradhan & Associates',
        story: "The Law faculty at SARC was the perfect launchpad for Kiran. His sharp analytical skills, honed in our debate clubs and moot courts, now serve him well as he navigates complex legal cases at one of the country's top law firms.",
        quote: "The moot court competitions were pivotal in building my confidence for a career in law.",
        education: 'B.A.LLB',
        university: 'Kathmandu School of Law',
        graduated: 2023,
        achievements: [
            'Won National Moot Court Competition',
            'Published paper on corporate law',
        ],
        image: 'https://picsum.photos/seed/kiran/400/400',
        socials: {
            linkedin: '#',
            facebook: '#',
        }
    }
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
            {alumni.map((person, index) => (
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
                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                        <div className="flex gap-3">
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
                        <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                            <Link href="#">Connect</Link>
                        </Button>
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
            {topStudents.map((student, index) => (
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
