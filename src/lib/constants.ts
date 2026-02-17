

import { GraduationCap, Briefcase, Users, HeartHandshake, Microscope, Landmark, Computer, Library, Bus, Utensils, Home, FlaskConical, Target, User, History, BookOpen, Award, Building, Bell, CalendarDays, FileText, School, Drama, Gamepad2, Lightbulb, Projector, ShieldCheck } from 'lucide-react';

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
      { href: '/academics/achievements', label: 'Alumni Network', description: 'Celebrate the accomplishments of our students.', icon: Award },
      { href: '/academics/innovation', label: 'Innovation & Learning', description: 'Discover our hands-on, practical approach.', icon: Lightbulb },
    ],
  },
    { 
    label: 'Notice',
    children: [
      { href: '/notice/general', label: 'General Notice', description: 'Stay updated with general announcements.', icon: Bell },
      { href: '/notice/holidays', label: 'Holiday Notice', description: 'View our academic calendar and holidays.', icon: CalendarDays },
    ],
  },
  { href: '/results', label: 'Results' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const GALLERY_CATEGORIES = ['All', 'Campus', 'Labs', 'Projects', 'Tours', 'Events', 'Cultural', 'Sports'];

export const HERO_IMAGES = [
    { alt: 'SARC campus view' },
    { alt: 'Students in a modern classroom' },
    { alt: 'A state-of-the-art science laboratory' },
    { alt: 'Students collaborating on a project' },
    { alt: 'SARC students in the library' },
];

export const STATS = [
    { number: '2017', label: 'Established' },
    { number: '5k+', label: 'Graduates' },
    { number: '10+', label: 'Expert Faculty' },
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

export const ALUMNI_MEMBERS = [
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
    }
];

export const STAFF_MEMBERS = [
  {
    id: 'dr_laxman_basnet',
    name: 'Dr. Laxman Basnet',
    role: 'Founder / CEO',
    credentials: 'PhD',
    philosophy: 'Dedicated to fostering a vibrant learning environment for all students.',
    socials: { facebook: 'https://www.facebook.com/laxman86', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dipendra_joshi',
    name: 'Dipendra Joshi',
    role: 'Academic Director',
    credentials: 'M.A., M.Ed (Maths)',
    philosophy: 'Making mathematics understandable and enjoyable for all.',
    socials: { facebook: 'https://www.facebook.com/dipendra.joshi.184', instagram: '#', linkedin: '#' }
  },
  {
    id: 'santosh_pandey',
    name: 'Santosh Pandey',
    role: 'Managing Director',
    credentials: 'B.M.B',
    philosophy: 'Laying the groundwork for future business leaders.',
    socials: { facebook: 'https://www.facebook.com/santosh.pandey.24598', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhagwat_dev_bhatt',
    name: 'Bhagwat Dev Bhatt',
    role: 'Program Coordinator',
    credentials: 'M.Phil',
    philosophy: 'Committed to academic excellence and student success.',
    socials: { facebook: 'https://www.facebook.com/bhagawat.bhatta', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bed_prakash_bhatt',
    name: 'Bed Prakash Bhatt',
    role: 'HOD (Science) | Physics',
    credentials: 'M.Sc',
    philosophy: 'Inspiring the next generation of scientists and thinkers.',
    socials: { facebook: 'https://www.facebook.com/VED.BHATT', instagram: '#', linkedin: '#' }
  },
  {
    id: 'karan_singh_mahara',
    name: 'Karan Singh Mahara',
    role: 'Chemistry',
    credentials: 'M.Sc',
    philosophy: 'Making science accessible and exciting for every student.',
    socials: { facebook: 'https://www.facebook.com/karan.singh.mahara.813935', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhupendra_chand',
    name: 'Bhupendra Chand',
    role: 'Chemistry',
    credentials: 'M.Sc',
    philosophy: 'Fostering a love for learning and critical inquiry.',
    socials: { facebook: 'https://www.facebook.com/bhupen.chand.73', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhuwan_chandra_bogati',
    name: 'Bhuwan Chandra Bogati',
    role: 'Biology',
    credentials: 'M.Sc',
    philosophy: 'Guiding students to discover their potential through science.',
    socials: { facebook: 'https://www.facebook.com/bhuwanchandra.bokati', instagram: '#', linkedin: '#' }
  },
  {
    id: 'pushpa_raj_bhatt',
    name: 'Pushpa Raj Bhatt',
    role: 'Botany',
    credentials: 'M.Sc',
    philosophy: 'Dedicated to creating an engaging and supportive classroom.',
    socials: { facebook: 'https://www.facebook.com/puspraj.bhatt.35', instagram: '#', linkedin: '#' }
  },
  {
    id: 'narendra_awasthi',
    name: 'Narendra Awasthi',
    role: 'Physics',
    credentials: 'M.Sc',
    philosophy: 'Empowering students with knowledge and practical skills.',
    socials: { facebook: 'https://www.facebook.com/narendra.awasthi.940', instagram: '#', linkedin: '#' }
  },
  {
    id: 'suraj_pant',
    name: 'Suraj Pant',
    role: 'Computer Science',
    credentials: 'M.Sc',
    philosophy: 'Fostering curiosity and a passion for scientific discovery.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'shiv_raj_bohara',
    name: 'Shiv Raj Bohara',
    role: 'Mathematics',
    credentials: 'M.A. (Maths)',
    philosophy: 'Developing logical thinking and problem-solving skills in students.',
    socials: { facebook: 'https://www.facebook.com/shivraj.bohara.1', instagram: '#', linkedin: '#' }
  },
  {
    id: 'meen_bahadur_khadka',
    name: 'Meen Bahadur Khadka',
    role: 'English & Literature',
    credentials: 'M.Ed',
    philosophy: 'Committed to holistic education and personal development.',
    socials: { facebook: 'https://www.facebook.com/RadheRadheMahen', instagram: '#', linkedin: '#' }
  },
  {
    id: 'sudarshan_prashad_bhatt',
    name: 'Sudarshan Prashad Bhatt',
    role: 'Mathematics',
    credentials: 'M.Ed',
    philosophy: 'Creating an inclusive and effective learning environment.',
    socials: { facebook: 'https://www.facebook.com/sudarsan.bhatta.5', instagram: '#', linkedin: '#' }
  },
  {
    id: 'gyandeb_bhatt',
    name: 'Gyandeb Bhatt',
    role: 'Faculty',
    credentials: 'M.Ed',
    philosophy: 'Nurturing lifelong learners and responsible citizens.',
    socials: { facebook: 'https://www.facebook.com/gyandebbhatta.1', instagram: '#', linkedin: '#' }
  },
  {
    id: 'pushpa_joshi',
    name: 'Pushpa Joshi',
    role: 'English & Literature',
    credentials: 'M.Ed',
    philosophy: 'Dedicated to student growth and academic success.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'govind_giri',
    name: 'Govind Giri',
    role: 'Mathematics',
    credentials: 'M.Ed',
    philosophy: 'Inspiring students to achieve their full potential.',
    socials: { facebook: 'https://www.facebook.com/govind.giri.68635', instagram: '#', linkedin: '#' }
  },
  {
    id: 'birendra_bahadur_chand',
    name: 'Birendra Bahadur Chand',
    role: 'Nepali',
    credentials: 'M.Ed',
    philosophy: 'Fostering a positive and challenging learning atmosphere.',
    socials: { facebook: 'https://www.facebook.com/birendra.chand.39750', instagram: '#', linkedin: '#' }
  },
  {
    id: 'rajesh_datt_bhatt',
    name: 'Rajesh Datt Bhatt',
    role: 'Computer Science',
    credentials: 'MCA',
    philosophy: 'Bridging technology and education for modern learners.',
    socials: { facebook: 'https://www.facebook.com/rajeshbhatt360', instagram: '#', linkedin: '#' }
  },
  {
    id: 'rituraj_bhatt',
    name: 'Rituraj Bhatt',
    role: 'Faculty',
    credentials: 'M.Com',
    philosophy: 'Equipping students with practical business and commerce skills.',
    socials: { facebook: 'https://www.facebook.com/profile.php?id=61577198216063', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dev_raj_paneru',
    name: 'Dev Raj Paneru',
    role: 'Faculty',
    credentials: 'M.BS',
    philosophy: 'Cultivating business acumen and entrepreneurial spirit.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'jeewan_thapa',
    name: 'Jeewan Thapa',
    role: 'Mathematics',
    credentials: 'M.A. & B.Sc (B.E.)',
    philosophy: 'Integrating diverse fields of knowledge for a complete education.',
    socials: { facebook: 'https://www.facebook.com/jeewan.thapa.684245', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dev_singh_bhandari',
    name: 'Dev Singh Bhandari',
    role: 'Economics',
    credentials: 'B.Sc',
    philosophy: 'Sharing the wonders of science with eager minds.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'kokila_pant',
    name: 'Kokila Pant',
    role: 'Accountant',
    credentials: 'B.BS',
    philosophy: 'Ensuring a smooth and supportive environment for students.',
    socials: { facebook: 'https://www.facebook.com/kokila.pant/', instagram: '#', linkedin: '#' }
  },
  {
    id: 'saraswati_bist',
    name: 'Saraswati Bist',
    role: 'Receptionist',
    credentials: 'MBA',
    philosophy: 'Dedicated to the efficient and caring administration of the institution.',
    socials: { facebook: 'https://www.facebook.com/sanbi.bist.2025', instagram: '#', linkedin: '#' }
  },
  {
    id: 'basanti_chand',
    name: 'Basanti Chand',
    role: 'Support Staff',
    philosophy: 'Providing essential support to our faculty and students every day.',
    socials: { facebook: 'https://www.facebook.com/nitin.chand.7334', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dashrath_chand',
    name: 'Dashrath Chand',
    role: 'Support Staff',
    philosophy: 'Working behind the scenes to keep our campus at its best.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'puran_rana',
    name: 'Puran Rana',
    role: 'Support Staff',
    philosophy: 'A key part of the team that maintains our welcoming campus.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  }
].sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
        "Founder / CEO": 1,
        "Academic Director": 2,
        "Managing Director": 3,
        "Program Coordinator": 4,
        "HOD (Science) | Physics": 5,
        "Faculty": 6,
        "Accountant": 7,
        "Receptionist": 8,
        "Support Staff": 9
    };
    return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99);
});

export const TOP_STUDENTS = [
    {
        name: 'Ashim Giri',
        class: '12 Management',
        quote: "SARC's innovative teaching methods made learning fun and meaningful.",
        gpa: 3.82,
        subjects: 'Economics, Mathematics, Accountancy',
        image: 'https://picsum.photos/seed/harish/400/400',
        achievements: [
          'NEB District Level Topper',
          'NEB State Level 2nd Topper',
      ],
        socials: {
          linkedin: 'https://www.linkedin.com/in/ashim-giri-b16521338/',
          facebook: 'https://www.facebook.com/profile.php?id=100080102481707',
          instagram: '#'
      }
    }
];

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
