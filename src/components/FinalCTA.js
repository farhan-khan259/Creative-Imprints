import React, { useState } from 'react';

const FinalCTA = ({ copy }) => {
  const [formData, setFormData] = useState({ name: '', email: '', project: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${copy.email}?subject=New Project Inquiry&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AProject: ${formData.project}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid">
        <div className="contact-left">
          <span className="section__label">{copy.label}</span>
          <h2>{copy.title}</h2>
          <p className="contact-subtitle">{copy.subtitle}</p>

          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <a href={`mailto:${copy.email}`}>{copy.email}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href={`tel:${copy.phone.replace(/\s/g, '')}`}>{copy.phone}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>{copy.location}</p>
            </div>
            <a href="https://wa.me/966500000000" className="contact-whatsapp" target="_blank" rel="noopener noreferrer">
              <span>💬</span> {copy.whatsapp}
            </a>
          </div>
        </div>

        <div className="contact-form-wrapper glass-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{copy.formLabels.name}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label>{copy.formLabels.email}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>{copy.formLabels.project}</label>
              <textarea name="project" value={formData.project} onChange={handleChange} placeholder="Tell us about your project..." rows="4" required />
            </div>
            <button type="submit" className="button button--primary form-submit">
              <span>✈️</span> {copy.formLabels.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
