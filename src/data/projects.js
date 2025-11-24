// ============================================
// 💼 PROJECTS DATA
// ============================================
// Add, update, or remove your projects here
//
// 📝 HOW TO ADD A NEW PROJECT:
// 1. Copy an existing project object
// 2. Update the id (increment from last project)
// 3. Update title, description, and longDescription
// 4. Update category: "Full-Stack", "Backend", "Frontend", "Real-Time"
// 5. Update technologies array with tech stack used
// 6. Update features array with key features
// 7. Add your GitHub repository URL in githubUrl
// 8. Add live demo URL in liveUrl (or null if not deployed)
// 9. Add project image path or use PROJECT_PLACEHOLDER
// 10. Update status: "Completed", "In Development", "Planning"
// 11. Update dates, highlights, challenges, and learnings
//
// 🖼️ TO ADD PROJECT IMAGES:
// - Place images in public/assets/projects/ folder
// - Update image path: "/assets/projects/your-project.png"
// - Or use PROJECT_PLACEHOLDER for now
//
// 🔗 IMPORTANT LINKS:
// - githubUrl: Your GitHub repository URL
// - liveUrl: Your deployed project URL (Vercel, Netlify, etc.)
// ============================================

// Using a simple base64 1x1 pixel image to prevent any network requests
const PROJECT_PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
export const projectsData = [
  {
    id: 1,
    title: "Airtableclone",
    description: "Full-stack web app for dynamic table creation and management with secure authentication",
    longDescription: "A comprehensive Airtable clone that allows users to create, manage, and manipulate dynamic tables with a user-friendly interface. Features secure user authentication, real-time data synchronization, and intuitive table management capabilities.",
    category: "Full-Stack",
    technologies: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT", "CSS3"],
    features: [
      "Dynamic table creation and management",
      "Secure user authentication with JWT",
      "Real-time data synchronization",
      "Intuitive drag-and-drop interface",
      "Responsive design for all devices",
      "Data export and import functionality"
    ],
    githubUrl: "https://github.com/SmithC05/airtableclone",
    liveUrl: null,
    image: PROJECT_PLACEHOLDER,
    gallery: [PROJECT_PLACEHOLDER],
    status: "Completed",
    startDate: "2024-08-01",
    endDate: "2024-10-15",
    highlights: [
      "Built scalable backend architecture",
      "Implemented secure authentication system",
      "Created responsive user interface",
      "Achieved 99% uptime in testing"
    ],
    challenges: "Implementing real-time synchronization across multiple users while maintaining data consistency",
    learnings: "Gained deep understanding of full-stack development, database design, and user authentication"
  },
  {
    id: 2,
    title: "Authenticated PDF Generator",
    description: "App for secure PDF generation with user login; future features include file conversion and PDF operations",
    longDescription: "A secure PDF generation application that allows authenticated users to create, manage, and manipulate PDF documents. The application includes user authentication, secure file handling, and plans for advanced PDF operations.",
    category: "Backend",
    technologies: ["Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript", "PDF-lib"],
    features: [
      "Secure PDF generation from templates",
      "User authentication and session management",
      "File upload and processing",
      "PDF preview functionality",
      "Secure file storage and retrieval",
      "Planned: Image-to-PDF conversion",
      "Planned: PDF merging and splitting",
      "Planned: Digital signature support"
    ],
    githubUrl: "https://github.com/SmithC05/Pdf",
    liveUrl: null,
    image: PROJECT_PLACEHOLDER,
    gallery: [PROJECT_PLACEHOLDER],
    status: "In Development",
    startDate: "2024-11-01",
    endDate: null,
    highlights: [
      "Implemented secure file handling",
      "Built robust authentication system",
      "Created efficient PDF generation pipeline",
      "Designed scalable architecture for future features"
    ],
    challenges: "Handling large file uploads and ensuring secure PDF generation without compromising performance",
    learnings: "Advanced understanding of file handling, PDF manipulation, and secure backend development"
  },
  {
    id: 3,
    title: "Realtime Chat App",
    description: "Realtime messaging app using Socket.IO. Users can join rooms and chat instantly with a clean UI",
    longDescription: "A real-time chat application that enables instant messaging between users in different chat rooms. Built with Socket.IO for real-time communication and features a clean, intuitive user interface.",
    category: "Real-time",
    technologies: ["Node.js", "Express", "Socket.IO", "HTML", "CSS", "JavaScript"],
    features: [
      "Real-time messaging with Socket.IO",
      "Room-based chat system",
      "Clean and intuitive user interface",
      "Instant message delivery",
      "User presence indicators",
      "Message history persistence",
      "Responsive design for mobile and desktop",
      "Emoji support and message formatting"
    ],
    githubUrl: "https://github.com/SmithC05/Chat",
    liveUrl: null,
    image: PROJECT_PLACEHOLDER,
    gallery: [PROJECT_PLACEHOLDER],
    status: "Completed",
    startDate: "2024-06-15",
    endDate: "2024-07-30",
    highlights: [
      "Implemented real-time bidirectional communication",
      "Created scalable room-based architecture",
      "Designed responsive and accessible UI",
      "Achieved sub-100ms message delivery"
    ],
    challenges: "Managing multiple concurrent connections and ensuring message delivery reliability",
    learnings: "Mastered WebSocket technology, real-time communication patterns, and event-driven architecture"
  },
  {
    id: 4,
    title: "E-commerce API",
    description: "RESTful API for e-commerce platform with product management, user authentication, and order processing",
    longDescription: "A comprehensive RESTful API for an e-commerce platform featuring complete product management, secure user authentication, shopping cart functionality, and order processing capabilities.",
    category: "Backend",
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt", "Stripe API"],
    features: [
      "Complete product CRUD operations",
      "Secure user authentication and authorization",
      "Shopping cart management",
      "Order processing and tracking",
      "Payment integration with Stripe",
      "Admin dashboard functionality",
      "Inventory management",
      "Email notifications"
    ],
    githubUrl: "https://github.com/SmithC05/ecommerce-api",
    liveUrl: null,
    image: PROJECT_PLACEHOLDER,
    gallery: [PROJECT_PLACEHOLDER],
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2024-05-15",
    highlights: [
      "Built comprehensive RESTful API",
      "Implemented secure payment processing",
      "Created efficient database schema",
      "Achieved 99.9% API uptime"
    ],
    challenges: "Implementing secure payment processing and managing complex order workflows",
    learnings: "Deep understanding of API design, payment systems, and e-commerce business logic"
  },
  {
    id: 5,
    title: "Task Management System",
    description: "Full-stack task management application with team collaboration features and real-time updates",
    longDescription: "A comprehensive task management system that enables teams to collaborate effectively with real-time updates, task assignments, progress tracking, and deadline management.",
    category: "Full-Stack",
    technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Socket.IO", "Material-UI"],
    features: [
      "Task creation and assignment",
      "Real-time collaboration",
      "Progress tracking and analytics",
      "Team management functionality",
      "Deadline and reminder system",
      "File attachments and comments",
      "Kanban board interface",
      "Mobile-responsive design"
    ],
    githubUrl: "https://github.com/SmithC05/task-management",
    liveUrl: null,
    image: PROJECT_PLACEHOLDER,
    gallery: [PROJECT_PLACEHOLDER],
    status: "In Development",
    startDate: "2024-12-01",
    endDate: null,
    highlights: [
      "Implemented real-time collaboration features",
      "Created intuitive Kanban board interface",
      "Built comprehensive analytics dashboard",
      "Designed scalable team management system"
    ],
    challenges: "Balancing real-time updates with performance optimization for large teams",
    learnings: "Advanced React patterns, real-time data synchronization, and team collaboration workflows"
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with location-based forecasts, historical data, and weather alerts",
    longDescription: "A comprehensive weather dashboard that provides real-time weather information, forecasts, historical data analysis, and weather alerts for multiple locations with an intuitive user interface.",
    category: "Frontend",
    technologies: ["React.js", "JavaScript", "Chart.js", "OpenWeather API", "CSS3", "Responsive Design"],
    features: [
      "Real-time weather data display",
      "7-day weather forecast",
      "Historical weather data charts",
      "Location-based weather search",
      "Weather alerts and notifications",
      "Interactive weather maps",
      "Favorite locations management",
      "Dark/light theme toggle"
    ],
    githubUrl: "https://github.com/SmithC05/weather-dashboard",
    liveUrl: "https://weather-dashboard-smith.vercel.app",
    image: PROJECT_PLACEHOLDER,
    gallery: [PROJECT_PLACEHOLDER],
    status: "Completed",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    highlights: [
      "Integrated multiple weather APIs",
      "Created interactive data visualizations",
      "Implemented responsive design patterns",
      "Achieved excellent user experience scores"
    ],
    challenges: "Handling multiple API integrations and creating smooth data visualizations",
    learnings: "API integration best practices, data visualization techniques, and advanced CSS animations"
  }
];

// Project categories for filtering
export const projectCategories = [
  { id: 'all', name: 'All Projects', count: projectsData.length },
  { id: 'Full-Stack', name: 'Full-Stack', count: projectsData.filter(p => p.category === 'Full-Stack').length },
  { id: 'Backend', name: 'Backend', count: projectsData.filter(p => p.category === 'Backend').length },
  { id: 'Frontend', name: 'Frontend', count: projectsData.filter(p => p.category === 'Frontend').length },
  { id: 'Real-time', name: 'Real-time', count: projectsData.filter(p => p.category === 'Real-time').length }
];

export default projectsData;