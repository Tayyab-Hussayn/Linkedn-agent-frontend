import { useState } from 'react'

const clientData: Record<string, { tag: string; tagTxt: string; txt: string }[]> = {
  ahmed: [
    { tag: 'sched', tagTxt: '● Scheduled — Thu 10:30 AM', txt: "Most founders obsess over product-market fit. But the ones who scale? They obsess over story-market fit. Your narrative is your moat. Here's what I learned building TechVentures to 50k users with zero paid ads..." },
    { tag: 'draft', tagTxt: '◌ Draft — AI Generated', txt: "Unpopular take: The best hires I've ever made had zero relevant experience. What they had was relentless curiosity and zero ego. Here's why I'd choose that over a polished resume every single time..." },
  ],
  sara: [
    { tag: 'sched', tagTxt: '● Scheduled — Fri 9:00 AM', txt: "Your brand is not your logo. It's the feeling someone gets 3 seconds after landing on your page. We rebuilt GrowthLabs' entire positioning around one question: what do people feel?" },
    { tag: 'draft', tagTxt: '◌ Draft — AI Generated', txt: "Hot take: Most CMOs are spending 80% of budget on channels that drove results 2 years ago. Here's the framework I use to audit spend every quarter without killing what works..." },
  ],
  rahul: [
    { tag: 'sched', tagTxt: '● Scheduled — Wed 11:00 AM', txt: "We almost shut down NexaHR twice before finding product-market fit. The thing that saved us wasn't a pivot — it was listening to the 3 users who actually loved us instead of the 300 who were meh." },
    { tag: 'draft', tagTxt: '◌ Draft — AI Generated', txt: "Stop building features nobody asked for. I tracked every feature request for 6 months. 70% came from non-paying users. The paying ones? They wanted one thing: reliability." },
  ],
  maria: [
    { tag: 'sched', tagTxt: '● Scheduled — Mon 2:00 PM', txt: "Closed a 6-figure deal last month. The prospect told me: \"I've been reading your LinkedIn for 8 months.\" Content isn't marketing. It's trust on autopilot." },
    { tag: 'draft', tagTxt: '◌ Draft — AI Generated', txt: "The biggest objection in enterprise sales isn't price. It's timing. Here's the exact email framework I use to revive \"not right now\" deals 60 days later..." },
  ],
}

const clients = [
  { key: 'ahmed', initials: 'AK', name: 'Ahmed Khan', role: 'CEO, TechVentures' },
  { key: 'sara', initials: 'SF', name: 'Sara Fatima', role: 'CMO, GrowthLabs' },
  { key: 'rahul', initials: 'RJ', name: 'Rahul Joshi', role: 'Founder, NexaHR' },
  { key: 'maria', initials: 'MH', name: 'Maria Hassan', role: 'VP Sales, Apex' },
]

export default function ProductPreview() {
  const [activeClient, setActiveClient] = useState('ahmed')
  const [postStates, setPostStates] = useState<Record<string, Record<number, 'approved' | 'rejected' | null>>>({})

  const getPostState = (clientKey: string, idx: number) => postStates[clientKey]?.[idx] ?? null

  const approvePost = (clientKey: string, idx: number) => {
    setPostStates(prev => ({ ...prev, [clientKey]: { ...prev[clientKey], [idx]: 'approved' } }))
  }
  const rejectPost = (clientKey: string, idx: number) => {
    setPostStates(prev => ({ ...prev, [clientKey]: { ...prev[clientKey], [idx]: 'rejected' } }))
  }

  const posts = clientData[activeClient]
  const clientName = clients.find(c => c.key === activeClient)?.name

  return (
    <section className="preview rv" aria-label="Product preview">
      <div className="preview-in">
        <div className="preview-bar">
          <div className="preview-dot" />
          <div className="preview-dot" />
          <div className="preview-dot" />
          <span className="preview-ttl">Qalam — Client Dashboard</span>
        </div>
        <div className="preview-body">
          <aside className="pv-side">
            <div className="pv-side-lbl">Clients</div>
            {clients.map(c => (
              <div
                key={c.key}
                className={`pv-cl${activeClient === c.key ? ' on' : ''}`}
                onClick={() => setActiveClient(c.key)}
              >
                <div className="pv-av">{c.initials}</div>
                <div>
                  <div className="pv-nm">{c.name}</div>
                  <div className="pv-rl">{c.role}</div>
                </div>
                <div className="pv-st" />
              </div>
            ))}
          </aside>
          <div className="pv-main">
            <div className="pv-main-hd">
              <div className="pv-main-ttl">Upcoming Posts — {clientName}</div>
              <div className="pv-main-acts">
                <button className="pv-sm">History</button>
                <button className="pv-sm gd">+ Generate</button>
              </div>
            </div>
            <div>
              {posts.map((post, i) => {
                const state = getPostState(activeClient, i)
                return (
                  <div className="pv-post" key={i}>
                    <div className="pv-meta">
                      <span className={`pv-tag ${state === 'approved' ? 'sched' : post.tag}`}>
                        {state === 'approved' ? '✓ Approved — Publishing soon' : post.tagTxt}
                      </span>
                    </div>
                    <div className="pv-txt">{post.txt}</div>
                    <div className="pv-acts">
                      <button
                        className="pv-approve"
                        onClick={() => approvePost(activeClient, i)}
                        style={state === 'approved' ? { opacity: 0.6, pointerEvents: 'none' } : {}}
                      >
                        {state === 'approved' ? '✓ Approved' : 'Approve'}
                      </button>
                      <button className="pv-edit">Edit</button>
                      <button className="pv-rej" onClick={() => rejectPost(activeClient, i)}>Reject</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
