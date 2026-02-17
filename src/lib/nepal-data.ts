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
    // The Nepali new year (Bikram Sambat) starts in mid-April.
    // A simple approximation is to add 57 years, but this can be off by one depending on the month.
    // Correcting this for better accuracy.
    const gregorianDate = new Date();
    const gregorianYear = gregorianDate.getFullYear();
    const gregorianMonth = gregorianDate.getMonth(); // 0 (Jan) - 11 (Dec)
    
    // If the month is before April (index 3), we are in the previous Nepali year relative to the simple conversion.
    const offset = gregorianMonth < 3 ? 56 : 57;
    const currentNepaliYear = gregorianYear + offset;

    const years = [];
    // Go a few years into the future for notices, and far back for birth years.
    for (let i = currentNepaliYear + 5; i >= 2040; i--) {
        years.push(i.toString());
    }
    return { years, currentNepaliYear: currentNepaliYear.toString() };
};


export const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= 32; i++) {
        days.push(i.toString().padStart(2, '0'));
    }
    return days;
};
