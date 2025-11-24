# 📋 Portfolio Update Guide

## Quick Reference: Where to Update Everything

### 🎯 Personal Information
**File:** `src/data/personalInfo.js`
- Name, title, email, phone
- Professional summary
- Years of experience, project count
- Resume file path

### 💼 Work Experience
**File:** `src/data/experience.js`
- Job titles and companies
- Duration and location
- Responsibilities and achievements
- Technologies used

### 🎓 Education
**File:** `src/data/education.js`
- Degrees and institutions
- CGPA/grades
- Relevant coursework
- Academic achievements

### 💻 Technical Skills
**File:** `src/data/skills.js`
- Skill names and proficiency levels (0-100%)
- Skill categories (frontend, backend, database, tools)
- Skill descriptions
- FontAwesome icons

### 🚀 Projects
**File:** `src/data/projects.js`
- Project titles and descriptions
- **GitHub repository URLs** ← Update here!
- **Live demo URLs** ← Update here!
- Technologies used
- Project images
- Features and highlights

### 🏆 Certifications
**File:** `src/data/certifications.js`
- Certificate names and issuers
- **Certificate URLs** ← Update here!
- Certificate images
- Skills learned
- Completion dates

### 🎖️ Achievements & Hackathons
**File:** `src/data/certifications.js`
- Hackathon participations
- Awards and recognitions
- Competition results
- Achievement descriptions

### 🔗 Social Links
**File:** `src/data/socialLinks.js`
- **GitHub profile URL** ← Update here!
- **LinkedIn profile URL** ← Update here!
- Email and phone
- LeetCode, CodeChef profiles
- Portfolio URL

### 📄 Resume PDF
**File:** `public/assets/Smith_C_Resume.pdf`
- Replace this file with your updated resume
- Keep the same filename or update path in `personalInfo.js`

---

## 📝 Detailed Update Instructions

### 1. Updating Personal Information

Open `src/data/personalInfo.js` and update:

```javascript
export const personalInfo = {
  name: "Your Name",              // Your full name
  title: "Your Title",            // Your main role
  email: "your@email.com",        // Your email
  phone: "+1-234-567-8900",       // Your phone
  location: "Your City, Country", // Your location
  summary: "Your bio...",         // Your professional summary
  metrics: {
    experience: "X+ Years",       // Years of experience
    projects: "X Projects",       // Number of projects
    technologies: "X+ Technologies" // Tech stack count
  },
  resumeUrl: "/assets/Your_Resume.pdf" // Resume file path
};
```

### 2. Adding a New Project

Open `src/data/projects.js` and add:

```javascript
{
  id: 7, // Increment from last project
  title: "Your Project Name",
  description: "Short description",
  longDescription: "Detailed description",
  category: "Full-Stack", // or "Backend", "Frontend", "Real-Time"
  technologies: ["React", "Node.js", "MongoDB"],
  features: [
    "Feature 1",
    "Feature 2"
  ],
  githubUrl: "https://github.com/yourusername/repo", // ← Your GitHub repo
  liveUrl: "https://yourproject.vercel.app",         // ← Your live demo
  image: "/assets/projects/project-image.png",       // ← Your project image
  status: "Completed", // or "In Development"
  highlights: [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

### 3. Adding a New Skill

Open `src/data/skills.js` and add to the appropriate category:

```javascript
{
  name: "Skill Name",
  proficiency: 85,              // 0-100 (90-100: Expert, 80-89: Advanced, 70-79: Intermediate)
  icon: "fab fa-icon-name",     // FontAwesome icon
  description: "Your experience with this skill"
}
```

**Proficiency Levels:**
- 90-100%: Expert (Green progress bar)
- 80-89%: Advanced (Blue progress bar)
- 70-79%: Intermediate (Orange progress bar)
- Below 70%: Beginner (Red progress bar)

### 4. Adding a New Certification

Open `src/data/certifications.js` and add:

```javascript
{
  id: 6, // Increment from last certification
  title: "Certificate Name",
  issuer: "Issuing Organization",
  type: "Professional Development",
  category: "Web Development",
  date: "2024-12-01", // YYYY-MM-DD format
  description: "What you learned",
  skills: ["Skill 1", "Skill 2"],
  certificateImage: "/assets/certificates/cert.jpg", // ← Your certificate image
  verificationUrl: "https://verify-url.com",         // ← Verification link
  status: "Completed"
}
```

### 5. Updating Social Links

Open `src/data/socialLinks.js` and update:

```javascript
{
  id: 1,
  platform: "GitHub",
  url: "https://github.com/YourUsername",  // ← Update your GitHub URL
  username: "YourUsername",
  primary: true // Set true for main platforms
}
```

### 6. Adding Work Experience

Open `src/data/experience.js` and add:

```javascript
{
  id: 3, // Increment from last entry
  role: "Your Job Title",
  company: "Company Name",
  duration: "MM/YYYY - PRESENT", // or "MM/YYYY - MM/YYYY"
  location: "City, Country",
  description: "Brief overview of your role",
  technologies: ["Tech 1", "Tech 2"],
  achievements: [
    "Built X feature serving Y users",
    "Reduced Z by 40%"
  ],
  type: "internship", // or "full-time", "freelance"
  current: true // true if still working there
}
```

### 7. Updating Resume

1. Export your resume as PDF
2. Name it (e.g., `Your_Name_Resume.pdf`)
3. Place it in `public/assets/` folder
4. Update the path in `src/data/personalInfo.js`:

```javascript
resumeUrl: "/assets/Your_Name_Resume.pdf"
```

---

## 🖼️ Adding Images

### Project Images
1. Place images in `public/assets/projects/`
2. Update in `src/data/projects.js`:
```javascript
image: "/assets/projects/your-project.png"
```

### Certificate Images
1. Place images in `public/assets/certificates/`
2. Update in `src/data/certifications.js`:
```javascript
certificateImage: "/assets/certificates/your-cert.jpg"
```

### Profile Image
1. Place image in `public/assets/`
2. Update in `src/data/personalInfo.js`:
```javascript
profileImage: "/assets/your-profile.jpg"
```

---

## 🔗 Important Links to Update

### GitHub Repository URLs
**File:** `src/data/projects.js`
```javascript
githubUrl: "https://github.com/YourUsername/repo-name"
```

### Live Demo URLs
**File:** `src/data/projects.js`
```javascript
liveUrl: "https://your-project.vercel.app"
```

### Certificate Verification URLs
**File:** `src/data/certifications.js`
```javascript
verificationUrl: "https://verify.certificate.com/your-cert"
```

### Social Media URLs
**File:** `src/data/socialLinks.js`
- GitHub: `https://github.com/YourUsername`
- LinkedIn: `https://linkedin.com/in/your-profile`
- LeetCode: `https://leetcode.com/YourUsername`
- CodeChef: `https://codechef.com/users/yourusername`

---

## 🎨 Customization

### Changing Colors
**File:** `src/styles/globals.css`
- Update CSS variables for theme colors
- Main colors: `--color-primary`, `--color-secondary`

### Updating Marquee Text
**File:** `src/App.js` (line ~90)
```javascript
<p>Your Name - Your Title | Your Skills | Your Email | Your Message</p>
```

### Signature Elements (Crown 👑 & Thunder ⚡)
**File:** `src/components/Hero/HeroSection.js`
- Crown appears next to your name
- Thunder appears on the name underline
- Floating elements around profile image

---

## 🚀 Deployment

### Vercel Deployment
1. Push changes to GitHub
2. Vercel will auto-deploy
3. Check your live site

### Manual Deployment
```bash
npm run build
# Upload 'build' folder to your hosting
```

---

## ✅ Checklist Before Deployment

- [ ] Updated personal information
- [ ] Updated all project GitHub URLs
- [ ] Updated all project live demo URLs
- [ ] Updated certificate URLs
- [ ] Updated social media links
- [ ] Replaced resume PDF
- [ ] Added project images
- [ ] Updated skills and proficiency levels
- [ ] Updated work experience
- [ ] Updated education details
- [ ] Tested all links
- [ ] Checked mobile responsiveness

---

## 📞 Need Help?

If you encounter any issues:
1. Check the comments in each data file
2. Refer to existing examples in the code
3. Test locally before deploying: `npm start`
4. Check browser console for errors

---

## 🎯 Quick Tips

1. **Be Honest**: Set realistic proficiency levels for skills
2. **Use Metrics**: Include numbers in achievements (e.g., "Reduced load time by 40%")
3. **Keep Updated**: Regularly update your portfolio with new projects and skills
4. **Test Links**: Always verify GitHub, live demo, and certificate URLs work
5. **Optimize Images**: Compress images before adding to keep site fast
6. **Mobile First**: Check how everything looks on mobile devices

---

**Last Updated:** December 2024
**Version:** 1.0.0
