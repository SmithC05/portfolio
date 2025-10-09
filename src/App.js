import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import { useScrollAnimation } from "./components/Common/ScrollAnimations";
import LazyImage from "./components/Common/LazyImage";
import { initializeAccessibility } from "./utils/accessibility";
import { addResourceHints, shouldUseReducedAnimations } from "./utils/performance";
import "./App.css";
import "./styles/animations.css";
import "./styles/accessibility.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import profilePic from "./assets/profile.jpg"; // Moved to HeroSection component 
import cert1 from "./assets/c-certificate.jpg";
import toefl1 from "./assets/toefl-certificate1.jpg";
import toefl2 from "./assets/toefl-certificate2.jpg";
import cybersecurity from "./assets/cybersecurity.jpg";
import dataScience from "./assets/data-science.jpg";
import iot from "./assets/iot.jpg";
import modernAI from "./assets/modern-ai.jpg";
import aiFundamentals from "./assets/ai-fundamentals.jpg";
import symposium from "./assets/symposium-certificate.jpg";
import recognition from "./assets/certificate-seedstart.jpg";



function App() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [useReducedAnimations, setUseReducedAnimations] = useState(false);

  // Scroll animation refs
  const aboutRef = useScrollAnimation({ threshold: 0.2, once: true });
  const skillsRef = useScrollAnimation({ threshold: 0.2, stagger: true, staggerDelay: 150, once: true });
  const projectsRef = useScrollAnimation({ threshold: 0.1, stagger: true, staggerDelay: 200, once: true });
  const certificatesRef = useScrollAnimation({ threshold: 0.1, stagger: true, staggerDelay: 100, once: true });
  const contactRef = useScrollAnimation({ threshold: 0.2, once: true });

  // Initialize performance and accessibility features
  useEffect(() => {
    // Add resource hints for better performance
    addResourceHints();
    
    // Initialize accessibility features
    initializeAccessibility();
    
    // Check if we should use reduced animations
    setUseReducedAnimations(shouldUseReducedAnimations());
    
    // Register service worker for caching
    import('./utils/performance').then(({ registerServiceWorker }) => {
      registerServiceWorker();
    });
    
    // Preload critical images
    import('./utils/imageOptimization').then(({ preloadCriticalImages }) => {
      const criticalImages = [
        '/assets/profile.jpg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
      ];
      preloadCriticalImages(criticalImages);
    });
    
    // Add performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      import('./utils/performance').then(({ setupPerformanceObserver }) => {
        setupPerformanceObserver();
      });
    }
  }, []);

  // Detect mobile device and screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when modal is open (mobile optimization)
  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
      // Prevent iOS Safari bounce
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [selectedCertificate]);
  const certificates = [
    { title: "C Programming Certificate", image: cert1 },
    { title: "TOEFL Certificate (Achievement)", image: toefl1 },
    { title: "TOEFL Certificate (Official)", image: toefl2 },
    { title: "Introduction to Cybersecurity", image: cybersecurity },
    { title: "Introduction to Data Science", image: dataScience },
    { title: "Introduction to IoT and Digital Transformation", image: iot },
    { title: "Introduction to Modern AI", image: modernAI },
    { title: "AI Fundamentals with IBM SkillsBuild", image: aiFundamentals },
    { title: "Certificate of Recognition", image: symposium },
    { title: "Certificate of Recognition Seedstart", image: recognition },];
    const [formStatus, setFormStatus] = useState("");
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
    
      // Show loading state on mobile
      if (isMobile) {
        setFormStatus("Sending message...");
      }
    
      fetch("https://formspree.io/f/movealqk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.ok) {
          setFormStatus("Message sent successfully!");
          e.target.reset();
          // Auto-hide success message on mobile after 3 seconds
          if (isMobile) {
            setTimeout(() => setFormStatus(""), 3000);
          }
        } else {
          setFormStatus("Failed to send message. Try again.");
        }
      })
      .catch(() => setFormStatus("Error sending message."));
    };

    // Handle certificate modal with mobile optimizations
    const handleCertificateClick = (certificateImage) => {
      setSelectedCertificate(certificateImage);
      
      // Add haptic feedback on mobile (if supported)
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(50);
      }
    };

    const handleModalClose = () => {
      setSelectedCertificate(null);
    };
    

  return (
    <div>
      <div className="marquee">
  <p>🚀 Welcome to My Portfolio! | 🔥 Aspiring Software Engineer | 💻 Passionate about Web Development & Problem-Solving! | 🎯 Let's Connect!| mrsmithcit@gmail.com</p>
</div>



      <Navbar />
      <main>
        <section id="hero" aria-label="Hero section">
          <HeroSection />
        </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`about animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
        ref={aboutRef}
        aria-label="About me section"
      >
        <h1>About Me</h1>
        <div className="about-content">
          <p>
            I'm a Computer Science Engineering student at Chennai Institute of Technology.
            I have a strong foundation in <b>C++, JavaScript, and Web Development</b>.  
            I enjoy problem-solving and competitive coding, with <b>200+ problems solved on LeetCode</b>.
          </p>
          <p>
            I have participated in multiple <b>coding competitions</b> and worked on projects like an 
            <b>Online Banking Website</b> and an <b>OD Approval System</b>.  
            I’m currently learning <b>React.js</b> to build better web applications.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className={`skills animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
        ref={skillsRef}
        aria-label="Technical skills section"
      >
        <h1>My Skills</h1>
        <div className="skills-container">
          <div className="skill animate-stagger hover-lift">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" 
              alt="C++" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>C++</p>
          </div>
          <div className="skill animate-stagger hover-lift animate-delay-100">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
              alt="JavaScript" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>JavaScript</p>
          </div>
          <div className="skill animate-stagger hover-lift animate-delay-200">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
              alt="React" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>React</p>
          </div>
          <div className="skill animate-stagger hover-lift animate-delay-300">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
              alt="Node.js" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>Node.js</p>
          </div>
          <div className="skill animate-stagger hover-lift animate-delay-400">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" 
              alt="MySQL" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>MySQL</p>
          </div>
          <div className="skill animate-stagger hover-lift animate-delay-500">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
              alt="MongoDB" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>MongoDB</p>
          </div>
          <div className="skill animate-stagger hover-lift animate-delay-600">
            <LazyImage 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" 
              alt="Express.js" 
              fallbackSrc="/assets/icons/default-tech.svg"
            />
            <p>Express.js</p>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`projects animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
        ref={projectsRef}
        aria-label="Projects showcase section"
      >
  <h1>My Projects</h1>
  <div className="projects-container">

    {/* Portfolio */}
    <div className="project animate-stagger hover-lift">
      <h2>Portfolio Website</h2>
      <p>My personal portfolio showcasing projects, skills, and achievements.</p>
      <a href="https://github.com/SmithC05/portfolio" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>
    
    {/*Chat App */}
    <div className="project animate-stagger hover-lift animate-delay-100">
  <h3>Chat App</h3>
  <p>A real-time chat application with user authentication and WebSocket-based messaging. Built with Node.js and Socket.io.</p>
  <a href="https://github.com/SmithC05/Chat" target="_blank"   rel="noopener noreferrer">🔗  View on GitHub</a> 
</div>

{/* Authenticated PDF Generator */}
<div className="project animate-stagger hover-lift animate-delay-150">
  <h3>Authenticated PDF Generator</h3>
  <p>A tool to generate PDFs securely after user login, with plans for advanced features like image-to-PDF, merging, and splitting. Built using Node.js and MongoDB.</p>
  <a href="https://github.com/SmithC05/Pdf" target="_blank" rel="noopener noreferrer" >🔗 View on GitHub</a> 
</div>

    
    {/* Online Bank Website */}
    <div className="project animate-stagger hover-lift animate-delay-200">
      <h2>Online Bank Website - "World Bank"</h2>
      <p>Designed a full-fledged banking website with an LED-style bank name display.</p>
      <a href="https://github.com/SmithC05/online-bank-website" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>

    {/* OD Approval & Announcement System */}
    <div className="project animate-stagger hover-lift animate-delay-300">
      <h2>OD Approval & Announcement System</h2>
      <p>A web-based platform for students and faculty to manage OD requests and announcements.</p>
      <a href="https://github.com/SmithC05/od-approval-system" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>

    

    {/* MoCo Store */}
    <div className="project animate-stagger hover-lift animate-delay-400">
      <h2>MoCo Store</h2>
      <p>An e-commerce web application for managing and selling products online.</p>
      <a href="https://github.com/SmithC05/moco-store" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>

  </div>
</section>



   {/* Certificates Section */}
   <section 
     id="certificates" 
     className={`certificates animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
     ref={certificatesRef}
     aria-label="Certifications and achievements section"
   >
        <h1>My Certifications</h1>
        <div className="certificates-container">
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className="certificate animate-stagger hover-lift" 
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCertificateClick(cert.image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCertificateClick(cert.image);
                }
              }}
              aria-label={`View ${cert.title} certificate`}
            >
              <LazyImage 
                src={cert.image} 
                alt={cert.title} 
                fallbackSrc="/assets/icons/certificate-placeholder.svg"
                placeholder={<div className="skeleton skeleton-image" />}
              />
              <h2>{cert.title}</h2>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Full-Screen Certificate */}
      {selectedCertificate && (
        <div 
          className="modal" 
          onClick={handleModalClose}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              onClick={handleModalClose}
              aria-label="Close certificate viewer"
              type="button"
            >
              &times;
            </button>
            <LazyImage 
              src={selectedCertificate} 
              alt="Full Certificate" 
              className="modal-image"
              onLoad={() => {
                // Ensure image is fully loaded before showing
                if (isMobile) {
                  // Add slight delay for better mobile experience
                  setTimeout(() => {
                    const img = document.querySelector('.modal img');
                    if (img) img.style.opacity = '1';
                  }, 100);
                }
              }}
            />
          </div>
        </div>
      )}



   {/* Contact Section */}
   <section 
     id="contact" 
     className={`contact animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
     ref={contactRef}
     aria-label="Contact information and form section"
   >
  <h1>Contact Me</h1>
  <div className="contact-container">
    
    {/* Contact Information Grid */}
    <div className="contact-items-grid">
      {/* Phone */}
      <div className="contact-item">
        <i className="fas fa-phone-alt"></i>
        <p>+91 9361491329</p>
      </div>

      {/* Personal Email */}
      <div className="contact-item">
        <i className="fas fa-envelope"></i>
        <p>
          <a href="mailto:mrsmithcit@gmail.com">mrsmithcit@gmail.com</a>
        </p>
      </div>

      {/* LinkedIn */}
      <div className="contact-item">
        <i className="fab fa-linkedin"></i>
        <p>
          <a href="https://linkedin.com/in/mrsmithc" target="_blank" rel="noopener noreferrer">
            Smith C
          </a>
        </p>
      </div>

      {/* GitHub */}
      <div className="contact-item">
        <i className="fab fa-github"></i>
        <p>
          <a href="https://github.com/SmithC05" target="_blank" rel="noopener noreferrer">
            SmithC05
          </a>
        </p>
      </div>
    </div>

    {/* Contact Form */}
    <div className="contact-box">
      <h2>Send Me a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="contact-name" className="sr-only">Your Name</label>
          <input 
            type="text" 
            id="contact-name"
            name="name" 
            placeholder="Your Name" 
            required 
            aria-required="true"
            aria-describedby="name-error"
          />
          <div id="name-error" className="error-message" role="alert" aria-live="polite"></div>
        </div>
        
        <div className="form-group">
          <label htmlFor="contact-email" className="sr-only">Your Email</label>
          <input 
            type="email" 
            id="contact-email"
            name="email" 
            placeholder="Your Email" 
            required 
            aria-required="true"
            aria-describedby="email-error"
          />
          <div id="email-error" className="error-message" role="alert" aria-live="polite"></div>
        </div>
        
        <div className="form-group">
          <label htmlFor="contact-message" className="sr-only">Your Message</label>
          <textarea 
            id="contact-message"
            name="message" 
            placeholder="Your Message" 
            required 
            aria-required="true"
            aria-describedby="message-error"
            rows="5"
          ></textarea>
          <div id="message-error" className="error-message" role="alert" aria-live="polite"></div>
        </div>
        
        <button 
          type="submit" 
          aria-describedby="form-status"
          className="btn btn-primary"
        >
          Send Message
        </button>
      </form>
      
      {/* Success/Error Message Popup */}
      {formStatus && (
        <div 
          id="form-status"
          className="form-status-popup" 
          role="alert" 
          aria-live="assertive"
          aria-atomic="true"
        >
          <p>{formStatus}</p>
        </div>
      )}
    </div>
  </div>
</section>
      </main>
    </div>
  );
}

export default App;
