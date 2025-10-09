import React, { useEffect, useRef } from 'react';
import { focusManagement } from '../../utils/accessibility';
import LazyImage from './LazyImage';
import './CertificateModal.css';

const CertificateModal = ({ certificate, onClose, isMobile }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    // Set up focus trap
    const cleanup = focusManagement.trapFocus(modalRef.current);

    // Focus the close button initially
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    if (isMobile) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }

    return () => {
      cleanup();
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobile]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="certificate-modal" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-content" role="document">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {certificate.title || 'Certificate'}
          </h2>
          <button
            ref={closeButtonRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close certificate viewer"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="modal-body">
          <p id="modal-description" className="sr-only">
            Full size view of {certificate.title || 'certificate'}. Use arrow keys to navigate or press Escape to close.
          </p>
          
          <div className="modal-image-container">
            <LazyImage 
              src={certificate.image} 
              alt={`Full size ${certificate.title || 'certificate'}`}
              className="modal-image"
              onLoad={() => {
                // Ensure image is fully loaded before showing
                if (isMobile) {
                  // Add slight delay for better mobile experience
                  setTimeout(() => {
                    const img = document.querySelector('.modal-image img');
                    if (img) {
                      img.style.opacity = '1';
                      // Announce to screen readers that image has loaded
                      const announcement = document.createElement('div');
                      announcement.setAttribute('aria-live', 'polite');
                      announcement.className = 'sr-only';
                      announcement.textContent = 'Certificate image loaded';
                      document.body.appendChild(announcement);
                      setTimeout(() => document.body.removeChild(announcement), 1000);
                    }
                  }, 100);
                }
              }}
              onError={() => {
                // Announce error to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'assertive');
                announcement.className = 'sr-only';
                announcement.textContent = 'Failed to load certificate image';
                document.body.appendChild(announcement);
                setTimeout(() => document.body.removeChild(announcement), 3000);
              }}
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="modal-controls">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Download or open in new tab
                const link = document.createElement('a');
                link.href = certificate.image;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.download = `${certificate.title || 'certificate'}.jpg`;
                link.click();
              }}
              type="button"
              aria-label={`Download ${certificate.title || 'certificate'}`}
            >
              <span aria-hidden="true">📥</span>
              Download
            </button>
          </div>
          
          <div className="modal-help">
            <p className="help-text">
              <kbd>Esc</kbd> to close • <kbd>Tab</kbd> to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;