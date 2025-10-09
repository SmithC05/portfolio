import React, { useState } from 'react';
import './CertificatesGrid.css';

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
    // Simulate download functionality
    // In a real implementation, this would download the actual certificate file
    const link = document.createElement('a');
    link.href = `/certificates/${certificate.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    link.download = `${certificate.title} - ${certificate.issuer}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Mobile Development': '📱',
      'Web Development': '🌐',
      'Cloud & AI': '☁️',
      'Networking': '🔗',
      'Data Science': '📊',
      'Cybersecurity': '🔒'
    };
    return icons[category] || '📜';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mobile Development': '#10b981',
      'Web Development': '#3b82f6',
      'Cloud & AI': '#8b5cf6',
      'Networking': '#f59e0b',
      'Data Science': '#ef4444',
      'Cybersecurity': '#06b6d4'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <>
      <div className="certificates-grid">
        {certifications.map((certificate) => (
          <div 
            key={certificate.id} 
            className="certificate-card"
            onClick={() => openModal(certificate)}
          >
            <div className="certificate-header">
              <div 
                className="certificate-category-icon"
                style={{ color: getCategoryColor(certificate.category) }}
              >
                {getCategoryIcon(certificate.category)}
              </div>
              <div 
                className="certificate-category"
                style={{ 
                  backgroundColor: `${getCategoryColor(certificate.category)}20`,
                  color: getCategoryColor(certificate.category),
                  borderColor: `${getCategoryColor(certificate.category)}40`
                }}
              >
                {certificate.category}
              </div>
            </div>
            
            <div className="certificate-content">
              <h4 className="certificate-title">{certificate.title}</h4>
              <p className="certificate-issuer">{certificate.issuer}</p>
              <div className="certificate-type">{certificate.type}</div>
              
              {certificate.subcertifications && (
                <div className="subcertifications">
                  <span className="subcertifications-label">Includes:</span>
                  <div className="subcertifications-list">
                    {certificate.subcertifications.map((sub, index) => (
                      <span key={index} className="subcertification-tag">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="certificate-footer">
              <span className={`certificate-status ${certificate.status.toLowerCase()}`}>
                {certificate.status}
              </span>
              <button 
                className="view-certificate-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(certificate);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div 
          className="certificate-modal-overlay"
          onClick={handleModalClick}
        >
          <div className="certificate-modal">
            <div className="certificate-modal-header">
              <div className="modal-certificate-info">
                <div 
                  className="modal-category-icon"
                  style={{ color: getCategoryColor(selectedCertificate.category) }}
                >
                  {getCategoryIcon(selectedCertificate.category)}
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
                    {getCategoryIcon(selectedCertificate.category)}
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
                  <span className="download-icon">⬇</span>
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