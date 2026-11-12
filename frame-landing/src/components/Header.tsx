import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { links, nav } from '../data/content'
import { Flower } from './Flower'
import { Logo } from './Logo'
import { ease } from '../motion'

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 600 && y > prev)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  // Elementos sticky (ex.: filtros do feed) encostam no header quando ele aparece.
  useEffect(() => {
    document.documentElement.style.setProperty('--header-offset', hidden && !open ? '0px' : '4.5rem')
  }, [hidden, open])

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime" style={{ scaleX: progress }} />

      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? 'bg-ink/90 backdrop-blur-md' : ''}`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="shell flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {nav.map((item, i) => (
              <a key={item.href} href={item.href} className="group flex items-baseline gap-1.5 rounded-frame px-3 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
                <span className="text-[0.65rem] text-lime tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            ))}
            <a href={links.whatsapp} className="ml-3 rounded-frame bg-lime px-4 py-2.5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5">
              Participar
            </a>
          </nav>

          <button
            className="flex size-11 items-center justify-center rounded-frame border border-white/20 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4, ease }}>
              <Flower className="size-5 text-lime" />
            </motion.span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-4 pt-24 pb-8 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <nav className="flex flex-col" aria-label="Menu">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/15 py-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                >
                  <span className="label text-lime tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="headline text-4xl">{item.label}</span>
                </motion.a>
              ))}
            </nav>
            <a href={links.whatsapp} onClick={() => setOpen(false)} className="rounded-frame bg-lime px-5 py-4 text-center font-bold text-ink">
              Quero participar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
