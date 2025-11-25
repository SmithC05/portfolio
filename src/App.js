// Fully Optimized App.js with ScrollReveal-Style Animations
// All fixes applied — hooks inside component, correct imports, clean sections

import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import ScrollToTop from "./components/Common/ScrollToTop";
import "./App.css";
import "./styles/animations.css";
import "./styles/accessibility.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useScrollReveal,useCinematicScroll  } from "./components/Common/scrollReveal";







// Lazy-loaded heavy components
const ExperienceTimeline = lazy(() => import("./components/About/ExperienceTimeline"));
const EducationSection = lazy(() => import("./components/About/EducationSection"));
const SkillsSection = lazy(() => import("./components/Skills/SkillsSection"));
const ProjectsSection = lazy(() => import("./components/Projects/ProjectsSection"));
const AchievementsSection = lazy(() => import("./components/Achievements/AchievementsSection"));
const ContactSection = lazy(() => import("./components/Contact/ContactSection"));

// Fallback loader
const Loader = () => (
  <div className="section-loader">
    <div className="loader-spinner"></div>
  </div>
);

function App() {
  // Scroll reveal refs
  const heroRef = useScrollReveal("fade-left", true);
  const experienceRef = useScrollReveal("fade-reveal");
  const educationRef = useScrollReveal("zoom-in");
  const skillsRef = useScrollReveal("fade-right");
  const projectsRef = useScrollReveal("zoom-in");
  const achievementsRef = useScrollReveal("pop-in");
  const contactRef = useScrollReveal("fade-reveal");
  useCinematicScroll(".cinematic");

  return (
    <div className="app fade-background">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar />

      {/* Marquee */}
      <div className="marquee" role="banner" aria-label="Welcome message">
        <p>
          <i className="fas fa-briefcase"></i> Smith C - Software Developer |
          <i className="fas fa-bolt"></i> Full-Stack Developer |
          <i className="fas fa-code"></i> React • Node • PostgreSQL |
          <i className="fas fa-envelope"></i> msmithcit@gmail.com
        </p>
      </div>

      <main id="main-content" role="main">

        {/* Hero */}
        <section ref={heroRef} id="hero" className="section cinematic">
           <div className="cinematic-children">
          <HeroSection />
          </div>
        </section>

        {/* Experience */}
        <section ref={experienceRef} className="section cinematic">
          <Suspense fallback={<Loader />}>
            <ExperienceTimeline />
          </Suspense>
        </section>

        {/* Education */}
        <section ref={educationRef} className="section cinematic">
          <Suspense fallback={<Loader />}>
            <EducationSection />
          </Suspense>
        </section>

        {/* Skills */}
        <section ref={skillsRef} className="section cinematic">
          <Suspense fallback={<Loader />}>
            <SkillsSection />
          </Suspense>
        </section>

        {/* Projects */}
        <section ref={projectsRef} className="section cinematic">
          <Suspense fallback={<Loader />}>
            <ProjectsSection />
          </Suspense>
        </section>

        {/* Achievements */}
        <section ref={achievementsRef} className="section cinematic">
          <Suspense fallback={<Loader />}>
            <AchievementsSection />
          </Suspense>
        </section>

        {/* Contact */}
        <section ref={contactRef} className="section cinematic">
          <Suspense fallback={<Loader />}>
            <ContactSection />
          </Suspense>
        </section>
      </main>

      <ScrollToTop />

      <footer className="sr-only">
        <p>© 2025 Smith C — Developer Portfolio</p>
      </footer>
    </div>
  );
}

export default App;

/* Cinematic Base Styles */
