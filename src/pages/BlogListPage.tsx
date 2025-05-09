// src/pages/BlogListPage.tsx
import { useEffect } from 'react';
import BlogSection from '../components/BlogSection';
import { useErrorHandler } from '../utils/useErrorHandler';
import { AppError } from '../utils/errorHandlers';
import { NetworkErrorState, GenericErrorState } from '../components/ErrorStates';
import { useTranslation } from 'react-i18next';

// Loading state component
const LoadingState = () => (
    <div className="animate-pulse space-y-6 p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        ))}
    </div>
);

function BlogListPage() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const title = lang === 'en'
        ? 'Blog | Ricardo Carvalho - D365 BC Developer'
        : 'Blog | Ricardo Carvalho - D365 BC Developer';
    const description = lang === 'en'
        ? 'Read articles and blog posts by Ricardo Carvalho about Dynamics 365 Business Central, AL development, and ERP best practices.'
        : 'Leia artigos e posts de Ricardo Carvalho sobre Dynamics 365 Business Central, desenvolvimento AL e melhores práticas de ERP.';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': 'Ricardo Carvalho Blog',
        'url': 'https://mrricardocarvalho.github.io/my-cv/',
        'author': {
            '@type': 'Person',
            'name': 'Ricardo Carvalho',
            'url': 'https://mrricardocarvalho.github.io/my-cv/'
        }
    };
    useEffect(() => {
        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', description);
        let script = document.getElementById('bloglist-jsonld') as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement('script') as HTMLScriptElement;
            script.type = 'application/ld+json';
            script.id = 'bloglist-jsonld';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(jsonLd);
        return () => {
            if (script && script.parentNode) script.parentNode.removeChild(script);
        };
    }, [title, description, jsonLd]);

    const { error, isLoading, executeWithErrorHandling } = useErrorHandler({
        onError: (err: Error | AppError) => {
            console.error('Error loading blog posts:', err);
        },
        retryAttempts: 3,
        componentName: 'BlogListPage'
    });

    const loadBlogPosts = async () => {
        await executeWithErrorHandling(async () => {
            // Check network connection
            if (!navigator.onLine) {
                throw new AppError('NETWORK_ERROR', 'No internet connection');
            }

            // Simulate loading time and potential network issues
            await Promise.race([
                new Promise(resolve => setTimeout(resolve, 500)),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new AppError('TIMEOUT', 'Request timed out')), 10000)
                )
            ]);
        });
    };

    useEffect(() => {
        loadBlogPosts();
    }, [executeWithErrorHandling]);

    if (error?.type === 'NETWORK_ERROR') {
        return (
            <div className="p-6">
                <NetworkErrorState onRetry={loadBlogPosts} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <GenericErrorState error={error} onRetry={loadBlogPosts} />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-6">
                <LoadingState />
            </div>
        );
    }

    return (
        <div className="p-6">
            <BlogSection />
        </div>
    );
}

export default BlogListPage;