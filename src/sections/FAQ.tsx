import { useState } from 'react'

const faqs = [
  {
    q: 'Will my client\'s LinkedIn account get banned?',
    a: 'No. Qalam uses a local-first architecture — posts publish directly from your client\'s own machine using their real IP address. No proxies, no third-party servers. LinkedIn sees completely normal activity. We\'ve had zero bans across all our users since launch.',
    delay: '',
  },
  {
    q: 'How does the AI learn my client\'s writing voice?',
    a: 'When you connect a client, Qalam analyzes their existing LinkedIn posts, website content, and any brand guidelines you provide. It builds a unique voice profile — tone, vocabulary, sentence structure, even the kind of hooks they use. It gets better with every post you approve or edit.',
    delay: 'rvd1',
  },
  {
    q: 'Can clients review and edit posts before they go live?',
    a: 'Absolutely. Every AI-generated post goes through the approval dashboard. Clients can approve, reject, or request edits with a single click. Nothing ever publishes without explicit approval. Your client stays in full control.',
    delay: 'rvd2',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Every new account starts with a 14-day free trial on the Pro plan — no credit card required. You get full access to AI generation, client dashboard, smart scheduling, and auto-publishing. Set up your first client in under 5 minutes.',
    delay: 'rvd3',
  },
  {
    q: 'What happens if I need more than the plan limits?',
    a: 'Upgrade anytime — your data and clients carry over. The Agency plan offers unlimited clients and custom post limits. Need something specific? Email us at hello@byqalam.com and we\'ll build a plan that fits your exact workflow.',
    delay: 'rvd4',
  },
  {
    q: 'What makes Qalam different from other LinkedIn tools?',
    a: 'Most LinkedIn tools focus on outreach — sending connection requests and DMs. Qalam is purpose-built for content. We generate, approve, and publish posts — the entire content workflow, automated. And our local-first publish method means zero ban risk, unlike cloud-based tools that use proxies.',
    delay: 'rvd4',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section className="faq" id="faq" aria-label="Frequently asked questions">
      <div className="faq-in">
        <div className="faq-hd rv">
          <div className="s-lbl">FAQ</div>
          <h2 className="s-ttl">Got <em>questions?</em></h2>
        </div>
        {faqs.map((faq, i) => (
          <div className={`fq rv${faq.delay ? ' ' + faq.delay : ''}${openIdx === i ? ' open' : ''}`} key={i}>
            <button className="fq-q" onClick={() => toggle(i)}>
              {faq.q}<span className="fq-ico">+</span>
            </button>
            <div className="fq-a">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
