import { motion, type HTMLMotionProps } from 'motion/react'
import { TOTAL_SECTIONS } from '../data/content'
import { ease } from '../motion'

// Cabeçalho: rótulo à esquerda, contador à direita, régua de 2px abaixo.
export function SectionHeader({ index, label, className = '' }: { index: number; label: string; className?: string }) {
  const n = String(index).padStart(2, '0')
  return (
    <div className={`label flex items-center justify-between border-b-2 border-current pb-3 ${className}`}>
      <span>
        {n} · {label}
      </span>
      <span className="tabular-nums">
        {n} / {String(TOTAL_SECTIONS).padStart(2, '0')}
      </span>
    </div>
  )
}

export function Reveal({ delay = 0, y = 28, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...props}
    />
  )
}
