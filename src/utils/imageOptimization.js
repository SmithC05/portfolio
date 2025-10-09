// Image optimization utilities

// Compress image using canvas
export const compressImage = (file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Generate responsive image URLs
export const generateResponsiveImageUrls = (baseUrl, sizes = [400, 800, 1200, 1600]) => {
  // In a real application, this would integrate with an image CDN
  // For now, return the base URL for all sizes
  return sizes.reduce((acc, size) => {
    acc[size] = baseUrl; // Would be: `${baseUrl}?w=${size}&q=80`
    return acc;
  }, {});
};

// Create WebP version of image
export const createWebPVersion = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      // Check if browser supports WebP
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('WebP not supported'));
        }
      }, 'image/webp', 0.8);
    };
    
    img.onerror = reject;
    img.src = imageUrl;
  });
};

// Preload critical images
export const preloadCriticalImages = (imageUrls) => {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to preload: ${url}`));
      img.src = url;
    });
  });
  
  return Promise.allSettled(promises);
};

// Generate blur placeholder
export const generateBlurPlaceholder = (imageUrl, quality = 0.1) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create small version for blur effect
      const smallWidth = 40;
      const smallHeight = (img.height / img.width) * smallWidth;
      
      canvas.width = smallWidth;
      canvas.height = smallHeight;
      
      ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
      
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', quality);
    };
    
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
};

// Image format detection
export const getSupportedImageFormats = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const formats = {
    webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
    avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0,
    jpeg: true, // Always supported
    png: true   // Always supported
  };
  
  return formats;
};

// Get optimal image format for browser
export const getOptimalFormat = () => {
  const formats = getSupportedImageFormats();
  
  if (formats.avif) return 'avif';
  if (formats.webp) return 'webp';
  return 'jpeg';
};

// Image loading with retry mechanism
export const loadImageWithRetry = (src, maxRetries = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const tryLoad = () => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      
      img.onerror = () => {
        attempts++;
        if (attempts < maxRetries) {
          setTimeout(tryLoad, delay * attempts);
        } else {
          reject(new Error(`Failed to load image after ${maxRetries} attempts: ${src}`));
        }
      };
      
      img.src = src;
    };
    
    tryLoad();
  });
};

// Lazy loading with Intersection Observer
export const createLazyLoader = (options = {}) => {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    loadingClass = 'loading',
    loadedClass = 'loaded',
    errorClass = 'error'
  } = options;
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    return {
      observe: (element) => {
        const img = element.querySelector('img[data-src]');
        if (img) {
          img.src = img.dataset.src;
          img.classList.add(loadedClass);
        }
      },
      disconnect: () => {}
    };
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const img = element.querySelector('img[data-src]') || element;
        
        if (img.dataset.src) {
          element.classList.add(loadingClass);
          
          loadImageWithRetry(img.dataset.src)
            .then(() => {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              element.classList.remove(loadingClass);
              element.classList.add(loadedClass);
            })
            .catch(() => {
              element.classList.remove(loadingClass);
              element.classList.add(errorClass);
            });
        }
        
        observer.unobserve(element);
      }
    });
  }, {
    rootMargin,
    threshold
  });
  
  return observer;
};

// Image optimization for different screen densities
export const getOptimizedImageUrl = (baseUrl, width, density = 1, format = 'auto') => {
  const actualWidth = width * density;
  const optimalFormat = format === 'auto' ? getOptimalFormat() : format;
  
  // In a real application, this would integrate with an image CDN
  // For now, return the base URL
  return baseUrl;
  
  // Example with image CDN:
  // return `${baseUrl}?w=${actualWidth}&f=${optimalFormat}&q=80`;
};

// Batch image preloader
export class ImagePreloader {
  constructor() {
    this.cache = new Map();
    this.loading = new Set();
  }
  
  async preload(urls) {
    const newUrls = urls.filter(url => !this.cache.has(url) && !this.loading.has(url));
    
    if (newUrls.length === 0) {
      return Promise.resolve();
    }
    
    newUrls.forEach(url => this.loading.add(url));
    
    const promises = newUrls.map(async (url) => {
      try {
        const img = await loadImageWithRetry(url);
        this.cache.set(url, img);
        this.loading.delete(url);
        return { url, success: true };
      } catch (error) {
        this.loading.delete(url);
        return { url, success: false, error };
      }
    });
    
    return Promise.allSettled(promises);
  }
  
  isLoaded(url) {
    return this.cache.has(url);
  }
  
  isLoading(url) {
    return this.loading.has(url);
  }
  
  clear() {
    this.cache.clear();
    this.loading.clear();
  }
}

// Global image preloader instance
export const imagePreloader = new ImagePreloader();

// Asset optimization utilities
export const assetOptimization = {
  // Preload fonts
  preloadFonts: (fontUrls) => {
    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = url;
      document.head.appendChild(link);
    });
  },
  
  // Preload CSS
  preloadCSS: (cssUrls) => {
    cssUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      document.head.appendChild(link);
    });
  },
  
  // Optimize CSS delivery
  loadCSSAsync: (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  },
  
  // Remove unused CSS (basic implementation)
  removeUnusedCSS: () => {
    const usedSelectors = new Set();
    
    // Collect all used classes and IDs
    document.querySelectorAll('*').forEach(element => {
      element.classList.forEach(className => {
        usedSelectors.add(`.${className}`);
      });
      
      if (element.id) {
        usedSelectors.add(`#${element.id}`);
      }
    });
    
    // This is a simplified version - in practice, you'd use a tool like PurgeCSS
    console.log('Used selectors:', usedSelectors.size);
  }
};