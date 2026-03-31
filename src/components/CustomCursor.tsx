import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Create quickTo functions for smooth tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.2, ease: 'power2' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.2, ease: 'power2' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 12); // Center the 24px cursor
      yTo(e.clientY - 12);
      dotXTo(e.clientX - 2); // Center the 4px dot
      dotYTo(e.clientY - 2);
    };

    const handleMouseEnter = () => {
      if (!isHoveringRef.current) {
        isHoveringRef.current = true;
        gsap.to(cursor, {
          scale: 2.5,
          backgroundColor: 'rgba(201, 168, 76, 0.1)',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      if (isHoveringRef.current) {
        isHoveringRef.current = false;
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      newElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 border border-accent/60 rounded-full bg-transparent pointer-events-none z-[9997] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-accent pointer-events-none z-[9997] hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
