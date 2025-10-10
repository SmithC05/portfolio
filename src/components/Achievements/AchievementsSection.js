import React, { useState, useMemo, useEffect } from 'react';
import SectionHeader from '../Common/SectionHeader';
import CertificatesGrid from './CertificatesGrid';
import { certificationsData, hackathonsData, achievementsData } from '../../data';
import './AchievementsSection.css';

const HackathonCard = ({ hackathon, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setAnimatedProgress(100);
      }, 300);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  const getTechCount = () => {
    return hackathon.technologies.length;
  };

  return (
    <div className={`modern-hackathon-card ${isVisible ? 'visible' : ''}`}>
      {/* Floating Orb */}
      <div className="hackathon-orb">
        <div className="hackathon-orb__inner hackathon-orb__inner--trophy">
          <i className="fas fa-trophy"></i>
        </div>
        <div className="hackathon-orb__ring"></div>
      </div>

      {/* Hackathon Info */}
      <div className="hackathon-info">
        <h3 className="hackathon-name">{hackathon.name}</h3>
        <div className="hackathon-level">
          <span className="hackathon-badge hackathon-badge--completed">
            {new Date(hackathon.date).getFullYear()}
          </span>
        </div>
        <p className="hackathon-organizer">by {hackathon.organizer}</p>
        <p className="hackathon-description">{hackathon.description}</p>
        <p className="hackathon-project"><strong>Project:</strong> {hackathon.project}</p>
      </div>

      {/* Circular Progress */}
      <div className="hackathon-progress-circle">
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
            className="progress-ring__circle progress-ring__circle--trophy"
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
      <div className="hackathon-technologies">
        {hackathon.technologies.slice(0, 3).map((tech, index) => (
          <span key={index} className="tech-bubble">
            {tech}
          </span>
        ))}
        {hackathon.technologies.length > 3 && (
          <span className="tech-bubble tech-bubble--more">
            +{hackathon.technologies.length - 3}
          </span>
        )}
      </div>

      {/* Hover Effects */}
      <div className="hackathon-card-glow"></div>
      <div className="hackathon-card-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setAnimatedProgress(Math.min((achievement.count / 10) * 100, 100));
      }, 300);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index, achievement.count]);

  return (
    <div className={`modern-achievement-card ${isVisible ? 'visible' : ''}`}>
      {/* Floating Orb */}
      <div className="achievement-orb">
        <div className="achievement-orb__inner achievement-orb__inner--star">
          <i className={achievement.icon}></i>
        </div>
        <div className="achievement-orb__ring"></div>
      </div>

      {/* Achievement Info */}
      <div className="achievement-info">
        <h3 className="achievement-name">{achievement.title}</h3>
        <div className="achievement-level">
          <span className="achievement-badge achievement-badge--completed">
            Excellence
          </span>
        </div>
        <p className="achievement-description">{achievement.description}</p>
      </div>

      {/* Circular Progress */}
      <div className="achievement-progress-circle">
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
            className="progress-ring__circle progress-ring__circle--star"
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
          <span className="progress-number">{achievement.count}</span>
          <span className="progress-symbol">items</span>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="achievement-badges">
        {achievement.badges.slice(0, 3).map((badge, index) => (
          <span key={index} className="badge-bubble">
            {badge}
          </span>
        ))}
        {achievement.badges.length > 3 && (
          <span className="badge-bubble badge-bubble--more">
            +{achievement.badges.length - 3}
          </span>
        )}
      </div>

      {/* Hover Effects */}
      <div className="achievement-card-glow"></div>
      <div className="achievement-card-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  );
};

const AchievementsSection = () => {
  const [activeTab, setActiveTab] = useState('certifications');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from certifications
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(certificationsData.map(cert => cert.category))];
    return [
      { id: 'all', name: 'All Categories', count: certificationsData.length },
      ...uniqueCategories.map(category => ({
        id: category.toLowerCase().replace(/\s+/g, '-'),
        name: category,
        count: certificationsData.filter(cert => cert.category === category).length
      }))
    ];
  }, []);

  // Filter certifications by category
  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'all') return certificationsData;
    const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
    return certificationsData.filter(cert => cert.category === categoryName);
  }, [selectedCategory, categories]);

  // Process achievements data for display
  const processedAchievements = [
    {
      id: 1,
      title: "Hackathon Participation",
      description: "Active participation in multiple prestigious hackathons",
      badges: hackathonsData.map(h => h.name),
      icon: "fas fa-trophy",
      count: hackathonsData.length
    },
    {
      id: 2,
      title: "Academic Excellence",
      description: "Consistent high performance in academic pursuits",
      badges: [
        "CGPA: 8.5/10",
        "Higher Secondary: 85%",
        "Technical Excellence"
      ],
      icon: "fas fa-graduation-cap",
      count: 3
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
      icon: "fas fa-chart-line",
      count: certificationsData.length + 2
    }
  ];

  const tabs = [
    { id: 'certifications', label: 'Certifications', count: certificationsData.length, icon: 'fas fa-certificate' },
    { id: 'hackathons', label: 'Hackathons', count: hackathonsData.length, icon: 'fas fa-trophy' },
    { id: 'achievements', label: 'Achievements', count: achievementsData.length, icon: 'fas fa-star' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'certifications':
        return (
          <div className="certifications-tab-content">
            {/* Category Filter */}
            <div className="certificate-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`certificate-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="filter-text">{category.name}</span>
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
            <CertificatesGrid certifications={filteredCertifications} />
          </div>
        );
      case 'hackathons':
        return (
          <div className="modern-hackathons-grid">
            {hackathonsData.map((hackathon, index) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
            ))}
          </div>
        );
      case 'achievements':
        return (
          <div className="modern-achievements-grid">
            {processedAchievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="achievements-section section" id="achievements">
      <div className="container">
        <SectionHeader
          title="Achievements & Certifications"
          subtitle="Professional certifications, hackathons, and key accomplishments that demonstrate continuous learning and growth"
        />

        {/* Achievement Statistics */}
        <div className="achievements-stats">
          <div className="achievements-stats-grid">
            <div className="achievement-stat-card">
              <div className="achievement-stat-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <div className="achievement-stat-content">
                <div className="achievement-stat-number">{certificationsData.length}</div>
                <div className="achievement-stat-label">Certifications</div>
              </div>
            </div>
            <div className="achievement-stat-card">
              <div className="achievement-stat-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="achievement-stat-content">
                <div className="achievement-stat-number">{hackathonsData.length}</div>
                <div className="achievement-stat-label">Hackathons</div>
              </div>
            </div>
            <div className="achievement-stat-card">
              <div className="achievement-stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="achievement-stat-content">
                <div className="achievement-stat-number">{achievementsData.length}</div>
                <div className="achievement-stat-label">Awards</div>
              </div>
            </div>
            <div className="achievement-stat-card">
              <div className="achievement-stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="achievement-stat-content">
                <div className="achievement-stat-number">95%</div>
                <div className="achievement-stat-label">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="achievements-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`achievements-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="achievements-tab-icon">
                <i className={tab.icon}></i>
              </span>
              <span className="achievements-tab-text">{tab.label}</span>
              <span className="achievements-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="achievements-content">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;