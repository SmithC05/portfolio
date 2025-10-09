import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const {
    title,
    description,
    technologies,
    status,
    githubUrl,
    liveUrl,
    image,
    category
  } = project;

  const handleCardClick = () => {
    if (onClick) {
      onClick(project);
    }
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'in development':
        return '#FF9800';
      case 'planning':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'full-stack':
        return '🌐';
      case 'backend':
        return '⚙️';
      case 'real-time':
        return '⚡';
      default:
        return '🚀';
    }
  };

  return (
    <div className="project-card" onClick={handleCardClick}>
      <div className="project-card__image-container">
        <img 
          src={image} 
          alt={`${title} preview`}
          className="project-card__image"
          onError={(e) => {
            e.target.src = '/assets/images/project-placeholder.jpg';
          }}
        />
        <div className="project-card__overlay">
          <div className="project-card__overlay-content">
            <span className="project-card__view-details">View Details</span>
            <div className="project-card__links">
              {githubUrl && (
                <button
                  className="project-card__link-btn"
                  onClick={(e) => handleLinkClick(e, githubUrl)}
                  aria-label="View GitHub repository"
                  title="GitHub Repository"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              )}
              {liveUrl && (
                <button
                  className="project-card__link-btn"
                  onClick={(e) => handleLinkClick(e, liveUrl)}
                  aria-label="View live demo"
                  title="Live Demo"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__header">
          <div className="project-card__title-section">
            <h3 className="project-card__title">{title}</h3>
            <div className="project-card__meta">
              <span className="project-card__category">
                <span className="project-card__category-icon">
                  {getCategoryIcon(category)}
                </span>
                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          </div>
          <div 
            className="project-card__status"
            style={{ backgroundColor: getStatusColor(status) }}
          >
            {status}
          </div>
        </div>

        <p className="project-card__description">{description}</p>

        <div className="project-card__technologies">
          {technologies.slice(0, 4).map((tech, index) => (
            <span key={index} className="project-card__tech-tag">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="project-card__tech-more">
              +{technologies.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="project-card__footer">
        <button className="project-card__learn-more">
          Learn More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;