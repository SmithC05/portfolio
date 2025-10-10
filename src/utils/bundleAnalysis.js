// Bundle size analysis and optimization utilities

// Analyze bundle size and performance
export const bundleAnalysis = {
  // Get bundle size information
  getBundleSize: async () => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const response = await fetch('/static/js/bundle.js', { method: 'HEAD' });
        const size = response.headers.get('content-length');
        return {
          bundleSize: size ? parseInt(size) : 0,
          bundleSizeFormatted: formatBytes(size ? parseInt(size) : 0)
        };
      } catch (error) {
        console.warn('Could not fetch bundle size:', error);
        return { bundleSize: 0, bundleSizeFormatted: '0 B' };
      }
    }
    return { bundleSize: 0, bundleSizeFormatted: 'N/A' };
  },

  // Analyze loaded modules
  getLoadedModules: () => {
    if (typeof window !== 'undefined' && window.__webpack_require__) {
      const modules = window.__webpack_require__.cache || {};
      return Object.keys(modules).map(id => ({
        id,
        module: modules[id]?.exports,
        loaded: !!modules[id]
      }));
    }
    return [];
  },

  // Get performance metrics
  getPerformanceMetrics: () => {
    if (!('performance' in window)) return null;

    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    return {
      // Navigation timing
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
      
      // Paint timing
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
      
      // Memory usage (if available)
      memoryUsage: performance.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      } : null
    };
  },

  // Log performance summary
  logPerformanceSummary: () => {
    const metrics = bundleAnalysis.getPerformanceMetrics();
    if (metrics) {
      console.group('📊 Performance Summary');
      console.log('🎨 First Paint:', metrics.firstPaint ? `${metrics.firstPaint.toFixed(2)}ms` : 'N/A');
      console.log('🖼️ First Contentful Paint:', metrics.firstContentfulPaint ? `${metrics.firstContentfulPaint.toFixed(2)}ms` : 'N/A');
      console.log('📄 DOM Content Loaded:', metrics.domContentLoaded ? `${metrics.domContentLoaded.toFixed(2)}ms` : 'N/A');
      console.log('✅ Load Complete:', metrics.loadComplete ? `${metrics.loadComplete.toFixed(2)}ms` : 'N/A');
      
      if (metrics.memoryUsage) {
        console.log('🧠 Memory Usage:', `${metrics.memoryUsage.used}MB / ${metrics.memoryUsage.total}MB`);
      }
      console.groupEnd();
    }
  }
};

// Code splitting utilities
export const codeSplitting = {
  // Dynamic import with error handling
  loadComponent: async (importFunc, fallback = null) => {
    try {
      const module = await importFunc();
      return module.default || module;
    } catch (error) {
      console.error('Failed to load component:', error);
      return fallback;
    }
  },

  // Preload route components
  preloadRoutes: (routes) => {
    routes.forEach(route => {
      if (route.component && typeof route.component === 'function') {
        // Preload the component
        route.component().catch(error => {
          console.warn('Failed to preload route:', route.path, error);
        });
      }
    });
  },

  // Load component on interaction
  loadOnInteraction: (importFunc, triggerEvents = ['mouseenter', 'focus']) => {
    return new Promise((resolve) => {
      const load = () => {
        importFunc().then(resolve).catch(error => {
          console.error('Failed to load on interaction:', error);
          resolve(null);
        });
      };

      // Load immediately if user has fast connection
      if (navigator.connection && navigator.connection.effectiveType === '4g') {
        load();
        return;
      }

      // Otherwise wait for interaction
      const cleanup = () => {
        triggerEvents.forEach(event => {
          document.removeEventListener(event, handleInteraction, true);
        });
      };

      const handleInteraction = () => {
        cleanup();
        load();
      };

      triggerEvents.forEach(event => {
        document.addEventListener(event, handleInteraction, { once: true, passive: true });
      });

      // Fallback: load after 5 seconds
      setTimeout(() => {
        cleanup();
        load();
      }, 5000);
    });
  }
};

// Tree shaking analysis
export const treeShaking = {
  // Detect unused exports (development only)
  detectUnusedExports: () => {
    if (process.env.NODE_ENV !== 'development') return [];

    const unusedExports = [];
    
    // This is a simplified version - in practice you'd use webpack-bundle-analyzer
    console.warn('Tree shaking analysis requires webpack-bundle-analyzer for accurate results');
    
    return unusedExports;
  },

  // Suggest optimizations
  suggestOptimizations: () => {
    const suggestions = [];

    // Check for large dependencies
    if (window.React && window.ReactDOM) {
      suggestions.push({
        type: 'dependency',
        message: 'Consider using Preact for smaller bundle size',
        impact: 'high'
      });
    }

    // Check for unused CSS
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    if (stylesheets.length > 5) {
      suggestions.push({
        type: 'css',
        message: 'Consider combining CSS files or using CSS-in-JS',
        impact: 'medium'
      });
    }

    // Check for large images
    const images = document.querySelectorAll('img');
    const largeImages = Array.from(images).filter(img => {
      return img.naturalWidth > 1920 || img.naturalHeight > 1080;
    });

    if (largeImages.length > 0) {
      suggestions.push({
        type: 'images',
        message: `${largeImages.length} images could be optimized for web`,
        impact: 'high'
      });
    }

    return suggestions;
  }
};

// Utility functions
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Performance budget checker
export const performanceBudget = {
  budgets: {
    bundleSize: 250 * 1024, // 250KB
    firstPaint: 1000, // 1s
    firstContentfulPaint: 1500, // 1.5s
    domContentLoaded: 2000, // 2s
    loadComplete: 3000 // 3s
  },

  checkBudgets: async () => {
    const results = [];
    
    // Check bundle size
    const { bundleSize } = await bundleAnalysis.getBundleSize();
    results.push({
      metric: 'Bundle Size',
      value: bundleSize,
      budget: performanceBudget.budgets.bundleSize,
      passed: bundleSize <= performanceBudget.budgets.bundleSize,
      formatted: formatBytes(bundleSize)
    });

    // Check performance metrics
    const metrics = bundleAnalysis.getPerformanceMetrics();
    if (metrics) {
      const checks = [
        { name: 'First Paint', value: metrics.firstPaint, budget: performanceBudget.budgets.firstPaint },
        { name: 'First Contentful Paint', value: metrics.firstContentfulPaint, budget: performanceBudget.budgets.firstContentfulPaint },
        { name: 'DOM Content Loaded', value: metrics.domContentLoaded, budget: performanceBudget.budgets.domContentLoaded },
        { name: 'Load Complete', value: metrics.loadComplete, budget: performanceBudget.budgets.loadComplete }
      ];

      checks.forEach(check => {
        if (check.value !== null && check.value !== undefined) {
          results.push({
            metric: check.name,
            value: check.value,
            budget: check.budget,
            passed: check.value <= check.budget,
            formatted: `${check.value.toFixed(2)}ms`
          });
        }
      });
    }

    return results;
  },

  logBudgetResults: async () => {
    const results = await performanceBudget.checkBudgets();
    
    console.group('💰 Performance Budget');
    results.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      const percentage = ((result.value / result.budget) * 100).toFixed(1);
      console.log(`${status} ${result.metric}: ${result.formatted} (${percentage}% of budget)`);
    });
    console.groupEnd();

    return results;
  }
};

// Initialize bundle analysis in development
export const initializeBundleAnalysis = () => {
  if (process.env.NODE_ENV === 'development') {
    // Log performance summary after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        bundleAnalysis.logPerformanceSummary();
        performanceBudget.logBudgetResults();
        
        const suggestions = treeShaking.suggestOptimizations();
        if (suggestions.length > 0) {
          console.group('💡 Optimization Suggestions');
          suggestions.forEach(suggestion => {
            const impact = suggestion.impact === 'high' ? '🔴' : suggestion.impact === 'medium' ? '🟡' : '🟢';
            console.log(`${impact} ${suggestion.message}`);
          });
          console.groupEnd();
        }
      }, 1000);
    });

    // Monitor performance over time (only in development and for limited time)
    if (process.env.NODE_ENV === 'development') {
      let monitoringCount = 0;
      const maxMonitoringCycles = 10; // Stop after 10 cycles (5 minutes)
      
      const performanceMonitor = setInterval(() => {
        const metrics = bundleAnalysis.getPerformanceMetrics();
        if (metrics?.memoryUsage && metrics.memoryUsage.used > 50) {
          console.warn('⚠️ High memory usage detected:', `${metrics.memoryUsage.used}MB`);
        }
        
        monitoringCount++;
        if (monitoringCount >= maxMonitoringCycles) {
          clearInterval(performanceMonitor);
          console.log('🔍 Performance monitoring completed');
        }
      }, 30000); // Check every 30 seconds
    }
  }
};