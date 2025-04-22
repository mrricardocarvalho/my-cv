// src/data/experience.ts
import { Job } from '../types/cv';

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
    id: 'job2',
    title: {
      en: "Senior Dynamics NAV Developer",
      pt: "Developer Sénior Dynamics NAV"
    },
    company: "Sysmatch",
    location: "Lisbon",
    date: "Nov 2018 – Feb 2020",
    logo: 'sysmatchpt.png',
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
    logo: 'sysmatchpt.png',
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
    id: 'job4',
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
    id: 'job5',
    title: {
      en: "Sage X3 Developer",
      pt: "Developer Sage X3"
    },
    company: "Sage Portugal",
    location: "Lisbon",
    date: "Mar 2014 – Nov 2016",
    logo: 'sagept.png',
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
    id: 'job6',
    title: {
      en: "Dynamics NAV Developer",
      pt: "Developer Dynamics NAV"
    },
    company: "Aptra - Consultoria em Sistemas de Informação",
    location: "Bobadela",
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
    id: 'job7',
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
    id: 'job8',
    title: {
      en: "IT Consultant (Microsoft Dynamics NAV)",
      pt: "Consultor de TI (Microsoft Dynamics NAV)"
    },
    company: "JD Solutions - Link",
    location: "Algés",
    date: "Dec 2004 – Dec 2006",
    logo: '',
    employmentType: { en: 'Full-time', pt: 'Tempo Inteiro' },
    responsibilities: [
      {
        en: "Delivered customized Dynamics NAV solutions and version upgrades for corporate clients including Wyeth, Mundicenter, and GFK, ensuring operational continuity and system optimization.",
        pt: "Implementei soluções Dynamics NAV personalizadas e atualizações de versão para clientes corporativos como Wyeth, Mundicenter e GFK, garantindo continuidade operacional e otimização do sistema."
      }
    ]
  }
];
