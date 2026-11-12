// Código de conteúdo: cada editoria tem uma cor fixa de destaque.
export type Editoria = 'educacao' | 'dado' | 'evento' | 'oportunidade' | 'comunidade'

export const editorias: Record<
  Editoria,
  { name: string; plural: string; chip: string; dot: string }
> = {
  educacao: { name: 'Educação', plural: 'Educação', chip: 'bg-violet text-white', dot: 'bg-violet' },
  dado: { name: 'Pesquisa', plural: 'Dados', chip: 'bg-magenta text-white', dot: 'bg-magenta' },
  evento: { name: 'Evento', plural: 'Eventos', chip: 'bg-lime text-ink', dot: 'bg-plum' },
  oportunidade: { name: 'Oportunidade', plural: 'Oportunidades', chip: 'bg-lime text-ink', dot: 'bg-lime' },
  comunidade: { name: 'Comunidade', plural: 'Comunidade', chip: 'bg-rose text-ink', dot: 'bg-rose' },
}

export const editoriaOrder: Editoria[] = ['educacao', 'dado', 'evento', 'oportunidade', 'comunidade']
