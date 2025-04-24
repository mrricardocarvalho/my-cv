import { useTranslation } from 'react-i18next';
import { BlogPost as BlogPostType } from '../types/cv';
import { Link } from 'react-router-dom';

interface BlogPostEntryProps {
    post: BlogPostType;
    featured?: boolean;
}

function BlogPostEntry({ post, featured }: BlogPostEntryProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'pt';
  const { date, title, excerpt, url, tags, readingTime } = post;

  return (
    <article className={`mb-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0 bg-white/80 rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1 ${featured ? 'ring-2 ring-blue-400 ring-offset-2 bg-blue-50' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-600">
          {date}
          {readingTime && (
            <span className="ml-2 text-gray-500">· {readingTime} {t('minRead', 'min read')}</span>
          )}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-medium">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2 transition-colors">
        <Link
          to={url}
          className="hover:text-blue-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {title[lang]}
        </Link>
      </h3>
      <p className="text-sm text-gray-800 leading-relaxed mb-3">
        {excerpt[lang]}
      </p>
      <Link
        to={url}
        className="text-sm font-medium text-blue-800 hover:text-blue-900 underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {t('readMore')} →
      </Link>
      {featured && (
        <div className="mt-3 text-xs text-blue-800 font-bold uppercase tracking-wide">{t('featured', 'Featured')}</div>
      )}
    </article>
  );
}

export default BlogPostEntry;
