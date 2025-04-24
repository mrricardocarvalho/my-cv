import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown, { Components, ExtraProps } from 'react-markdown';
import { ComponentPropsWithoutRef } from 'react';
import { blogPostsData, labels } from '../cv-data';
import { getCachedPost, cachePost } from '../utils/cache';
import { AppError } from '../utils/errorHandlers';
import { useErrorHandler } from '../utils/useErrorHandler';
import ErrorBoundary from '../components/ErrorBoundary';
import { NetworkErrorState, NotFoundErrorState, GenericErrorState } from '../components/ErrorStates';
import OptimizedImage from '../components/OptimizedImage';
import { useTranslation } from 'react-i18next';

// Lazy load markdown files
const allMarkdownPosts: Record<string, string> = import.meta.glob('../blog/posts/*.{en,pt}.md', { 
    as: 'raw',
    eager: true
}) as Record<string, string>;

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

                const fileName = `../blog/posts/${postId}.${lang}.md`;
                const importFn = allMarkdownPosts[fileName];

                if (!importFn) {
                    console.error('Available posts:', Object.keys(allMarkdownPosts));
                    throw new AppError('NOT_FOUND', `Blog post file not found: ${fileName}`);
                }

                try {
                    const content = importFn;
                    
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

    const markdownComponents: Components = {
        h1: function MarkdownH1({ node, className, children, ...props }: ComponentPropsWithoutRef<'h1'> & ExtraProps) {
            return <h1 className={`text-3xl font-bold text-gray-800 mb-4 ${className || ''}`} {...props}>{children}</h1>;
        },
        h2: function MarkdownH2({ node, className, children, ...props }: ComponentPropsWithoutRef<'h2'> & ExtraProps) {
            return <h2 className={`text-2xl font-semibold text-gray-700 mb-3 ${className || ''}`} {...props}>{children}</h2>;
        },
        p: function MarkdownP({ node, className, children, ...props }) {
            return <p className={`prose-code:font-mono text-gray-600 mb-4 leading-relaxed ${className || ''}`} {...props}>{children}</p>;
        },
        strong: function MarkdownStrong({ node, className, children, ...props }) {
            return <strong className={`text-gray-700 font-medium ${className || ''}`} {...props}>{children}</strong>;
        },
        em: function MarkdownEm({ node, className, children, ...props }) {
            return <em className={`text-gray-600 ${className || ''}`} {...props}>{children}</em>;
        },
        a: function MarkdownA({ node, href, className, children, ...props }) {
            return (
                <a 
                    href={href}
                    className={`text-blue-800 hover:text-blue-900 underline font-medium ${className || ''}`}
                    {...props}
                >
                    {children}
                </a>
            );
        },
        img: function MarkdownImg({ node, src, alt, className, ...props }) {
            return (
                <OptimizedImage
                    src={src || ''}
                    alt={alt || ''}
                    className={`rounded-lg max-w-full h-auto my-4 ${className || ''}`}
                    fallback={alt || 'Image'}
                    onLoadError={(error: string) => {
                        console.error(`Failed to load blog post image (${alt}):`, error);
                    }}
                    {...props}
                />
            );
        },
        code: function MarkdownCode({ node, className, children, ...props }) {
            return <code className={`text-blue-600 bg-blue-50 font-mono px-1.5 py-0.5 rounded-sm ${className || ''}`} {...props}>{children}</code>;
        },
        pre: function MarkdownPre({ node, className, children, ...props }) {
            return <pre className={`bg-slate-50 text-slate-700 p-4 rounded-lg overflow-x-auto border border-slate-200 ${className || ''}`} {...props}>{children}</pre>;
        },
        ul: function MarkdownUl({ node, className, children, ...props }) {
            return <ul className={`list-disc list-outside pl-6 space-y-2 mb-4 text-gray-600 ${className || ''}`} {...props}>{children}</ul>;
        },
        li: function MarkdownLi({ node, className, children, ...props }) {
            return <li className={`text-gray-900 ${className || ''}`} {...props}>{children}</li>;
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <article>
                <Link to="/blog" className="inline-flex items-center text-blue-800 hover:text-blue-900 underline mb-6">
                    <i className="fas fa-arrow-left mr-2"></i>
                    {labels.blog[lang]}
                </Link>

                {postTitle && (
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{postTitle}</h1>
                        {postDate && <time className="text-gray-800">{postDate}</time>}
                    </header>
                )}

                <div className="prose prose-lg max-w-none">
                    {postContent && (
                        <div className="markdown-content">
                            <ReactMarkdown components={markdownComponents}>
                                {postContent}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}

export default BlogPostPage;