import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Wrapper component that adds scroll-triggered fade-in animation to its children
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.delay - Animation delay in ms (0, 200, 400, 600)
 */
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? `opacity-100 translate-y-0 ${delayClass}`
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
