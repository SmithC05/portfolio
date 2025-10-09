import React from 'react';
import { educationData } from '../../data';
import './EducationSection.css';

const EducationSection = () => {
  // Using imported education data

  return (
    <div className="education-section">
      <div className="education-timeline">
        {educationData.map((education, index) => (
          <div key={education.id} className="education-item">
            <div className="education-marker">
              <div className="education-dot"></div>
              {index < educationData.length - 1 && <div className="education-line"></div>}
            </div>
            
            <div className="education-content">
              <div className="education-card">
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
                  
                  <div className="education-grade">
                    <div className="grade-label">
                      {education.cgpa ? 'CGPA' : 'Grade'}
                    </div>
                    <div className="grade-value">
                      {education.cgpa || education.grade}
                    </div>
                  </div>
                </div>

                <div className="coursework-section">
                  <h5>Relevant Coursework:</h5>
                  <div className="coursework-tags">
                    {(education.relevantCoursework || education.coursework || []).map((course, courseIndex) => (
                      <span key={courseIndex} className="coursework-tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;