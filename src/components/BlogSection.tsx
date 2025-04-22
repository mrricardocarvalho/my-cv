import React, { Suspense } from 'react';
// Lazy load BlogPostEntry
const BlogPostEntry = React.lazy(() => import('./BlogPostEntry'));
import { blogPostsData } from '../data/blogPosts';
import { labels } from '../data/labels';

// Define props interface
interface BlogSectionProps {
    currentLanguage: 'en' | 'pt';
}

function BlogSection(props: BlogSectionProps) {
  const { currentLanguage } = props;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <i className="fas fa-newspaper fa-fw text-blue-600 mr-3"></i>
        {labels.blog[currentLanguage]}
      </h2>
      <div>
        <Suspense fallback={<div className="text-gray-400 py-4">Loading blog posts...</div>}>
          {blogPostsData.map((post) => (
            <BlogPostEntry
              key={post.id}
              post={post}
              currentLanguage={currentLanguage}
            />
          ))}
        </Suspense>
        {blogPostsData.length === 0 && (
          <p className="text-sm text-gray-500 italic py-4">No blog posts listed yet.</p>
        )}
      </div>
    </section>
  );
}

export default BlogSection;