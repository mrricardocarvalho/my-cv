// src/components/BlogSection.tsx
import React from 'react';
// Import the entry component and data/labels
import BlogPostEntry from './BlogPostEntry';
import { blogPostsData, labels } from '../cv-data';

// Define props interface
interface BlogSectionProps {
    currentLanguage: 'en' | 'pt';
}

function BlogSection(props: BlogSectionProps) {
  const { currentLanguage } = props;

  return (
    // Use a standard HTML section tag
    <section className="mb-8"> {/* Add margin if needed */}

      {/* Section Heading - Consistent style */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {/* Suitable Icon */}
        <i className="fas fa-newspaper fa-fw text-blue-600 mr-3"></i>
        {/* Use the label */}
        {labels.blog[currentLanguage]}
      </h2>

      {/* Container for the list of blog post entries */}
      <div>
        {/* Map over the blog post data */}
        {blogPostsData.map((post) => (
           <BlogPostEntry
              key={post.id} // Use unique ID
              post={post} // Pass the whole post object
              currentLanguage={currentLanguage} // Pass language
           />
        ))}
        {/* Message if no posts */}
         {blogPostsData.length === 0 && (
            <p className="text-sm text-gray-500 italic py-4">No blog posts listed yet.</p>
         )}
      </div>

    </section>
  );
}

export default BlogSection;