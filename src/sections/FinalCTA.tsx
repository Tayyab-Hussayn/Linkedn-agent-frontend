export default function FinalCTA() {
  return (
    <section className="cta-s" id="cta" aria-label="Call to action">
      <div className="cta-bg" />
      <div className="cta-in rv">
        <div className="s-lbl" style={{ justifyContent: 'center' }}>Start today</div>
        <h2 className="cta-ttl">Your clients deserve a <em>consistent&nbsp;presence.</em></h2>
        <p className="cta-desc">Start your 14-day free trial. No credit card. Set up your first client in 5 minutes. See AI-generated posts in your dashboard within the hour.</p>
        <div className="hero-actions" style={{ marginBottom: 0 }}>
          <a
            href="mailto:hello@byqalam.com?subject=Free Trial Request&body=Hi Qalam team,%0A%0AI'd like to start my free 14-day trial.%0A%0AMy name:%0ACompany:%0ANumber of clients I manage:%0A%0AThanks!"
            className="btn-p"
          >Start your free 14-day trial →</a>
          <a href="mailto:hello@byqalam.com?subject=Demo Request" className="btn-s">Book a demo</a>
        </div>
      </div>
    </section>
  )
}
