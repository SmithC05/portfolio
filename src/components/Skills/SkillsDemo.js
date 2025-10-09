import React from 'react';
import SkillsSection from './SkillsSection';

/**
 * Demo component to showcase the enhanced Skills Section
 * This can be used for testing and demonstration purposes
 */
const SkillsDemo = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--color-background-primary)',
      padding: '2rem 0'
    }}>
      <SkillsSection />
    </div>
  );
};

export default SkillsDemo;