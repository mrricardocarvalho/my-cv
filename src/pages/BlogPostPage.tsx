// src/pages/BlogPostPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; // Make sure this is installed: npm install react-markdown
import { blogPostsData, labels } from '../cv-data'; // Import blog data

// --- START: Vite Glob Import ---
// Import all .md files as raw strings within the posts directory using '?raw'
// Use 'eager: true' to load the content immediately when the app starts.
// This is simpler for a small number of posts.
const allMarkdownPosts = import.meta.glob('/src/blog/posts/*.md', { query: '?raw', eager: true });
// console.log('Glob found posts:', allMarkdownPosts); // Uncomment for debugging if needed
// The result 'allMarkdownPosts' will be an object like:
// { '/src/blog/posts/post-name.en.md': 'Raw markdown content...', '/src/blog/posts/post-name.pt.md': '...' }
// --- END: Vite Glob Import ---

interface BlogPostPageProps {
    currentLanguage: 'en' | 'pt';
}

function BlogPostPage(props: BlogPostPageProps) {
    const { currentLanguage } = props;
    // Get postId from URL parameter (e.g., 'getting-started-al-dev')
    const { postId } = useParams<{ postId: string }>();
    const postMetadata = blogPostsData.find(p => p.id === postId);

    // State variables
    const [postContent, setPostContent] = useState<string | null>(null);
    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [postDate, setPostDate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Start in loading state
    const [error, setError] = useState(false);

    // Find the metadata based on the postId from the URL 
     useEffect(() => {
        // Reset states when postId or language changes
        setLoading(true);
        setError(false);
        setPostContent(null);
        setPostTitle(null);
        setPostDate(null);

        console.log(`EFFECT: Looking for postId: ${postId}, Lang: ${currentLanguage}`);
        console.log("EFFECT: Found metadata:", postMetadata);

        if (!postMetadata) {
            setError(true);
            setLoading(false);
            return; // Exit if no metadata found
        }

        // Set title and date from metadata
        setPostTitle(postMetadata.title[currentLanguage as keyof typeof postMetadata.title]);
        setPostDate(postMetadata.date);

        // --- START: Get Content from Glob Import ---
        // Construct the key needed to access the content in the 'allMarkdownPosts' object
        const globPathKey = `/src/blog/posts/${postId}.${currentLanguage}.md`;

        // Check if the key exists in the eager-loaded glob result
        if (allMarkdownPosts[globPathKey]) {
            // Access the default export of the module, which contains the raw string
            const module = allMarkdownPosts[globPathKey] as { default: string }; // Assert type
            const content = module.default; // <<< ---- ACCESS .default HERE

            setPostContent(content);
            setError(false);
        } else {
            setError(true);
        }
        // --- END: Get Content from Glob Import ---

        setLoading(false); // Finished attempting to load

     }, [postId, currentLanguage, postMetadata]); // Dependencies for the effect

    // --- Render Logic ---
    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading post...</div>;
    }

    // Show error message if error flag is set OR if metadata wasn't found
    if (error || !postMetadata) {
        // Use optional chaining on labels in case it hasn't loaded? Unlikely here.
        const blogLabel = labels.blog?.[currentLanguage] ?? 'Blog';
        return (
             <div className="p-6 text-center text-red-500"> {/* Adjusted error color */}
                 <p className="font-semibold">Blog Post Not Found</p>
                 <p className="text-sm text-gray-600 mt-1">Could not load the requested content.</p>
                 <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">← Back to {blogLabel}</Link>
             </div>
        );
    }

    // Render the actual post if no error and not loading
    return (
         <div className="p-6">
             {/* Back link */}
             <Link to="/blog" className="text-sm text-blue-600 hover:underline mb-4 inline-block">← {labels.blog[currentLanguage]}</Link>

             {/* Post Title and Date */}
             <h1 className="text-3xl font-bold text-gray-800 mb-2">{postTitle}</h1>
             <p className="text-sm text-gray-500 mb-6">{postDate}</p>

            <article className="
                prose        // Base prose styles
                lg:prose-lg  // Keep larger text on large screens
                max-w-none   // Keep full width

                // --- START: Refined Color Overrides ---
                prose-headings:text-gray-800 // Darker Headings (H2, H3...) for contrast on white BG
                prose-p:text-gray-600        // Target paragraphs specifically (try mid-gray) - applied via ReactMarkdown props below is better
                prose-strong:text-gray-700   // Bold text slightly darker
                prose-a:text-blue-600        // Standard blue links
                hover:prose-a:text-blue-800  // Darker blue on hover
                prose-code:text-pink-600     // Example code color
                prose-pre:bg-gray-100        // Example code block background (light)
                prose-pre:text-gray-800      // Example code block text (dark)
                prose-li:marker:text-gray-500 // Color for list bullets/numbers
                text-gray-600                // Base text color fallback (applied below via components)

                // --- END: Refined Color Overrides ---

                mt-6         // Keep margin-top
            ">
                {postContent ? (
                    // Pass components to ReactMarkdown for finer control
                    <ReactMarkdown
                        components={{
                            h2: ({node, ...props}) => <h2 className="text-gray-800" {...props} />, // Example H2 override
                            h3: ({node, ...props}) => <h3 className="text-gray-800" {...props} />, // Example H3 override
                            p: ({node, ...props}) => <p className="text-gray-600 leading-relaxed" {...props} />, // Override P color
                            strong: ({node, ...props}) => <strong className="text-gray-700 font-semibold" {...props} />, // Override strong
                            a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 transition-colors" {...props} />, // Override links if prose-a doesn't work well
                            // Add overrides for ul, ol, li, code, pre etc. if needed
                        }}
                    >
                      {postContent}
                    </ReactMarkdown>
                ) : (
                    <p className="italic text-gray-500">Loading content...</p>
                )}
            </article>
         </div>
    );
}
export default BlogPostPage;