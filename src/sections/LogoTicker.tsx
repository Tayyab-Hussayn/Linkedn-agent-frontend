import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const companyNames = [
  'Nexus HR',
  'TalentBridge',
  'GrowthCo',
  'Apex Hiring',
  'PeakRecruit',
  'VentureLink',
  'ProSource',
  'EliteConnect'
];

export default function LogoTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Create GSAP marquee animation
    animationRef.current = gsap.to(marquee, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1
    });

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        gsap.to(animationRef.current, { timeScale: 0.1, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      if (animationRef.current) {
        gsap.to(animationRef.current, { timeScale: 1, duration: 0.3 });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Duplicate the company names for seamless loop
  const allCompanies = [...companyNames, ...companyNames];

  return (
    <section className="bg-surface/20 border-y border-stroke py-7 overflow-hidden">
      {/* Label */}
      <p className="font-body text-xs text-muted uppercase tracking-[0.35em] text-center mb-6">
        Used by teams at
      </p>

      {/* Marquee container */}
      <div 
        ref={containerRef}
        className="overflow-hidden"
      >
        <div 
          ref={marqueeRef}
          className="flex items-center whitespace-nowrap"
          style={{ width: 'fit-content' }}
        >
          {allCompanies.map((name, index) => (
            <span
              key={index}
              className="
                font-body font-medium text-lg text-muted/30 
                hover:text-muted/60 transition-colors duration-300 
                whitespace-nowrap px-10
              "
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
