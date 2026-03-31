import { motion } from 'framer-motion';
import { 
  Linkedin, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  Layers, 
  CalendarClock 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

export default function Features() {
  return (
    <section id="features" className="bg-bg py-24 md:py-32 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-accent/50" />
          <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">
            FEATURES
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] mt-4">
          Everything your LinkedIn{' '}
          <span className="italic accent-gradient-text">*needs.*</span>
        </h2>

        {/* Sub */}
        <p className="font-body text-base text-muted max-w-lg mt-4">
          A complete toolkit for LinkedIn automation — from AI-generated content to seamless publishing.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mt-16"
      >
        {/* Card 1 - AI Post Generation (col-span-7) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-7 bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-default relative p-8 md:p-10"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-accent/5 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          
          {/* Halftone texture */}
          <div className="absolute inset-0 halftone-texture opacity-[0.06] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <Linkedin className="w-8 h-8 text-accent mb-6" />
            <h3 className="font-display italic text-2xl text-text-primary mb-3">
              AI Post Generation
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              Our AI analyzes your client's voice, industry, and audience to craft engaging posts that feel authentically human.
            </p>

            {/* Mock post preview */}
            <div className="mt-6 rounded-2xl bg-surface-2 border border-stroke p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-stroke" />
                <div className="flex-1">
                  <div className="h-2 w-20 bg-stroke rounded" />
                  <div className="h-1.5 w-12 bg-stroke/50 rounded mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-stroke/60 rounded" />
                <div className="h-2 w-[90%] bg-stroke/60 rounded" />
                <div className="h-2 w-[70%] bg-stroke/60 rounded" />
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-stroke/50">
                <div className="h-3 w-8 bg-stroke/40 rounded" />
                <div className="h-3 w-8 bg-stroke/40 rounded" />
                <div className="h-3 w-8 bg-stroke/40 rounded" />
              </div>
            </div>
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent/40 transition-colors duration-400 pointer-events-none" />
        </motion.div>

        {/* Card 2 - Client Approval Dashboard (col-span-5) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-5 bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-default relative p-8"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-accent/5 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.06] pointer-events-none" />

          <div className="relative z-10">
            <CheckCircle className="w-8 h-8 text-accent mb-6" />
            <h3 className="font-display italic text-2xl text-text-primary mb-3">
              Client Approval Dashboard
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              Give clients full control. They review, approve, or request changes — all in one clean interface.
            </p>

            {/* Mini approval UI */}
            <div className="mt-6 space-y-2">
              {['Post #1', 'Post #2', 'Post #3'].map((post, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3">
                  <span className="font-body text-xs text-muted">{post}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-body">
                      Approve
                    </button>
                    <button className="px-3 py-1 rounded-full bg-stroke text-muted text-[10px] font-body">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent/40 transition-colors duration-400 pointer-events-none" />
        </motion.div>

        {/* Card 3 - Multi-Client Management (col-span-4) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-4 bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-default relative p-8"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-accent/5 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.06] pointer-events-none" />

          <div className="relative z-10">
            <Users className="w-8 h-8 text-accent mb-6" />
            <h3 className="font-display italic text-2xl text-text-primary mb-3">
              Multi-Client Management
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              Manage dozens of clients from a single dashboard. Organize by industry, plan, or team.
            </p>

            {/* Client avatar list */}
            <div className="mt-6 space-y-2">
              {['Sarah Chen', 'Marcus Johnson', 'Emily Davis', 'David Park'].map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-2 border border-stroke flex items-center justify-center font-body text-[10px] text-muted">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-body text-xs text-muted flex-1">{name}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent/40 transition-colors duration-400 pointer-events-none" />
        </motion.div>

        {/* Card 4 - Auto-Publishing (col-span-8) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-8 bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-default relative p-8 md:p-10"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-accent/5 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.06] pointer-events-none" />

          <div className="relative z-10">
            <ShieldCheck className="w-8 h-8 text-accent mb-6" />
            <h3 className="font-display italic text-2xl text-text-primary mb-3">
              Auto-Publishing (Zero Ban Risk)
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              Our local-first approach means posts publish from your client's own machine using their real IP address — completely invisible to LinkedIn's detection systems.
            </p>

            {/* Special callout box */}
            <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-accent text-lg">🔒</span>
              </div>
              <p className="font-body text-sm text-muted">
                Posts publish from your client's own machine, using their real IP — invisible to LinkedIn's detection systems. No proxies, no red flags.
              </p>
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent/40 transition-colors duration-400 pointer-events-none" />
        </motion.div>

        {/* Card 5 - Tiered Subscription Plans (col-span-6) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-6 bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-default relative p-8"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-accent/5 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.06] pointer-events-none" />

          <div className="relative z-10">
            <Layers className="w-8 h-8 text-accent mb-6" />
            <h3 className="font-display italic text-2xl text-text-primary mb-3">
              Tiered Subscription Plans
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              Flexible pricing that scales with your agency. From solo operators to full-scale teams.
            </p>

            {/* Mini plan pills */}
            <div className="mt-6 space-y-2">
              {[
                { name: 'Starter', price: '$29/mo' },
                { name: 'Pro', price: '$79/mo' },
                { name: 'Agency', price: '$189/mo' }
              ].map((plan, i) => (
                <div key={i} className="flex justify-between items-center rounded-xl bg-surface-2 border border-stroke px-4 py-2.5">
                  <span className="font-body text-xs text-text-primary">{plan.name}</span>
                  <span className="font-body text-xs text-muted">{plan.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent/40 transition-colors duration-400 pointer-events-none" />
        </motion.div>

        {/* Card 6 - Smart Scheduling (col-span-6) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-6 bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-default relative p-8"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-accent/5 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.06] pointer-events-none" />

          <div className="relative z-10">
            <CalendarClock className="w-8 h-8 text-accent mb-6" />
            <h3 className="font-display italic text-2xl text-text-primary mb-3">
              Smart Scheduling
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              AI determines the optimal posting times for maximum engagement. Schedule weeks ahead with confidence.
            </p>

            {/* Mini weekly calendar */}
            <div className="mt-6">
              <div className="grid grid-cols-7 gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center font-body text-[10px] text-muted mb-1">
                    {day}
                  </div>
                ))}
                {[...Array(14)].map((_, i) => {
                  const isHighlighted = [2, 5, 8, 11].includes(i);
                  return (
                    <div
                      key={i}
                      className={`
                        w-full aspect-square rounded-md border
                        ${isHighlighted 
                          ? 'bg-accent/20 border-accent/30' 
                          : 'bg-surface-2 border-stroke'
                        }
                      `}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent/40 transition-colors duration-400 pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
