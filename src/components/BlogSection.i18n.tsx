import { useTranslation } from 'react-i18next';
import React, { Suspense } from 'react';
const BlogPostEntry = React.lazy(() => import('./BlogPostEntry.i18n'));
import { blogPostsData } from '../data/blogPosts';

function BlogSection() {
  const { t } = useTranslation();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <i className="fas fa-newspaper fa-fw text-blue-600 mr-3"></i>
        {t('blog')}
      </h2>
      <div>
        <Suspense fallback={<div className="text-gray-400 py-4">{t('loadingBlogPosts', 'Loading blog posts...')}</div>}>
          {blogPostsData.map((post) => (
            <BlogPostEntry
              key={post.id}
              post={post}
            />
          ))}
        </Suspense>
        {blogPostsData.length === 0 && (
          <p className="text-sm text-gray-500 italic py-4">{t('noBlogPosts', 'No blog posts listed yet.')}</p>
        )}
      </div>
    </section>
  );
}

export default BlogSection;
