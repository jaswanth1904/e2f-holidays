import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ImagePreloader from './utils/ImagePreloader';

// Performance optimization: Group sections into "Below the Fold" chunks
const BelowTheFold = lazy(() => import('./components/MainSections'));

// Individual lazy pages to avoid object-dot-property access on lazy wrappers
const PackageDetails = lazy(() => import('./components/PackageDetails'));
const Legal = lazy(() => import('./components/Legal'));
const NotFound = lazy(() => import('./components/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="w-full h-16 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <Suspense fallback={<PageLoader />}>
      <BelowTheFold />
    </Suspense>
  </>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => window.scrollTo(0, 0), 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    }
    return false;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <Router>
      <ImagePreloader />
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen font-sans antialiased text-gray-900 dark:text-white bg-white dark:bg-black transition-colors duration-500 overflow-x-hidden selection:bg-blue-600 selection:text-white">
          <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

          <Suspense fallback={<div className="h-screen w-full" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all z-40 transform ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
