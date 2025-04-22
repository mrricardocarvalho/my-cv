import { BlogPost as BlogPostType, labels } from '../cv-data';
import { Link } from 'react-router-dom'; // Ensure Link is imported

interface BlogPostEntryProps {
    post: BlogPostType;
    currentLanguage: 'en' | 'pt';
}

function BlogPostEntry(props: BlogPostEntryProps) {
  const { post, currentLanguage } = props;
  const { date, title, excerpt, url } = post;

  return (
    <article className="mb-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
        <p className="text-xs text-gray-500 mb-1">{date}</p>

        {/* Ensure this is a Link */}
        <h3 className="text-base font-semibold text-gray-800 mb-2 transition-colors">
            <Link
                to={url}
                className="hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                {title[currentLanguage]}
            </Link>
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {excerpt[currentLanguage]}
        </p>

        {/* Ensure this is a Link */}
        <Link
            to={url}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
            {labels.readMore[currentLanguage]} →
        </Link>
    </article>
  );
}
export default BlogPostEntry;