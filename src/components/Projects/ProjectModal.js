import React, { useEffect, useRef } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose, allProjects, onNavigate }) => {
  const modalRef = useRef(null);
  const {
    title,
    description,
    technologies,
    features,
    highlights,
    status,
    githubUrl,
    liveUrl,
    image,
    category
  } = project;

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleLinkClick = (url) => {
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
        return 'fas fa-globe';
      case 'backend':
        return 'fas fa-server';
      case 'real-time':
        return 'fas fa-bolt';
      default:
        return 'fas fa-rocket';
    }
  };

  // Navigation functions
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allProjects.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      onNavigate(allProjects[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onNavigate(allProjects[currentIndex + 1]);
    }
  };

  return (
    <div className="project-modal-backdrop" onClick={handleBackdropClick}>
      <div className="project-modal" ref={modalRef}>
        {/* Close Button */}
        <button className="project-modal__close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>

        {/* Navigation Buttons */}
        {hasPrevious && (
          <button className="project-modal__nav project-modal__nav--prev" onClick={handlePrevious} aria-label="Previous project">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
            </svg>
          </button>
        )}

        {hasNext && (
          <button className="project-modal__nav project-modal__nav--next" onClick={handleNext} aria-label="Next project">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
          </button>
        )}

        <div className="project-modal__content">
          {/* Header */}
          <div className="project-modal__header">
            <div className="project-modal__title-section">
              <h2 className="project-modal__title">{title}</h2>
              <div className="project-modal__meta">
                <span className="project-modal__category">
                  <span className="project-modal__category-icon">
                    <i className={getCategoryIcon(category)}></i>
                  </span>
                  {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <div 
                  className="project-modal__status"
                  style={{ backgroundColor: getStatusColor(status) }}
                >
                  {status}
                </div>
              </div>
            </div>
          </div>

          {/* Image - Certificate Style */}
          <div className="project-modal__image-container">
            <div className="corner-decoration"></div>
            <div className="corner-decoration"></div>
            <div className="corner-decoration"></div>
            <div className="corner-decoration"></div>
            
            {image ? (
              <img 
                src={image}
                alt={`${title} preview`}
                className="project-modal__image"
              />
            ) : (
              <div className="project-modal__image-placeholder">
                <div className="project-modal__placeholder-content">
                  <div className="project-modal__placeholder-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <span className="project-modal__placeholder-text">Project Preview</span>
                  <p className="project-modal__placeholder-subtitle">Professional showcase coming soon</p>
                  <div className="project-modal__placeholder-badge">
                    <i className="fas fa-certificate"></i>
                    <span>Premium Project</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="project-modal__section">
            <h3 className="project-modal__section-title">About This Project</h3>
            <p className="project-modal__description">{description}</p>
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="project-modal__section">
              <h3 className="project-modal__section-title">Key Features</h3>
              <ul className="project-modal__features">
                {features.map((feature, index) => (
                  <li key={index} className="project-modal__feature">
                    <span className="project-modal__feature-icon">
                      <i className="fas fa-star"></i>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="project-modal__section">
              <h3 className="project-modal__section-title">Technical Highlights</h3>
              <ul className="project-modal__highlights">
                {highlights.map((highlight, index) => (
                  <li key={index} className="project-modal__highlight">
                    <span className="project-modal__highlight-icon">
                      <i className="fas fa-bullseye"></i>
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="project-modal__section">
            <h3 className="project-modal__section-title">Technologies Used</h3>
            <div className="project-modal__technologies">
              {technologies.map((tech, index) => (
                <span key={index} className="project-modal__tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="project-modal__actions">
            {githubUrl && (
              <button
                className="project-modal__action-btn project-modal__action-btn--github"
                onClick={() => handleLinkClick(githubUrl)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </button>
            )}
            {liveUrl && (
              <button
                className="project-modal__action-btn project-modal__action-btn--live"
                onClick={() => handleLinkClick(liveUrl)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                </svg>
                Live Demo
              </button>
            )}
          </div>

          {/* Project Navigation Info */}
          <div className="project-modal__nav-info">
            <span className="project-modal__nav-text">
              Project {currentIndex + 1} of {allProjects.length}
            </span>
            <div className="project-modal__nav-dots">
              {allProjects.map((_, index) => (
                <button
                  key={index}
                  className={`project-modal__nav-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => onNavigate(allProjects[index])}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;