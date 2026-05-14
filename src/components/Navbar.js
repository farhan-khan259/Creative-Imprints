import React, { useState } from 'react';
import logo from '../assets/pictures/logo.jpeg';

const Navbar = ({ lang, copy, toggleLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(16px)', background: 'rgba(10,14,23,0.85)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', margin: '0 auto', padding: '18px 24px' }}>
        <div className="navbar__brand">
          <img src={logo} alt="Creative Imprints logo" style={{ width: '48px', height: '48px', borderRadius: '16px' }} />
          <div>
            <h3 style={{ margin: 0 }}>{copy.brandName}</h3>
            <small style={{ opacity: 0.7 }}>{copy.brandTag}</small>
          </div>
        </div>
        <div className={`navbar__links ${menuOpen ? 'active' : ''}`}>
          {copy.links.map((link, idx) => (
            <a key={idx} href={`#${link.toLowerCase().replace(' ', '')}`} onClick={() => setMenuOpen(false)}>{link}</a>
          ))}
          <button onClick={toggleLang} className="button button--outline" style={{ padding: '8px 20px' }}>{copy.langButton}</button>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div style={{ width: '28px', height: '2px', background: 'white', margin: '6px 0' }}></div>
          <div style={{ width: '28px', height: '2px', background: 'white', margin: '6px 0' }}></div>
          <div style={{ width: '28px', height: '2px', background: 'white', margin: '6px 0' }}></div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;