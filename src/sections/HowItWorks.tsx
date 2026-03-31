import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '1',
    title: 'Connect Client',
    description: 'Link a client\'s LinkedIn account once via the Tauri desktop app.'
  },
  {
    number: '2',
    title: 'AI Generates Posts',
    description: 'Qalam\'s AI engine drafts posts tailored to their voice and niche.'
  },
  {
    number: '3',
    title: 'Client Approves',
    description: 'Posts appear in the approval dashboard. One click to approve or request changes.'
  },
  {
    number: '4',
    title: 'Auto-Published',
    description: 'Approved posts publish at the optimal time, from the client\'s own machine.'
  }
];

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    // GSAP ScrollTrigger for the connecting line
    gsap.fromTo(line,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: line,
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
    <section id="how-it-works" className="bg-bg py-24 md:py-32 border-t border-stroke">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-px bg-accent/50" />
            <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">
              HOW IT WORKS
            </span>
            <div className="w-6 h-px bg-accent/50" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] mt-4">
            From idea to published,{' '}
            <span className="italic accent-gradient-text">*in minutes.*</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative">
          {/* Connecting line - desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px bg-stroke z-0"
            style={{ transformOrigin: 'left' }}
          />

          {/* Step items */}
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              className="relative z-10 flex flex-col items-center px-4"
            >
              {/* Number bubble */}
              <motion.div
                whileInView={{ borderColor: 'rgba(201, 168, 76, 0.6)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="
                  w-14 h-14 rounded-full border border-stroke bg-surface 
                  flex items-center justify-center mb-6
                  transition-colors duration-500
                "
              >
                <span className="font-display italic text-xl text-accent">
                  {step.number}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="font-display italic text-xl text-text-primary mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-muted leading-relaxed max-w-[180px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
