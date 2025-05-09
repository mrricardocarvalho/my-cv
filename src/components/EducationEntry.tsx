import { useTranslation } from 'react-i18next';
import { EducationItem as EducationItemType } from '../types/cv';

// Define props interface extending EducationItemType, adding language
interface EducationEntryProps {
    item: EducationItemType;
}

// Access the base path Vite is configured with
const BASE_URL = import.meta.env.BASE_URL;

function EducationEntry(props: EducationEntryProps) {
  const { item } = props;
  const { degree, institution, location, date, logo } = item;
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'pt';

  // Construct logo path
  const logoPath = logo ? `${BASE_URL}/images/logos/${logo}` : null;

  return (
    // Main container for the education entry, using flexbox
    // Consistent styling with JobEntry: flex, spacing, padding, border bottom
    <article className="flex items-start space-x-4 py-6 border-b border-gray-100 last:border-b-0">

        {/* Left Column: Logo */}
        <div className="flex-shrink-0 w-12 h-12">
          {logoPath ? (
            <img
              src={logoPath}
              alt={`${institution} logo`}
              className="w-full h-full object-contain rounded-full border border-gray-200 p-0.5"
            />
          ) : (
            <div
              className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 border border-gray-200"
              role="img"
              aria-label={`${institution} logo placeholder`}
            >
              {institution.substring(0, 1)}
            </div>
          )}
        </div>

        {/* Right Column: Text Content */}
        <div className="flex-grow">

          {/* Top Row: Degree/Certification Name */}
          {/* Slightly larger font size than job title maybe? Or keep consistent. */}
          <h3 className="text-base font-semibold text-gray-800 mb-1">
            {degree[lang]}
          </h3>

          {/* Middle Row: Institution Info with Icons */}
          <div className="flex flex-wrap items-center text-xs text-gray-500 mb-1 space-x-3"> {/* Reduced bottom margin */}
            {/* Institution Icon */}
            <span className="inline-flex items-center">
              <i className="fas fa-university fa-fw mr-1.5"></i>{institution} {/* Changed icon */}
            </span>
             {/* Location Icon */}
            <span className="inline-flex items-center">
               <i className="fas fa-map-marker-alt fa-fw mr-1.5"></i>{location}
            </span>
             {/* Date Icon */}
            <span className="inline-flex items-center">
               <i className="fas fa-calendar-alt fa-fw mr-1.5"></i>{date}
            </span>
          </div>

          {/* Optional: Add description/notes area if needed */}
          {/* <div className="mt-2 text-sm text-gray-600">
              Optional notes about the course or degree...
          </div> */}

        </div>
    </article>
  );
}

export default EducationEntry;