# Portfolio Pessoal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site de portfólio pessoal de Jackson Arceno em Astro + TailwindCSS, deployado na Vercel, convivendo no mesmo repo que o README.md do perfil GitHub.

**Architecture:** Site de página única (single-page scroll) com sete seções. Cada seção é um componente `.astro` isolado. Os dados de projetos e links sociais vivem em `src/data/` como TypeScript tipado — nenhum conteúdo hardcoded nos componentes. A navbar destaca a seção ativa via Intersection Observer no cliente.

**Tech Stack:** Astro 5, @astrojs/tailwind, TailwindCSS 3, TypeScript (strict), Vercel (zero-config)

---

## Mapa de Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `package.json` | Deps e scripts do projeto |
| `astro.config.mjs` | Config do Astro + integração TailwindCSS |
| `tailwind.config.mjs` | Config do Tailwind (content paths) |
| `tsconfig.json` | TypeScript strict + path alias `@/*` |
| `.gitignore` | Adiciona `dist/`, `.astro/`, `.superpowers/` |
| `public/favicon.svg` | Ícone do site |
| `src/styles/global.css` | Reset, variáveis CSS, Tailwind directives |
| `src/layouts/Base.astro` | Shell HTML, head, meta tags, importa global.css |
| `src/data/projects.ts` | Tipos + dados de todos os projetos |
| `src/data/social.ts` | Tipos + dados dos links sociais |
| `src/components/Navbar.astro` | Navbar sticky com wordmark e active link via JS |
| `src/components/FeaturedProject.astro` | Card glassmorphism do MomentAI (usado no Hero) |
| `src/components/Hero.astro` | Grid 2col: copy left + FeaturedProject right |
| `src/components/About.astro` | Avatar + bio + 3 estatísticas |
| `src/components/ProjectCard.astro` | Card individual de projeto (recebe Project como prop) |
| `src/components/Projects.astro` | Seção com grid 2col de ProjectCards |
| `src/components/Skills.astro` | Grid 4col de grupos de skills |
| `src/components/Contact.astro` | Card de contato + footer |
| `src/pages/index.astro` | Compõe todos os componentes em ordem |

---

## Task 1: Bootstrap do projeto Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Modify: `.gitignore` (criar se não existir)

- [ ] **Step 1: Criar package.json**

```json
{
  "name": "arcenojackson-portfolio",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/tailwind": "^5.1.4",
    "astro": "^5.7.0",
    "tailwindcss": "^3.4.17"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}
```

- [ ] **Step 2: Criar astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://arcenojackson.dev',
});
```

- [ ] **Step 3: Criar tailwind.config.mjs**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- [ ] **Step 4: Criar tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 5: Criar/atualizar .gitignore**

Adicione as linhas abaixo ao `.gitignore` (crie o arquivo se não existir):

```
# Astro
dist/
.astro/
node_modules/

# Brainstorming sessions
.superpowers/
```

- [ ] **Step 6: Instalar dependências**

```bash
npm install
```

Esperado: `node_modules/` criado, sem erros.

- [ ] **Step 7: Verificar que o Astro CLI está acessível**

```bash
npx astro --version
```

Esperado: imprime a versão do Astro (ex: `5.7.x`).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs tsconfig.json .gitignore
git commit -m "chore: bootstrap Astro + TailwindCSS project"
```

---

## Task 2: Base layout + estilos globais + favicon

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Base.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Criar src/styles/global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #07050f;
  --primary: #a78bfa;
  --accent: #60a5fa;
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --gradient-cta: linear-gradient(135deg, #7c3aed, #2563eb);
  --gradient-wordmark: linear-gradient(135deg, #a78bfa, #60a5fa);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background: var(--bg);
  color: var(--text);
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 100vh;
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.section-sub {
  font-size: 15px;
  color: var(--text-dim);
  margin-bottom: 48px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.2), transparent);
  margin: 0 48px;
}

.tag {
  background: rgba(167, 139, 250, 0.08);
  border: 1px solid rgba(167, 139, 250, 0.15);
  color: var(--primary);
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 100px;
  white-space: nowrap;
}

.btn-primary {
  background: var(--gradient-cta);
  color: #fff;
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.35);
  transition: opacity 0.2s;
}

.btn-primary:hover { opacity: 0.9; }

.btn-outline {
  color: var(--primary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid rgba(167, 139, 250, 0.25);
  padding: 12px 24px;
  border-radius: 10px;
  display: inline-block;
  transition: border-color 0.2s;
}

.btn-outline:hover { border-color: rgba(167, 139, 250, 0.5); }

.link-demo {
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
}

.link-demo:hover { background: rgba(124, 58, 237, 0.25); }

.link-github {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s;
}

.link-github:hover { border-color: rgba(255, 255, 255, 0.2); }
```

- [ ] **Step 2: Criar src/layouts/Base.astro**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Jackson Arceno — Software Engineer',
  description = 'Portfolio pessoal de Jackson Arceno, Software Engineer especializado em backend, TypeScript, Go e Rust.',
} = Astro.props;
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#07050f" />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Criar public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="white">JA</text>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
</svg>
```

- [ ] **Step 4: Criar src/pages/index.astro mínimo para testar o build**

```astro
---
import Base from '@/layouts/Base.astro';
---

<Base>
  <p style="color: white; padding: 2rem;">Bootstrap OK</p>
</Base>
```

- [ ] **Step 5: Verificar que o build passa**

```bash
npm run build
```

Esperado: sem erros, pasta `dist/` criada.

- [ ] **Step 6: Commit**

```bash
git add src/ public/ 
git commit -m "feat: add base layout, global styles and favicon"
```

---

## Task 3: Camada de dados

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/social.ts`

- [ ] **Step 1: Criar src/data/projects.ts**

```ts
export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string | null;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
}

export const featuredProject: FeaturedProject = {
  id: 'momentai',
  title: 'MomentAI',
  category: 'IA · Redes Sociais',
  description: 'Geração automática de vídeos com IA prontos para compartilhamento em redes sociais.',
  tech: ['TypeScript', 'AI/ML', 'Node.js', 'FFmpeg'],
  demoUrl: '',
  githubUrl: '',
  icon: '🎬',
};

export const projects: Project[] = [
  {
    id: 'arclabz',
    title: 'ArcLabz',
    description: 'Landing page de portfólio de serviços — UI moderna e performática construída com foco em conversão.',
    tech: ['Astro', 'TypeScript', 'TailwindCSS'],
    demoUrl: '',
    githubUrl: null,
    gradientFrom: '#0c1445',
    gradientTo: '#1a0533',
    icon: '🏢',
  },
  {
    id: 'nod',
    title: 'NOD System',
    description: 'Sistema completo para agências de marketing e social media — gestão de clientes, demandas e entregas.',
    tech: ['NestJS', 'React', 'PostgreSQL'],
    demoUrl: '',
    githubUrl: '',
    gradientFrom: '#052e16',
    gradientTo: '#083344',
    icon: '📊',
  },
  {
    id: 'app-ipe',
    title: 'App IPE',
    description: 'Aplicativo de gestão para a Igreja Presbiteriana do Estreito — membros, eventos e comunicações.',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    demoUrl: '',
    githubUrl: '',
    gradientFrom: '#1e1b4b',
    gradientTo: '#312e81',
    icon: '⛪',
  },
  {
    id: 'church-hub',
    title: 'Church Hub',
    description: 'Plataforma de gestão para igrejas em geral — solução escalável baseada no App IPE.',
    tech: ['NestJS', 'React', 'Prisma'],
    demoUrl: '',
    githubUrl: '',
    gradientFrom: '#1e3a5f',
    gradientTo: '#1e1b4b',
    icon: '🌐',
  },
];
```

- [ ] **Step 2: Criar src/data/social.ts**

```ts
export interface SocialLink {
  label: string;
  shortLabel: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    shortLabel: 'in',
    url: 'https://www.linkedin.com/in/arcenojackson/',
  },
  {
    label: 'GitHub',
    shortLabel: 'gh',
    url: 'https://github.com/arcenojackson',
  },
  {
    label: 'YouTube',
    shortLabel: 'yt',
    url: 'https://youtube.com/@arcenojackson',
  },
  {
    label: 'X / Twitter',
    shortLabel: 'x',
    url: 'https://x.com/arcenojackson',
  },
];

export const contactLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    shortLabel: 'LinkedIn',
    url: 'https://www.linkedin.com/in/arcenojackson/',
  },
  {
    label: 'GitHub',
    shortLabel: 'GitHub',
    url: 'https://github.com/arcenojackson',
  },
  {
    label: 'YouTube',
    shortLabel: 'YouTube',
    url: 'https://youtube.com/@arcenojackson',
  },
  {
    label: 'X / Twitter',
    shortLabel: 'X / Twitter',
    url: 'https://x.com/arcenojackson',
  },
];
```

- [ ] **Step 3: Verificar que TypeScript compila sem erros**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add typed project and social data"
```

---

## Task 4: Navbar

**Files:**
- Create: `src/components/Navbar.astro`

- [ ] **Step 1: Criar src/components/Navbar.astro**

```astro
---
// Navbar recebe nenhuma prop — dados são estáticos
const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#skills', label: 'Skills' },
  { href: '#contato', label: 'Contato' },
];
---

<header>
  <nav>
    <a href="/" class="wordmark" aria-label="arcenojackson — home">
      <span class="wordmark-first">arceno</span><span class="wordmark-last">jackson</span>
    </a>

    <ul class="nav-links" role="list">
      {navLinks.map(({ href, label }) => (
        <li>
          <a href={href} class="nav-link" data-section={href.slice(1)}>
            {label}
          </a>
        </li>
      ))}
    </ul>

    <a href="#contato" class="btn-primary nav-cta">Entrar em contato →</a>
  </nav>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(167, 139, 250, 0.1);
    background: rgba(7, 5, 15, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 48px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .wordmark {
    font-weight: 900;
    font-size: 18px;
    letter-spacing: -0.5px;
    text-decoration: none;
    font-family: system-ui;
  }

  .wordmark-first { color: #fff; }

  .wordmark-last {
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .nav-link {
    color: var(--text-muted);
    font-size: 14px;
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--primary);
  }

  .nav-cta {
    font-size: 13px;
    padding: 8px 20px;
  }

  @media (max-width: 768px) {
    nav { padding: 14px 20px; }
    .nav-links { display: none; }
    .nav-cta { font-size: 12px; padding: 8px 14px; }
  }
</style>

<script>
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector<HTMLAnchorElement>(
            `.nav-link[data-section="${entry.target.id}"]`
          );
          active?.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
</script>
```

- [ ] **Step 2: Adicionar Navbar ao index.astro e verificar build**

Atualizar `src/pages/index.astro`:

```astro
---
import Base from '@/layouts/Base.astro';
import Navbar from '@/components/Navbar.astro';
---

<Base>
  <Navbar />
  <section id="sobre" style="min-height: 100vh; padding: 2rem; color: white;">Sobre</section>
  <section id="projetos" style="min-height: 100vh; padding: 2rem; color: white;">Projetos</section>
  <section id="skills" style="min-height: 100vh; padding: 2rem; color: white;">Skills</section>
  <section id="contato" style="min-height: 100vh; padding: 2rem; color: white;">Contato</section>
</Base>
```

```bash
npm run build
```

Esperado: build sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.astro src/pages/index.astro
git commit -m "feat: add sticky navbar with active section highlight"
```

---

## Task 5: FeaturedProject + Hero

**Files:**
- Create: `src/components/FeaturedProject.astro`
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Criar src/components/FeaturedProject.astro**

```astro
---
import type { FeaturedProject } from '@/data/projects';

interface Props {
  project: FeaturedProject;
}

const { project } = Astro.props;
---

<div class="featured-card">
  <span class="featured-badge">★ Em destaque</span>

  <div class="featured-preview">
    <div class="preview-grid" aria-hidden="true"></div>
    <div class="preview-icon">{project.icon}</div>
  </div>

  <div class="featured-body">
    <p class="featured-category">{project.category}</p>
    <h3 class="featured-title">{project.title}</h3>
    <p class="featured-desc">{project.description}</p>

    <div class="featured-tags">
      {project.tech.map((t) => <span class="tag">{t}</span>)}
    </div>

    <div class="featured-links">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener" class="link-demo">
          Ver demo →
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener" class="link-github">
          GitHub
        </a>
      )}
    </div>
  </div>
</div>

<style>
  .featured-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(167, 139, 250, 0.2);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow:
      0 0 60px rgba(124, 58, 237, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .featured-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: linear-gradient(135deg, #7c3aed, #2563eb);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 100px;
    z-index: 2;
  }

  .featured-preview {
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, #1a0533, #0c1445, #050d2b);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .preview-grid {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(167, 139, 250, 0.03) 40px,
        rgba(167, 139, 250, 0.03) 41px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 40px,
        rgba(167, 139, 250, 0.03) 40px,
        rgba(167, 139, 250, 0.03) 41px
      );
  }

  .preview-icon {
    font-size: 40px;
    width: 72px;
    height: 72px;
    border-radius: 16px;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 40px rgba(124, 58, 237, 0.4);
    position: relative;
    z-index: 1;
  }

  .featured-body {
    padding: 20px 24px 24px;
  }

  .featured-category {
    font-size: 10px;
    color: var(--primary);
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .featured-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text);
  }

  .featured-desc {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .featured-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .featured-links {
    display: flex;
    gap: 10px;
  }
</style>
```

- [ ] **Step 2: Criar src/components/Hero.astro**

```astro
---
import FeaturedProject from './FeaturedProject.astro';
import { featuredProject } from '@/data/projects';
import { socialLinks } from '@/data/social';
---

<section class="hero" id="hero">
  <div class="hero-glow-left" aria-hidden="true"></div>
  <div class="hero-glow-right" aria-hidden="true"></div>

  <div class="hero-copy">
    <h1 class="hero-title">
      Jackson<br /><span class="hero-name-gradient">Arceno</span>
    </h1>
    <p class="hero-role">Software Engineer · Backend · Full Stack</p>
    <p class="hero-desc">
      Construo sistemas escaláveis, produtos digitais e soluções sob medida —
      do backend ao deploy. Mais de 5 anos entregando software que funciona de verdade.
    </p>
    <div class="hero-actions">
      <a href="#projetos" class="btn-primary">Ver projetos</a>
      <a href="#contato" class="btn-outline">Entrar em contato ↗</a>
    </div>
    <div class="hero-social">
      {socialLinks.map((link) => (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon"
          aria-label={link.label}
        >
          {link.shortLabel}
        </a>
      ))}
    </div>
  </div>

  <div class="hero-featured">
    <FeaturedProject project={featuredProject} />
  </div>
</section>

<style>
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    padding: 80px 48px;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .hero-glow-left {
    position: absolute;
    top: -100px;
    left: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-glow-right {
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-copy {
    position: relative;
    z-index: 1;
  }

  .hero-title {
    font-size: clamp(40px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1.5px;
    margin-bottom: 12px;
    color: var(--text);
  }

  .hero-name-gradient {
    background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-role {
    font-size: 18px;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .hero-desc {
    font-size: 15px;
    color: var(--text-dim);
    line-height: 1.7;
    max-width: 440px;
    margin-bottom: 36px;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .hero-social {
    display: flex;
    gap: 10px;
    margin-top: 28px;
  }

  .social-icon {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dim);
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s;
  }

  .social-icon:hover {
    border-color: rgba(167, 139, 250, 0.3);
    color: var(--primary);
  }

  .hero-featured {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      padding: 60px 20px;
      gap: 40px;
    }
  }
</style>
```

- [ ] **Step 3: Adicionar Hero ao index.astro e verificar build**

Atualizar `src/pages/index.astro`:

```astro
---
import Base from '@/layouts/Base.astro';
import Navbar from '@/components/Navbar.astro';
import Hero from '@/components/Hero.astro';
---

<Base>
  <Navbar />
  <Hero />
  <section id="sobre" style="min-height: 50vh; padding: 2rem; color: white;">Sobre</section>
  <section id="projetos" style="min-height: 50vh; padding: 2rem; color: white;">Projetos</section>
  <section id="skills" style="min-height: 50vh; padding: 2rem; color: white;">Skills</section>
  <section id="contato" style="min-height: 50vh; padding: 2rem; color: white;">Contato</section>
</Base>
```

```bash
npm run build
```

Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/FeaturedProject.astro src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero section with featured MomentAI card"
```

---

## Task 6: Seção Sobre

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: Criar src/components/About.astro**

```astro
---
const stats = [
  { value: '5+', label: 'Anos de experiência' },
  { value: '10+', label: 'Projetos entregues' },
  { value: '3', label: 'Stacks principais' },
];
---

<section id="sobre" class="about-section">
  <div class="about-inner">
    <div class="about-grid">
      <div class="avatar" aria-label="Foto de Jackson Arceno">
        👨‍💻
      </div>

      <div class="about-content">
        <p class="section-label">Sobre mim</p>
        <h2 class="section-title">
          Engenheiro de Software<br />apaixonado por produto
        </h2>

        <p class="about-text">
          Trabalho com TypeScript, Go e Rust construindo APIs robustas, sistemas
          distribuídos e produtos completos — do backend ao frontend. Atualmente
          na Outsera e sempre em busca de desafios que valham a pena resolver.
        </p>
        <p class="about-text">
          Tenho um canal no YouTube (<a
            href="https://youtube.com/@arcenojackson"
            target="_blank"
            rel="noopener"
            class="about-link">@espresso_code</a
          >) onde compartilho conhecimento sobre desenvolvimento de software.
          Também sirvo como voluntário desenvolvendo tecnologia para a Igreja
          Presbiteriana do Estreito.
        </p>

        <div class="stats">
          {stats.map(({ value, label }) => (
            <div class="stat">
              <span class="stat-value">{value}</span>
              <span class="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 80px 48px;
  }

  .about-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .about-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 56px;
    align-items: start;
  }

  .avatar {
    width: 140px;
    height: 140px;
    border-radius: 20px;
    background: linear-gradient(135deg, #302b63, #24243e);
    border: 2px solid rgba(167, 139, 250, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 52px;
    box-shadow: 0 0 40px rgba(124, 58, 237, 0.15);
    flex-shrink: 0;
  }

  .about-content {
    padding-top: 4px;
  }

  .about-text {
    font-size: 15px;
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 16px;
  }

  .about-link {
    color: var(--primary);
    text-decoration: none;
  }

  .about-link:hover {
    text-decoration: underline;
  }

  .stats {
    display: flex;
    gap: 40px;
    margin-top: 28px;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-value {
    font-size: 34px;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-dim);
  }

  @media (max-width: 768px) {
    .about-section { padding: 60px 20px; }
    .about-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .avatar {
      width: 100px;
      height: 100px;
      font-size: 40px;
    }
  }
</style>
```

- [ ] **Step 2: Adicionar About ao index.astro e verificar build**

```astro
---
import Base from '@/layouts/Base.astro';
import Navbar from '@/components/Navbar.astro';
import Hero from '@/components/Hero.astro';
import About from '@/components/About.astro';
---

<Base>
  <Navbar />
  <Hero />
  <div class="divider"></div>
  <About />
  <section id="projetos" style="min-height: 50vh; padding: 2rem; color: white;">Projetos</section>
  <section id="skills" style="min-height: 50vh; padding: 2rem; color: white;">Skills</section>
  <section id="contato" style="min-height: 50vh; padding: 2rem; color: white;">Contato</section>
</Base>
```

```bash
npm run build
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add About section with bio and stats"
```

---

## Task 7: ProjectCard + seção Projetos

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Projects.astro`

- [ ] **Step 1: Criar src/components/ProjectCard.astro**

```astro
---
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;

const previewStyle = `background: linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo});`;
---

<article class="project-card">
  <div class="project-preview" style={previewStyle} aria-hidden="true">
    <span class="project-icon">{project.icon}</span>
  </div>

  <div class="project-body">
    <h3 class="project-title">{project.title}</h3>
    <p class="project-desc">{project.description}</p>

    <div class="project-tags">
      {project.tech.map((t) => <span class="tag">{t}</span>)}
    </div>

    <div class="project-links">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener" class="link-demo">
          Ver projeto →
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener" class="link-github">
          GitHub
        </a>
      )}
    </div>
  </div>
</article>

<style>
  .project-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .project-card:hover {
    border-color: rgba(167, 139, 250, 0.3);
  }

  .project-preview {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-icon {
    font-size: 36px;
  }

  .project-body {
    padding: 18px 20px 22px;
  }

  .project-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 6px;
  }

  .project-desc {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.65;
    margin-bottom: 14px;
  }

  .project-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .project-links {
    display: flex;
    gap: 8px;
  }
</style>
```

- [ ] **Step 2: Criar src/components/Projects.astro**

```astro
---
import ProjectCard from './ProjectCard.astro';
import { projects } from '@/data/projects';
---

<section id="projetos" class="projects-section">
  <div class="projects-inner">
    <p class="section-label">Projetos</p>
    <h2 class="section-title">O que tenho construído</h2>
    <p class="section-sub">Produtos reais, entregues e em uso</p>

    <div class="projects-grid">
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  </div>
</section>

<style>
  .projects-section {
    padding: 80px 48px;
  }

  .projects-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    .projects-section { padding: 60px 20px; }
    .projects-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 3: Adicionar Projects ao index.astro e verificar build**

```astro
---
import Base from '@/layouts/Base.astro';
import Navbar from '@/components/Navbar.astro';
import Hero from '@/components/Hero.astro';
import About from '@/components/About.astro';
import Projects from '@/components/Projects.astro';
---

<Base>
  <Navbar />
  <Hero />
  <div class="divider"></div>
  <About />
  <div class="divider"></div>
  <Projects />
  <section id="skills" style="min-height: 50vh; padding: 2rem; color: white;">Skills</section>
  <section id="contato" style="min-height: 50vh; padding: 2rem; color: white;">Contato</section>
</Base>
```

```bash
npm run build
```

Esperado: sem erros, 4 cards renderizados.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Projects.astro src/pages/index.astro
git commit -m "feat: add Projects section with project cards"
```

---

## Task 8: Seção Skills

**Files:**
- Create: `src/components/Skills.astro`

- [ ] **Step 1: Criar src/components/Skills.astro**

```astro
---
const skillGroups = [
  {
    title: 'Backend',
    items: ['TypeScript / Node.js', 'NestJS / Express', 'Go', 'Rust', 'GraphQL / Apollo'],
  },
  {
    title: 'Dados',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Kafka / RabbitMQ'],
  },
  {
    title: 'Infra & Cloud',
    items: ['Docker / Kubernetes', 'AWS', 'GitHub Actions', 'Linux', 'Vercel'],
  },
  {
    title: 'Frontend',
    items: ['React / Next.js', 'Angular', 'Astro', 'Jest'],
  },
];
---

<section id="skills" class="skills-section">
  <div class="skills-inner">
    <p class="section-label">Skills</p>
    <h2 class="section-title">Tecnologias que uso</h2>
    <p class="section-sub">Stack principal e ferramentas do dia a dia</p>

    <div class="skills-grid">
      {skillGroups.map(({ title, items }) => (
        <div class="skill-group">
          <h3 class="skill-group-title">{title}</h3>
          <ul class="skill-list" role="list">
            {items.map((item) => (
              <li class="skill-item">
                <span class="skill-dot" aria-hidden="true"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .skills-section {
    padding: 80px 48px;
    background: rgba(167, 139, 250, 0.02);
  }

  .skills-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .skill-group {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 20px;
  }

  .skill-group-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
  }

  .skill-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--text-muted);
  }

  .skill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(96, 165, 250, 0.5);
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .skills-section { padding: 60px 20px; }
    .skills-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Adicionar Skills ao index.astro e verificar build**

```astro
---
import Base from '@/layouts/Base.astro';
import Navbar from '@/components/Navbar.astro';
import Hero from '@/components/Hero.astro';
import About from '@/components/About.astro';
import Projects from '@/components/Projects.astro';
import Skills from '@/components/Skills.astro';
---

<Base>
  <Navbar />
  <Hero />
  <div class="divider"></div>
  <About />
  <div class="divider"></div>
  <Projects />
  <div class="divider"></div>
  <Skills />
  <section id="contato" style="min-height: 50vh; padding: 2rem; color: white;">Contato</section>
</Base>
```

```bash
npm run build
```

Esperado: sem erros, 4 grupos de skills renderizados.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.astro src/pages/index.astro
git commit -m "feat: add Skills section with 4 technology groups"
```

---

## Task 9: Seção Contato + Footer

**Files:**
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Criar src/components/Contact.astro**

```astro
---
import { contactLinks } from '@/data/social';
---

<section id="contato" class="contact-section">
  <div class="contact-inner">
    <div class="contact-card">
      <p class="section-label" style="text-align: center;">Contato</p>
      <h2 class="contact-title">Quer trocar uma ideia?</h2>
      <p class="contact-sub">
        Pode me chamar por qualquer um dos canais abaixo. Respondo sempre que possível.
      </p>

      <a href="mailto:me@arcenojackson.dev" class="contact-email">
        ✉ me@arcenojackson.dev
      </a>

      <div class="contact-social">
        {contactLinks.map((link) => (
          <a href={link.url} target="_blank" rel="noopener noreferrer" class="contact-social-link">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <span>© 2026 Jackson Arceno</span>
    <span>Feito com Astro + ♥</span>
  </div>
</footer>

<style>
  .contact-section {
    padding: 80px 48px;
  }

  .contact-inner {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
  }

  .contact-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(167, 139, 250, 0.15);
    border-radius: 24px;
    padding: 48px;
    box-shadow: 0 0 80px rgba(124, 58, 237, 0.08);
  }

  .contact-title {
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 800;
    margin-bottom: 12px;
    color: var(--text);
  }

  .contact-sub {
    color: var(--text-dim);
    font-size: 15px;
    margin-bottom: 32px;
    line-height: 1.7;
  }

  .contact-email {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--gradient-cta);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 32px rgba(124, 58, 237, 0.4);
    margin-bottom: 24px;
    transition: opacity 0.2s;
  }

  .contact-email:hover {
    opacity: 0.9;
  }

  .contact-social {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-social-link {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--text-dim);
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }

  .contact-social-link:hover {
    border-color: rgba(167, 139, 250, 0.3);
    color: var(--primary);
  }

  .footer {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 24px 48px;
  }

  .footer-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer span {
    font-size: 13px;
    color: #334155;
  }

  @media (max-width: 768px) {
    .contact-section { padding: 60px 20px; }
    .contact-card { padding: 32px 24px; }
    .footer { padding: 20px; }
    .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
  }
</style>
```

- [ ] **Step 2: Verificar build com Contact**

```bash
npm run build
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add Contact section and Footer"
```

---

## Task 10: Montar index.astro final e verificar build completo

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Escrever src/pages/index.astro final**

```astro
---
import Base from '@/layouts/Base.astro';
import Navbar from '@/components/Navbar.astro';
import Hero from '@/components/Hero.astro';
import About from '@/components/About.astro';
import Projects from '@/components/Projects.astro';
import Skills from '@/components/Skills.astro';
import Contact from '@/components/Contact.astro';
---

<Base>
  <Navbar />
  <Hero />
  <div class="divider"></div>
  <About />
  <div class="divider"></div>
  <Projects />
  <div class="divider"></div>
  <Skills />
  <div class="divider"></div>
  <Contact />
</Base>
```

- [ ] **Step 2: Build completo**

```bash
npm run build
```

Esperado: pasta `dist/` gerada sem erros ou warnings críticos. O arquivo `dist/index.html` deve existir.

- [ ] **Step 3: Preview local**

```bash
npm run preview
```

Abrir `http://localhost:4321` e verificar:
- [ ] Wordmark `arcenojackson` aparece no header com as duas cores
- [ ] Scroll suave entre seções
- [ ] Hero com grid 2 colunas e card do MomentAI
- [ ] Seção Sobre com avatar, bio e estatísticas
- [ ] Seção Projetos com 4 cards em grid 2 colunas
- [ ] Seção Skills com 4 grupos
- [ ] Seção Contato com card centralizado e email `me@arcenojackson.dev`
- [ ] Footer com `© 2026 Jackson Arceno`

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble full portfolio page"
```

---

## Task 11: Configuração Vercel

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Criar vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

- [ ] **Step 2: Verificar que .gitignore cobre dist/**

```bash
grep "dist" .gitignore
```

Esperado: linha `dist/` aparece no output.

- [ ] **Step 3: Build final limpo**

```bash
rm -rf dist && npm run build
```

Esperado: build bem-sucedido a partir do zero.

- [ ] **Step 4: Commit e tag**

```bash
git add vercel.json
git commit -m "chore: add Vercel config for deployment"
```

---

## Checklist de Revisão Pós-Implementação

Antes de considerar a implementação completa, verificar manualmente via `npm run preview`:

- [ ] Navbar fica sticky no scroll
- [ ] Link ativo na navbar muda de cor ao scrollar entre seções
- [ ] Hero responsivo: colunas empilham em mobile (≤ 768px)
- [ ] Skills responsivo: grid 4 → 2 → 1 coluna
- [ ] Todos os links externos abrem em nova aba (`target="_blank"`)
- [ ] Email `me@arcenojackson.dev` está correto na seção Contato
- [ ] `npm run build` termina sem erros
- [ ] README.md não foi modificado (`git diff HEAD~1 -- README.md` retorna vazio)
