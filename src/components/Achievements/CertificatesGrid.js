import React, { useState, useEffect ,useRef} from 'react';
import './CertificatesGrid.css';

const CertificateCard = ({ certificate, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate progress after card appears
      setTimeout(() => {
        setAnimatedProgress(getCertificateProgress());
      }, 300);
    }, index * 150);
    
    return () => clearTimeout(timer);
  }, [index]);


  const getCategoryIcon = (category) => {
    const icons = {
      'Mobile Development': 'fas fa-mobile-alt',
      'Web Development': 'fas fa-globe',
      'Cloud & AI': 'fas fa-cloud',
      'Networking': 'fas fa-network-wired',
      'Data Science': 'fas fa-chart-bar',
      'Cybersecurity': 'fas fa-shield-alt'
    };
    return icons[category] || 'fas fa-certificate';
  };

  const getStatusLevel = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'in progress':
        return 'progress';
      case 'expired':
        return 'expired';
      default:
        return 'completed';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'in progress':
        return 'In Progress';
      case 'expired':
        return 'Expired';
      default:
        return 'Completed';
    }
  };

  const getCertificateProgress = () => {
    switch (certificate.status.toLowerCase()) {
      case 'completed':
        return 100;
      case 'in progress':
        return 60;
      case 'expired':
        return 25;
      default:
        return 100;
    }
  };

  const getSubcertCount = () => {
    return certificate.subcertifications ? certificate.subcertifications.length : 1;
  };

  return (
    <div className={`modern-certificate-card ${isVisible ? 'visible' : ''}`} onClick={() => onClick(certificate)}>
      {/* Floating Orb */}
      <div className="certificate-orb">
        <div className={`certificate-orb__inner certificate-orb__inner--${getStatusLevel(certificate.status)}`}>
          <i className={getCategoryIcon(certificate.category)}></i>
        </div>
        <div className="certificate-orb__ring"></div>
      </div>

      {/* Certificate Info */}
      <div className="certificate-info">
        <h3 className="certificate-name">{certificate.title}</h3>
        <div className="certificate-level">
          <span className={`certificate-badge certificate-badge--${getStatusLevel(certificate.status)}`}>
            {getStatusText(certificate.status)}
          </span>
        </div>
        <p className="certificate-issuer">{certificate.issuer}</p>
        <p className="certificate-type">{certificate.type}</p>
      </div>

      {/* Circular Progress */}
<div className="certificate-progress-circle">
  <svg
    className="progress-ring"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Background Circle */}
    <circle
      className="progress-ring__circle-bg"
      stroke="rgba(255, 255, 255, 0.1)"
      strokeWidth="6"
      fill="transparent"
      r="45"
      cx="50"
      cy="50"
    />

    {/* Progress Circle */}
    <circle
      className={`progress-ring__circle progress-ring__circle--${getStatusLevel(
        certificate.status
      )}`}
      strokeWidth="6"
      fill="transparent"
      r="45"
      cx="50"
      cy="50"
      strokeLinecap="round"
      style={{
        strokeDasharray: `${2 * Math.PI * 45}`,
        strokeDashoffset: `${2 * Math.PI * 45 * (1 - animatedProgress / 100)}`,
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%",
        transition: "stroke-dashoffset 1.8s ease"
      }}
    />
  </svg>

  <div className="progress-percentage">
    <span className="progress-number">{getSubcertCount()}</span>
    <span className="progress-symbol">cert</span>
  </div>
</div>


      {/* Subcertifications */}
      {certificate.subcertifications && (
        <div className="certificate-subcerts">
          {certificate.subcertifications.slice(0, 3).map((sub, index) => (
            <span key={index} className="subcert-bubble">
              {sub}
            </span>
          ))}
          {certificate.subcertifications.length > 3 && (
            <span className="subcert-bubble subcert-bubble--more">
              +{certificate.subcertifications.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Hover Effects */}
      <div className="certificate-card-glow"></div>
      <div className="certificate-card-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  );
};

const CertificatesGrid = ({ certifications }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('certificate-modal-overlay')) {
      closeModal();
    }
  };

  const handleDownload = (certificate) => {
    const link = document.createElement('a');
    link.href = `/certificates/${certificate.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    link.download = `${certificate.title} - ${certificate.issuer}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Mobile Development': 'fas fa-mobile-alt',
      'Web Development': 'fas fa-globe',
      'Cloud & AI': 'fas fa-cloud',
      'Networking': 'fas fa-network-wired',
      'Data Science': 'fas fa-chart-bar',
      'Cybersecurity': 'fas fa-shield-alt'
    };
    return icons[category] || 'fas fa-certificate';
  };
  const modalRef = useRef(null);

useEffect(() => {
  if (isModalOpen && modalRef.current) {
    modalRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [isModalOpen]);


  if (!certifications.length) {
    return (
      <div className="certificates-grid-empty">
        <div className="empty-state-animation">
          <div className="empty-orb"></div>
          <div className="empty-rings">
            <div className="empty-ring"></div>
            <div className="empty-ring"></div>
            <div className="empty-ring"></div>
          </div>
        </div>
        <h3>No Certificates Found</h3>
        <p>Try selecting a different category to explore more certifications.</p>
      </div>
    );
  }

  return (
    <>
      <div className="modern-certificates-grid">
        {certifications.map((certificate, index) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onClick={openModal}
            index={index}
          />
        ))}
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div 
          className="certificate-modal-overlay"
          onClick={handleModalClick}
        >
          <div className="certificate-modal" ref={modalRef}>
            <div className="certificate-modal-header">
              <div className="modal-certificate-info">
                <div className="modal-category-icon">
                  <i className={getCategoryIcon(selectedCertificate.category)}></i>
                </div>
                <div>
                  <h3 className="modal-certificate-title">{selectedCertificate.title}</h3>
                  <p className="modal-certificate-issuer">Issued by {selectedCertificate.issuer}</p>
                </div>
              </div>
              <button 
                className="modal-close-btn"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            
            <div className="certificate-modal-content">
              <div className="certificate-preview">
                <div className="certificate-placeholder">
                  <div className="certificate-placeholder-icon">
                    <i className={getCategoryIcon(selectedCertificate.category)}></i>
                  </div>
                  <h4>{selectedCertificate.title}</h4>
                  <p>Certificate Preview</p>
                  <div className="certificate-details">
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{selectedCertificate.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Type:</span>
                      <span className="detail-value">{selectedCertificate.type}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className={`detail-value status ${selectedCertificate.status.toLowerCase()}`}>
                        {selectedCertificate.status}
                      </span>
                    </div>
                  </div>
                  
                  {selectedCertificate.subcertifications && (
                    <div className="modal-subcertifications">
                      <h5>Included Certifications:</h5>
                      <div className="modal-subcertifications-list">
                        {selectedCertificate.subcertifications.map((sub, index) => (
                          <span key={index} className="modal-subcertification-tag">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="certificate-modal-actions">
                <button 
                  className="download-btn"
                  onClick={() => handleDownload(selectedCertificate)}
                >
                  <i className="fas fa-download download-icon"></i>
                  Download Certificate
                </button>
                <button 
                  className="close-btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificatesGrid;