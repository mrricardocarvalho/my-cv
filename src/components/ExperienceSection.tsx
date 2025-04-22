// Import the JobEntry component (now styled with Tailwind)
import JobEntry from './JobEntry';
// Import the data and labels
import { professionalExperience } from '../data/experience';
import { labels } from '../data/labels';

// Define props interface (remains the same)
interface ExperienceSectionProps {
    currentLanguage: 'en' | 'pt';
}

function ExperienceSection(props: ExperienceSectionProps) {
  const { currentLanguage } = props;

  return (
    // Use a standard HTML section tag
    // Add bottom margin to separate from the next section
    <section className="mb-8">

      {/* Section Heading - Styled similarly to SummarySection heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Font Awesome Icon */}
        <i className="fas fa-briefcase fa-fw text-blue-600 mr-3"></i>
        {/* Use the label for the section title */}
        {labels.experience[currentLanguage]}
      </h2>

      {/* Container for the list of job entries */}
      <div>
        {/* Map over the professional experience data */}
        {professionalExperience.map((job) => (
           // Render the refactored JobEntry component
           // Pass the language prop and spread the rest of the job data
           <JobEntry
              key={job.id} // Use unique ID for the key
              {...job} // Spread job details (title, company, etc.)
              currentLanguage={currentLanguage} // Pass language
           />
        ))}
      </div>

    </section>
  );
}

export default ExperienceSection;