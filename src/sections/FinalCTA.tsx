import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const lines = heading.querySelectorAll('.cta-line');
    
    gsap.fromTo(lines,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        stagger: 0.1,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          once: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="bg-surface/20 border-y border-stroke py-24 md:py-32 px-6 relative overflow-hidden text-center">
      {/* Background blob decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blob 1 */}
        <div 
          className="
            absolute w-[500px] h-[500px] rounded-full blur-[140px] 
            bg-accent/6 top-[-100px] left-[-100px] animate-float
          "
        />
        {/* Blob 2 */}
        <div 
          className="
            absolute w-[500px] h-[500px] rounded-full blur-[140px] 
            bg-accent/4 bottom-[-80px] right-[-80px] animate-float
          "
          style={{ animationDelay: '2s' }}
        />
        {/* Blob 3 */}
        <div 
          className="
            absolute w-[500px] h-[500px] rounded-full blur-[140px] 
            bg-accent/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float
          "
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs text-muted uppercase tracking-[0.4em] mb-6"
        >
          START TODAY
        </motion.p>

        {/* Heading */}
        <div ref={headingRef}>
          <div className="cta-line overflow-hidden">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.0]">
              Automate LinkedIn.
            </h2>
          </div>
          <div className="cta-line overflow-hidden">
            <h2 className="font-display italic text-5xl md:text-6xl lg:text-7xl accent-gradient-text leading-[1.0] mt-2">
              *Grow every client.*
            </h2>
          </div>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-base text-muted max-w-md mx-auto mt-6 mb-10"
        >
          Join 200+ LinkedIn professionals who've transformed their content strategy with Qalam.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            className="
              rounded-full px-8 py-4 font-body font-medium text-sm text-bg
              accent-gradient glow-hover
            "
          >
            Get early access →
          </motion.button>

          <p className="font-body text-xs text-muted mt-4">
            No credit card required. Free during beta.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
