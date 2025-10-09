import React, { useState } from 'react';
import SectionHeader from '../Common/SectionHeader';
import TechnicalSkills from './TechnicalSkills';
import './SkillsSection.css';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: '🚀' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'tools', name: 'Tools', icon: '🛠️' }
  ];

  const skillsData = {
    frontend: [
      { name: 'React.js', proficiency: 85, icon: '⚛️' },
      { name: 'JavaScript', proficiency: 90, icon: '📜' },
      { name: 'TypeScript', proficiency: 80, icon: '📘' },
      { name: 'HTML/CSS', proficiency: 95, icon: '🎨' },
      { name: 'Responsive Design', proficiency: 90, icon: '📱' }
    ],
    backend: [
      { name: 'Node.js', proficiency: 88, icon: '🟢' },
      { name: 'Express.js', proficiency: 85, icon: '🚀' },
      { name: 'Python', proficiency: 80, icon: '🐍' },
      { name: 'Java', proficiency: 75, icon: '☕' },
      { name: 'C/C++', proficiency: 85, icon: '⚡' }
    ],
    database: [
      { name: 'MongoDB', proficiency: 85, icon: '🍃' },
      { name: 'PostgreSQL', proficiency: 80, icon: '🐘' },
      { name: 'MySQL', proficiency: 75, icon: '🐬' },
      { name: 'Supabase', proficiency: 80, icon: '⚡' }
    ],
    tools: [
      { name: 'Git/GitHub', proficiency: 90, icon: '🐙' },
      { name: 'Docker', proficiency: 75, icon: '🐳' },
      { name: 'VS Code', proficiency: 95, icon: '💻' },
      { name: 'Postman', proficiency: 85, icon: '📮' },
      { name: 'Linux', proficiency: 80, icon: '🐧' }
    ]
  };

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return Object.entries(skillsData).reduce((acc, [category, skills]) => {
        return [...acc, ...skills.map(skill => ({ ...skill, category }))];
      }, []);
    }
    return skillsData[activeCategory] || [];
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="skills-section section" id="skills">
      <div className="container">
        <SectionHeader 
          title="Technical Skills" 
          subtitle="Technologies and tools I work with to bring ideas to life"
          centered={true}
          animated={true}
        />
        
        <div className="skills-section__content">
          {/* Category Filter */}
          <div className="skills-section__filters">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`skills-section__filter-btn ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
                aria-label={`Filter by ${category.name}`}
              >
                <span className="skills-section__filter-icon">{category.icon}</span>
                <span className="skills-section__filter-text">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div className="skills-section__skills-container">
            <TechnicalSkills 
              skills={getFilteredSkills()} 
              activeCategory={activeCategory}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;