import { motion } from 'motion/react'
import { links } from '../data/content'
import { editorias } from '../data/editorias'
import type { FeedItem } from '../data/feed'
import { relativeTime } from '../hooks/useCountdown'
import { ease } from '../motion'
import { Flower, FlowerBand } from './Flower'
import { Media } from './Media'

function Title({ item, accent, className = '' }: { item: FeedItem; accent: string; className?: string }) {
  return (
    <p className={`headline ${className}`}>
      {item.title}
      {item.connective && <span className={`connective font-normal ${accent}`}> {item.connective} </span>}
      {item.tail}
    </p>
  )
}

// Capa: a peça como sai no Instagram, com a cor fixa da editoria.
function Cover({ item }: { item: FeedItem }) {
  switch (item.editoria) {
    case 'educacao':
      return (
        <div className="relative flex size-full flex-col justify-between overflow-hidden bg-violet p-6 text-white">
          <Flower className="absolute -right-12 -bottom-12 w-40 text-white/10" />
          <span className="label text-lime">{item.kicker}</span>
          <Title item={item} accent="text-rose" className="relative text-[1.75rem]" />
        </div>
      )
    case 'dado':
      return (
        <div className="flex size-full flex-col justify-between bg-ink p-6 text-white">
          <span className="label text-lime">{item.kicker}</span>
          <div>
            <p className="display text-7xl text-magenta">{item.stat}</p>
            <p className="mt-3 font-display text-lg leading-snug font-bold">{item.title}</p>
          </div>
        </div>
      )
    case 'evento':
      return (
        <div className="flex size-full flex-col bg-plum">
          <div className="min-h-0 flex-1 overflow-hidden">
            <Media src={item.image} alt={`${item.title} ${item.connective ?? ''} ${item.tail ?? ''}`} tone="plum" className="transition-transform duration-700 group-hover:scale-105" />
          </div>
          <FlowerBand count={16} className="px-4 py-3 text-rose/60" />
        </div>
      )
    case 'oportunidade':
      return (
        <div className="flex size-full flex-col justify-between bg-ink p-6">
          <span className="label text-lime">{item.kicker}</span>
          <div className="rounded-frame bg-lime p-5 text-ink">
            <Title item={item} accent="text-violet" className="text-3xl" />
          </div>
        </div>
      )
    case 'comunidade':
      return <Media src={item.image} alt={item.author ?? 'Retrato'} tone="violet" className="transition-transform duration-700 group-hover:scale-105" />
  }
}

const formatOf: Record<FeedItem['editoria'], (i: FeedItem) => string> = {
  educacao: (i) => `Carrossel · ${i.slides} telas`,
  dado: () => 'Dado',
  evento: () => 'Cobertura',
  oportunidade: (i) => `Inscrições até ${i.deadline}`,
  comunidade: () => 'Depoimento',
}

// Legenda: o que a capa não diz.
function Caption({ item }: { item: FeedItem }) {
  switch (item.editoria) {
    case 'educacao':
    case 'oportunidade':
      return <p className="line-clamp-3 text-ink/75">{item.excerpt}</p>
    case 'dado':
      return <p className="text-sm text-note">{item.source}</p>
    case 'evento':
      return (
        <>
          <Title item={item} accent="text-magenta" className="text-2xl" />
          <p className="mt-2 line-clamp-2 text-ink/75">{item.excerpt}</p>
        </>
      )
    case 'comunidade':
      return (
        <>
          <p className="font-display text-xl leading-snug font-bold">“{item.title}”</p>
          <p className="mt-2 text-sm text-note">{item.author}</p>
        </>
      )
  }
}

// Todo card tem a mesma anatomia: capa quadrada + editoria + legenda + data.
export function FeedCard({ item }: { item: FeedItem }) {
  const e = editorias[item.editoria]
  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-frame bg-white text-ink transition-transform duration-500 hover:-translate-y-1"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="aspect-[4/3] overflow-hidden sm:aspect-square">
        <Cover item={item} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="label flex items-center gap-2 text-[0.65rem]">
            <span className={`size-2.5 rounded-full ${e.dot}`} />
            {e.name} · Nº {item.serie}
          </span>
          <span className="text-xs font-semibold text-note">{formatOf[item.editoria](item)}</span>
        </div>
        <Caption item={item} />
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-xs text-note">
            <time dateTime={item.date}>{relativeTime(item.date)}</time>
            <a href={links.instagram} target="_blank" rel="noreferrer" className="font-bold text-violet hover:underline">
              Ver no Instagram →
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function FeedSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-frame bg-white" aria-hidden>
      <div className="aspect-[4/3] bg-ink/[0.06] sm:aspect-square" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-32 rounded-frame bg-ink/10" />
        <div className="h-5 w-4/5 rounded-frame bg-ink/10" />
        <div className="h-5 w-3/5 rounded-frame bg-ink/10" />
      </div>
    </div>
  )
}
