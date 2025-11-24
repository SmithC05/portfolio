# ⚡ Quick Update Reference

## 📍 Where to Update What

| What to Update | File Location | Line/Section |
|----------------|---------------|--------------|
| **Name, Email, Phone** | `src/data/personalInfo.js` | Lines 15-30 |
| **Resume PDF** | `public/assets/Smith_C_Resume.pdf` | Replace file |
| **GitHub URLs** | `src/data/projects.js` | `githubUrl` field |
| **Live Demo URLs** | `src/data/projects.js` | `liveUrl` field |
| **Certificate URLs** | `src/data/certifications.js` | `verificationUrl` field |
| **Skills & Proficiency** | `src/data/skills.js` | Update `proficiency` (0-100) |
| **Work Experience** | `src/data/experience.js` | Add new entries |
| **Education** | `src/data/education.js` | Update degrees |
| **Social Links** | `src/data/socialLinks.js` | Update URLs |
| **Achievements** | `src/data/certifications.js` | `achievementsData` array |
| **Project Images** | `public/assets/projects/` | Add image files |
| **Certificate Images** | `public/assets/certificates/` | Add image files |

---

## 🔗 Most Important Links to Update

### 1. GitHub Repository Links
```javascript
// File: src/data/projects.js
githubUrl: "https://github.com/YourUsername/repo-name"
```

### 2. Live Demo Links
```javascript
// File: src/data/projects.js
liveUrl: "https://your-project.vercel.app"
```

### 3. Certificate Verification Links
```javascript
// File: src/data/certifications.js
verificationUrl: "https://verify-url.com"
```

### 4. Social Media Links
```javascript
// File: src/data/socialLinks.js
url: "https://github.com/YourUsername"
url: "https://linkedin.com/in/your-profile"
```

---

## 📊 Skill Proficiency Guide

| Level | Percentage | Color | Meaning |
|-------|-----------|-------|---------|
| **Expert** | 90-100% | 🟢 Green | Mastery level |
| **Advanced** | 80-89% | 🔵 Blue | Professional level |
| **Intermediate** | 70-79% | 🟠 Orange | Working knowledge |
| **Beginner** | Below 70% | 🔴 Red | Learning stage |

---

## ✅ Pre-Deployment Checklist

```
□ Updated personal info (name, email, phone)
□ Updated all GitHub repository URLs
□ Updated all live demo URLs  
□ Updated certificate verification URLs
□ Updated social media links (GitHub, LinkedIn)
□ Replaced resume PDF file
□ Updated skills proficiency levels
□ Added/updated work experience
□ Added/updated projects
□ Tested all external links
□ Checked mobile view
```

---

## 🚀 Deploy Commands

```bash
# Test locally
npm start

# Build for production
npm run build

# Deploy to Vercel (auto-deploys on git push)
git add .
git commit -m "Updated portfolio"
git push
```

---

## 📁 File Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── Smith_C_Resume.pdf          ← Your resume
│       ├── projects/                   ← Project images
│       └── certificates/               ← Certificate images
├── src/
│   ├── data/
│   │   ├── personalInfo.js            ← Name, email, phone
│   │   ├── projects.js                ← Projects, GitHub, live URLs
│   │   ├── skills.js                  ← Skills & proficiency
│   │   ├── experience.js              ← Work experience
│   │   ├── education.js               ← Education details
│   │   ├── certifications.js          ← Certificates & achievements
│   │   └── socialLinks.js             ← Social media URLs
│   └── components/
│       ├── Hero/                      ← Hero section (with 👑⚡)
│       ├── Skills/                    ← Skills section
│       ├── Projects/                  ← Projects section
│       ├── Achievements/              ← Achievements section
│       └── Contact/                   ← Contact form
└── UPDATE_GUIDE.md                    ← Detailed guide
```

---

## 🎯 Common Updates

### Add a New Project
1. Open `src/data/projects.js`
2. Copy an existing project object
3. Update: id, title, description, technologies
4. **Update: githubUrl, liveUrl**
5. Add project image to `public/assets/projects/`

### Update a Skill
1. Open `src/data/skills.js`
2. Find the skill
3. Update `proficiency` (0-100)
4. Update `description`

### Add Work Experience
1. Open `src/data/experience.js`
2. Copy an existing entry
3. Update: role, company, duration, achievements
4. Set `current: true` if still working there

### Update Resume
1. Export resume as PDF
2. Replace `public/assets/Smith_C_Resume.pdf`
3. Or update path in `src/data/personalInfo.js`

---

**For detailed instructions, see `UPDATE_GUIDE.md`**
