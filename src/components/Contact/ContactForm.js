import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [touched, setTouched] = useState({});
  const [formProgress, setFormProgress] = useState(0);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return '';
      
      default:
        return '';
    }
  };

  // Calculate form completion progress
  useEffect(() => {
    const fields = Object.keys(formData);
    const filledFields = fields.filter(field => formData[field].trim() !== '');
    const progress = (filledFields.length / fields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Real-time validation only for touched fields
    if (touched[name] || value.trim() !== '') {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll just show success message
      // In a real implementation, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      setTouched({});
      setFormProgress(0);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-component">
      <div className="contact-form-card">
        <div className="form-header">
          <h3 className="form-title">Send me a message</h3>
          <p className="form-subtitle">
            I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>
          
          {/* Form Progress Bar */}
          <div className="form-progress">
            <div className="form-progress-label">
              Form completion: {Math.round(formProgress)}%
            </div>
            <div className="form-progress-bar">
              <div 
                className="form-progress-fill" 
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="alert alert-success">
            <svg viewBox="0 0 24 24" fill="currentColor" className="alert-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <strong>Message sent successfully!</strong>
              <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-error">
            <svg viewBox="0 0 24 24" fill="currentColor" className="alert-icon">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
            <div>
              <strong>Failed to send message</strong>
              <p>Please try again or contact me directly via email.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form-input ${errors.name ? 'error' : ''} ${formData.name && !errors.name ? 'valid' : ''}`}
                placeholder="Your full name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form-input ${errors.email ? 'error' : ''} ${formData.email && !errors.email ? 'valid' : ''}`}
                placeholder="your.email@example.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form-input ${errors.subject ? 'error' : ''} ${formData.subject && !errors.subject ? 'valid' : ''}`}
              placeholder="What's this about?"
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <span id="subject-error" className="error-message" role="alert">
                {errors.subject}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form-textarea ${errors.message ? 'error' : ''} ${formData.message && !errors.message ? 'valid' : ''}`}
              placeholder="Tell me about your project, question, or just say hello..."
              rows="6"
              aria-describedby={errors.message ? 'message-error' : undefined}
              disabled={isSubmitting}
            />
            <div className="character-count">
              <span className={formData.message.length > 1000 ? 'over-limit' : ''}>
                {formData.message.length}/1000
              </span>
            </div>
            {errors.message && (
              <span id="message-error" className="error-message" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary form-submit ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Sending...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="send-icon">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;