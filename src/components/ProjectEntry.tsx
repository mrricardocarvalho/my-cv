import { Project as ProjectType } from '../cv-data';
import OptimizedImage from './OptimizedImage';

// Define props interface extending ProjectType, adding language
interface ProjectEntryProps {
    project: ProjectType; // Pass the whole project object
    currentLanguage: 'en' | 'pt';
}

// Access the base path Vite is configured with
const BASE_URL = import.meta.env.BASE_URL;

function ProjectEntry(props: ProjectEntryProps) {
    const { project: { name, type, role, date, summary, logo, url }, currentLanguage } = props;

    return (
        <div className="mb-8 last:mb-0">
            <div className="flex items-start">
                {logo && (
                    <OptimizedImage
                        src={`${BASE_URL}images/logos/${logo}`}
                        alt={`${name[currentLanguage]} logo`}
                        className="w-12 h-12 rounded-md object-cover mr-4 bg-gray-50"
                        fallback={
                            <div
                                className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-700 border border-gray-200"
                                role="img"
                                aria-label={`${name[currentLanguage]} logo placeholder`}
                            >
                                {name[currentLanguage].charAt(0)}
                            </div>
                        }
                        onLoadError={(error) => {
                            console.error(`Failed to load project logo for ${name[currentLanguage]}:`, error);
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
                                    {name[currentLanguage]}
                                </a>
                            ) : (
                                name[currentLanguage]
                            )}
                        </h3>
                        {type && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0">
                                {type[currentLanguage]}
                            </span>
                        )}
                    </div>

                    {/* Middle Row: Role and Date */}
                    <div className="flex flex-wrap items-center text-xs text-gray-500 mb-3 space-x-3">
                        {/* Role Icon */}
                        <span className="inline-flex items-center">
                            <i className="fas fa-user-tie fa-fw mr-1.5"></i>{role[currentLanguage]}
                        </span>
                        {/* Date Icon */}
                        <span className="inline-flex items-center">
                           <i className="fas fa-calendar-alt fa-fw mr-1.5"></i>{date}
                        </span>
                    </div>

                    {/* Bottom: Summary Description */}
                    {/* Using simple paragraph for summary */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {summary[currentLanguage]}
                    </p>

                    {/* Optional: Display technologies if added to data */}
                    {/* {project.technologies && (
                        <div className="mt-3 flex flex-wrap gap-1">
                            {project.technologies.map(tech => (
                                <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{tech}</span>
                            ))}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default ProjectEntry;