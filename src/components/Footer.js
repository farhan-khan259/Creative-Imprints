import React from 'react';
import logoImg from '../assets/pictures/logo.jpeg';

const Footer = ({ copy }) => (
  <footer className="footer footer--brand">
    <div className="footer-grid">
      <div className="footer-col footer-col--brand">
        <img src={logoImg} alt="Creative Imprints" className="footer-logo" />
        <h4>{copy.brandName}</h4>
        <p>{copy.brandDescription}</p>
        <div className="footer-contact">
          {copy.email && (
            <a href={`mailto:${copy.email}`} className="footer-link">{copy.email}</a>
          )}
       
        </div>
        <div className="footer-socials">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.99H7.898v-2.887h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.887h-2.33v6.99C18.343 21.128 22 16.991 22 12Z" fill="currentColor"/></svg>
          </a>
          <a href="https://wa.me/0796556988" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-social">
            <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 285.8 32 229.3 32c-125.3 0-227 101.7-227 227 0 40.1 10.5 79.3 30.5 113.7L0 480l109.9-32.2c33.3 18.2 71.3 27.7 109.4 27.7h0.1c125.3 0 227-101.7 227-227 0-56.5-23.1-109.7-65.1-151.7zM229.3 393.5c-32.6 0-64.4-8.7-92.4-25.2l-6.6-3.9-65.3 19.1 17.4-63.7-4.3-6.9c-18.1-29.6-27.7-63.9-27.7-98.2 0-103.3 84.1-187.4 187.4-187.4 50.1 0 97.2 19.5 132.6 54.9 35.4 35.4 54.9 82.5 54.9 132.6 0 103.3-84.1 187.4-187.4 187.4zm101.8-138.2c-5.6-2.8-33.3-16.5-38.4-18.3-5.1-1.8-8.8-2.8-12.5 2.8-3.6 5.6-14 18.3-17.1 22.1-3.1 3.8-6.3 4.3-11.9 1.4-33.3-16.7-55-29.7-77.1-67-5.8-10-1.3-15.4 4.1-20.3 4.2-4.1 9.4-10.8 14.1-16.2 1.5-1.8 1.7-3.3 2.6-5.6 0.9-2.3 0.5-4.3-0.2-6.1-0.7-1.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.4-12.5-9.6-3.2-0.2-6.9-0.2-10.6-0.2-3.8 0-9.9 1.4-15.1 7-5.2 5.6-19.8 19.4-19.8 47.4s20.3 55 23.1 58.9c2.8 3.8 39.8 60.8 96.4 85.3 13.5 5.8 24 9.3 32.2 11.9 13.5 4.4 25.8 3.8 35.5 2.3 10.8-1.7 33.3-13.6 38-26.8 4.7-13.2 4.7-24.6 3.3-27.1-1.4-2.6-5-4.1-10.6-6.9z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-col footer-col--links">
        <h4>Quick Links</h4>
        <ul>{copy.quickLinks.map((l, i) => (<li key={i}><a href={`#${l.toLowerCase().replace(' ','')}`}>{l}</a></li>))}</ul>
      </div>
      <div className="footer-col footer-col--info">
        <h4>{copy.contactTitle}</h4>
        <p>{copy.address}</p>
        {copy.email && <p><a href={`mailto:${copy.email}`} className="footer-link">{copy.email}</a></p>}
        <p><a href={`tel:${copy.phone}`} className="footer-link">{copy.phone}</a></p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>{copy.copyright}</p>
      
    </div>
  </footer>
);

export default Footer;
