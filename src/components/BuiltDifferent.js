// src/components/BuiltDifferent.js
import React from 'react';
import { motion } from 'framer-motion';

const BuiltDifferent = ({ copy }) => (
  <section className="section built-different-section">
    <div className="section__header">
      <span className="section__label">Why Creative Imprints</span>
      <h2>{copy.title}</h2>
    </div>
    <div className="features-grid">
      {copy.items.map((feature, idx) => (
        <motion.div
          key={idx}
          className="feature-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="feature-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
export default BuiltDifferent;