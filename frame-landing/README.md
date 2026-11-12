# Frame · Mulheres & Tech — Landing page

Vite + React 19 + Tailwind CSS 4 + Motion.

```bash
npm install
npm run dev
```

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy.yml` builda e publica a cada push na `main` (ou manualmente em Actions → "Deploy no GitHub Pages" → Run workflow). O caminho base é descoberto sozinho: funciona em `usuario.github.io/nome-do-repo/`, num repo `usuario.github.io` e com domínio próprio.

1. Crie um repositório no GitHub (ex.: `frame-landing`).
2. Na pasta do projeto:

   ```bash
   git init -b main
   git add .
   git commit -m "Landing page Frame Mulheres & Tech"
   git remote add origin git@github.com:USUARIO/frame-landing.git
   git push -u origin main
   ```

3. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Acompanhe em **Actions**. O endereço aparece no job `deploy` (ex.: `https://USUARIO.github.io/frame-landing/`).

Para testar localmente como no Pages:

```bash
npm run build -- --base=/frame-landing/
npm run preview -- --base=/frame-landing/
```

## Estrutura

| Seção | Componente | Destaque |
| --- | --- | --- |
| Header | `components/Header.tsx` | Barra de progresso de leitura, esconde ao rolar pra baixo, menu mobile |
| 01 Hero | `components/Hero.tsx`, `HeroStories.tsx` | Palavra rotativa, stories com autoplay/swipe, flor sangrada girando sem parar (com impulso de 45° a cada slide), contagem regressiva do próximo encontro |
| Faixa | `components/Marquee.tsx` | Marquee que inclina com a velocidade do scroll |
| 01 A Frame | `components/About.tsx` | Foto com máscara da flor, quatro frentes, "é / não é" |
| 02 Números | `components/Stats.tsx` | Contadores animados + peça de dado |
| 03 Pilares | `components/Pillars.tsx` | Título fixo, pilar ativo conforme o scroll |
| 04 Agenda | `components/Agenda.tsx` | Contagem regressiva e lista de eventos |
| 05 Feed | `components/Feed.tsx`, `FeedCard.tsx` | Scroll infinito agrupado por período, card padrão (capa + legenda), filtros e aviso de novas publicações na barra fixa |
| 06 Participe | `components/Participate.tsx` | Um card por público |
| Fecho | `components/Closing.tsx` | Chamada final + rodapé |

Os tokens do brandbook (cores, fontes, raio de 10px, rótulos) ficam em `src/index.css`.

## O que trocar antes de publicar

- **Logo**: `components/Logo.tsx` é um placeholder (flor + texto). Coloque o SVG oficial; o wordmark não deve ser redigitado.
- **Fotos e vídeo**: `src/data/media.ts`. São fotos do Unsplash; qualquer URL que falhar vira um bloco de cor da marca. Para usar vídeo no hero, coloque um `.mp4` em `public/` e preencha `videos.hero`.
- **Textos, links e números**: `src/data/content.ts` (link do WhatsApp, e-mail, estatísticas, agenda). Números e dados estão marcados como ilustrativos; o brandbook exige fonte e ano.
- **Feed**: `src/data/feed.ts` é uma API mock (54 posts, páginas de 9, novas publicações a cada 25s). Para integrar com CMS ou Instagram, mantenha as assinaturas de `fetchFeed` e `fetchNewer`.
- **Agenda**: as datas são calculadas a partir de hoje para o protótipo estar sempre no futuro. Ligue ao calendário real.
