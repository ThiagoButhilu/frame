import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { links, nav } from '../data/content'
import { Flower, FlowerBand } from './Flower'
import { Logo } from './Logo'
import { Reveal } from './Section'

// Chamada final: fundo preto, a única tela que pode centralizar.
export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink py-32 text-center sm:py-44">
      <motion.div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[120vw] max-w-[1200px] -translate-x-1/2 -translate-y-1/2" style={{ scale }}>
        <Flower className="w-full text-rose/[0.07]" />
      </motion.div>
      <div className="shell">
        <Reveal>
          <p className="label text-lime">Comunidade · Frame</p>
          <h2 className="display mx-auto mt-6 max-w-5xl text-[clamp(3rem,9vw,8rem)]">
            Faça parte <span className="connective text-magenta">do</span> Frame
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/75">Entre na comunidade e conecte-se a outras mulheres que estão transformando o mercado de tecnologia.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={links.whatsapp} className="group inline-flex items-center gap-3 rounded-frame bg-lime px-7 py-4 font-bold text-ink transition-transform hover:-translate-y-0.5">
              Entrar na comunidade <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href={links.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-frame border-2 border-white/25 px-7 py-4 font-bold transition-colors hover:border-white">
              @frame.techbr
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink pb-10">
      <FlowerBand count={80} className="border-y-2 border-white/10 px-4 py-4 text-violet" />
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-12 pt-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-5 max-w-sm text-white/60">Ajudar meninas e mulheres a descobrirem, iniciarem e desenvolverem carreiras em STEM.</p>
        </div>
        <div>
          <p className="label text-lime">Navegação</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-white/75 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-lime">Contato</p>
          <ul className="mt-5 space-y-2.5 text-white/75">
            <li>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                Instagram · @frame.techbr
              </a>
            </li>
            <li>
              <a href={links.email} className="hover:text-white">
                contato@frame.tec.br
              </a>
            </li>
            <li>Brasília · DF</li>
          </ul>
        </div>
      </div>
      <div className="shell mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45">
        <p>© 2026 Frame Mulheres &amp; Tech</p>
        <p className="flex items-center gap-2">
          <Flower className="size-3 text-lime" /> Protagonismo feminino sem exclusão
        </p>
      </div>
    </footer>
  )
}
