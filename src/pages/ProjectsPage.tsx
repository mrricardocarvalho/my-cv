// src/pages/ProjectsPage.tsx
import React from 'react';
import ProjectsSection from '../components/ProjectsSection';

interface ProjectsPageProps {
    currentLanguage: 'en' | 'pt';
}

function ProjectsPage(props: ProjectsPageProps) {
    const { currentLanguage } = props;
    return (
         <div className="p-6">
            <ProjectsSection currentLanguage={currentLanguage} />
         </div>
    );
}
export default ProjectsPage;