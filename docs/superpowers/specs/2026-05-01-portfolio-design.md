# Portfolio Pessoal — arcenojackson.dev

**Data:** 2026-05-01
**Repo:** arcenojackson/arcenojackson
**Stack:** Astro + TailwindCSS + Vercel
**Status:** Aprovado — pronto para implementação

---

## Visão Geral

Site de portfólio pessoal de Jackson Arceno hospedado no mesmo repositório do perfil do GitHub (`arcenojackson/arcenojackson`). O README.md existente é preservado intocado. O site Astro convive no mesmo repo e é deployado via Vercel.

**Objetivo principal:** Apresentar projetos e autoridade técnica para potenciais clientes e parceiros de consultoria. Público secundário: comunidade dev e recrutadores.

**URL alvo:** `arcenojackson.dev` (ou subdomínio via Vercel)

---

## Estilo Visual

- **Tema:** Glassmorphism / Dark Luxury
- **Background base:** `#07050f` (quase preto com leve tom roxo)
- **Paleta primária:** Gradiente `#7c3aed` → `#2563eb` (roxo → azul)
- **Paleta de acento:** `#a78bfa` (lilás) e `#60a5fa` (azul claro)
- **Texto primário:** `#e2e8f0` | Secundário: `#94a3b8` | Muted: `#64748b`
- **Cards:** `background: rgba(255,255,255,0.02..0.04)` + `border: rgba(255,255,255,0.06..0.10)` + `border-radius: 16–20px`
- **Glow / sombra:** `box-shadow: 0 0 60px rgba(124,58,237,0.12)` nos cards principais
- **Blur:** `backdrop-filter: blur(12px)` na navbar e em elementos sobrepostos
- **Grade de fundo (hero):** Linhas finas com `rgba(167,139,250,0.03)` via `repeating-linear-gradient`
- **Radial glows:** Blobs roxo e azul posicionados no hero via `::before` / `::after`

---

## Logo / Identidade

Wordmark em lowercase no header:

```
arcenojackson
```

- `arceno` → `color: #fff` (peso 900)
- `jackson` → gradiente `#a78bfa` → `#60a5fa` via `background-clip: text`
- Font: `system-ui` / `font-weight: 900`

---

## Estrutura de Páginas

Site de **página única** (single-page scroll) com âncoras por seção.

### Ordem das seções

1. Navbar (sticky)
2. Hero
3. Sobre mim
4. Projetos
5. Skills
6. Contato
7. Footer

---

## Componentes por Seção

### Navbar

- Sticky, `backdrop-filter: blur(12px)`, borda inferior sutil `rgba(167,139,250,0.1)`
- Esquerda: wordmark `arcenojackson`
- Centro: links de âncora — Sobre · Projetos · Skills · Contato
- Direita: CTA button "Entrar em contato →" com gradiente roxo→azul
- Highlight automático da seção ativa via Intersection Observer

### Hero

Layout em grid 2 colunas (`1fr 1fr`), alinhado verticalmente ao centro.

**Coluna esquerda:**
- Título `<h1>`: "Jackson" (branco) + "Arceno" (gradiente roxo→azul→verde)
- Subtítulo: "Software Engineer · Backend · Full Stack"
- Descrição curta: ~2 linhas sobre o que faz
- Dois botões: "Ver projetos" (primary) e "Entrar em contato ↗" (outline)
- Ícones sociais: LinkedIn, GitHub, YouTube, X — em cards quadrados pequenos

**Coluna direita — Projeto em Destaque (MomentAI):**
- Card com bordas glassmorphism e glow roxo
- Badge "★ Em destaque" (gradiente, posição absoluta, canto superior esquerdo)
- Área de preview: background gradiente escuro + grid de linhas finas + ícone centralizado
- Body: label de categoria · título · descrição · tech tags (pills) · links (demo + github)

### Sobre mim

Grid `auto 1fr`:
- Esquerda: avatar quadrado arredondado (foto real quando disponível; emoji como fallback)
- Direita: título de seção + dois parágrafos de bio + 3 estatísticas numéricas
  - "5+ Anos de experiência"
  - "10+ Projetos entregues"
  - "3 Stacks principais"
- Números em gradiente roxo→azul, peso 800

### Projetos

Grid 2 colunas, 4 cards (além do MomentAI já exibido no hero):

| Projeto | Descrição | Stack |
|---|---|---|
| ArcLabz | Landing page de portfólio de serviços, foco em conversão | Astro, TypeScript, TailwindCSS |
| NOD System | Sistema para agências de marketing e social media | NestJS, React, PostgreSQL |
| App IPE | Gestão para a Igreja Presbiteriana do Estreito | React Native, Node.js, MongoDB |
| Church Hub | Plataforma de gestão para igrejas em geral | NestJS, React, Prisma |

Cada card contém:
- Área de preview colorida (imagem ou gradiente temático + ícone)
- Título + descrição + tech tags (pills)
- Links: "Ver projeto →" e "GitHub" (quando aplicável)

### Skills

Background levemente diferenciado (`rgba(167,139,250,0.02)`). Grid 4 colunas:

| Grupo | Itens |
|---|---|
| Backend | TypeScript/Node.js, NestJS/Express, Go, Rust, GraphQL/Apollo |
| Dados | PostgreSQL, MongoDB, Redis, Prisma ORM, Kafka/RabbitMQ |
| Infra & Cloud | Docker/Kubernetes, AWS, GitHub Actions, Linux, Vercel |
| Frontend | React/Next.js, Angular, Astro, Jest |

### Contato

Card centralizado, tom neutro (sem pitch de venda ou busca por emprego):

- Título: "Quer trocar uma ideia?"
- Subtítulo: "Pode me chamar por qualquer um dos canais abaixo. Respondo sempre que possível."
- Botão de email: `me@arcenojackson.dev` com gradiente roxo→azul
- Links sociais: LinkedIn · GitHub · YouTube · X/Twitter

### Footer

Linha divisória sutil + duas colunas:
- Esquerda: "© 2026 Jackson Arceno"
- Direita: "Feito com Astro + ♥"

---

## Arquitetura do Projeto Astro

```
arcenojackson/          ← raiz do repo (mantém README.md intocado)
├── README.md           ← perfil GitHub, não modificar
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── FeaturedProject.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   ├── ProjectCard.astro
│   │   ├── Skills.astro
│   │   └── Contact.astro
│   ├── layouts/
│   │   └── Base.astro      ← head, meta tags, fonte, scroll suave
│   ├── pages/
│   │   └── index.astro     ← composição das seções
│   └── styles/
│       └── global.css      ← variáveis CSS, reset, utilitários
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

**Dados dos projetos:** definidos em `src/data/projects.ts` como array de objetos tipados — não hardcoded nos componentes.

---

## Dados e Conteúdo

### Projeto em destaque (hero)

```ts
{
  id: 'momentai',
  title: 'MomentAI',
  category: 'IA · Redes Sociais',
  description: 'Geração automática de vídeos com IA prontos para compartilhamento em redes sociais.',
  tech: ['TypeScript', 'AI/ML', 'Node.js', 'FFmpeg'],
  demoUrl: '',   // preencher
  githubUrl: '', // preencher
}
```

### Grid de projetos

```ts
[
  {
    id: 'arclabz',
    title: 'ArcLabz',
    description: 'Landing page de portfólio de serviços — UI moderna e performática construída com foco em conversão.',
    tech: ['Astro', 'TypeScript', 'TailwindCSS'],
    demoUrl: '',
    githubUrl: null,
    gradient: 'from-[#0c1445] to-[#1a0533]',
  },
  {
    id: 'nod',
    title: 'NOD System',
    description: 'Sistema completo para agências de marketing e social media — gestão de clientes, demandas e entregas.',
    tech: ['NestJS', 'React', 'PostgreSQL'],
    demoUrl: '',
    githubUrl: '',
    gradient: 'from-[#052e16] to-[#083344]',
  },
  {
    id: 'app-ipe',
    title: 'App IPE',
    description: 'Aplicativo de gestão para a Igreja Presbiteriana do Estreito — membros, eventos e comunicações.',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    demoUrl: '',
    githubUrl: '',
    gradient: 'from-[#1e1b4b] to-[#312e81]',
  },
  {
    id: 'church-hub',
    title: 'Church Hub',
    description: 'Plataforma de gestão para igrejas em geral — solução escalável baseada no App IPE.',
    tech: ['NestJS', 'React', 'Prisma'],
    demoUrl: '',
    githubUrl: '',
    gradient: 'from-[#1e3a5f] to-[#1e1b4b]',
  },
]
```

---

## Links Sociais

| Plataforma | URL |
|---|---|
| LinkedIn | https://www.linkedin.com/in/arcenojackson/ |
| GitHub | https://github.com/arcenojackson |
| YouTube | https://youtube.com/@arcenojackson |
| X / Twitter | https://x.com/arcenojackson |
| Discord | https://discord.com/@jacksonfa.dev |
| Instagram | https://instagram.com/arcenojackson |

---

## Deploy

- **Plataforma:** Vercel
- **Build command:** `astro build`
- **Output dir:** `dist`
- **Root dir:** `/` (raiz do repo — o `astro.config.mjs` fica na raiz)
- O README.md não interfere no build do Astro

---

## Comportamentos e Animações

- Scroll suave entre seções (`scroll-behavior: smooth`)
- Navbar: highlight da seção ativa via Intersection Observer
- Hover nos cards de projeto: `border-color` → `rgba(167,139,250,0.3)` (transição 200ms)
- Radial glows no hero: estáticos (sem animação pesada)
- Mobile: grid de 2 colunas → 1 coluna; hero stacked (coluna direita vai abaixo)

---

## O Que Está Fora de Escopo

- Blog / artigos
- Dark/light mode toggle
- Formulário de contato (apenas links diretos)
- Internacionalização (pt-BR apenas)
- Animações de entrada complexas (scroll-triggered animations podem ser adicionadas depois)
