import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Stats from './components/Stats';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import translations from './data/siteData';

function AppContent({ lang, setLang, content, setContent }) {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="App" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {!isAdminRoute && <Navbar lang={lang} copy={content.navbar} toggleLang={toggleLang} />}
      <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
        <Route path="/:lang" element={
          <>
            <HeroSection copy={content.hero} />
            <Stats stats={content.stats} />
            <Services copy={content.services} />
            <Portfolio copy={content.portfolio} />
            <CTASection copy={content.cta} />
            <ContactSection copy={content.contact} />
            <Footer copy={content.footer} />
          </>
        } />
        <Route path="/admin" element={<AdminPage lang={lang} toggleLang={toggleLang} content={content} onContentUpdate={setContent} storageKey="cimprints_admin" />} />
      </Routes>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const [content, setContent] = useState(translations.en);
  useEffect(() => setContent(translations[lang]), [lang]);

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    const move = (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); cursor.remove(); };
  }, []);

  return (
    <BrowserRouter>
      <AppContent lang={lang} setLang={setLang} content={content} setContent={setContent} />
    </BrowserRouter>
  );
}
export default App;