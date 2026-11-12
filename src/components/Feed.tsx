import { AnimatePresence, motion } from 'motion/react'
import { useRef } from 'react'
import { links } from '../data/content'
import { editoriaOrder, editorias } from '../data/editorias'
import type { FeedFilter, FeedItem } from '../data/feed'
import { relativeTime, useNow } from '../hooks/useCountdown'
import { useInfiniteFeed, useSentinel } from '../hooks/useInfiniteFeed'
import { ease } from '../motion'
import { FeedCard, FeedSkeleton } from './FeedCard'
import { Flower } from './Flower'
import { Reveal, SectionHeader } from './Section'

const filters: { id: FeedFilter; label: string; dot?: string }[] = [
  { id: 'todos', label: 'Tudo' },
  ...editoriaOrder.map((id) => ({ id, label: editorias[id].plural, dot: editorias[id].dot })),
]

const DAY = 86_400_000
const periods = [
  { label: 'Últimos 7 dias', maxDays: 7 },
  { label: 'Últimos 30 dias', maxDays: 30 },
  { label: 'Arquivo', maxDays: Infinity },
]

function byPeriod(items: FeedItem[], now: number) {
  const groups = periods.map((p) => ({ ...p, items: [] as FeedItem[] }))
  items.forEach((item) => {
    const days = (now - new Date(item.date).getTime()) / DAY
    groups.find((g) => days < g.maxDays)!.items.push(item)
  })
  return groups.filter((g) => g.items.length > 0)
}

const grid = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

function Skeletons() {
  return (
    <>
      <FeedSkeleton />
      <FeedSkeleton />
      <FeedSkeleton />
    </>
  )
}

export function Feed() {
  const { filter, setFilter, items, loading, hasMore, loadMore, updatedAt, incoming, showIncoming } = useInfiniteFeed()
  const sentinel = useSentinel(loadMore, hasMore, items.length)
  const now = useNow(30_000)
  const top = useRef<HTMLDivElement>(null)
  const groups = byPeriod(items, now)

  // Volta ao início do feed só se a leitura já passou dele.
  const backToTop = () => {
    if (top.current && top.current.getBoundingClientRect().top < 0) top.current.scrollIntoView({ behavior: 'smooth' })
  }

  const changeFilter = (f: FeedFilter) => {
    setFilter(f)
    backToTop()
  }

  const revealIncoming = () => {
    showIncoming()
    backToTop()
  }

  return (
    <section id="feed" className="relative bg-blush py-24 text-ink sm:py-32">
      <div className="shell">
        <SectionHeader index={5} label="Feed" className="text-violet" />

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="headline text-[clamp(2.4rem,5vw,4.5rem)]">
            O que está <span className="connective text-magenta">no</span> ar.
          </h2>
          <p className="text-lg text-ink/70">
            Séries educativas, dados de pesquisa, cobertura de eventos e oportunidades publicados em{' '}
            <a href={links.instagram} target="_blank" rel="noreferrer" className="font-bold text-violet underline-offset-4 hover:underline">
              @frame.techbr
            </a>
            . Cada editoria tem uma cor.
          </p>
        </Reveal>

        <div ref={top} className="scroll-mt-28" />

        {/* Barra fixa: filtros à esquerda, estado do feed à direita. */}
        <div className="sticky top-[var(--header-offset,4.5rem)] z-30 -mx-4 mt-12 transition-[top] duration-300 flex items-center gap-4 border-y-2 border-ink bg-blush/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:px-0">
          {/* No mobile a borda direita esmaece para indicar que os filtros rolam. */}
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [mask-image:linear-gradient(to_right,black_85%,transparent)] md:[mask-image:none]" role="tablist" aria-label="Filtrar por editoria">
            <div className="flex w-max gap-2">
              {filters.map((f) => {
                const active = filter === f.id
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => changeFilter(f.id)}
                    className={`relative flex items-center gap-2 rounded-frame px-3.5 py-2 text-sm font-bold transition-colors ${active ? 'text-white' : 'text-ink/70 hover:text-ink'}`}
                  >
                    {active && <motion.span layoutId="feed-filter" className="absolute inset-0 rounded-frame bg-ink" transition={{ duration: 0.4, ease }} />}
                    {f.dot && <span className={`relative size-2.5 rounded-full ${f.dot}`} />}
                    <span className="relative">{f.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {incoming.length > 0 ? (
              <motion.button
                key="incoming"
                onClick={revealIncoming}
                className="flex shrink-0 items-center gap-2 rounded-frame bg-violet px-3.5 py-2 text-sm font-bold text-white"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
              >
                <Flower className="size-3.5 text-lime" />
                {incoming.length} novas<span className="hidden sm:inline"> publicações</span> ↑
              </motion.button>
            ) : (
              <motion.span
                key="status"
                className="hidden shrink-0 items-center gap-2 text-sm text-ink/60 md:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-dark opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-lime-dark" />
                </span>
                Atualizado {relativeTime(updatedAt, now)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div aria-live="polite" aria-busy={loading}>
          {items.length === 0 && loading && (
            <div className={`mt-10 ${grid}`}>
              <Skeletons />
            </div>
          )}

          {groups.map((g, gi) => {
            const last = gi === groups.length - 1
            return (
              <div key={g.label} className="mt-12">
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-extrabold">{g.label}</h3>
                  <span className="label text-note tabular-nums">
                    {String(g.items.length).padStart(2, '0')} {g.items.length === 1 ? 'publicação' : 'publicações'}
                  </span>
                </div>
                <div className={grid}>
                  {g.items.map((item) => (
                    <FeedCard key={item.id} item={item} />
                  ))}
                  {last && loading && <Skeletons />}
                </div>
              </div>
            )
          })}
        </div>

        <div ref={sentinel} className="h-px" />

        {!hasMore && !loading && items.length > 0 && (
          <motion.div className="mt-16 flex flex-col items-start gap-5 border-t-2 border-ink pt-8 sm:flex-row sm:items-center sm:justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-display text-2xl font-extrabold">
              Você viu tudo · <span className="text-violet tabular-nums">{items.length}</span> publicações
            </p>
            <a href={links.instagram} target="_blank" rel="noreferrer" className="rounded-frame bg-ink px-5 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5">
              Seguir no Instagram →
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
