import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import { defaultContent } from './data/siteData';

// Lazy load components for better performance
const LazyStudioSection = lazy(() => import('./components/StudioSection'));
const LazyExpertiseSection = lazy(() => import('./components/ExpertiseSection'));
const LazyBuiltDifferent = lazy(() => import('./components/BuiltDifferent'));
const LazyTestimonials = lazy(() => import('./components/Testimonials'));
const LazyPortfolio = lazy(() => import('./components/Portfolio'));
const LazyFinalCta = lazy(() => import('./components/FinalCTA'));

// Loading fallback component
const SectionFallback = () => <div style={{ height: '100vh', background: 'var(--bg-dark)' }} />;

function AppContent({ lang, setLang, content, setContent }) {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="App" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {!isAdminRoute && <Navbar lang={lang} copy={content.navbar} toggleLang={toggleLang} />}
      <Routes>
        <Route path="/" element={<Navigate to={`/${lang}`} />} />
        <Route path="/:lang" element={
          !isAdminRoute ? (
            <>
              <HeroSection copy={content.hero} />
              <Suspense fallback={<SectionFallback />}>
                <LazyStudioSection copy={content.studio} />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <LazyExpertiseSection copy={content.expertise} />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <LazyBuiltDifferent copy={content.builtDifferent} />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <LazyTestimonials copy={content.testimonials} />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <LazyPortfolio copy={content.portfolio} />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <LazyFinalCta copy={content.finalCta} />
              </Suspense>
              <Footer copy={content.footer} />
            </>
          ) : null
        } />
        <Route path="/admin" element={<AdminPage lang={lang} toggleLang={toggleLang} content={content} onContentUpdate={setContent} storageKey="cimprints_admin" />} />
      </Routes>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const [content, setContent] = useState(defaultContent.en);

  useEffect(() => {
    // Load saved content from localStorage if exists
    const saved = localStorage.getItem('cimprints_admin');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent(parsed);
      } catch (e) {
        console.error('Failed to parse saved content:', e);
      }
    }
  }, []);

  useEffect(() => {
    setContent(defaultContent[lang]);
  }, [lang]);

  // Custom cursor effect - only on desktop
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return; // Skip cursor effect on mobile
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    
    window.addEventListener('mousemove', move);
    
    return () => {
      window.removeEventListener('mousemove', move);
      cursor.remove();
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent lang={lang} setLang={setLang} content={content} setContent={setContent} />
    </BrowserRouter>
  );
}

export default App;