import React, { useEffect, useState } from 'react';

const AnimatedNumber = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value) || 0;
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return (
    <div className="stat-card">
      <strong>{count}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}</strong>
      <span>{label}</span>
    </div>
  );
};

const Stats = ({ stats }) => (
  <section className="section">
    <div className="section__header">
      <span className="section__subtitle gradient-border-text">Trusted by ambitious teams</span>
    </div>
    <div className="stats-grid">
      {stats.map((stat, i) => <AnimatedNumber key={i} value={stat.value} label={stat.label} />)}
    </div>
  </section>
);
export default Stats;