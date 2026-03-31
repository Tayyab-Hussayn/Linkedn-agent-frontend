import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import LoadingScreen from '../components/LoadingScreen';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';

// Sections
import Hero from '../sections/Hero';
import LogoTicker from '../sections/LogoTicker';
import Features from '../sections/Features';
import HowItWorks from '../sections/HowItWorks';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import FinalCTA from '../sections/FinalCTA';
import Footer from '../sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Refresh ScrollTrigger after loading
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <div className="relative">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Hero />
        <LogoTicker />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
