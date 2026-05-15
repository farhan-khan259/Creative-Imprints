import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ copy }) => (
  <section id="testimonials" className="section testimonials-section">
    <div className="section__header">
      <span className="section__label">{copy.label}</span>
      <h2>{copy.title}</h2>
    </div>
    <div className="testimonials-grid">
      {copy.items.map((testimonial, idx) => (
        <motion.article
          key={idx}
          className="testimonial-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.15 }}
          viewport={{ once: true }}
        >
          <div className="testimonial-quote">
            <span className="quote-icon">❝</span>
            <p>{testimonial.quote}</p>
          </div>
          <div className="testimonial-author">
            <div className="author-avatar" style={{ backgroundColor: `hsla(${(idx * 120) % 360}, 70%, 50%, 0.8)` }}>
              {testimonial.avatar}
            </div>
            <div>
              <h4>{testimonial.name}</h4>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default Testimonials;
