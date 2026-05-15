// src/components/ExpertiseSection.js
import React from 'react';
import { motion } from 'framer-motion';

const ExpertiseSection = ({ copy }) => (
  <section id="expertise" className="section expertise-section">
    <div className="section__header">
      <span className="section__label">What we do</span>
      <h2>{copy.title}</h2>
      <p className="section__description">{copy.subtitle}</p>
    </div>
    <div className="services-grid">
      {copy.items.map((service, idx) => (
        <motion.div
          key={idx}
          className="service-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          viewport={{ once: true }}
        >
          <div className="service-icon">{service.icon}</div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ExpertiseSection;