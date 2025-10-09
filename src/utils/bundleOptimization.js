// Bundle optimization utilities

// Dynamic imports for code splitting
export const loadComponentLazy = (componentPath) => {
  return React.lazy(() => import(componentPath));
};

// Preload modules for better performance
export const preloadModule = (modulePath) => {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = modulePath;
  document.head.appendChild(link);
};

// Tree shaking utilities
export const importOnlyNeeded = {
  // Import only needed FontAwesome icons
  loadFontAwesome: async (icons = []) => {
    const { library, dom } = await import('@fortawesome/fontawesome-svg-core');
    
    // Import only the icons we need
    const iconPromises = icons.map(async (iconName) => {
      try {
        const icon = await import(`@fortawesome/free-solid-svg-icons/fa${iconName}`);
        return icon[`fa${iconName}`];
      } catch (error) {
        console.warn(`Failed to load icon: ${iconName}`);
        return null;
      }
    });
    
    const loadedIcons = await Promise.all(iconPromises);
    const validIcons = loadedIcons.filter(Boolean);
    
    library.add(...validIcons);
    dom.watch();
  },
  
  // Load only needed Lodash functions
  loadLodash: async (functions = []) => {
    const lodashFunctions = {};
    
    for (const funcName of functions) {
      try {
        const func = await import(`lodash/${funcName}`);
        lodashFunctions[funcName] = func.default;
      } catch (error) {
        console.warn(`Failed to load lodash function: ${funcName}`);
      }
    }
    
    return lodashFunctions;
  }
};

// Critical CSS extraction
export const extractCriticalCSS = () => {
  const criticalSelectors = [
    'body', 'html',
    '.navbar', '.nav-container', '.nav-links',
    '.home', '.content', '.profile-image',
    '.marquee',
    '.loading-spinner', '.skeleton'
  ];
  
  const criticalCSS = [];
  
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          const selector = rule.selectorText;
          if (criticalSelectors.some(critical => selector.includes(critical))) {
            criticalCSS.push(rule.cssText);
          }
        }
      }
    } catch (error) {
      // Cross-origin stylesheets may throw errors
      console.warn('Could not access stylesheet:', sheet.href);
    }
  }
  
  return criticalCSS.join('\n');
};

// Resource hints for better loading
export const addResourceHints = () => {
  const hints = [
    // Preconnect to external domains
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
    
    // DNS prefetch for other domains
    { rel: 'dns-prefetch', href: 'https://formspree.io' },
    
    // Preload critical fonts
    {
      rel: 'preload',
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: true
    }
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      if (key === 'crossorigin' && value === true) {
        link.crossOrigin = 'anonymous';
      } else {
        link[key] = value;
      }
    });
    document.head.appendChild(link);
  });
};

// Webpack bundle analyzer data (for development)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    // This would integrate with webpack-bundle-analyzer
    console.log('Bundle analysis would run here in development');
    
    // Simple performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      console.log('Page load metrics:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      });
    }
  }
};

// Code splitting strategies
export const codeSplitting = {
  // Route-based splitting
  loadRouteComponent: (routeName) => {
    return React.lazy(() => import(`../pages/${routeName}`));
  },
  
  // Feature-based splitting
  loadFeature: (featureName) => {
    return React.lazy(() => import(`../features/${featureName}`));
  },
  
  // Vendor splitting
  loadVendorLibrary: async (libraryName) => {
    switch (libraryName) {
      case 'charts':
        return await import('chart.js');
      case 'animations':
        return await import('framer-motion');
      case 'forms':
        return await import('react-hook-form');
      default:
        throw new Error(`Unknown library: ${libraryName}`);
    }
  }
};

// Performance budgets
export const performanceBudgets = {
  // Check if bundle size exceeds budget
  checkBundleSize: (budget = 250000) => { // 250KB default
    if ('performance' in window) {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') && resource.transferSize
      );
      
      const totalJSSize = jsResources.reduce((total, resource) => 
        total + resource.transferSize, 0
      );
      
      if (totalJSSize > budget) {
        console.warn(`Bundle size (${totalJSSize} bytes) exceeds budget (${budget} bytes)`);
        return false;
      }
      
      console.log(`Bundle size: ${totalJSSize} bytes (within budget)`);
      return true;
    }
    
    return true;
  },
  
  // Check loading performance
  checkLoadingPerformance: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const metrics = {
        fcp: 0, // First Contentful Paint
        lcp: 0, // Largest Contentful Paint
        fid: 0, // First Input Delay
        cls: 0  // Cumulative Layout Shift
      };
      
      // Get FCP
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
      }
      
      // Performance budgets (Core Web Vitals)
      const budgets = {
        fcp: 1800,  // 1.8s
        lcp: 2500,  // 2.5s
        fid: 100,   // 100ms
        cls: 0.1    // 0.1
      };
      
      const results = {};
      Object.entries(metrics).forEach(([metric, value]) => {
        results[metric] = {
          value,
          budget: budgets[metric],
          passed: value <= budgets[metric]
        };
      });
      
      console.log('Performance metrics:', results);
      return results;
    }
    
    return null;
  }
};

// Memory optimization
export const memoryOptimization = {
  // Clean up event listeners
  cleanupEventListeners: (element, listeners) => {
    listeners.forEach(({ event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
  },
  
  // Debounce expensive operations
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Weak references for caching
  createWeakCache: () => {
    return new WeakMap();
  },
  
  // Monitor memory usage
  monitorMemory: () => {
    if ('memory' in performance) {
      const memory = performance.memory;
      const usage = {
        used: Math.round(memory.usedJSHeapSize / 1048576),
        total: Math.round(memory.totalJSHeapSize / 1048576),
        limit: Math.round(memory.jsHeapSizeLimit / 1048576)
      };
      
      console.log('Memory usage:', usage);
      
      // Warn if memory usage is high
      if (usage.used / usage.limit > 0.8) {
        console.warn('High memory usage detected');
      }
      
      return usage;
    }
    
    return null;
  }
};