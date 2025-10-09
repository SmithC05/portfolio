// Social media and professional links data
export const socialLinksData = [
  {
    id: 1,
    platform: "GitHub",
    url: "https://github.com/SmithC05",
    icon: "github-icon.svg",
    username: "SmithC05",
    description: "View my code repositories and open source contributions",
    primary: true,
    stats: {
      repositories: "15+",
      followers: "25+",
      contributions: "200+"
    }
  },
  {
    id: 2,
    platform: "LinkedIn",
    url: "https://linkedin.com/in/mrsmithc",
    icon: "linkedin-icon.svg",
    username: "mrsmithc",
    description: "Connect with me professionally and view my career journey",
    primary: true,
    stats: {
      connections: "150+",
      posts: "20+",
      endorsements: "30+"
    }
  },
  {
    id: 3,
    platform: "Email",
    url: "mailto:msmithcit@gmail.com",
    icon: "email-icon.svg",
    username: "msmithcit@gmail.com",
    description: "Send me an email for professional inquiries",
    primary: true,
    stats: null
  },
  {
    id: 4,
    platform: "Phone",
    url: "tel:+919361491329",
    icon: "phone-icon.svg",
    username: "+91-9361491329",
    description: "Call me for urgent professional matters",
    primary: true,
    stats: null
  },
  {
    id: 5,
    platform: "LeetCode",
    url: "https://leetcode.com/SmithC05",
    icon: "leetcode-icon.svg",
    username: "SmithC05",
    description: "Check out my coding problem-solving skills",
    primary: false,
    stats: {
      problems: "100+",
      ranking: "Top 20%",
      streak: "30 days"
    }
  },
  {
    id: 6,
    platform: "CodeChef",
    url: "https://codechef.com/users/smithc05",
    icon: "codechef-icon.svg",
    username: "smithc05",
    description: "View my competitive programming achievements",
    primary: false,
    stats: {
      rating: "1500+",
      contests: "15+",
      rank: "3 Star"
    }
  },
  {
    id: 7,
    platform: "Portfolio",
    url: "https://smithc-portfolio.vercel.app",
    icon: "portfolio-icon.svg",
    username: "Portfolio Website",
    description: "Visit my complete portfolio website",
    primary: false,
    stats: null
  }
];

// Contact information for different purposes
export const contactInfo = {
  professional: {
    email: "msmithcit@gmail.com",
    phone: "+91-9361491329",
    location: "Chennai, Tamil Nadu, India",
    availability: "Open to opportunities",
    preferredContact: "email",
    responseTime: "Within 24 hours"
  },
  social: {
    primary: socialLinksData.filter(link => link.primary),
    secondary: socialLinksData.filter(link => !link.primary)
  },
  resume: {
    downloadUrl: "/assets/Smith_C_Resume.pdf",
    lastUpdated: "2024-12-01",
    format: "PDF",
    size: "2.5 MB"
  }
};

export default {
  socialLinks: socialLinksData,
  contactInfo: contactInfo
};