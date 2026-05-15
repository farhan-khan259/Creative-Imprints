import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Portfolio = ({ copy }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadedImages, setLoadedImages] = useState({});

  const filteredItems = selectedCategory === 'All'
    ? copy.items
    : copy.items.filter((item) => item.category === selectedCategory);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="section__header">
        <span className="section__label">{copy.label}</span>
        <h2>{copy.title}</h2>
      </div>

      <div className="portfolio-filters">
        {copy.categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        className="portfolio-grid"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredItems.map((item, idx) => (
          <motion.article
            key={idx}
            className="portfolio-card"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {item.image && (
              <div className="portfolio-image">
                <img
                  src={require(`../assets/pictures/${item.image}`)}
                  alt={item.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(idx)}
                  className={loadedImages[idx] ? 'loaded' : ''}
                />
              </div>
            )}
            <div className="portfolio-header">
              <span className="portfolio-tag">{item.category.toUpperCase()}</span>
              <span className="portfolio-arrow">↗</span>
            </div>
            <div className="portfolio-content">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Portfolio;
