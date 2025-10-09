import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = ({ 
  showAfter = 300, 
  smooth = true,
  className = '',
  position = 'bottom-right' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      
      if (scrollTop > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 150);
      toggleVisibility();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={`scroll-to-top scroll-to-top--${position} ${isScrolling ? 'scrolling' : ''} ${className}`}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg 
        className="scroll-to-top__icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="18,15 12,9 6,15"></polyline>
      </svg>
      <div className="scroll-to-top__progress">
        <svg className="scroll-to-top__progress-ring" viewBox="0 0 36 36">
          <path
            className="scroll-to-top__progress-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          <path
            className="scroll-to-top__progress-bar"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeDasharray="100, 100"
            strokeDashoffset={100 - scrollProgress}
          />
        </svg>
      </div>
    </button>
  );
};

export default ScrollToTop;