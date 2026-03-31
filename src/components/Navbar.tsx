import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = ['Home', 'Features', 'Pricing', 'How it works', 'Download'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active link based on current route
  useEffect(() => {
    if (location.pathname === '/download') {
      setActiveLink('Download');
    } else {
      setActiveLink('Home');
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveLink(sectionId);
    setIsMobileMenuOpen(false);
  };

  const isDownloadPage = location.pathname === '/download';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 md:pt-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`
          inline-flex items-center gap-1 rounded-full backdrop-blur-xl 
          border border-stroke/70 bg-surface/60 px-2 py-1.5
          transition-all duration-300
          ${isScrolled ? 'shadow-lg shadow-black/30 border-accent/20' : ''}
        `}
      >
        {/* Logo mark */}
        <Link to="/">
          <motion.div
            className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center cursor-pointer"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="font-display italic text-bg font-bold text-sm">Q</span>
          </motion.div>
        </Link>

        {/* Wordmark */}
        <Link to="/" className="hidden sm:block">
          <span className="font-display italic text-[15px] text-text-primary ml-1 mr-2">
            Qalam
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-4 bg-stroke mx-1 hidden sm:block" />

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => {
            const isDownloadLink = link === 'Download';
            const isActive = (isDownloadLink && isDownloadPage) || (!isDownloadLink && activeLink === link && !isDownloadPage);
            
            const linkClasses = `
              font-body text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2
              transition-all duration-200
              ${isActive
                ? 'text-text-primary bg-stroke/50' 
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
              }
            `;

            if (isDownloadLink) {
              return (
                <Link key={link} to="/download" className={linkClasses}>
                  {link}
                </Link>
              );
            }

            return (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={linkClasses}
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-stroke mx-1 hidden md:block" />

        {/* CTA Button - Download Now */}
        <Link
          to="/download"
          className="
            relative overflow-hidden rounded-full px-4 py-1.5
            font-body text-xs sm:text-sm
            bg-surface-2 border border-stroke text-text-primary
            group
          "
        >
          <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Download Now ↓</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-5 h-5 text-muted ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full mt-2 left-1/2 -translate-x-1/2
              bg-surface border border-stroke rounded-2xl p-4
              w-[90%] max-w-sm
            "
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isDownloadLink = link === 'Download';
                const isActive = (isDownloadLink && isDownloadPage) || (!isDownloadLink && activeLink === link && !isDownloadPage);
                
                const linkContent = (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      font-body text-sm rounded-xl px-4 py-3 text-left block
                      transition-all duration-200
                      ${isActive
                        ? 'text-text-primary bg-stroke/50' 
                        : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                      }
                    `}
                  >
                    {link}
                  </motion.span>
                );

                if (isDownloadLink) {
                  return (
                    <Link key={link} to="/download" onClick={() => setIsMobileMenuOpen(false)}>
                      {linkContent}
                    </Link>
                  );
                }

                return (
                  <motion.button
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(link)}
                    className={`
                      font-body text-sm rounded-xl px-4 py-3 text-left
                      transition-all duration-200
                      ${isActive
                        ? 'text-text-primary bg-stroke/50' 
                        : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                      }
                    `}
                  >
                    {link}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
