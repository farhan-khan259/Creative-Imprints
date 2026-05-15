import React from 'react';

const AdminNavbar = ({ onHamburgerClick, sidebarOpen, lang, toggleLang, brandName, brandTag }) => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <div className="admin-navbar-text">
          <h3>{brandName}</h3>
          <p>{brandTag}</p>
        </div>
      </div>
      <div className="admin-navbar-actions">
        <button className="lang-toggle" onClick={toggleLang}>
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <button
          className={`admin-hamburger ${sidebarOpen ? 'active' : ''}`}
          onClick={onHamburgerClick}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;