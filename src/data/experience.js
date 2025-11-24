// ============================================
// 💼 PROFESSIONAL EXPERIENCE DATA
// ============================================
// Add your work experience, internships, and freelance projects here
//
// 📝 HOW TO ADD NEW EXPERIENCE:
// 1. Copy an existing experience object
// 2. Update the id (increment from last entry)
// 3. Update role (your job title)
// 4. Update company name
// 5. Update duration (MM/YYYY - MM/YYYY or "PRESENT")
// 6. Update location (city/remote)
// 7. Update description (brief overview of your role)
// 8. Update technologies array (tech stack you used)
// 9. Update achievements array (your accomplishments)
// 10. Set type: "internship", "full-time", "freelance", "contract"
// 11. Set current: true if still working there, false if not
//
// 💡 TIPS FOR WRITING ACHIEVEMENTS:
// - Use action verbs (Built, Developed, Implemented, Optimized)
// - Include metrics and numbers when possible
// - Focus on impact and results
// - Be specific about technologies used
// - Highlight team collaboration
//
// 📊 EXAMPLE ACHIEVEMENTS:
// - "Built scalable APIs serving 1000+ users"
// - "Reduced query time by 40% through optimization"
// - "Implemented authentication system with 99.9% uptime"
// - "Collaborated with 5-person team in agile environment"
//
// ⏰ DURATION FORMAT:
// - Current job: "MM/YYYY - PRESENT"
// - Past job: "MM/YYYY - MM/YYYY"
// - Example: "07/2024 - PRESENT" or "05/2024 - 06/2024"
// ============================================
export const experienceData = [
  {
    id: 1,
    role: "Full-Stack Intern",
    company: "Znyck Technologies Private Limited",
    duration: "07/2024 - PRESENT",
    location: "Chennai",
    description: "Developing core product features using Node.js, Express.js, PostgreSQL, Supabase, with Dockerized workflows. Contributing to scalable backend architecture and collaborating with cross-functional teams.",
    technologies: ["Node.js", "Express.js", "PostgreSQL", "Supabase", "Docker", "React.js"],
    achievements: [
      "Built scalable backend APIs serving 1000+ concurrent users",
      "Implemented database optimization strategies reducing query time by 40%",
      "Collaborated with frontend team for seamless integration",
      "Developed Dockerized development workflows improving team productivity",
      "Contributed to core product features with 99.9% uptime"
    ],
    type: "internship",
    current: true
  },
  {
    id: 2,
    role: "Backend Developer Intern",
    company: "Zero2Site",
    duration: "05/2024 - 06/2024",
    location: "Chennai",
    description: "Built backend APIs with Node.js, Express.js, MongoDB. Collaborated with frontend team for seamless integration and developed RESTful services for web applications.",
    technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    achievements: [
      "Developed RESTful APIs handling 500+ requests per minute",
      "Integrated with frontend applications using modern JavaScript",
      "Optimized database queries improving response time by 30%",
      "Implemented secure authentication and authorization systems",
      "Collaborated effectively in agile development environment"
    ],
    type: "internship",
    current: false
  }
];

export default experienceData;