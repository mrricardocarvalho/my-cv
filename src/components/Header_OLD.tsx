import { contactInfo } from '../data/contact';
import { labels } from '../data/labels';

const titles = {
    en: "Dynamics BC/NAV Engineer & Developer",
    pt: "Engenheiro & Developer Dynamics BC/NAV"
};

interface HeaderProps {
  currentLanguage: 'en' | 'pt';
  onToggleLanguage: () => void;
}

function Header(props: HeaderProps) {
  const { currentLanguage } = props;

  return (
    <header className="p-6 md:p-8 bg-primary text-primary-content relative pb-4">
      {/* Name and Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-1">Ricardo Filipe Dias Sampaio de Carvalho</h1>
      <h2 className="text-xl md:text-2xl font-light opacity-90 mb-4">{titles[currentLanguage]}</h2>

      {/* Contact Icons List */}
      {/* Adjusted spacing/layout for icons only */}
      <ul className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
         {/* Email Icon Link */}
         <li title={contactInfo.email}> {/* Add title attribute for hover tooltip */}
             <a
                href={`mailto:${contactInfo.email}`}
                className="text-primary-content/80 hover:text-accent transition-colors duration-200"
                aria-label="Send Email" // Accessibility label
             >
                 {/* Increased icon size */}
                 <i className="fas fa-envelope fa-fw text-2xl"></i>
                 {/* Text removed */}
             </a>
         </li>

         {/* LinkedIn Icon Link */}
         <li title={labels.linkedinLinkText[currentLanguage]}> {/* Use translated title */}
             <a
                href={contactInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-content/80 hover:text-accent transition-colors duration-200"
                aria-label={labels.linkedinLinkText[currentLanguage]} // Accessibility label
            >
                 <i className="fab fa-linkedin fa-fw text-2xl"></i>
                 {/* Text removed */}
             </a>
         </li>

         {/* GitHub Icon Link (Conditional) */}
         { contactInfo.githubUrl && (
             <li title={labels.githubLinkText?.[currentLanguage] ?? 'GitHub Profile'}> {/* Optional chaining & fallback title */}
                 <a
                    href={contactInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-content/80 hover:text-accent transition-colors duration-200"
                    aria-label={labels.githubLinkText?.[currentLanguage] ?? 'GitHub Profile'} // Accessibility label
                 >
                     <i className="fab fa-github fa-fw text-2xl"></i>
                     {/* Text removed */}
                 </a>
             </li>
         )}

         {/* Phone and Location commented out as requested */}
         {/*
         <li className="flex items-center">
            <i className="fas fa-phone fa-fw mr-2 opacity-80"></i>
            <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:text-accent">{contactInfo.phone}</a>
         </li>
         <li className="flex items-center">
              <i className="fas fa-map-marker-alt fa-fw mr-2 opacity-80"></i>
              <span>{contactInfo.location}</span>
         </li>
         */}
      </ul>

      {/* Language Toggle Switch remains the same */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {/* ... toggle switch code ... */}
      </div>
    </header>
  );
}

export default Header;