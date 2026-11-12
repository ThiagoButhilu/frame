import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { stats } from '../data/content'
import { Reveal, SectionHeader } from './Section'
import { ease } from '../motion'

const fmt = new Intl.NumberFormat('pt-BR')

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => fmt.format(Math.round(v)) + suffix)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 2, ease })
    return () => controls.stop()
  }, [inView, mv, value])

  return <motion.span ref={ref}>{text}</motion.span>
}

export function Stats() {
  return (
    <section id="numeros" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="shell">
        <SectionHeader index={2} label="Números" className="text-lime" />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <h2 className="headline text-[clamp(2.4rem,5vw,4.5rem)]">
              A marca conta <span className="connective text-rose">o que</span> produz.
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/70">Dado com fonte e ano. Nada de número solto para impressionar.</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="border-t-2 border-white/15 pt-5">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="display text-[clamp(2.5rem,6vw,5rem)] text-lime tabular-nums">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="font-display text-lg font-bold text-white/80">{s.unit}</span>
                </p>
                <p className="mt-2 text-white/70">{s.label}</p>
              </Reveal>
            ))}
            <p className="col-span-2 text-sm text-white/45">Números ilustrativos · substituir pelos dados reais, com fonte e ano.</p>
          </div>
        </div>

        {/* Peça de dado: magenta sobre preto, sempre com fonte e ano. */}
        <Reveal className="mt-24">
          <div className="grid items-end gap-8 rounded-frame border-2 border-magenta p-6 sm:p-10 lg:grid-cols-[auto_1fr]">
            <p className="display text-[clamp(6rem,18vw,14rem)] text-magenta">
              20<span className="font-display text-[0.45em] font-bold">%</span>
            </p>
            <div className="pb-4">
              <p className="label text-lime">Pesquisa · Nº 03</p>
              <p className="headline mt-4 text-[clamp(1.75rem,3.5vw,3rem)]">
                Só 20% das vagas <span className="connective text-rose">em</span> tecnologia são ocupadas por mulheres
              </p>
              <p className="mt-4 text-sm text-white/50">Fonte: dado ilustrativo do brandbook · substituir pelo dado real, com instituição e ano.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
