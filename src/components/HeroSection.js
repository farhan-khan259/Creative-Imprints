// src/components/HeroSection.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/pictures/hero-bg.jpg';

const stats = [
  { value: '120+', label: 'Projects delivered' },
  { value: '80+', label: 'Happy clients' },
  { value: '15+', label: 'Countries' },
  { value: '7+', label: 'Years of craft' },
];

const pillVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const sparkles = [
  { className: 'hero-orb hero-orb--lg', style: { top: '16%', left: '17%' } },
  { className: 'hero-orb hero-orb--md', style: { top: '13%', left: '60%' } },
  { className: 'hero-orb hero-orb--sm', style: { top: '28%', right: '10%' } },
  { className: 'hero-orb hero-orb--xs', style: { bottom: '18%', right: '18%' } },
  { className: 'hero-orb hero-orb--sm', style: { bottom: '34%', left: '4%' } },
];

const HeroSection = ({ copy }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);

    window.addEventListener('resize', handleResize);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleMotionChange);
    };
  }, []);

  const scrollToContact = () => {
    const ctaSection = document.getElementById('contact');
    if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth' });
  };

  const orbAnimationDuration = isMobile || prefersReducedMotion ? 10 : 5;

  return (
    <section id="home" className="hero-shell">
      <div className="hero-shell__bg">
        <img 
          src={heroBg} 
          alt="Abstract glowing orbs background" 
          className="hero-shell__image"
          loading="lazy"
        />
        <div className="hero-shell__overlay" />
        <div className="hero-shell__grid" />
        <div className="hero-shell__glow hero-shell__glow--left" />
        <div className="hero-shell__glow hero-shell__glow--right" />
      </div>

      <div className="hero-shell__inner section">
        {!prefersReducedMotion && sparkles.map((orb, index) => (
          <motion.span
            key={index}
            className={orb.className}
            style={orb.style}
            aria-hidden="true"
            animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: orbAnimationDuration + index, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={{ 
            show: { 
              transition: { 
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
                delayChildren: prefersReducedMotion ? 0 : 0,
              } 
            } 
          }}
        >
          <motion.div className="hero-badge" variants={prefersReducedMotion ? {} : pillVariants} custom={0}>
            <span className="hero-badge__dot" />
            Premium Software & AI Studio
          </motion.div>

          <motion.h1 className="hero-title" variants={prefersReducedMotion ? {} : pillVariants} custom={0.08}>
            <span className="hero-title__line">We craft</span>
            <span className="hero-title__line hero-title__line--accent">cinematic digital</span>
            <span className="hero-title__line">products.</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={prefersReducedMotion ? {} : pillVariants} custom={0.16}>
            {copy.subtitle}
          </motion.p>

          <motion.div className="hero-actions" variants={prefersReducedMotion ? {} : pillVariants} custom={0.24}>
            <button onClick={scrollToContact} className="hero-button hero-button--primary">
              <span>{copy.button.replace('→', '').trim()}</span>
              <span className="hero-button__icon">→</span>
            </button>
            <a href="#portfolio" className="hero-button hero-button--secondary">
              <span className="hero-button__play">▶</span>
              <span>Explore work</span>
            </a>
          </motion.div>

          <motion.div className="hero-stats" variants={prefersReducedMotion ? {} : pillVariants} custom={0.32}>
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;