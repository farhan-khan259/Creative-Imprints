import React from 'react';
const ContactSection = ({ copy }) => (
  <section id="contact" className="section">
    <div className="contact-grid">
      <div className="contact-form">
        <h2>{copy.title}</h2>
        <form>
          <input type="text" placeholder={copy.fullName} />
          <input type="email" placeholder={copy.email || 'Email Address'} />
          <input type="tel" placeholder={copy.phoneNumber} />
          <textarea rows="5" placeholder={copy.message}></textarea>
          <button className="button button--primary">{copy.button}</button>
        </form>
      </div>
      <div className="contact-details">
        <div className="contact-item"><div className="contact-icon">📍</div><div><strong>{copy.infoTitle}</strong><br />{copy.address}</div></div>
        <div className="contact-item"><div className="contact-icon" style={{ background: 'rgba(36,99,235,0.2)', color: '#2463EB' }}>📞</div><div>{copy.phone}</div></div>
        <div className="contact-item"><div className="contact-icon" style={{ background: 'rgba(139,92,246,0.2)', color: '#8B5CF6' }}>✉️</div><div>{copy.email}</div></div>
      </div>
    </div>
  </section>
);
export default ContactSection;