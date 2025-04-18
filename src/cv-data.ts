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
    date: "Feb 2020 – Present",
    logo: 'microsoft-logo.png',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },
    responsibilities: [
      // Option 1 (Focus on Resolution & Scope)
      {
        en: "**Spearheaded resolution** of complex Dynamics 365 Business Central (BC) technical escalations for Tier 1/2 partners and direct customers across EMEA, consistently exceeding SLA targets (>95% resolution rate).",
        pt: "**Liderei a resolução** de escalações técnicas complexas do Dynamics 365 Business Central (BC) para parceiros Tier 1/2 e clientes diretos na região EMEA, excedendo consistentemente as metas de SLA (>95% taxa de resolução)."
      },
      // Option 2 (Focus on Technical Depth)
      {
        en: "**Performed deep-dive technical analysis** and debugging of intricate BC issues involving AL application logic, SQL database performance bottlenecks, API integrations, and Azure service dependencies.",
        pt: "**Realizei análise técnica aprofundada** e depuração de problemas intrincados do BC envolvendo lógica aplicacional AL, gargalos de desempenho da base de dados SQL, integrações API e dependências de serviços Azure."
      },
      // Option 3 (Focus on Collaboration & Impact)
      {
        en: "**Functioned as a key liaison** between customers/partners and Microsoft internal teams (Escalation, Product Group), facilitating rapid bug fixes and driving solutions for critical, business-impacting issues.",
        pt: "**Funcionei como elo de ligação chave** entre clientes/parceiros e equipas internas da Microsoft (Escalation, Product Group), facilitando correções rápidas de bugs e impulsionando soluções para problemas críticos com impacto no negócio."
      },
      // Option 4 (Focus on Knowledge Sharing - Quantify!)
      // {
      //   en: "**Authored and maintained ~25+ technical documents**, including official Knowledge Base articles, troubleshooting guides, and internal training materials, demonstrably reducing recurring support requests.", // Be realistic with the number!
      //   pt: "**Criei e mantive ~25+ documentos técnicos**, incluindo artigos oficiais da Knowledge Base, guias de troubleshooting e materiais de formação interna, reduzindo demonstravelmente pedidos de suporte recorrentes." // Seja realista com o número!
      // },
      // Option 5 (Focus on Expertise & Guidance)
      {
        en: "**Provided expert guidance** on BC configuration, customization best practices, and upgrade strategies, empowering partners and customers to optimize their system usage and avoid common pitfalls.",
        pt: "**Forneci orientação especializada** sobre configuração do BC, melhores práticas de personalização e estratégias de atualização, capacitando parceiros e clientes a otimizar o uso do sistema e evitar erros comuns."
      },
      // Option 6 (Focus on Product Improvement)
      {
        en: "**Systematically identified, reproduced, and documented** software defects and usability gaps, providing actionable feedback that directly contributed to prioritized fixes and enhancements in subsequent BC releases.",
        pt: "**Identifiquei, reproduzi e documentei sistematicamente** defeitos de software e lacunas de usabilidade, fornecendo feedback acionável que contribuiu diretamente para correções priorizadas e melhorias em lançamentos subsequentes do BC."
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
      // Option 1 (Focus on Solution Architecture & Scope)
      {
        en: "**Architected and developed** bespoke Dynamics NAV (C/AL) solutions for key accounts, including specialized modules for multi-country Healthcare operations (Portugal, Angola, Mozambique).",
        pt: "**Arquitetei e desenvolvi** soluções Dynamics NAV (C/AL) personalizadas para contas-chave, incluindo módulos especializados para operações de Saúde multinacionais (Portugal, Angola, Moçambique)."
      },
      // Option 2 (Focus on Integration Complexity)
      {
        en: "**Engineered complex XML-based integrations** connecting Dynamics NAV with external systems (LIMS, Billing Portals, Logistics), ensuring reliable bi-directional data flow.",
        pt: "**Desenvolvi integrações complexas baseadas em XML** conectando o Dynamics NAV com sistemas externos (LIMS, Portais de Faturação, Logística), garantindo fluxo de dados bidirecional confiável."
      },
      // Option 3 (Focus on Technical Ownership & Maintenance)
      {
        en: "**Provided end-to-end technical ownership** for assigned client NAV environments, managing maintenance cycles, performance tuning (SQL/C/AL), and critical support resolution.",
        pt: "**Forneci responsabilidade técnica ponta-a-ponta** para ambientes NAV de clientes atribuídos, gerindo ciclos de manutenção, otimização de desempenho (SQL/C/AL) e resolução de suporte crítico."
      },
      // Option 4 (Focus on Process Improvement & Best Practices)
      {
        en: "**Identified bottlenecks and optimized NAV deployment methodologies**, contributing to the standardization of team best practices and reducing implementation lead times.",
        pt: "**Identifiquei gargalos e otimizei metodologias de implementação do NAV**, contribuindo para a padronização das melhores práticas da equipa e reduzindo os tempos de implementação."
      },
      // Option 5 (Focus on User Enablement)
      // {
      //   en: "**Delivered targeted technical training sessions** and created user documentation for custom NAV modules, resulting in improved end-user adoption and reduced support overhead.",
      //   pt: "**Ministrei sessões de formação técnica direcionadas** e criei documentação de utilizador para módulos NAV personalizados, resultando numa melhor adoção pelo utilizador final e redução da sobrecarga de suporte."
      // }
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
      // Choose ONE or TWO of these that best fit, or combine:
      {
        en: "**Analyzed client requirements** and participated in solution design & UAT for Dynamics AX implementations.",
        pt: "**Analisei requisitos de clientes** e participei no design de soluções e UAT para implementações Dynamics AX."
      },
      {
        en: "**Utilized Microsoft telemetry data** to analyze system usage/performance and inform client support strategies.",
        pt: "**Utilizei dados de telemetria da Microsoft** para analisar uso/desempenho do sistema e informar estratégias de suporte ao cliente."
      },
        {
        en: "**Provided application support** for Dynamics AX, resolving functional and technical user queries.",
        pt: "**Prestei suporte aplicacional** para Dynamics AX, resolvendo questões funcionais e técnicas de utilizadores."
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
      // Option 1 (Focus on Implementation & Industry Exposure)
      {
        en: "**Led full-cycle Dynamics NAV implementation projects**, including analysis, C/AL development, data migration, and go-live support for clients in diverse technical sectors.",
        pt: "**Liderei projetos de implementação Dynamics NAV de ciclo completo**, incluindo análise, desenvolvimento C/AL, migração de dados e suporte go-live para clientes em diversos setores técnicos."
      },
      // Option 2 (Focus on Custom Development Impact)
      {
        en: "**Developed significant C/AL customizations and extensions** for NAV, enhancing core modules and delivering tailored functionality to meet specific client business processes.",
        pt: "**Desenvolvi personalizações e extensões C/AL significativas** para o NAV, melhorando módulos centrais e entregando funcionalidades à medida para processos de negócio específicos do cliente."
      },
      // Option 3 (Focus on Integration & Support within Outsourcing)
      {
        en: "**Designed and implemented XML integrations** and provided ongoing high-level NAV technical support and administration within an outsourced services context.",
        pt: "**Projetei e implementei integrações XML** e forneci suporte técnico NAV de alto nível contínuo e administração num contexto de serviços de outsourcing."
      }
      // Option 4 (Alternative focus - Combine points if needed)
      // {
      //   en: "**Managed end-to-end NAV projects (Analysis, C/AL Dev, Migration, Support)** for technical sector clients, delivering bespoke extensions and integrations.",
      //   pt: "**Geri projetos NAV ponta-a-ponta (Análise, Dev C/AL, Migração, Suporte)** para clientes do setor técnico, entregando extensões e integrações personalizadas."
      // }
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
      // Option 1 (Focus on Localization - highly valuable skill)
      {
          en: "**Developed and maintained compliant Portugal-specific localizations** (IES, SAF-T/PT [Caixa IVA]) within the Sage X3 ERP system.", // Added SAF-T for more keyword relevance
          pt: "**Desenvolvi e mantive localizações específicas para Portugal em conformidade** (IES, SAF-T/PT [Caixa IVA]) dentro do sistema ERP Sage X3." // Adicionado SAF-T
      },
      // Option 2 (Focus on Tech Exposure - Combine points)
      {
          en: "**Gained proficiency in Sage X3 ERP development** using its native 4GL environment and JavaScript for specific customizations and maintenance tasks.",
          pt: "**Adquiri proficiência no desenvolvimento do ERP Sage X3** usando o seu ambiente 4GL nativo e JavaScript para personalizações específicas e tarefas de manutenção."
      }
      // Choose EITHER Option 1 & 2, OR just Option 1 if you want it very brief.
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
      // Option 1 (Focus on Add-on Development - Preferred)
      {
          en: "**Designed, developed, and implemented custom Dynamics NAV Add-ons** tailored for Portuguese Municipal Councils, including modules for Workflow, Document Management (ArchiveLink), Urbanism, and Public Works.",
          pt: "**Projetei, desenvolvi e implementei Add-ons NAV personalizados** à medida para Câmaras Municipais Portuguesas, incluindo módulos para Workflow, Gestão Documental (ArchiveLink), Urbanismo e Obras Públicas."
      },
      // Option 2 (Add context about clients/support if needed, combine with above if desired)
      {
          en: "**Provided implementation support** for these custom modules to key public sector clients (e.g., AMAT, EGEAC) and managed the internal NAV system.",
          pt: "**Prestei suporte de implementação** para estes módulos personalizados a clientes chave do setor público (ex: AMAT, EGEAC) e geri o sistema NAV interno."
      }
      // Choose primarily Option 1. Option 2 adds context but might make it too long.
      // Consider merging slightly if needed: "... Public Works, supporting key clients like AMAT & EGEAC during rollout."
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
      // Option 1 (Focus on Project Lead & Client Diversity - Combine points)
      {
          en: "**Led end-to-end Dynamics NAV implementation projects** across diverse sectors (Education, Non-Profit, Services), managing analysis, C/Side development, deployment, and support.",
          pt: "**Liderei projetos de implementação Dynamics NAV ponta-a-ponta** em diversos setores (Educação, Terceiro Setor, Serviços), gerindo análise, desenvolvimento C/Side, implementação e suporte."
      },
      // Option 2 (Focus on Specialized Development)
      {
          en: "**Developed and deployed specialized NAV Add-ons**, notably creating solutions for Private School management and enhancements for Public Sector Accounting standards.",
          pt: "**Desenvolvi e implementei Add-ons NAV especializados**, destacando-se a criação de soluções para gestão de Colégios Privados e melhorias para normas de Contabilidade Pública."
      },
      // Option 3 (Focus on Business Acumen & Training - Combine points)
      {
          en: "**Contributed significantly to pre-sales efforts** through technical demonstrations and solution proposals, and delivered C/Side development training to clients.",
          pt: "**Contribuí significativamente para esforços de pré-venda** através de demonstrações técnicas e propostas de solução, e ministrei formação de desenvolvimento C/Side a clientes."
      }
      // Choose 2 or 3 of these options. All three provide a good overview.
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
          en: "**Implemented, customized, and supported Dynamics NAV solutions** for diverse corporate clients (e.g., Wyeth, Mundicenter, GFK); performed version upgrades.",
          pt: "**Implementei, personalizei e suportei soluções Dynamics NAV** para diversos clientes corporativos (ex: Wyeth, Mundicenter, GFK); realizei atualizações de versão."
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
    en: "Dynamics 365 Business Central Developer with 15+ years' experience delivering high-impact ERP solutions across EMEA. Specializes in custom development, complex integrations (API/XML/JSON), performance tuning, and advanced technical support. Proven ability to lead development efforts, solve challenging technical problems, and ensure successful project delivery and client satisfaction.",
    pt: "Developer Dynamics 365 Business Central com mais de 15 anos de experiência na entrega de soluções ERP de alto impacto na região EMEA. Especializado em desenvolvimento personalizado, integrações complexas (API/XML/JSON), otimização de desempenho e suporte técnico avançado. Capacidade comprovada para liderar esforços de desenvolvimento, resolver problemas técnicos desafiadores e garantir a entrega bem-sucedida de projetos e a satisfação do cliente."
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
    logo: 'client-x-logo.png', // Example
    url: '#' // Placeholder URL
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
    logo: 'react-logo.png', // Example
    url: '#' // Placeholder URL to your actual CV site later
  },
  // Add more projects as needed
];

// Array for Blog Post Data (Add your actual posts or placeholders)
export const blogPostsData: BlogPost[] = [
  // --- START: NEW BLOG POST 1 ---
  {
    id: 'getting-started-al-dev',
    date: "April 18, 2025",
    title: {
        en: "Getting Started with AL Development for Business Central",
        pt: "Introdução ao Desenvolvimento AL para Business Central"
    },
    excerpt: {
        en: "Unlock the power of customization in Dynamics 365 Business Central. An introduction to the AL language, development environment (VS Code), and key concepts for building your first extension.",
        pt: "Desbloqueie o poder da personalização no Dynamics 365 Business Central. Uma introdução à linguagem AL, ao ambiente de desenvolvimento (VS Code) e aos conceitos-chave para construir a sua primeira extensão."
    },
    url: '/blog/getting-started-al-dev',
  },
  // --- END: NEW BLOG POST 1 ---

  // --- START: NEW BLOG POST 2 ---
  {
    id: 'bc-events-subscribers',
    date: "April 25, 2025",
    title: {
        en: "Decoupling Code in Business Central: Events & Subscribers",
        pt: "Desacoplando Código no Business Central: Eventos e Subscritores"
    },
    excerpt: {
        en: "Move beyond basic extensions. Learn how to use Business Central's event-driven architecture with Publishers and Subscribers to create clean, maintainable, and upgrade-safe customizations.",
        pt: "Vá além das extensões básicas. Aprenda a usar a arquitetura orientada a eventos do Business Central com Publicadores e Subscritores para criar personalizações limpas, fáceis de manter e seguras para atualizações."
    },
    url: '/blog/bc-events-subscribers',
  },
  // --- END: NEW BLOG POST 2 ---
];