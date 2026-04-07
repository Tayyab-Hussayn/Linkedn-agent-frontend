import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Hooks
import { useGitHubRelease } from '../hooks/useGitHubRelease';

// Components
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// THREE.JS PARTICLE BACKGROUND (lighter - 800 particles)
// ============================================
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    
    return positions;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.00015;
      meshRef.current.rotation.x += 0.00006;
      camera.position.x += (mouseRef.current.x * 0.2 - camera.position.x) * 0.03;
      camera.position.y += (mouseRef.current.y * 0.1 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.0} color="#C9A84C" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <fogExp2 attach="fog" args={['#080808', 0.035]} />
      <ParticleField />
    </>
  );
}

// ============================================
// SECTION 1: DOWNLOAD HERO
// ============================================
function DownloadHero() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { links } = useGitHubRelease();

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    gsap.fromTo(heading,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.15
      }
    );
  }, []);

  return (
    <section className="min-h-[55vh] relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true, antialias: true }} style={{ position: 'absolute', inset: 0 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Radial gradient vignette overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, hsl(var(--bg)) 75%)' }}
      />

      {/* Horizontal rule lines */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-stroke/30 z-[1] pointer-events-none" />
      <div className="absolute top-[70%] left-0 right-0 h-px bg-stroke/30 z-[1] pointer-events-none" />

      {/* Content */}
      <div className="z-10 max-w-3xl mx-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/60 backdrop-blur-sm px-4 py-1.5 text-xs font-body text-muted mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-dot-pulse" />
          <span>Now Available — Desktop App v1.0</span>
        </motion.div>

        {/* Heading */}
        <div ref={headingRef} className="mb-6">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-text-primary">
            Download <span className="italic accent-gradient-text">*Qalam.*</span>
          </h1>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-body font-light text-base md:text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed"
        >
          The Qalam desktop app runs locally on your machine — giving you full LinkedIn automation with zero ban risk. One install, endless posts.
        </motion.p>

        {/* Version tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-xs text-muted/60 uppercase tracking-[0.3em]"
        >
          {links ? `${links.version} — Released ${links.publishedAt}` : 'Loading...'}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-[10px] text-muted uppercase tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient absolute top-0 animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// SECTION 2: DOWNLOAD CARDS
// ============================================
function DownloadCards() {
  const [macArch, setMacArch] = useState<'apple' | 'intel'>('apple');
  const [linuxPkg, setLinuxPkg] = useState<'appimage' | 'deb' | 'rpm'>('deb');
  const { links, loading } = useGitHubRelease();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const }
    })
  };

  return (
    <section className="bg-bg py-20 md:py-28 max-w-[1100px] mx-auto px-6">
      {/* Section eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-6 h-px bg-accent/50" />
        <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">CHOOSE YOUR PLATFORM</span>
        <div className="w-6 h-px bg-accent/50" />
      </div>

      {/* Heading */}
      <h2 className="font-display text-4xl md:text-5xl text-text-primary text-center mb-16 leading-tight">
        One app, every <span className="italic accent-gradient-text">*operating system.*</span>
      </h2>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Windows Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="bg-surface border border-stroke rounded-3xl p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 group hover:border-accent/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[70px] bg-accent/4 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.05] pointer-events-none" />

          {/* Windows Logo SVG */}
          <svg className="w-16 h-16 mb-8 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="windowsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" />
                <stop offset="50%" stopColor="#E8C97A" />
                <stop offset="100%" stopColor="#A07830" />
              </linearGradient>
            </defs>
            <path d="M5 15 L45 10 L45 47 L5 47 Z" fill="url(#windowsGradient)" />
            <path d="M50 9 L95 3 L95 47 L50 47 Z" fill="url(#windowsGradient)" />
            <path d="M5 52 L45 52 L45 90 L5 85 Z" fill="url(#windowsGradient)" />
            <path d="M50 52 L95 52 L95 97 L50 91 Z" fill="url(#windowsGradient)" />
          </svg>

          <h3 className="font-display italic text-3xl text-text-primary mb-2">Windows</h3>
          <p className="font-body text-xs text-muted uppercase tracking-[0.2em] mb-6">Windows 10 / 11 — 64-bit</p>

          {/* File info row */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="rounded-full bg-surface-2 border border-stroke px-3 py-1 font-body text-xs text-muted">Installer (.exe)</span>
            <span className="text-muted">·</span>
            <span className="rounded-full bg-surface-2 border border-stroke px-3 py-1 font-body text-xs text-muted">84 MB</span>
          </div>

          {/* Download button */}
          <a
            href={links?.windows ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full rounded-2xl py-4 font-body font-medium text-sm relative overflow-hidden bg-surface-2 border border-stroke text-text-primary group/btn flex items-center justify-center ${!links?.windows ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <span className="absolute inset-0 accent-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? 'Loading...' : 'Download for Windows'}
              <svg className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* macOS Card (Featured) */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="bg-surface-2 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden scale-[1.02] md:scale-[1.04] gradient-border"
        >
          {/* Most Popular badge */}
          <span className="absolute top-5 right-5 rounded-full bg-accent/15 border border-accent/30 text-accent font-body text-[10px] uppercase tracking-widest px-3 py-1">
            Most Popular
          </span>

          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[70px] bg-accent/10 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.05] pointer-events-none" />

          {/* Apple Logo SVG */}
          <svg className="w-16 h-16 mb-8 transition-transform duration-500 ease-out hover:scale-110 hover:rotate-3" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="appleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" />
                <stop offset="50%" stopColor="#E8C97A" />
                <stop offset="100%" stopColor="#A07830" />
              </linearGradient>
            </defs>
            <path d="M50 25 C50 25 42 15 32 18 C20 22 18 35 18 40 C18 55 28 70 35 75 C40 78 45 75 50 72 C55 75 60 78 65 75 C72 70 82 55 82 40 C82 35 80 22 68 18 C58 15 50 25 50 25 Z" fill="url(#appleGradient)" />
            <path d="M50 25 C52 18 58 10 68 12" stroke="url(#appleGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>

          <h3 className="font-display italic text-3xl text-text-primary mb-2">macOS</h3>
          <p className="font-body text-xs text-muted uppercase tracking-[0.2em] mb-6">macOS 12 Monterey and later</p>

          {/* File info row */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="rounded-full bg-surface border border-stroke px-3 py-1 font-body text-xs text-muted">Disk Image (.dmg)</span>
            <span className="text-muted">·</span>
            <span className="rounded-full bg-surface border border-stroke px-3 py-1 font-body text-xs text-muted">91 MB</span>
          </div>

          {/* Architecture toggle */}
          <div className="mb-6 inline-flex items-center gap-1 bg-surface border border-stroke rounded-full p-1">
            <button
              onClick={() => setMacArch('apple')}
              className={`relative px-3 py-1 rounded-full font-body text-xs transition-colors ${macArch === 'apple' ? 'bg-surface-2 text-text-primary' : 'text-muted'}`}
            >
              {macArch === 'apple' && <motion.span layoutId="arch-pill" className="absolute inset-0 bg-surface-2 rounded-full" />}
              <span className="relative z-10">Apple Silicon</span>
            </button>
            <button
              onClick={() => setMacArch('intel')}
              className={`relative px-3 py-1 rounded-full font-body text-xs transition-colors ${macArch === 'intel' ? 'bg-surface-2 text-text-primary' : 'text-muted'}`}
            >
              {macArch === 'intel' && <motion.span layoutId="arch-pill" className="absolute inset-0 bg-surface-2 rounded-full" />}
              <span className="relative z-10">Intel</span>
            </button>
          </div>

          {/* Download button */}
          <button className="w-full rounded-2xl py-4 font-body font-medium text-sm accent-gradient text-bg hover:scale-[1.02] glow-hover transition-transform">
            Download for Mac
          </button>

          {/* SHA checksum */}
          <p className="font-mono text-[10px] text-muted/40 mt-4 break-all">
            SHA256: b7e9d4f2a1c8...
          </p>
        </motion.div>

        {/* Linux Card */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="bg-surface border border-stroke rounded-3xl p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 group hover:border-accent/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[70px] bg-accent/4 group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 halftone-texture opacity-[0.05] pointer-events-none" />

          {/* Linux Tux SVG */}
          <svg className="w-16 h-16 mb-8 transition-all duration-500" viewBox="0 0 100 100">
            <ellipse cx="50" cy="85" rx="25" ry="12" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" className="group-hover:stroke-accent transition-colors" />
            <ellipse cx="50" cy="55" rx="22" ry="28" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" className="group-hover:stroke-accent transition-colors" />
            <circle cx="40" cy="48" r="4" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" className="group-hover:stroke-accent transition-colors" />
            <circle cx="60" cy="48" r="4" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" className="group-hover:stroke-accent transition-colors" />
            <path d="M45 62 Q50 68 55 62" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-accent transition-colors" />
            <path d="M28 55 L22 45" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-accent transition-colors" />
            <path d="M72 55 L78 45" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-accent transition-colors" />
          </svg>

          <h3 className="font-display italic text-3xl text-text-primary mb-2">Linux</h3>
          <p className="font-body text-xs text-muted uppercase tracking-[0.2em] mb-4">Ubuntu 20.04+ / Debian / Fedora</p>

          {/* Package format tabs */}
          <div className="mb-6 inline-flex items-center gap-1 bg-surface-2 border border-stroke rounded-full p-1">
            {(['appimage', 'deb', 'rpm'] as const).map((pkg) => (
              <button
                key={pkg}
                onClick={() => setLinuxPkg(pkg)}
                className={`relative px-3 py-1 rounded-full font-body text-xs transition-colors ${linuxPkg === pkg ? 'bg-surface text-text-primary' : 'text-muted'}`}
              >
                {linuxPkg === pkg && <motion.span layoutId="pkg-pill" className="absolute inset-0 bg-surface rounded-full" />}
                <span className="relative z-10 capitalize">{pkg === 'appimage' ? 'AppImage' : `.${pkg}`}</span>
              </button>
            ))}
          </div>

          {/* File info row */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="rounded-full bg-surface-2 border border-stroke px-3 py-1 font-body text-xs text-muted">
              {linuxPkg === 'appimage' ? 'AppImage (.AppImage)' : linuxPkg === 'deb' ? 'Package (.deb)' : 'Package (.rpm)'}
            </span>
            <span className="text-muted">·</span>
            <span className="rounded-full bg-surface-2 border border-stroke px-3 py-1 font-body text-xs text-muted">79 MB</span>
          </div>

          {/* Download button */}
          <a
            href={linuxPkg === 'deb' ? (links?.deb ?? '#') : linuxPkg === 'rpm' ? (links?.rpm ?? '#') : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full rounded-2xl py-4 font-body font-medium text-sm relative overflow-hidden bg-surface-2 border border-stroke text-text-primary group/btn flex items-center justify-center ${(linuxPkg === 'appimage' || (!links?.deb && !links?.rpm)) ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <span className="absolute inset-0 accent-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? 'Loading...' : linuxPkg === 'appimage' ? 'Not available yet' : 'Download for Linux'}
              <svg className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 3: SYSTEM REQUIREMENTS
// ============================================
function SystemRequirements() {
  return (
    <section className="bg-bg border-t border-stroke py-20 md:py-28 max-w-[1000px] mx-auto px-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-accent/50" />
        <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">REQUIREMENTS</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
        System <span className="italic accent-gradient-text">*requirements.*</span>
      </h2>

      {/* 2-column grid */}
      <div className="md:grid-cols-2 gap-10 mt-14 grid">
        {/* Minimum */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="bg-surface border border-stroke rounded-3xl p-8"
        >
          <span className="font-body text-[10px] uppercase tracking-widest text-muted mb-6 block">MINIMUM</span>
          <ul className="space-y-4">
            {[
              { label: 'OS', value: 'Windows 10 64-bit, macOS 12, Ubuntu 20.04' },
              { label: 'RAM', value: '4 GB' },
              { label: 'Storage', value: '500 MB free' },
              { label: 'Internet', value: 'Required for AI generation' },
              { label: 'LinkedIn', value: 'Active account' }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-4 h-4 text-muted/50 flex-shrink-0 mt-0.5">—</span>
                <div>
                  <span className="font-body text-sm font-medium text-text-primary">{item.label}</span>
                  <span className="font-body text-sm text-muted"> / {item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recommended */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="bg-surface-2 rounded-3xl p-8 gradient-border"
        >
          <span className="font-body text-[10px] uppercase tracking-widest accent-gradient-text mb-6 block">RECOMMENDED</span>
          <ul className="space-y-4">
            {[
              { label: 'OS', value: 'Windows 11, macOS 14 Sonoma' },
              { label: 'RAM', value: '8 GB' },
              { label: 'Storage', value: '2 GB free' },
              { label: 'Internet', value: 'Stable broadband' },
              { label: 'LinkedIn', value: 'Premium account' }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-body text-sm font-medium text-text-primary">{item.label}</span>
                  <span className="font-body text-sm text-muted"> / {item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: INSTALL GUIDE
// ============================================
function InstallGuide() {
  const [activeOS, setActiveOS] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const osSteps = {
    windows: [
      { title: 'Download the installer', content: 'Click the Download for Windows button above. The .exe installer (84 MB) will download to your Downloads folder.' },
      { title: 'Run the installer', content: 'Double-click the downloaded file. Click "Install" and wait approximately 30 seconds for the installation to complete.' },
      { title: 'Launch Qalam', content: 'Launch Qalam from your desktop shortcut or find it in your Start Menu. The app will open to the login screen.' },
      { title: 'Enter your license key', content: 'Enter your license key (sent via email) and connect your LinkedIn account to authorize posting.' },
      { title: 'Start automating', content: 'Download your first client profile and you are live. The AI will begin generating content immediately.' }
    ],
    macos: [
      { title: 'Download the DMG', content: 'Click the Download for Mac button above. The .dmg file (91 MB) will download to your Downloads folder.' },
      { title: 'Open the disk image', content: 'Double-click the downloaded .dmg file to open it. A new window will appear with the Qalam app.' },
      { title: 'Install the app', content: 'Drag Qalam.app into your Applications folder. This is the standard macOS installation method.' },
      { title: 'First launch', content: 'Right-click the app and select Open the first time to bypass Gatekeeper. This only needs to be done once.' },
      { title: 'Grant permissions', content: 'Sign in with your Qalam credentials. Grant Accessibility permissions if prompted (required for browser automation).' }
    ],
    linux: [
      { title: 'Download AppImage', content: 'Click the Download for Linux button above. The .AppImage file (79 MB) will download to your Downloads folder.' },
      { title: 'Make executable', content: 'Open a terminal and run: chmod +x Qalam-1.0.4.AppImage to make the file executable.' },
      { title: 'Run the app', content: 'Execute the file with: ./Qalam-1.0.4.AppImage. The app will launch immediately without installation.' },
      { title: 'Desktop integration (optional)', content: 'Add the --install-desktop-integration flag to create a desktop entry and menu item.' },
      { title: 'Sign in and configure', content: 'Sign in with your Qalam credentials and configure your first client profile to start automating.' }
    ]
  };

  const steps = osSteps[activeOS];

  return (
    <section className="bg-bg border-t border-stroke py-20 md:py-28 max-w-[860px] mx-auto px-6">
      {/* Section header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-6 h-px bg-accent/50" />
        <span className="font-body text-xs text-muted uppercase tracking-[0.35em]">INSTALLATION</span>
        <div className="w-6 h-px bg-accent/50" />
      </div>
      <h2 className="font-display text-4xl md:text-5xl text-text-primary text-center leading-tight mb-10">
        Up and running <span className="italic accent-gradient-text">*in 3 minutes.*</span>
      </h2>

      {/* OS Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        {(['windows', 'macos', 'linux'] as const).map((os) => (
          <button
            key={os}
            onClick={() => { setActiveOS(os); setExpandedStep(0); }}
            className={`relative px-5 py-2 rounded-full font-body text-sm transition-all ${
              activeOS === os 
                ? 'accent-gradient text-bg' 
                : 'bg-surface border border-stroke text-muted hover:text-text-primary'
            }`}
          >
            {activeOS === os && <motion.span layoutId="os-tab" className="absolute inset-0 accent-gradient rounded-full" />}
            <span className="relative z-10 capitalize">{os}</span>
          </button>
        ))}
      </div>

      {/* Steps Accordion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOS}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="border-b border-stroke py-6 cursor-pointer group"
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-9 h-9 rounded-full border border-stroke bg-surface flex items-center justify-center font-mono text-xs text-muted group-hover:border-accent/50 group-hover:text-accent transition-all">
                    {index + 1}
                  </div>
                  <span className="font-body text-base font-medium text-text-primary">{step.title}</span>
                </div>
                <span className="font-display text-xl text-muted group-hover:text-accent transition-colors">
                  {expandedStep === index ? '−' : '+'}
                </span>
              </div>

              <AnimatePresence>
                {expandedStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm text-muted leading-relaxed pt-3 pb-2 pl-14 max-w-lg">
                      {step.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ============================================
// SECTION 5: DOWNLOAD FOOTER CTA
// ============================================
function DownloadFooterCTA() {
  return (
    <section className="bg-surface/20 border-t border-stroke py-20 md:py-28 px-6 text-center relative overflow-hidden">
      {/* Background blob decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-accent/6 top-[-100px] left-[-100px] animate-float" />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-accent/4 bottom-[-80px] right-[-80px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-accent/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="font-body text-xs text-muted uppercase tracking-[0.4em] mb-6">READY TO AUTOMATE</p>
        <h2 className="font-display text-5xl md:text-6xl text-text-primary leading-tight mb-6">
          Your clients deserve <span className="italic accent-gradient-text">*better content.*</span>
        </h2>
        <p className="font-body text-base text-muted max-w-md mx-auto mb-10">
          Download Qalam today and never manually write a LinkedIn post again.
        </p>

        {/* Download quick-links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button className="rounded-full border border-stroke px-6 py-3 font-body text-sm text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Windows
          </button>
          <button className="rounded-full px-6 py-3 font-body text-sm text-bg accent-gradient hover:scale-[1.02] glow-hover transition-transform flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            macOS
          </button>
          <button className="rounded-full border border-stroke px-6 py-3 font-body text-sm text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Linux
          </button>
        </div>

        <p className="font-body text-xs text-muted">Free 14-day trial · No credit card required · Cancel anytime</p>
      </div>
    </section>
  );
}

// ============================================
// MAIN DOWNLOAD PAGE
// ============================================
export default function DownloadPage() {
  useEffect(() => {
    // Refresh ScrollTrigger and scroll to top on mount
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <main>
        <DownloadHero />
        <DownloadCards />
        <SystemRequirements />
        <InstallGuide />
        <DownloadFooterCTA />
      </main>
      <Footer />
    </div>
  );
}
