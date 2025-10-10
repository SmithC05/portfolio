import React, { useEffect, useState } from 'react';

const BackgroundDebug = () => {
  const [sectionInfo, setSectionInfo] = useState([]);

  useEffect(() => {
    const checkSections = () => {
      const sections = [
        'hero',
        'about',
        'experience', 
        'education',
        'skills',
        'projects',
        'achievements',
        'contact'
      ];

      const info = sections.map(id => {
        const element = document.getElementById(id);
        if (element) {
          const styles = window.getComputedStyle(element);
          return {
            id,
            exists: true,
            background: styles.backgroundColor,
            backgroundImage: styles.backgroundImage,
            className: element.className,
            tagName: element.tagName
          };
        }
        return {
          id,
          exists: false,
          background: 'N/A',
          backgroundImage: 'N/A',
          className: 'N/A',
          tagName: 'N/A'
        };
      });

      setSectionInfo(info);
    };

    // Check immediately and after a short delay
    checkSections();
    const timer = setTimeout(checkSections, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '120px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.95)',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '0.75rem',
      zIndex: 9999,
      maxWidth: '400px',
      maxHeight: '70vh',
      overflow: 'auto',
      border: '1px solid rgba(139, 92, 246, 0.3)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#8b5cf6' }}>Section Background Debug</h3>
      {sectionInfo.map((section, index) => (
        <div key={index} style={{ 
          marginBottom: '0.75rem',
          padding: '0.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
          border: `1px solid ${section.exists ? '#22c55e' : '#ef4444'}`
        }}>
          <div style={{ fontWeight: 'bold', color: section.exists ? '#22c55e' : '#ef4444' }}>
            {section.id.toUpperCase()} {section.exists ? '✅' : '❌'}
          </div>
          <div>Tag: {section.tagName}</div>
          <div>Class: {section.className}</div>
          <div>BG Color: {section.background}</div>
          <div style={{ fontSize: '0.7rem', wordBreak: 'break-all' }}>
            BG Image: {section.backgroundImage.length > 50 ? 
              section.backgroundImage.substring(0, 50) + '...' : 
              section.backgroundImage}
          </div>
        </div>
      ))}
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '0.5rem', 
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '4px',
        fontSize: '0.7rem'
      }}>
        <strong>Body BG:</strong> {window.getComputedStyle(document.body).backgroundColor}
        <br />
        <strong>HTML BG:</strong> {window.getComputedStyle(document.documentElement).backgroundColor}
      </div>
    </div>
  );
};

export default BackgroundDebug;