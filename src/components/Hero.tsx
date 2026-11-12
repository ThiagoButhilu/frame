import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { events, heroSlides, heroWords, links } from '../data/content'
import { useCountdown } from '../hooks/useCountdown'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Flower } from './Flower'
import { HeroStories } from './HeroStories'
import { ease } from '../motion'

const FLOWER_TURN_MS = 1400

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % heroWords.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-flex overflow-hidden pb-[0.08em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={heroWords[i]}
          className="block text-magenta"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease }}
        >
          {heroWords[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">tecnologia</span>
    </span>
  )
}

function NextEvent() {
  const next = events[0]
  const c = useCountdown(next.date)
  return (
    <a href="#agenda" className="group flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="flex items-center gap-2">
        <span className="size-2 animate-blink rounded-full bg-lime" />
        <span className="label text-lime">Próximo encontro</span>
      </span>
      <span className="text-sm text-white/80">
        {next.type} · {next.title} {next.connective} {next.tail}
      </span>
      <span className="font-display text-lg font-extrabold tabular-nums">
        {c.days}d {c.hours}h {c.minutes}m <span className="text-white/50">{c.seconds}s</span>
      </span>
      <span className="text-lime transition-transform group-hover:translate-x-1">→</span>
    </a>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  // A flor vira 90° num ritmo fixo. Com a aba oculta não acumula voltas.
  const [turns, setTurns] = useState(0)
  useEffect(() => {
    const t = setInterval(() => !document.hidden && setTurns((n) => n + 1), FLOWER_TURN_MS)
    return () => clearInterval(t)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const flowerY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const flowerScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  // No mobile o hero é mais alto que a tela: o fade sobreporia a faixa inferior.
  const desktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="inicio" ref={ref} className="relative isolate overflow-hidden bg-ink">
      {/* Grafismo sangrado: gira sempre, em passos de 90°. */}
      <motion.div className="pointer-events-none absolute -right-[30vw] -bottom-[25vw] -z-10 w-[85vw] max-w-[1100px] lg:-right-[12vw]" style={{ y: flowerY, scale: flowerScale }}>
        <motion.div animate={{ rotate: turns * 90 }} transition={{ duration: 1.1, ease }}>
          <Flower className="w-full text-violet/35" />
        </motion.div>
      </motion.div>

      {/* Coluna do carrossel com largura fixa: a palavra rotativa não pode espremê-la. */}
      <motion.div className="shell grid min-h-[100svh] items-center gap-12 pt-28 pb-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16" style={desktop ? { y: contentY, opacity: contentOpacity } : undefined}>
        <div className="min-w-0">
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }}>
            <Flower className="size-4 text-lime" />
            <span className="h-0.5 w-14 bg-lime" />
            <span className="label text-lime">Brasília · 2026 · @frame.techbr</span>
          </motion.div>

          {/* No desktop o corpo acompanha a coluna livre (100vw − margens − gap − carrossel) para "à programação" caber. */}
          <h1 className="display mt-8 text-[clamp(3.2rem,9.5vw,8.5rem)] lg:text-[clamp(4rem,calc((100vw-37rem)/6.8),7rem)]">
            {['Conectando', 'mulheres'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1, ease, delay: 0.1 + i * 0.1 }}>
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="flex items-baseline gap-[0.18em]" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1, ease, delay: 0.3 }}>
                <span className="connective text-rose">à</span>
                <RotatingWord />
              </motion.span>
            </span>
          </h1>

          <motion.p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.5 }}>
            Educação, comunidade, pesquisa e oportunidade para meninas e mulheres descobrirem, iniciarem e desenvolverem carreiras em STEM.
            <span className="text-rose"> Protagonismo feminino, sem exclusão.</span>
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.65 }}>
            <a href={links.whatsapp} className="group inline-flex items-center gap-3 rounded-frame bg-lime px-6 py-4 font-bold text-ink transition-transform hover:-translate-y-0.5">
              Quero participar
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#a-frame" className="inline-flex items-center gap-3 rounded-frame border-2 border-white/25 px-6 py-4 font-bold transition-colors hover:border-white">
              Conheça o projeto
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.4 }}>
          <HeroStories slides={heroSlides} />
        </motion.div>
      </motion.div>

      <div className="shell relative pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-white/15 pt-5">
          <NextEvent />
          <a href="#a-frame" className="label hidden items-center gap-2 text-white/50 hover:text-white sm:flex">
            Role para explorar
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              ↓
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  )
}
