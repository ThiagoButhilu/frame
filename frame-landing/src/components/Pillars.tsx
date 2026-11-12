import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { pilares } from '../data/content'
import { Flower } from './Flower'
import { SectionHeader } from './Section'
import { ease } from '../motion'

function Pillar({ n, title, text, active, onActive }: { n: number; title: string; text: string; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  return (
    <li ref={ref} className="relative grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ink/15 py-10 sm:grid-cols-[7rem_1fr]">
      <motion.span className="absolute top-0 left-0 h-0.5 bg-violet" initial={false} animate={{ width: active ? '100%' : '0%' }} transition={{ duration: 0.8, ease }} />
      <span className={`display text-6xl transition-colors duration-500 sm:text-8xl ${active ? 'text-violet' : 'text-ink/15'}`}>{String(n).padStart(2, '0')}</span>
      <div className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}>
        <h3 className="font-display text-2xl leading-tight font-extrabold sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-[55ch] text-lg text-ink/75">{text}</p>
      </div>
    </li>
  )
}

export function Pillars() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-white py-24 text-ink sm:py-32">
      <div className="shell">
        <SectionHeader index={3} label="Pilares" className="text-violet" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="headline text-[clamp(2.4rem,5vw,4.5rem)]">
              Cinco pilares organizam tudo <span className="connective text-magenta">que a</span> Frame publica.
            </h2>
            <div className="mt-8 rounded-frame bg-plum p-6 text-white">
              <p className="label flex items-center gap-2 text-lime">
                <Flower className="size-3.5" /> Regra de produção
              </p>
              <p className="mt-3 text-lg leading-snug">Toda peça se conecta a pelo menos um pilar. Se não se conecta a nenhum, não é Frame.</p>
            </div>
            <p className="mt-6 hidden font-display text-lg font-bold text-ink/50 tabular-nums lg:block">
              <span className="text-violet">{String(active + 1).padStart(2, '0')}</span> / 05
            </p>
          </div>

          <ol>
            {pilares.map((p, i) => (
              <Pillar key={p.title} n={i + 1} title={p.title} text={p.text} active={active === i} onActive={() => setActive(i)} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
