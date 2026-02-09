'use client';
import SectionTitle from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { Bell, FileText, Calendar } from 'lucide-react';

const notices = [
    { title: 'Admission Open for +2 Programs 2081', date: '2081-04-15', icon: Bell, summary: 'Admissions are now open for +2 Science, Management, and Law streams for the academic year 2081. Apply online or visit the college administration.' },
    { title: 'Mid-Term Examination Routine', date: '2081-04-10', icon: FileText, summary: 'The routine for the mid-term examinations for all faculties has been published. Please check the college notice board or download from the website.' },
    { title: 'Guest Lecture on AI and Future Careers', date: '2081-04-05', icon: Calendar, summary: 'A special guest lecture on "Artificial Intelligence and Its Impact on Future Careers" will be held on 20th Baishakh, 2081. All students are encouraged to attend.' },
    { title: 'Inter-College Futsal Tournament', date: '2081-04-01', icon: Bell, summary: 'Registrations are now open for the annual Inter-College Futsal Tournament. Interested students can form a team and register at the ECA department.' },
];

export default function GeneralNoticeView() {
    return (
        <div className="pt-24 pb-20">
            <SectionTitle title="General Notices" subtitle="Stay Informed" />
            <div className="container mx-auto px-4 mt-16 max-w-4xl">
                <div className="space-y-8">
                    {notices.map((notice, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="testimonial-card border-l-4 border-emerald-500"
                        >
                            <div className="flex items-start gap-4">
                                <notice.icon className="w-6 h-6 text-emerald-600 mt-1" />
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-foreground">{notice.title}</h3>
                                        <span className="text-sm text-muted-foreground bg-slate-100 px-2 py-1 rounded">{notice.date}</span>
                                    </div>
                                    <p className="text-muted-foreground mt-2">{notice.summary}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
