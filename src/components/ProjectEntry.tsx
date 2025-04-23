import { useTranslation } from 'react-i18next';
import { Project as ProjectType } from '../types/cv';
import OptimizedImage from './OptimizedImage';

// Remove currentLanguage from props
type ProjectEntryProps = {
    project: ProjectType;
};

// Access the base path Vite is configured with
const BASE_URL = import.meta.env.BASE_URL;

function ProjectEntry(props: ProjectEntryProps) {
    const { project: { name, type, role, date, summary, logo, url } } = props;
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';

    return (
        <div className="mb-8 last:mb-0">
            <div className="flex items-start bg-white/80 rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1">
                {logo && (
                    <OptimizedImage
                        src={`${BASE_URL}images/logos/${logo}`}
                        alt={`${name[lang]} logo`}
                        className="w-12 h-12 rounded-md object-cover mr-4 bg-gray-50 border border-gray-200"
                        fallback={
                            <div
                                className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-700 border border-gray-200"
                                role="img"
                                aria-label={`${name[lang]} logo placeholder`}
                            >
                                {name[lang].charAt(0)}
                            </div>
                        }
                        onLoadError={(error) => {
                            console.error(`Failed to load project logo for ${name[lang]}:`, error);
                        }}
                    />
                )}
                <div className="flex-1 min-w-0">
                    {/* Project Header: Name and Type */}
                    <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {url ? (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                >
                                    {name[lang]}
                                </a>
                            ) : (
                                name[lang]
                            )}
                        </h3>
                        {type && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0">
                                {type[lang]}
                            </span>
                        )}
                    </div>
                    {/* Middle Row: Role and Date */}
                    <div className="flex flex-wrap items-center text-xs text-gray-500 mb-3 space-x-3">
                        {/* Role Icon */}
                        <span className="inline-flex items-center">
                            <i className="fas fa-user-tie fa-fw mr-1.5"></i>{role[lang]}
                        </span>
                        {/* Date Icon */}
                        <span className="inline-flex items-center">
                           <i className="fas fa-calendar-alt fa-fw mr-1.5"></i>{date}
                        </span>
                    </div>
                    {/* Bottom: Summary Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {summary[lang]}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectEntry;