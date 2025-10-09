import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import "./App.css";
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
      <section id="hero">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about" className="about">
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
      <section id="skills" className="skills">
        <h1>My Skills</h1>
        <div className="skills-container">
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
            <p>C++</p>
          </div>
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
            <p>JavaScript</p>
          </div>
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            <p>React</p>
          </div>
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
            <p>Node.js</p>
          </div>
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
            <p>MySQL</p>
          </div>
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
            <p>MongoDB</p>
          </div>
          <div className="skill">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
            <p>Express.js</p>
          </div>

        </div>
      </section>

      {/* Projects Section */}
<section id="projects" className="projects">
  <h1>My Projects</h1>
  <div className="projects-container">

    {/* Portfolio */}
    <div className="project">
      <h2>Portfolio Website</h2>
      <p>My personal portfolio showcasing projects, skills, and achievements.</p>
      <a href="https://github.com/SmithC05/portfolio" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>
    
    {/*Chat App */}
    <div class="project">
  <h3>Chat App</h3>
  <p>A real-time chat application with user authentication and WebSocket-based messaging. Built with Node.js and Socket.io.</p>
  <a href="https://github.com/SmithC05/Chat" target="_blank"   rel="noopener noreferrer">🔗  View on GitHub</a> 
</div>

{/* Authenticated PDF Generator */}
<div class="project">
  <h3>Authenticated PDF Generator</h3>
  <p>A tool to generate PDFs securely after user login, with plans for advanced features like image-to-PDF, merging, and splitting. Built using Node.js and MongoDB.</p>
  <a href="https://github.com/SmithC05/Pdf" target="_blank" rel="noopener noreferrer" >🔗 View on GitHub</a> 
</div>

    
    {/* Online Bank Website */}
    <div className="project">
      <h2>Online Bank Website - "World Bank"</h2>
      <p>Designed a full-fledged banking website with an LED-style bank name display.</p>
      <a href="https://github.com/SmithC05/online-bank-website" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>

    {/* OD Approval & Announcement System */}
    <div className="project">
      <h2>OD Approval & Announcement System</h2>
      <p>A web-based platform for students and faculty to manage OD requests and announcements.</p>
      <a href="https://github.com/SmithC05/od-approval-system" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>

    

    {/* MoCo Store */}
    <div className="project">
      <h2>MoCo Store</h2>
      <p>An e-commerce web application for managing and selling products online.</p>
      <a href="https://github.com/SmithC05/moco-store" target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>

  </div>
</section>



   {/* Certificates Section */}
   <section id="certificates" className="certificates">
        <h1>My Certifications</h1>
        <div className="certificates-container">
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className="certificate" 
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
              <img src={cert.image} alt={cert.title} loading="lazy" />
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
            <img 
              src={selectedCertificate} 
              alt="Full Certificate" 
              loading="lazy"
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
<section id="contact" className="contact">
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
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
      
      {/* Success/Error Message Popup */}
      {formStatus && (
        <div className="form-status-popup">
          <p>{formStatus}</p>
        </div>
      )}
    </div>
  </div>
</section>

    </div>
  );
}

export default App;
