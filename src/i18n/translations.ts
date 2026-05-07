export type Lang = 'pt' | 'en';

export const translations = {
  pt: {
    nav: {
      links: [
        { href: '#sobre', label: 'Sobre' },
        { href: '#projetos', label: 'Projetos' },
        { href: '#skills', label: 'Skills' },
        { href: '#contato', label: 'Contato' },
      ],
      cta: 'Entrar em contato →',
      langSwitch: { flag: '🇺🇸', label: 'Switch to English', href: '/en' },
    },
    hero: {
      role: 'Senior Software Engineer @ Outsera',
      desc: 'Construo sistemas escaláveis, produtos digitais e soluções sob medida, da ideia ao deploy. Mais de 6 anos entregando software que funciona de verdade.',
      cta1: 'Ver projetos',
      cta1Href: '#projetos',
      cta2: 'Entrar em contato ↗',
      cta2Href: '#contato',
    },
    about: {
      label: 'Sobre mim',
      title: 'Engenheiro de Software\napaixonado por produto',
      text1: 'Trabalho com TypeScript, Go e Python, construindo APIs robustas, sistemas distribuídos e produtos completos, do backend ao frontend.',
      text1Suffix: 'Atualmente na Outsera e sempre em busca de desafios que valham a pena resolver.',
      text2: 'Já tive um canal no YouTube',
      text2Mid: 'onde compartilhei por um breve tempo, conhecimentos sobre programação.',
      text2Suffix: 'Também sirvo como voluntário na Igreja Presbiteriana do Estreito, contribuindo na música e na tecnologia da igreja.',
      stats: [
        { value: '6+', label: 'Anos de experiência' },
        { value: '10+', label: 'Projetos entregues' },
      ],
    },
    skills: {
      label: 'Skills',
      title: 'Tecnologias que uso',
      sub: 'Stack principal e ferramentas do dia a dia',
      groups: [
        { title: 'Backend', items: ['TypeScript / Node.js', 'NestJS / Express', 'Go', 'Python', 'GraphQL / Apollo'] },
        { title: 'Dados', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SAP S/4HANA', 'Filas / Eventos'] },
        { title: 'Infra & Cloud', items: ['Docker / Kubernetes', 'AWS', 'GitHub Actions', 'Linux', 'Vercel'] },
        { title: 'Frontend', items: ['React / Next.js', 'Angular', 'Astro', 'Flutter'] },
      ],
    },
    contact: {
      label: 'Contato',
      title: 'Quer trocar uma ideia?',
      sub: 'Pode me chamar por qualquer um dos canais abaixo. Respondo sempre que possível.',
    },
    projects: {
      label: 'Projetos',
      title: 'O que tenho construído',
      sub: 'Produtos reais, entregues e em uso',
      sectionId: 'projetos',
      viewProject: 'Ver projeto →',
      featuredBadge: '★ Em destaque',
      accessApp: 'Acessar app →',
    },
    footer: '© 2026 Jackson Arceno',
  },
  en: {
    nav: {
      links: [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#contact', label: 'Contact' },
      ],
      cta: 'Get in touch →',
      langSwitch: { flag: '🇧🇷', label: 'Mudar para Português', href: '/' },
    },
    hero: {
      role: 'Senior Software Engineer @ Outsera',
      desc: 'I build scalable systems, digital products, and custom solutions — from idea to deploy. Over 6 years delivering software that truly works.',
      cta1: 'View projects',
      cta1Href: '#projects',
      cta2: 'Get in touch ↗',
      cta2Href: '#contact',
    },
    about: {
      label: 'About me',
      title: 'Software Engineer\npassionate about product',
      text1: 'I work with TypeScript, Go, and Python, building robust APIs, distributed systems, and full products from backend to frontend.',
      text1Suffix: 'Currently at Outsera and always looking for challenges worth solving.',
      text2: 'I once had a YouTube channel',
      text2Mid: 'where I briefly shared programming knowledge.',
      text2Suffix: 'I also volunteer at Igreja Presbiteriana do Estreito, contributing to music and church technology.',
      stats: [
        { value: '6+', label: 'Years of experience' },
        { value: '10+', label: 'Projects delivered' },
      ],
    },
    skills: {
      label: 'Skills',
      title: 'Technologies I use',
      sub: 'Core stack and day-to-day tools',
      groups: [
        { title: 'Backend', items: ['TypeScript / Node.js', 'NestJS / Express', 'Go', 'Python', 'GraphQL / Apollo'] },
        { title: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SAP S/4HANA', 'Queues / Events'] },
        { title: 'Infra & Cloud', items: ['Docker / Kubernetes', 'AWS', 'GitHub Actions', 'Linux', 'Vercel'] },
        { title: 'Frontend', items: ['React / Next.js', 'Angular', 'Astro', 'Flutter'] },
      ],
    },
    contact: {
      label: 'Contact',
      title: 'Want to chat?',
      sub: 'Feel free to reach out through any of the channels below. I reply whenever I can.',
    },
    projects: {
      label: 'Projects',
      title: 'What I have built',
      sub: 'Real products, shipped and in use',
      sectionId: 'projects',
      viewProject: 'View project →',
      featuredBadge: '★ Featured',
      accessApp: 'Open app →',
    },
    footer: '© 2026 Jackson Arceno',
  },
};
