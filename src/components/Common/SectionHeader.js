import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true, 
  animated = true,
  className = '' 
}) => {
  return (
    <div className={`section-header ${centered ? 'centered' : ''} ${animated ? 'animated' : ''} ${className}`}>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
      <div className="section-header__divider"></div>
    </div>
  );
};

export default SectionHeader;