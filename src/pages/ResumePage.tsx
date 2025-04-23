// src/pages/ResumePage.tsx
import { useEffect } from 'react';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CompetenciesSection from '../components/CompetenciesSection';
import { useErrorHandler } from '../utils/useErrorHandler';
import ErrorBoundary from '../components/ErrorBoundary';
import { SectionWrapper } from '../components/SectionWrapper';
import { NetworkErrorState } from '../components/ErrorStates';
import { useTranslation } from 'react-i18next';


// Loading state components
const SectionLoadingState = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
            {[1, 2].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
        </div>
    </div>
);

function ResumePage() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const title = lang === 'en'
        ? 'Resume | Ricardo Carvalho - D365 BC Developer'
        : 'Currículo | Ricardo Carvalho - D365 BC Developer';
    const description = lang === 'en'
        ? 'Experienced Dynamics 365 Business Central Developer. View Ricardo Carvalho’s resume, skills, and professional experience.'
        : 'Desenvolvedor experiente em Dynamics 365 Business Central. Veja o currículo, competências e experiência profissional de Ricardo Carvalho.';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Ricardo Carvalho',
        'jobTitle': 'D365 BC Developer',
        'url': 'https://mrricardocarvalho.github.io/my-cv/',
        'sameAs': [
            'https://www.linkedin.com/in/ricardocarvalhodev/'
        ]
    };
    useEffect(() => {
        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        }
        let script = document.getElementById('resume-jsonld') as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement('script') as HTMLScriptElement;
            script.type = 'application/ld+json';
            script.id = 'resume-jsonld';
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
                <ResumeContent />
            </ErrorBoundary>
        </>
    );
}

function ResumeContent() {
    const experience = useErrorHandler({ retryAttempts: 2 });
    const education = useErrorHandler({ retryAttempts: 2 });
    const competencies = useErrorHandler({ retryAttempts: 2 });
    useEffect(() => {
        const loadSections = async () => {
            await Promise.all([
                experience.executeWithErrorHandling(async () => {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }),
                education.executeWithErrorHandling(async () => {
                    await new Promise(resolve => setTimeout(resolve, 200));
                }),
                competencies.executeWithErrorHandling(async () => {
                    await new Promise(resolve => setTimeout(resolve, 100));
                })
            ]);
        };
        loadSections();
    }, [experience.executeWithErrorHandling, education.executeWithErrorHandling, competencies.executeWithErrorHandling]);
    return (
        <div className="p-6 space-y-12">
            <SectionWrapper
                isLoading={experience.isLoading}
                error={experience.error}
                LoadingComponent={SectionLoadingState}
            >
                <ExperienceSection />
            </SectionWrapper>
            <SectionWrapper
                isLoading={education.isLoading}
                error={education.error}
                LoadingComponent={SectionLoadingState}
            >
                <EducationSection />
            </SectionWrapper>
            <SectionWrapper
                isLoading={competencies.isLoading}
                error={competencies.error}
                LoadingComponent={SectionLoadingState}
            >
                <CompetenciesSection />
            </SectionWrapper>
        </div>
    );
}

export default ResumePage;