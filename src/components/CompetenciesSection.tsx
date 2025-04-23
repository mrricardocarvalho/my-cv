import { useTranslation } from 'react-i18next';
import { professionalCompetenciesData } from '../data/competencies';

function CompetenciesSection() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <i className="fas fa-star fa-fw text-blue-600 mr-3"></i>
                {t('professionalCompetenciesSubheading')}
            </h2>
            <div className="flex flex-wrap gap-2">
                {professionalCompetenciesData.map(comp => (
                     <span key={comp.en} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                         {comp[lang]}
                     </span>
                ))}
            </div>
        </section>
    );
}

export default CompetenciesSection;