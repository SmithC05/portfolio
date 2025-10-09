import React from 'react';
import { SectionHeader, AnimatedCounter, ScrollToTop } from './index';

const CommonComponentsDemo = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '200vh' }}>
      {/* SectionHeader Demo */}
      <SectionHeader 
        title="Welcome to My Portfolio" 
        subtitle="This is a demonstration of the SectionHeader component with consistent styling and animations"
      />
      
      <div style={{ marginBottom: '4rem' }}>
        <h3>Metrics Section</h3>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={2} suffix="+" />
            <p>Years Experience</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={6} suffix="+" />
            <p>Projects Completed</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={10} suffix="+" />
            <p>Technologies</p>
          </div>
        </div>
      </div>

      <SectionHeader 
        title="Another Section" 
        subtitle="This demonstrates multiple section headers in the same page"
        centered={false}
      />

      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Scroll down to see more content and test the ScrollToTop component...</p>
      </div>

      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Keep scrolling to see the ScrollToTop button appear!</p>
      </div>

      {/* ScrollToTop Component */}
      <ScrollToTop showAfter={300} />
    </div>
  );
};

export default CommonComponentsDemo;