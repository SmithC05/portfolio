import React, { useState, useMemo } from 'react';
import SectionHeader from '../Common/SectionHeader';
import TechnicalSkills from './TechnicalSkills';
import { skillsData, skillCategories } from '../../data';
import './SkillsSection.css';

const SkillsSection = () => {
  console.log('SkillsSection component rendering');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredStat, setHoveredStat] = useState(null);

  // Calculate skill statistics
  const skillStats = useMemo(() => {
    const allSkills = Object.values(skillsData).flat();
    const totalSkills = allSkills.length;
    const averageProficiency = Math.round(
      allSkills.reduce((sum, skill) => sum + skill.proficiency, 0) / totalSkills
    );
    const expertSkills = allSkills.filter(skill => skill.proficiency >= 90).length;
    const categories = Object.keys(skillsData).length;
    
    return {
      totalSkills,
      averageProficiency,
      expertSkills,
      categories
    };
  }, []);

  // Modern category design with gradients
  const categoriesWithIcons = [
    { ...skillCategories[0], icon: 'fas fa-code', gradient: 'from-purple-500 to-pink-500' },
    { ...skillCategories[1], icon: 'fas fa-paint-brush', gradient: 'from-blue-500 to-cyan-500' },
    { ...skillCategories[2], icon: 'fas fa-server', gradient: 'from-green-500 to-emerald-500' },
    { ...skillCategories[3], icon: 'fas fa-database', gradient: 'from-orange-500 to-red-500' },
    { ...skillCategories[4], icon: 'fas fa-tools', gradient: 'from-indigo-500 to-purple-500' }
  ];

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return Object.entries(skillsData).reduce((acc, [category, skills]) => {
        return [...acc, ...skills.map(skill => ({ ...skill, category }))];
      }, []);
    }
    const categoryKey = activeCategory === 'database' ? 'databases' : activeCategory;
    return skillsData[categoryKey] || [];
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="skills-section " id="skills">
      <div className="container">
        <SectionHeader 
          title="Technical Expertise" 
          subtitle="Crafting digital experiences with cutting-edge technologies"
          centered={true}
          animated={true}
        />

        {/* Modern Stats Dashboard */}
        <div className="skills-dashboard">
          <div className="skills-dashboard__grid">
            <div 
              className="skill-stat-card"
              onMouseEnter={() => setHoveredStat('total')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="skill-stat-card__icon">
                <div className="skill-stat-card__icon-bg skill-stat-card__icon-bg--purple">
                  <i className="fas fa-code"></i>
                </div>
              </div>
              <div className="skill-stat-card__content">
                <div className="skill-stat-card__number">{skillStats.totalSkills}</div>
                <div className="skill-stat-card__label">Technologies Mastered</div>
                <div className="skill-stat-card__description">
                  Across multiple domains and frameworks
                </div>
              </div>
              <div className={`skill-stat-card__glow ${hoveredStat === 'total' ? 'active' : ''}`}></div>
            </div>

            <div 
              className="skill-stat-card"
              onMouseEnter={() => setHoveredStat('proficiency')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="skill-stat-card__icon">
                <div className="skill-stat-card__icon-bg skill-stat-card__icon-bg--blue">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
              <div className="skill-stat-card__content">
                <div className="skill-stat-card__number">{skillStats.averageProficiency}%</div>
                <div className="skill-stat-card__label">Average Proficiency</div>
                <div className="skill-stat-card__description">
                  Continuous learning and improvement
                </div>
              </div>
              <div className={`skill-stat-card__glow ${hoveredStat === 'proficiency' ? 'active' : ''}`}></div>
            </div>

            <div 
              className="skill-stat-card"
              onMouseEnter={() => setHoveredStat('expert')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="skill-stat-card__icon">
                <div className="skill-stat-card__icon-bg skill-stat-card__icon-bg--green">
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className="skill-stat-card__content">
                <div className="skill-stat-card__number">{skillStats.expertSkills}</div>
                <div className="skill-stat-card__label">Expert Level Skills</div>
                <div className="skill-stat-card__description">
                  Advanced proficiency and deep knowledge
                </div>
              </div>
              <div className={`skill-stat-card__glow ${hoveredStat === 'expert' ? 'active' : ''}`}></div>
            </div>

            <div 
              className="skill-stat-card"
              onMouseEnter={() => setHoveredStat('categories')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="skill-stat-card__icon">
                <div className="skill-stat-card__icon-bg skill-stat-card__icon-bg--orange">
                  <i className="fas fa-layer-group"></i>
                </div>
              </div>
              <div className="skill-stat-card__content">
                <div className="skill-stat-card__number">{skillStats.categories}</div>
                <div className="skill-stat-card__label">Skill Categories</div>
                <div className="skill-stat-card__description">
                  Full-stack development expertise
                </div>
              </div>
              <div className={`skill-stat-card__glow ${hoveredStat === 'categories' ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        {/* Modern Category Tabs */}
        <div className="skills-categories">
          <div className="skills-categories__container">
            {categoriesWithIcons.map((category) => (
              <button
                key={category.id}
                className={`skills-category-tab ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
                aria-label={`Filter by ${category.name}`}
              >
                <div className="skills-category-tab__icon">
                  <i className={category.icon}></i>
                </div>
                <div className="skills-category-tab__content">
                  <span className="skills-category-tab__name">{category.name}</span>
                  <span className="skills-category-tab__count">
                    {category.id === 'all' ? skillStats.totalSkills : getFilteredSkills().length} skills
                  </span>
                </div>
                <div className="skills-category-tab__indicator"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid-container">
          <TechnicalSkills 
            skills={getFilteredSkills()} 
            activeCategory={activeCategory}
          />
        </div>

        {/* Empty State */}
        {getFilteredSkills().length === 0 && (
          <div className="skills-empty-state">
            <div className="skills-empty-state__icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>No skills found</h3>
            <p>Try selecting a different category to explore more skills.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;