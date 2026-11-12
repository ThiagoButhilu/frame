import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchFeed, fetchNewer, type FeedFilter, type FeedItem } from '../data/feed'

const NEW_POSTS_AFTER_MS = 25_000

export function useInfiniteFeed() {
  const [filter, setFilterState] = useState<FeedFilter>('todos')
  const [items, setItems] = useState<FeedItem[]>([])
  const [cursor, setCursor] = useState<number | null>(0)
  const [loading, setLoading] = useState(false)
  const [updatedAt, setUpdatedAt] = useState(() => Date.now())
  const [incoming, setIncoming] = useState<FeedItem[]>([])
  const busy = useRef(false)
  const generation = useRef(0)

  const loadMore = useCallback(async () => {
    if (busy.current || cursor === null) return
    busy.current = true
    setLoading(true)
    const gen = generation.current
    const page = await fetchFeed({ cursor, filter })
    if (gen !== generation.current) return
    setItems((prev) => [...prev, ...page.items])
    setCursor(page.nextCursor)
    setUpdatedAt(Date.now())
    setLoading(false)
    busy.current = false
  }, [cursor, filter])

  // Troca de filtro: descarta respostas em voo e recomeça do topo.
  const setFilter = useCallback((next: FeedFilter) => {
    generation.current += 1
    busy.current = false
    setFilterState(next)
    setItems([])
    setCursor(0)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (items.length === 0 && cursor === 0) loadMore()
  }, [items.length, cursor, loadMore])

  // "Página viva": publicações novas aparecem como aviso, sem empurrar a leitura.
  const armed = filter === 'todos' && items.length > 0 && incoming.length === 0
  useEffect(() => {
    if (!armed) return
    let alive = true
    const t = setTimeout(async () => {
      const fresh = await fetchNewer()
      if (alive) setIncoming(fresh)
    }, NEW_POSTS_AFTER_MS)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [armed])

  const showIncoming = useCallback(() => {
    setItems((prev) => [...incoming, ...prev])
    setIncoming([])
    setUpdatedAt(Date.now())
  }, [incoming])

  return { filter, setFilter, items, loading, hasMore: cursor !== null, loadMore, updatedAt, incoming, showIncoming }
}

// `version` recria o observer após cada página: se o sentinela continuar visível,
// o callback inicial dispara de novo e o feed segue carregando.
export function useSentinel(onVisible: () => void, enabled: boolean, version: number) {
  const ref = useRef<HTMLDivElement>(null)
  const cb = useRef(onVisible)
  useEffect(() => {
    cb.current = onVisible
  })

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const io = new IntersectionObserver((entries) => entries[0].isIntersecting && cb.current(), { rootMargin: '0px 0px 800px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [enabled, version])

  return ref
}
