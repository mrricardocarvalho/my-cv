// src/pages/ResumePage.tsx
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CompetenciesSection from '../components/CompetenciesSection';

interface ResumePageProps {
    currentLanguage: 'en' | 'pt';
}

function ResumePage(props: ResumePageProps) {
    const { currentLanguage } = props;
    return (
        // Add padding consistent with MainContent's old content area
        <div className="p-6">
            {/* Render the sections for the resume */}
            <ExperienceSection currentLanguage={currentLanguage} />
            <EducationSection currentLanguage={currentLanguage} />
            <CompetenciesSection currentLanguage={currentLanguage} />
        </div>
    );
}
export default ResumePage;