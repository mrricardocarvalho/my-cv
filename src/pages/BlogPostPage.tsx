import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogPostsData, labels } from '../cv-data';
import { getCachedPost, cachePost } from '../utils/cache';
import { AppError } from '../utils/errorHandlers';
import { useErrorHandler } from '../utils/useErrorHandler';
import ErrorBoundary from '../components/ErrorBoundary';
import { NetworkErrorState, NotFoundErrorState, GenericErrorState } from '../components/ErrorStates';

// Lazy load markdown files
const allMarkdownPosts = import.meta.glob('/src/blog/posts/*.md', { 
    query: '?raw',
    eager: false
});

// Loading state component
const LoadingState = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    </div>
);

interface BlogPostPageProps {
    currentLanguage: 'en' | 'pt';
}

function BlogPostPage({ currentLanguage }: BlogPostPageProps) {
    return (
        <ErrorBoundary
            fallback={
                <div className="max-w-3xl mx-auto">
                    <NetworkErrorState onRetry={() => window.location.reload()} />
                </div>
            }
        >
            <BlogPostContent currentLanguage={currentLanguage} />
        </ErrorBoundary>
    );
}

function BlogPostContent({ currentLanguage }: BlogPostPageProps) {
    const { postId } = useParams<{ postId: string }>();
    const postMetadata = blogPostsData.find(p => p.id === postId);

    const [postContent, setPostContent] = useState<string | null>(null);
    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [postDate, setPostDate] = useState<string | null>(null);
    
    const { error, isLoading, executeWithErrorHandling } = useErrorHandler({
        onError: (err) => {
            console.error('Error loading blog post:', err);
        },
        retryAttempts: 3,
        componentName: 'BlogPostContent',
        context: {
            postId,
            language: currentLanguage
        }
    });

    useEffect(() => {
        const loadPost = async () => {
            await executeWithErrorHandling(async () => {
                if (!postId || !postMetadata) {
                    throw new AppError('NOT_FOUND', 'Post not found');
                }

                const cacheKey = `${postId}-${currentLanguage}`;
                const cachedContent = getCachedPost(cacheKey);
                
                if (cachedContent) {
                    setPostContent(cachedContent);
                    setPostTitle(postMetadata.title[currentLanguage]);
                    setPostDate(postMetadata.date);
                    return;
                }

                const fileName = `/src/blog/posts/${postId}.${currentLanguage}.md`;
                const importFn = allMarkdownPosts[fileName];

                if (!importFn) {
                    throw new AppError('NOT_FOUND', 'Blog post file not found');
                }

                const content = await importFn() as string;
                cachePost(cacheKey, content);
                setPostContent(content);
                setPostTitle(postMetadata.title[currentLanguage]);
                setPostDate(postMetadata.date);
            });
        };

        loadPost();
    }, [postId, currentLanguage, postMetadata, executeWithErrorHandling]);

    if (isLoading) return <LoadingState />;
    if (error?.type === 'NETWORK_ERROR') return <NetworkErrorState onRetry={() => window.location.reload()} />;
    if (error?.type === 'NOT_FOUND') return <NotFoundErrorState />;
    if (error) return <GenericErrorState error={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="max-w-3xl mx-auto">
            <article>
                <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <i className="fas fa-arrow-left mr-2"></i>
                    {labels.blog[currentLanguage]}
                </Link>

                {postTitle && (
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{postTitle}</h1>
                        {postDate && <time className="text-gray-600">{postDate}</time>}
                    </header>
                )}

                <div className="prose prose-lg max-w-none">
                    {postContent && (
                        <ReactMarkdown components={{
                            h1: ({node, ...props}) => <h1 className="text-gray-800" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-gray-800" {...props} />,
                            p: ({node, ...props}) => <p className="text-gray-600" {...props} />,
                            a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800" {...props} />,
                            code: ({node, ...props}) => <code className="text-pink-600" {...props} />,
                            pre: ({node, ...props}) => <pre className="bg-gray-100 text-gray-800" {...props} />
                        }}>
                            {postContent}
                        </ReactMarkdown>
                    )}
                </div>
            </article>
        </div>
    );
}

export default BlogPostPage;