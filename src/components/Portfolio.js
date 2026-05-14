import React from 'react';
import service1 from '../assets/pictures/service1.jpeg';
import service2 from '../assets/pictures/service2.jpeg';
import service3 from '../assets/pictures/service3.jpeg';
import service4 from '../assets/pictures/service4.jpeg';
import service5 from '../assets/pictures/service5.jpeg';

const imageMap = {
  portfolio1: service1,
  portfolio2: service2,
  portfolio3: service3,
  portfolio4: service4,
  portfolio5: service5,
};

const Portfolio = ({ copy }) => (
  <section id="portfolio" className="section">
    <div className="section__header">
      <span className="section__subtitle gradient-border-text">{copy.title}</span>
    </div>
    <div className="portfolio-grid">
      {copy.items.map((item, idx) => (
        <div key={idx} className="portfolio-card">
          <img src={imageMap[item.imageKey || item.image]} alt={item.title} className="portfolio-image" />
          <div className="portfolio-content">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Portfolio;