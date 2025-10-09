import React from 'react';
import SectionHeader from '../Common/SectionHeader';
import CertificatesGrid from './CertificatesGrid';
import { educationData, certificationsData, hackathonsData, achievementsData } from '../../data';
import './AchievementsSection.css';

const AchievementsSection = () => {
  // Process achievements data for display
  const processedAchievements = [
    {
      id: 1,
      title: "Hackathon Participation",
      description: "Active participation in multiple prestigious hackathons",
      badges: hackathonsData.map(h => h.name),
      icon: "🏆"
    },
    {
      id: 2,
      title: "Academic Excellence",
      description: "Consistent high performance in academic pursuits",
      badges: [
        `CGPA: ${educationData[0]?.cgpa}/10`,
        `Higher Secondary: ${educationData[1]?.grade}`,
        "Technical Excellence"
      ],
      icon: "🎓"
    },
    {
      id: 3,
      title: "Professional Development",
      description: "Continuous learning and skill enhancement",
      badges: [
        `${certificationsData.length}+ Certifications`,
        "Industry Internships",
        "Technical Bootcamps"
      ],
      icon: "📈"
    }
  ];

  return (
    <section className="achievements-section section" id="achievements">
      <div className="container">
        <SectionHeader
          title="Achievements & Certifications"
          subtitle="Educational background, professional certifications, and key accomplishments that demonstrate continuous learning and growth"
        />

        {/* Education Timeline */}
        <div className="education-timeline-container">
          <h3 className="subsection-title">Educational Background</h3>
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
                        <h4 className="education-degree">{education.degree}</h4>
                        <h5 className="education-institution">{education.fullName || education.institution}</h5>
                        <div className="education-meta">
                          <span className="education-duration">{education.duration}</span>
                          <span className="education-location">{education.location}</span>
                          <span className={`education-status ${education.status.toLowerCase()}`}>
                            {education.status}
                          </span>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-container">
          <h3 className="subsection-title">Professional Certifications</h3>
          <CertificatesGrid certifications={certificationsData} />
        </div>

        {/* Achievement Badges */}
        <div className="achievements-container">
          <h3 className="subsection-title">Key Achievements</h3>
          <div className="achievements-grid">
            {processedAchievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                  <div className="achievement-badges">
                    {achievement.badges.map((badge, index) => (
                      <span key={index} className="achievement-badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;