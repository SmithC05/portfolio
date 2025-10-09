// Performance optimization utilities

// Debounce function for scroll events
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function for resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Preload images
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    })
  );
};

// Lazy load images with Intersection Observer
export const lazyLoadImages = (selector = 'img[data-src]') => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  const images = document.querySelectorAll(selector);
  images.forEach(img => imageObserver.observe(img));
};

// Optimize images for different screen sizes
export const getOptimizedImageUrl = (baseUrl, width, quality = 80) => {
  // This would typically integrate with an image optimization service
  // For now, return the base URL
  return baseUrl;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get device performance characteristics
export const getDevicePerformance = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const memory = navigator.deviceMemory || 4; // Default to 4GB
  const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores
  
  return {
    memory,
    cores,
    connectionType: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || 10,
    rtt: connection?.rtt || 100,
    saveData: connection?.saveData || false
  };
};

// Adaptive loading based on device performance
export const shouldUseReducedAnimations = () => {
  const performance = getDevicePerformance();
  
  return (
    prefersReducedMotion() ||
    performance.memory <= 2 ||
    performance.cores <= 2 ||
    performance.connectionType === 'slow-2g' ||
    performance.connectionType === '2g' ||
    performance.saveData
  );
};

// Bundle size optimization - dynamic imports
export const loadComponentAsync = (importFunc) => {
  return React.lazy(() => importFunc());
};

// Critical resource hints
export const addResourceHints = () => {
  const head = document.head;
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });
  
  // DNS prefetch for other domains
  const dnsPrefetchDomains = [
    'https://formspree.io'
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    head.appendChild(link);
  });
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};

// Performance observer for monitoring
export const setupPerformanceObserver = () => {
  if ('PerformanceObserver' in window) {
    // Monitor largest contentful paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Monitor first input delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    
    // Monitor cumulative layout shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
};

// Optimize scroll performance
export const optimizeScrollPerformance = () => {
  let ticking = false;
  
  const updateScrollPosition = () => {
    // Update scroll-dependent elements here
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', onScroll);
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is available
            if (confirm('New version available! Reload to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Font loading optimization
export const optimizeFontLoading = () => {
  // Use font-display: swap for better performance
  const fontFaces = [
    {
      family: 'Inter',
      src: 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)',
      display: 'swap'
    }
  ];
  
  fontFaces.forEach(font => {
    const fontFace = new FontFace(font.family, font.src, {
      display: font.display
    });
    
    fontFace.load().then(loadedFont => {
      document.fonts.add(loadedFont);
    });
  });
};

// Image format detection and optimization
export const getOptimalImageFormat = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  // Check WebP support
  const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  // Check AVIF support
  const supportsAVIF = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  
  if (supportsAVIF) return 'avif';
  if (supportsWebP) return 'webp';
  return 'jpg';
};

// Cleanup utilities
export const cleanup = {
  // Remove event listeners
  removeEventListeners: (element, events) => {
    events.forEach(({ type, handler, options }) => {
      element.removeEventListener(type, handler, options);
    });
  },
  
  // Cancel animation frames
  cancelAnimationFrames: (frameIds) => {
    frameIds.forEach(id => cancelAnimationFrame(id));
  },
  
  // Clear timeouts and intervals
  clearTimers: (timerIds) => {
    timerIds.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
  }
};