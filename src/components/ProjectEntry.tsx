// Import the Project type definition
import { Project as ProjectType } from '../cv-data';

// Define props interface extending ProjectType, adding language
interface ProjectEntryProps {
    project: ProjectType; // Pass the whole project object
    currentLanguage: 'en' | 'pt';
}

function ProjectEntry(props: ProjectEntryProps) {
  const { project, currentLanguage } = props;
  const { name, type, role, date, summary, logo, url } = project; // Destructure project

  // Construct logo path
  const logoPath = logo ? `/images/logos/${logo}` : null;

  return (
    // Main container using flexbox, consistent styling
    <article className="flex items-start space-x-4 py-6 border-b border-gray-100 last:border-b-0">

        {/* Left Column: Logo */}
        <div className="flex-shrink-0 w-12 h-12">
          {logoPath ? (
            <img
              src={logoPath}
              alt={`${name[currentLanguage]} logo`}
              className="w-full h-full object-contain rounded-md border border-gray-200 p-0.5" // Allow non-circular logos, rounded-md
            />
          ) : (
            // Fallback placeholder using first letter of project name
            <div className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500 border border-gray-200">
              {name[currentLanguage].substring(0, 1)}
            </div>
          )}
        </div>

        {/* Right Column: Text Content */}
        <div className="flex-grow">

          {/* Top Row: Project Name and Type/URL */}
          <div className="flex justify-between items-start mb-1"> {/* items-start align top */}
            <h3 className="text-base font-semibold text-gray-800">
              {name[currentLanguage]}
            </h3>
            {/* Display URL as a link icon if present, otherwise display Type */}
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" title="Visit Project" className="text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0">
                <i className="fas fa-external-link-alt"></i>
              </a>
            ) : type && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0">
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
    </article>
  );
}

export default ProjectEntry;