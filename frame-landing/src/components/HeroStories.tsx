import { AnimatePresence, motion, useAnimationFrame, useMotionValue, type MotionValue } from 'motion/react'
import { useState } from 'react'
import type { HeroSlide } from '../data/content'
import type { Editoria } from '../data/editorias'
import { editorias } from '../data/editorias'
import { Media } from './Media'
import { ease } from '../motion'

const SLIDE_MS = 6500

// Bloco de leitura de cada editoria (combinação oficial de cores).
const block: Record<Editoria, { bg: string; title: string; accent: string; tone: 'violet' | 'plum' | 'magenta' | 'ink' }> = {
  evento: { bg: 'bg-plum', title: 'text-white', accent: 'text-rose', tone: 'plum' },
  dado: { bg: 'bg-ink border-t-2 border-magenta', title: 'text-white', accent: 'text-magenta', tone: 'magenta' },
  oportunidade: { bg: 'bg-lime', title: 'text-ink', accent: 'text-ink/70', tone: 'ink' },
  comunidade: { bg: 'bg-blush', title: 'text-ink', accent: 'text-violet', tone: 'violet' },
  educacao: { bg: 'bg-violet', title: 'text-white', accent: 'text-lime', tone: 'violet' },
}

function ProgressBar({ state, progress }: { state: 'done' | 'active' | 'todo'; progress: MotionValue<number> }) {
  return (
    <span className="h-0.5 flex-1 overflow-hidden bg-white/25">
      <motion.span
        className="block h-full origin-left bg-lime"
        style={{ scaleX: state === 'active' ? progress : state === 'done' ? 1 : 0 }}
      />
    </span>
  )
}

export function HeroStories({ slides, onChange }: { slides: HeroSlide[]; onChange?: (index: number) => void }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const progress = useMotionValue(0)

  const go = (to: number) => {
    const next = (to + slides.length) % slides.length
    progress.set(0)
    setIndex(next)
    onChange?.(next)
  }

  useAnimationFrame((_, delta) => {
    if (paused) return
    const p = progress.get() + delta / SLIDE_MS
    if (p >= 1) go(index + 1)
    else progress.set(p)
  })

  const slide = slides[index]
  const b = block[slide.editoria]

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destaques da Frame"
    >
      <div className="mb-3 flex gap-1.5" aria-hidden>
        {slides.map((_, i) => (
          <ProgressBar key={i} state={i < index ? 'done' : i === index ? 'active' : 'todo'} progress={progress} />
        ))}
      </div>

      <motion.div
        className="relative aspect-[4/5] cursor-grab touch-pan-y overflow-hidden rounded-frame bg-white/5 active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(index + 1)
          else if (info.offset.x > 60) go(index - 1)
        }}
      >
        <AnimatePresence initial={false}>
          <motion.article
            key={index}
            className="absolute inset-0 flex flex-col"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.9, ease }}
            aria-live="polite"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <motion.div className="size-full" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: SLIDE_MS / 1000 + 1, ease: 'linear' }}>
                <Media src={slide.image} video={slide.video} alt={slide.title} tone={b.tone} />
              </motion.div>
              <span className={`label absolute top-4 left-4 rounded-frame px-2.5 py-1.5 ${editorias[slide.editoria].chip}`}>{slide.label}</span>
            </div>

            <div className={`p-5 sm:p-6 ${b.bg}`}>
              {slide.stat && <p className={`display text-6xl ${b.accent}`}>{slide.stat}</p>}
              <h3 className={`headline mt-1 text-2xl sm:text-3xl ${b.title}`}>
                {slide.title}
                {slide.connective && <span className={`connective font-normal ${b.accent}`}> {slide.connective} </span>}
                {slide.tail}
              </h3>
              <p className={`mt-3 text-sm ${slide.editoria === 'oportunidade' || slide.editoria === 'comunidade' ? 'text-ink/70' : 'text-white/65'}`}>{slide.meta}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 flex items-center justify-between">
        <span className="label text-white/60 tabular-nums">
          <span className="text-lime">{String(index + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          <button onClick={() => go(index - 1)} className="flex size-10 items-center justify-center rounded-frame border border-white/20 transition-colors hover:border-lime hover:text-lime" aria-label="Destaque anterior">
            ←
          </button>
          <button onClick={() => go(index + 1)} className="flex size-10 items-center justify-center rounded-frame border border-white/20 transition-colors hover:border-lime hover:text-lime" aria-label="Próximo destaque">
            →
          </button>
        </div>
      </div>
    </div>
  )
}
