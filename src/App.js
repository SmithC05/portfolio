import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero/HeroSection";
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
    let mounted = true;

    const initializeApp = async () => {
      if (!mounted) return;

      // Add resource hints for better performance
      addResourceHints();

      // Initialize accessibility features
      initializeAccessibility();

      // Check if we should use reduced animations
      setUseReducedAnimations(shouldUseReducedAnimations());

      // Initialize development-only features
      if (process.env.NODE_ENV === 'development') {
        initializeBundleAnalysis();
        initializeAccessibilityTesting();

        // Add performance monitoring
        const { setupPerformanceObserver } = await import('./utils/performance');
        setupPerformanceObserver();
      }

      // Register service worker for caching
      const { registerServiceWorker } = await import('./utils/performance');
      registerServiceWorker();

      // Preload critical images
      const { preloadCriticalImages } = await import('./utils/imageOptimization');
      const criticalImages = [
        '/assets/profile.jpg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
      ];
      preloadCriticalImages(criticalImages);
    };

    initializeApp().catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar />

      <div className="marquee" role="banner" aria-label="Welcome message">
        <p><i className="fas fa-briefcase"></i> Smith C - Software Developer | <i className="fas fa-bullseye"></i> Full-Stack Development Specialist | <i className="fas fa-bolt"></i> Node.js • React.js • MongoDB • PostgreSQL | <i className="fas fa-envelope"></i> msmithcit@gmail.com | <i className="fas fa-star"></i> Open to New Opportunities</p>
      </div>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section id="hero" aria-label="Hero section">
          <HeroSection />
        </section>

        {/* Experience and Education Sections */}
        <div style={{ opacity: 1 }}>
          <ExperienceTimeline />
          <EducationSection />
        </div>

        {/* Skills Section */}
        <div style={{ opacity: 1 }}>
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

      {/* Debug Component - Remove in production */}
      
      <footer role="contentinfo" className="sr-only">
        <p>© 2024 Smith C - Software Developer Portfolio</p>
      </footer>
    </div>
  );
}

export default App;