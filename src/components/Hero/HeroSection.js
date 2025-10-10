import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import ProfileImage from './ProfileImage';
import { personalInfo } from '../../data';
import './HeroSection.css';

const HeroSection = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    experience: 0,
    projects: 0,
    technologies: 0
  });
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Animate counters
    const targetCounts = {
      experience: parseInt(personalInfo.metrics.experience),
      projects: parseInt(personalInfo.metrics.projects),
      technologies: parseInt(personalInfo.metrics.technologies)
    };

    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedCounts({
          experience: Math.floor(targetCounts.experience * progress),
          projects: Math.floor(targetCounts.projects * progress),
          technologies: Math.floor(targetCounts.technologies * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedCounts(targetCounts);
        }
      }, stepDuration);
    };

    // Auto-rotate cards every 5 seconds
    const cardInterval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 5000);

    const timeout = setTimeout(animateCounters, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(cardInterval);
    };
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

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Smith_C_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Main Hero Content */}
        <div className={`hero-main ${isVisible ? 'visible' : ''}`}>
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="greeting-text">Hello, I'm</span>
              <h1 className="hero-name">
                {personalInfo.name}
                <span className="signature-crown">
                  <i className="fas fa-crown"></i>
                </span>
              </h1>
              <div className="name-underline">
                <span className="signature-thunder">
                  <i className="fas fa-bolt"></i>
                </span>
              </div>
            </div>

            <h2 className="hero-role">
              <Typewriter
                words={[
                  personalInfo.title,
                  personalInfo.subtitle,
                  'Full-Stack Developer',
                  'Web Technologies Expert'
                ]}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>

            <p className="hero-description">
              Crafting digital experiences through <span className="highlight">innovative code</span> and
              <span className="highlight"> creative solutions</span>. {personalInfo.summary}
            </p>

            {/* Call-to-Action Buttons */}
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={handleResumeDownload}>
                <i className="fas fa-download"></i>
                Download Resume
              </button>
              <button className="btn btn-secondary" onClick={handleContactScroll}>
                <i className="fas fa-envelope"></i>
                Get In Touch
              </button>
            </div>
          </div>

          {/* Enhanced Profile with Floating Elements */}
          <div className="hero-profile-container">
            <div className="hero-profile">
              <div className="profile-image-wrapper">
                <ProfileImage />
              </div>
              <div className="profile-ring"></div>
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
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="floating-element element-6 signature-element">
                  <i className="fas fa-crown"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive About Cards */}
        <div className="hero-about-cards">
          <h3 className="cards-title">What I Bring to the Table</h3>

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
                <h4 className="card-title">{card.title}</h4>
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

        {/* Animated Metrics */}
        <div className="hero-metrics">
          <div className="metric-item">
            <div className="metric-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="metric-content">
              <span className="metric-number">{animatedCounts.experience}+</span>
              <span className="metric-label">Years Experience</span>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className="metric-content">
              <span className="metric-number">{animatedCounts.projects}+</span>
              <span className="metric-label">Projects Completed</span>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon">
              <i className="fas fa-code-branch"></i>
            </div>
            <div className="metric-content">
              <span className="metric-number">{animatedCounts.technologies}+</span>
              <span className="metric-label">Technologies</span>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="metric-content">
              <span className="metric-number">5+</span>
              <span className="metric-label">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;