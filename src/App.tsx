import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Agenda } from './components/Agenda'
import { FinalCta, Footer } from './components/Closing'
import { Feed } from './components/Feed'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Participate } from './components/Participate'
import { Pillars } from './components/Pillars'
import { Stats } from './components/Stats'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#a-frame" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-frame focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Pillars />
        <Agenda />
        <Feed />
        <Participate />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  )
}
