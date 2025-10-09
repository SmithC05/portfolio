// Accessibility testing and validation utilities

// WCAG compliance checker
export const wcagChecker = {
  // Check color contrast ratios
  checkColorContrast: () => {
    const results = [];
    const elements = document.querySelectorAll('*');
    
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = calculateContrastRatio(color, backgroundColor);
        const fontSize = parseFloat(styles.fontSize);
        const fontWeight = styles.fontWeight;
        
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || fontWeight >= 700));
        const requiredRatio = isLargeText ? 3 : 4.5;
        
        if (contrast < requiredRatio) {
          results.push({
            element: element.tagName.toLowerCase(),
            className: element.className,
            contrast: contrast.toFixed(2),
            required: requiredRatio,
            passed: false,
            color,
            backgroundColor
          });
        }
      }
    });
    
    return results;
  },

  // Check for missing alt text on images
  checkImageAltText: () => {
    const images = document.querySelectorAll('img');
    const results = [];
    
    images.forEach((img, index) => {
      const alt = img.getAttribute('alt');
      const src = img.src;
      
      if (alt === null) {
        results.push({
          element: 'img',
          index,
          src: src.substring(0, 50) + '...',
          issue: 'Missing alt attribute',
          severity: 'error'
        });
      } else if (alt === '' && !img.hasAttribute('aria-hidden')) {
        results.push({
          element: 'img',
          index,
          src: src.substring(0, 50) + '...',
          issue: 'Empty alt text without aria-hidden',
          severity: 'warning'
        });
      }
    });
    
    return results;
  },

  // Check form accessibility
  checkFormAccessibility: () => {
    const forms = document.querySelectorAll('form');
    const results = [];
    
    forms.forEach((form, formIndex) => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach((input, inputIndex) => {
        const id = input.id;
        const label = form.querySelector(`label[for="${id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        
        if (!label && !ariaLabel && !ariaLabelledBy) {
          results.push({
            element: input.tagName.toLowerCase(),
            formIndex,
            inputIndex,
            type: input.type,
            issue: 'Input has no associated label',
            severity: 'error'
          });
        }
        
        if (input.hasAttribute('required') && !input.hasAttribute('aria-required')) {
          results.push({
            element: input.tagName.toLowerCase(),
            formIndex,
            inputIndex,
            type: input.type,
            issue: 'Required input missing aria-required',
            severity: 'warning'
          });
        }
      });
    });
    
    return results;
  },

  // Check heading hierarchy
  checkHeadingHierarchy: () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const results = [];
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent.trim();
      
      if (index === 0 && level !== 1) {
        results.push({
          element: heading.tagName.toLowerCase(),
          index,
          text: text.substring(0, 50),
          issue: 'First heading should be h1',
          severity: 'error'
        });
      }
      
      if (level > previousLevel + 1) {
        results.push({
          element: heading.tagName.toLowerCase(),
          index,
          text: text.substring(0, 50),
          issue: `Heading level jumps from h${previousLevel} to h${level}`,
          severity: 'warning'
        });
      }
      
      previousLevel = level;
    });
    
    return results;
  },

  // Check for keyboard accessibility
  checkKeyboardAccessibility: () => {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex], [role="button"], [role="link"]'
    );
    const results = [];
    
    interactiveElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');
      const role = element.getAttribute('role');
      
      // Check for positive tabindex (anti-pattern)
      if (tabIndex && parseInt(tabIndex) > 0) {
        results.push({
          element: element.tagName.toLowerCase(),
          index,
          issue: 'Positive tabindex detected (anti-pattern)',
          severity: 'warning',
          tabIndex
        });
      }
      
      // Check for missing keyboard event handlers on custom interactive elements
      if (role === 'button' || role === 'link') {
        const hasKeyHandler = element.onkeydown || element.onkeyup || element.onkeypress;
        if (!hasKeyHandler) {
          results.push({
            element: element.tagName.toLowerCase(),
            index,
            role,
            issue: 'Custom interactive element missing keyboard event handler',
            severity: 'error'
          });
        }
      }
    });
    
    return results;
  },

  // Check ARIA usage
  checkAriaUsage: () => {
    const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
    const results = [];
    
    elementsWithAria.forEach((element, index) => {
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      const ariaDescribedBy = element.getAttribute('aria-describedby');
      const role = element.getAttribute('role');
      
      // Check if aria-labelledby references exist
      if (ariaLabelledBy) {
        const ids = ariaLabelledBy.split(' ');
        ids.forEach(id => {
          if (!document.getElementById(id)) {
            results.push({
              element: element.tagName.toLowerCase(),
              index,
              issue: `aria-labelledby references non-existent id: ${id}`,
              severity: 'error'
            });
          }
        });
      }
      
      // Check if aria-describedby references exist
      if (ariaDescribedBy) {
        const ids = ariaDescribedBy.split(' ');
        ids.forEach(id => {
          if (!document.getElementById(id)) {
            results.push({
              element: element.tagName.toLowerCase(),
              index,
              issue: `aria-describedby references non-existent id: ${id}`,
              severity: 'error'
            });
          }
        });
      }
      
      // Check for invalid ARIA roles
      const validRoles = [
        'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
        'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
        'contentinfo', 'definition', 'dialog', 'directory', 'document',
        'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
        'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
        'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
        'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
        'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
        'rowheader', 'scrollbar', 'search', 'searchbox', 'separator',
        'slider', 'spinbutton', 'status', 'switch', 'tab', 'table',
        'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar',
        'tooltip', 'tree', 'treegrid', 'treeitem'
      ];
      
      if (role && !validRoles.includes(role)) {
        results.push({
          element: element.tagName.toLowerCase(),
          index,
          role,
          issue: `Invalid ARIA role: ${role}`,
          severity: 'error'
        });
      }
    });
    
    return results;
  }
};

// Accessibility testing suite
export const accessibilityTest = {
  // Run all accessibility checks
  runAllChecks: () => {
    const results = {
      colorContrast: wcagChecker.checkColorContrast(),
      imageAltText: wcagChecker.checkImageAltText(),
      formAccessibility: wcagChecker.checkFormAccessibility(),
      headingHierarchy: wcagChecker.checkHeadingHierarchy(),
      keyboardAccessibility: wcagChecker.checkKeyboardAccessibility(),
      ariaUsage: wcagChecker.checkAriaUsage()
    };
    
    return results;
  },

  // Generate accessibility report
  generateReport: () => {
    const results = accessibilityTest.runAllChecks();
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      summary: {
        totalIssues: 0,
        errors: 0,
        warnings: 0
      },
      details: results
    };
    
    // Count issues
    Object.values(results).forEach(categoryResults => {
      if (Array.isArray(categoryResults)) {
        report.summary.totalIssues += categoryResults.length;
        categoryResults.forEach(issue => {
          if (issue.severity === 'error') {
            report.summary.errors++;
          } else if (issue.severity === 'warning') {
            report.summary.warnings++;
          }
        });
      }
    });
    
    return report;
  },

  // Log accessibility report to console
  logReport: () => {
    const report = accessibilityTest.generateReport();
    
    console.group('♿ Accessibility Report');
    console.log('📊 Summary:', report.summary);
    
    Object.entries(report.details).forEach(([category, issues]) => {
      if (issues.length > 0) {
        console.group(`❌ ${category} (${issues.length} issues)`);
        issues.forEach(issue => {
          const severity = issue.severity === 'error' ? '🔴' : '🟡';
          console.log(`${severity} ${issue.issue}`, issue);
        });
        console.groupEnd();
      } else {
        console.log(`✅ ${category}: No issues found`);
      }
    });
    
    console.groupEnd();
    
    return report;
  }
};

// Utility functions
function calculateContrastRatio(color1, color2) {
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
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
}

// Initialize accessibility testing in development
export const initializeAccessibilityTesting = () => {
  if (process.env.NODE_ENV === 'development') {
    // Add accessibility testing to window for manual testing
    window.accessibilityTest = accessibilityTest;
    
    // Log accessibility report after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        accessibilityTest.logReport();
      }, 2000);
    });
    
    // Add keyboard shortcut to run accessibility test
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        accessibilityTest.logReport();
      }
    });
  }
};