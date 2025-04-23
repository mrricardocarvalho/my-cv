import { useTranslation } from 'react-i18next';
// Import the JobEntry component (now styled with Tailwind)
import JobEntry from './JobEntry';
// Import the data and labels
import { professionalExperience } from '../data/experience';

function ExperienceSection() {
  const { t } = useTranslation();
  return (
    // Use a standard HTML section tag
    // Add bottom margin to separate from the next section
    <section className="mb-8">

      {/* Section Heading - Styled similarly to SummarySection heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Font Awesome Icon */}
        <i className="fas fa-briefcase fa-fw text-blue-600 mr-3"></i>
        {/* Use the label for the section title */}
        {t('experience')}
      </h2>

      {/* Container for the list of job entries */}
      <div>
        {professionalExperience.map((job) => (
           <JobEntry
              key={job.id}
              {...job}
           />
        ))}
      </div>

    </section>
  );
}

export default ExperienceSection;