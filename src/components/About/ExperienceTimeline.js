import React, { useState } from 'react';
import { experienceData } from '../../data';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Using imported experience data

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="experience-timeline">
      <div className="timeline-container">
        {experienceData.map((experience, index) => (
          <div key={experience.id} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot"></div>
              {index < experienceData.length - 1 && <div className="timeline-line"></div>}
            </div>
            
            <div className="timeline-content">
              <div className="experience-card" onClick={() => toggleExpanded(experience.id)}>
                <div className="experience-header">
                  <div className="experience-main">
                    <h3 className="experience-role">{experience.role}</h3>
                    <h4 className="experience-company">{experience.company}</h4>
                    <div className="experience-meta">
                      <span className="experience-duration">{experience.duration}</span>
                      <span className="experience-location">{experience.location}</span>
                    </div>
                  </div>
                  <div className="expand-indicator">
                    <span className={`expand-arrow ${expandedItem === experience.id ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                <p className="experience-description">{experience.description}</p>

                <div className="technology-tags">
                  {experience.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {expandedItem === experience.id && (
                  <div className="experience-details">
                    <div className="achievements-section">
                      <h5>Key Achievements:</h5>
                      <ul className="achievements-list">
                        {experience.achievements.map((achievement, achIndex) => (
                          <li key={achIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;