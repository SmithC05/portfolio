import React, { useState } from 'react';
import { socialLinksData } from '../../data';
import './SocialLinks.css';

const SocialLinks = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Enhanced social links with brand colors and additional info
  const socialLinks = socialLinksData.filter(link => link.primary).map(link => {
    const platformData = getPlatformData(link.platform);
    return {
      name: link.platform,
      url: link.url,
      icon: platformData.icon,
      description: link.description,
      color: platformData.color,
      gradient: platformData.gradient,
      stats: platformData.stats
    };
  });

  function getPlatformData(platform) {
    switch (platform) {
      case 'GitHub':
        return {
          icon: 'fab fa-github',
          color: '#333',
          gradient: 'linear-gradient(135deg, #333 0%, #24292e 100%)',
          stats: '50+ Repositories'
        };
      case 'LinkedIn':
        return {
          icon: 'fab fa-linkedin',
          color: '#0077b5',
          gradient: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
          stats: '500+ Connections'
        };
      case 'Email':
        return {
          icon: 'fas fa-envelope',
          color: '#ea4335',
          gradient: 'linear-gradient(135deg, #ea4335 0%, #d33b2c 100%)',
          stats: 'Direct Contact'
        };
      case 'Phone':
        return {
          icon: 'fas fa-phone',
          color: '#25d366',
          gradient: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
          stats: 'Quick Response'
        };
      default:
        return {
          icon: 'fas fa-star',
          color: '#8b5cf6',
          gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          stats: 'Connect'
        };
    }
  }

  return (
    <div className="modern-social-links">
      <div className="social-links-grid">
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target={link.name !== 'Email' && link.name !== 'Phone' ? '_blank' : undefined}
            rel={link.name !== 'Email' && link.name !== 'Phone' ? 'noopener noreferrer' : undefined}
            className="modern-social-link"
            style={{ 
              '--social-color': link.color,
              '--social-gradient': link.gradient,
              '--animation-delay': `${index * 0.1}s`
            }}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
            aria-label={`${link.name} - ${link.description}`}
          >
            <div className="social-link-inner">
              <div className="social-icon-container">
                <i className={link.icon}></i>
                <div className="icon-glow"></div>
              </div>
              
              <div className="social-content">
                <h4 className="social-platform">{link.name}</h4>
                <p className="social-description">{link.description}</p>
                <span className="social-stats">{link.stats}</span>
              </div>
              
              <div className="social-action">
                <div className="action-circle">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
            
            <div className="social-link-glow"></div>
            <div className="social-link-particles">
              <div className="social-particle particle-1"></div>
              <div className="social-particle particle-2"></div>
            </div>
          </a>
        ))}
      </div>

      {/* Floating Social Bubbles for Mobile */}
      <div className="social-bubbles">
        {socialLinks.map((link, index) => (
          <a
            key={`bubble-${link.name}`}
            href={link.url}
            target={link.name !== 'Email' && link.name !== 'Phone' ? '_blank' : undefined}
            rel={link.name !== 'Email' && link.name !== 'Phone' ? 'noopener noreferrer' : undefined}
            className="social-bubble"
            style={{ 
              '--social-color': link.color,
              '--bubble-delay': `${index * 0.2}s`
            }}
            aria-label={link.name}
          >
            <i className={link.icon}></i>
            <div className="bubble-ripple"></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;