import { useEffect, useRef } from 'react';

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animation to children if specified
            if (options.stagger) {
              const children = entry.target.querySelectorAll('.animate-stagger');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('animate-in');
                }, index * (options.staggerDelay || 100));
              });
            }
            
            // Unobserve after animation if specified
            if (options.once) {
              observer.unobserve(entry.target);
            }
          } else if (!options.once) {
            entry.target.classList.remove('animate-in');
            
            // Remove staggered animations from children
            if (options.stagger) {
              const children = entry.target.querySelectorAll('.animate-stagger');
              children.forEach((child) => {
                child.classList.remove('animate-in');
              });
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return elementRef;
};

// Smooth scroll to element utility
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Progress bar animation utility
export const animateProgressBar = (element, targetWidth, duration = 1500) => {
  if (!element) return;
  
  element.style.width = '0%';
  element.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  
  // Trigger animation on next frame
  requestAnimationFrame(() => {
    element.style.width = `${targetWidth}%`;
  });
};

// Typing animation utility
export const createTypingAnimation = (element, text, speed = 100) => {
  if (!element) return;
  
  element.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  };
  
  typeWriter();
};

// Staggered animation utility for lists
export const staggerAnimation = (elements, delay = 100) => {
  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * delay}ms`;
    element.classList.add('animate-in');
  });
};

// Loading state manager
export class LoadingStateManager {
  constructor() {
    this.loadingStates = new Map();
  }
  
  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.updateGlobalLoadingState();
  }
  
  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }
  
  updateGlobalLoadingState() {
    const hasAnyLoading = Array.from(this.loadingStates.values()).some(Boolean);
    document.body.classList.toggle('loading', hasAnyLoading);
  }
}

// Global loading state manager instance
export const loadingManager = new LoadingStateManager();

// Performance monitoring utilities
export const performanceMonitor = {
  // Measure animation performance
  measureAnimation: (name, callback) => {
    const start = performance.now();
    
    const finish = () => {
      const end = performance.now();
      console.log(`Animation "${name}" took ${end - start} milliseconds`);
    };
    
    if (callback) {
      callback();
      requestAnimationFrame(finish);
    }
    
    return finish;
  },
  
  // Check if device prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Check if device has low performance
  isLowPerformanceDevice: () => {
    // Simple heuristic based on hardware concurrency and memory
    const cores = navigator.hardwareConcurrency || 1;
    const memory = navigator.deviceMemory || 1;
    
    return cores <= 2 || memory <= 2;
  },
  
  // Adaptive animation settings
  getAnimationSettings: () => {
    if (performanceMonitor.prefersReducedMotion()) {
      return { duration: 0, enabled: false };
    }
    
    if (performanceMonitor.isLowPerformanceDevice()) {
      return { duration: 200, enabled: true, reduced: true };
    }
    
    return { duration: 600, enabled: true, reduced: false };
  }
};

// Intersection Observer polyfill check
export const supportsIntersectionObserver = () => {
  return 'IntersectionObserver' in window;
};

// Fallback for browsers without Intersection Observer
export const fallbackScrollAnimation = (elements) => {
  if (supportsIntersectionObserver()) return;
  
  const handleScroll = () => {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('animate-in');
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
  
  return () => window.removeEventListener('scroll', handleScroll);
};