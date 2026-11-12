// Placeholders. Troque pelas fotos reais da FRAME (pessoas em ação, sala cheia,
// detalhe de material). Qualquer URL que falhar cai no bloco de cor da marca.
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const photos = {
  workshop: unsplash('1573164713714-d95e436ab8d6'),
  laptop: unsplash('1573164574572-cb89e39749b4'),
  team: unsplash('1522071820081-009f0129c71c'),
  conference: unsplash('1540575467063-178a50c2df87'),
  speaker: unsplash('1544531586-fde5298cdd40'),
  meetup: unsplash('1515187029135-18ee286d815b'),
  students: unsplash('1523240795612-9a054b0db644'),
  collab: unsplash('1573165231977-3f0e27806045'),
  portraitA: unsplash('1573496359142-b8d87734a5a2', 800),
  portraitB: unsplash('1580489944761-15a19d654956', 800),
  portraitC: unsplash('1573497019940-1c28c88b4f3e', 800),
}

// Vídeos: deixe vazio para usar a foto. Coloque um .mp4 em /public e aponte aqui.
export const videos = {
  hero: '',
}

export const eventPhotos = [photos.workshop, photos.conference, photos.meetup, photos.speaker, photos.team, photos.students]
export const portraits = [photos.portraitA, photos.portraitB, photos.portraitC]
