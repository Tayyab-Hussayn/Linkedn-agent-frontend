import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import ProductPreview from '../sections/ProductPreview'
import Metrics from '../sections/Metrics'
import Features from '../sections/Features'
import HowItWorks from '../sections/HowItWorks'
import Pricing from '../sections/Pricing'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import FinalCTA from '../sections/FinalCTA'
import Marquee from '../sections/Marquee'
import Footer from '../sections/Footer'

export default function HomePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(el => {
          if (el.isIntersecting) el.target.classList.add('v')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductPreview />
        <Metrics />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Marquee />
        <Footer />
      </main>
    </>
  )
}
