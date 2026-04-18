import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../sections/Footer'
import { useGitHubRelease } from '../hooks/useGitHubRelease'

function DownloadHero({ version, publishedAt }: { version?: string; publishedAt?: string }) {
  return (
    <section className="hero" style={{ minHeight: '60vh' }}>
      <div className="hero-bg">
        <div className="orb1" />
        <div className="orb2" />
        <div className="hero-grid" />
      </div>
      <div className="hero-ct">
        <div className="hero-badge">
          <span className="hero-dot" />
          Desktop App {version ?? 'v1.3.0'}
        </div>
        <h1>
          Download<br />
          <em>Qalam.</em>
        </h1>
        <p className="hero-sub">
          The Qalam desktop app runs locally on your machine — giving you full LinkedIn automation with zero ban risk.
          {publishedAt && <> Released {publishedAt}.</>}
        </p>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-ln" />
      </div>
    </section>
  )
}

function DownloadCards() {
  const [linuxPkg, setLinuxPkg] = useState<'deb' | 'rpm'>('deb')
  const { links, loading, error } = useGitHubRelease()

  return (
    <section style={{ padding: '0 28px 100px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="pricing-hd rv" style={{ marginBottom: '48px' }}>
        <div className="s-lbl" style={{ justifyContent: 'center' }}>Download</div>
        <h2 className="s-ttl">One app, every <em>platform.</em></h2>
        <p className="pricing-sub">Works on Windows, macOS, and Linux. Free 14-day trial, no credit card required.</p>
      </div>

      {error && (
        <div className="rv" style={{ textAlign: 'center', marginBottom: '40px', padding: '20px 28px', background: 'rgba(201,165,78,.06)', border: '1px solid rgba(201,165,78,.18)', borderRadius: 'var(--r-m)' }}>
          <p style={{ color: 'var(--t2)', fontSize: '14px', marginBottom: '10px' }}>Download links are temporarily unavailable. Email us to get your download link instantly:</p>
          <a href="mailto:hello@byqalam.com?subject=Download Request" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '14px' }}>hello@byqalam.com →</a>
        </div>
      )}

      <div className="p-cards">
        {/* macOS */}
        <div className="p-card rv">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <svg width="48" height="48" viewBox="0 0 100 100" style={{ margin: '0 auto 16px' }}>
              <defs>
                <linearGradient id="appleG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--gold)" />
                  <stop offset="100%" stopColor="var(--gold-d)" />
                </linearGradient>
              </defs>
              <path d="M50 25 C50 25 42 15 32 18 C20 22 18 35 18 40 C18 55 28 70 35 75 C40 78 45 75 50 72 C55 75 60 78 65 75 C72 70 82 55 82 40 C82 35 80 22 68 18 C58 15 50 25 50 25 Z" fill="url(#appleG)" />
              <path d="M50 25 C52 18 58 10 68 12" stroke="url(#appleG)" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
            <div className="p-plan">macOS</div>
            <div className="p-price" style={{ fontSize: '20px', lineHeight: 1.4 }}>Apple Silicon<span style={{ fontSize: '13px' }}> (.dmg)</span></div>
            <div className="p-psub">macOS 12 Monterey and later</div>
          </div>
          <div className="p-div" />
          <ul className="p-feats">
            <li><span className="p-chk">✓</span>Apple Silicon (M1/M2/M3)</li>
            <li><span className="p-chk">✓</span>Auto-update built-in</li>
            <li><span className="p-chk">✓</span>Native macOS integration</li>
          </ul>
          <a
            href={links?.macSilicon ?? 'mailto:hello@byqalam.com?subject=Download Request - macOS'}
            target={links?.macSilicon ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="p-btn sec"
            style={!links?.macSilicon && !loading ? { opacity: 0.6 } : {}}
          >
            {loading ? 'Loading...' : links?.macSilicon ? `Download for Mac${links.macSiliconSize ? ` · ${links.macSiliconSize}` : ''}` : 'Request via email'}
          </a>
        </div>

        {/* Windows (featured) */}
        <div className="p-card ft rv rvd1">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <svg width="48" height="48" viewBox="0 0 100 100" style={{ margin: '0 auto 16px' }}>
              <defs>
                <linearGradient id="winG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--gold)" />
                  <stop offset="100%" stopColor="var(--gold-d)" />
                </linearGradient>
              </defs>
              <path d="M5 15 L45 10 L45 47 L5 47 Z" fill="url(#winG)" />
              <path d="M50 9 L95 3 L95 47 L50 47 Z" fill="url(#winG)" />
              <path d="M5 52 L45 52 L45 90 L5 85 Z" fill="url(#winG)" />
              <path d="M50 52 L95 52 L95 97 L50 91 Z" fill="url(#winG)" />
            </svg>
            <div className="p-plan">Windows <span className="p-pop">Most Popular</span></div>
            <div className="p-price" style={{ fontSize: '20px', lineHeight: 1.4 }}>Installer<span style={{ fontSize: '13px' }}> (.exe)</span></div>
            <div className="p-psub">Windows 10 / 11 — 64-bit</div>
          </div>
          <div className="p-div" />
          <ul className="p-feats">
            <li><span className="p-chk">✓</span>Windows 10 & 11 support</li>
            <li><span className="p-chk">✓</span>Auto-update built-in</li>
            <li><span className="p-chk">✓</span>System tray integration</li>
          </ul>
          <a
            href={links?.windows ?? 'mailto:hello@byqalam.com?subject=Download Request - Windows'}
            target={links?.windows ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="p-btn pri"
            style={!links?.windows && !loading ? { opacity: 0.7 } : {}}
          >
            {loading ? 'Loading...' : links?.windows ? `Download for Windows${links.windowsSize ? ` · ${links.windowsSize}` : ''}` : 'Request via email'}
          </a>
        </div>

        {/* Linux */}
        <div className="p-card rv rvd2">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <svg width="48" height="48" viewBox="0 0 100 100" style={{ margin: '0 auto 16px' }}>
              <ellipse cx="50" cy="85" rx="25" ry="12" fill="none" stroke="var(--gold)" strokeWidth="2" />
              <ellipse cx="50" cy="55" rx="22" ry="28" fill="none" stroke="var(--gold)" strokeWidth="2" />
              <circle cx="40" cy="48" r="4" fill="none" stroke="var(--gold)" strokeWidth="2" />
              <circle cx="60" cy="48" r="4" fill="none" stroke="var(--gold)" strokeWidth="2" />
              <path d="M45 62 Q50 68 55 62" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="p-plan">Linux</div>
            <div className="p-price" style={{ fontSize: '20px', lineHeight: 1.4 }}>
              <div className="p-toggle" style={{ display: 'inline-flex', marginBottom: 0 }}>
                <button className={`p-tog-btn${linuxPkg === 'deb' ? ' on' : ''}`} onClick={() => setLinuxPkg('deb')}>.deb</button>
                <button className={`p-tog-btn${linuxPkg === 'rpm' ? ' on' : ''}`} onClick={() => setLinuxPkg('rpm')}>.rpm</button>
              </div>
            </div>
            <div className="p-psub">Ubuntu 20.04+ · Debian · Fedora</div>
          </div>
          <div className="p-div" />
          <ul className="p-feats">
            <li><span className="p-chk">✓</span>Debian / Ubuntu (.deb)</li>
            <li><span className="p-chk">✓</span>Fedora / RHEL (.rpm)</li>
            <li><span className="p-chk">✓</span>Auto-update built-in</li>
          </ul>
          {(() => {
            const href = linuxPkg === 'deb' ? links?.deb : links?.rpm
            const size = linuxPkg === 'deb' ? links?.debSize : links?.rpmSize
            return (
              <a
                href={href ?? `mailto:hello@byqalam.com?subject=Download Request - Linux .${linuxPkg}`}
                target={href ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="p-btn sec"
                style={!href && !loading ? { opacity: 0.6 } : {}}
              >
                {loading ? 'Loading...' : href ? `Download .${linuxPkg}${size ? ` · ${size}` : ''}` : 'Request via email'}
              </a>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

function SystemRequirements() {
  return (
    <section style={{ padding: '0 28px 100px', maxWidth: '860px', margin: '0 auto', borderTop: '1px solid var(--border)', paddingTop: '80px' }}>
      <div className="rv" style={{ marginBottom: '48px' }}>
        <div className="s-lbl">Requirements</div>
        <h2 className="s-ttl">System <em>requirements.</em></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="rv rvd1">
        <div className="fc">
          <div className="fc-t" style={{ marginBottom: '20px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--t3)' }}>Minimum</div>
          {[
            ['OS', 'Windows 10 64-bit, macOS 12, Ubuntu 20.04'],
            ['RAM', '4 GB'],
            ['Storage', '500 MB free'],
            ['Internet', 'Required for AI generation'],
            ['LinkedIn', 'Active account'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '13.5px' }}>
              <span style={{ color: 'var(--t3)', flexShrink: 0 }}>—</span>
              <span><span style={{ color: 'var(--t1)', fontWeight: 500 }}>{label}</span><span style={{ color: 'var(--t2)' }}> / {val}</span></span>
            </div>
          ))}
        </div>
        <div className="fc" style={{ borderColor: 'rgba(201,165,78,.25)', background: 'linear-gradient(180deg,rgba(201,165,78,.04) 0%,var(--bg3) 35%)' }}>
          <div className="fc-t" style={{ marginBottom: '20px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gold)' }}>Recommended</div>
          {[
            ['OS', 'Windows 11, macOS 14 Sonoma'],
            ['RAM', '8 GB'],
            ['Storage', '2 GB free'],
            ['Internet', 'Stable broadband'],
            ['LinkedIn', 'Premium account'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '13.5px' }}>
              <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>
              <span><span style={{ color: 'var(--t1)', fontWeight: 500 }}>{label}</span><span style={{ color: 'var(--t2)' }}> / {val}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstallGuide() {
  const [activeOS, setActiveOS] = useState<'windows' | 'macos' | 'linux'>('windows')
  const [openStep, setOpenStep] = useState<number | null>(0)

  const osSteps: Record<string, { title: string; content: string }[]> = {
    windows: [
      { title: 'Download the installer', content: 'Click the Download for Windows button above. The .exe installer will download to your Downloads folder.' },
      { title: 'Run the installer', content: 'Double-click the downloaded file. Click "Install" and wait approximately 30 seconds for the installation to complete.' },
      { title: 'Launch Qalam', content: 'Launch Qalam from your desktop shortcut or Start Menu. The app will open to the login screen.' },
      { title: 'Connect your account', content: 'Enter your credentials and connect your LinkedIn account to authorize publishing.' },
      { title: 'Start automating', content: 'Add your first client and you\'re live. AI will generate posts immediately.' },
    ],
    macos: [
      { title: 'Download the DMG', content: 'Click the Download for Mac button above. The .dmg file will download to your Downloads folder.' },
      { title: 'Open the disk image', content: 'Double-click the downloaded .dmg to open it. A window will appear with the Qalam app.' },
      { title: 'Install the app', content: 'Drag Qalam.app into your Applications folder.' },
      { title: 'First launch', content: 'Right-click the app and select Open the first time to bypass Gatekeeper. Only needed once.' },
      { title: 'Grant permissions', content: 'Sign in with your credentials. Grant Accessibility permissions if prompted.' },
    ],
    linux: [
      { title: 'Download the package', content: 'Click the Download for Linux button above. Choose .deb (Ubuntu/Debian) or .rpm (Fedora/RHEL).' },
      { title: 'Install the package', content: 'Run: sudo dpkg -i qalam.deb (Debian/Ubuntu) or sudo rpm -i qalam.rpm (Fedora/RHEL).' },
      { title: 'Launch Qalam', content: 'Find Qalam in your applications menu or run qalam from a terminal.' },
      { title: 'Connect your account', content: 'Sign in with your Qalam credentials and add your first client.' },
      { title: 'Start automating', content: 'AI will generate posts immediately after setup.' },
    ],
  }

  const steps = osSteps[activeOS]

  return (
    <section style={{ padding: '80px 28px 100px', maxWidth: '860px', margin: '0 auto', borderTop: '1px solid var(--border)' }}>
      <div className="rv" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="s-lbl" style={{ justifyContent: 'center' }}>Installation</div>
        <h2 className="s-ttl">Up and running <em>in 3 minutes.</em></h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '40px' }} className="rv rvd1">
        {(['windows', 'macos', 'linux'] as const).map(os => (
          <button
            key={os}
            onClick={() => { setActiveOS(os); setOpenStep(0) }}
            className={os === activeOS ? 'p-btn pri' : 'p-btn sec'}
            style={{ width: 'auto', padding: '9px 22px', display: 'inline-block' }}
          >
            {os === 'macos' ? 'macOS' : os.charAt(0).toUpperCase() + os.slice(1)}
          </button>
        ))}
      </div>

      <div className="rv rvd2">
        {steps.map((step, i) => (
          <div
            key={`${activeOS}-${i}`}
            className={`fq${openStep === i ? ' open' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <button className="fq-q" onClick={() => setOpenStep(openStep === i ? null : i)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--gold)', flexShrink: 0 }}>{i + 1}</span>
                {step.title}
              </span>
              <span className="fq-ico">+</span>
            </button>
            <div className="fq-a">
              <p>{step.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function DownloadPage() {
  const { links } = useGitHubRelease()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Trigger scroll reveal for static elements
    const obs = new IntersectionObserver(
      entries => entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('v') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <DownloadHero version={links?.version} publishedAt={links?.publishedAt} />
        <DownloadCards />
        <SystemRequirements />
        <InstallGuide />
      </main>
      <Footer />
    </>
  )
}
