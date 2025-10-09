import React, { useState } from 'react';
import profilePic from '../../assets/profile.jpg';
import './ProfileImage.css';

const ProfileImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="profile-image-container">
      <div className="profile-image-wrapper">
        {!imageLoaded && (
          <div className="image-skeleton">
            <div className="skeleton-animation"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="image-fallback">
            <i className="fas fa-user"></i>
            <span>SC</span>
          </div>
        ) : (
          <img
            src={profilePic}
            alt="Smith C - Aspiring Software Developer"
            className={`profile-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {/* Decorative elements */}
        <div className="image-border"></div>
        <div className="image-glow"></div>
        
        {/* Floating elements */}
        <div className="floating-element element-1">
          <i className="fab fa-react"></i>
        </div>
        <div className="floating-element element-2">
          <i className="fab fa-node-js"></i>
        </div>
        <div className="floating-element element-3">
          <i className="fab fa-js-square"></i>
        </div>
        <div className="floating-element element-4">
          <i className="fas fa-database"></i>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="status-indicator">
        <div className="status-dot"></div>
        <span className="status-text">Available for opportunities</span>
      </div>
    </div>
  );
};

export default ProfileImage;