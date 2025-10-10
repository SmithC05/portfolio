import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import { personalInfo, contactInfo } from '../../data';
import './ContactSection.css';

const ContactSection = () => {
  const [activeMethod, setActiveMethod] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate contact methods every 5 seconds
    const interval = setInterval(() => {
      setActiveMethod(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contactData = contactInfo.professional;

  const contactMethods = [
    {
      id: 'email',
      icon: 'fas fa-envelope',
      title: 'Email Me',
      subtitle: 'Drop me a line',
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      description: 'Best for detailed discussions and project inquiries',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    },
    {
      id: 'phone',
      icon: 'fas fa-phone',
      title: 'Call Me',
      subtitle: 'Let\'s talk directly',
      value: contactData.phone,
      href: `tel:${contactData.phone}`,
      description: 'Perfect for quick questions and immediate responses',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb'
    },
    {
      id: 'location',
      icon: 'fas fa-map-marker-alt',
      title: 'Meet Me',
      subtitle: 'In person meetings',
      value: contactData.location,
      href: '#',
      description: 'Available for local meetings and collaborations',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe'
    }
  ];

  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        {/* Hero Header */}
        <div className={`contact-hero ${isVisible ? 'visible' : ''}`}>
          <div className="contact-hero-content">
            <h2 className="contact-title">
              <span className="contact-greeting">Ready to collaborate?</span>
              <span className="contact-main-title">Let's Get In Touch</span>
            </h2>
            
            <p className="contact-description">
              I'm always excited to work on new projects and meet amazing people. 
              Whether you have a <span className="highlight">project in mind</span>, 
              want to <span className="highlight">discuss opportunities</span>, or 
              just want to say hello, I'd love to hear from you!
            </p>

            {/* Quick Stats */}
            <div className="contact-quick-stats">
              <div className="quick-stat">
                <span className="stat-icon">⚡</span>
                <span className="stat-text">24h Response</span>
              </div>
              <div className="quick-stat">
                <span className="stat-icon">🎯</span>
                <span className="stat-text">100% Commitment</span>
              </div>
              <div className="quick-stat">
                <span className="stat-icon">🚀</span>
                <span className="stat-text">Ready to Start</span>
              </div>
            </div>
          </div>

          {/* Floating Contact Orb */}
          <div className="contact-orb-container">
            <div className="contact-orb">
              <div className="contact-orb-inner">
                <i className="fas fa-comments"></i>
              </div>
              <div className="contact-orb-ring"></div>
              <div className="contact-orb-particles">
                <div className="orb-particle particle-1"></div>
                <div className="orb-particle particle-2"></div>
                <div className="orb-particle particle-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Contact Methods */}
        <div className="contact-methods-section">
          <h3 className="methods-title">Choose Your Preferred Way</h3>
          
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`contact-method-card ${activeMethod === index ? 'active' : ''}`}
                onClick={() => setActiveMethod(index)}
                style={{ '--method-gradient': method.gradient, '--method-color': method.color }}
              >
                <div className="method-icon">
                  <i className={method.icon}></i>
                </div>
                <h4 className="method-title">{method.title}</h4>
                <p className="method-subtitle">{method.subtitle}</p>
                <p className="method-description">{method.description}</p>
                <div className="method-value">{method.value}</div>
                
                {method.href !== '#' && (
                  <a
                    href={method.href}
                    className="method-action-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Contact Now</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                )}
                
                <div className="method-glow"></div>
              </div>
            ))}
          </div>

          {/* Method Navigation Dots */}
          <div className="method-navigation">
            {contactMethods.map((_, index) => (
              <button
                key={index}
                className={`method-nav-dot ${activeMethod === index ? 'active' : ''}`}
                onClick={() => setActiveMethod(index)}
                aria-label={`Select contact method ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="contact-main-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h3 className="form-section-title">
                <i className="fas fa-paper-plane"></i>
                Send Me a Message
              </h3>
              <p className="form-section-subtitle">
                Tell me about your project or just say hello. I'll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Social Links & Additional Info */}
          <div className="contact-sidebar">
            {/* Social Links */}
            <div className="social-section">
              <h3 className="social-section-title">
                <i className="fas fa-share-alt"></i>
                Connect & Follow
              </h3>
              <p className="social-section-subtitle">
                Let's connect on social media and stay in touch!
              </p>
              <SocialLinks />
            </div>

            {/* Additional Contact Info */}
            <div className="additional-info">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="info-content">
                  <h4>Response Time</h4>
                  <p>Usually within 24 hours</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <div className="info-content">
                  <h4>Time Zone</h4>
                  <p>IST (UTC+5:30)</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="info-content">
                  <h4>Availability</h4>
                  <p>Open for new projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;