// src/components/StudioSection.js
import React from 'react';

const StudioSection = ({ copy }) => (
  <section className="section studio-section" id="about">
    <div className="section__header">
      <span className="section__subtitle">About us</span>
      <h2>{copy.title}</h2>
      <p className="section__description">{copy.subtitle}</p>
    </div>
    <div className="studio-grid">
      <article className="studio-card glass-card">
        <div className="studio-card__badge">
          <div className="studio-card__icon" aria-hidden="true">👁️</div>
        </div>
        <div className="studio-card__content">
          <h3>Our Vision</h3>
          <p>{copy.vision}</p>
        </div>
      </article>
      <article className="studio-card glass-card">
        <div className="studio-card__badge">
          <div className="studio-card__icon" aria-hidden="true">🎯</div>
        </div>
        <div className="studio-card__content">
          <h3>Our Mission</h3>
          <p>{copy.mission}</p>
        </div>
      </article>
    </div>
  </section>
);

export default StudioSection;