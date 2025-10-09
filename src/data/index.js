// Central export file for all portfolio data
export { default as personalInfo } from './personalInfo';
export { default as experienceData } from './experience';
export { default as educationData } from './education';
export { default as skillsData, skillCategories } from './skills';
export { default as projectsData, projectCategories } from './projects';
export { default as certificationsData, hackathonsData, achievementsData } from './certifications';
export { default as socialLinksData, contactInfo } from './socialLinks';

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