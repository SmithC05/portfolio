// Technical skills and proficiency data
export const skillsData = {
  frontend: [
    { 
      name: "React.js", 
      proficiency: 85, 
      icon: "react-icon.svg",
      description: "Building dynamic user interfaces and single-page applications"
    },
    { 
      name: "JavaScript", 
      proficiency: 90, 
      icon: "js-icon.svg",
      description: "Modern ES6+ JavaScript for frontend and backend development"
    },
    { 
      name: "TypeScript", 
      proficiency: 80, 
      icon: "ts-icon.svg",
      description: "Type-safe JavaScript development for large-scale applications"
    },
    { 
      name: "HTML/CSS", 
      proficiency: 95, 
      icon: "html-icon.svg",
      description: "Semantic HTML and modern CSS including Flexbox and Grid"
    },
    { 
      name: "Responsive Design", 
      proficiency: 88, 
      icon: "responsive-icon.svg",
      description: "Mobile-first responsive web design principles"
    }
  ],
  backend: [
    { 
      name: "Node.js", 
      proficiency: 88, 
      icon: "nodejs-icon.svg",
      description: "Server-side JavaScript runtime for scalable applications"
    },
    { 
      name: "Express.js", 
      proficiency: 85, 
      icon: "express-icon.svg",
      description: "Fast and minimalist web framework for Node.js"
    },
    { 
      name: "Python", 
      proficiency: 80, 
      icon: "python-icon.svg",
      description: "Backend development and automation scripting"
    },
    { 
      name: "Java", 
      proficiency: 75, 
      icon: "java-icon.svg",
      description: "Object-oriented programming and enterprise applications"
    },
    { 
      name: "C/C++", 
      proficiency: 82, 
      icon: "cpp-icon.svg",
      description: "System programming and competitive programming"
    }
  ],
  databases: [
    { 
      name: "MongoDB", 
      proficiency: 85, 
      icon: "mongodb-icon.svg",
      description: "NoSQL database for flexible document storage"
    },
    { 
      name: "PostgreSQL", 
      proficiency: 80, 
      icon: "postgresql-icon.svg",
      description: "Advanced relational database with modern features"
    },
    { 
      name: "MySQL", 
      proficiency: 75, 
      icon: "mysql-icon.svg",
      description: "Traditional relational database management"
    },
    { 
      name: "Supabase", 
      proficiency: 78, 
      icon: "supabase-icon.svg",
      description: "Open-source Firebase alternative with PostgreSQL"
    }
  ],
  tools: [
    { 
      name: "Git/GitHub", 
      proficiency: 90, 
      icon: "git-icon.svg",
      description: "Version control and collaborative development"
    },
    { 
      name: "Docker", 
      proficiency: 75, 
      icon: "docker-icon.svg",
      description: "Containerization and deployment workflows"
    },
    { 
      name: "VS Code", 
      proficiency: 95, 
      icon: "vscode-icon.svg",
      description: "Primary development environment and extensions"
    },
    { 
      name: "Postman", 
      proficiency: 85, 
      icon: "postman-icon.svg",
      description: "API testing and development tools"
    },
    { 
      name: "Linux", 
      proficiency: 70, 
      icon: "linux-icon.svg",
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