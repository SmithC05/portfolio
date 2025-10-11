import React, { useState, useEffect, useRef } from "react";
//import { keyboardNavigation, focusManagement } from "../utils/accessibility";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navLinksRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced keyboard navigation and focus management
  // useEffect(() => {
  //   if (!navLinksRef.current) return;

  //   // Set up arrow key navigation for menu items
  //   const cleanup = keyboardNavigation.handleArrowKeys(navLinksRef.current, {
  //     itemSelector: 'a',
  //     columns: 1,
  //     wrap: true
  //   });

  //   return cleanup;
  // }, []);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      // Focus first menu item when menu opens
      const firstMenuItem = navLinksRef.current?.querySelector('a');
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Smooth scroll to section with accessibility announcements
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 70; // Account for fixed navbar height
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      // Announce navigation to screen readers
      const sectionName = e.target.textContent;
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Navigated to ${sectionName} section`;
      
      document.body.appendChild(announcement);
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);

      // Focus the target section for keyboard users
      element.setAttribute('tabindex', '-1');
      element.focus();
      
      // Remove tabindex after focus to maintain normal tab flow
      setTimeout(() => {
        element.removeAttribute('tabindex');
      }, 100);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav 
      ref={navRef}
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <div className="nav-brand">
          <h2>
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, 'hero')}
              aria-label="Smith C - Software Developer, go to home section"
            >
              Smith C
            </a>
          </h2>
          <span className="nav-subtitle" aria-hidden="true">Software Developer</span>
        </div>
        
        <div 
          ref={navLinksRef}
          className={`nav-links ${menuOpen ? "open" : ""}`}
          role="menubar"
          aria-hidden={!menuOpen}
          aria-label="Navigation menu"
        >
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, 'hero')}
            role="menuitem"
            aria-current={window.location.hash === '#hero' ? 'page' : undefined}
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            role="menuitem"
            aria-current={window.location.hash === '#about' ? 'page' : undefined}
          >
            About
          </a>
          <a 
            href="#skills" 
            onClick={(e) => handleNavClick(e, 'skills')}
            role="menuitem"
            aria-current={window.location.hash === '#skills' ? 'page' : undefined}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            onClick={(e) => handleNavClick(e, 'projects')}
            role="menuitem"
            aria-current={window.location.hash === '#projects' ? 'page' : undefined}
          >
            Projects
          </a>
          <a 
            href="#certificates" 
            onClick={(e) => handleNavClick(e, 'certificates')}
            role="menuitem"
            aria-current={window.location.hash === '#certificates' ? 'page' : undefined}
          >
            Certificates
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            role="menuitem"
            aria-current={window.location.hash === '#contact' ? 'page' : undefined}
          >
            Contact
          </a>
        </div>
        
        <button 
          ref={menuButtonRef}
          className={`menu-btn ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-haspopup="true"
          type="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
