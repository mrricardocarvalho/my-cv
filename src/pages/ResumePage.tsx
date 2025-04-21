// src/pages/ResumePage.tsx
import { useEffect } from 'react';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CompetenciesSection from '../components/CompetenciesSection';
import { useErrorHandler } from '../utils/useErrorHandler';
import ErrorBoundary from '../components/ErrorBoundary';
import { SectionWrapper } from '../components/SectionWrapper';
import { NetworkErrorState } from '../components/ErrorStates';

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

interface ResumePageProps {
    currentLanguage: 'en' | 'pt';
}

function ResumePage({ currentLanguage }: ResumePageProps) {
    return (
        <ErrorBoundary
            fallback={
                <div className="max-w-3xl mx-auto">
                    <NetworkErrorState onRetry={() => window.location.reload()} />
                </div>
            }
        >
            <ResumeContent currentLanguage={currentLanguage} />
        </ErrorBoundary>
    );
}

function ResumeContent({ currentLanguage }: ResumePageProps) {
    const experience = useErrorHandler({ retryAttempts: 2 });
    const education = useErrorHandler({ retryAttempts: 2 });
    const competencies = useErrorHandler({ retryAttempts: 2 });

    useEffect(() => {
        const loadSections = async () => {
            // Load all sections in parallel
            await Promise.all([
                experience.executeWithErrorHandling(async () => {
                    // Simulate loading time for experience section
                    await new Promise(resolve => setTimeout(resolve, 300));
                }),
                education.executeWithErrorHandling(async () => {
                    // Simulate loading time for education section
                    await new Promise(resolve => setTimeout(resolve, 200));
                }),
                competencies.executeWithErrorHandling(async () => {
                    // Simulate loading time for competencies section
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
                <ExperienceSection currentLanguage={currentLanguage} />
            </SectionWrapper>

            <SectionWrapper
                isLoading={education.isLoading}
                error={education.error}
                LoadingComponent={SectionLoadingState}
            >
                <EducationSection currentLanguage={currentLanguage} />
            </SectionWrapper>

            <SectionWrapper
                isLoading={competencies.isLoading}
                error={competencies.error}
                LoadingComponent={SectionLoadingState}
            >
                <CompetenciesSection currentLanguage={currentLanguage} />
            </SectionWrapper>
        </div>
    );
}

export default ResumePage;