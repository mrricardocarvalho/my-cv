// src/data/blogPosts.ts
import { BlogPost } from '../types/cv';

export const blogPostsData: BlogPost[] = [
  {
    id: 'getting-started-al-dev',
    date: 'April 1, 2025',
    title: {
      en: 'Getting Started with AL Development for Business Central',
      pt: 'Introdução ao Desenvolvimento AL para Business Central',
    },
    excerpt: {
      en: 'Unlock the power of customization in Dynamics 365 Business Central. An introduction to the AL language, development environment (VS Code), and key concepts for building your first extension.',
      pt: 'Desbloqueie o poder da personalização no Dynamics 365 Business Central. Uma introdução à linguagem AL, ao ambiente de desenvolvimento (VS Code) e aos conceitos-chave para construir a sua primeira extensão.',
    },
    url: '/blog/getting-started-al-dev',
  },
  {
    id: 'bc-events-subscribers',
    date: 'April 1, 2025',
    title: {
      en: "Decoupling Code in Business Central: Events & Subscribers",
      pt: "Desacoplando Código no Business Central: Eventos e Subscritores",
    },
    excerpt: {
      en: "Move beyond basic extensions. Learn how to use Business Central's event-driven architecture with Publishers and Subscribers to create clean, maintainable, and upgrade-safe customizations.",
      pt: "Vá além das extensões básicas. Aprenda a usar a arquitetura orientada a eventos do Business Central com Publicadores e Subscritores para criar personalizações limpas, fáceis de manter e seguras para atualizações.",
    },
    url: '/blog/bc-events-subscribers',
  },
  {
    id: 'bc-al-performance-killers',
    date: 'April 2 , 2025',
    title: {
      en: "Beyond the FIND('-'): Unmasking Hidden Performance Killers in Your AL Queries",
      pt: "Para Lá do FIND('-'): A Desmascarar Assassinos de Desempenho Ocultos nas Suas Queries AL",
    },
    excerpt: {
      en: "Dive into the non-obvious ways your AL code interacts with the database to find hidden performance bottlenecks – from implicit joins to locking woes and mastering the Profiler.",
      pt: "Mergulhe nas formas não óbvias como o seu código AL interage com a base de dados para encontrar estrangulamentos de desempenho ocultos – de junções implícitas a problemas de bloqueio e dominar o Profiler.",
    },
    url: '/blog/bc-al-performance-killers',
  },
  {
    id: 'bc-al-interfaces',
    date: 'April 3, 2025',
    title: {
      en: 'Interface Thinking in AL: Designing for the Future of Your BC Extensions',
      pt: 'Pensamento de Interface em AL: Desenhar para o Futuro das Suas Extensões BC',
    },
    excerpt: {
      en: "Explore how adopting an interface-first mindset in AL leads to more modular, testable, and maintainable Business Central extensions that are resilient to change.",
      pt: "Explore como adotar uma mentalidade de 'interface-first' em AL leva a extensões do Business Central mais modulares, testáveis e fáceis de manter, resilientes à mudança.",
    },
    url: '/blog/bc-al-interfaces',
  },
  {
    id: 'bc-al-upgrade-gauntlet',
    date: 'April 4, 2025',
    title: {
      en: 'Navigating the Upgrade Gauntlet: Building Extensions That Survive and Thrive Across BC Versions',
      pt: 'Navegar a Pista de Obstáculos das Atualizações: Construir Extensões Que Sobrevivem e Prosperam em Várias Versões BC',
    },
    excerpt: {
      en: "Learn the strategies for designing and testing your Business Central extensions to ensure smooth, predictable upgrades through BC's continuous update cycle.",
      pt: "Aprenda as estratégias para conceber e testar as suas extensões do Business Central para garantir atualizações suaves e previsíveis ao longo do ciclo de atualizações contínuas do BC.",
    },
    url: '/blog/bc-al-upgrade-gauntlet',
  },
  {
    id: 'bc-al-advanced-debugging',
    date: 'April 5, 2025',
    title: {
      en: 'AL Debugging: Escaping the F9 Comfort Zone – Advanced Techniques for Elusive Bugs',
      pt: 'Debugging em AL: Escapar da Zona de Conforto do F9 – Técnicas Avançadas para Bugs Elusivos',
    },
    excerpt: {
      en: 'Breakpoints are just the start. Learn advanced AL debugging techniques like conditional breakpoints, logpoints, and deep call stack analysis to diagnose and fix complex issues faster.',
      pt: 'Breakpoints são apenas o começo. Aprenda técnicas avançadas de debugging em AL como breakpoints condicionais, logpoints e análise profunda da call stack para diagnosticar e corrigir problemas complexos mais rapidamente.',
    },
    url: '/blog/bc-al-advanced-debugging',
  },
  {
    id: 'bc-al-data-transactions',
    date: 'April 6, 2025',
    title: {
      en: 'Taming Transactions and Data Operations in AL: Ensuring Integrity and Performance',
      pt: 'Dominar Transações e Operações de Dados em AL: Garantir Integridade e Desempenho',
    },
    excerpt: {
      en: 'Navigate the complexities of AL transactions, understand the implications of COMMIT, and learn patterns for handling large data volumes and ensuring data consistency in Business Central.',
      pt: 'Navegue pelas complexidades das transações AL, compreenda as implicações do COMMIT e aprenda padrões para lidar com grandes volumes de dados e garantir consistência de dados no Business Central.',
    },
    url: '/blog/bc-al-data-transactions',
  },
  {
    id: 'bc-al-advanced-integrations',
    date: 'April 7, 2025',
    title: {
      en: 'AL Integrations: Beyond the Basics - Building Robust External Connections',
      pt: 'Integrações AL: Para Lá do Básico - Construir Conexões Externas Robustas',
    },
    excerpt: {
      en: 'Master advanced AL integration patterns: handle errors, manage large payloads, navigate authentication (OAuth), and ensure resilience when connecting BC to external APIs.',
      pt: 'Domine padrões avançados de integração AL: trate erros, gire grandes payloads, navegue autenticação (OAuth) e garanta resiliência ao conectar BC a APIs externas.',
    },
    url: '/blog/bc-al-advanced-integrations',
  },
];
