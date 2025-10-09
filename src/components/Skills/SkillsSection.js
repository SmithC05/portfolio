import React, { useState } from 'react';
import SectionHeader from '../Common/SectionHeader';
import TechnicalSkills from './TechnicalSkills';
import { skillsData, skillCategories } from '../../data';
import './SkillsSection.css';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Add icons to imported skill categories
  const categoriesWithIcons = [
    { ...skillCategories[0], icon: '🚀' },
    { ...skillCategories[1], icon: '🎨' },
    { ...skillCategories[2], icon: '⚙️' },
    { ...skillCategories[3], icon: '🗄️' },
    { ...skillCategories[4], icon: '🛠️' }
  ];

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return Object.entries(skillsData).reduce((acc, [category, skills]) => {
        return [...acc, ...skills.map(skill => ({ ...skill, category }))];
      }, []);
    }
    // Handle database vs databases naming difference
    const categoryKey = activeCategory === 'database' ? 'databases' : activeCategory;
    return skillsData[categoryKey] || [];
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
            {categoriesWithIcons.map((category) => (
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