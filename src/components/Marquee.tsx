import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { Fragment } from 'react'
import { Flower } from './Flower'

const words = ['Educação', 'Comunidade', 'Pesquisa', 'Oportunidade', 'Protagonismo feminino sem exclusão', 'Mão na tecnologia']

export function Marquee() {
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 })
  const skew = useTransform(velocity, [-2000, 0, 2000], [6, 0, -6], { clamp: true })

  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w) => (
        <Fragment key={w}>
          <span className="font-display text-3xl font-extrabold tracking-tight whitespace-nowrap sm:text-5xl">{w}</span>
          <Flower className="size-6 shrink-0 text-lime sm:size-8" />
        </Fragment>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden bg-violet py-5 sm:py-7" aria-label={words.join(' · ')}>
      <motion.div style={{ skewX: skew }} aria-hidden>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row}
          {row}
        </div>
      </motion.div>
    </div>
  )
}
