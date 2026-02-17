export const NEPAL_PROVINCES = [
    "Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"
];

export const NEPAL_DISTRICTS: { [key: string]: string[] } = {
    "Koshi": ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"],
    "Madhesh": ["Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha"],
    "Bagmati": ["Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu", "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"],
    "Gandaki": ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"],
    "Lumbini": ["Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", "Kapilvastu", "Parasi", "Palpa", "Pyuthan", "Rolpa", "Rukum East", "Rupandehi"],
    "Karnali": ["Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Rukum West", "Salyan", "Surkhet"],
    "Sudurpashchim": ["Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"]
};

export const NATIONALITIES = ["Nepali", "Indian", "Chinese", "American", "British", "Australian", "Canadian", "Other"];

export const NEPALI_MONTHS = [
    { value: '01', label: 'Baisakh' },
    { value: '02', label: 'Jestha' },
    { value: '03', label: 'Ashadh' },
    { value: '04', label: 'Shrawan' },
    { value: '05', label: 'Bhadra' },
    { value: '06', label: 'Ashwin' },
    { value: '07', label: 'Kartik' },
    { value: '08', label: 'Mangsir' },
    { value: '09', label: 'Poush' },
    { value: '10', label: 'Magh' },
    { value: '11', label: 'Falgun' },
    { value: '12', label: 'Chaitra' },
];

export const getNepaliYears = () => {
    // Generate a range of years appropriate for both birth dates and recent notices.
    const currentNepaliYear = new Date().getFullYear() + 57; 
    const years = [];
    for (let i = currentNepaliYear + 5; i >= 2040; i--) {
        years.push(i.toString());
    }
    return years;
};

export const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= 32; i++) {
        days.push(i.toString().padStart(2, '0'));
    }
    return days;
};
