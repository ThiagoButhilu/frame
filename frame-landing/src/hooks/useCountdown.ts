import { useEffect, useState } from 'react'

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return now
}

export function useCountdown(target: Date) {
  const now = useNow()
  const diff = Math.max(0, target.getTime() - now)
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    days: Math.floor(diff / 86_400_000),
    hours: pad(Math.floor(diff / 3_600_000) % 24),
    minutes: pad(Math.floor(diff / 60_000) % 60),
    seconds: pad(Math.floor(diff / 1000) % 60),
  }
}

const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })

export function relativeTime(iso: string | number, now = Date.now()) {
  const sec = Math.round((new Date(iso).getTime() - now) / 1000)
  const abs = Math.abs(sec)
  if (abs < 45) return 'agora'
  if (abs < 3600) return rtf.format(Math.round(sec / 60), 'minute')
  if (abs < 86_400) return rtf.format(Math.round(sec / 3600), 'hour')
  if (abs < 86_400 * 30) return rtf.format(Math.round(sec / 86_400), 'day')
  return rtf.format(Math.round(sec / (86_400 * 30)), 'month')
}
