import React from 'react';
const Services = ({ copy }) => (
  <section id="services" className="section">
    <div className="section__header">
      <span className="section__subtitle gradient-border-text">{copy.title}</span>
    </div>
    <div className="services-grid">
      {copy.items.map((s, idx) => (
        <div key={idx} className="service-card">
          <div className="service-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  </section>
);
export default Services;