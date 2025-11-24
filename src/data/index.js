// ============================================
// 📋 CENTRAL DATA EXPORT FILE
// ============================================
// This is the main hub for all your portfolio data
//
// 🎯 QUICK UPDATE GUIDE:
//
// 1️⃣ PERSONAL INFO (Name, Email, Resume)
//    📁 File: src/data/personalInfo.js
//    ✏️ Update: Name, title, email, phone, summary, metrics
//
// 2️⃣ WORK EXPERIENCE
//    📁 File: src/data/experience.js
//    ✏️ Update: Job titles, companies, dates, responsibilities
//
// 3️⃣ EDUCATION
//    📁 File: src/data/education.js
//    ✏️ Update: Degrees, schools, graduation dates
//
// 4️⃣ SKILLS
//    📁 File: src/data/skills.js
//    ✏️ Update: Technical skills, proficiency levels (0-100%)
//
// 5️⃣ PROJECTS
//    📁 File: src/data/projects.js
//    ✏️ Update: Project names, descriptions, GitHub links, live URLs
//
// 6️⃣ CERTIFICATIONS & ACHIEVEMENTS
//    📁 File: src/data/certifications.js
//    ✏️ Update: Certificate names, URLs, hackathons, achievements
//
// 7️⃣ SOCIAL LINKS (GitHub, LinkedIn, etc.)
//    📁 File: src/data/socialLinks.js
//    ✏️ Update: Social media URLs, contact information
//
// 8️⃣ RESUME PDF
//    📁 File: public/assets/Smith_C_Resume.pdf
//    ✏️ Replace with your updated resume (keep same name or update path in personalInfo.js)
//
// ============================================
import { personalInfo } from './personalInfo';
import { experienceData } from './experience';
import { educationData } from './education';
import { skillsData, skillCategories } from './skills';
import { projectsData, projectCategories } from './projects';
import { certificationsData, hackathonsData, achievementsData } from './certifications';
import { socialLinksData, contactInfo } from './socialLinks';

// Re-export all data
export { personalInfo } from './personalInfo';
export { experienceData } from './experience';
export { educationData } from './education';
export { skillsData, skillCategories } from './skills';
export { projectsData, projectCategories } from './projects';
export { certificationsData, hackathonsData, achievementsData } from './certifications';
export { socialLinksData, contactInfo } from './socialLinks';

// Combined export for easy access
export const portfolioData = {
  personal: personalInfo,
  experience: experienceData,
  education: educationData,
  skills: skillsData,
  skillCategories: skillCategories,
  projects: projectsData,
  projectCategories: projectCategories,
  certifications: certificationsData,
  hackathons: hackathonsData,
  achievements: achievementsData,
  socialLinks: socialLinksData,
  contact: contactInfo
};

export default portfolioData;