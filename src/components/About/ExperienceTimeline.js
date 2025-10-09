import React, { useState } from 'react';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const experienceData = [
    {
      id: 1,
      role: "Full-Stack Intern",
      company: "Ziyack Technologies Private Limited",
      duration: "07/2025 - PRESENT",
      location: "Chennai",
      description: "Developing core product features using Node.js, Express.js, PostgreSQL, Supabase, with Dockerized workflows",
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Supabase", "Docker"],
      achievements: [
        "Built scalable backend APIs",
        "Implemented database optimization strategies",
        "Collaborated with frontend team for seamless integration"
      ]
    },
    {
      id: 2,
      role: "Backend Developer Intern",
      company: "Zero2Site",
      duration: "05/2025 - 06/2025",
      location: "Chennai",
      description: "Built backend APIs with Node.js, Express.js, MongoDB. Collaborated with frontend for seamless integration",
      technologies: ["Node.js", "Express.js", "MongoDB"],
      achievements: [
        "Developed RESTful APIs",
        "Integrated with frontend applications",
        "Optimized database queries"
      ]
    }
  ];

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