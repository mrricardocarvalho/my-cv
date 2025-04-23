import { useTranslation } from 'react-i18next';
import { contactInfo } from '../data/contact';
import { summaryText } from '../data/summary';
import { keyTechnicalSkills } from '../data/skills';
import OptimizedImage from './OptimizedImage';
import { useState } from 'react';

const titles = {
    en: "Senior D365 BC Developer",
    pt: "Developer Sénior D365 BC"
};

const BASE_URL = import.meta.env.BASE_URL;

function Sidebar() {
    const { t, i18n } = useTranslation();
    const [hasBackgroundError, setHasBackgroundError] = useState(false);
    const lang = i18n.language as 'en' | 'pt';

    const handleImageError = (error: string, type: 'background' | 'profile') => {
        if (type === 'background') {
            setHasBackgroundError(true);
        }
        console.error(`Failed to load ${type} image:`, error);
    };

    return (
        <aside className="bg-white rounded-lg shadow-lg sticky top-8 overflow-hidden w-full max-w-md mx-auto mb-6 lg:mb-0 lg:w-auto">
            <div className="relative">
                <OptimizedImage
                    src={`${BASE_URL}background.jpg`}
                    alt="Header background"
                    className={`w-full h-32 object-cover ${hasBackgroundError ? 'bg-gradient-to-r from-blue-100 to-blue-200' : ''}`}
                    fallback="Background"
                    onLoadError={(error) => handleImageError(error, 'background')}
                />
                <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                    <OptimizedImage
                        src={`${BASE_URL}profile.png`}
                        alt="Ricardo Carvalho"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        fallback="RC"
                        onLoadError={(error) => handleImageError(error, 'profile')}
                    />
                </div>
            </div>
            <div className="pt-14 px-6 pb-4">
                <div className="flex items-center mb-1">
                    <h1 className="text-xl font-bold text-gray-900 mr-2">Ricardo Carvalho</h1>
                    <span className="flex h-2.5 w-2.5 relative" title="Actively looking / Available">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    <span>{titles[lang]}</span>
                    <span className="mx-1.5">·</span>
                    <span>{contactInfo.location}</span>
                </div>
            </div>
            <div className="border-t border-gray-100 px-6 py-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {summaryText[lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                    {keyTechnicalSkills.map(skill => (
                        <span key={skill} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{skill}</span>
                    ))}
                </div>
            </div>
            <div className="text-center border-t border-gray-100 py-4 px-6">
                <ul className="flex justify-center space-x-5">
                    <li title={contactInfo.email}>
                        <a href={`mailto:${contactInfo.email}`} className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label="Send Email">
                            <i className="fas fa-envelope fa-lg"></i>
                        </a>
                    </li>
                    <li title={t('linkedinLinkText')}>
                        <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label={t('linkedinLinkText')}>
                            <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                    </li>
                    {contactInfo.githubUrl && (
                        <li title={t('githubLinkText')}>
                            <a href={contactInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label={t('githubLinkText')}>
                                <i className="fab fa-github fa-lg"></i>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            {/* Language Toggle for i18n */}
            <div className="border-t border-gray-100 py-4 px-6 text-center">
                <div className="inline-flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-500">EN</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-sm toggle-primary align-middle"
                        checked={lang === 'pt'}
                        onChange={() => i18n.changeLanguage(lang === 'en' ? 'pt' : 'en')}
                        aria-label="Toggle Language"
                    />
                    <span className="text-xs font-medium text-gray-500">PT</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
