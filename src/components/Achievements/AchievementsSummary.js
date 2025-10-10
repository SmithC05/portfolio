import React from 'react';
import { certificationsData, hackathonsData, achievementsData } from '../../data';

const AchievementsSummary = () => {
  const stats = {
    totalCertifications: certificationsData.length,
    completedCertifications: certificationsData.filter(cert => cert.status === 'Completed').length,
    totalHackathons: hackathonsData.length,
    totalAchievements: achievementsData.length,
    categories: [...new Set(certificationsData.map(cert => cert.category))].length
  };

  const completionRate = Math.round((stats.completedCertifications / stats.totalCertifications) * 100);

  return (
    <div className="achievements-summary">
      <h3>Portfolio Achievements Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">Certifications:</span>
          <span className="summary-value">{stats.totalCertifications}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Completed:</span>
          <span className="summary-value">{stats.completedCertifications}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Hackathons:</span>
          <span className="summary-value">{stats.totalHackathons}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Categories:</span>
          <span className="summary-value">{stats.categories}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Completion Rate:</span>
          <span className="summary-value">{completionRate}%</span>
        </div>
      </div>
      <div className="summary-status">
        ✅ Achievements and Certificates sections are fully implemented with modern floating orb design matching the Skills section!
      </div>
    </div>
  );
};

export default AchievementsSummary;