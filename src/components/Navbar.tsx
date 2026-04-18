import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className={`nav-in${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo" aria-label="Qalam Home">
          <div className="nav-mark" aria-hidden="true">Q</div>
          <span className="nav-name">Qalam</span>
        </Link>
        <div className="nav-links">
          {isHome ? (
            <>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#how-it-works">How it works</a>
              <a href="#faq">FAQ</a>
            </>
          ) : (
            <>
              <Link to="/#features">Features</Link>
              <Link to="/#pricing">Pricing</Link>
              <Link to="/#how-it-works">How it works</Link>
              <Link to="/#faq">FAQ</Link>
            </>
          )}
        </div>
        <Link to="/download" className="nav-cta">Download</Link>
      </div>
    </nav>
  )
}
