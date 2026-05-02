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
