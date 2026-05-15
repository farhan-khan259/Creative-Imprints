// src/components/Navbar.js
import React, { useState } from 'react';
import logo from '../assets/pictures/logo.jpeg';

const Navbar = ({ lang, copy, toggleLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner glass-card">
        <a href="#home" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Creative Imprints" className="navbar__logo" />
          <div className="navbar__brand-text">
            <h3>{copy.brandName}</h3>
            <p>{copy.brandTag}</p>
          </div>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
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
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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