import { motion } from 'motion/react'
import { audiences } from '../data/content'
import { Flower } from './Flower'
import { Reveal, SectionHeader } from './Section'
import { ease } from '../motion'

export function Participate() {
  return (
    <section id="participar" className="bg-white py-24 text-ink sm:py-32">
      <div className="shell">
        <SectionHeader index={6} label="Participe" className="text-violet" />

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="headline text-[clamp(2.4rem,5vw,4.5rem)]">
            Tem lugar <span className="connective text-magenta">para</span> você aqui.
          </h2>
          <p className="text-lg text-ink/70">O propósito é centrado no protagonismo feminino. Homens e outras pessoas participam como aliados, parceiros, palestrantes e voluntários.</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <motion.a
              key={a.title}
              href={a.href}
              className={`group relative flex flex-col justify-between gap-12 overflow-hidden sm:min-h-[22rem] rounded-frame p-6 ${a.tone}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              whileHover="hover"
            >
              <motion.span className="pointer-events-none absolute -right-20 -bottom-20 w-40 opacity-20" variants={{ hover: { rotate: 45, scale: 1.1 } }} transition={{ duration: 0.6, ease }}>
                <Flower className="w-full" />
              </motion.span>
              <div className="relative flex items-center justify-between">
                <span className="label opacity-80">{a.who}</span>
                <span className="font-display text-lg font-extrabold tabular-nums opacity-80">{a.n}</span>
              </div>
              <div className="relative">
                <h3 className="headline text-4xl">{a.title}</h3>
                <p className="mt-3 opacity-85">{a.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-b-2 border-current pb-1 font-bold">
                  {a.cta}
                  <motion.span variants={{ hover: { x: 4 } }}>→</motion.span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
