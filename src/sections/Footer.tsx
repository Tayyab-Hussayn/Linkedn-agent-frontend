import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-in">
        <div className="footer-top">
          <div>
            <div className="nav-logo">
              <div className="nav-mark">Q</div>
              <span className="nav-name">Qalam</span>
            </div>
            <p className="footer-desc">LinkedIn automation for agencies and professionals who don't have time to post — but know they should.</p>
            <a href="mailto:hello@byqalam.com" className="footer-email">✉ hello@byqalam.com</a>
          </div>
          <div>
            <div className="fc-title">Product</div>
            <ul className="footer-lnks">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="fc-title">Company</div>
            <ul className="footer-lnks">
              <li><a href="https://www.linkedin.com/company/byqalam" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              <li><a href="mailto:hello@byqalam.com">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="fc-title">Stay in the loop</div>
            <div className="footer-nl">
              <p>Early access updates and LinkedIn growth tips.</p>
              <form className="footer-nl-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="footer-nl-in"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="footer-nl-btn">Subscribe</button>
              </form>
              <div className="footer-nl-note">No spam, ever. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>
        <div className="footer-btm">
          <span>© 2026 Qalam. All rights reserved.</span>
          <div className="footer-btm-lnks">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-dot" />
            Now in Early Access
          </div>
        </div>
      </div>
    </footer>
  )
}
