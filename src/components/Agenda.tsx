import { motion } from 'motion/react'
import { events, links } from '../data/content'
import { useCountdown } from '../hooks/useCountdown'
import { FlowerBand } from './Flower'
import { Reveal, SectionHeader } from './Section'
import { ease } from '../motion'

const day = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit' })
const month = (d: Date) => d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
const weekday = (d: Date) => d.toLocaleDateString('pt-BR', { weekday: 'long' })
const time = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

function Countdown({ date }: { date: Date }) {
  const c = useCountdown(date)
  const cells = [
    [String(c.days).padStart(2, '0'), 'dias'],
    [c.hours, 'horas'],
    [c.minutes, 'min'],
    [c.seconds, 'seg'],
  ]
  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-label={`Faltam ${c.days} dias e ${c.hours} horas`}>
      {cells.map(([v, l]) => (
        <div key={l} className="rounded-frame bg-ink/25 px-2 py-3">
          <p className="display text-4xl text-lime tabular-nums sm:text-5xl">{v}</p>
          <p className="label mt-2 text-[0.6rem] text-white/70">{l}</p>
        </div>
      ))}
    </div>
  )
}

export function Agenda() {
  const [next, ...rest] = events

  return (
    <section id="agenda" className="bg-ink py-24 sm:py-32">
      <div className="shell">
        <SectionHeader index={4} label="Agenda" className="text-lime" />

        <Reveal className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="headline text-[clamp(2.4rem,5vw,4.5rem)]">
            Mão <span className="connective text-rose">na</span> tecnologia.
          </h2>
          <p className="max-w-sm text-lg text-white/70">Oficinas, palestras, workshops e ações em escolas e universidades de Brasília.</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.35fr]">
          {/* Evento e cobertura: roxo profundo, faixa de flores. */}
          <Reveal>
            <article className="flex h-full flex-col justify-between gap-10 overflow-hidden rounded-frame bg-plum p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="label rounded-frame bg-lime px-2.5 py-1.5 text-ink">Próximo · {next.type}</span>
                  <span className="label text-rose">{weekday(next.date)}</span>
                </div>
                <h3 className="headline mt-8 text-5xl sm:text-6xl">
                  {next.title} <span className="connective text-rose">{next.connective}</span> {next.tail}
                </h3>
                <p className="mt-4 text-lg text-white/80">
                  {day(next.date)} {month(next.date)} · {time(next.date)} · {next.place}
                </p>
              </div>
              <div>
                <Countdown date={next.date} />
                <a href={links.whatsapp} className="mt-6 flex items-center justify-between rounded-frame bg-white px-5 py-4 font-bold text-ink transition-transform hover:-translate-y-0.5">
                  Garantir minha vaga <span>→</span>
                </a>
                <FlowerBand className="mt-8 text-rose/60" />
              </div>
            </article>
          </Reveal>

          <ul className="border-t-2 border-white/15">
            {rest.map((e, i) => (
              <motion.li
                key={e.title + e.tail}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              >
                <a href={links.whatsapp} className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-white/15 px-2 py-6 transition-colors hover:bg-white/[0.04] sm:grid-cols-[6rem_1fr_auto] sm:gap-6">
                  <div>
                    <p className="display text-5xl tabular-nums sm:text-6xl">{day(e.date)}</p>
                    <p className="label mt-1 text-lime">{month(e.date)}</p>
                  </div>
                  <div>
                    <p className="label text-rose">{e.type}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight font-extrabold sm:text-3xl">
                      {e.title} <span className="connective font-normal text-rose">{e.connective}</span> {e.tail}
                    </h3>
                    <p className="mt-1 text-white/60">
                      {time(e.date)} · {e.place} · <span className="text-white/80">{e.spots}</span>
                    </p>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-frame border border-white/20 text-lg transition-all group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    →
                  </span>
                </a>
              </motion.li>
            ))}
            <li className="px-2 pt-6 text-sm text-white/50">Agenda ilustrativa · datas calculadas a partir de hoje. Conecte ao calendário real.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
