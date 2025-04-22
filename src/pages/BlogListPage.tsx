// src/pages/BlogListPage.tsx
import { useEffect } from 'react';
import BlogSection from '../components/BlogSection';
import { useErrorHandler } from '../utils/useErrorHandler';
import { AppError } from '../utils/errorHandlers';
import { NetworkErrorState, GenericErrorState } from '../components/ErrorStates';

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

interface BlogListPageProps {
    currentLanguage: 'en' | 'pt';
}

function BlogListPage({ currentLanguage }: BlogListPageProps) {
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
    }, [currentLanguage, executeWithErrorHandling]);

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
            <BlogSection currentLanguage={currentLanguage} />
        </div>
    );
}

export default BlogListPage;