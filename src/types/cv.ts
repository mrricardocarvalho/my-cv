// src/types/cv.ts

// Helper type for translatable strings
export type TranslatableString = {
  en: string;
  pt: string;
};

export interface Job {
  id: string;
  title: TranslatableString;
  company: string;
  location: string;
  date: string;
  logo?: string;
  responsibilities: TranslatableString[];
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
  title: TranslatableString;
  skills: string[];
}

export interface Language {
  id: string;
  name: TranslatableString;
  level: TranslatableString;
}

export interface Project {
  id: string;
  name: TranslatableString;
  type?: TranslatableString;
  role: TranslatableString;
  date: string;
  summary: TranslatableString;
  logo?: string;
  url?: string;
  tags?: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  date: string;
  title: TranslatableString;
  excerpt: TranslatableString;
  url: string;
  tags?: string[];
  readingTime?: number;
  featured?: boolean;
}
