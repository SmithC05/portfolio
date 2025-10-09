import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = null,
  placeholder = null,
  onLoad = null,
  onError = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(img);

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const getImageSrc = () => {
    if (hasError && fallbackSrc) {
      return fallbackSrc;
    }
    return isInView ? src : '';
  };

  const getImageClasses = () => {
    let classes = className;
    
    if (!isLoaded && isInView) {
      classes += ' skeleton skeleton-image';
    }
    
    if (isLoaded) {
      classes += ' fade-in-up';
    }
    
    return classes.trim();
  };

  return (
    <div className="lazy-image-container" style={{ position: 'relative' }}>
      {/* Placeholder while loading */}
      {!isLoaded && isInView && placeholder && (
        <div className="lazy-image-placeholder">
          {placeholder}
        </div>
      )}
      
      {/* Skeleton loader */}
      {!isLoaded && isInView && !placeholder && (
        <div className={`skeleton skeleton-image ${className}`} />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={getImageSrc()}
        alt={alt}
        className={getImageClasses()}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          ...props.style
        }}
        {...props}
      />
      
      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="lazy-image-error">
          <i className="fas fa-image" />
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
};

// Optimized image component with multiple formats
export const OptimizedImage = ({ 
  src, 
  webpSrc = null, 
  avifSrc = null,
  sizes = null,
  ...props 
}) => {
  return (
    <picture>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <LazyImage src={src} sizes={sizes} {...props} />
    </picture>
  );
};

// Image gallery with lazy loading
export const LazyImageGallery = ({ images, className = '' }) => {
  return (
    <div className={`lazy-image-gallery ${className}`}>
      {images.map((image, index) => (
        <LazyImage
          key={index}
          src={image.src}
          alt={image.alt}
          className="gallery-image animate-stagger"
          style={{ animationDelay: `${index * 100}ms` }}
          fallbackSrc={image.fallback}
        />
      ))}
    </div>
  );
};

// Progressive image loading with blur effect
export const ProgressiveImage = ({ 
  src, 
  lowQualitySrc, 
  alt, 
  className = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLowQuality, setShowLowQuality] = useState(true);

  const handleLoad = () => {
    setIsLoaded(true);
    setTimeout(() => setShowLowQuality(false), 300);
  };

  return (
    <div className="progressive-image-container" style={{ position: 'relative' }}>
      {/* Low quality placeholder */}
      {showLowQuality && lowQualitySrc && (
        <img
          src={lowQualitySrc}
          alt={alt}
          className={`progressive-image-placeholder ${className}`}
          style={{
            filter: 'blur(5px)',
            transition: 'opacity 0.3s ease-out',
            opacity: isLoaded ? 0 : 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
      
      {/* High quality image */}
      <LazyImage
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        {...props}
      />
    </div>
  );
};

export default LazyImage;