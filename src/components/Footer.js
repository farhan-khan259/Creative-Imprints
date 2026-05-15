import React from 'react';
import logo from '../assets/pictures/logo.jpeg';

const Footer = ({ copy }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <img src={logo} alt="Creative Imprints" className="footer-logo" />
            <div>
              <h4>{copy.brandName}</h4>
              <p>{copy.tagline}</p>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h5>Navigate</h5>
          <ul>
            {copy.links.navigate.map((link, idx) => (
              <li key={idx}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h5>Social</h5>
          <div className="social-links">
            <a href="https://twitter.com" title="Twitter" target="_blank" rel="noopener noreferrer">𝕏</a>
            <a href="https://linkedin.com" title="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
            <a href="https://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
            <a href="https://github.com" title="GitHub" target="_blank" rel="noopener noreferrer">⚙️</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{copy.copyright}</p>
    
      </div>
    </footer>
  );
};

export default Footer;
