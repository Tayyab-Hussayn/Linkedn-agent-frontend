import { useEffect, useRef } from 'react'

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counters = ref.current?.querySelectorAll<HTMLElement>('.met-n[data-count]')
    if (!counters) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const target = parseInt(el.dataset.count || '0')
        const suffix = el.querySelector('span')?.outerHTML || ''
        let cur = 0
        const inc = target / 55
        const t = setInterval(() => {
          cur += inc
          if (cur >= target) { cur = target; clearInterval(t) }
          el.innerHTML = Math.floor(cur).toLocaleString() + suffix
        }, 18)
        obs.unobserve(el)
      })
    }, { threshold: 0.5 })
    counters.forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="metrics" aria-label="Key metrics" ref={ref}>
      <div className="metrics-in">
        <div className="rv">
          <div className="met-n" data-count="12400">0<span>+</span></div>
          <div className="met-l">Posts published</div>
        </div>
        <div className="rv rvd1">
          <div className="met-n" data-count="200">0<span>+</span></div>
          <div className="met-l">LinkedIn professionals</div>
        </div>
        <div className="rv rvd2">
          <div className="met-n">98<span>%</span></div>
          <div className="met-l">Client approval rate</div>
        </div>
        <div className="rv rvd3">
          <div className="met-n">0<span> bans</span></div>
          <div className="met-l">Accounts flagged. Ever.</div>
        </div>
      </div>
    </section>
  )
}
