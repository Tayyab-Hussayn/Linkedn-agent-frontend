import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const productLinks = ['Features', 'Pricing', 'How it works', 'Changelog'];
const companyLinks = ['About', 'Blog', 'Careers', 'Contact'];

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // GSAP marquee animation
    gsap.to(marquee, {
      xPercent: -50,
      duration: 45,
      ease: 'none',
      repeat: -1
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert('Thanks for subscribing!');
    setEmail('');
  };

  const marqueeText = 'GENERATE • APPROVE • PUBLISH • AUTOMATE • ';
  const repeatedText = marqueeText.repeat(8);

  return (
    <footer className="bg-bg border-t border-stroke pt-16 pb-8 overflow-hidden">
      {/* GSAP Marquee */}
      <div className="overflow-hidden py-5 border-b border-stroke mb-12">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap"
          style={{ width: 'fit-content' }}
        >
          <span className="font-display italic text-[3.5vw] text-stroke/30">
            {repeatedText}
          </span>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Brand column */}
        <div className="md:col-span-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center">
              <span className="font-display italic text-bg font-bold text-sm">Q</span>
            </div>
            <span className="font-display italic text-xl text-text-primary">
              Qalam
            </span>
          </div>

          {/* Tagline */}
          <p className="font-body text-sm text-muted leading-relaxed max-w-xs">
            LinkedIn automation for professionals who don't have time to post.
          </p>

          {/* Email */}
          <a
            href="mailto:hello@qalam.ai"
            className="font-body text-sm text-muted hover:text-accent transition-colors duration-300 mt-5 block"
          >
            hello@qalam.ai
          </a>
        </div>

        {/* Product links */}
        <div className="md:col-span-2 md:col-start-6">
          <h4 className="font-body text-xs text-muted uppercase tracking-[0.3em] mb-4">
            Product
          </h4>
          <ul>
            {productLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-body text-sm text-text-primary/70 hover:text-text-primary transition-colors duration-200 block mb-2.5"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company links */}
        <div className="md:col-span-2">
          <h4 className="font-body text-xs text-muted uppercase tracking-[0.3em] mb-4">
            Company
          </h4>
          <ul>
            {companyLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-body text-sm text-text-primary/70 hover:text-text-primary transition-colors duration-200 block mb-2.5"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <h4 className="font-body text-sm text-text-primary mb-3">
            Stay in the loop
          </h4>
          <p className="font-body text-xs text-muted mb-4">
            Early access updates and LinkedIn growth tips.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="
                flex-1 rounded-full bg-surface border border-stroke 
                px-4 py-2.5 font-body text-sm text-text-primary 
                placeholder:text-muted focus:outline-none focus:border-accent/50
              "
              required
            />
            <button
              type="submit"
              className="
                rounded-full px-5 py-2.5 font-body text-sm text-bg 
                accent-gradient hover:opacity-90 transition-opacity
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-stroke">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="font-body text-xs text-muted">
            © 2026 Qalam. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <a href="#" className="font-body text-xs text-muted hover:text-text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="font-body text-xs text-muted hover:text-text-primary transition-colors">
              Terms
            </a>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse" />
            <span className="font-body text-xs text-muted">
              Accepting new clients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
