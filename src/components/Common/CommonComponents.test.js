import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionHeader from './SectionHeader';
import AnimatedCounter from './AnimatedCounter';
import ScrollToTop from './ScrollToTop';

// Mock IntersectionObserver for AnimatedCounter tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Common Components', () => {
  describe('SectionHeader', () => {
    test('renders title correctly', () => {
      render(<SectionHeader title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders subtitle when provided', () => {
      render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />);
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    test('applies centered class by default', () => {
      const { container } = render(<SectionHeader title="Test Title" />);
      expect(container.firstChild).toHaveClass('centered');
    });
  });

  describe('AnimatedCounter', () => {
    test('renders with initial value', () => {
      render(<AnimatedCounter end={100} start={0} triggerOnView={false} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('renders with prefix and suffix', () => {
      render(<AnimatedCounter end={100} prefix="$" suffix="+" triggerOnView={false} />);
      expect(screen.getByText(/\$.*\+/)).toBeInTheDocument();
    });
  });

  describe('ScrollToTop', () => {
    test('renders scroll to top button', () => {
      // Mock window.pageYOffset to make button visible
      Object.defineProperty(window, 'pageYOffset', {
        value: 500,
        writable: true
      });
      
      render(<ScrollToTop showAfter={300} />);
      expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();
    });
  });
});