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
    philosophy: 'My focus is on creating a nurturing yet challenging environment where every student is empowered to discover their potential. We build leaders who are not just knowledgeable, but also compassionate and resilient. True education is about shaping character as much as it is about imparting knowledge.',
    image: 'principal'
  },
  {
    id: 'dr-marcus-thorne',
    name: 'Dr. Marcus Thorne',
    designation: 'Head of Sciences',
    credentials: 'PhD in Molecular Biology',
    philosophy: 'I believe in fostering a spirit of inquiry and a passion for discovery. My goal is to equip students with the critical thinking skills to navigate complex scientific challenges. We learn by doing, by questioning, and by pushing the boundaries of what we know.',
    image: 'head-of-sciences'
  },
  {
    id: 'ms-isabella-chen',
    name: 'Ms. Isabella Chen',
    designation: 'Arts Coordinator',
    credentials: 'Masters in Fine Arts',
    philosophy: 'Art is a fundamental form of human expression that teaches empathy, creativity, and perspective. I encourage students to explore their artistic voice without fear of judgment. Through art, we learn to see the world, and ourselves, more clearly.',
    image: 'arts-coordinator'
  },
  {
    id: 'mr-david-lee',
    name: 'Mr. David Lee',
    designation: 'Athletic Director',
    credentials: 'Masters in Sports Management',
    philosophy: 'Athletics is a classroom for life lessons in discipline, teamwork, and perseverance. My aim is to build programs that promote physical well-being and instill the values of sportsmanship. Winning is important, but character on and off the field is paramount.',
    image: 'athletic-director'
  },
  {
    id: 'dr-samuel-jones',
    name: 'Dr. Samuel Jones',
    designation: 'Senior Faculty, Humanities',
    credentials: 'PhD in History',
    philosophy: 'By studying the stories of humanity, we learn what it means to be human. I guide students to analyze the past, understand the present, and thoughtfully shape the future. My classroom is a space for vigorous debate and the development of a global perspective.',
    image: 'faculty-1'
  },
  {
    id: 'ms-anita-sharma',
    name: 'Ms. Anita Sharma',
    designation: 'Senior Faculty, Mathematics',
    credentials: 'Masters in Applied Mathematics',
    philosophy: 'Mathematics is the language of the universe, elegant and powerful. I work to demystify its complexities and reveal its inherent beauty and logic. I build problem-solvers who can apply mathematical principles to find innovative solutions.',
    image: 'faculty-2'
  },
  {
    id: 'dr-chloe-williams',
    name: 'Dr. Chloe Williams',
    designation: 'Senior Faculty, Literature',
    credentials: 'PhD in Comparative Literature',
    philosophy: 'Literature opens windows to different worlds and fosters deep empathy. My role is to guide students through the great works, encouraging them to find their own voice through critical reading and writing. We read not just to know, but to grow.',
    image: 'faculty-3'
  },
  {
    id: 'mr-benjamin-carter',
    name: 'Mr. Benjamin Carter',
    designation: 'Senior Faculty, Computer Science',
    credentials: 'Masters in Computer Science',
    philosophy: 'In a digital world, computational thinking is a fundamental skill. I teach students not just to use technology, but to create it ethically and responsibly. My philosophy is to cultivate innovators who can build the tools of tomorrow.',
    image: 'faculty-4'
  },
];

export const departmentDetails = [
  {
    id: 'science',
    name: 'Science Department',
    icon: FlaskConical,
    description: 'Our Science Department is a hub of innovation and discovery. With state-of-the-art laboratories and a curriculum focused on hands-on experimentation, we cultivate the next generation of scientists, engineers, and critical thinkers. Students engage in research, robotics, and environmental science, preparing them to tackle the world\'s most pressing challenges.'
  },
  {
    id: 'humanities',
    name: 'Humanities Department',
    icon: Landmark,
    description: 'The Humanities Department explores the rich tapestry of human history, culture, and expression. Through literature, history, philosophy, and social sciences, we develop students into global citizens with a nuanced understanding of the world. Our focus on debate, critical analysis, and persuasive writing equips students for leadership in any field.'
  },
  {
    id: 'performing-arts',
    name: 'Performing Arts Department',
    icon: Palette,
    description: 'Creativity flourishes in our Performing Arts Department. From theater and music to dance and visual arts, we provide a platform for students to express themselves and hone their talents. Our programs build confidence, collaboration skills, and an appreciation for the arts that lasts a lifetime, guided by faculty who are accomplished artists in their own right.'
  },
];

export const curriculumDetails = [
  {
    id: 'primary',
    title: 'Primary School',
    summary: 'Foundational learning through exploration and play.',
    description: 'Our Primary School program (Grades 1-5) builds a strong foundation in literacy, numeracy, and scientific inquiry in a nurturing environment. We focus on hands-on, project-based learning to spark curiosity and a love for discovery. Social-emotional development is integrated into every aspect of the day, fostering kindness, collaboration, and a growth mindset.'
  },
  {
    id: 'secondary',
    title: 'Secondary School',
    summary: 'Deepening knowledge and developing critical skills.',
    description: 'In Secondary School (Grades 6-10), students delve deeper into core academic subjects while exploring a wide range of electives in arts, technology, and athletics. The curriculum is designed to develop critical thinking, analytical reasoning, and effective communication skills. We emphasize personal responsibility and leadership development, preparing students for the academic rigor of their college years.'
  },
  {
    id: 'college',
    title: 'College Level',
    summary: 'Specialized studies and preparation for higher education.',
    description: 'Our College-level program (Grades 11-12) offers a pre-university experience with specialized tracks and Advanced Placement (AP) courses. Students engage in in-depth research, seminar-style discussions, and independent projects under the guidance of expert faculty. Comprehensive college counseling ensures our graduates are prepared to succeed at top universities worldwide.'
  }
];

export const newsItems = [
    {
        id: '1',
        title: 'SARC Student Wins National Science Fair',
        date: '2023-10-26',
        summary: 'Eleventh-grader Anya Sharma took home the top prize for her innovative project on biodegradable plastics, marking a significant achievement for our science department.',
        image: 'news-1',
    },
    {
        id: '2',
        title: 'Annual Arts Festival Showcases Incredible Student Talent',
        date: '2023-10-20',
        summary: 'The campus was alive with creativity during our annual Arts Festival, featuring a gallery exhibition, a theater production of "A Midsummer Night\'s Dream," and a stunning performance by the school orchestra.',
        image: 'news-2',
    },
    {
        id: '3',
        title: 'Debate Team Secures Regional Championship',
        date: '2023-10-15',
        summary: 'Our varsity debate team triumphed at the regional finals, showcasing exceptional research, argumentation, and public speaking skills. They now advance to the national competition.',
        image: 'gallery-5',
    }
];

export const galleryItems = [
    { id: '1', image: 'gallery-1', description: 'Students collaborating on a science project' },
    { id: '2', image: 'gallery-2', description: 'A school theater production' },
    { id: '3', image: 'gallery-3', description: 'A student art exhibition' },
    { id: '4', image: 'gallery-4', description: 'The school\'s basketball team celebrating' },
    { id: '5', image: 'gallery-5', description: 'Students in a debate competition' },
    { id: '6', image: 'gallery-6', description: 'Graduation day ceremony' },
];
