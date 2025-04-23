import { useTranslation } from 'react-i18next';
import ProjectEntry from './ProjectEntry';
import { projectsData } from '../data/projects';
import { useMemo, useState } from 'react';

function ProjectsSection() {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string|null>(null);

  // Collect all unique tags
  const allTags = useMemo(() =>
    Array.from(new Set(projectsData.flatMap(project => project.tags || []))),
    []
  );

  // Sort: featured first, then by date (if available)
  const sortedProjects = useMemo(() =>
    [...projectsData].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Fallback: sort by date descending if both have date
      return (b.date || '').localeCompare(a.date || '');
    }),
    []
  );

  // Filter by tag if selected
  const filteredProjects = useMemo(() =>
    selectedTag ? sortedProjects.filter(project => project.tags?.includes(selectedTag)) : sortedProjects,
    [selectedTag, sortedProjects]
  );

  // Find featured project
  const featured = sortedProjects.find(project => project.featured);
  const restProjects = featured ? filteredProjects.filter(project => project.id !== featured.id) : filteredProjects;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <i className="fas fa-code-branch fa-fw text-blue-600 mr-3"></i>
        {t('projects')}
      </h2>
      {/* Tag filter UI */}
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedTag === null ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200'} transition`}
            onClick={() => setSelectedTag(null)}
          >
            {t('all', 'All')}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedTag === tag ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200'} transition`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      {/* Featured project */}
      {featured && (!selectedTag || featured.tags?.includes(selectedTag)) && (
        <div className="mb-8">
          <ProjectEntry project={featured} />
          <div className="mt-2 text-xs text-blue-700 font-bold uppercase tracking-wide">{t('featured', 'Featured')}</div>
        </div>
      )}
      {/* Other projects */}
      <div>
        {restProjects.map((project) => (
           <div key={project.id}>
             <ProjectEntry project={project} />
             {project.tags && project.tags.length > 0 && (
               <div className="flex flex-wrap gap-1 mt-1 mb-2">
                 {project.tags.map(tag => (
                   <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-medium">{tag}</span>
                 ))}
               </div>
             )}
           </div>
        ))}
         {filteredProjects.length === 0 && (
            <p className="text-sm text-gray-500 italic py-4">{t('noProjects', 'No projects listed yet.')}</p>
         )}
      </div>
    </section>
  );
}

export default ProjectsSection;
