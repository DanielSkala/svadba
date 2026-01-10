import React, { useState, useEffect, useRef, useCallback } from 'react';
import './InvitationOpen.css';

/**
 * InvitationOpen - Tri-fold wedding invitation animation
 *
 * Layout: [Left Flap 25%] [Center 50%] [Right Flap 25%]
 *
 * Uses pre-cropped images:
 * - cover_left.png: Left 25% of cover (Daniel) → shown on RIGHT flap back when closed
 * - cover_right.png: Right 25% of cover (Veronika) → shown on LEFT flap back when closed
 * - inside_left.png: Left 25% of inside (DETAILY) → shown on left flap front when open
 * - inside_center.png: Center 50% of inside (main content)
 * - inside_right.png: Right 25% of inside (PROGRAM) → shown on right flap front when open
 *
 * CLOSED: Veronika (left) + Daniel (right)
 * OPEN: DETAILY + Main content + PROGRAM
 */
const InvitationOpen = ({
  autoOpen = true,
  openPercent = 0.8,
  triggerOnScroll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // Image paths (pre-cropped)
  const images = {
    coverLeft: '/images/wedding_invitation/cover_left.png',     // Daniel
    coverRight: '/images/wedding_invitation/cover_right.png',   // Veronika
    insideLeft: '/images/wedding_invitation/inside_left.png',   // DETAILY
    insideCenter: '/images/wedding_invitation/inside_center.png', // Main
    insideRight: '/images/wedding_invitation/inside_right.png', // PROGRAM
  };

  // Animation angles:
  // CLOSED: left=180deg, right=-180deg (back faces visible)
  // OPEN: approaching 0deg (front faces visible)
  const closedLeftAngle = 180;
  const closedRightAngle = -180;
  const openLeftAngle = closedLeftAngle - (openPercent * 180); // 180 → 36 at 80%
  const openRightAngle = closedRightAngle + (openPercent * 180); // -180 → -36 at 80%

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If reduced motion, start already open
  useEffect(() => {
    if (prefersReducedMotion && autoOpen) {
      setIsOpen(true);
      setHasTriggered(true);
    }
  }, [prefersReducedMotion, autoOpen]);

  // Auto-open with IntersectionObserver
  useEffect(() => {
    if (!autoOpen || hasTriggered || prefersReducedMotion) return;

    const triggerOpen = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsOpen(true);
          setHasTriggered(true);
        }, 150);
      });
    };

    if (triggerOnScroll && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasTriggered) {
            triggerOpen();
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      triggerOpen();
    }
  }, [autoOpen, hasTriggered, triggerOnScroll, prefersReducedMotion]);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const noTransition = prefersReducedMotion ? 'no-transition' : '';

  // Current angles based on open state
  const leftAngle = isOpen ? openLeftAngle : closedLeftAngle;
  const rightAngle = isOpen ? openRightAngle : closedRightAngle;

  return (
    <div className="trifold-stage" ref={containerRef}>
      <button
        className={`trifold-container ${isOpen ? 'is-open' : 'is-closed'}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Zatvoriť oznámenie' : 'Otvoriť oznámenie'}
        type="button"
      >
        {/* CENTER PANEL (25%-75%) - inside_center.png */}
        <div className="trifold-center">
          <img
            src={images.insideCenter}
            alt="Svadobné oznámenie"
            className="trifold-img"
            draggable="false"
          />
        </div>

        {/* LEFT FLAP (0%-25%) - hinges at RIGHT edge (x=25%) */}
        <div
          className={`trifold-flap trifold-flap-left ${noTransition}`}
          style={{ '--flap-angle': `${leftAngle}deg` }}
        >
          {/* Front face (visible when OPEN): inside_left.png (DETAILY) */}
          <div className="trifold-face trifold-face-front">
            <img
              src={images.insideLeft}
              alt=""
              className="trifold-img"
              draggable="false"
            />
          </div>
          {/* Back face (visible when CLOSED): cover_right.png (Veronika) */}
          <div className="trifold-face trifold-face-back">
            <img
              src={images.coverRight}
              alt=""
              className="trifold-img"
              draggable="false"
            />
          </div>
        </div>

        {/* RIGHT FLAP (75%-100%) - hinges at LEFT edge (x=75%) */}
        <div
          className={`trifold-flap trifold-flap-right ${noTransition}`}
          style={{ '--flap-angle': `${rightAngle}deg` }}
        >
          {/* Front face (visible when OPEN): inside_right.png (PROGRAM) */}
          <div className="trifold-face trifold-face-front">
            <img
              src={images.insideRight}
              alt=""
              className="trifold-img"
              draggable="false"
            />
          </div>
          {/* Back face (visible when CLOSED): cover_left.png (Daniel) */}
          <div className="trifold-face trifold-face-back">
            <img
              src={images.coverLeft}
              alt=""
              className="trifold-img"
              draggable="false"
            />
          </div>
        </div>
      </button>
      <p className="trifold-hint">Klikni ma</p>
    </div>
  );
};

export default InvitationOpen;
