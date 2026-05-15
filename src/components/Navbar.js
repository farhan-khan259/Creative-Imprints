// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import logo from '../assets/pictures/logo.jpeg';

const Navbar = ({ lang, copy, toggleLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen || window.innerWidth > 1024) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className={`navbar ${menuOpen ? 'navbar--menu-open' : ''}`}>
      <div className="navbar__inner glass-card">
        <a href="#home" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Creative Imprints" className="navbar__logo" />
          <div className="navbar__brand-text">
            <h3>{copy.brandName}</h3>
            <p>{copy.brandTag}</p>
          </div>
        </a>

        <nav id="main-nav" className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {copy.links.map((link, idx) => (
            <a key={idx} href={`#${link.toLowerCase().replace(/\s+/g, '')}`} onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <div className="navbar__mobile-actions">
            <button onClick={toggleLang} className="button button--outline navbar__lang">
              {copy.langButton}
            </button>
            <a href="#final-cta" className="button button--primary navbar__cta" onClick={() => setMenuOpen(false)}>
              Start a project
            </a>
          </div>
        </nav>

        <div className="navbar__actions">
          <button onClick={toggleLang} className="button button--outline navbar__lang">
            {copy.langButton}
          </button>
          <a href="#final-cta" className="button button--primary navbar__cta">
            Start a project
          </a>
        </div>

        <button
          className={`navbar__toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;