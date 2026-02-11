
import { GraduationCap, Briefcase, Users, HeartHandshake, Microscope, Landmark, Computer, Library, Bus, Utensils, Home, FlaskConical, Target, User, History, BookOpen, Award, Building, Bell, CalendarDays, FileText, School, Drama, Gamepad2 } from 'lucide-react';

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
      { href: '/academics/faculties', label: 'Faculties', description: 'Meet our experienced and dedicated faculties.', icon: Users },
      { href: '/academics/achievements', label: 'Achievements', description: 'Celebrate the accomplishments of our students.', icon: Award },
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

export const STAFF_MEMBERS = [
  {
    id: 'dr-laxman-basnet',
    name: 'Dr. Laxman Basnet',
    role: 'Founder / CEO',
    credentials: 'Doctor of Philosophy',
    philosophy: 'Dedicated to fostering a vibrant learning environment for all students.',
    image: 'https://picsum.photos/seed/301/400/400'
  },
  {
    id: 'santosh-pandey',
    name: 'Santosh Pandey',
    role: 'Managing Director',
    credentials: 'Bachelor of Business Management',
    philosophy: 'Laying the groundwork for future business leaders.',
    image: 'https://picsum.photos/seed/323/400/400'
  },
  {
    id: 'bhagwat-bhatt',
    name: 'Bhagwat Bhatt',
    role: 'Program Coordinator',
    credentials: 'Master of Philosophy',
    philosophy: 'Committed to academic excellence and student success.',
    image: 'https://picsum.photos/seed/302/400/400'
  },
  {
    id: 'dipendra-joshi',
    name: 'Dipendra Joshi',
    role: 'Academic Coordinator',
    credentials: 'Master of Arts (Mathematics)',
    philosophy: 'Making mathematics understandable and enjoyable for all.',
    image: 'https://picsum.photos/seed/310/400/400'
  },
  {
    id: 'bed-prakash-bhatt',
    name: 'Bed Prakash Bhatt',
    role: 'Head of Science Department',
    credentials: 'Master of Science',
    philosophy: 'Inspiring the next generation of scientists and thinkers.',
    image: 'https://picsum.photos/seed/303/400/400'
  },
  {
    id: 'karan-singh-mahara',
    name: 'Karan Singh Mahara',
    role: 'Faculty',
    credentials: 'Master of Science',
    philosophy: 'Making science accessible and exciting for every student.',
    image: 'https://picsum.photos/seed/304/400/400'
  },
  {
    id: 'bhupendra-chand',
    name: 'Bhupendra Chand',
    role: 'Faculty',
    credentials: 'Master of Science',
    philosophy: 'Fostering a love for learning and critical inquiry.',
    image: 'https://picsum.photos/seed/305/400/400'
  },
  {
    id: 'bhuwan-chandra-bagati',
    name: 'Bhuwan Chandra Bagati',
    role: 'Faculty',
    credentials: 'Master of Science',
    philosophy: 'Guiding students to discover their potential through science.',
    image: 'https://picsum.photos/seed/306/400/400'
  },
  {
    id: 'pushpa-raj-bhatt',
    name: 'Pushpa Raj Bhatt',
    role: 'Faculty',
    credentials: 'Master of Science',
    philosophy: 'Dedicated to creating an engaging and supportive classroom.',
    image: 'https://picsum.photos/seed/307/400/400'
  },
  {
    id: 'narendra-awasthi',
    name: 'Narendra Awasthi',
    role: 'Faculty',
    credentials: 'Master of Science',
    philosophy: 'Empowering students with knowledge and practical skills.',
    image: 'https://picsum.photos/seed/308/400/400'
  },
  {
    id: 'suraj-pant',
    name: 'Suraj Pant',
    role: 'Faculty',
    credentials: 'Master of Science',
    philosophy: 'Fostering curiosity and a passion for scientific discovery.',
    image: 'https://picsum.photos/seed/309/400/400'
  },
  {
    id: 'shiv-raj-bhatt',
    name: 'Shiv Raj Bhatt',
    role: 'Faculty',
    credentials: 'Master of Arts (Mathematics)',
    philosophy: 'Developing logical thinking and problem-solving skills in students.',
    image: 'https://picsum.photos/seed/311/400/400'
  },
  {
    id: 'meen-bahadur-khadka',
    name: 'Meen Bahadur Khadka',
    role: 'Faculty',
    credentials: 'Master of Education',
    philosophy: 'Committed to holistic education and personal development.',
    image: 'https://picsum.photos/seed/312/400/400'
  },
  {
    id: 'sudarsan-bhatt',
    name: 'Sudarsan Bhatt',
    role: 'Faculty',
    credentials: 'Master of Education',
    philosophy: 'Creating an inclusive and effective learning environment.',
    image: 'https://picsum.photos/seed/313/400/400'
  },
  {
    id: 'gyan-dev-bhatt',
    name: 'Gyan Dev Bhatt',
    role: 'Faculty',
    credentials: 'Master of Education',
    philosophy: 'Nurturing lifelong learners and responsible citizens.',
    image: 'https://picsum.photos/seed/314/400/400'
  },
  {
    id: 'pushpa-joshi',
    name: 'Pushpa Joshi',
    role: 'Faculty',
    credentials: 'Master of Education',
    philosophy: 'Dedicated to student growth and academic success.',
    image: 'https://picsum.photos/seed/315/400/400'
  },
  {
    id: 'govind-giri',
    name: 'Govind Giri',
    role: 'Faculty',
    credentials: 'Master of Education',
    philosophy: 'Inspiring students to achieve their full potential.',
    image: 'https://picsum.photos/seed/316/400/400'
  },
  {
    id: 'birendra-bir-chand',
    name: 'Birendra Bir Chand',
    role: 'Faculty',
    credentials: 'Master of Education',
    philosophy: 'Fostering a positive and challenging learning atmosphere.',
    image: 'https://picsum.photos/seed/317/400/400'
  },
  {
    id: 'rajesh-datt-bhatt',
    name: 'Rajesh Datt Bhatt',
    role: 'Faculty',
    credentials: 'Master of Computer Applications',
    philosophy: 'Bridging technology and education for modern learners.',
    image: 'https://picsum.photos/seed/318/400/400'
  },
  {
    id: 'rituraj-bhatt',
    name: 'Rituraj Bhatt',
    role: 'Faculty',
    credentials: 'Master of Commerce',
    philosophy: 'Equipping students with practical business and commerce skills.',
    image: 'https://picsum.photos/seed/319/400/400'
  },
  {
    id: 'dev-raj-paneru',
    name: 'Dev Raj Paneru',
    role: 'Faculty',
    credentials: 'Master of Business Studies',
    philosophy: 'Cultivating business acumen and entrepreneurial spirit.',
    image: 'https://picsum.photos/seed/320/400/400'
  },
  {
    id: 'jeewan-thapa',
    name: 'Jeewan Thapa',
    role: 'Faculty',
    credentials: 'Master of Arts & Bachelor of Science',
    philosophy: 'Integrating diverse fields of knowledge for a complete education.',
    image: 'https://picsum.photos/seed/321/400/400'
  },
  {
    id: 'dev-singh-bhandari',
    name: 'Dev Singh Bhandari',
    role: 'Faculty',
    credentials: 'Bachelor of Science',
    philosophy: 'Sharing the wonders of science with eager minds.',
    image: 'https://picsum.photos/seed/322/400/400'
  },
  {
    id: 'kokila-pant',
    name: 'Kokila Pant',
    role: 'Accountant',
    credentials: 'Bachelor of Business Studies',
    philosophy: 'Ensuring a smooth and supportive environment for students.',
    image: 'https://picsum.photos/seed/324/400/400'
  },
  {
    id: 'saraswati-bist',
    name: 'Saraswati Bist',
    role: 'Receptionist',
    credentials: 'Bachelor of Business Administration / Master of Business Administration (Running)',
    philosophy: 'Dedicated to the efficient and caring administration of the institution.',
    image: 'https://picsum.photos/seed/325/400/400'
  },
  {
    id: 'basanti-chand',
    name: 'Basanti Chand',
    role: 'Support Staff',
    credentials: '+2 Graduate',
    philosophy: 'Providing essential support to our faculty and students every day.',
    image: 'https://picsum.photos/seed/326/400/400'
  },
  {
    id: 'dashrath-chand',
    name: 'Dashrath Chand',
    role: 'Support Staff',
    credentials: 'S.L.C Graduate',
    philosophy: 'Working behind the scenes to keep our campus at its best.',
    image: 'https://picsum.photos/seed/327/400/400'
  },
  {
    id: 'puran-rana',
    name: 'Puran Rana',
    role: 'Support Staff',
    credentials: 'S.L.C Graduate',
    philosophy: 'A key part of the team that maintains our welcoming campus.',
    image: 'https://picsum.photos/seed/328/400/400'
  }
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
