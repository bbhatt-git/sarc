'use client';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Rocket, Users, Building, Briefcase } from 'lucide-react';

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
        image: 'https://picsum.photos/seed/bikash/200/200',
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
        image: 'https://picsum.photos/seed/rajesh/200/200',
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
        image: 'https://picsum.photos/seed/priya/200/200',
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
        image: 'https://picsum.photos/seed/amit/200/200',
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
        image: 'https://picsum.photos/seed/harish/200/200',
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
        image: 'https://picsum.photos/seed/bikram/200/200',
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
        image: 'https://picsum.photos/seed/chandra/200/200',
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
        image: 'https://picsum.photos/seed/deepa/200/200',
    }
];

export default function AchievementsView() {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: 'easeOut' },
        viewport: { once: true, amount: 0.2 }
    };
    
  return (
    <div>
      <PageHeader 
        title="Our Achievements" 
        subtitle="Celebrating excellence, innovation, and the remarkable success of our students and alumni" 
        imageUrl="/images/hero/2.jpg" 
      />

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                className="testimonial-card p-8"
              >
                <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">{stat.number}</p>
                <p className="text-muted-foreground mt-3 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto">
          <SectionTitle title="Awards & Recognition" subtitle="Our Accolades" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Our commitment to excellence has been recognized at national and international levels.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                className="testimonial-card p-6 text-center h-full"
              >
                <div className="inline-block bg-sky-100 dark:bg-sky-900/50 p-4 rounded-full mb-4">
                  <award.icon className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                </div>
                <p className="font-bold text-sky-500">{award.year}</p>
                <h3 className="text-lg font-bold text-foreground mt-2">{award.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{award.description}</p>
                <p className="text-xs font-semibold text-primary mt-4 uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-full inline-block">{award.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Alumni Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <SectionTitle title="Our Alumni" subtitle="Making a Difference" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Meet our successful alumni who are making a difference in the world.</p>
          <div className="grid md:grid-cols-2 gap-8 mt-16 items-stretch">
            {alumni.map((person, index) => (
              <motion.div
                key={person.name}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.15 }}
              >
                <Card className="testimonial-card h-full flex flex-col">
                  <CardHeader className="flex-row items-center gap-4 p-6">
                    <Image src={person.image} alt={person.name} width={80} height={80} className="rounded-full" data-ai-hint="person" />
                    <div>
                      <CardTitle className="text-xl">{person.name}</CardTitle>
                      <CardDescription>{person.role}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4 mb-6">
                      "{person.quote}"
                    </blockquote>
                    <div className="space-y-1 text-sm mt-auto">
                        <p><span className="font-semibold text-foreground">Education:</span> {person.education}</p>
                        <p><span className="font-semibold text-foreground">University:</span> {person.university}</p>
                        <p><span className="font-semibold text-foreground">Graduated:</span> {person.graduated}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-foreground mb-2">Key Achievements:</h4>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {person.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeIn} className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">View All Alumni Stories</Button>
          </motion.div>
        </div>
      </section>

      {/* Top Students Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto">
          <SectionTitle title="Top Students" subtitle="Future Leaders" />
          <p className="text-center max-w-2xl mx-auto mt-4 text-muted-foreground">Celebrating our current students who are excelling in academics and beyond.</p>
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {topStudents.map((student, index) => (
              <motion.div
                key={student.name}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.15 }}
                className="testimonial-card"
              >
                <CardHeader className="flex-row items-center gap-4">
                  <Image src={student.image} alt={student.name} width={80} height={80} className="rounded-full" data-ai-hint="student" />
                  <div>
                    <CardTitle className="text-xl">{student.name}</CardTitle>
                    <CardDescription>{student.class}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4 mb-6">
                    "{student.quote}"
                  </blockquote>
                  <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg text-sm mb-4">
                    <span><span className="font-semibold text-foreground">GPA:</span> {student.gpa.toFixed(2)}</span>
                    <span><span className="font-semibold text-foreground">Focus:</span> {student.subjects}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Achievements:</h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {student.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeIn} className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">Meet More Students</Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto">
          <motion.div {...fadeIn} className="bg-emerald-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold">Join Our Success Story</h2>
            <p className="mt-4 max-w-xl mx-auto">Be part of the next generation of innovators, leaders, and changemakers.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white/10">
                <Link href="/about/us">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
