// src/pages/BlogListPage.tsx
import { useState, useEffect } from 'react';
import BlogSection from '../components/BlogSection';
import { handleHttpError, withRetry } from '../utils/errorHandlers';

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

// Error state component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">
            <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to load blog posts</h3>
        <p className="text-gray-600 mb-4">There was a problem loading the blog posts.</p>
        <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
            <i className="fas fa-redo mr-2"></i>
            Try Again
        </button>
    </div>
);

interface BlogListPageProps {
    currentLanguage: 'en' | 'pt';
}

function BlogListPage({ currentLanguage }: BlogListPageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadBlogPosts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await withRetry(async () => {
                // Simulate an API call or data fetching
                await new Promise(resolve => setTimeout(resolve, 500));
            });
            setIsLoading(false);
        } catch (err: any) {
            const appError = handleHttpError(err);
            setError(appError);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBlogPosts();
    }, [currentLanguage]);

    if (error) {
        return <ErrorState onRetry={loadBlogPosts} />;
    }

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <div className="p-6">
            <BlogSection currentLanguage={currentLanguage} />
        </div>
    );
}

export default BlogListPage;