import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogPostsData, labels } from '../cv-data';
import { getCachedPost, cachePost } from '../utils/cache';
import { AppError } from '../utils/errorHandlers';
import { useErrorHandler } from '../utils/useErrorHandler';
import ErrorBoundary from '../components/ErrorBoundary';
import { NetworkErrorState, NotFoundErrorState, GenericErrorState } from '../components/ErrorStates';
import OptimizedImage from '../components/OptimizedImage';
import { useTranslation } from 'react-i18next';

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

function BlogPostPage() {
    return (
        <ErrorBoundary
            fallback={
                <div className="max-w-3xl mx-auto">
                    <NetworkErrorState onRetry={() => window.location.reload()} />
                </div>
            }
        >
            <BlogPostContent />
        </ErrorBoundary>
    );
}

function BlogPostContent() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
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
            language: lang
        }
    });

    useEffect(() => {
        const loadPost = async () => {
            await executeWithErrorHandling(async () => {
                if (!postId || !postMetadata) {
                    throw new AppError('NOT_FOUND', 'Post not found');
                }

                // Try to load from cache first
                const cacheKey = `${postId}-${lang}`;
                const cachedContent = getCachedPost(cacheKey);
                
                if (cachedContent) {
                    setPostContent(cachedContent);
                    setPostTitle(postMetadata.title[lang]);
                    setPostDate(postMetadata.date);
                    return;
                }

                // Check network connection
                if (!navigator.onLine) {
                    throw new AppError('NETWORK_ERROR', 'No internet connection');
                }

                const fileName = `/src/blog/posts/${postId}.${lang}.md`;
                const importFn = allMarkdownPosts[fileName];

                if (!importFn) {
                    throw new AppError('NOT_FOUND', 'Blog post file not found');
                }

                try {
                    const result = await Promise.race([
                        importFn() as Promise<string>,
                        new Promise((_, reject) => 
                            setTimeout(() => reject(new AppError('TIMEOUT', 'Request timed out')), 10000)
                        )
                    ]);

                    // Cast the result to string since we know the import returns markdown content
                    const content = result as string;

                    // Cache the content for offline access
                    cachePost(cacheKey, content);
                    setPostContent(content);
                    setPostTitle(postMetadata.title[lang]);
                    setPostDate(postMetadata.date);
                } catch (err) {
                    if (err instanceof AppError) throw err;
                    throw new AppError('NETWORK_ERROR', 'Failed to load blog post');
                }
            });
        };

        loadPost();
    }, [postId, lang, postMetadata, executeWithErrorHandling]);

    // Add useEffect for document head management
    useEffect(() => {
        // You may want to set a dynamic title/description based on the post, but here is a generic fallback:
        document.title = 'Blog Post | Ricardo Carvalho - D365 BC Developer';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', 'Read a blog post by Ricardo Carvalho about Dynamics 365 Business Central, AL development, and ERP best practices.');
        let script = document.getElementById('blogpost-jsonld') as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement('script') as HTMLScriptElement;
            script.type = 'application/ld+json';
            script.id = 'blogpost-jsonld';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': document.title,
            'author': {
                '@type': 'Person',
                'name': 'Ricardo Carvalho',
                'url': 'https://mrricardocarvalho.github.io/my-cv/'
            },
            'url': window.location.href
        });
        return () => {
            if (script && script.parentNode) script.parentNode.removeChild(script);
        };
    }, []);

    if (isLoading) return <LoadingState />;
    if (error?.type === 'NETWORK_ERROR') return <NetworkErrorState onRetry={() => window.location.reload()} />;
    if (error?.type === 'NOT_FOUND') return <NotFoundErrorState />;
    if (error) return <GenericErrorState error={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="max-w-3xl mx-auto">
            <article>
                <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <i className="fas fa-arrow-left mr-2"></i>
                    {labels.blog[lang]}
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
                            a: ({node, ...props}) => (
                                <a 
                                    className="text-blue-600 hover:text-blue-800" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props} 
                                />
                            ),
                            img: ({node, ...props}) => (
                                <OptimizedImage
                                    {...props}
                                    className="rounded-lg max-w-full h-auto my-4"
                                    fallback={props.alt || 'Image'}
                                    onLoadError={(error: string) => {
                                        console.error(`Failed to load blog post image (${props.alt}):`, error);
                                    }}
                                />
                            ),
                            code: ({node, ...props}) => <code className="text-pink-600 bg-gray-50 px-1 py-0.5 rounded" {...props} />,
                            pre: ({node, ...props}) => (
                                <pre className="bg-gray-50 text-gray-800 p-4 rounded-lg overflow-x-auto" {...props} />
                            )
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