// src/components/HeroSection.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/pictures/hero-bg.jpg';

const stats = [
  { value: '95%', label: 'Satisfaction and ongoing support' },
  { value: '5+', label: 'Years of experience' },
  { value: '100+', label: 'Happy clients' },
  { value: '239+', label: 'Projects delivered' },
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

const parseStatValue = (value) => {
  const match = value.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
};

const formatStatValue = (parts, count) => `${parts.prefix}${count}${parts.suffix}`;

const HeroSection = ({ copy }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [animatedStats, setAnimatedStats] = useState(() =>
    stats.map((stat) => {
      const parsed = parseStatValue(stat.value);
      return parsed ? formatStatValue(parsed, 0) : stat.value;
    })
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

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedStats(stats.map((stat) => stat.value));
      return;
    }

    const parsedStats = stats.map((stat) => parseStatValue(stat.value));
    const animationDuration = 5000;
    const startTime = performance.now();
    let frameId;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / animationDuration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(
        stats.map((stat, index) => {
          const parsed = parsedStats[index];

          if (!parsed) {
            return stat.value;
          }

          const currentValue = Math.round(parsed.target * easedProgress);
          return formatStatValue(parsed, currentValue);
        })
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

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
            <span className="hero-title__line">We turn</span>
            <span className="hero-title__line hero-title__line--accent">your ideas</span>
            <span className="hero-title__line">into a dazzling digital reality.</span>
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
            {stats.map((stat, idx) => (
              <div key={stat.label} className="hero-stat-card">
                <strong>{animatedStats[idx]}</strong>
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