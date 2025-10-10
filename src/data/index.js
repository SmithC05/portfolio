// Central export file for all portfolio data
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