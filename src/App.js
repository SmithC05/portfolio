import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import profilePic from "./assets/profile.jpg"; // Front Image
import backPic from "./assets/back-profile.jpg"; // Back Image (can be same or different)
import cert1 from "./assets/c-certificate.jpg";
import toefl1 from "./assets/toefl-certificate1.jpg";
import toefl2 from "./assets/toefl-certificate2.jpg";
import cybersecurity from "./assets/cybersecurity.jpg";
import dataScience from "./assets/data-science.jpg";
import iot from "./assets/iot.jpg";
import modernAI from "./assets/modern-ai.jpg";
import aiFundamentals from "./assets/ai-fundamentals.jpg";
import symposium from "./assets/symposium-certificate.jpg";



function App() {
  const [isHovered, setIsHovered] = useState(false);

  
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const certificates = [
    { title: "C Programming Certificate", image: cert1 },
    { title: "TOEFL Certificate (Achievement)", image: toefl1 },
    { title: "TOEFL Certificate (Official)", image: toefl2 },
    { title: "Introduction to Cybersecurity", image: cybersecurity },
    { title: "Introduction to Data Science", image: dataScience },
    { title: "Introduction to IoT and Digital Transformation", image: iot },
    { title: "Introduction to Modern AI", image: modernAI },
    { title: "AI Fundamentals with IBM SkillsBuild", image: aiFundamentals },
    { title: "Certificate of Recognition", image: symposium },];
    const [formStatus, setFormStatus] = useState("");
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
    
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
        } else {
          setFormStatus("Failed to send message. Try again.");
        }
      })
      .catch(() => setFormStatus("Error sending message."));
    };
    

  return (
    <div>
      <div className="marquee">
  <p>🚀 Welcome to My Portfolio! | 🔥 Aspiring Software Engineer | 💻 Passionate about Web Development & Problem-Solving! | 🎯 Let's Connect!| mrsmithcit@gmail.com</p>
</div>



      <Navbar />
      <section id="home" className="home">
        <div className="content">
          <h1>Hi, I'm <span>Smith C</span></h1>
          <h2>Aspiring Software Engineer</h2>
          <p>Passionate about building scalable applications and solving real-world problems.</p>
          <a href="#projects" className="btn">View My Projects</a>
        </div>
      {/* Image with Smooth Fade Swap Effect */}
      <div 
          className="profile-image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={isHovered ? backPic : profilePic} alt="Profile" className="fade-image" />
        </div>
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
        </div>
      </section>

      {/* Projects Section */}
<section id="projects" className="projects">
  <h1>My Projects</h1>
  <div className="projects-container">
    
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

    {/* Portfolio */}
    <div className="project">
      <h2>Portfolio Website</h2>
      <p>My personal portfolio showcasing projects, skills, and achievements.</p>
      <a href="https://github.com/SmithC05/portfolio" target="_blank" rel="noopener noreferrer">
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
            <div key={index} className="certificate" onClick={() => setSelectedCertificate(cert.image)}>
              <img src={cert.image} alt={cert.title} />
              <h2>{cert.title}</h2>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Full-Screen Certificate */}
      {selectedCertificate && (
        <div className="modal" onClick={() => setSelectedCertificate(null)}>
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedCertificate(null)}>&times;</span>
            <img src={selectedCertificate} alt="Full Certificate" />
          </div>
        </div>
      )}



   {/* Contact Section */}
<section id="contact" className="contact">
  <h1>Contact Me</h1>
  <div className="contact-container">
    
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
        <a href="https://linkedin.com/in/smithc" target="_blank" rel="noopener noreferrer">
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
