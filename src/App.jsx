import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import Blog from './components/Blog';
import ChatSection from './components/ChatSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PackageDetails from './components/PackageDetails';

import About from './components/About';
import Services from './components/Services';
import CustomerReviews from './components/CustomerReviews';
import SouthIndiaTours from './components/SouthIndiaTours';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Features />
    <SouthIndiaTours />
    <Destinations />
    <Blog />
    <ChatSection />
    <Contact />
    <CustomerReviews />
  </>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    } else {
      return false;
    }
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
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen font-sans antialiased text-gray-900 dark:text-white bg-white dark:bg-black transition-colors duration-500 overflow-x-hidden selection:bg-blue-600 selection:text-white`}>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/package/:id" element={<PackageDetails />} />
        </Routes>

        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all z-40 transform ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </Router>
  );
}

export default App;
