import React from 'react';
import AchievementsSection from './AchievementsSection';
import AchievementsSummary from './AchievementsSummary';
import './AchievementsSummary.css';

const AchievementsTest = () => {
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <AchievementsSummary />
      <AchievementsSection />
    </div>
  );
};

export default AchievementsTest;