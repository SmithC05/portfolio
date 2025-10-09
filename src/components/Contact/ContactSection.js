import React from 'react';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import { personalInfo, contactInfo } from '../../data';
import './ContactSection.css';

const ContactSection = () => {
  // Using imported contact information
  const contactData = contactInfo.professional;

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Let's discuss opportunities and collaborate on exciting projects
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <h3 className="contact-info-title">Contact Information</h3>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <a href={`mailto:${contactData.email}`} className="contact-value">
                      {contactData.email}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Phone</span>
                    <a href={`tel:${contactData.phone}`} className="contact-value">
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">{contactData.location}</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Status</span>
                    <span className="contact-value status-available">{contactData.availability}</span>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4 className="social-title">Connect with me</h4>
                <SocialLinks />
              </div>

              <div className="contact-resume">
                <a 
                  href={personalInfo.resumeUrl} 
                  className="btn btn-primary resume-download"
                  download="Smith_C_Resume.pdf"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="download-icon">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;