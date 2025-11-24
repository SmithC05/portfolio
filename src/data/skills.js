// ============================================
// 💻 TECHNICAL SKILLS DATA
// ============================================
// Update your technical skills and proficiency levels here
//
// 📝 HOW TO UPDATE SKILLS:
// 1. Find the category: frontend, backend, database, tools, or other
// 2. Update existing skills or add new ones
// 3. Set proficiency level (0-100):
//    - 90-100: Expert level
//    - 80-89: Advanced level
//    - 70-79: Intermediate level
//    - Below 70: Beginner level
// 4. Update icon (FontAwesome class name)
// 5. Update description with your experience
//
// 🎨 SKILL ICONS:
// - Use FontAwesome icons: https://fontawesome.com/icons
// - Format: "fab fa-react" or "fas fa-code"
// - Common icons:
//   - React: "fab fa-react"
//   - JavaScript: "fab fa-js-square"
//   - Node.js: "fab fa-node-js"
//   - Python: "fab fa-python"
//   - Database: "fas fa-database"
//   - Code: "fas fa-code"
//
// 📊 PROFICIENCY LEVELS:
// - The circular progress bar will fill based on your percentage
// - Be honest about your skill levels
// - Update as you improve!
//
// ➕ TO ADD A NEW SKILL:
// Copy this template and add to the appropriate category:
// { 
//   name: "Skill Name", 
//   proficiency: 85, 
//   icon: "fab fa-icon-name",
//   description: "Brief description of your experience"
// }
// ============================================
export const skillsData = {
  frontend: [
    { 
      name: "React.js", 
      proficiency: 85, 
      icon: "fab fa-react",
      description: "Building dynamic user interfaces and single-page applications"
    },
    { 
      name: "JavaScript", 
      proficiency: 90, 
      icon: "fab fa-js-square",
      description: "Modern ES6+ JavaScript for frontend and backend development"
    },
    { 
      name: "TypeScript", 
      proficiency: 80, 
      icon: "fas fa-code",
      description: "Type-safe JavaScript development for large-scale applications"
    },
    { 
      name: "HTML/CSS", 
      proficiency: 95, 
      icon: "fab fa-html5",
      description: "Semantic HTML and modern CSS including Flexbox and Grid"
    },
    { 
      name: "Responsive Design", 
      proficiency: 88, 
      icon: "fas fa-mobile-alt",
      description: "Mobile-first responsive web design principles"
    }
  ],
  backend: [
    { 
      name: "Node.js", 
      proficiency: 88, 
      icon: "fab fa-node-js",
      description: "Server-side JavaScript runtime for scalable applications"
    },
    { 
      name: "Express.js", 
      proficiency: 85, 
      icon: "fas fa-server",
      description: "Fast and minimalist web framework for Node.js"
    },
    { 
      name: "Python", 
      proficiency: 80, 
      icon: "fab fa-python",
      description: "Backend development and automation scripting"
    },
    { 
      name: "Java", 
      proficiency: 75, 
      icon: "fab fa-java",
      description: "Object-oriented programming and enterprise applications"
    },
    { 
      name: "C/C++", 
      proficiency: 82, 
      icon: "fas fa-code",
      description: "System programming and competitive programming"
    }
  ],
  databases: [
    { 
      name: "MongoDB", 
      proficiency: 85, 
      icon: "fas fa-database",
      description: "NoSQL database for flexible document storage"
    },
    { 
      name: "PostgreSQL", 
      proficiency: 80, 
      icon: "fas fa-database",
      description: "Advanced relational database with modern features"
    },
    { 
      name: "MySQL", 
      proficiency: 75, 
      icon: "fas fa-database",
      description: "Traditional relational database management"
    },
    { 
      name: "Supabase", 
      proficiency: 78, 
      icon: "fas fa-cloud-upload-alt",
      description: "Open-source Firebase alternative with PostgreSQL"
    }
  ],
  tools: [
    { 
      name: "Git/GitHub", 
      proficiency: 90, 
      icon: "fab fa-git-alt",
      description: "Version control and collaborative development"
    },
    { 
      name: "Docker", 
      proficiency: 75, 
      icon: "fab fa-docker",
      description: "Containerization and deployment workflows"
    },
    { 
      name: "VS Code", 
      proficiency: 95, 
      icon: "fas fa-code",
      description: "Primary development environment and extensions"
    },
    { 
      name: "Postman", 
      proficiency: 85, 
      icon: "fas fa-paper-plane",
      description: "API testing and development tools"
    },
    { 
      name: "Linux", 
      proficiency: 70, 
      icon: "fab fa-linux",
      description: "Command line operations and server management"
    }
  ]
};

// Skill categories for filtering
export const skillCategories = [
  { id: 'all', name: 'All Skills', count: 0 },
  { id: 'frontend', name: 'Frontend', count: skillsData.frontend.length },
  { id: 'backend', name: 'Backend', count: skillsData.backend.length },
  { id: 'databases', name: 'Databases', count: skillsData.databases.length },
  { id: 'tools', name: 'Tools', count: skillsData.tools.length }
];

// Calculate total skills count
skillCategories[0].count = Object.values(skillsData).reduce((total, category) => total + category.length, 0);

export default skillsData;