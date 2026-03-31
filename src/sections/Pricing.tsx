import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'STARTER',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'Perfect for solo practitioners',
    features: [
      'Up to 3 clients',
      '15 posts/month per client',
      'Approval dashboard',
      'Email support'
    ],
    cta: 'Get started',
    popular: false
  },
  {
    name: 'PRO',
    monthlyPrice: 79,
    annualPrice: 63,
    description: 'For growing agencies',
    features: [
      'Up to 10 clients',
      '30 posts/month per client',
      'Priority AI queue',
      'Analytics dashboard',
      'Slack support'
    ],
    cta: 'Get started',
    popular: true
  },
  {
    name: 'AGENCY',
    monthlyPrice: 189,
    annualPrice: 151,
    description: 'For established teams',
    features: [
      'Unlimited clients',
      'Custom post limits',
      'White-label dashboard',
      'Dedicated account manager',
      'SLA guarantee'
    ],
    cta: 'Contact sales',
    popular: false
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="bg-bg py-24 md:py-32 border-t border-stroke max-w-[1100px] mx-auto px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-6 h-px bg-accent/50" />
          <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">
            PRICING
          </span>
          <div className="w-6 h-px bg-accent/50" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] mt-4">
          Simple, transparent{' '}
          <span className="italic accent-gradient-text">*pricing.*</span>
        </h2>

        {/* Sub */}
        <p className="font-body text-muted text-base mt-4">
          No hidden fees. No surprises. Scale as you grow.
        </p>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 flex justify-center"
      >
        <div className="inline-flex items-center gap-3 bg-surface border border-stroke rounded-full p-1.5 font-body text-sm">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`
              relative px-4 py-1.5 rounded-full transition-colors duration-200
              ${billingCycle === 'monthly' 
                ? 'bg-surface-2 text-text-primary' 
                : 'text-muted hover:text-text-primary'
              }
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`
              relative px-4 py-1.5 rounded-full transition-colors duration-200 flex items-center gap-1
              ${billingCycle === 'annual' 
                ? 'bg-surface-2 text-text-primary' 
                : 'text-muted hover:text-text-primary'
              }
            `}
          >
            Annual
            {billingCycle === 'annual' && (
              <span className="rounded-full bg-accent/15 text-accent text-[10px] font-body px-2 py-0.5">
                Save 20%
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 * index, ease: [0.25, 0.1, 0.25, 1] }}
            className={`
              relative rounded-3xl p-8 flex flex-col
              ${plan.popular 
                ? 'bg-surface-2 scale-[1.02] md:scale-[1.04] gradient-border' 
                : 'bg-surface border border-stroke'
              }
            `}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                {plan.name}
              </span>
              {plan.popular && (
                <span className="rounded-full bg-accent/15 text-accent text-[10px] font-body px-2 py-0.5">
                  Most Popular
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-display text-5xl text-text-primary">
                ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
              </span>
              <span className="font-body text-lg text-muted">/mo</span>
            </div>

            {/* Annual strikethrough */}
            {billingCycle === 'annual' && (
              <div className="flex items-center gap-2 mb-4">
                <span className="font-body text-sm text-muted line-through">
                  ${plan.monthlyPrice}/mo
                </span>
              </div>
            )}

            {/* Description */}
            <p className="font-body text-sm text-muted mb-6">
              {plan.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-stroke my-6" />

            {/* Features */}
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5 font-body text-sm text-muted">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`
                w-full mt-8 rounded-xl py-3 font-body text-sm transition-all duration-300
                ${plan.popular
                  ? 'accent-gradient text-bg hover:scale-[1.02] glow-hover'
                  : 'border border-stroke text-text-primary hover:border-accent/50 hover:bg-surface-2'
                }
              `}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
