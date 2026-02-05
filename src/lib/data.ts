import { GraduationCap, Briefcase, Users, HeartHandshake } from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/academics', label: 'Programs' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/staff', label: 'Faculty' },
  { href: '/news-gallery', label: 'News & Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const heroCarouselItems = [
  {
    id: 'hero-1',
    title: 'Pioneering Futures, Honoring Traditions',
    subtitle: 'At SARC, we are dedicated to fostering an environment of academic excellence, innovation, and character development for the leaders of tomorrow.',
    image: 'hero-1'
  },
  {
    id: 'hero-2',
    title: 'A Legacy of Educational Excellence',
    subtitle: 'Discover a transformative learning experience that challenges the mind and inspires the spirit.',
    image: 'hero-2'
  },
  {
    id: 'hero-3',
    title: 'Shape Your Future With Us',
    subtitle: 'Join a vibrant community of scholars, innovators, and successful alumni who are making a difference in the world.',
    image: 'hero-3'
  }
];

export const whySarcItems = [
    {
        icon: GraduationCap,
        title: "Academic Excellence",
        description: "Pursue knowledge with our world-class curriculum and distinguished, dedicated faculty."
    },
    {
        icon: Users,
        title: "Vibrant Community",
        description: "Engage in a diverse and inclusive community with a rich tradition of social initiatives."
    },
    {
        icon: Briefcase,
        title: "Career Development",
        description: "Unlock your potential with access to internships, career counseling, and global networking events."
    },
    {
        icon: HeartHandshake,
        title: "Alumni Mentorship",
        description: "Connect with a global network of experienced professionals and alumni for guidance and support."
    }
];

export const stats = [
    { number: '12+', label: 'Academic Programs' },
    { number: '500+', label: 'Current Students' },
    { number: '40+', label: 'Expert Faculty' },
    { number: '10k+', label: 'Global Alumni' },
];

export const curriculumDetails = [
  {
    id: 'bca',
    title: 'BCA',
    summary: 'Bachelor of Computer Applications',
    description: 'A comprehensive program focusing on computer science, software development, and information technology. Prepares students for a career in the fast-growing IT industry.'
  },
  {
    id: 'bim',
    title: 'BIM',
    summary: 'Bachelor of Information Management',
    description: 'An integrated program of IT and Management. It is designed to equip students with the skills and attributes required to be effective and efficient IT professionals.'
  },
  {
    id: 'bbs',
    title: 'BBS',
    summary: 'Bachelor of Business Studies',
    description: 'Provides a strong foundation in business management, economics, and finance, preparing students for roles in business and administration.'
  },
   {
    id: 'ba',
    title: 'BA',
    summary: 'Bachelor of Arts',
    description: 'Offers a broad education in humanities and social sciences, developing critical thinking, communication, and analytical skills.'
  },
   {
    id: 'bsw',
    title: 'BSW',
    summary: 'Bachelor of Social Work',
    description: 'Prepares students for a career in social work, focusing on social justice, community development, and helping individuals and families.'
  },
  {
    id: 'ma',
    title: 'MA',
    summary: 'Master of Arts',
    description: 'An advanced postgraduate degree in various fields of humanities and social sciences, fostering in-depth knowledge and research skills.'
  }
];

export const newsItems = [
    {
        id: '1',
        title: 'Annual Tech Fest "Innovate 2024" Concludes with Record Participation',
        date: '2024-05-20',
        summary: 'Our annual tech festival saw groundbreaking projects from students across various departments, from AI-driven apps to sustainable tech solutions, drawing attention from industry leaders.',
        image: 'news-1',
        category: 'Campus Event'
    },
    {
        id: '2',
        title: 'SARC Organizes Successful Blood Donation Drive, Saving Lives',
        date: '2024-04-15',
        summary: 'In a powerful display of community spirit, our student-led blood donation drive in collaboration with the Red Cross collected over 200 pints, making a significant impact.',
        image: 'news-2',
        category: 'Community'
    },
    {
        id: '3',
        title: 'Alumni Speaker Series Featuring Silicon Valley Innovators Inspires Students',
        date: '2024-03-10',
        summary: 'Top alumni from leading tech companies returned to campus to share their career journeys, offering invaluable insights and mentorship to the next generation of leaders.',
        image: 'news-3',
        category: 'Alumni'
    }
];

export const galleryItems = [
    { id: '1', image: 'gallery-1', description: 'Students collaborating in the library' },
    { id: '2', image: 'gallery-2', description: 'A lively campus event' },
    { id: '3', image: 'gallery-3', description: 'Annual sports meet' },
    { id: '4', image: 'gallery-4', description: 'Cultural program performance' },
    { id: '5', image: 'gallery-5', description: 'Debate competition finals' },
    { id: '6', image: 'gallery-6', description: 'Graduation day celebration' },
    { id: '7', image: 'gallery-7', description: 'Hands-on learning in the computer lab' },
    { id: '8', image: 'gallery-8', description: 'Creative expressions in an art workshop' },
];

export const staffProfiles = [
  {
    id: 'dr-evelyn-reed',
    name: 'Dr. Evelyn Reed',
    designation: 'Principal',
    credentials: 'PhD in Educational Leadership',
    philosophy: 'My mission is to cultivate a community where intellectual rigor and compassionate leadership converge, empowering every student to become a resilient, purpose-driven architect of their own future and a better world.',
    image: 'principal'
  },
  {
    id: 'dr-marcus-thorne',
    name: 'Dr. Marcus Thorne',
    designation: 'Head of Sciences',
    credentials: 'PhD in Molecular Biology',
    philosophy: 'I strive to ignite a relentless curiosity in our students, encouraging them to challenge assumptions and build a future defined by discovery. We don\'t just learn science; we live it.',
    image: 'head-of-sciences'
  },
  {
    id: 'ms-isabella-chen',
    name: 'Ms. Isabella Chen',
    designation: 'Arts Coordinator',
    credentials: 'Masters in Fine Arts',
    philosophy: 'Art is the universal language of human experience. My purpose is to provide a sanctuary for creativity where students can find their voice, embrace imperfection, and express their unique vision.',
    image: 'arts-coordinator'
  },
  {
    id: 'mr-david-lee',
    name: 'Mr. David Lee',
    designation: 'Athletic Director',
    credentials: 'Masters in Sports Management',
    philosophy: 'The field and court are our finest classrooms for learning resilience, discipline, and the power of a unified team. I am dedicated to building programs that forge not only elite athletes, but exceptional individuals.',
    image: 'athletic-director'
  },
];
