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

const STORAGE_KEY = 'cimprints_admin';
const API_URL = process.env.REACT_APP_API_URL || '/api/content';

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDeep(base, override) {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? deepClone(override) : deepClone(base);
  }

  if (base && typeof base === 'object') {
    const result = deepClone(base);
    if (override && typeof override === 'object') {
      Object.keys(override).forEach((key) => {
        if (base[key] && typeof base[key] === 'object' && !Array.isArray(base[key]) && override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
          result[key] = mergeDeep(base[key], override[key]);
        } else {
          result[key] = deepClone(override[key]);
        }
      });
    }

    return result;
  }

  return override !== undefined ? deepClone(override) : deepClone(base);
}

function buildContentStore(rawContent) {
  const content = rawContent && typeof rawContent === 'object' ? rawContent : {};

  if (content.en || content.ar) {
    return {
      en: mergeDeep(deepClone(defaultContent.en), content.en || {}),
      ar: mergeDeep(deepClone(defaultContent.ar), content.ar || {})
    };
  }

  return deepClone(defaultContent);
}

function loadInitialContentStore() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return deepClone(defaultContent);
  }

  try {
    return buildContentStore(JSON.parse(saved));
  } catch (error) {
    console.error('Failed to parse saved content:', error);
    return deepClone(defaultContent);
  }
}

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

  // contentStore holds per-language copies, e.g. { en: {...}, ar: {...} }
  const [contentStore, setContentStore] = useState(() => loadInitialContentStore());

  useEffect(() => {
    let active = true;

    const syncRemoteContent = async () => {
      try {
        const response = await fetch(API_URL, { headers: { Accept: 'application/json' } });
        if (!response.ok) {
          return;
        }

        const snapshot = await response.json();
        if (!snapshot || !snapshot.content) {
          return;
        }

        const merged = buildContentStore(snapshot.content);
        if (!active) {
          return;
        }

        setContentStore(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (error) {
        // Keep local state if the API is unavailable.
      }
    };

    void syncRemoteContent();

    return () => {
      active = false;
    };
  }, []);

  const content = contentStore[lang] || defaultContent[lang];

  // Update current language content and persist to localStorage
  const setContent = (nextContent) => {
    setContentStore((prev) => {
      const updated = buildContentStore({ ...(prev || defaultContent), [lang]: nextContent });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }

      void fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updated })
      }).catch(() => {
        // Keep the local save even if the backend is temporarily offline.
      });

      return updated;
    });
  };

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