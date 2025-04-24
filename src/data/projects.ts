// src/data/projects.ts
import { Project } from '../types/cv';

export const projectsData: Project[] = [
    {
        id: "my-cv",
        name: {
            en: "Personal Portfolio Website",
            pt: "Website Portfólio Pessoal"
        },
        type: {
            en: "Personal",
            pt: "Pessoal"
        },
        role: {
            en: "Full Stack Developer",
            pt: "Desenvolvedor Full Stack"
        },
        date: "2024",
        summary: {
            en: "Modern portfolio website built with React, TypeScript, and TailwindCSS. Features responsive design, i18n support, and dark mode.",
            pt: "Website moderno de portfólio construído com React, TypeScript e TailwindCSS. Possui design responsivo, suporte a i18n e modo escuro."
        },
        tags: ["React", "TypeScript", "TailwindCSS", "i18n"],
        featured: true,
        url: "https://github.com/MrRicardoCarvalho/my-cv"
    },
    {
        id: "bc-al-tools",
        name: {
            en: "BC AL Development Tools",
            pt: "Ferramentas de Desenvolvimento BC AL"
        },
        type: {
            en: "Professional",
            pt: "Profissional"
        },
        role: {
            en: "Lead Developer",
            pt: "Desenvolvedor Líder"
        },
        date: "2023",
        summary: {
            en: "Collection of AL development tools and utilities for Business Central, improving development workflow and code quality.",
            pt: "Coleção de ferramentas e utilitários de desenvolvimento AL para Business Central, melhorando o fluxo de trabalho e a qualidade do código."
        },
        tags: ["AL", "Business Central", "Development Tools"],
        featured: true
    },
    {
        id: "integration-framework",
        name: {
            en: "Integration Framework for D365 BC",
            pt: "Framework de Integração para D365 BC"
        },
        type: {
            en: "Professional",
            pt: "Profissional"
        },
        role: {
            en: "Solution Architect",
            pt: "Arquiteto de Soluções"
        },
        date: "2022-2023",
        summary: {
            en: "Designed and implemented a robust integration framework for D365 Business Central, enabling seamless data exchange with external systems.",
            pt: "Projetou e implementou um framework robusto de integração para D365 Business Central, permitindo troca de dados perfeita com sistemas externos."
        },
        tags: ["D365 BC", "Integration", "API", "AL"],
        featured: true
    }
];
