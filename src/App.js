import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import AboutSection from "./components/About/AboutSection";
import ExperienceTimeline from "./components/About/ExperienceTimeline";
import EducationSection from "./components/About/EducationSection";
import SkillsSection from "./components/Skills/SkillsSection";
import ProjectsSection from "./components/Projects/ProjectsSection";
import AchievementsSection from "./components/Achievements/AchievementsSection";
import ContactSection from "./components/Contact/ContactSection";
import ScrollToTop from "./components/Common/ScrollToTop";
import { useScrollAnimation } from "./components/Common/ScrollAnimations";
import { initializeAccessibility } from "./utils/accessibility";
import { addResourceHints, shouldUseReducedAnimations } from "./utils/performance";
import { initializeBundleAnalysis } from "./utils/bundleAnalysis";
import { initializeAccessibilityTesting } from "./utils/accessibilityTesting";
import "./App.css";
import "./styles/animations.css";
import "./styles/accessibility.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [useReducedAnimations, setUseReducedAnimations] = useState(false);

  // Scroll animation refs for sections
  const aboutRef = useScrollAnimation({ threshold: 0.2, once: true });
  const skillsRef = useScrollAnimation({ threshold: 0.2, stagger: true, staggerDelay: 150, once: true });
  const projectsRef = useScrollAnimation({ threshold: 0.1, stagger: true, staggerDelay: 200, once: true });
  const achievementsRef = useScrollAnimation({ threshold: 0.1, stagger: true, staggerDelay: 100, once: true });
  const contactRef = useScrollAnimation({ threshold: 0.2, once: true });

  // Initialize performance and accessibility features
  useEffect(() => {
    // Add resource hints for better performance
    addResourceHints();
    
    // Initialize accessibility features
    initializeAccessibility();
    
    // Initialize bundle analysis in development
    initializeBundleAnalysis();
    
    // Initialize accessibility testing in development
    initializeAccessibilityTesting();
    
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

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <div className="marquee" role="banner" aria-label="Welcome message">
        <p>🚀 Welcome to My Portfolio! | 🔥 Aspiring Software Engineer | 💻 Passionate about Web Development & Problem-Solving! | 🎯 Let's Connect!| mrsmithcit@gmail.com</p>
      </div>

      <Navbar />
      
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section id="hero" aria-label="Hero section">
          <HeroSection />
        </section>

        {/* About Section with Experience and Education */}
        <div 
          className={`animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
          ref={aboutRef}
        >
          <AboutSection />
          <ExperienceTimeline />
          <EducationSection />
        </div>

        {/* Skills Section */}
        <div 
          className={`animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
          ref={skillsRef}
        >
          <SkillsSection />
        </div>

        {/* Projects Section */}
        <div 
          className={`animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
          ref={projectsRef}
        >
          <ProjectsSection />
        </div>

        {/* Achievements Section */}
        <div 
          className={`animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
          ref={achievementsRef}
        >
          <AchievementsSection />
        </div>

        {/* Contact Section */}
        <div 
          className={`animate-on-scroll ${useReducedAnimations ? '' : 'fade-in-up'}`}
          ref={contactRef}
        >
          <ContactSection />
        </div>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      <footer role="contentinfo" className="sr-only">
        <p>© 2024 Smith C - Software Developer Portfolio</p>
      </footer>
    </div>
  );
}

export default App;