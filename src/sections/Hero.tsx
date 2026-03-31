import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

// Particle field component
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  // Generate particle positions
  const particles = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36; // x: [-18, 18]
      positions[i * 3 + 1] = (Math.random() - 0.5) * 36; // y: [-18, 18]
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8; // z: [-4, 4]
    }
    
    return positions;
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useFrame(() => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.0002;
      meshRef.current.rotation.x += 0.00008;

      // Mouse parallax on camera
      camera.position.x += (mouseRef.current.x * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (mouseRef.current.y * 0.15 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        color="#C9A84C"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// Scene with fog
function Scene() {
  return (
    <>
      <fogExp2 attach="fog" args={['#080808', 0.04]} />
      <ParticleField />
    </>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP headline animation
    const lines = headlineRef.current?.querySelectorAll('.headline-line');
    if (lines) {
      gsap.fromTo(lines,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ alpha: true, antialias: true }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Radial gradient vignette overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, hsl(var(--bg)) 75%)'
        }}
      />

      {/* Hero Content */}
      <div className="z-10 max-w-5xl mx-auto pt-24">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="
            inline-flex items-center gap-2 rounded-full 
            border border-stroke bg-surface/60 backdrop-blur-sm 
            px-4 py-1.5 text-xs font-body text-muted mb-10
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-dot-pulse" />
          <span>AI-Powered LinkedIn Automation</span>
        </motion.div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <div className="headline-line overflow-hidden">
            <h1 className="font-display text-[11vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] leading-[0.88] tracking-tight text-text-primary">
              Your LinkedIn,
            </h1>
          </div>
          <div className="headline-line overflow-hidden">
            <h1 className="font-display italic text-[11vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] leading-[0.88] tracking-tight accent-gradient-text">
              *on autopilot.*
            </h1>
          </div>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-body font-light text-base md:text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Qalam generates, schedules, and publishes LinkedIn posts for your clients — fully automated, always on-brand, never flagged.
        </motion.p>

        {/* CTA group */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            className="
              rounded-full px-8 py-4 font-body font-medium text-sm text-bg
              accent-gradient glow-hover
            "
          >
            Start for free →
          </motion.button>

          {/* Secondary CTA */}
          <button className="
            rounded-full px-8 py-4 font-body text-sm text-muted 
            border border-stroke hover:text-text-primary hover:border-accent/40 
            transition-all duration-300
          ">
            See how it works
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          {/* Avatar circles */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="
                  w-7 h-7 rounded-full border-2 border-bg bg-surface-2 
                  -ml-2 first:ml-0 inline-flex items-center justify-center 
                  font-body text-[10px] text-muted
                "
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="font-body text-xs text-muted">
            Trusted by 200+ LinkedIn professionals
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-[10px] text-muted uppercase tracking-[0.3em]">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient absolute top-0 animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  );
}
