const testimonials = [
  { initials: 'AK', name: 'Ahmed K.', role: 'Agency Founder', stars: '★★★★★', txt: '"Qalam handles 8 of my clients\' LinkedIn every week. I haven\'t opened LinkedIn manually in two months. The content is so on-brand my clients can\'t tell it\'s AI."' },
  { initials: 'SF', name: 'Sara F.', role: 'Social Media Lead', stars: '★★★★★', txt: '"The approval workflow sold it for me. Clients feel in control, I spend zero time going back and forth on edits. They click approve, it\'s done."' },
  { initials: 'RJ', name: 'Rahul J.', role: 'CEO, HR Tech', stars: '★★★★★', txt: '"We went from 3 posts a month to 30 per client. Engagement went UP. The AI actually captures the nuance of different writing styles."' },
  { initials: 'MH', name: 'Maria H.', role: 'Digital Agency Owner', stars: '★★★★★', txt: '"Zero bans after 6 months. That local-first approach isn\'t marketing fluff — it actually works. LinkedIn sees normal activity from a real machine."' },
  { initials: 'ZA', name: 'Zain A.', role: 'LinkedIn Consultant', stars: '★★★★★', txt: '"I was skeptical AI could match different client voices. After a week of Qalam learning, even my pickiest client couldn\'t tell the difference."' },
]

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="testi" id="testimonials" aria-label="Testimonials">
      <div className="testi-hd rv">
        <div className="s-lbl">Testimonials</div>
        <h2 className="s-ttl">What early adopters <em>say.</em></h2>
      </div>
      <div className="testi-track" aria-label="Client testimonials carousel">
        {doubled.map((t, i) => (
          <div className="tc" key={i}>
            <div className="tc-stars">{t.stars}</div>
            <div className="tc-txt">{t.txt}</div>
            <div className="tc-auth">
              <div className="tc-av">{t.initials}</div>
              <div>
                <div className="tc-nm">{t.name}</div>
                <div className="tc-rl">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
