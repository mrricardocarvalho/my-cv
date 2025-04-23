// src/App.tsx
import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.i18n';
import Footer from './components/Footer';
import { mainNavItems } from './cv-data';
import ErrorBoundary from './components/ErrorBoundary';
import i18n from './i18n';

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
  const { pathname } = useLocation();
  const activePath = pathname === '/' ? '/resume' : pathname;

  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8">The application encountered a critical error.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <i className="fas fa-redo mr-2"></i>
            Reload Application
          </button>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row py-8 px-2 sm:px-4 md:px-6 lg:px-8 gap-8">
          <div className="w-full lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
            <ErrorBoundary>
              <Sidebar />
            </ErrorBoundary>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg relative">
              <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
                <nav className="flex flex-wrap items-center justify-around bg-gray-100 rounded-lg p-1 gap-2">
                  {mainNavItems.map(item => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`flex-1 px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium text-center transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                          ${activePath === item.href
                            ? 'bg-white text-gray-900 shadow-sm font-semibold'
                            : 'text-gray-500 hover:text-gray-800'
                          }`
                      }
                      aria-current={activePath === item.href ? 'page' : undefined}
                    >
                      {item.label[i18n.language as 'en' | 'pt']}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="p-4 sm:p-6">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={
                      <ErrorBoundary>
                        <ResumePage />
                      </ErrorBoundary>
                    } />
                    <Route path="/resume" element={
                      <ErrorBoundary>
                        <ResumePage />
                      </ErrorBoundary>
                    } />
                    <Route path="/projects" element={
                      <ErrorBoundary>
                        <ProjectsPage />
                      </ErrorBoundary>
                    } />
                    <Route path="/blog" element={
                      <ErrorBoundary>
                        <BlogListPage />
                      </ErrorBoundary>
                    } />
                    <Route path="/blog/:postId" element={
                      <ErrorBoundary>
                        <BlogPostPage />
                      </ErrorBoundary>
                    } />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
export default App;