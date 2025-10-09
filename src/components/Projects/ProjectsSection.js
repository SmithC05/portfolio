import React, { useState } from 'react';
import SectionHeader from '../Common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectCategories = [
    { id: 'all', name: 'All Projects', icon: '🚀' },
    { id: 'full-stack', name: 'Full-Stack', icon: '🌐' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'real-time', name: 'Real-time', icon: '⚡' }
  ];

  const projectsData = [
    {
      id: 1,
      title: "Airtableclone",
      description: "Full-stack web app for dynamic table creation and management with secure authentication",
      category: "full-stack",
      technologies: ["Node.js", "Express.js", "MongoDB", "React.js"],
      features: [
        "Dynamic table creation and management",
        "Secure user authentication",
        "Real-time data synchronization"
      ],
      githubUrl: "https://github.com/SmithC05/airtableclone",
      liveUrl: null,
      image: "/assets/images/airtableclone-preview.jpg",
      status: "Completed",
      highlights: [
        "Built scalable backend architecture",
        "Implemented secure authentication system",
        "Created intuitive user interface"
      ]
    },
    {
      id: 2,
      title: "Authenticated PDF Generator",
      description: "App for secure PDF generation with user login; future features include file conversion and PDF operations",
      category: "backend",
      technologies: ["Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JS"],
      features: [
        "Secure PDF generation",
        "User authentication system",
        "Planned: Image-to-PDF conversion",
        "Planned: PDF merging and splitting"
      ],
      githubUrl: "https://github.com/SmithC05/Pdf",
      liveUrl: null,
      image: "/assets/images/pdf-generator-preview.jpg",
      status: "In Development",
      highlights: [
        "Secure document processing",
        "User session management",
        "Extensible architecture for future features"
      ]
    },
    {
      id: 3,
      title: "Realtime Chat App",
      description: "Realtime messaging app using Socket.IO. Users can join rooms and chat instantly with a clean UI",
      category: "real-time",
      technologies: ["Node.js", "Express", "Socket.IO", "HTML", "CSS", "JS"],
      features: [
        "Real-time messaging",
        "Room-based chat system",
        "Clean and intuitive UI",
        "Instant message delivery"
      ],
      githubUrl: "https://github.com/SmithC05/Chat",
      liveUrl: null,
      image: "/assets/images/chat-app-preview.jpg",
      status: "Completed",
      highlights: [
        "Real-time bidirectional communication",
        "Scalable room management",
        "Responsive design"
      ]
    }
  ];

  const getFilteredProjects = () => {
    if (activeCategory === 'all') {
      return projectsData;
    }
    return projectsData.filter(project => project.category === activeCategory);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="projects-section section" id="projects">
      <div className="container">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="A showcase of my development work and technical expertise"
          centered={true}
          animated={true}
        />
        
        <div className="projects-section__content">
          {/* Category Filter */}
          <div className="projects-section__filters">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                className={`projects-section__filter-btn ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
                aria-label={`Filter by ${category.name}`}
              >
                <span className="projects-section__filter-icon">{category.icon}</span>
                <span className="projects-section__filter-text">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-section__grid">
            {getFilteredProjects().map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>

          {/* Show message if no projects found */}
          {getFilteredProjects().length === 0 && (
            <div className="projects-section__empty">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          allProjects={projectsData}
          onNavigate={setSelectedProject}
        />
      )}
    </section>
  );
};

export default ProjectsSection;