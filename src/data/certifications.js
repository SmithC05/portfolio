// Certifications and achievements data
export const certificationsData = [
  {
    id: 1,
    title: "Android Development Virtual Internship",
    issuer: "Google (via Eduskills)",
    type: "Professional Development",
    category: "Mobile Development",
    date: "2024-08-15",
    description: "Comprehensive Android development program covering Kotlin, Android Studio, UI/UX design, and app deployment",
    skills: ["Android Development", "Kotlin", "Android Studio", "Mobile UI/UX"],
    certificateImage: "../assets/android-development-cert.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 2,
    title: "Full Stack Development Bootcamp",
    issuer: "LeetCode, CodeChef",
    type: "Technical Skills",
    category: "Web Development",
    date: "2024-09-30",
    description: "Intensive bootcamp covering full-stack web development with modern technologies and best practices",
    skills: ["Full Stack Development", "Web Technologies", "Problem Solving", "Algorithms"],
    certificateImage: "fullstack-bootcamp-cert.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 3,
    title: "AI Fundamentals",
    issuer: "IBM SkillsBuild",
    type: "Artificial Intelligence",
    category: "Cloud & AI",
    date: "2024-07-20",
    description: "Foundation course in artificial intelligence concepts, machine learning basics, and AI applications",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Analysis", "AI Ethics"],
    certificateImage: "ai-fundamentals.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    issuer: "Cisco",
    type: "Cybersecurity",
    category: "Cybersecurity",
    date: "2024-06-10",
    description: "Comprehensive cybersecurity course covering network security, threat analysis, and security best practices",
    skills: ["Cybersecurity", "Network Security", "Threat Analysis", "Security Protocols"],
    certificateImage: "cybersecurity.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 5,
    title: "Data Science Fundamentals",
    issuer: "IBM SkillsBuild",
    type: "Data Science",
    category: "Data Science",
    date: "2024-05-25",
    description: "Introduction to data science methodologies, statistical analysis, and data visualization techniques",
    skills: ["Data Science", "Statistical Analysis", "Data Visualization", "Python"],
    certificateImage: "data-science.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 6,
    title: "IoT & Digital Transformation",
    issuer: "Cisco",
    type: "Internet of Things",
    category: "Networking",
    date: "2024-04-15",
    description: "Comprehensive course on IoT technologies, digital transformation strategies, and connected systems",
    skills: ["Internet of Things", "Digital Transformation", "Connected Systems", "IoT Security"],
    certificateImage: "iot.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 7,
    title: "Modern AI Applications",
    issuer: "IBM SkillsBuild",
    type: "Artificial Intelligence",
    category: "Cloud & AI",
    date: "2024-10-05",
    description: "Advanced course on modern AI applications, neural networks, and practical AI implementation",
    skills: ["Neural Networks", "AI Applications", "Deep Learning", "AI Implementation"],
    certificateImage: "modern-ai.jpg",
    verificationUrl: null,
    status: "Completed"
  },
  {
    id: 8,
    title: "C Programming Certificate",
    issuer: "Programming Institute",
    type: "Programming Languages",
    category: "Web Development",
    date: "2024-03-20",
    description: "Comprehensive C programming course covering fundamentals, data structures, and system programming",
    skills: ["C Programming", "Data Structures", "System Programming", "Memory Management"],
    certificateImage: "c-certificate.jpg",
    verificationUrl: null,
    status: "Completed"
  }
];

// Hackathon participation and achievements
export const hackathonsData = [
  {
    id: 1,
    name: "Google Cloud Hackathon",
    organizer: "Google Cloud",
    date: "2024-09-15",
    description: "24-hour hackathon focusing on cloud-native solutions and AI integration",
    achievement: "Participation Certificate",
    project: "Cloud-based Task Management System",
    technologies: ["Google Cloud Platform", "Node.js", "React.js", "AI/ML APIs"],
    certificateImage: "google-cloud-hackathon.jpg"
  },
  {
    id: 2,
    name: "AgentLab Innovation Challenge",
    organizer: "AgentLab",
    date: "2024-08-20",
    description: "Innovation challenge focused on AI agents and automation solutions",
    achievement: "Participation Certificate",
    project: "Intelligent Code Review Agent",
    technologies: ["Python", "Machine Learning", "Natural Language Processing"],
    certificateImage: "agentlab-hackathon.jpg"
  },
  {
    id: 3,
    name: "Adobe India Creative Hackathon",
    organizer: "Adobe India",
    date: "2024-07-10",
    description: "Creative technology hackathon combining design and development",
    achievement: "Participation Certificate",
    project: "Interactive Design Tool",
    technologies: ["JavaScript", "Canvas API", "Creative SDK"],
    certificateImage: "adobe-hackathon.jpg"
  },
  {
    id: 4,
    name: "CodeSynthesis Programming Contest",
    organizer: "CodeSynthesis",
    date: "2024-06-05",
    description: "Competitive programming contest with algorithmic challenges",
    achievement: "Participation Certificate",
    project: "Algorithm Optimization Solutions",
    technologies: ["C++", "Data Structures", "Algorithms"],
    certificateImage: "codesynthesis-hackathon.jpg"
  },
  {
    id: 5,
    name: "EdgyBot AI Challenge",
    organizer: "EdgyBot",
    date: "2024-05-15",
    description: "AI and chatbot development challenge",
    achievement: "Participation Certificate",
    project: "Educational Chatbot Assistant",
    technologies: ["Python", "NLP", "Chatbot Frameworks"],
    certificateImage: "edgybot-hackathon.jpg"
  }
];

// Additional achievements and recognitions
export const achievementsData = [
  {
    id: 1,
    title: "Technical Symposium Winner",
    description: "First place in technical paper presentation at college symposium",
    date: "2024-11-20",
    category: "Academic",
    certificateImage: "symposium-certificate.jpg"
  },
  {
    id: 2,
    title: "TOEFL Certification",
    description: "English proficiency certification for international communication",
    date: "2024-10-10",
    category: "Language",
    certificateImage: "toefl-certificate1.jpg"
  },
  {
    id: 3,
    title: "Seed Start Program Graduate",
    description: "Completed entrepreneurship and startup development program",
    date: "2024-09-25",
    category: "Entrepreneurship",
    certificateImage: "certificate-seedstart.jpg"
  }
];

export default {
  certifications: certificationsData,
  hackathons: hackathonsData,
  achievements: achievementsData
};