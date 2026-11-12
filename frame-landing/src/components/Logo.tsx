import { Flower } from './Flower'

// Placeholder da assinatura. Substituir pelo SVG oficial (o wordmark não deve
// ser redigitado em outra fonte).
export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#inicio" className={`group flex items-center gap-2.5 ${className}`} aria-label="Frame Mulheres & Tech, início">
      <Flower className="size-7 text-lime transition-transform duration-500 group-hover:rotate-45" />
      <span className="flex flex-col">
        <span className="font-display text-xl leading-none font-extrabold tracking-tight">Frame</span>
        <span className="mt-0.5 text-[0.62rem] leading-none font-bold tracking-[0.14em] text-rose uppercase">Mulheres &amp; Tech</span>
      </span>
    </a>
  )
}
