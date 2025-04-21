// src/App.tsx
import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { mainNavItems } from './cv-data';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname); // For Nav highlighting

  // Update activePath for Nav highlighting
  useEffect(() => {
      let currentPath = location.pathname;
      if (currentPath === '/') currentPath = '/resume'; // Treat root as /resume
      if (currentPath.startsWith('/blog/')) currentPath = '/blog'; // Group blog posts under /blog
      if (currentPath.startsWith('/projects/')) currentPath = '/projects'; // Group projects if they have detail pages
      setActivePath(currentPath);
  }, [location]);


  const handleLanguageToggle = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'pt' : 'en'));
  };

  return (
    <ErrorBoundary>
        <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
          <div className="container mx-auto max-w-7xl lg:flex py-8 px-4 sm:px-6 lg:px-8">
            <div className="lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
              <Sidebar
                currentLanguage={language}
                onToggleLanguage={handleLanguageToggle}
                activePath={activePath} // Pass active path for potential sidebar nav highlighting (optional)
              />
            </div>
            <div className="lg:w-2/3">
              {/* Main Content White Card */}
              <div className="bg-white rounded-lg shadow-lg relative">

                  {/* --- START: Sticky Navigation Bar (MOVED HERE) --- */}
                  <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-3">
                      <nav className="flex items-center justify-around bg-gray-100 rounded-lg p-1">
                          {mainNavItems.map(item => (
                              <Link
                                  key={item.id}
                                  to={item.href} // Use the defined href ('/', '/projects', '/blog')
                                  // No onClick needed here for basic routing state
                                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium text-center transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                                      ${activePath === item.href // Compare activePath with item's href
                                          ? 'bg-white text-gray-900 shadow-sm font-semibold'
                                          : 'text-gray-500 hover:text-gray-800'
                                      }`
                                  }
                                  aria-current={activePath === item.href ? 'page' : undefined}
                              >
                                  {item.label[language]}
                              </Link>
                          ))}
                      </nav>
                  </div>
                  {/* --- END: Sticky Navigation Bar --- */}

                  {/* --- START: Content Area Rendered by Router --- */}
                  {/* Add padding here to offset the sticky nav's height (approx py-3 + p-1 height) */}
                  <div className="p-6"> {/* Main padding for routed content */}                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Pass the 'language' state variable */}
                    <Route path="/" element={
                      <ErrorBoundary>
                        <ResumePage currentLanguage={language} />
                      </ErrorBoundary>
                    } />
                    <Route path="/resume" element={
                      <ErrorBoundary>
                        <ResumePage currentLanguage={language} />
                      </ErrorBoundary>
                    } />
                    <Route path="/projects" element={
                      <ErrorBoundary>
                        <ProjectsPage currentLanguage={language} />
                      </ErrorBoundary>
                    } />
                    <Route path="/blog" element={
                      <ErrorBoundary>
                        <BlogListPage currentLanguage={language} />
                      </ErrorBoundary>
                    } />
                    <Route path="/blog/:postId" element={
                      <ErrorBoundary>
                        <BlogPostPage currentLanguage={language} />
                      </ErrorBoundary>
                    } />
                  </Routes>
                </Suspense>
                  </div>
                   {/* --- END: Content Area --- */}

              </div> {/* End Main Content White Card */}
            </div>
          </div>
          <Footer />
        </div>
    </ErrorBoundary>
  );
}
export default App;