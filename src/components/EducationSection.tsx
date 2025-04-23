import { useTranslation } from 'react-i18next';
// Import the refactored EducationEntry component
import EducationEntry from './EducationEntry';
// Import the data and labels
import { educationHistory } from '../data/education';

function EducationSection() {
  const { t } = useTranslation();
  return (
    // Use a standard HTML section tag
    // Add bottom margin to separate from the next section
    <section className="mb-8">

      {/* Section Heading - Styled consistently with other sections */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Font Awesome Icon */}
        <i className="fas fa-graduation-cap fa-fw text-blue-600 mr-3"></i>
        {/* Use the label for the section title */}
        {t('education')}
      </h2>

      {/* Container for the list of education entries */}
      <div>
        {educationHistory.map((eduItem) => (
           <EducationEntry
              key={eduItem.id}
              item={eduItem}
           />
        ))}
      </div>

    </section>
  );
}

export default EducationSection;