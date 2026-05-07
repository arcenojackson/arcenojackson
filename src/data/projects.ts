export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  icon: string;
  image?: string;
  imageAlt?: string;
  highlights?: string[];
  highlightsEn?: string[];
  appStoreUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  descriptionEn: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string | null;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  image?: string;
  imageAlt?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  phoneScreenshots?: string[];
  statusLabel?: string;
}

export const featuredProject: FeaturedProject = {
  id: 'church-hub',
  title: 'Church Hub',
  category: 'SaaS · Gestão de Igrejas',
  categoryEn: 'SaaS · Church Management',
  description:
    'Plataforma 100% gratuita para igrejas: membros, cultos, escalas, biblioteca musical, chat e muito mais — tudo em um só lugar.',
  descriptionEn:
    '100% free platform for churches: members, services, schedules, music library, chat and much more — all in one place.',
  tech: ['Flutter', 'Firebase', 'Firestore', 'Cloud Functions'],
  demoUrl: 'https://church-hub-prod.web.app/',
  githubUrl: '',
  icon: '⛪',
  image: '/projects/church-hub-hero.png',
  imageAlt: 'Preview do Church Hub mostrando a tela de gestão de cultos',
  highlights: ['Gestão de Membros', 'Eventos e Cultos', 'Biblioteca Musical', 'Escalas e Equipes'],
  highlightsEn: ['Member Management', 'Events & Services', 'Music Library', 'Schedules & Teams'],
  appStoreUrl: 'https://apps.apple.com/br/app/church-hub/id6766631440',
};

export const projects: Project[] = [
  {
    id: 'arclabz',
    title: 'ArcLabz',
    description:
      'Laboratório de tecnologia que transforma desafios em soluções escaláveis — consultoria, MVPs, automação e dados para empresas em crescimento.',
    descriptionEn:
      'Technology lab that turns challenges into scalable solutions — consulting, MVPs, automation, and data for growing companies.',
    tech: ['Astro', 'TypeScript', 'Three.js'],
    demoUrl: 'https://arclabz.com.br',
    githubUrl: null,
    gradientFrom: '#0c1445',
    gradientTo: '#1a0533',
    icon: '🧪',
    image: '/projects/arclabz-hero.png',
    imageAlt: 'Site da ArcLabz — laboratório de tecnologia',
  },
  {
    id: 'nod',
    title: 'NOD.Mkt',
    description:
      'Plataforma para agências de marketing centralizarem briefings, equipe, clientes, produção e entregas em um só lugar.',
    descriptionEn:
      'Platform for marketing agencies to centralize briefs, team, clients, production, and deliverables in one place.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
    demoUrl: 'https://nodmkt.com',
    githubUrl: '',
    gradientFrom: '#052e16',
    gradientTo: '#083344',
    icon: '📊',
    image: '/projects/nod-hero.png',
    imageAlt: 'NOD.Mkt — plataforma de gestão para agências',
  },
  {
    id: 'app-ipe',
    title: 'App IPE',
    description: 'Aplicativo de gestão para a Igreja Presbiteriana do Estreito — membros, eventos e comunicações.',
    descriptionEn: 'Management app for Igreja Presbiteriana do Estreito — members, events, and communications.',
    tech: ['Flutter', 'Firebase', 'Firestore', 'Provider'],
    demoUrl: '',
    githubUrl: '',
    gradientFrom: '#1e1b4b',
    gradientTo: '#312e81',
    icon: '⛪',
    appStoreUrl: 'https://apps.apple.com/br/app/app-ipe/id6755492066',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ipe.app',
    phoneScreenshots: ['/projects/app-ipe-2.jpeg', '/projects/app-ipe-1.jpeg', '/projects/app-ipe-3.jpeg'],
  },
  {
    id: 'momentai',
    title: 'MomentAI',
    description: 'Geração automática de vídeos com IA prontos para compartilhamento em redes sociais.',
    descriptionEn: 'Automatic AI-powered video generation ready for social media sharing.',
    tech: ['Flutter', 'Fastify', 'Gemini / VEO3', 'FFmpeg', 'BullMQ', 'Cloudflare R2'],
    demoUrl: '',
    githubUrl: '',
    gradientFrom: '#1e3a5f',
    gradientTo: '#1e1b4b',
    icon: '🎬',
    phoneScreenshots: ['/projects/moment-ai-2.png', '/projects/moment-ai-1.png', '/projects/moment-ai-3.png', '/projects/moment-ai-4.png'],
    statusLabel: 'Não publicado',
  },
];
