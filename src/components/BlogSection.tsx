import { useTranslation } from 'react-i18next';
import React, { Suspense, useState, useMemo } from 'react';
const BlogPostEntry = React.lazy(() => import('./BlogPostEntry'));
import { blogPostsData } from '../data/blogPosts';

function BlogSection() {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string|null>(null);

  // Collect all unique tags from posts
  const allTags = useMemo(() =>
    Array.from(new Set(blogPostsData.flatMap(post => post.tags || []))),
    []
  );

  // Filter posts by selected tag
  const filteredPosts = useMemo(() =>
    selectedTag ? blogPostsData.filter(post => post.tags?.includes(selectedTag)) : blogPostsData,
    [selectedTag]
  );

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <i className="fas fa-newspaper fa-fw text-blue-600 mr-3"></i>
        {t('blog')}
      </h2>
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedTag === null ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200'} transition`}
            onClick={() => setSelectedTag(null)}
          >
            {t('all', 'All')}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedTag === tag ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200'} transition`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div>
        <Suspense fallback={<div className="text-gray-400 py-4">Loading blog posts...</div>}>
          {filteredPosts.map((post) => (
            <BlogPostEntry
              key={post.id}
              post={post}
            />
          ))}
        </Suspense>
        {filteredPosts.length === 0 && (
          <p className="text-sm text-gray-500 italic py-4">
            {selectedTag 
              ? `No posts found with tag "${selectedTag}"`
              : "No blog posts listed yet."}
          </p>
        )}
      </div>
    </section>
  );
}

export default BlogSection;