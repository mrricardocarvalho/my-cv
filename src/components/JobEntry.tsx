import { Job as JobType } from '../types/cv';
import OptimizedImage from './OptimizedImage';
import { useTranslation } from 'react-i18next';

// Define props interface extending JobType, adding language
interface JobEntryProps extends Omit<JobType, 'id'> {}

// Access the base path Vite is configured with
const BASE_URL = import.meta.env.BASE_URL;

function JobEntry(props: JobEntryProps) {
  const { title, company, location, date, logo, employmentType, responsibilities } = props;
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'pt';

  // Construct logo path from public/images/logos directory
  const logoPath = logo ? `${BASE_URL}images/logos/${logo}` : null; // Handle missing logo

  // Helper function for rendering responsibilities remains the same
  const renderResponsibility = (textObj: { en: string; pt: string }) => {
    const html = textObj[lang].replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-700">$1</strong>'
    );
    return <p className="text-sm text-gray-600 mb-1" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    // Main container for the job entry, using flexbox for layout
    // Added border-b for separation instead of wrapping in a card/border
    <article className="flex items-start space-x-4 py-6 border-b border-gray-100 last:border-b-0"> {/* Use py-6, last:border-b-0 removes border for last item */}

        {/* Left Column: Logo */}
        <div className="flex-shrink-0 w-12 h-12"> {/* Fixed size for logo area */}
          {logoPath ? (
            <OptimizedImage
              src={logoPath}
              alt={`${company} logo`}
              className="w-full h-full object-contain rounded-full border border-gray-200 p-0.5"
              fallback={
                <div
                  className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 border border-gray-200"
                  role="img"
                  aria-label={`${company} logo placeholder`}
                >
                  {company.substring(0, 1)}
                </div>
              }
            />
          ) : (
            <div
              className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 border border-gray-200"
              role="img"
              aria-label={`${company} logo placeholder`}
            >
              {company.substring(0, 1)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <h3 className="text-base font-semibold text-gray-900">
              {title[lang]}
            </h3>
            {employmentType && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-700 font-medium">
                {employmentType[lang]}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center text-xs text-gray-500 mb-1 space-x-3">
            <span className="inline-flex items-center">
              <i className="fas fa-building fa-fw mr-1.5"></i>{company}
            </span>
            <span className="inline-flex items-center">
              <i className="fas fa-map-marker-alt fa-fw mr-1.5"></i>{location}
            </span>
            <span className="inline-flex items-center">
              <i className="fas fa-calendar-alt fa-fw mr-1.5"></i>{date}
            </span>
          </div>
          <div className="mt-2">
            {responsibilities.map((resp, idx) => (
              <div key={idx}>{renderResponsibility(resp)}</div>
            ))}
          </div>
        </div>
    </article>
  );
}

export default JobEntry;