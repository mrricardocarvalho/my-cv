// src/components/JobEntry.tsx
import React from 'react';
import { Job as JobType } from '../types/cv';
import OptimizedImage from './OptimizedImage';

// Define props interface extending JobType, adding language
interface JobEntryProps extends Omit<JobType, 'id'> {
    currentLanguage: 'en' | 'pt';
}

// Access the base path Vite is configured with
const BASE_URL = import.meta.env.BASE_URL;

function JobEntry(props: JobEntryProps) {
  const {
      currentLanguage,
      title,
      company,
      location,
      date,
      logo, // Get logo filename from props
      employmentType, // Get employment type
      responsibilities
    } = props;

  // Construct logo path from public/images/logos directory
  const logoPath = logo ? `${BASE_URL}images/logos/${logo}` : null; // Handle missing logo

  // Helper function for rendering responsibilities remains the same
  const renderResponsibility = (textObj: { en: string; pt: string }) => {
    const html = textObj[currentLanguage].replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-700">$1</strong>'
    );
    // Use text-sm for list item font size, text-gray-600 for slightly lighter text
    // Removed list-disc/list-inside, using simple paragraphs now per demo style
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

        {/* Right Column: Text Content */}
        <div className="flex-grow"> {/* Takes remaining space */}

          {/* Top Row: Title and Employment Type */}
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-base font-semibold text-gray-800">
              {title[currentLanguage]}
            </h3>
            {employmentType && (
               // Badge for employment type, styled like demo
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {employmentType[currentLanguage]}
              </span>
            )}
          </div>

          {/* Middle Row: Company Info with Icons */}
          <div className="flex flex-wrap items-center text-xs text-gray-500 mb-3 space-x-3"> {/* Smaller text, gray, margin, spacing */}
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

          {/* Bottom: Responsibilities/Description */}
          <div className="space-y-1"> {/* Add space between paragraphs */}
            {responsibilities.map((resp, index) => (
              <React.Fragment key={index}>
                {renderResponsibility(resp)}
              </React.Fragment>
            ))}
          </div>
        </div>
    </article>
  );
}

export default JobEntry;