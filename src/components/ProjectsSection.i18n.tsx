import { useTranslation } from 'react-i18next';
import ProjectEntry from './ProjectEntry';
import { projectsData } from '../data/projects';

function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <i className="fas fa-code-branch fa-fw text-blue-600 mr-3"></i>
        {t('projects')}
      </h2>
      <div>
        {projectsData.map((project) => (
           <ProjectEntry
              key={project.id}
              project={project}
           />
        ))}
         {projectsData.length === 0 && (
            <p className="text-sm text-gray-500 italic py-4">{t('noProjects', 'No projects listed yet.')}</p>
         )}
      </div>
    </section>
  );
}

export default ProjectsSection;
