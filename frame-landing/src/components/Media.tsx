import { useState } from 'react'
import { Flower } from './Flower'

const toneBg = {
  violet: 'bg-violet',
  plum: 'bg-plum',
  magenta: 'bg-magenta',
  ink: 'bg-ink',
}

type Props = {
  src?: string
  video?: string
  alt: string
  className?: string
  tone?: keyof typeof toneBg
}

// Vídeo > foto > bloco de cor da marca (quando a mídia ainda não existe ou falha).
export function Media({ src, video, alt, className = '', tone = 'plum' }: Props) {
  const [failed, setFailed] = useState(false)

  if (video) {
    return <video className={`size-full object-cover ${className}`} src={video} poster={src} autoPlay muted loop playsInline aria-label={alt} />
  }

  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className={`relative flex size-full items-end overflow-hidden ${toneBg[tone]} ${className}`}>
        <Flower className="absolute -top-1/4 -right-1/4 w-[85%] text-white/10" />
        <span className="label relative m-4 text-white/70">Imagem em breve</span>
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} onError={() => setFailed(true)} className={`size-full object-cover ${className}`} />
}
