import React, { useState, useEffect } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate cards every 4 seconds
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const aboutCards = [
    {
      id: 0,
      icon: "fas fa-code",
      title: "Full-Stack Developer",
      description: "Passionate about creating end-to-end solutions with modern technologies like React, Node.js, and cloud platforms.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 1,
      icon: "fas fa-lightbulb",
      title: "Problem Solver",
      description: "I thrive on turning complex challenges into elegant, efficient solutions through creative thinking and clean code.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 2,
      icon: "fas fa-rocket",
      title: "Innovation Enthusiast",
      description: "Always exploring cutting-edge technologies and best practices to deliver exceptional user experiences.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  return (
    <section className="about-section section" id="about">
      <div className="container">
        {/* Hero Introduction */}
        <div className={`about-hero ${isVisible ? 'visible' : ''}`}>
          <div className="about-intro">
            <div className="about-greeting">
              <span className="greeting-text">Hello, I'm</span>
              <h1 className="about-name">
                Smith C
                <span className="signature-crown">👑</span>
              </h1>
              <div className="name-underline">
                <span className="signature-thunder">⚡</span>
              </div>
            </div>
            
            <p className="about-tagline">
              Crafting digital experiences through <span className="highlight">innovative code</span> and 
              <span className="highlight"> creative solutions</span>
            </p>
          </div>

          {/* Profile Avatar with Floating Elements */}
          <div className="about-avatar-container">
            <div className="about-avatar">
              <div className="avatar-image">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="avatar-ring"></div>
              <div className="floating-elements">
                <div className="floating-element element-1">
                  <i className="fab fa-react"></i>
                </div>
                <div className="floating-element element-2">
                  <i className="fab fa-node-js"></i>
                </div>
                <div className="floating-element element-3">
                  <i className="fab fa-js-square"></i>
                </div>
                <div className="floating-element element-4">
                  <i className="fas fa-database"></i>
                </div>
                <div className="floating-element element-5 signature-element">
                  ⚡
                </div>
                <div className="floating-element element-6 signature-element">
                  👑
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Cards */}
        <div className="about-cards-section">
          <h2 className="cards-title">What I Bring to the Table</h2>
          
          <div className="about-cards-container">
            {aboutCards.map((card, index) => (
              <div
                key={card.id}
                className={`about-card ${activeCard === index ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                style={{ '--card-gradient': card.gradient }}
              >
                <div className="card-icon">
                  <i className={card.icon}></i>
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>

          {/* Card Navigation Dots */}
          <div className="card-navigation">
            {aboutCards.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeCard === index ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                aria-label={`View card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">15+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-code-branch"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">10+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">5+</span>
              <span className="stat-label">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;