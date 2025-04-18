// src/components/CompetenciesSection.tsx
import React from 'react';
// Import necessary data and labels
import { professionalCompetenciesData, labels } from '../cv-data';

// Define props interface
interface CompetenciesSectionProps {
    currentLanguage: 'en' | 'pt';
}

function CompetenciesSection(props: CompetenciesSectionProps) {
    const { currentLanguage } = props;

    return (
        // Use a standard HTML section tag
        // Add bottom margin (optional, adjust if needed depending on footer spacing)
        <section className="mb-8">

            {/* Section Heading - Styled consistently */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                 {/* Font Awesome Icon */}
                <i className="fas fa-star fa-fw text-blue-600 mr-3"></i>
                {/* Use the label for the subheading */}
                {labels.professionalCompetenciesSubheading[currentLanguage]}
            </h2>

            {/* Container for the badges */}
            <div className="flex flex-wrap gap-2"> {/* gap-2 provides spacing */}
                {/* Map through competency data */}
                {professionalCompetenciesData.map(comp => (
                     // Render badge for each competency
                     // Using the simpler gray style consistent with skills badges in sidebar
                     <span key={comp.en} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md"> {/* Slightly larger padding than skills */}
                         {comp[currentLanguage]}
                     </span>
                ))}
            </div>

        </section>
    );
}

export default CompetenciesSection;