// Import the refactored EducationEntry component
import EducationEntry from './EducationEntry';
// Import the data and labels
import { educationHistory } from '../data/education';
import { labels } from '../data/labels';

// Define props interface (remains the same)
interface EducationSectionProps {
    currentLanguage: 'en' | 'pt';
}

function EducationSection(props: EducationSectionProps) {
  const { currentLanguage } = props;

  return (
    // Use a standard HTML section tag
    // Add bottom margin to separate from the next section
    <section className="mb-8">

      {/* Section Heading - Styled consistently with other sections */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Font Awesome Icon */}
        <i className="fas fa-graduation-cap fa-fw text-blue-600 mr-3"></i>
        {/* Use the label for the section title */}
        {labels.education[currentLanguage]}
      </h2>

      {/* Container for the list of education entries */}
      <div>
        {/* Map over the education history data */}
        {educationHistory.map((eduItem) => (
           // Render the refactored EducationEntry component
           <EducationEntry
              key={eduItem.id} // Use unique ID for the key
              item={eduItem} // Pass the specific education item object
              currentLanguage={currentLanguage} // Pass language
           />
        ))}
      </div>

    </section>
  );
}

export default EducationSection;