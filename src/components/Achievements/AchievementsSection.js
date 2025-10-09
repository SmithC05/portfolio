import React from 'react';
import SectionHeader from '../Common/SectionHeader';
import CertificatesGrid from './CertificatesGrid';
import './AchievementsSection.css';

const AchievementsSection = () => {
  const educationData = [
    {
      id: 1,
      degree: "B.E. in Computer Science Engineering",
      institution: "CIT CHENNAI",
      duration: "07/2024 - 06/2028",
      location: "Chennai",
      cgpa: "8.62",
      type: "Bachelor's Degree",
      status: "Current"
    },
    {
      id: 2,
      degree: "HSLC SSHN Hr Sec School",
      institution: "SSHN Hr Sec School",
      duration: "06/2023 - 03/2024",
      location: "Rajapalayam",
      grade: "94.5%",
      type: "Higher Secondary",
      status: "Completed"
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Android Development Virtual Internship",
      issuer: "Google (via Eduskills)",
      category: "Mobile Development",
      type: "Professional Development",
      status: "Completed"
    },
    {
      id: 2,
      title: "Full Stack Development Bootcamp",
      issuer: "LeetCode, CodeChef",
      category: "Web Development",
      type: "Technical Skills",
      status: "Completed"
    },
    {
      id: 3,
      title: "IBM SkillsBuild Certifications",
      issuer: "IBM",
      category: "Cloud & AI",
      type: "Technical Skills",
      status: "Completed",
      subcertifications: ["AI Fundamentals", "Data Science", "Cloud Computing"]
    },
    {
      id: 4,
      title: "Cisco Networking Certifications",
      issuer: "Cisco",
      category: "Networking",
      type: "Technical Skills",
      status: "Completed",
      subcertifications: ["Cybersecurity", "IoT", "Digital Transformation"]
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Hackathon Participation",
      description: "Active participation in multiple prestigious hackathons",
      badges: [
        "Google Cloud Hackathon",
        "AgentLab Challenge",
        "Adobe India Hackathon",
        "CodeSynthesis Competition",
        "EdgyBot Challenge"
      ],
      icon: "🏆"
    },
    {
      id: 2,
      title: "Academic Excellence",
      description: "Consistent high performance in academic pursuits",
      badges: [
        "CGPA: 8.62/10",
        "Higher Secondary: 94.5%",
        "Dean's List Recognition"
      ],
      icon: "🎓"
    },
    {
      id: 3,
      title: "Professional Development",
      description: "Continuous learning and skill enhancement",
      badges: [
        "Multiple Industry Certifications",
        "Internship Completions",
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
                        <div className="education-type">{education.type}</div>
                        <h4 className="education-degree">{education.degree}</h4>
                        <h5 className="education-institution">{education.institution}</h5>
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
          <CertificatesGrid certifications={certifications} />
        </div>

        {/* Achievement Badges */}
        <div className="achievements-container">
          <h3 className="subsection-title">Key Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
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