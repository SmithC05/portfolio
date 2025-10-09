import React from 'react';
import './EducationSection.css';

const EducationSection = () => {
  const educationData = [
    {
      id: 1,
      degree: "B.E. in Computer Science Engineering",
      institution: "CIT CHENNAI",
      duration: "07/2024 - 06/2028",
      location: "Chennai",
      cgpa: "8.62",
      type: "Bachelor's Degree",
      coursework: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Software Engineering",
        "Web Technologies",
        "Computer Networks",
        "Operating Systems"
      ]
    },
    {
      id: 2,
      degree: "HSLC SSHN Hr Sec School",
      institution: "SSHN Hr Sec School",
      duration: "06/2023 - 03/2024",
      location: "Rajapalayam",
      grade: "94.5%",
      type: "Higher Secondary",
      coursework: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Computer Science",
        "English"
      ]
    }
  ];

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
                    <div className="education-type">{education.type}</div>
                    <h3 className="education-degree">{education.degree}</h3>
                    <h4 className="education-institution">{education.institution}</h4>
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
                    {education.coursework.map((course, courseIndex) => (
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