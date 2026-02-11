

import { GraduationCap, Briefcase, Users, HeartHandshake, Microscope, Landmark, Computer, Library, Bus, Utensils, Home, FlaskConical, Target, User, History, BookOpen, Award, Building, Bell, CalendarDays, FileText, School, Drama, Gamepad2, Lightbulb } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { 
    label: 'About',
    children: [
      { href: '/about/us', label: 'About Us', description: 'Our story, vision, and commitment', icon: Building },
      { href: '/about/staffs', label: 'Our Staff', description: 'Meet our dedicated team', icon: Users },
      { href: '/about/founder', label: 'Our Founder', description: 'The visionary behind SARC', icon: User },
      { href: '/about/why-us', label: 'Why Choose SARC?', description: 'Our commitment to your success', icon: HeartHandshake },
    ],
  },
  { 
    label: 'Academics',
    children: [
      { href: '/academics/programs', label: 'Academic Programs', description: 'Explore our comprehensive range of programs.', icon: BookOpen },
      { href: '/academics/services', label: 'Facilities', description: 'Explore our modern, world-class facilities.', icon: Briefcase },
      { href: '/academics/achievements', label: 'Achievements', description: 'Celebrate the accomplishments of our students.', icon: Award },
      { href: '/academics/innovation', label: 'Innovation & Learning', description: 'Discover our hands-on, practical approach.', icon: Lightbulb },
    ],
  },
    { 
    label: 'Notice',
    children: [
      { href: '/notice/general', label: 'General Notice', description: 'Stay updated with general announcements.', icon: Bell },
      { href: '/notice/holidays', label: 'Holiday Notice', description: 'View our academic calendar and holidays.', icon: CalendarDays },
      { href: '/notice/exams', label: 'Exam & Results', description: 'Find exam schedules and check results.', icon: FileText },
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
    { src: '/images/hero/4.jpg', alt: 'SARC students in the library' },
];

export const GALLERY_CATEGORIES = ['All', 'Campus Life', 'Events', 'Academics', 'Sports'];

export const GALLERY_IMAGES = [
  { src: '/images/gallery/1.jpg', category: 'Campus Life' },
  { src: '/images/gallery/2.jpg', category: 'Events' },
  { src: '/images/gallery/3.jpg', category: 'Academics' },
  { src: '/images/gallery/4.jpg', category: 'Sports' },
  { src: '/images/gallery/5.jpg', category: 'Campus Life' },
  { src: '/images/gallery/6.jpg', category: 'Events' },
  { src: '/images/gallery/7.jpg', category: 'Academics' },
  { src: '/images/gallery/8.jpg', category: 'Sports' },
  { src: '/images/gallery/9.jpg', category: 'Campus Life' },
  { src: '/images/gallery/10.jpg', category: 'Events' },
  { src: '/images/gallery/11.jpg', category: 'Academics' },
  { src: '/images/gallery/12.jpg', category: 'Sports' },
  { src: '/images/gallery/13.jpg', category: 'Campus Life' },
  { src: '/images/gallery/14.jpg', category: 'Events' },
  { src: '/images/gallery/15.jpg', category: 'Academics' },
  { src: '/images/gallery/16.jpg', category: 'Sports' },
  { src: '/images/gallery/17.jpg', category: 'Campus Life' },
  { src: '/images/gallery/18.jpg', category: 'Events' },
  { src: '/images/gallery/19.jpg', category: 'Academics' },
  { src: '/images/gallery/20.jpg', category: 'Sports' },
  { src: '/images/gallery/21.jpg', category: 'Campus Life' },
  { src: '/images/gallery/22.jpg', category: 'Events' },
  { src: '/images/gallery/23.jpg', category: 'Academics' },
  { src: '/images/gallery/24.jpg', category: 'Sports' },
  { src: '/images/gallery/25.jpg', category: 'Campus Life' },
  { src: '/images/gallery/26.jpg', category: 'Events' },
  { src: '/images/gallery/27.jpg', category: 'Academics' },
  { src: '/images/gallery/28.jpg', category: 'Sports' },
  { src: '/images/gallery/29.jpg', category: 'Campus Life' },
  { src: '/images/gallery/30.jpg', category: 'Events' },
  { src: '/images/gallery/31.jpg', category: 'Academics' },
  { src: '/images/gallery/32.jpg', category: 'Sports' },
  { src: '/images/gallery/33.jpg', category: 'Campus Life' },
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

const createStaffImage = (name: string) => {
    const nameWithoutTitle = name.replace(/^(Dr\\.\\s*)/i, '');
    const filename = nameWithoutTitle.toLowerCase().replace(/\s+/g, '_') + '.jpg';
    return `/images/staffs/${filename}`;
};

export const STAFF_MEMBERS = [
  {
    id: 'dr-laxman-basnet',
    name: 'Dr. Laxman Basnet',
    role: 'Founder / CEO',
    credentials: 'PhD',
    philosophy: 'Dedicated to fostering a vibrant learning environment for all students.',
    image: createStaffImage('Dr. Laxman Basnet'),
    socials: { facebook: 'https://www.facebook.com/laxman86', instagram: '#', linkedin: '#' }
  },
  {
    id: 'santosh-pandey',
    name: 'Santosh Pandey',
    role: 'Managing Director',
    credentials: 'B.M.B',
    philosophy: 'Laying the groundwork for future business leaders.',
    image: createStaffImage('Santosh Pandey'),
    socials: { facebook: 'https://www.facebook.com/santosh.pandey.24598', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhagwat-dev-bhatt',
    name: 'Bhagwat Dev Bhatt',
    role: 'Program Coordinator',
    credentials: 'M.Phil',
    philosophy: 'Committed to academic excellence and student success.',
    image: createStaffImage('Bhagwat Dev Bhatt'),
    socials: { facebook: 'https://www.facebook.com/bhagawat.bhatta', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dipendra-joshi',
    name: 'Dipendra Joshi',
    role: 'Academic Coordinator',
    credentials: 'M.A. (Maths)',
    philosophy: 'Making mathematics understandable and enjoyable for all.',
    image: createStaffImage('Dipendra Joshi'),
    socials: { facebook: 'https://www.facebook.com/dipendra.joshi.184', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bed-prakash-bhatt',
    name: 'Bed Prakash Bhatt',
    role: 'Head of Science Department',
    credentials: 'M.Sc',
    philosophy: 'Inspiring the next generation of scientists and thinkers.',
    image: createStaffImage('Bed Prakash Bhatt'),
    socials: { facebook: 'https://www.facebook.com/VED.BHATT', instagram: '#', linkedin: '#' }
  },
  {
    id: 'karan-singh-mahara',
    name: 'Karan Singh Mahara',
    role: 'Chemistry',
    credentials: 'M.Sc',
    philosophy: 'Making science accessible and exciting for every student.',
    image: createStaffImage('Karan Singh Mahara'),
    socials: { facebook: 'https://www.facebook.com/karan.singh.mahara.813935', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhupendra-chand',
    name: 'Bhupendra Chand',
    role: 'Chemistry',
    credentials: 'M.Sc',
    philosophy: 'Fostering a love for learning and critical inquiry.',
    image: createStaffImage('Bhupendra Chand'),
    socials: { facebook: 'https://www.facebook.com/bhupen.chand.73', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhuwan-chandra-bogati',
    name: 'Bhuwan Chandra Bogati',
    role: 'Biology',
    credentials: 'M.Sc',
    philosophy: 'Guiding students to discover their potential through science.',
    image: createStaffImage('Bhuwan Chandra Bogati'),
    socials: { facebook: 'https://www.facebook.com/bhuwanchandra.bokati', instagram: '#', linkedin: '#' }
  },
  {
    id: 'pushpa-raj-bhatt',
    name: 'Pushpa Raj Bhatt',
    role: 'Botany',
    credentials: 'M.Sc',
    philosophy: 'Dedicated to creating an engaging and supportive classroom.',
    image: createStaffImage('Pushpa Raj Bhatt'),
    socials: { facebook: 'https://www.facebook.com/puspraj.bhatt.35', instagram: '#', linkedin: '#' }
  },
  {
    id: 'narendra-awasthi',
    name: 'Narendra Awasthi',
    role: 'Physics',
    credentials: 'M.Sc',
    philosophy: 'Empowering students with knowledge and practical skills.',
    image: createStaffImage('Narendra Awasthi'),
    socials: { facebook: 'https://www.facebook.com/narendra.awasthi.940', instagram: '#', linkedin: '#' }
  },
  {
    id: 'suraj-pant',
    name: 'Suraj Pant',
    role: 'Computer',
    credentials: 'M.Sc',
    philosophy: 'Fostering curiosity and a passion for scientific discovery.',
    image: createStaffImage('Suraj Pant'),
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'shiv-raj-bohara',
    name: 'Shiv Raj Bohara',
    role: 'Mathematics',
    credentials: 'M.A. (Maths)',
    philosophy: 'Developing logical thinking and problem-solving skills in students.',
    image: createStaffImage('Shiv Raj Bohara'),
    socials: { facebook: 'https://www.facebook.com/shivraj.bohara.1', instagram: '#', linkedin: '#' }
  },
  {
    id: 'meen-bahadur-khadka',
    name: 'Meen Bahadur Khadka',
    role: 'English',
    credentials: 'M.Ed',
    philosophy: 'Committed to holistic education and personal development.',
    image: createStaffImage('Meen Bahadur Khadka'),
    socials: { facebook: 'https://www.facebook.com/RadheRadheMahen', instagram: '#', linkedin: '#' }
  },
  {
    id: 'sudarshan-prashad-bhatt',
    name: 'Sudarshan Prashad Bhatt',
    role: 'Mathematics',
    credentials: 'M.Ed',
    philosophy: 'Creating an inclusive and effective learning environment.',
    image: createStaffImage('Sudarshan Prashad Bhatt'),
    socials: { facebook: 'https://www.facebook.com/sudarsan.bhatta.5', instagram: '#', linkedin: '#' }
  },
  {
    id: 'gyandeb-bhatt',
    name: 'Gyandeb Bhatt',
    role: 'Faculty',
    credentials: 'M.Ed',
    philosophy: 'Nurturing lifelong learners and responsible citizens.',
    image: createStaffImage('Gyandeb Bhatt'),
    socials: { facebook: 'https://www.facebook.com/gyandebbhatta.1', instagram: '#', linkedin: '#' }
  },
  {
    id: 'pushpa-joshi',
    name: 'Pushpa Joshi',
    role: 'English',
    credentials: 'M.Ed',
    philosophy: 'Dedicated to student growth and academic success.',
    image: createStaffImage('Pushpa Joshi'),
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'govind-giri',
    name: 'Govind Giri',
    role: 'Mathematics',
    credentials: 'M.Ed',
    philosophy: 'Inspiring students to achieve their full potential.',
    image: createStaffImage('Govind Giri'),
    socials: { facebook: 'https://www.facebook.com/govind.giri.68635', instagram: '#', linkedin: '#' }
  },
  {
    id: 'birendra-bahadur-chand',
    name: 'Birendra Bahadur Chand',
    role: 'Nepali',
    credentials: 'M.Ed',
    philosophy: 'Fostering a positive and challenging learning atmosphere.',
    image: createStaffImage('Birendra Bahadur Chand'),
    socials: { facebook: 'https://www.facebook.com/birendra.chand.39750', instagram: '#', linkedin: '#' }
  },
  {
    id: 'rajesh-datt-bhatt',
    name: 'Rajesh Datt Bhatt',
    role: 'Computer',
    credentials: 'MCA',
    philosophy: 'Bridging technology and education for modern learners.',
    image: createStaffImage('Rajesh Datt Bhatt'),
    socials: { facebook: 'https://www.facebook.com/rajeshbhatt360', instagram: '#', linkedin: '#' }
  },
  {
    id: 'rituraj-bhatt',
    name: 'Rituraj Bhatt',
    role: 'Faculty',
    credentials: 'M.Com',
    philosophy: 'Equipping students with practical business and commerce skills.',
    image: createStaffImage('Rituraj Bhatt'),
    socials: { facebook: 'https://www.facebook.com/profile.php?id=61577198216063', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dev-raj-paneru',
    name: 'Dev Raj Paneru',
    role: 'Faculty',
    credentials: 'M.BS',
    philosophy: 'Cultivating business acumen and entrepreneurial spirit.',
    image: createStaffImage('Dev Raj Paneru'),
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'jeewan-thapa',
    name: 'Jeewan Thapa',
    role: 'Mathematics',
    credentials: 'M.A. & B.Sc (B.E.)',
    philosophy: 'Integrating diverse fields of knowledge for a complete education.',
    image: createStaffImage('Jeewan Thapa'),
    socials: { facebook: 'https://www.facebook.com/jeewan.thapa.684245', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dev-singh-bhandari',
    name: 'Dev Singh Bhandari',
    role: 'Economics',
    credentials: 'B.Sc',
    philosophy: 'Sharing the wonders of science with eager minds.',
    image: createStaffImage('Dev Singh Bhandari'),
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'kokila-pant',
    name: 'Kokila Pant',
    role: 'Accountant',
    credentials: 'B.BS',
    philosophy: 'Ensuring a smooth and supportive environment for students.',
    image: createStaffImage('Kokila Pant'),
    socials: { facebook: 'https://www.facebook.com/kokila.pant/', instagram: '#', linkedin: '#' }
  },
  {
    id: 'saraswati-bist',
    name: 'Saraswati Bist',
    role: 'Receptionist',
    credentials: 'MBA',
    philosophy: 'Dedicated to the efficient and caring administration of the institution.',
    image: createStaffImage('Saraswati Bist'),
    socials: { facebook: 'https://www.facebook.com/sanbi.bist.2025', instagram: '#', linkedin: '#' }
  },
  {
    id: 'basanti-chand',
    name: 'Basanti Chand',
    role: 'Support Staff',
    philosophy: 'Providing essential support to our faculty and students every day.',
    image: createStaffImage('Basanti Chand'),
    socials: { facebook: 'https://www.facebook.com/nitin.chand.7334', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dashrath-chand',
    name: 'Dashrath Chand',
    role: 'Support Staff',
    philosophy: 'Working behind the scenes to keep our campus at its best.',
    image: createStaffImage('Dashrath Chand'),
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'puran-rana',
    name: 'Puran Rana',
    role: 'Support Staff',
    philosophy: 'A key part of the team that maintains our welcoming campus.',
    image: createStaffImage('Puran Rana'),
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  }
].sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
        "Founder / CEO": 1,
        "Managing Director": 2,
        "Program Coordinator": 3,
        "Academic Coordinator": 4,
        "Head of Science Department": 5,
        "Faculty": 6,
        "Accountant": 7,
        "Receptionist": 8,
        "Support Staff": 9
    };
    return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99);
});

export const WHY_US_ITEMS = [
    {
        icon: Award,
        title: "Quality Education",
        description: "A focus on conceptual and practical learning to build a strong academic foundation for success."
    },
    {
        icon: Users,
        title: "Experienced Faculty",
        description: "Learn from a dedicated team of experienced educators and mentors committed to your success."
    },
    {
        icon: Building,
        title: "Modern Infrastructure",
        description: "Access well-equipped labs, smart classrooms, and a digital library to support your learning."
    },
    {
        icon: School,
        title: "Smart Classrooms",
        description: "Interactive and tech-based learning with modern audio-visual aids to enhance engagement."
    },
     {
        icon: Briefcase,
        title: "Career-Oriented Courses",
        description: "We provide technical and leadership training to prepare you for the professional world."
    },
    {
        icon: Drama,
        title: "Extracurricular Activities",
        description: "Engage in sports, cultural events, debate, and various clubs for holistic development."
    },
    {
        icon: HeartHandshake,
        title: "Scholarships & Aid",
        description: "We offer financial assistance and scholarships for deserving and talented students."
    },
    {
        icon: Landmark,
        title: "Industry Partnerships",
        description: "Opportunities for internships and research through our partnerships with industry and universities."
    },
    {
        icon: Target,
        title: "Student-Centered Learning",
        description: "Our teaching approach fosters creativity, critical thinking, and problem-solving skills."
    },
    {
        icon: Gamepad2,
        title: "Peaceful Learning Environment",
        description: "A serene and conducive atmosphere for effective education and personal growth."
    },
];
