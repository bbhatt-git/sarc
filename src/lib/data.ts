import { BookOpen, FlaskConical, Landmark, Mic, Palette, Users } from 'lucide-react';
import type { StaticImageData } from 'next/image';

export const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/academics', label: 'Academics' },
  { href: '/staff', label: 'Staff & Faculty' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/news-gallery', label: 'News & Gallery' },
];

export const staffProfiles = [
  {
    id: 'dr-evelyn-reed',
    name: 'Dr. Evelyn Reed',
    designation: 'Principal',
    credentials: 'PhD in Educational Leadership',
    philosophy: 'I believe education is the art of shaping not just the mind, but the character. My mission is to cultivate a community where intellectual rigor and compassionate leadership converge, empowering every student to become a resilient, purpose-driven architect of their own future and a better world.',
    image: 'principal'
  },
  {
    id: 'dr-marcus-thorne',
    name: 'Dr. Marcus Thorne',
    designation: 'Head of Sciences',
    credentials: 'PhD in Molecular Biology',
    philosophy: 'The laboratory is a place of endless questions, not just answers. I strive to ignite a relentless curiosity in our students, encouraging them to challenge assumptions and build a future defined by discovery. We don\'t just learn science; we live it.',
    image: 'head-of-sciences'
  },
  {
    id: 'ms-isabella-chen',
    name: 'Ms. Isabella Chen',
    designation: 'Arts Coordinator',
    credentials: 'Masters in Fine Arts',
    philosophy: 'Art is the universal language of human experience. It teaches empathy, provokes thought, and builds bridges where words fail. My purpose is to provide a sanctuary for creativity where students can find their voice, embrace imperfection, and express their unique vision.',
    image: 'arts-coordinator'
  },
  {
    id: 'mr-david-lee',
    name: 'Mr. David Lee',
    designation: 'Athletic Director',
    credentials: 'Masters in Sports Management',
    philosophy: 'The field, the court, the track—these are our finest classrooms for learning resilience, discipline, and the power of a unified team. I am dedicated to building programs that forge not only elite athletes, but exceptional individuals who lead with integrity and heart.',
    image: 'athletic-director'
  },
  {
    id: 'dr-samuel-jones',
    name: 'Dr. Samuel Jones',
    designation: 'Senior Faculty, Humanities',
    credentials: 'PhD in History',
    philosophy: 'To understand today, we must converse with yesterday. I guide my students through the grand dialogues of history and philosophy, developing them into critical thinkers who can analyze complex narratives and contribute thoughtfully to our global society.',
    image: 'faculty-1'
  },
  {
    id: 'ms-anita-sharma',
    name: 'Ms. Anita Sharma',
    designation: 'Senior Faculty, Mathematics',
    credentials: 'Masters in Applied Mathematics',
    philosophy: 'Mathematics is not merely a subject; it is a way of thinking. It reveals the elegant logic that underpins our universe. I endeavor to make this language accessible to all, fostering problem-solvers who see patterns and build solutions where others see chaos.',
    image: 'faculty-2'
  },
  {
    id: 'dr-chloe-williams',
    name: 'Dr. Chloe Williams',
    designation: 'Senior Faculty, Literature',
    credentials: 'PhD in Comparative Literature',
    philosophy: 'Through literature, we live a thousand lives and learn the profound depths of empathy. My classroom is a journey into diverse worlds and ideas, where students learn to articulate their own stories while honoring the stories of others. We read to understand what it means to be human.',
    image: 'faculty-3'
  },
  {
    id: 'mr-benjamin-carter',
    name: 'Mr. Benjamin Carter',
    designation: 'Senior Faculty, Computer Science',
    credentials: 'Masters in Computer Science',
    philosophy: 'Code is the architecture of the modern world. My philosophy extends beyond teaching syntax; it\'s about cultivating a mindset of ethical innovation. I empower students to become not just consumers of technology, but conscientious creators who will build a better digital future.',
    image: 'faculty-4'
  },
];

export const departmentDetails = [
  {
    id: 'science',
    name: 'Science Department',
    icon: FlaskConical,
    description: 'A hub of innovation and discovery, our Science Department features state-of-the-art labs for hands-on research in robotics, environmental science, and beyond.'
  },
  {
    id: 'humanities',
    name: 'Humanities Department',
    icon: Landmark,
    description: 'Explore the rich tapestry of human culture, history, and philosophy, developing a nuanced, global perspective through critical analysis and vigorous debate.'
  },
  {
    id: 'performing-arts',
    name: 'Performing Arts Department',
    icon: Palette,
    description: 'From theater to music and visual arts, our programs build confidence and collaboration, guided by faculty who are accomplished artists themselves.'
  },
];

export const curriculumDetails = [
  {
    id: 'primary',
    title: 'Primary School',
    summary: 'A foundation of curiosity through project-based learning.',
    description: 'Grades 1-5 build a strong base in literacy, numeracy, and scientific inquiry in a nurturing, hands-on environment that sparks a lifelong love for discovery.'
  },
  {
    id: 'secondary',
    title: 'Secondary School',
    summary: 'Developing critical thought and analytical reasoning.',
    description: 'Grades 6-10 delve deeper into core subjects while exploring a wide range of electives. The curriculum hones analytical and communication skills, preparing students for leadership.'
  },
  {
    id: 'college',
    title: 'College Level',
    summary: 'Specialized, pre-university studies and research.',
    description: 'Grades 11-12 offer a pre-university experience with Advanced Placement courses, in-depth research, and seminar-style discussions to prepare graduates for top universities.'
  }
];

export const newsItems = [
    {
        id: '1',
        title: 'SARC Innovator Wins National Science Prize',
        date: '2023-10-26',
        summary: 'Eleventh-grader Anya Sharma earned the top prize at the National Science Fair for her groundbreaking work on microbial biodegradable plastics.',
        image: 'news-1',
    },
    {
        id: '2',
        title: 'Annual Arts Festival Ignites Campus Creativity',
        date: '2023-10-20',
        summary: 'The campus was alive with creativity during our annual festival, featuring a stunning gallery exhibition, a sold-out theater production, and a powerful orchestra performance.',
        image: 'news-2',
    },
    {
        id: '3',
        title: 'Debate Team Claims Regional Championship Title',
        date: '2023-10-15',
        summary: 'Our varsity debate team triumphed at the regional finals, showcasing formidable research and argumentation. They now advance to the national competition.',
        image: 'gallery-5',
    }
];

export const galleryItems = [
    { id: '1', image: 'gallery-1', description: 'Students collaborating on a robotics project' },
    { id: '2', image: 'gallery-2', description: 'The cast of the winter musical takes a bow' },
    { id: '3', image: 'gallery-3', description: 'An impactful piece from the student art exhibition' },
    { id: '4', image: 'gallery-4', description: 'The moment our team won the championship' },
    { id: '5', image: 'gallery-5', description: 'A powerful closing argument in a debate' },
    { id: '6', image: 'gallery-6', description: 'Graduation day: a new beginning' },
];
