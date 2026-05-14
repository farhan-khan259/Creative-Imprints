import React from 'react';
import { motion } from 'framer-motion';

const ContentCard = ({ title, subtitle, description, tag, icon, image, tags = [], link, variant = 'default', children }) => {
  const cardClass = `card glass-card ${variant === 'portfolio' ? 'portfolio-card' : variant === 'service' ? 'service-card' : ''}`;

  return (
    <motion.article
      className={cardClass}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {image ? (
        <div className="card__media">
          <img src={image} alt={title} />
          <div className="card__overlay" />
        </div>
      ) : (
        <div className="card__badge">
          <span>{icon}</span>
        </div>
      )}
      <div className="card__body">
        <div className="card__top">
          {tag && <span className="card__tag">{tag}</span>}
          <h3>{title}</h3>
        </div>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {description && <p className="card__text">{description}</p>}
        {tags.length > 0 && (
          <div className="card__tags">
            {tags.map((label) => (
              <span key={label} className="card__tag-pill">{label}</span>
            ))}
          </div>
        )}
        {variant === 'portfolio' && (
          <a
            href={link || '#'}
            target="_blank"
            rel="noreferrer"
            className="card__button"
          >
            View Project
          </a>
        )}
        {children}
      </div>
    </motion.article>
  );
};

export default ContentCard;
