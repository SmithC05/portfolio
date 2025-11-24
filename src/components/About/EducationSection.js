import React, { useState, useEffect, useRef } from 'react';
import { educationData } from '../../data';
import SectionHeader from '../Common/SectionHeader';
import './EducationSection.css';

const EducationSection = () => {
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);
  const timelineRef = useRef(null);

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Animate timeline progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineElement = timelineRef.current;
      const rect = timelineElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const timelineTop = rect.top;
      const timelineHeight = rect.height;
      
      if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
        const visibleHeight = Math.min(windowHeight - timelineTop, timelineHeight);
        const progress = Math.max(0, Math.min(100, (visibleHeight / timelineHeight) * 100));
        setTimelineProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="education-section section" id="education">
      <div className="container">
        <SectionHeader 
          title="Education" 
          subtitle="My academic journey and qualifications"
          centered={true}
          animated={true}
        />
        
        <div className="education-timeline" ref={timelineRef}>
          {/* Animated timeline progress bar */}
          <div className="education-progress-bar">
            <div 
              className="education-progress-fill"
              style={{ height: `${timelineProgress}%` }}
            ></div>
          </div>
        {educationData.map((education, index) => (
          <div key={education.id} className="education-item">
            <div className="education-marker">
              <div className="education-dot"></div>
              {index < educationData.length - 1 && <div className="education-line"></div>}
            </div>
            
            <div className="education-content">
              <div className="education-card" onClick={() => toggleExpanded(education.id)}>
                <div className="education-header">
                  <div className="education-main">
                    <div className="education-type">{education.status}</div>
                    <h3 className="education-degree">{education.degree}</h3>
                    <h4 className="education-institution">{education.fullName || education.institution}</h4>
                    <div className="education-meta">
                      <span className="education-duration">{education.duration}</span>
                      <span className="education-location">{education.location}</span>
                    </div>
                  </div>
                  
                  <div className="education-grade-container">
                    <div className="education-grade">
                      <div className="grade-label">
                        {education.cgpa ? 'CGPA' : 'Grade'}
                      </div>
                      <div className="grade-value">
                        {education.cgpa || education.grade}
                      </div>
                    </div>
                    
                    {education.achievements && education.achievements.length > 0 && (
                      <div className="expand-indicator">
                        <span className={`expand-arrow ${expandedItem === education.id ? 'expanded' : ''}`}>
                          ▼
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="education-description">{education.description}</p>
                
                {education.relevantCoursework && (
                  <div className="coursework-section">
                    <h5>Core Subjects:</h5>
                    <div className="coursework-tags">
                      {education.relevantCoursework.map((course, courseIndex) => (
                        <span key={courseIndex} className="coursework-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {education.stream && (
                  <div className="stream-section">
                    <h5>Stream:</h5>
                    <p className="stream-text">{education.stream}</p>
                  </div>
                )}

                {expandedItem === education.id && education.achievements && education.achievements.length > 0 && (
                  <div className="education-details">
                    <div className="achievements-sections">
                      <h5>Key Achievements:</h5>
                      <ul className="achievements-list">
                        {education.achievements
                          .filter(achievement => achievement && achievement.trim().length > 0)
                          .map((achievement, achIndex) => (
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
    </section>
  );
};

export default EducationSection;