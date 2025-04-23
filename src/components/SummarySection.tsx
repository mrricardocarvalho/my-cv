import { useTranslation } from 'react-i18next';
import { summaryText } from '../data/summary';
import { labels } from '../data/labels';

function SummarySection() {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'pt';

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <i className="fas fa-user-tie fa-fw text-blue-600 mr-3"></i>
        {labels.summary[lang]}
      </h2>
      <p className="text-gray-700 leading-relaxed">
        {summaryText[lang]}
      </p>
    </section>
  );
}

export default SummarySection;