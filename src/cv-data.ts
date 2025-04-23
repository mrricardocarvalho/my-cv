// src/cv-data.ts - Modified Structure Example

// Helper type for translatable strings
type TranslatableString = {
  en: string;
  pt: string;
};

// Modify interfaces
export interface Job {
  id: string;
  title: TranslatableString;
  company: string;
  location: string;
  date: string;
  logo?: string; // Optional logo filename (e.g., 'sysmatch-logo.png')
  responsibilities: TranslatableString[];
  // Optional: Add employment type like 'Full-time' if desired
  employmentType?: TranslatableString;
}

export interface EducationItem {
  id: string;
  degree: TranslatableString;
  institution: string;
  location: string;
  date: string;
  logo?: string;
}

export interface SkillCategory {
    id: string;
    title: TranslatableString; // Changed
    skills: string[]; // Skill names often stay in English in tech? Or translate too? Let's keep EN for now.
}

 export interface Language {
    id: string;
    name: TranslatableString; // Changed
    level: TranslatableString; // Changed
}

// Interface for Project Data
export interface Project {
  id: string;
  name: TranslatableString; // Project Name
  type?: TranslatableString; // e.g., Personal, Client, Open Source
  role: TranslatableString; // Your role in the project
  date: string; // Date range or completion date
  summary: TranslatableString; // Brief description of the project/your role
  logo?: string; // Optional logo filename
  url?: string; // Optional link to live project or repo
  tags?: string[]; // New: tags/categories for filtering
  featured?: boolean; // New: mark as featured
  // Optional: Add technologies used array if desired
  // technologies?: string[];
}

// Interface for Blog Post Data
export interface BlogPost {
  id: string; // Used to link to markdown files (e.g., 'getting-started-al-dev')
  date: string;
  title: TranslatableString;
  excerpt: TranslatableString;
  url: string; // URL for navigation/linking
  tags?: string[]; // New: tags/categories for filtering
  readingTime?: number; // New: estimated reading time in minutes
  featured?: boolean; // New: mark as featured
}

// src/cv-data.ts
export const professionalCompetenciesData: TranslatableString[] = [
  // Core Technical & Problem Solving
  { en: "Complex Problem Solving", pt: "Resolução de Problemas Complexos" }, // More specific than just "Problem-Solving"
  { en: "Root Cause Analysis", pt: "Análise de Causa Raiz" }, // Key skill for support/debugging
  { en: "Analytical Thinking", pt: "Pensamento Analítico" }, // Still relevant
  { en: "Attention to Detail", pt: "Atenção ao Detalhe" }, // Crucial for debugging & config

  // Client & Communication Focused
  { en: "Customer Focus & Success Driven", pt: "Foco no Cliente e Orientado para o Sucesso" }, // Enhanced "Customer-Focused"
  { en: "Technical Communication (Client & Docs)", pt: "Comunicação Técnica (Cliente & Docs)" }, // Specifies *type* of communication
  { en: "Client Relationship Management", pt: "Gestão de Relacionamento com Cliente" }, // Highlights interaction skill

  // Collaboration & Adaptability
  { en: "Teamwork & Cross-Functional Collaboration", pt: "Trabalho em Equipa e Colaboração Interfuncional" }, // More specific collaboration
  { en: "Adaptability & Continuous Learning", pt: "Adaptabilidade e Aprendizagem Contínua" }, // Links adaptability to tech evolution
  { en: "Multicultural Collaboration", pt: "Colaboração Multicultural" }, // Relevant for EMEA role

  // Initiative & Work Ethic
  { en: "Initiative & Self-Motivation", pt: "Iniciativa e Automotivação" }, // Stronger than just "Self-Motivated"
  { en: "Process Improvement Mindset", pt: "Mentalidade de Melhoria Contínua de Processos" }, // Reflects experience mentioned

  // Optional (especially given senior roles):
  // { en: "Leadership & Mentoring Aptitude", pt: "Aptidão para Liderança e Mentoria" }, // If you want to emphasize this
  // { en: "Business Process Understanding (ERP)", pt: "Compreensão de Processos de Negócio (ERP)" }, // Good for consulting/dev roles
];


// --- Update CV DATA ---

export const professionalExperience: Job[] = [
  {
    id: 'job1',
    title: {
        en: "Dynamics Business Central Support Engineer EMEA",
        pt: "Engenheiro de Suporte Dynamics Business Central EMEA"
    },
    company: "Sysmatch (Contractor at Microsoft)",
    location: "Lisbon",
    date: "Feb 2020 - 2021",
    logo: 'microsoft-logo.png',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },
    responsibilities: [
      {
        en: "Led the resolution of complex Dynamics 365 BC escalations for partners and customers across EMEA, consistently exceeding SLA targets.",
        pt: "Liderei a resolução de escalações complexas do Dynamics 365 BC para parceiros e clientes em toda a região EMEA, superando consistentemente as metas de SLA."
      },
      {
        en: "Executed in-depth technical analysis and troubleshooting across AL code, SQL performance, API integrations, and Azure dependencies.",
        pt: "Executei análises técnicas aprofundadas e resolução de problemas em código AL, desempenho SQL, integrações API e dependências do Azure."
      },
      {
        en: "Acted as a trusted liaison between Microsoft teams and clients, accelerating resolution of business-critical issues.",
        pt: "Atuei como elo de confiança entre equipas da Microsoft e clientes, acelerando a resolução de problemas críticos para o negócio."
      },
      {
        en: "Advised partners and customers on best practices for configuration, customization, and upgrade planning in BC.",
        pt: "Aconselhei parceiros e clientes sobre melhores práticas de configuração, personalização e planeamento de atualizações no BC."
      },
      {
        en: "Documented software issues with precision, influencing product improvements in future Business Central releases.",
        pt: "Documentei problemas de software com precisão, influenciando melhorias no produto em futuras versões do Business Central."
      }
    ]
  },
  {
    id: 'job2', // Keep the unique ID
    title: { // Translatable title
        en: "Senior Dynamics NAV Developer",
        pt: "Developer Sénior Dynamics NAV"
    },
    company: "Sysmatch", // Non-translatable? Assume so.
    location: "Lisbon",
    date: "Nov 2018 – Feb 2020",
    logo: 'sysmatchpt.png', // Example
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },    
    responsibilities: [
      {
        en: "Designed and implemented tailored Dynamics NAV (C/AL) solutions for strategic healthcare clients across Portugal, Angola, and Mozambique.",
        pt: "Desenhei e implementei soluções Dynamics NAV (C/AL) personalizadas para clientes estratégicos do setor da saúde em Portugal, Angola e Moçambique."
      },
      {
        en: "Engineered robust XML-based integrations between NAV and external platforms (LIMS, billing, logistics), ensuring secure and reliable data exchange.",
        pt: "Desenvolvi integrações robustas baseadas em XML entre o NAV e plataformas externas (LIMS, faturação, logística), garantindo trocas de dados seguras e fiáveis."
      },
      {
        en: "Assumed full technical ownership of NAV environments, managing system maintenance, performance tuning (SQL/C/AL), and critical support resolution.",
        pt: "Assumi total responsabilidade técnica dos ambientes NAV, gerindo manutenção do sistema, otimização de desempenho (SQL/C/AL) e resolução de suportes críticos."
      },
      {
        en: "Optimized NAV deployment methodologies and established internal best practices, reducing implementation lead times and enhancing team efficiency.",
        pt: "Otimizei metodologias de implementação do NAV e estabeleci boas práticas internas, reduzindo os prazos de implementação e aumentando a eficiência da equipa."
      }
    ]
  },
  {
    id: 'job3',
    title: {
        en: "IT Consultant (Dynamics AX)",
        pt: "Consultor de TI (Dynamics AX)"
    },
    company: "Novabase",
    location: "Lisbon",
    date: "Mar 2018 – Nov 2018",
    logo: 'sysmatchpt.png', // Example
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },    
    responsibilities: [
      {
        en: "Provided functional and technical support for Dynamics AX, resolving user issues and improving overall system efficiency.",
        pt: "Prestei suporte funcional e técnico ao Dynamics AX, resolvendo problemas de utilizadores e melhorando a eficiência do sistema."
      },
      {
        en: "Contributed to solution design, requirement analysis, and user acceptance testing for Dynamics AX implementations.",
        pt: "Contribuí para o design de soluções, análise de requisitos e testes de aceitação de utilizador em implementações Dynamics AX."
      },
      {
        en: "Leveraged Microsoft telemetry data to monitor performance and guide client-focused support strategies.",
        pt: "Utilizei dados de telemetria da Microsoft para monitorizar o desempenho e orientar estratégias de suporte centradas no cliente."
      }
    ]
  },
  {
    id: 'job4', // Keep unique ID
    title: {
        en: "Senior Dynamics NAV Developer",
        pt: "Developer Sénior Dynamics NAV"
    },
    company: "ABOUTNAV",
    location: "Lisbon",
    date: "Nov 2016 – Feb 2018",
    logo: 'aboutnav.png',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },
    responsibilities: [
      {
        en: "Led full-cycle Dynamics NAV implementations, covering requirement analysis, C/AL development, data migration, and go-live support across multiple technical sectors.",
        pt: "Liderei implementações completas do Dynamics NAV, abrangendo análise de requisitos, desenvolvimento em C/AL, migração de dados e suporte ao go-live em vários setores técnicos."
      },
      {
        en: "Developed advanced C/AL customizations and XML integrations, delivering tailored solutions aligned with specific client workflows.",
        pt: "Desenvolvi personalizações avançadas em C/AL e integrações XML, fornecendo soluções à medida alinhadas com os fluxos de trabalho específicos dos clientes."
      },
      {
        en: "Provided ongoing NAV technical administration and support in an outsourced services environment, ensuring system stability and performance.",
        pt: "Assegurei administração técnica contínua e suporte ao NAV num contexto de serviços de outsourcing, garantindo a estabilidade e o desempenho do sistema."
      }
    ]
  },
  {
    id: 'job5', // Keep unique ID
    title: {
        en: "Sage X3 Developer",
        pt: "Developer Sage X3"
    },
    company: "Sage Portugal",
    location: "Lisbon",
    date: "Mar 2014 – Nov 2016",
    logo: 'sagept.png', // Example
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },    
    responsibilities: [
      {
        en: "Developed and maintained Portugal-specific localizations in Sage X3 ERP (IES, SAF-T/PT [Caixa IVA]), ensuring legal compliance and audit readiness.",
        pt: "Desenvolvi e mantive localizações específicas para Portugal no ERP Sage X3 (IES, SAF-T/PT [Caixa IVA]), assegurando conformidade legal e prontidão para auditorias."
      },
      {
        en: "Built custom features using Sage X3's native 4GL environment and JavaScript, supporting tailored functionality and system maintenance.",
        pt: "Desenvolvi funcionalidades personalizadas utilizando o ambiente 4GL nativo do Sage X3 e JavaScript, apoiando personalizações específicas e manutenção do sistema."
      }
    ]
  },
  {
    id: 'job6', // Keep unique ID
    title: {
        en: "Dynamics NAV Developer",
        pt: "Developer Dynamics NAV"
    },
    company: "Aptra - Consultoria em Sistemas de Informação",
    location: "Bobadela", // Or Lisbon if more general preferred
    date: "Oct 2012 – Mar 2014",
    logo: '',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },    
    responsibilities: [
      {
        en: "Designed, developed, and implemented custom Dynamics NAV Add-ons for Portuguese Municipalities, including Workflow, Document Management (ArchiveLink), Urbanism, and Public Works modules. Supported key public sector clients like AMAT and EGEAC during rollout.",
        pt: "Projetei, desenvolvi e implementei Add-ons personalizados do Dynamics NAV para Câmaras Municipais Portuguesas, incluindo módulos de Workflow, Gestão Documental (ArchiveLink), Urbanismo e Obras Públicas. Apoiei clientes-chave do setor público como a AMAT e a EGEAC durante a implementação."
      }
    ]
  },
  {
    id: 'job7', // Keep unique ID
    title: {
        en: "IT Consultant (Microsoft Dynamics NAV)",
        pt: "Consultor de TI (Microsoft Dynamics NAV)"
    },
    company: "Conhecer Mais TI",
    location: "Lisbon",
    date: "Jan 2007 – Sep 2012",
    logo: 'conhecermaisti.png',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },    
    responsibilities: [
      {
        en: "Led full-cycle Dynamics NAV implementations across Education, Non-Profit, and Services sectors. Developed specialized Add-ons, including private school management tools and enhancements for Public Sector Accounting. Supported pre-sales activities and delivered C/Side training to clients.",
        pt: "Liderei implementações completas do Dynamics NAV nos setores da Educação, Terceiro Setor e Serviços. Desenvolvi Add-ons especializados, incluindo soluções para gestão de colégios privados e melhorias para normas de Contabilidade Pública. Apoiei atividades de pré-venda e ministrei formação em C/Side a clientes."
      }
    ]
  },
  {
    id: 'job8', // Keep unique ID
    title: {
        en: "IT Consultant (Microsoft Dynamics NAV)",
        pt: "Consultor de TI (Microsoft Dynamics NAV)"
    },
    company: "JD Solutions - Link",
    location: "Algés", // Or Lisbon
    date: "Dec 2004 – Dec 2006",
    logo: '',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },    
    responsibilities: [
      {
        en: "Delivered customized Dynamics NAV solutions and version upgrades for corporate clients including Wyeth, Mundicenter, and GFK, ensuring operational continuity and system optimization.",
        pt: "Implementei soluções Dynamics NAV personalizadas e atualizações de versão para clientes corporativos como Wyeth, Mundicenter e GFK, garantindo continuidade operacional e otimização do sistema."
      }
    ]
  },
];

export const educationHistory: EducationItem[] = [
  // Trainings (Most Recent First)
   {
    id: 'edu4',
    degree: { en: "Training: Developing ASP.NET MVC 4 Web Apps", pt: "Formação: Developing ASP.NET MVC 4 Web Applications" },
    institution: "Rumos", location: "Lisbon", date: "Jun 2015"
  },
  {
    id: 'edu5',
    degree: { en: "Training: JavaScript", pt: "Formação: Javascript" },
    institution: "Formabase", location: "Lisbon", date: "Sep-Oct 2015"
  },
   {
    id: 'edu6',
    degree: { en: "Training: Microsoft Visual Studio 2010 ASP.NET", pt: "Formação: Microsoft Visual Studio 2010 ASP.NET" },
    institution: "Galileu", location: "Lisbon", date: "Dec 2009 – Dec 2012"
  },
  // Certifications
   {
    id: 'edu3',
    degree: { en: "Microsoft Dynamics NAV 2009 Installation & Configuration (MB7-838)", pt: "Certificação Microsoft Dynamics NAV 2009 Installation & Configuration (MB7-838)" },
    institution: "Galileu", location: "Lisbon", date: "Sep 2011"
  },
  {
    id: 'edu2',
    degree: { en: "Certified Technical Trainer (CCP)", pt: "Certificado de Competências Pedagógicas (CCP)" },
    institution: "Conhecer Mais RH e IEFP", location: "Lisbon", date: "Apr 2008"
  },
  // Degree
  {
    id: 'edu1',
    degree: { en: "Licenciatura in Management Informatics", pt: "Licenciatura em Informática de Gestão" },
    institution: "Instituto Superior de Gestão (ISG)", location: "Lisbon", date: "Sep 1998 – May 2004",
  },
];

// src/cv-data.ts

export const technicalSkills: SkillCategory[] = [
    {
        id: 'coreDynamics',
        title: { en: "Core Dynamics 365 BC / NAV Expertise", pt: "Competências Nucleares Dynamics 365 BC / NAV" },
        skills: [
            "Dynamics 365 Business Central", // Lead with current
            "Dynamics NAV (Multiple Versions)", // Indicate breadth
            "AL Development (VS Code)",      // Modern dev
            "C/AL Development (C/SIDE)",   // Classic dev
            "BC/NAV Extensions (v1, v2, AppSource)", // Specify extension types
            "BC/NAV System Administration & Configuration",
            "BC/NAV Performance Tuning & Optimization",
            "Data Migration (BC/NAV)",
        ]
    },
    {
        id: 'backendDb',
        title: { en: "Backend, Database & Integrations", pt: "Backend, Base de Dados e Integrações" },
        skills: [
            "SQL Server (T-SQL, SSMS)", // Be specific
            "SQL Query Optimization",
            "PL/SQL (Oracle - from earlier exp.)", // Acknowledge source
            "API Development & Consumption (REST, SOAP, OData)", // Add API types
            "XML / JSON", // Common data formats
            "Web Services (BC/NAV specific & general)",
        ]
    },
    {
        id: 'webGeneral',
        title: { en: "Web & General Programming", pt: "Web e Programação Geral" },
        skills: [
            "JavaScript",
            "HTML5 / CSS3", // Be more specific than HTML/CSS
            "ASP.NET (MVC, Core Basics)", // Update if Core exposure
            "C# (within ASP.NET context)", // Often used with ASP.NET
        ]
    },
    {
        id: 'platformsTools',
        title: { en: "Platforms, Cloud & Tools", pt: "Plataformas, Cloud e Ferramentas" },
        skills: [
            "Visual Studio Code",
            "Visual Studio",
            "Git / Version Control", // More generic term
            "Azure DevOps (Boards, Repos - Basics)", // Specificity
            "Azure Fundamentals (Conceptual)", // Add if you have basic cloud understanding
            "Power Platform (Power BI/Apps - Basic Exposure)", // Add if applicable
            "Advanced Debugging Techniques", // Skill, not tool, but fits here
        ]
    },
    {
        id: 'methodologies',
        title: { en: "Technical Practices & Methodologies", pt: "Práticas Técnicas e Metodologias" },
        skills: [
            // Keep the strong ones from before, maybe rephrase slightly
            "Complex Technical Support",
            "Advanced Troubleshooting",
            "Root Cause Analysis (RCA)",
            "Requirements Gathering & Analysis",
            "Solution Design (ERP Context)",
            "Technical Documentation Authoring",
            "Agile Methodologies (Exposure)",
            "Client-Facing Communication", // Renamed from CRM
        ]
    }
 ];

 // List of key skills to highlight in the sidebar
export const keyTechnicalSkills: string[] = [
    "Dynamics 365 BC",
    "AL",
    "Dynamics NAV",
    "C/AL",
    "APIs",
    "SQL",
    "CI/CD",
    "Git",
    "Agile"
    // Add 1-2 more if desired, e.g., Performance Tuning, Web Services
];

 export const languages: Language[] = [
    { id: 'lang1', name: { en: "Portuguese", pt: "Português"}, level: { en: "Native", pt: "Nativo"} },
    { id: 'lang2', name: { en: "English", pt: "Inglês"}, level: { en: "Fluent (C1)", pt: "Fluente (C1)"} },
    { id: 'lang3', name: { en: "Spanish", pt: "Espanhol"}, level: { en: "Basic/Intermediate (A2/B1)", pt: "Básico/Intermédio (A2/B1)"} },
    { id: 'lang4', name: { en: "French", pt: "Francês"}, level: { en: "Basic/Intermediate (A2/B1)", pt: "Básico/Intermédio (A2/B1)"} }
 ];

 // Contact info - usually doesn't need translation, maybe location label if we add one
 export const contactInfo = {
    // phone: "(+351) 938522179",
    email: "ricardo.sampaio@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/ricardo-carvalho-05741519/",
    linkedinText: "LinkedIn Profile", // Text for the link
    location: "Portugal",
    githubUrl: "https://github.com/mrricardocarvalho",
    githubText: "GitHub Profile",
};

export const labels = {
    // Main Section Headers
    summary: { en: "Professional Summary", pt: "Resumo Profissional" },
    experience: { en: "Professional Experience", pt: "Experiência Profissional" },
    education: { en: "Education & Certifications", pt: "Educação e Certificações" },
    skillsAndCompetencies: { en: "Skills & Competencies", pt: "Competências" },

    // Sub-Section Headers (within Skills or elsewhere)
    technicalSkillsSubheading: { en: "Technical Skills", pt: "Competências Técnicas" },
    languages: { en: "Languages", pt: "Línguas" },
    professionalCompetenciesSubheading: { en: "Professional Competencies", pt: "Competências Profissionais" },

    // Contact/Link Related
    contact: { en: "Contact", pt: "Contacto" }, // <<<<<< ADD THIS LINE
    linkedinLinkText: { en: "LinkedIn Profile", pt: "Perfil LinkedIn" },
    githubLinkText: { en: "GitHub Profile", pt: "Perfil GitHub" },

    // Add any other static text elements needing translation
    currentPage: { en: "Current Page", pt: "Página Atual" },
    projects: { en: "Projects", pt: "Projetos" },
    blog: { en: "Blog", pt: "Blog" },
    readMore: { en: "Read more", pt: "Ler mais" },
};

// Add the full summary text in both languages
export const summaryText: TranslatableString = {
    en: "Experienced Dynamics 365 Business Central Developer with over 15 years of success delivering high-impact ERP solutions across the EMEA region. Expert in custom development, complex integrations (API/XML/JSON), performance optimization, and advanced technical support. Known for leading development initiatives, resolving complex technical challenges, and driving successful project outcomes that exceed client expectations",
    pt: "Desenvolvedor experiente de Dynamics 365 Business Central, com mais de 15 anos de sucesso na entrega de soluções ERP de elevado impacto na região EMEA. Especialista em desenvolvimento personalizado, integrações complexas (API/XML/JSON), otimização de desempenho e suporte técnico avançado. Reconhecido por liderar iniciativas de desenvolvimento, resolver desafios técnicos complexos e impulsionar resultados de projeto que superam as expectativas dos clientes."
};

export const mainNavItems = [
    // Should the root path href be '/' or '/resume'?
    // If using '/', the useEffect correctly maps it to '/resume' for activePath state.
    { id: 'resume', label: { en: 'Resume', pt: 'Currículo' }, href: '/resume' }, // Or '/' if you prefer link to root
    { id: 'projects', label: { en: 'Projects', pt: 'Projetos' }, href: '/projects' },
    { id: 'blog', label: { en: 'Blog', pt: 'Blog' }, href: '/blog' },
];

// Array for Project Data (Add your actual projects)
export const projectsData: Project[] = [
  {
    id: 'proj1',
    name: { en: "Example Client Project X", pt: "Exemplo Projeto Cliente X" },
    type: { en: "Client Implementation", pt: "Implementação Cliente" },
    role: { en: "Lead NAV/BC Developer", pt: "Developer NAV/BC Principal" },
    date: "2021 - 2022",
    summary: {
        en: "Led the development and customization of Dynamics 365 Business Central for a manufacturing client, focusing on inventory management and production order enhancements. Integrated with third-party logistics provider via custom API.",
        pt: "Liderei o desenvolvimento e personalização do Dynamics 365 Business Central para um cliente industrial, com foco na gestão de inventário e melhorias nas ordens de produção. Integrado com fornecedor logístico externo via API personalizada."
    },
    logo: 'client-x-logo.png',
    url: '#',
    tags: ['ERP', 'Business Central', 'API', 'Manufacturing'],
    featured: true
  },
  {
    id: 'proj2',
    name: { en: "Personal Portfolio Website", pt: "Website de Portfólio Pessoal" },
    type: { en: "Personal Project", pt: "Projeto Pessoal" },
    role: { en: "Developer", pt: "Developer" },
    date: "2024",
    summary: {
        en: "Built this interactive CV/Portfolio using React, TypeScript, Tailwind CSS, and daisyUI, deployed via Vercel.",
        pt: "Construí este CV/Portfólio interativo usando React, TypeScript, Tailwind CSS e daisyUI, implementado via Vercel."
    },
    logo: 'react-logo.jpg',
    url: '#',
    tags: ['React', 'TypeScript', 'Tailwind', 'Portfolio'],
    featured: false
  },
  // Add more projects as needed
];

// Array for Blog Post Data (Add your actual posts or placeholders)
export const blogPostsData: BlogPost[] = [
  {
    id: 'getting-started-al-dev',
    date: "April 1, 2025",
    title: {
        en: "Getting Started with AL Development for Business Central",
        pt: "Introdução ao Desenvolvimento AL para Business Central"
    },
    excerpt: {
        en: "Unlock the power of customization in Dynamics 365 Business Central. An introduction to the AL language, development environment (VS Code), and key concepts for building your first extension.",
        pt: "Desbloqueie o poder da personalização no Dynamics 365 Business Central. Uma introdução à linguagem AL, ao ambiente de desenvolvimento (VS Code) e aos conceitos-chave para construir a sua primeira extensão."
    },
    url: '/blog/getting-started-al-dev',
    tags: ['AL', 'Beginner', 'Business Central'],
    readingTime: 6,
    featured: false
  },
  // --- START: NEW BLOG POST 2 ---
  {
    id: 'bc-events-subscribers',
    date: "April 1, 2025",
    title: {
        en: "Decoupling Code in Business Central: Events & Subscribers",
        pt: "Desacoplando Código no Business Central: Eventos e Subscritores"
    },
    excerpt: {
        en: "Move beyond basic extensions. Learn how to use Business Central's event-driven architecture with Publishers and Subscribers to create clean, maintainable, and upgrade-safe customizations.",
        pt: "Vá além das extensões básicas. Aprenda a usar a arquitetura orientada a eventos do Business Central com Publicadores e Subscritores para criar personalizações limpas, fáceis de manter e seguras para atualizações."
    },
    url: '/blog/bc-events-subscribers',
    tags: ['AL', 'Events', 'Business Central'],
    readingTime: 5,
    featured: false
  },
  // --- END: NEW BLOG POST 2 ---
  // --- START: NEW BLOG POST 3 - BC Performance Killers ---
  {
    id: 'bc-al-performance-killers', // Unique ID for the performance topic
    date: "April 2 , 2025", // A new date for this post
    title: {
      en: "Beyond the FIND('-'): Unmasking Hidden Performance Killers in Your AL Queries",
      pt: "Para Lá do FIND('-'): A Desmascarar Assassinos de Desempenho Ocultos nas Suas Queries AL"
    },
    excerpt: {
      en: "Dive into the non-obvious ways your AL code interacts with the database to find hidden performance bottlenecks – from implicit joins to locking woes and mastering the Profiler.",
      pt: "Mergulhe nas formas não óbvias como o seu código AL interage com a base de dados para encontrar estrangulamentos de desempenho ocultos – de junções implícitas a problemas de bloqueio e dominar o Profiler."
    },
    url: '/blog/bc-al-performance-killers',
    tags: ['AL', 'Performance', 'Optimization'],
    readingTime: 7,
    featured: false
  },
  // --- END: NEW BLOG POST 3 - BC Performance Killers ---
  // --- START: NEW BLOG POST 4 - BC AL Interfaces ---
  {
    id: 'bc-al-interfaces', // Unique ID for the Interfaces topic
    date: "April 3, 2025", // A new date for this post
    title: {
      en: "Interface Thinking in AL: Designing for the Future of Your BC Extensions",
      pt: "Pensamento de Interface em AL: Desenhar para o Futuro das Suas Extensões BC"
    },
    excerpt: {
      en: "Explore how adopting an interface-first mindset in AL leads to more modular, testable, and maintainable Business Central extensions that are resilient to change.",
      pt: "Explore como adotar uma mentalidade de 'interface-first' em AL leva a extensões do Business Central mais modulares, testáveis e fáceis de manter, resilientes à mudança."
    },
    url: '/blog/bc-al-interfaces',
    tags: ['AL', 'Interfaces', 'Business Central'],
    readingTime: 6,
    featured: false
  },
  // --- END: NEW BLOG POST 4 - BC AL Interfaces ---
  // --- START: NEW BLOG POST 5 - BC AL Upgrade Gauntlet ---
  {
    id: 'bc-al-upgrade-gauntlet', // Unique ID for the Upgrade topic
    date: "April 4, 2025", // As requested
    title: {
      en: "Navigating the Upgrade Gauntlet: Building Extensions That Survive and Thrive Across BC Versions",
      pt: "Navegar a Pista de Obstáculos das Atualizações: Construir Extensões Que Sobrevivem e Prosperam em Várias Versões BC"
    },
    excerpt: {
      en: "Learn the strategies for designing and testing your Business Central extensions to ensure smooth, predictable upgrades through BC's continuous update cycle.",
      pt: "Aprenda as estratégias para conceber e testar as suas extensões do Business Central para garantir atualizações suaves e previsíveis ao longo do ciclo de atualizações contínuas do BC."
    },
    url: '/blog/bc-al-upgrade-gauntlet',
    tags: ['AL', 'Upgrades', 'Business Central'],
    readingTime: 5,
    featured: false
  },
  // --- END: NEW BLOG POST 5 - BC AL Upgrade Gauntlet ---
  // --- START: NEW BLOG POST 5 - BC AL Advanced Debugging ---
  {
    id: 'bc-al-advanced-debugging', // Unique ID for the Debugging topic
    date: "April 5, 2025", // As requested
    title: {
      en: "AL Debugging: Escaping the F9 Comfort Zone – Advanced Techniques for Elusive Bugs",
      pt: "Debugging em AL: Escapar da Zona de Conforto do F9 – Técnicas Avançadas para Bugs Elusivos"
    },
    excerpt: {
      en: "Breakpoints are just the start. Learn advanced AL debugging techniques like conditional breakpoints, logpoints, and deep call stack analysis to diagnose and fix complex issues faster.",
      pt: "Breakpoints são apenas o começo. Aprenda técnicas avançadas de debugging em AL como breakpoints condicionais, logpoints e análise profunda da call stack para diagnosticar e corrigir problemas complexos mais rapidamente."
    },
    url: '/blog/bc-al-advanced-debugging',
    tags: ['AL', 'Debugging', 'Techniques'],
    readingTime: 8,
    featured: false
  },
  // --- END: NEW BLOG POST 5 - BC AL Advanced Debugging ---
  // --- START: NEW BLOG POST 6 - BC AL Advanced Debugging ---
  {
    id: 'bc-al-advanced-debugging', // Unique ID for the Debugging topic
    date: "April 5, 2025", // As requested
    title: {
      en: "AL Debugging: Escaping the F9 Comfort Zone – Advanced Techniques for Elusive Bugs",
      pt: "Debugging em AL: Escapar da Zona de Conforto do F9 – Técnicas Avançadas para Bugs Elusivos"
    },
    excerpt: {
      en: "Breakpoints are just the start. Learn advanced AL debugging techniques like conditional breakpoints, logpoints, and deep call stack analysis to diagnose and fix complex issues faster.",
      pt: "Breakpoints são apenas o começo. Aprenda técnicas avançadas de debugging em AL como breakpoints condicionais, logpoints e análise profunda da call stack para diagnosticar e corrigir problemas complexos mais rapidamente."
    },
    url: '/blog/bc-al-advanced-debugging',
    tags: ['AL', 'Debugging', 'Techniques'],
    readingTime: 8,
    featured: false
  },
  // --- END: NEW BLOG POST 6 - BC AL Advanced Debugging ---
  // --- START: NEW BLOG POST 7 - BC AL Data & Transactions ---
  {
    id: 'bc-al-data-transactions', // Unique ID for the Data/Transactions topic
    date: "April 6, 2025", // As requested
    title: {
      en: "Taming Transactions and Data Operations in AL: Ensuring Integrity and Performance",
      pt: "Dominar Transações e Operações de Dados em AL: Garantir Integridade e Desempenho"
    },
    excerpt: {
      en: "Navigate the complexities of AL transactions, understand the implications of COMMIT, and learn patterns for handling large data volumes and ensuring data consistency in Business Central.",
      pt: "Navegue pelas complexidades das transações AL, compreenda as implicações do COMMIT e aprenda padrões para lidar com grandes volumes de dados e garantir consistência de dados no Business Central."
    },
    url: '/blog/bc-al-data-transactions',
    tags: ['AL', 'Transactions', 'Data Operations'],
    readingTime: 7,
    featured: false
  },
  // --- END: NEW BLOG POST 7 - BC AL Data & Transactions ---
  // --- START: NEW BLOG POST 8 - BC AL Advanced Integrations ---
  {
    id: 'bc-al-advanced-integrations', // Unique ID for the Integrations topic
    date: "April 7, 2025", // As requested
    title: {
      en: "AL Integrations: Beyond the Basics - Building Robust External Connections",
      pt: "Integrações AL: Para Lá do Básico - Construir Conexões Externas Robustas"
    },
    excerpt: {
      en: "Master advanced AL integration patterns: handle errors, manage large payloads, navigate authentication (OAuth), and ensure resilience when connecting BC to external APIs.",
      pt: "Domine padrões avançados de integração AL: trate erros, gire grandes payloads, navegue autenticação (OAuth) e garanta resiliência ao conectar BC a APIs externas.",
    },
    url: '/blog/bc-al-advanced-integrations',
    tags: ['AL', 'Integrations', 'API'],
    readingTime: 6,
    featured: false
  },
  // --- END: NEW BLOG POST 8 - BC AL Advanced Integrations ---
];