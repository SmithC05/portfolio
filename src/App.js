import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import profilePic from "./assets/profile.jpg"; // Front Image
import backPic from "./assets/back-profile.jpg"; // Back Image (can be same or different)

function App() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div className="marquee">
  <p>🚀 Welcome to My Portfolio! | 🔥 Aspiring Software Engineer | 💻 Passionate about Web Development & Problem-Solving! | 🎯 Let's Connect!| mrsmithc49@gmail.com</p>
</div>

      <Navbar />
      <section id="home" className="home">
        <div className="content">
          <h1>Hi, I'm <span>Smith C</span></h1>
          <h2>Aspiring Software Engineer</h2>
          <p>Passionate about building scalable applications and solving real-world problems.</p>
          <a href="#projects" className="btn">View My Projects</a>
        </div>

        {/* Profile Image with Flip Effect */}
        <div className={`profile-image ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
          <div className="inner">
            <img src={profilePic} alt="Profile Front" className="front" />
            <img src={backPic} alt="Profile Back" className="back" />
          </div>
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
          <div className="project">
            <h2>Online Bank Website - "World Bank"</h2>
            <p>Designed a full-fledged banking website with an LED-style bank name display.</p>
          </div>
          <div className="project">
            <h2>OD Approval & Announcement System</h2>
            <p>A web-based platform for students and faculty to manage OD requests and announcements.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h1>Contact Me</h1>
        <div className="contact-container">
          <p>Email: <a href="mailto:mrsmithc49@gmail.com">mrsmithc49@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/smithc" target="_blank" rel="noopener noreferrer">Smith C</a></p>
          <p>GitHub: <a href="https://github.com/SmithC05" target="_blank" rel="noopener noreferrer">SmithC05</a></p>
        </div>
      </section>
    </div>
  );
}

export default App;
