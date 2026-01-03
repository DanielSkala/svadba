import React from 'react';

/**
 * Elegant curved SVG divider for visual flow between sections
 * @param {Object} props
 * @param {boolean} props.flip - Flip vertically for bottom-to-top curves
 * @param {string} props.color - Fill color (default: cream)
 * @param {string} props.className - Additional classes
 */
const SectionDivider = ({ flip = false, color = '#F5F1E8', className = '' }) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 lg:h-20"
      >
        <path
          d="M0,60 C300,100 400,20 600,60 C800,100 900,20 1200,60 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.3"
        />
        <path
          d="M0,80 C200,100 400,60 600,80 C800,100 1000,60 1200,80 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
