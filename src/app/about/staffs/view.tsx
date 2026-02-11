'use client';
import { STAFF_MEMBERS } from '@/lib/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageHeader from '@/app/components/page-header';
import SectionTitle from '@/app/components/section-title';
import { Facebook, Linkedin, Award, Users, Bot, Briefcase, HeartHandshake, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// New WhatsApp icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.75 13.96c.25.25.25.66 0 .91l-1.54 1.54c-.12.12-.28.19-.45.19s-.33-.07-.45-.19c-.32-.32-1.07-.94-2.22-2.09s-1.77-1.9-2.09-2.22c-.25-.25-.25-.66 0-.91l1.54-1.54c.25-.25.66-.25.91 0l.54.54c.25.25.25.66 0 .91l-.63.63c-.09.09-.13.21-.13.34s.04.25.13.34c.18.18.52.52.92.92.4.4.74.74.92.92.09.09.21.13.34.13s.25-.04.34-.13l.63-.63c.25-.25.66-.25.91 0l.54.54zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
);


const departments = [
    { name: 'Academic Faculty', stat: '25+', icon: Users },
    { name: 'Innovation Labs Team', stat: '8+', icon: Bot },
    { name: 'Administration', stat: '12+', icon: Briefcase },
    { name: 'Student Welfare', stat: '6+', icon: HeartHandshake },
];

const teamQualities = [
    'Highly qualified with advanced degrees',
    'Passionate about student success',
    'Trained in modern teaching methodologies',
    'Experienced in project-based learning',
    'Committed to continuous professional development',
    'Approachable and supportive mentors',
];

const staffAchievements = [
    { title: "Excellence in Teaching", date: "2023", description: "Multiple national teaching awards and recognition" },
    { title: "Research Publications", date: "2022-2024", description: "Faculty papers published in international journals" },
    { title: "Student Success Rate", date: "Ongoing", description: "95%+ students achieving distinction in board exams" },
    { title: "Innovation Projects", date: "2023-2024", description: "50+ successful student projects guided by our team" },
]

type StaffMember = typeof STAFF_MEMBERS[0];

const StaffCard = ({ staff }: { staff: StaffMember }) => {
    return (
        <Card className="testimonial-card overflow-hidden text-center group h-full flex flex-col">
            <div className="relative bg-muted/30 pt-16 pb-8">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-8 h-24 w-24 rounded-full bg-gradient-to-tr from-primary/20 to-sky-400/20 transition-transform duration-500 group-hover:scale-[3.5] group-hover:opacity-50"></div>
                <div className="relative mx-auto h-24 w-24 rounded-full ring-4 ring-background">
                    <Image
                        src={staff.image}
                        alt={`Portrait of ${staff.name}`}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
            </div>
            <CardContent className="flex flex-grow flex-col p-6 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-foreground">{staff.name}</h3>
                    <p className="font-medium text-primary">{staff.role}</p>
                </div>
                <p className="flex-grow text-sm text-muted-foreground italic">"{staff.philosophy}"</p>
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50">
                    <Link href={staff.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-blue-600">
                        <Facebook size={20} />
                    </Link>
                     <Link href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-green-500">
                        <WhatsAppIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-sky-700">
                        <Linkedin size={20} />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StaffsView() {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: 'easeOut' },
        viewport: { once: true, amount: 0.2 }
    };

    const leadership = STAFF_MEMBERS.filter(s => ['Founder / CEO', 'Managing Director', 'Program Coordinator', 'Academic Coordinator'].includes(s.role));
    const faculty = STAFF_MEMBERS.filter(s => ['Head of Science Department', 'Faculty'].includes(s.role));
    const support = STAFF_MEMBERS.filter(s => ['Accountant', 'Receptionist', 'Support Staff'].includes(s.role));

    return (
        <div>
            <PageHeader title="Our Dedicated Staff" subtitle="Meet Our Team" imageUrl="/images/hero/3.jpg" />
            <div className="container mx-auto px-4 py-20 space-y-24">
                
                {/* Intro Section */}
                <motion.section {...fadeIn} className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                       A passionate team of educators, innovators, and mentors committed to shaping the next generation of leaders
                    </h2>
                    <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                        At SARC Education Foundation, our greatest asset is our exceptional team of educators and staff members. Each individual brings unique expertise, passion, and dedication to creating an environment where students can thrive. Our faculty members aren't just teachers—they're mentors, guides, and role models who inspire students to reach beyond their perceived limits. With advanced degrees from prestigious institutions and real-world experience, they bridge the gap between theory and practice.
                    </p>
                </motion.section>

                {/* Departments Section */}
                 <motion.section {...fadeIn}>
                    <SectionTitle title="Our Departments" subtitle="Specialized teams working together for student excellence" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {departments.map((dept, index) => (
                            <Card key={index} className="testimonial-card text-center p-8 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <dept.icon className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                                    <p className="text-4xl font-bold text-foreground">{dept.stat}</p>
                                    <p className="text-muted-foreground mt-2">{dept.name}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Team Qualities Section */}
                <motion.section {...fadeIn} className="max-w-4xl mx-auto">
                    <SectionTitle title="What Sets Our Team Apart" subtitle="Excellence in education through qualified and passionate professionals" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                        {teamQualities.map((quality, index) => (
                            <div key={index} className="flex items-start gap-4 rounded-lg bg-card/60 p-4 border border-transparent hover:border-primary/20 transition-colors">
                                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                <p className="text-foreground">{quality}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Administrative Leadership Section */}
                <motion.section {...fadeIn}>
                    <SectionTitle title="Administrative Leadership" subtitle="Experienced leaders guiding SARC's vision and operations" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {leadership.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                    </div>
                </motion.section>

                {/* Teaching Faculty Section */}
                <motion.section {...fadeIn}>
                    <SectionTitle title="Teaching Faculty" subtitle="Dedicated educators shaping young minds" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {faculty.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                    </div>
                </motion.section>
                
                {/* Support Team Section */}
                <motion.section {...fadeIn}>
                    <SectionTitle title="Support Team" subtitle="Essential staff ensuring smooth operations and student welfare" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {support.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                    </div>
                </motion.section>
                
                 {/* Staff Achievements Section */}
                <motion.section {...fadeIn}>
                    <SectionTitle title="Staff Achievements" subtitle="Our Commitment to Excellence" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {staffAchievements.map((ach, index) => (
                             <Card key={index} className="testimonial-card p-6 text-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <Award className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                                    <p className="font-semibold text-amber-500 text-sm">{ach.date}</p>
                                    <h3 className="font-bold text-foreground mt-1">{ach.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-2">{ach.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                 {/* Join Our Team CTA */}
                <motion.section {...fadeIn}>
                    <Card className="testimonial-card bg-gradient-to-r from-emerald-600 to-sky-600 p-8 text-center text-primary-foreground">
                        <h2 className="text-3xl font-bold">Join Our Team</h2>
                        <p className="mt-2 max-w-2xl mx-auto opacity-90">
                            Are you passionate about education and innovation? We're always looking for talented individuals to join our mission.
                        </p>
                        <Button asChild className="mt-6 rounded-full bg-white text-emerald-700 hover:bg-white/90">
                            <Link href="/contact">Career Opportunities</Link>
                        </Button>
                    </Card>
                </motion.section>

            </div>
        </div>
    );
}
