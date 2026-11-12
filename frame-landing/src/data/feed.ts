// API mock do feed. Para integrar com o backend real (CMS, Instagram Graph API…),
// mantenha a assinatura de fetchFeed/fetchNewer e troque a implementação.
import type { Editoria } from './editorias'
import { eventPhotos, portraits } from './media'

export type FeedItem = {
  id: string
  editoria: Editoria
  serie: number
  kicker: string
  title: string
  connective?: string
  tail?: string
  excerpt?: string
  date: string
  slides?: number
  stat?: string
  source?: string
  image?: string
  deadline?: string
  author?: string
}

type Template = Omit<FeedItem, 'id' | 'editoria' | 'serie' | 'date'>

const templates: Record<Editoria, Template[]> = {
  educacao: [
    { kicker: 'Série Primeiros Passos', title: 'Git sem medo', connective: 'para', tail: 'quem está começando', excerpt: 'Commit, branch e pull request explicados com exemplos do dia a dia.' },
    { kicker: 'Glossário Tech', title: 'O que é uma API', connective: 'e', tail: 'por que todo app usa', excerpt: 'Uma tradução direta, sem jargão, do conceito que conecta sistemas.' },
    { kicker: 'Trilha de carreira', title: 'Dados, front ou back?', excerpt: 'Três áreas de entrada comparadas: o que se faz, o que estudar e por onde começar.' },
    { kicker: 'Oficina em casa', title: 'Seu primeiro site', connective: 'em', tail: 'uma tarde', excerpt: 'HTML e CSS direto no navegador, sem instalar nada.' },
    { kicker: 'Série Primeiros Passos', title: 'Lógica de programação', connective: 'na', tail: 'prática', excerpt: 'Variáveis, condições e laços resolvendo problemas reais.' },
    { kicker: 'Ferramentas', title: 'Plataformas gratuitas', connective: 'para', tail: 'estudar código', excerpt: 'Curadoria da equipe com nível, idioma e carga horária de cada uma.' },
    { kicker: 'Glossário Tech', title: 'Inteligência artificial', connective: 'sem', tail: 'mistério', excerpt: 'O que modelos de linguagem fazem e o que eles não fazem.' },
    { kicker: 'Trilha de carreira', title: 'Portfólio', connective: 'do', tail: 'zero', excerpt: 'Como escolher projetos que mostram o que você sabe fazer.' },
  ],
  dado: [
    { kicker: 'Mercado de trabalho', stat: '20%', title: 'das vagas em tecnologia são ocupadas por mulheres' },
    { kicker: 'Formação', stat: '15%', title: 'das matrículas em cursos de computação são de mulheres' },
    { kicker: 'Panorama', stat: '1 em 4', title: 'profissionais de dados é mulher' },
    { kicker: 'Permanência', stat: '3x', title: 'mais chance de concluir a graduação com mentoria' },
    { kicker: 'Comunidade FRAME', stat: '38%', title: 'das participantes nunca tinham programado antes' },
  ],
  evento: [
    { kicker: 'Cobertura', title: 'Oficina de Python', connective: 'na', tail: 'universidade', excerpt: 'Sala cheia, código rodando e muita pergunta boa.' },
    { kicker: 'Cobertura', title: 'Semana da Mulher', connective: 'na', tail: 'Computação', excerpt: 'Três dias de palestras, mesa redonda e mão na massa.' },
    { kicker: 'Cobertura', title: 'Hackathon', connective: 'de', tail: 'impacto social', excerpt: 'Times mistos, 24 horas e protótipos para problemas reais.' },
    { kicker: 'Ação em escola', title: 'Palestra', connective: 'no', tail: 'ensino médio', excerpt: 'Carreiras em tecnologia apresentadas por quem trabalha nelas.' },
    { kicker: 'Bastidores', title: 'Encontro', connective: 'das', tail: 'voluntárias', excerpt: 'Planejamento do semestre e boas-vindas a quem chegou agora.' },
  ],
  oportunidade: [
    { kicker: 'Vagas abertas', title: 'Estágio', connective: 'em', tail: 'tecnologia', excerpt: 'Bolsa, mentoria e trilha de formação dentro de uma equipe real.' },
    { kicker: 'Bolsas', title: 'Bolsas de estudo', connective: 'para', tail: 'cursos de dados', excerpt: 'Formação online com certificado e acompanhamento.' },
    { kicker: 'Edital', title: 'Iniciação científica', connective: 'em', tail: 'computação', excerpt: 'Projetos de pesquisa com orientação e bolsa mensal.' },
    { kicker: 'Programa', title: 'Mentoria', connective: 'com', tail: 'profissionais da área', excerpt: 'Seis encontros individuais para planejar a sua entrada.' },
    { kicker: 'Chamada aberta', title: 'Palestrantes', connective: 'para', tail: 'o próximo ciclo', excerpt: 'Compartilhe o que você sabe com a comunidade.' },
  ],
  comunidade: [
    { kicker: 'Quem faz a Frame', title: 'Foi na primeira oficina que escrevi código sem medo de errar.', author: 'Participante · oficina de Python' },
    { kicker: 'Quem faz a Frame', title: 'Mentorar me lembrou por que eu escolhi essa área.', author: 'Mentora voluntária' },
    { kicker: 'Quem faz a Frame', title: 'Aqui eu encontrei gente que estava no mesmo ponto que eu.', author: 'Estudante de graduação' },
    { kicker: 'Aliados', title: 'Apoiar é ocupar menos espaço e abrir mais portas.', author: 'Palestrante convidado' },
  ],
}

// Educação é o maior volume de produção, então aparece mais.
const rhythm: Editoria[] = ['educacao', 'evento', 'dado', 'educacao', 'oportunidade', 'comunidade', 'educacao', 'evento', 'dado', 'oportunidade', 'educacao', 'comunidade']

const POOL_SIZE = 54
const DAY = 86_400_000

const shortDate = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

function build(editoria: Editoria, k: number, date: Date, serie: number, id: string): FeedItem {
  const list = templates[editoria]
  const t = list[k % list.length]
  return {
    ...t,
    id,
    editoria,
    serie,
    date: date.toISOString(),
    slides: editoria === 'educacao' ? 6 + (k % 5) : undefined,
    source: editoria === 'dado' ? 'Fonte: dado ilustrativo · substituir por instituição e ano' : undefined,
    image: editoria === 'evento' ? eventPhotos[k % eventPhotos.length] : editoria === 'comunidade' ? portraits[k % portraits.length] : undefined,
    deadline: editoria === 'oportunidade' ? shortDate(new Date(Date.now() + (5 + (k % 4) * 6) * DAY)) : undefined,
  }
}

const pool: FeedItem[] = (() => {
  const seq = Array.from({ length: POOL_SIZE }, (_, i) => rhythm[i % rhythm.length])
  const totals: Partial<Record<Editoria, number>> = {}
  seq.forEach((e) => (totals[e] = (totals[e] ?? 0) + 1))
  const seen: Partial<Record<Editoria, number>> = {}
  return seq.map((editoria, i) => {
    const k = seen[editoria] ?? 0
    seen[editoria] = k + 1
    const date = new Date(Date.now() - (i * 1.4 + 0.2) * DAY)
    return build(editoria, k, date, 20 + (totals[editoria] ?? 0) - k, `p-${i}`)
  })
})()

export type FeedFilter = Editoria | 'todos'
export type FeedPage = { items: FeedItem[]; nextCursor: number | null }

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchFeed({ cursor = 0, filter = 'todos', limit = 9 }: { cursor?: number; filter?: FeedFilter; limit?: number }): Promise<FeedPage> {
  await wait(550 + Math.random() * 450)
  const list = filter === 'todos' ? pool : pool.filter((p) => p.editoria === filter)
  const items = list.slice(cursor, cursor + limit)
  const next = cursor + limit
  return { items, nextCursor: next < list.length ? next : null }
}

let freshCount = 0

// Simula publicações novas chegando enquanto a página está aberta.
export async function fetchNewer(): Promise<FeedItem[]> {
  await wait(300)
  const picks: Editoria[] = ['educacao', 'oportunidade']
  return picks.map((e, j) => {
    freshCount += 1
    return build(e, freshCount + j + 3, new Date(), 40 + freshCount, `n-${Date.now()}-${j}`)
  })
}
