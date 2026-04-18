export default function Hero() {
  return (
    <header className="hero" role="banner">
      <div className="hero-bg">
        <div className="orb1" />
        <div className="orb2" />
        <div className="hero-grid" />
      </div>
      <div className="hero-ct">
        <div className="hero-badge">
          <span className="hero-dot" />
          AI-Powered LinkedIn Automation
        </div>
        <h1>
          Your LinkedIn,<br />
          <em>on autopilot.</em>
        </h1>
        <p className="hero-sub">
          Qalam generates LinkedIn posts in your client's voice, they approve with one click,
          and it publishes from their own machine. Zero ban risk. Built for agencies.
        </p>
        <div className="hero-actions">
          <a href="#cta" className="btn-p" id="heroCta">Start your free 14-day trial →</a>
          <a href="#how-it-works" className="btn-s">See how it works</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-ln" />
      </div>
    </header>
  )
}
