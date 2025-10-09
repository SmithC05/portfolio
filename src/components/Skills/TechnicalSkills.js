import React, { useState, useEffect } from 'react';
import './TechnicalSkills.css';

const SkillCard = ({ skill, index, activeCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProficiency, setAnimatedProficiency] = useState(0);

  useEffect(() => {
    // Trigger animation when component mounts or category changes
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate proficiency bar
      const animationTimer = setTimeout(() => {
        setAnimatedProficiency(skill.proficiency);
      }, index * 100); // Stagger animations
      
      return () => clearTimeout(animationTimer);
    }, 50);

    return () => clearTimeout(timer);
  }, [skill.proficiency, index, activeCategory]);

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

  return (
    <div 
      className={`skill-card ${isVisible ? 'visible' : ''}`}
      style={{ '--animation-delay': `${index * 0.1}s` }}
    >
      <div className="skill-card__header">
        <div className="skill-card__icon">
          {skill.icon}
        </div>
        <div className="skill-card__info">
          <h3 className="skill-card__name">{skill.name}</h3>
          <span className={`skill-card__level skill-card__level--${getProficiencyLevel(skill.proficiency)}`}>
            {getProficiencyText(skill.proficiency)}
          </span>
        </div>
        <div className="skill-card__percentage">
          {skill.proficiency}%
        </div>
      </div>
      
      <div className="skill-card__progress">
        <div className="skill-card__progress-track">
          <div 
            className={`skill-card__progress-bar skill-card__progress-bar--${getProficiencyLevel(skill.proficiency)}`}
            style={{ 
              width: `${animatedProficiency}%`,
              transition: 'width 1s ease-out'
            }}
          >
            <div className="skill-card__progress-glow"></div>
          </div>
        </div>
      </div>
      
      {skill.category && (
        <div className="skill-card__category">
          {skill.category}
        </div>
      )}
    </div>
  );
};

const TechnicalSkills = ({ skills = [], activeCategory = 'all' }) => {
  const [displayedSkills, setDisplayedSkills] = useState([]);

  useEffect(() => {
    // Reset and update skills when category changes
    setDisplayedSkills([]);
    const timer = setTimeout(() => {
      setDisplayedSkills(skills);
    }, 100);

    return () => clearTimeout(timer);
  }, [skills, activeCategory]);

  if (!displayedSkills.length) {
    return (
      <div className="technical-skills">
        <div className="technical-skills__loading">
          <div className="technical-skills__loading-text">
            {skills.length === 0 ? 'No skills found for this category' : 'Loading skills...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="technical-skills">
      <div className="technical-skills__grid">
        {displayedSkills.map((skill, index) => (
          <SkillCard 
            key={`${skill.name}-${activeCategory}`} 
            skill={skill} 
            index={index}
            activeCategory={activeCategory}
          />
        ))}
      </div>
      
      <div className="technical-skills__stats">
        <div className="technical-skills__stat">
          <span className="technical-skills__stat-number">{displayedSkills.length}</span>
          <span className="technical-skills__stat-label">
            {activeCategory === 'all' ? 'Total Skills' : `${activeCategory} Skills`}
          </span>
        </div>
        <div className="technical-skills__stat">
          <span className="technical-skills__stat-number">
            {Math.round(displayedSkills.reduce((acc, skill) => acc + skill.proficiency, 0) / displayedSkills.length)}%
          </span>
          <span className="technical-skills__stat-label">Average Proficiency</span>
        </div>
        <div className="technical-skills__stat">
          <span className="technical-skills__stat-number">
            {displayedSkills.filter(skill => skill.proficiency >= 80).length}
          </span>
          <span className="technical-skills__stat-label">Advanced Skills</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;