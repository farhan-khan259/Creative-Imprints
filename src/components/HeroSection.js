import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/pictures/herosection.jpeg';

const HeroSection = ({ copy }) => {
  return (
    <section id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '120px 24px' }}>
      <img
        src={heroBg}
        alt="Hero background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          zIndex: -2,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,14,23,0.7) 0%, rgba(36,99,235,0.15) 50%, rgba(139,92,246,0.1) 100%)', zIndex: -1 }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="gradient-border-text" style={{ marginBottom: '24px', display: 'inline-block' }}>{copy.eyebrow}</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', lineHeight: 1.1, marginTop: '20px', color: 'white' }}>
          {copy.title.replace('Digital Reality', '')}
          <span style={{
            background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-violet))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}>Digital Reality</span>
        </h1>
        <p style={{ maxWidth: '700px', margin: '24px auto', color: 'var(--text-muted)', fontSize: '1.2rem' }}>{copy.subtitle}</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="button button--primary">{copy.primaryButton}</a>
          <a href="#portfolio" className="button button--outline">{copy.outlineButton}</a>
        </div>
      </motion.div>
    </section>
  );
};
export default HeroSection;