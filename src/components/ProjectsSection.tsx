// Import the entry component and data/labels
import ProjectEntry from './ProjectEntry';
import { projectsData } from '../data/projects';
import { labels } from '../data/labels';

// Define props interface
interface ProjectsSectionProps {
    currentLanguage: 'en' | 'pt';
}

function ProjectsSection(props: ProjectsSectionProps) {
  const { currentLanguage } = props;

  return (
    // Use a standard HTML section tag
    <section className="mb-8">

      {/* Section Heading - Consistent style */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Suitable Icon (e.g., code branch, folder, lightbulb) */}
        <i className="fas fa-code-branch fa-fw text-blue-600 mr-3"></i>
        {/* Use the label */}
        {labels.projects[currentLanguage]}
      </h2>

      {/* Container for the list of project entries */}
      <div>
        {/* Map over the project data */}
        {projectsData.map((project) => (
           <ProjectEntry
              key={project.id} // Use unique ID
              project={project} // Pass the whole project object
              currentLanguage={currentLanguage} // Pass language
           />
        ))}
         {/* Message if no projects */}
         {projectsData.length === 0 && (
            <p className="text-sm text-gray-500 italic py-4">No projects listed yet.</p>
         )}
      </div>

    </section>
  );
}

export default ProjectsSection;