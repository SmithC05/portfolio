import React, { useState, useEffect } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const {
    title,
    description,
    technologies,
    status,
    githubUrl,
    liveUrl,
    category
  } = project;

  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate progress after card appears
      setTimeout(() => {
        setAnimatedProgress(getProjectProgress());
      }, 300);
    }, index * 150);
    
    return () => clearTimeout(timer);
  }, [index]);

  const handleCardClick = () => {
    if (onClick) {
      onClick(project);
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
      case 'frontend':
        return 'fas fa-palette';
      default:
        return 'fas fa-rocket';
    }
  };

  const getStatusLevel = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'in development':
      case 'in progress':
        return 'progress';
      case 'planning':
        return 'planning';
      default:
        return 'planning';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'in development':
      case 'in progress':
        return 'In Progress';
      case 'planning':
        return 'Planning';
      default:
        return 'Planning';
    }
  };

  const getProjectProgress = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 100;
      case 'in development':
      case 'in progress':
        return 75;
      case 'planning':
        return 25;
      default:
        return 25;
    }
  };

  const getTechCount = () => {
    return technologies.length;
  };

  return (
    <div className={`modern-project-card ${isVisible ? 'visible' : ''}`} onClick={handleCardClick}>
      {/* Floating Orb */}
      <div className="project-orb">
        <div className={`project-orb__inner project-orb__inner--${getStatusLevel(status)}`}>
          <i className={getCategoryIcon(category)}></i>
        </div>
        <div className="project-orb__ring"></div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        <h3 className="project-name">{title}</h3>
        <div className="project-level">
          <span className={`project-badge project-badge--${getStatusLevel(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
        <p className="project-description">{description}</p>
      </div>

      {/* Circular Progress */}
      <div className="project-progress-circle">
        <svg className="progress-ring" width="80" height="80">
          <circle
            className="progress-ring__circle-bg"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
          />
          <circle
            className={`progress-ring__circle progress-ring__circle--${getStatusLevel(status)}`}
            strokeWidth="4"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
            style={{
              strokeDasharray: `${2 * Math.PI * 36}`,
              strokeDashoffset: `${2 * Math.PI * 36 * (1 - animatedProgress / 100)}`,
            }}
          />
        </svg>
        <div className="progress-percentage">
          <span className="progress-number">{getTechCount()}</span>
          <span className="progress-symbol">tech</span>
        </div>
      </div>

      {/* Technologies */}
      <div className="project-technologies">
        {technologies.slice(0, 3).map((tech, index) => (
          <span key={index} className="tech-bubble">
            {tech}
          </span>
        ))}
        {technologies.length > 3 && (
          <span className="tech-bubble tech-bubble--more">
            +{technologies.length - 3}
          </span>
        )}
      </div>

      {/* Action Links */}
      <div className="project-actions">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn project-action-btn--github"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fab fa-github"></i>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn project-action-btn--live"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        )}
      </div>

      {/* Hover Effects */}
      <div className="project-card-glow"></div>
      <div className="project-card-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  );
};

export default ProjectCard;