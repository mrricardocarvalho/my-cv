// src/pages/BlogListPage.tsx
import BlogSection from '../components/BlogSection'; // Renders the list of posts

interface BlogListPageProps {
    currentLanguage: 'en' | 'pt';
}

function BlogListPage(props: BlogListPageProps) {
     const { currentLanguage } = props;
    return (
         <div className="p-6">
            <BlogSection currentLanguage={currentLanguage} />
         </div>
    );
}
export default BlogListPage;