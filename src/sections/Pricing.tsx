import { useState } from 'react'

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  const prices = {
    starter: { monthly: 29, annual: 23 },
    pro: { monthly: 79, annual: 63 },
    agency: { monthly: 189, annual: 151 },
  }

  return (
    <section className="pricing" id="pricing" aria-label="Pricing">
      <div className="pricing-hd rv">
        <div className="s-lbl">Pricing</div>
        <h2 className="s-ttl">Simple, honest <em>pricing.</em></h2>
        <p className="pricing-sub">No hidden fees. No surprises. 14-day free trial on every plan.</p>
        <div className="p-toggle">
          <button
            className={`p-tog-btn${billing === 'monthly' ? ' on' : ''}`}
            onClick={() => setBilling('monthly')}
          >Monthly</button>
          <button
            className={`p-tog-btn${billing === 'annual' ? ' on' : ''}`}
            onClick={() => setBilling('annual')}
          >Annual <span style={{ color: 'var(--gold)', fontSize: '11.5px', marginLeft: '3px' }}>save 20%</span></button>
        </div>
      </div>
      <div className="p-cards">
        <div className="p-card rv">
          <div className="p-plan">Starter</div>
          <div className="p-price">${prices.starter[billing]}<span>/mo</span></div>
          <div className="p-psub">For solo practitioners getting started</div>
          <div className="p-div" />
          <ul className="p-feats">
            <li><span className="p-chk">✓</span>Up to 3 clients</li>
            <li><span className="p-chk">✓</span>15 posts/month per client</li>
            <li><span className="p-chk">✓</span>Approval dashboard</li>
            <li><span className="p-chk">✓</span>Smart scheduling</li>
            <li><span className="p-chk">✓</span>Email support</li>
          </ul>
          <a href="#cta" className="p-btn sec">Start free trial</a>
        </div>
        <div className="p-card ft rv rvd1">
          <div className="p-plan">Pro <span className="p-pop">Most Popular</span></div>
          <div className="p-price">${prices.pro[billing]}<span>/mo</span></div>
          <div className="p-psub">For growing agencies scaling content</div>
          <div className="p-div" />
          <ul className="p-feats">
            <li><span className="p-chk">✓</span>Up to 10 clients</li>
            <li><span className="p-chk">✓</span>30 posts/month per client</li>
            <li><span className="p-chk">✓</span>Priority AI queue</li>
            <li><span className="p-chk">✓</span>Analytics dashboard</li>
            <li><span className="p-chk">✓</span>Slack support</li>
          </ul>
          <a href="#cta" className="p-btn pri">Start free trial</a>
        </div>
        <div className="p-card rv rvd2">
          <div className="p-plan">Agency</div>
          <div className="p-price">${prices.agency[billing]}<span>/mo</span></div>
          <div className="p-psub">For established teams at scale</div>
          <div className="p-div" />
          <ul className="p-feats">
            <li><span className="p-chk">✓</span>Unlimited clients</li>
            <li><span className="p-chk">✓</span>Custom post limits</li>
            <li><span className="p-chk">✓</span>White-label dashboard</li>
            <li><span className="p-chk">✓</span>Dedicated account manager</li>
            <li><span className="p-chk">✓</span>SLA guarantee</li>
          </ul>
          <a href="mailto:hello@byqalam.com?subject=Agency Plan Inquiry" className="p-btn sec">Contact sales</a>
        </div>
      </div>
    </section>
  )
}
