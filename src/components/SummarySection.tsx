// Import the specific data needed and the labels
import { summaryText, labels } from '../cv-data';

// Define props interface (remains the same)
interface SummarySectionProps {
    currentLanguage: 'en' | 'pt';
}

function SummarySection(props: SummarySectionProps) {
  const { currentLanguage } = props;

  return (
    // Use a standard HTML section tag
    // Add bottom margin to separate from the next section
    <section className="mb-8">

      {/* Section Heading - Styled similarly to template headings */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Font Awesome Icon */}
        <i className="fas fa-user-tie fa-fw text-blue-600 mr-3"></i>
        {/* Use the label for the section title */}
        {labels.summary[currentLanguage]}
      </h2>

      {/* Summary Paragraph */}
      {/* Apply text color, leading (line height), and word break */}
      <p className="text-gray-700 leading-relaxed"> {/* Removed break-words, use default */}
        {summaryText[currentLanguage]}
      </p>

    </section>
  );
}

export default SummarySection;