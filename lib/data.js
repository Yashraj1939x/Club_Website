// lib/data.js

// =========================================
// STATIC CONTENT (Moved from DB)
// =========================================

export const timelineEvents = [
  { year: '2020', title: 'IUCEE RIT Chapter Founded', description: 'Established with a vision to transform engineering education.' },
  { year: '2021', title: 'First IASF Participation', description: 'Students participated in the Indian Annual Student Forum.' },
  { year: '2022', title: 'UN SDG Initiative Launch', description: 'Started focusing projects on Sustainable Development Goals.' },
  { year: '2023', title: 'National Recognition', description: 'Received recognition for innovative engineering solutions.' },
  { year: '2024', title: 'IASF at KLE Tech University', description: 'Successful participation at Hubli, Karnataka.' },
  { year: '2025', title: 'IASF at VNR VJIET', description: 'Latest achievement at Hyderabad, Telangana.' }
];

export const achievements = [
  { title: '50+ Students Impacted', description: 'Directly mentored and guided engineering students.', icon: 'users', link: '#alumni' },
  { title: '15+ Projects Completed', description: 'Real-world solutions addressing societal challenges.', icon: 'target', link: '#projects' },
  { title: '3 National Conferences', description: 'Active participation in IASF events across India.', icon: 'award', link: '#gallery' },
  { title: 'UN SDG Focus', description: 'All projects are aligned with one or more of the 17 SDGs.', icon: 'globe', link: '#sdg' }
];

export const projectsData = [
  {
    id: 1,
    title: 'Ceramic Water Filtration',
    description: 'A comprehensive project focused on developing a low-cost, effective ceramic water filter using locally sourced materials. The primary goal is to provide a sustainable solution for clean drinking water in rural communities, aligning with UN SDG 6.',
    images: ["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/1.png", "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/1.png"],
    category: 'Sustainability',
    year: '2024',
    technologies: ["Material Science", "Fluid Dynamics", "Ceramic Engineering", "Water Quality Testing"],
    status: 'Active',
    teamMembers: ["Priya Patel", "Arjun Sharma"],
    links: { github: 'https://github.com/iucee-rit/water-filter', live: null }
  },
  {
    id: 2,
    title: 'AI-Powered Crop Disease Detection',
    description: 'This project utilizes computer vision and machine learning to identify crop diseases from leaf images. Farmers can upload a photo, and the AI model diagnoses potential diseases, suggesting mitigation strategies. This aims to improve crop yield and support sustainable agriculture (UN SDG 2: Zero Hunger).',
    images: ["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/cropDisease/images.png", "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/cropDisease/images.png"],
    category: 'AI/ML',
    year: '2023',
    technologies: ["Python", "TensorFlow", "React Native", "Computer Vision"],
    status: 'Completed',
    teamMembers: ["Rohan Verma", "Anita Desai"],
    links: { github: 'https://github.com/iucee-rit/crop-disease-ai', live: 'https://crop-ai.example.com' }
  }
];

export const teamData = [
  {
    name: 'Dr. Krishna Vedula',
    role: 'Director of IUCEE Student Chapter',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/krishna.png',
    department: 'Executive Director, IUCEE',
    bio: 'Leading the vision for innovative engineering education across India.',
    expertise: ["Engineering Education", "Global Collaboration"],
    publications: 20,
    projects: 50,
    link: 'https://www.linkedin.com/in/krishna-vedula/'
  },
  {
    name: 'Mr. Mayur Maske',
    role: 'Faculty Coordinator',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/maske.png',
    department: 'Mechanical Engineering',
    bio: 'Guiding students towards academic and professional excellence.',
    expertise: ["Mechanical Design", "Student Mentorship"],
    publications: 5,
    projects: 10,
    link: 'https://www.linkedin.com/in/mayur-maske/'
  },
  {
    name: 'Arjun Sharma',
    role: 'President',
    image: 'https://placehold.co/120x120/1f2937/FFFFFF?text=Arjun', // Placeholder used as per SQL dump having a placeholder ref
    department: 'Computer Engineering - Final Year',
    bio: 'Overseeing all chapter activities and strategic direction.',
    expertise: ["Leadership", "Project Management", "Web Dev"],
    link: 'https://www.linkedin.com/in/arjun-sharma/'
  },
  {
    name: 'Priya Patel',
    role: 'Vice President',
    image: 'https://placehold.co/120x120/1f2937/FFFFFF?text=Priya', // Placeholder used as per SQL dump
    department: 'Electronics Engineering - Third Year',
    bio: 'Assisting in chapter management and external relations.',
    expertise: ["Embedded Systems", "Public Speaking"],
    link: 'https://www.linkedin.com/in/priya-patel/'
  }
];

export const alumni = [
  {
    name: 'Pawan Kamble',
    year: 2022,
    currentRole: 'Student at University of Sydney',
    link: 'https://www.linkedin.com/in/pawan-kamble-b00688229/',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni1.jpg',
    quote: 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.'
  },
  {
    name: 'Shubham Katekar',
    year: 2022,
    currentRole: 'Co-founder at Techsyne Consulting',
    link: 'https://www.linkedin.com/in/shubham-katekar-8b9487190/',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni2.jpg',
    quote: 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.'
  },
  {
    name: 'Sejal Patil',
    year: 2022,
    currentRole: 'Director at Pullpubb',
    link: 'https://www.linkedin.com/in/sejal-patil-2023b1191/',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni3.jpg',
    quote: 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.'
  },
  {
    name: 'Tanmay Bhosle',
    year: 2022,
    currentRole: 'Part Planning Engineer @ MAN Truck & Bus',
    link: 'https://www.linkedin.com/in/tanmay-bhosle-a63445191/',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni4.jpg',
    quote: 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.'
  },
  {
    name: 'Kunal Ashtekar',
    year: 2022,
    currentRole: 'Programmer Analyst @ Cognizant',
    link: 'https://www.linkedin.com/in/kunal-ashtekar-91599818b/',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni5.png',
    quote: 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.'
  },
  {
    name: 'Harsh Patil',
    year: 2022,
    currentRole: 'Data Analyst @ Client Solutions',
    link: 'https://www.linkedin.com/in/harsh-patil-34b82b1a8/',
    image: 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni6.png',
    quote: 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.'
  }
];

export const galleryData = [
  {
    title: 'Solstice 2025',
    description: 'Freshers and Farewell party',
    images: [
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/1.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/2.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/3.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/4.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/5.jpg"
    ]
  },
  {
    title: 'IASF 2025 - Hyderabad',
    description: 'VNR Vignana Jyothi Institute of Engineering & Technology',
    images: [
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/1.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/2.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/3.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/4.jpg",
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/5.jpg"
    ]
  },
  {
    title: 'IASF 2024 - Hubli',
    description: 'KLE Technological University, Hubli, Karnataka',
    images: [
      "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hubli/1.jpg"
    ]
  },
  {
    title: 'IASF 1 - Mysore',
    description: 'Vidyavardhaka College of Engineering, Mysore, Karnataka',
    images: ["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-mysore/1.jpg"]
  }
];

export const partnersData = [
  { name: 'Cognizant', logoUrl: 'https://cognizant.scene7.com/is/content/cognizant/COG-Logo-2022-1?fmt=png-alpha', websiteUrl: 'https://www.cognizant.com/' },
  { name: 'KLE Tech University', logoUrl: 'https://www.kletech.ac.in/images/logo.png', websiteUrl: 'https://www.kletech.ac.in/' },
  { name: 'VNR VJIET', logoUrl: 'https://vnrvjiet.ac.in/assets/images/VNR-new.png', websiteUrl: 'https://www.vnrvjiet.ac.in/' },
  { name: 'Dassault Systèmes', logoUrl: 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_blue.svg', websiteUrl: 'https://www.3ds.com/' }
];

// Note: These are events from your DB dump that appear to be in the past relative to typical academic years.
export const pastEvents = [
  {
    title: 'Solstice 2025',
    description: 'Freshers and Farewell party',
    images: ["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/upcommingEvents/IASF_2026/1.png"],
    category: 'party',
    date: '2025-10-15T19:00:00',
    time: '7:00 PM IST',
    location: 'Online',
    registered: 45,
    capacity: 100,
    highlights: [null]
  }
];

export const sdgData = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", icon: "🏠" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security.", icon: "🌾" },
  { id: 3, title: "Good Health", description: "Ensure healthy lives and promote well-being.", icon: "❤️" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education.", icon: "📚" },
  { id: 5, title: "Gender Equality", description: "Achieve gender equality for all.", icon: "⚖️" },
  { id: 6, title: "Clean Water", description: "Ensure availability of clean water.", icon: "💧" },
  { id: 7, title: "Affordable Energy", description: "Ensure access to affordable, reliable energy.", icon: "⚡" },
  { id: 8, title: "Decent Work", description: "Promote inclusive and sustainable economic growth.", icon: "💼" },
  { id: 9, title: "Innovation", description: "Build resilient infrastructure, promote innovation.", icon: "🏗️" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", icon: "🤝" },
  { id: 11, title: "Sustainable Cities", description: "Make cities inclusive, safe, and sustainable.", icon: "🏙️" },
  { id: 12, title: "Responsible Consumption", description: "Ensure sustainable consumption patterns.", icon: "♻️" },
  { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change.", icon: "🌍" },
  { id: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans.", icon: "🌊" },
  { id: 15, title: "Life on Land", description: "Protect, restore and promote sustainable use of ecosystems.", icon: "🌳" },
  { id: 16, title: "Peace & Justice", description: "Promote peaceful and inclusive societies.", icon: "⚖️" },
  { id: 17, title: "Partnerships", description: "Strengthen the means of implementation.", icon: "🤝" },
];

export const socialMedia = [
  {
    name: "GitHub",
    icon: "github",
    color: "#ffffff",
    url: "https://github.com/iuceerit",
    description: "Explore our open-source projects and code."
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0077B5",
    url: "https://www.linkedin.com/company/iucee-rit-students-chapter/",
    description: "Connect with our professional network."
  },
  {
    name: "Instagram",
    icon: "instagram",
    color: "#E4405F",
    url: "https://www.instagram.com/iucee_rit_/",
    description: "See our latest photos and stories."
  }
];