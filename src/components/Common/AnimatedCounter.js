import React, { useState, useEffect, useRef } from 'react';
import './AnimatedCounter.css';

const AnimatedCounter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '',
  triggerOnView = true 
}) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!triggerOnView) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [triggerOnView, isVisible]);

  const startAnimation = () => {
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (totalChange * easeOutQuart));
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div 
      ref={counterRef}
      className={`animated-counter ${className}`}
    >
      <span className="animated-counter__value">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    </div>
  );
};

export default AnimatedCounter;