// This component is now designed to render *within* the Sidebar
// Import necessary data and types
import {
    technicalSkills,
    languages,
    labels, // Keep labels import
    SkillCategory,
    Language as LanguageType
} from '../cv-data';

// Define props interface - only needs language now
interface SkillsSectionProps {
    currentLanguage: 'en' | 'pt';
}

function SkillsSection(props: SkillsSectionProps) {
  const { currentLanguage } = props;

  return (
    // Use a React Fragment <>...</> as the outer wrapper,
    // because the container/styling (like borders) will be handled by Sidebar.tsx
    <>
      {/* Technical Skills Subsection */}
      <div className="mb-6"> {/* Spacing below technical skills */}
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">
            {/* Use label for subheading */}
            {labels.technicalSkillsSubheading[currentLanguage]}
        </h3>
        {/* Map through each category within technicalSkills */}
        {technicalSkills.map((category: SkillCategory) => (
            // Spacing below each category block
            <div key={category.id} className="mb-3">
                 {/* Category title - styled for sidebar */}
                 <h4 className="text-sm font-semibold text-blue-600 mb-1.5">
                    {category.title[currentLanguage]}
                 </h4>
                 {/* Badges container */}
                 <div className="flex flex-wrap gap-1"> {/* Small gap between badges */}
                    {/* Map through skills within the category */}
                    {category.skills.map(skill => (
                        // Sidebar badge style: small, gray background
                        <span key={skill} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">{skill}</span>
                    ))}
                 </div>
            </div>
        ))}
         {/* Optional: Add indicator if list is truncated */}
         {/* <p className="text-xs text-gray-400 mt-1">...</p> */}
      </div>

      {/* Languages Subsection */}
      <div> {/* No bottom margin needed if it's the last item in this group */}
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">
            {/* Use label for subheading */}
            {labels.languages[currentLanguage]}
        </h3>
         <ul className="text-sm text-gray-700 space-y-1">
             {languages.map((lang: LanguageType) => (
                <li key={lang.id}>
                    <span className='font-medium text-gray-800'>{lang.name[currentLanguage]}:</span> {lang.level[currentLanguage]}
                </li>
             ))}
         </ul>
      </div>

      {/* Professional Competencies section REMOVED from here */}

    </> // Close React Fragment
  );
}

// Export statement might need adjustment if Sidebar directly includes this logic
// For now, let's keep it exportable, although it might not be directly imported by App anymore.
export default SkillsSection;