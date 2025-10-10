import { useState, useEffect, useRef } from 'react';
import { experienceData } from '../../data';
import SectionHeader from '../Common/SectionHeader';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  console.log('ExperienceTimeline component rendering');
  const [expandedItem, setExpandedItem] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Initialize component with loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start showing items with stagger
      experienceData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animate timeline progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineElement = timelineRef.current;
      const rect = timelineElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Improved scroll calculation
      const timelineTop = rect.top;
      const timelineHeight = rect.height;

      // Start animation when timeline enters viewport
      if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
        // Calculate how much of the timeline is visible
        const visibleTop = Math.max(0, -timelineTop);
        const visibleHeight = Math.min(windowHeight - Math.max(0, timelineTop), timelineHeight);
        const progress = Math.max(0, Math.min(100, (visibleTop + visibleHeight * 0.5) / timelineHeight * 100));
        setTimelineProgress(progress);
      } else if (timelineTop >= windowHeight) {
        setTimelineProgress(0);
      } else {
        setTimelineProgress(100);
      }
    };

    // Initial calculation
    setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <section className="experience-timeline section" id="experience">
        <div className="container">
          <SectionHeader
            title="Professional Experience"
            subtitle="My journey in software development and technology"
            centered={true}
            animated={true}
          />

          <div className="experience-timeline-loading">
            <div className="experience-timeline-loader">
              <div className="loader-spinner"></div>
              <p>Loading experience timeline...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="experience-timeline section" id="experience">
      <div className="container">
        <SectionHeader
          title="Professional Experience"
          subtitle="My journey in software development and technology"
          centered={true}
          animated={true}
        />

        <div className="experience-timeline-wrapper">
          <div className="experience-timeline-container" ref={timelineRef}>
            {/* Main timeline line */}
            <div className="experience-timeline-line-main"></div>

            {/* Animated timeline progress bar */}
            <div className="experience-timeline-progress-bar">
              <div
                className="experience-timeline-progress-fill"
                style={{ height: `${timelineProgress}%` }}
              ></div>
            </div>

            {experienceData.map((experience, index) => (
              <div
                key={experience.id}
                className={`experience-timeline-item ${visibleItems.has(index) ? 'visible' : ''}`}
                style={{ '--item-delay': `${index * 0.2}s` }}
              >
                <div className="experience-timeline-marker">
                  <div className="experience-timeline-dot"></div>
                </div>

                <div className="experience-timeline-content">
                  <div className="experience-card" onClick={() => toggleExpanded(experience.id)}>
                    <div className="experience-header">
                      <div className="experience-main">
                        <h3 className="experience-role">{experience.role}</h3>
                        <h4 className="experience-company">{experience.company}</h4>
                        <div className="experience-meta">
                          <span className="experience-duration">{experience.duration}</span>
                          <span className="experience-location">{experience.location}</span>
                        </div>
                      </div>
                      <div className="expand-indicator">
                        <span className={`expand-arrow ${expandedItem === experience.id ? 'expanded' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </div>

                    <p className="experience-description">{experience.description}</p>

                    <div className="technology-tags">
                      {experience.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    {expandedItem === experience.id && (
                      <div className="experience-details">
                        <div className="achievements-section">
                          <h5>Key Achievements:</h5>
                          <ul className="achievements-list">
                            {experience.achievements.map((achievement, achIndex) => (
                              <li key={achIndex}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;