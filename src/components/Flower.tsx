// Quatro pétalas em cruz em volta de um quadro vazio. Nunca redesenhar.
export const FLOWER_PATH = 'M24 24A24 24 0 0 1 72 24A24 24 0 0 1 72 72A24 24 0 0 1 24 72A24 24 0 0 1 24 24ZM34 34V62H62V34Z'

export const flowerMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><path d='${FLOWER_PATH}'/></svg>`,
)}")`

export function Flower({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path fill="currentColor" d={FLOWER_PATH} />
    </svg>
  )
}

// Faixa: régua de flores em uma cor só.
export function FlowerBand({ count = 24, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Flower key={i} className="size-4 shrink-0" />
      ))}
    </div>
  )
}
