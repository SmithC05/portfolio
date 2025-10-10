import React, { useState, useMemo } from 'react';
import SectionHeader from '../Common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projectsData, projectCategories } from '../../data';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Calculate project statistics
  const projectStats = useMemo(() => {
    const totalProjects = projectsData.length;
    const completedProjects = projectsData.filter(p => p.status.toLowerCase() === 'completed').length;
    const inProgressProjects = projectsData.filter(p => p.status.toLowerCase() === 'in progress').length;
    const technologies = [...new Set(projectsData.flatMap(p => p.technologies))].length;
    
    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      technologies
    };
  }, []);

  // Modern category design
  const categoriesWithIcons = [
    { ...projectCategories[0], icon: 'fas fa-th-large', color: 'from-purple-500 to-pink-500' },
    { ...projectCategories[1], icon: 'fas fa-globe-americas', color: 'from-blue-500 to-cyan-500' },
    { ...projectCategories[2], icon: 'fas fa-server', color: 'from-green-500 to-emerald-500' },
    { ...projectCategories[3], icon: 'fas fa-paint-brush', color: 'from-orange-500 to-red-500' },
    { ...projectCategories[4], icon: 'fas fa-bolt', color: 'from-indigo-500 to-purple-500' }
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
          title="Project Showcase" 
          subtitle="Innovative solutions built with passion and precision"
          centered={true}
          animated={true}
        />
        
        {/* Modern Project Metrics */}
        <div className="projects-metrics">
          <div className="projects-metrics__container">
            <div className="project-metric-card">
              <div className="metric-visual">
                <div className="metric-circle metric-circle--total">
                  <div className="metric-inner">
                    <i className="fas fa-rocket"></i>
                  </div>
                </div>
              </div>
              <div className="metric-info">
                <div className="metric-number">{projectStats.totalProjects}</div>
                <div className="metric-label">Total Projects</div>
                <div className="metric-description">Built from concept to deployment</div>
              </div>
            </div>

            <div className="project-metric-card">
              <div className="metric-visual">
                <div className="metric-circle metric-circle--completed">
                  <div className="metric-inner">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>
              <div className="metric-info">
                <div className="metric-number">{projectStats.completedProjects}</div>
                <div className="metric-label">Completed</div>
                <div className="metric-description">Successfully delivered solutions</div>
              </div>
            </div>

            <div className="project-metric-card">
              <div className="metric-visual">
                <div className="metric-circle metric-circle--progress">
                  <div className="metric-inner">
                    <i className="fas fa-cog"></i>
                  </div>
                </div>
              </div>
              <div className="metric-info">
                <div className="metric-number">{projectStats.inProgressProjects}</div>
                <div className="metric-label">In Progress</div>
                <div className="metric-description">Currently under development</div>
              </div>
            </div>

            <div className="project-metric-card">
              <div className="metric-visual">
                <div className="metric-circle metric-circle--tech">
                  <div className="metric-inner">
                    <i className="fas fa-code"></i>
                  </div>
                </div>
              </div>
              <div className="metric-info">
                <div className="metric-number">{projectStats.technologies}+</div>
                <div className="metric-label">Technologies</div>
                <div className="metric-description">Diverse tech stack mastery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Controls */}
        <div className="projects-controls">
          {/* Category Filters */}
          <div className="projects-filters">
            {categoriesWithIcons.map((category) => (
              <button
                key={category.id}
                className={`project-filter-chip ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
                aria-label={`Filter by ${category.name}`}
              >
                <div className="filter-chip-icon">
                  <i className={category.icon}></i>
                </div>
                <span className="filter-chip-text">{category.name}</span>
                <div className="filter-chip-count">
                  {category.id === 'all' ? projectStats.totalProjects : getFilteredProjects().length}
                </div>
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <i className="fas fa-th"></i>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="modern-projects-grid">
          {getFilteredProjects().map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
              index={index}
            />
          ))}
        </div>

        {/* Show message if no projects found */}
        {getFilteredProjects().length === 0 && (
          <div className="projects-grid-empty">
            <div className="empty-state-animation">
              <div className="empty-orb"></div>
              <div className="empty-rings">
                <div className="empty-ring"></div>
                <div className="empty-ring"></div>
                <div className="empty-ring"></div>
              </div>
            </div>
            <h3>No Projects Found</h3>
            <p>Try selecting a different category to explore more projects.</p>
          </div>
        )}
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