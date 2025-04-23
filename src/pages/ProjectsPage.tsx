// src/pages/ProjectsPage.tsx
import { useEffect } from 'react';
import ProjectsSection from '../components/ProjectsSection';
import { useErrorHandler } from '../utils/useErrorHandler';
import ErrorBoundary from '../components/ErrorBoundary';
import { GenericErrorState, NetworkErrorState } from '../components/ErrorStates';
import { useTranslation } from 'react-i18next';

// Loading state component
const LoadingState = () => (
    <div className="animate-pulse space-y-6 p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        {[1, 2].map((i) => (
            <div key={i} className="space-y-4 mt-6">
                <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                    <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="mt-2 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

function ProjectsPage() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const title = lang === 'en'
        ? 'Projects | Ricardo Carvalho - D365 BC Developer'
        : 'Projetos | Ricardo Carvalho - D365 BC Developer';
    const description = lang === 'en'
        ? 'Explore projects by Ricardo Carvalho, an experienced Dynamics 365 Business Central Developer.'
        : 'Explore projetos de Ricardo Carvalho, desenvolvedor experiente em Dynamics 365 Business Central.';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Ricardo Carvalho',
        'url': 'https://mrricardocarvalho.github.io/my-cv/',
        'logo': 'https://mrricardocarvalho.github.io/my-cv/profile.jpg',
        'sameAs': [
            'https://www.linkedin.com/in/ricardocarvalhodev/'
        ]
    };
    useEffect(() => {
        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', description);
        let script = document.getElementById('projects-jsonld') as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement('script') as HTMLScriptElement;
            script.type = 'application/ld+json';
            script.id = 'projects-jsonld';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(jsonLd);
        return () => {
            if (script && script.parentNode) script.parentNode.removeChild(script);
        };
    }, [title, description, jsonLd]);

    return (
        <>
            <ErrorBoundary
                fallback={
                    <div className="max-w-3xl mx-auto">
                        <NetworkErrorState onRetry={() => window.location.reload()} />
                    </div>
                }
            >
                <ProjectsContent />
            </ErrorBoundary>
        </>
    );
}

function ProjectsContent() {
    const { error, isLoading, executeWithErrorHandling } = useErrorHandler({
        onError: (err) => {
            console.error('Error loading projects:', err);
        },
        retryAttempts: 3
    });

    useEffect(() => {
        const loadProjects = async () => {
            await executeWithErrorHandling(async () => {
                // Simulate loading time
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Here you would typically load projects data
                // If there's an error, throw new AppError('ERROR_TYPE', 'message')
            });
        };

        loadProjects();
    }, [executeWithErrorHandling]);

    if (isLoading) return <LoadingState />;
    if (error?.type === 'NETWORK_ERROR') return <NetworkErrorState onRetry={() => window.location.reload()} />;
    if (error) return <GenericErrorState error={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="p-6">
            <ProjectsSection />
        </div>
    );
}

export default ProjectsPage;