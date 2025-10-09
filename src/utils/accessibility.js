// Accessibility utilities and enhancements

// Focus management utilities
export const focusManagement = {
  // Trap focus within a container (for modals)
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
      
      if (e.key === 'Escape') {
        container.dispatchEvent(new CustomEvent('close-modal'));
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },
  
  // Save and restore focus
  saveFocus: () => {
    return document.activeElement;
  },
  
  restoreFocus: (element) => {
    if (element && element.focus) {
      element.focus();
    }
  },
  
  // Focus first error in form
  focusFirstError: (formElement) => {
    const firstError = formElement.querySelector('.error input, .error textarea, .error select');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

// ARIA utilities
export const ariaUtils = {
  // Announce to screen readers
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },
  
  // Update ARIA labels dynamically
  updateAriaLabel: (element, label) => {
    element.setAttribute('aria-label', label);
  },
  
  // Toggle ARIA expanded state
  toggleExpanded: (element) => {
    const isExpanded = element.getAttribute('aria-expanded') === 'true';
    element.setAttribute('aria-expanded', !isExpanded);
    return !isExpanded;
  },
  
  // Set ARIA describedby relationship
  setDescribedBy: (element, descriptionId) => {
    element.setAttribute('aria-describedby', descriptionId);
  }
};

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation in grids/lists
  handleArrowKeys: (container, options = {}) => {
    const {
      itemSelector = '[role="gridcell"], [role="option"], .nav-item',
      columns = 1,
      wrap = true
    } = options;
    
    const items = Array.from(container.querySelectorAll(itemSelector));
    
    const handleKeyDown = (e) => {
      const currentIndex = items.indexOf(e.target);
      let newIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowRight':
          newIndex = currentIndex + 1;
          if (newIndex >= items.length && wrap) newIndex = 0;
          break;
        case 'ArrowLeft':
          newIndex = currentIndex - 1;
          if (newIndex < 0 && wrap) newIndex = items.length - 1;
          break;
        case 'ArrowDown':
          newIndex = currentIndex + columns;
          if (newIndex >= items.length && wrap) newIndex = currentIndex % columns;
          break;
        case 'ArrowUp':
          newIndex = currentIndex - columns;
          if (newIndex < 0 && wrap) {
            newIndex = items.length - (columns - (currentIndex % columns));
          }
          break;
        case 'Home':
          newIndex = 0;
          e.preventDefault();
          break;
        case 'End':
          newIndex = items.length - 1;
          e.preventDefault();
          break;
        default:
          return;
      }
      
      if (newIndex >= 0 && newIndex < items.length && newIndex !== currentIndex) {
        items[newIndex].focus();
        e.preventDefault();
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },
  
  // Skip links for keyboard users
  addSkipLinks: () => {
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' },
      { href: '#footer', text: 'Skip to footer' }
    ];
    
    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links';
    
    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipContainer, document.body.firstChild);
  }
};

// Color contrast utilities
export const colorContrast = {
  // Calculate contrast ratio
  getContrastRatio: (color1, color2) => {
    const getLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      const [r, g, b] = rgb.map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },
  
  // Check if contrast meets WCAG standards
  meetsWCAG: (color1, color2, level = 'AA') => {
    const ratio = colorContrast.getContrastRatio(color1, color2);
    const requirements = {
      'AA': 4.5,
      'AAA': 7,
      'AA-large': 3,
      'AAA-large': 4.5
    };
    
    return ratio >= requirements[level];
  }
};

// Screen reader utilities
export const screenReader = {
  // Hide content from screen readers
  hideFromScreenReader: (element) => {
    element.setAttribute('aria-hidden', 'true');
  },
  
  // Show content to screen readers only
  showToScreenReaderOnly: (element) => {
    element.className += ' sr-only';
  },
  
  // Create screen reader only text
  createSROnlyText: (text) => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  }
};

// Form accessibility utilities
export const formAccessibility = {
  // Associate labels with form controls
  associateLabels: (form) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      if (!label && input.id) {
        // Look for label containing the input
        const containingLabel = input.closest('label');
        if (containingLabel) {
          containingLabel.setAttribute('for', input.id);
        }
      }
    });
  },
  
  // Add error announcements
  announceErrors: (form) => {
    const errors = form.querySelectorAll('.error-message');
    if (errors.length > 0) {
      const errorText = Array.from(errors).map(error => error.textContent).join('. ');
      ariaUtils.announce(`Form errors: ${errorText}`, 'assertive');
    }
  },
  
  // Add required field indicators
  markRequiredFields: (form) => {
    const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    requiredInputs.forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      if (label && !label.querySelector('.required-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'required-indicator';
        indicator.textContent = ' *';
        indicator.setAttribute('aria-label', 'required');
        label.appendChild(indicator);
      }
    });
  }
};

// Motion and animation accessibility
export const motionAccessibility = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Disable animations for users who prefer reduced motion
  respectMotionPreferences: () => {
    if (motionAccessibility.prefersReducedMotion()) {
      document.documentElement.classList.add('reduce-motion');
      
      // Add CSS to disable animations
      const style = document.createElement('style');
      style.textContent = `
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  },
  
  // Provide pause/play controls for animations
  addAnimationControls: () => {
    const button = document.createElement('button');
    button.textContent = 'Pause animations';
    button.className = 'animation-control';
    button.setAttribute('aria-label', 'Pause all animations on this page');
    
    let animationsPaused = false;
    
    button.addEventListener('click', () => {
      animationsPaused = !animationsPaused;
      document.documentElement.classList.toggle('animations-paused', animationsPaused);
      button.textContent = animationsPaused ? 'Play animations' : 'Pause animations';
      button.setAttribute('aria-label', 
        animationsPaused ? 'Play all animations on this page' : 'Pause all animations on this page'
      );
    });
    
    document.body.appendChild(button);
  }
};

// Initialize all accessibility features
export const initializeAccessibility = () => {
  // Add skip links
  keyboardNavigation.addSkipLinks();
  
  // Respect motion preferences
  motionAccessibility.respectMotionPreferences();
  
  // Associate form labels
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    formAccessibility.associateLabels(form);
    formAccessibility.markRequiredFields(form);
  });
  
  // Add ARIA landmarks if missing
  if (!document.querySelector('main')) {
    const mainContent = document.querySelector('#main-content, .main-content');
    if (mainContent) {
      mainContent.setAttribute('role', 'main');
    }
  }
  
  // Ensure all images have alt text
  const images = document.querySelectorAll('img:not([alt])');
  images.forEach(img => {
    img.setAttribute('alt', '');
  });
  
  // Add focus indicators for keyboard navigation
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    .skip-links {
      position: absolute;
      top: -40px;
      left: 6px;
      z-index: 1000;
    }
    
    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-primary);
      color: var(--color-text-dark);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      z-index: 1000;
    }
    
    .skip-link:focus {
      top: 6px;
    }
    
    .animation-control {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-primary);
      color: var(--color-text-dark);
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      z-index: 1000;
      font-size: 14px;
    }
    
    .animations-paused * {
      animation-play-state: paused !important;
    }
    
    .required-indicator {
      color: #e74c3c;
      font-weight: bold;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .card, .btn, .project, .certificate {
        border: 2px solid;
      }
    }
    
    /* Focus indicators */
    *:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    /* Remove outline for mouse users */
    .mouse-user *:focus {
      outline: none;
    }
  `;
  document.head.appendChild(style);
  
  // Detect input method for focus management
  let isMouseUser = false;
  
  document.addEventListener('mousedown', () => {
    isMouseUser = true;
    document.body.classList.add('mouse-user');
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isMouseUser = false;
      document.body.classList.remove('mouse-user');
    }
  });
};