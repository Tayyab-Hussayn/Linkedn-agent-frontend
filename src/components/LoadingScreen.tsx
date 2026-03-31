import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const phrases = [
  "Generating content.",
  "Scheduling posts.",
  "Growing your reach.",
  "Automating LinkedIn."
];

const subLabels = [
  "Initializing workspace...",
  "Loading AI engine...",
  "Connecting services...",
  "Ready."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subLabelIndex, setSubLabelIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  // Ease-out curve function
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    // Animate top row text
    const tl = gsap.timeline();
    tl.fromTo('.loading-top-left', 
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    tl.fromTo('.loading-top-right',
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.5'
    );

    // Counter animation with requestAnimationFrame
    const duration = 2800;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.floor(easedProgress * 100);
      
      countRef.current = currentCount;
      setCount(currentCount);

      // Update sub-label based on progress
      if (progress >= 1) {
        setSubLabelIndex(3);
      } else if (progress >= 0.66) {
        setSubLabelIndex(2);
      } else if (progress >= 0.33) {
        setSubLabelIndex(1);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    };

    requestAnimationFrame(animate);

    // Phrase cycling
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 850);

    return () => {
      clearInterval(phraseInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -24 : 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Top row */}
      <div className="flex justify-between items-start">
        <span className="loading-top-left font-body font-medium text-xs text-muted uppercase tracking-[0.4em] opacity-0">
          QALAM
        </span>
        <span className="loading-top-right font-body font-medium text-xs text-muted uppercase tracking-[0.4em] opacity-0">
          AI-POWERED LINKEDIN
        </span>
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8">
        {/* Rotating phrases */}
        <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={phraseIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display italic text-4xl md:text-6xl lg:text-7xl text-text-primary/75"
            >
              {phrases[phraseIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Counter */}
        <span className="font-display text-[10vw] leading-none text-text-primary tabular-nums">
          {String(count).padStart(3, '0')}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col gap-3">
        {/* Progress bar */}
        <div className="h-[2px] w-full bg-stroke/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient origin-left"
            style={{ 
              scaleX: count / 100,
              boxShadow: '0 0 10px rgba(201,168,76,0.3)'
            }}
          />
        </div>

        {/* Sub-label */}
        <span className="font-body text-xs text-muted">
          {subLabels[subLabelIndex]}
        </span>
      </div>
    </motion.div>
  );
}
