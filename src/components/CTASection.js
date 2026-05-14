import React from 'react';
const CTASection = ({ copy }) => (
  <section className="section" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(36,99,235,0.1), rgba(139,92,246,0.1))', borderRadius: '48px', margin: '40px auto' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>{copy.title}</h2>
      <p style={{ margin: '24px 0', color: 'var(--text-muted)' }}>{copy.subtitle}</p>
      <a href="#contact" className="button button--primary">{copy.button}</a>
    </div>
  </section>
);
export default CTASection;