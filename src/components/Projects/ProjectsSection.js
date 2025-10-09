import React, { useState } from 'react';
import SectionHeader from '../Common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projectsData, projectCategories } from '../../data';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Add icons to imported project categories
  const categoriesWithIcons = [
    { ...projectCategories[0], icon: '🚀' },
    { ...projectCategories[1], icon: '🌐' },
    { ...projectCategories[2], icon: '⚙️' },
    { ...projectCategories[3], icon: '🎨' },
    { ...projectCategories[4], icon: '⚡' }
  ];

  const getFilteredProjects = () => {
    if (activeCategory === 'all') {
      return projectsData;
    }
    return projectsData.filter(project => 
      project.category.toLowerCase() === activeCategory.toLowerCase() ||
      project.category.toLowerCase().replace('-', '') === activeCategory.toLowerCase().replace('-', '')
    );
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
            {categoriesWithIcons.map((category) => (
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