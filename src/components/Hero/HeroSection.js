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

  useEffect(() => {
    const targetCounts = {
      experience: parseInt(personalInfo.metrics.experience),
      projects: parseInt(personalInfo.metrics.projects),
      technologies: parseInt(personalInfo.metrics.technologies)
    };

    const animateCounters = () => {
      const duration = 2000; // 2 seconds
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

    // Start animation after component mounts
    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleResumeDownload = () => {
    // Create a temporary link to download resume
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
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hi, I'm <span className="name-highlight">{personalInfo.name}</span></h1>
          <h2 className="role-title">
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
            {personalInfo.summary}
          </p>

          {/* Key Metrics */}
          <div className="hero-metrics">
            <div className="metric">
              <span className="metric-number">{animatedCounts.experience}+</span>
              <span className="metric-label">Years Experience</span>
            </div>
            <div className="metric">
              <span className="metric-number">{animatedCounts.projects}+</span>
              <span className="metric-label">Projects Completed</span>
            </div>
            <div className="metric">
              <span className="metric-number">{animatedCounts.technologies}+</span>
              <span className="metric-label">Technologies</span>
            </div>
          </div>

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

        <div className="hero-image">
          <ProfileImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;