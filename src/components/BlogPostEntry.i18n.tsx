import { useTranslation } from 'react-i18next';
import { BlogPost as BlogPostType } from '../types/cv';
import { Link } from 'react-router-dom';

interface BlogPostEntryProps {
    post: BlogPostType;
}

function BlogPostEntry({ post }: BlogPostEntryProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'pt';
  const { date, title, excerpt, url } = post;

  return (
    <article className="mb-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0 bg-white/80 rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1">
        <p className="text-xs text-gray-500 mb-1">{date}</p>
        <h3 className="text-base font-semibold text-gray-800 mb-2 transition-colors">
            <Link
                to={url}
                className="hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                {title[lang]}
            </Link>
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {excerpt[lang]}
        </p>
        <Link
            to={url}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
            {t('readMore')} →
        </Link>
    </article>
  );
}

export default BlogPostEntry;
