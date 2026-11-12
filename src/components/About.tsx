import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { frentes, isList, isNotList } from '../data/content'
import { photos } from '../data/media'
import { Flower, flowerMask } from './Flower'
import { Media } from './Media'
import { Reveal, SectionHeader } from './Section'

export function About() {
  const photoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="a-frame" className="bg-blush py-24 text-ink sm:py-32">
      <div className="shell">
        <SectionHeader index={1} label="A Frame" className="text-violet" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="headline text-[clamp(2.4rem,5.5vw,4.75rem)]">
                Uma iniciativa que abre caminhos <span className="connective text-magenta">dentro da</span> tecnologia.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[62ch] border-l-4 border-violet pl-5 text-xl leading-snug font-bold">
                A Frame atua na interseção entre tecnologia, educação, comunidade e impacto social.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink/80">
                <p>
                  Para que mais meninas e mulheres conheçam as possibilidades da área, desenvolvam competências, tenham acesso a experiências práticas, criem conexões e construam repertório profissional e acadêmico.
                </p>
                <p>
                  Presencialmente em Brasília, com palestras, oficinas, workshops e ações em escolas e universidades. No digital, com séries educativas, dados de pesquisa em linguagem acessível, panoramas de carreira e cobertura de eventos.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Máscara de foto: a flor recorta a imagem. */}
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div ref={photoRef} className="relative aspect-square w-full overflow-hidden" style={{ maskImage: flowerMask, WebkitMaskImage: flowerMask, maskSize: 'contain', WebkitMaskSize: 'contain' }}>
              <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y: imgY }}>
                <Media src={photos.collab} alt="Participantes em uma oficina da Frame" tone="violet" />
              </motion.div>
            </div>
            <p className="mt-4 text-sm text-note">Pessoas em ação · foto ilustrativa</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {frentes.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <article className="group relative flex h-full gap-5 overflow-hidden rounded-frame bg-white p-5 transition-transform duration-500 hover:-translate-y-1 sm:block sm:p-6">
                <span className={`absolute inset-x-0 top-0 h-1.5 origin-left scale-x-25 transition-transform duration-500 group-hover:scale-x-100 ${f.bar}`} />
                <span className="display shrink-0 pt-1 text-4xl text-violet sm:text-5xl">{f.n}</span>
                <div>
                  <h3 className="headline text-2xl sm:mt-6">{f.title}</h3>
                  <p className="mt-2 text-ink/70">{f.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t-2 border-ink pt-10 md:grid-cols-2">
          <Reveal>
            <p className="label text-violet">A Frame é</p>
            <ul className="mt-5">
              {isList.map((item) => (
                <li key={item} className="flex items-center gap-4 border-b border-ink/15 py-3.5 text-xl font-bold">
                  <Flower className="size-4 shrink-0 text-violet" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label text-magenta">A Frame não é</p>
            <ul className="mt-5">
              {isNotList.map((item) => (
                <li key={item} className="flex items-center gap-4 border-b border-ink/15 py-3.5 text-xl text-ink/45">
                  <span className="w-4 shrink-0 text-center font-bold text-magenta">×</span>
                  <span className="line-through decoration-magenta/60 decoration-2">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
