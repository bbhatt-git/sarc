import { GraduationCap, Briefcase, Users, HeartHandshake, Microscope, Landmark, Computer, Library, Bus, Utensils, Home, FlaskConical, Target, User, History, BookOpen, Award, Building } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { 
    label: 'About',
    children: [
      { href: '/about/us', label: 'Our School', description: 'Discover our campus and educational approach', icon: Building },
      { href: '/about/vision', label: 'Vision, Mission & Values', description: 'The principles that guide us', icon: Target },
      { href: '/about/staffs', label: 'Our Staff', description: 'Meet our dedicated team', icon: Users },
      { href: '/about/founder', label: 'Our Founder', description: 'The visionary behind SARC', icon: User },
      { href: '/about/history', label: 'Our History', description: 'Journey & achievements', icon: History },
      { href: '/about/why-us', label: 'Why Choose SARC?', description: 'Our commitment to your success', icon: HeartHandshake },
    ],
  },
  { 
    label: 'Academics',
    children: [
      { href: '#', label: 'Academic Programs' },
      { href: '#', label: 'Services' },
      { href: '#', label: 'Faculties' },
      { href: '#', label: 'Achievements' },
    ],
  },
    { 
    label: 'Notice',
    children: [
      { href: '#', label: 'General Notice' },
      { href: '#', label: 'Holiday Notice' },
      { href: '#', label: 'Exam & Results' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const HERO_IMAGES = [
    { src: '/images/hero/0.jpg', alt: 'SARC campus view' },
    { src: '/images/hero/1.jpg', alt: 'Students in a modern classroom' },
    { src: '/images/hero/2.jpg', alt: 'A state-of-the-art science laboratory' },
    { src: '/images/hero/3.jpg', alt: 'Students collaborating on a project' },
    { src: '/images/hero/4.jpg', alt: 'Graduation ceremony with students celebrating' },
];

export const STATS = [
    { number: '2017', label: 'Established' },
    { number: '5k+', label: 'Graduates' },
    { number: '50+', label: 'Expert Faculty' },
    { number: '12+', label: 'Programs' },
];


export const FACILITIES = [
    {
        icon: Microscope,
        title: "Science Labs",
        desc: "Fully equipped physics, chemistry, and biology labs for hands-on learning."
    },
    {
        icon: Computer,
        title: "Computer Lab",
        desc: "Modern computer labs with high-speed internet and the latest software."
    },
    {
        icon: Library,
        title: "Resourceful Library",
        desc: "A vast collection of books, journals, and digital resources."
    },
    {
        icon: Bus,
        title: "Transportation",
        desc: "Safe and reliable bus services covering various routes across the city."
    },
];

export const TESTIMONIALS = [
    {
        text: "SARC provided me with the perfect foundation for my medical career. The teachers are incredibly supportive and the labs are top-notch.",
        author: "Anjali Sharma",
        role: "MBBS Student, IOM",
        image: "https://picsum.photos/seed/101/100/100"
    },
    {
        text: "The management program at SARC is outstanding. It gave me the confidence and skills to start my own business right after graduation.",
        author: "Rohan Pradhan",
        role: "Entrepreneur",
        image: "https://picsum.photos/seed/102/100/100"
    },
    {
        text: "I always felt encouraged to explore my interests beyond academics. The extracurricular activities are fantastic!",
        author: "Sunita K.C.",
        role: "BBS Graduate",
        image: "https://picsum.photos/seed/103/100/100"
    },
    {
        text: "The faculty's dedication is what makes SARC special. They are true mentors who guide you every step of the way.",
        author: "Bijay Thapa",
        role: "+2 Science Graduate",
        image: "https://picsum.photos/seed/104/100/100"
    },
    {
        text: "I'm grateful for the career counseling services. They helped me choose the right path and prepared me for university interviews.",
        author: "Priya Gurung",
        role: "Studying in Australia",
        image: "https://picsum.photos/seed/105/100/100"
    },
    {
        text: "A perfect blend of academic rigor and personal development. SARC prepares you for life, not just for exams.",
        author: "Sameer Shrestha",
        role: "Software Engineer",
        image: "https://picsum.photos/seed/106/100/100"
    }
];

export const NEWS_ITEMS = [
    {
        id: '1',
        title: 'Annual Tech Fest "Innovate 2024" Concludes with Record Participation',
        date: '2024-05-20',
        summary: 'Our annual tech festival saw groundbreaking projects from students across various departments, from AI-driven apps to sustainable tech solutions, drawing attention from industry leaders.',
        image: 'https://picsum.photos/seed/news1/600/400',
        category: 'Campus Event'
    },
    {
        id: '2',
        title: 'SARC Organizes Successful Blood Donation Drive, Saving Lives',
        date: '2024-04-15',
        summary: 'In a powerful display of community spirit, our student-led blood donation drive in collaboration with the Red Cross collected over 200 pints, making a significant impact.',
        image: 'https://picsum.photos/seed/news2/600/400',
        category: 'Community'
    },
    {
        id: '3',
        title: 'Alumni Speaker Series Featuring Silicon Valley Innovators Inspires Students',
        date: '2024-03-10',
        summary: 'Top alumni from leading tech companies returned to campus to share their career journeys, offering invaluable insights and mentorship to the next generation of leaders.',
        image: 'https://picsum.photos/seed/news3/600/400',
        category: 'Alumni'
    }
];

export const STAFF_MEMBERS = [
  {
    id: 'dr-evelyn-reed',
    name: 'Dr. Evelyn Reed',
    role: 'Principal',
    credentials: 'PhD in Educational Leadership',
    philosophy: 'My mission is to cultivate a community where intellectual rigor and compassionate leadership converge.',
    image: 'https://picsum.photos/seed/201/400/400'
  },
  {
    id: 'dr-marcus-thorne',
    name: 'Dr. Marcus Thorne',
    role: 'Head of Sciences',
    credentials: 'PhD in Molecular Biology',
    philosophy: 'I strive to ignite a relentless curiosity in our students, encouraging them to challenge assumptions.',
    image: 'https://picsum.photos/seed/202/400/400'
  },
  {
    id: 'ms-isabella-chen',
    name: 'Ms. Isabella Chen',
    role: 'Arts Coordinator',
    credentials: 'Masters in Fine Arts',
    philosophy: 'Art is the universal language of human experience. My purpose is to provide a sanctuary for creativity.',
    image: 'https://picsum.photos/seed/203/400/400'
  },
  {
    id: 'mr-david-lee',
    name: 'Mr. David Lee',
    role: 'Athletic Director',
    credentials: 'Masters in Sports Management',
    philosophy: 'The field and court are our finest classrooms for learning resilience, discipline, and teamwork.',
    image: 'https://picsum.photos/seed/204/400/400'
  },
];

export const WHY_US_ITEMS = [
    {
        icon: Award,
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
        title: "Holistic Growth",
        description: "We focus on the all-round development of our students, nurturing both mind and character."
    }
];

export const GALLERY_CATEGORIES = [
    'Campus Life',
    'Academics',
    'Events',
    'Sports',
    'Community',
];

export const GALLERY_IMAGES = [
    { src: '/images/gallery/1.jpg', category: 'Campus Life', hint: 'students studying' },
    { src: '/images/gallery/2.jpg', category: 'Events', hint: 'college event' },
    { src: '/images/gallery/3.jpg', category: 'Academics', hint: 'science lab' },
    { src: '/images/gallery/4.jpg', category: 'Sports', hint: 'basketball game' },
    { src: '/images/gallery/5.jpg', category: 'Campus Life', hint: 'library books' },
    { src: '/images/gallery/6.jpg', category: 'Community', hint: 'group discussion' },
    { src: '/images/gallery/7.jpg', category: 'Events', hint: 'award ceremony' },
    { src: '/images/gallery/8.jpg', category: 'Academics', hint: 'lecture hall' },
    { src: '/images/gallery/9.jpg', category: 'Sports', hint: 'soccer field' },
    { src: '/images/gallery/10.jpg', category: 'Campus Life', hint: 'student collaboration' },
    { src: '/images/gallery/11.jpg', category: 'Community', hint: 'volunteer work' },
    { src: '/images/gallery/12.jpg', category: 'Events', hint: 'music performance' },
    { src: '/images/gallery/13.jpg', category: 'Academics', hint: 'classroom setting' },
    { src: '/images/gallery/14.jpg', category: 'Sports', hint: 'running track' },
    { src: '/images/gallery/15.jpg', category: 'Campus Life', hint: 'campus view' },
];
