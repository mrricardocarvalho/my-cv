// src/App.tsx - Revised Layout with Nav inside Main Area Card
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom'; // Import Link here too
import Sidebar from './components/Sidebar';
import ResumePage from './pages/ResumePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import Footer from './components/Footer';
import { mainNavItems } from './cv-data'; // Import nav data

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
              <div className="p-6"> {/* Main padding for routed content */}
                <Routes>
                    {/* Pass the 'language' state variable */}
                    <Route path="/" element={<ResumePage currentLanguage={language} />} />
                    <Route path="/resume" element={<ResumePage currentLanguage={language} />} />
                    <Route path="/projects" element={<ProjectsPage currentLanguage={language} />} />
                    <Route path="/blog" element={<BlogListPage currentLanguage={language} />} />
                    <Route path="/blog/:postId" element={<BlogPostPage currentLanguage={language} />} />
                </Routes>
              </div>
               {/* --- END: Content Area --- */}

          </div> {/* End Main Content White Card */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;