import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Qalam posts for 8 of my clients every week. I haven't touched LinkedIn manually in two months.",
    author: 'Sarah Chen',
    role: 'Founder, GrowthLabs',
    initials: 'SC'
  },
  {
    quote: "The approval workflow is a game-changer. My clients love having control without the hassle.",
    author: 'Marcus Johnson',
    role: 'Head of Social, Nexus HR',
    initials: 'MJ'
  },
  {
    quote: "We went from 2 posts a week to 5 per client. Engagement is up 340% across the board.",
    author: 'Emily Davis',
    role: 'CEO, TalentBridge',
    initials: 'ED'
  },
  {
    quote: "Finally, a LinkedIn tool that doesn't get accounts flagged. The local publishing is genius.",
    author: 'David Park',
    role: 'Director, Apex Hiring',
    initials: 'DP'
  },
  {
    quote: "Qalam pays for itself with the time we save. Our team can focus on strategy, not scheduling.",
    author: 'Lisa Wong',
    role: 'VP Marketing, VentureLink',
    initials: 'LW'
  }
];

export default function Testimonials() {
  const [hasDragged, setHasDragged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-bg border-t border-stroke py-24 md:py-32 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-[1280px] mx-auto px-6"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-accent/50" />
          <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">
            TESTIMONIALS
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] mt-4">
          What our clients{' '}
          <span className="italic accent-gradient-text">*say.*</span>
        </h2>
      </motion.div>

      {/* Horizontal Drag Scroll */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-14 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -1400, right: 0 }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={() => setHasDragged(true)}
          className="flex gap-5 px-6 md:px-10 w-max"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="
                min-w-[340px] md:min-w-[380px] rounded-3xl 
                bg-surface border border-stroke p-7 
                flex flex-col justify-between select-none
              "
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-accent text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-display italic text-lg text-text-primary/85 leading-relaxed mt-4 mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="
                  w-10 h-10 rounded-full bg-surface-2 border border-stroke 
                  flex items-center justify-center font-body text-xs text-muted
                ">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-text-primary">
                    {testimonial.author}
                  </p>
                  <p className="font-body text-xs text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Drag hint */}
      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: hasDragged ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="font-body text-xs text-muted text-center mt-4"
      >
        ← drag to explore →
      </motion.p>
    </section>
  );
}
