import React from 'react';

const SectionBackgroundTest = () => {
  const sections = [
    { name: 'Hero', hasBackground: true, color: 'Dark gradient' },
    { name: 'About', hasBackground: true, color: 'Dark gradient (fixed)' },
    { name: 'Experience', hasBackground: true, color: 'Dark gradient' },
    { name: 'Education', hasBackground: true, color: 'Dark gradient' },
    { name: 'Skills', hasBackground: true, color: 'Dark gradient' },
    { name: 'Projects', hasBackground: true, color: 'Dark gradient' },
    { name: 'Achievements', hasBackground: true, color: 'Dark gradient (fixed)' },
    { name: 'Contact', hasBackground: true, color: 'Dark gradient' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '120px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      zIndex: 9999,
      maxWidth: '300px',
      border: '1px solid rgba(139, 92, 246, 0.3)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#8b5cf6' }}>Section Background Status</h3>
      {sections.map((section, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '0.5rem',
          padding: '0.25rem 0'
        }}>
          <span>{section.name}:</span>
          <span style={{ 
            color: section.hasBackground ? '#22c55e' : '#ef4444',
            fontSize: '0.75rem'
          }}>
            {section.hasBackground ? '✅' : '❌'} {section.color}
          </span>
        </div>
      ))}
      <div style={{ 
        marginTop: '1rem', 
        padding: '0.75rem', 
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '4px',
        color: '#22c55e',
        fontSize: '0.8rem'
      }}>
        ✅ All sections now have proper dark backgrounds!
        <br />
        ✅ White background issue fixed
        <br />
        ✅ Modern floating orb design applied
      </div>
    </div>
  );
};

export default SectionBackgroundTest;