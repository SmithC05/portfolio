import React, { useState, useEffect } from 'react';
import './TechnicalSkills.css';

const SkillCard = ({ skill, index }) => {
  const [animatedProficiency, setAnimatedProficiency] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate proficiency after card appears with longer delay
      setTimeout(() => {
        setAnimatedProficiency(skill.proficiency);
      }, 600);
    }, index * 150);
    
    return () => clearTimeout(timer);
  }, [skill.proficiency, index]);

  const getProficiencyLevel = (proficiency) => {
    if (proficiency >= 90) return 'expert';
    if (proficiency >= 80) return 'advanced';
    if (proficiency >= 70) return 'intermediate';
    return 'beginner';
  };

  const getProficiencyText = (proficiency) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Beginner';
  };

  const getSkillGradient = (proficiency) => {
    if (proficiency >= 90) return 'from-emerald-500 to-green-400';
    if (proficiency >= 80) return 'from-blue-500 to-cyan-400';
    if (proficiency >= 70) return 'from-amber-500 to-orange-400';
    return 'from-red-500 to-pink-400';
  };

  return (
    <div className={`modern-skill-card ${isVisible ? 'visible' : ''}`}>
      {/* Floating Orb */}
      <div className="skill-orb">
        <div className={`skill-orb__inner skill-orb__inner--${getProficiencyLevel(skill.proficiency)}`}>
          <i className={skill.icon}></i>
        </div>
        <div className="skill-orb__ring"></div>
      </div>

      {/* Skill Info */}
      <div className="skill-info">
        <h3 className="skill-name">{skill.name}</h3>
        <div className="skill-level">
          <span className={`skill-badge skill-badge--${getProficiencyLevel(skill.proficiency)}`}>
            {getProficiencyText(skill.proficiency)}
          </span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="skill-progress-circle">
        <svg className="progress-ring" width="80" height="80">
          <defs>
            <linearGradient id={`expertGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id={`advancedGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id={`intermediateGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id={`beginnerGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
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
            className={`progress-ring__circle progress-ring__circle--${getProficiencyLevel(skill.proficiency)}`}
            strokeWidth="4"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
            stroke={`url(#${getProficiencyLevel(skill.proficiency)}Gradient-${index})`}
            strokeLinecap="round"
            style={{
              strokeDasharray: `${2 * Math.PI * 36}`,
              strokeDashoffset: `${2 * Math.PI * 36 * (1 - animatedProficiency / 100)}`,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center'
            }}
          />
        </svg>
        <div className="progress-percentage">
          <span className="progress-number">{skill.proficiency}</span>
          <span className="progress-symbol">%</span>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="skill-card-glow"></div>
      <div className="skill-card-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  );
};

const TechnicalSkills = ({ skills = [] }) => {
  if (!skills.length) {
    return (
      <div className="skills-grid-empty">
        <div className="empty-state-animation">
          <div className="empty-orb"></div>
          <div className="empty-rings">
            <div className="empty-ring"></div>
            <div className="empty-ring"></div>
            <div className="empty-ring"></div>
          </div>
        </div>
        <h3>No Skills Found</h3>
        <p>Try selecting a different category to explore more technologies.</p>
      </div>
    );
  }

  return (
    <div className="modern-skills-grid">
      {skills.map((skill, index) => (
        <SkillCard 
          key={skill.name} 
          skill={skill} 
          index={index}
        />
      ))}
    </div>
  );
};

export default TechnicalSkills;