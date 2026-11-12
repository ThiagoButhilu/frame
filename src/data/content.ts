import type { Editoria } from './editorias'
import { photos, videos } from './media'

export const links = {
  whatsapp: '#participar', // TODO: link do grupo da comunidade
  instagram: 'https://www.instagram.com/frame.techbr/',
  email: 'mailto:contato@frame.tec.br', // TODO: confirmar e-mail oficial
}

export const nav = [
  { href: '#a-frame', label: 'A Frame' },
  { href: '#numeros', label: 'Números' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#feed', label: 'Feed' },
  { href: '#participar', label: 'Participe' },
]

export const TOTAL_SECTIONS = 6

export const heroWords = ['tecnologia', 'programação', 'pesquisa', 'liderança', 'inovação', 'ciência']

export type HeroSlide = {
  editoria: Editoria
  label: string
  title: string
  connective?: string
  tail?: string
  stat?: string
  meta: string
  image: string
  video?: string
}

export const heroSlides: HeroSlide[] = [
  {
    editoria: 'evento',
    label: 'Evento · Nº 07',
    title: 'Oficina de Python',
    connective: 'para',
    tail: 'iniciantes',
    meta: 'Sábado · Brasília · Vagas abertas',
    image: photos.workshop,
    video: videos.hero,
  },
  {
    editoria: 'dado',
    label: 'Pesquisa · Nº 03',
    stat: '20%',
    title: 'das vagas em tecnologia são ocupadas por mulheres',
    meta: 'Fonte: dado ilustrativo · substituir por instituição e ano',
    image: photos.laptop,
  },
  {
    editoria: 'oportunidade',
    label: 'Oportunidade · Nº 12',
    title: 'Estágio',
    connective: 'em',
    tail: 'tecnologia',
    meta: 'Bolsa + mentoria · Inscrições abertas',
    image: photos.team,
  },
  {
    editoria: 'comunidade',
    label: 'Comunidade · Nº 04',
    title: 'Rede de voluntárias',
    connective: 'e',
    tail: 'aliados',
    meta: 'Mentoras, palestrantes e parceiros',
    image: photos.meetup,
  },
]

export const frentes = [
  { n: '01', title: 'Educação', text: 'Cursos, oficinas, palestras e conteúdo.', bar: 'bg-violet' },
  { n: '02', title: 'Comunidade', text: 'Voluntariado, rede, parceiros, universidades e escolas.', bar: 'bg-rose' },
  { n: '03', title: 'Pesquisa', text: 'Dados, panoramas e produção de conhecimento.', bar: 'bg-magenta' },
  { n: '04', title: 'Oportunidade', text: 'Empregabilidade, editais e programas.', bar: 'bg-lime' },
]

export const isList = ['uma porta de entrada', 'um lugar onde se aprende de verdade', 'rigorosa com informação', 'jovem e organizada', 'aberta a aliados']
export const isNotList = ['clube fechado', 'discurso motivacional', 'marca cor-de-rosa', 'estética burocrática', 'startup genérica de tecnologia']

// Números ilustrativos: substituir pelos dados reais, sempre com fonte e ano.
export const stats = [
  { value: 1200, suffix: '+', unit: 'pessoas', label: 'alcançadas em ações presenciais' },
  { value: 48, unit: 'ações', label: 'entre oficinas, palestras e workshops' },
  { value: 15, unit: 'parceiras', label: 'escolas e universidades' },
  { value: 60, unit: 'pessoas', label: 'voluntárias, mentoras e aliados' },
]

export const pilares = [
  { title: 'Educação tecnológica', text: 'Cursos, oficinas, workshops, palestras, capacitações e conteúdo explicativo. O pilar de maior volume de produção.' },
  { title: 'Pertencimento e representatividade', text: 'Referências e espaços em que mulheres se enxergam dentro da tecnologia, por pessoas e histórias, nunca por adjetivo.' },
  { title: 'Liderança e protagonismo', text: 'Participação ativa, desenvolvimento profissional e criação de projetos próprios.' },
  { title: 'Pesquisa e inovação', text: 'Produção de conhecimento, tradução de pesquisa para linguagem acessível e experimentação técnica.' },
  { title: 'Impacto social', text: 'Tecnologia, educação e comunidade como ferramentas de transformação com resultado demonstrável.' },
]

const DAY = 86_400_000
const at = (days: number, hour: number) => {
  const d = new Date()
  d.setHours(hour, 0, 0, 0)
  return new Date(d.getTime() + days * DAY)
}

// Agenda calculada a partir de hoje para o protótipo estar sempre "no futuro".
export const events = [
  { date: at(3, 14), type: 'Oficina', title: 'Python', connective: 'para', tail: 'iniciantes', place: 'Brasília · local a confirmar', spots: 'Vagas abertas' },
  { date: at(9, 19), type: 'Palestra', title: 'Carreira', connective: 'em', tail: 'dados', place: 'Online · transmissão ao vivo', spots: 'Gratuito' },
  { date: at(16, 9), type: 'Ação em escola', title: 'Meninas', connective: 'no', tail: 'código', place: 'Escola pública · Brasília', spots: 'Turma fechada' },
  { date: at(24, 18), type: 'Meetup', title: 'Encontro', connective: 'da', tail: 'comunidade', place: 'Brasília · local a confirmar', spots: 'Vagas abertas' },
  { date: at(38, 9), type: 'Workshop', title: 'Git', connective: 'na', tail: 'prática', place: 'Universidade parceira', spots: 'Pré-inscrição' },
]

export const audiences = [
  {
    n: '01',
    who: 'Núcleo',
    title: 'Quero aprender',
    text: 'Ensino médio, graduação ou transição de carreira: oficinas, trilhas e uma rede pra não estudar sozinha.',
    cta: 'Entrar na comunidade',
    href: links.whatsapp,
    tone: 'bg-violet text-white',
  },
  {
    n: '02',
    who: 'Comunidade',
    title: 'Quero contribuir',
    text: 'Voluntariado, mentoria, palestra. Doe tempo e repertório para quem está começando.',
    cta: 'Ser voluntária ou aliado',
    href: links.whatsapp,
    tone: 'bg-plum text-white',
  },
  {
    n: '03',
    who: 'Instituições',
    title: 'Levar a Frame',
    text: 'Escolas, universidades e grupos de pesquisa que querem receber ações e oficinas.',
    cta: 'Agendar uma ação',
    href: links.email,
    tone: 'bg-magenta text-white',
  },
  {
    n: '04',
    who: 'Empresas',
    title: 'Quero apoiar',
    text: 'Patrocínio, empregabilidade e programas para quem busca talento e impacto.',
    cta: 'Falar com a Frame',
    href: links.email,
    tone: 'bg-lime text-ink',
  },
]
