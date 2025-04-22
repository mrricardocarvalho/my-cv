// src/data/education.ts
import { EducationItem } from '../types/cv';

export const educationHistory: EducationItem[] = [
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
  }
];
