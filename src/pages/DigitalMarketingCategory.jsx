// src/pages/DigitalMarketingCategory.js
import React from 'react';
import { Link } from 'react-router-dom';
import './DigitalMarketingCategory.scss';

const DigitalMarketingCategory = () => {
  const subcategories = [
    {
      id: 1,
      title: 'Social Media Marketing',
      description: 'Grow your social media presence',
      image: 'https://via.placeholder.com/300x200?text=Social+Media+Marketing'
    },
    {
      id: 2,
      title: 'SEO Services',
      description: 'Improve your search engine rankings',
      image: 'https://via.placeholder.com/300x200?text=SEO+Services'
    },
    {
      id: 3,
      title: 'Content Marketing',
      description: 'Engaging content for your audience',
      image: 'https://via.placeholder.com/300x200?text=Content+Marketing'
    },
    {
      id: 4,
      title: 'Email Marketing',
      description: 'Effective email campaigns',
      image: 'https://via.placeholder.com/300x200?text=Email+Marketing'
    },
    {
      id: 5,
      title: 'PPC Advertising',
      description: 'Pay-per-click campaign management',
      image: 'https://via.placeholder.com/300x200?text=PPC+Advertising'
    },
    {
      id: 6,
      title: 'Influencer Marketing',
      description: 'Connect with influencers in your niche',
      image: 'https://via.placeholder.com/300x200?text=Influencer+Marketing'
    }
  ];

  return (
    <div className="digital-marketing-category">
      <div className="hero-section">
        <h1>Digital Marketing</h1>
        <p>Grow your business with expert marketing strategies</p>
      </div>
      
      <div className="popular-services">
        <h2>Popular Digital Marketing Services</h2>
        <div className="subcategories-grid">
          {subcategories.map(sub => (
            <Link to={`/digital-marketing/${sub.id}`} key={sub.id} className="subcategory-card">
              <img src={sub.image} alt={sub.title} />
              <h3>{sub.title}</h3>
              <p>{sub.description}</p>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="trending-services">
        <h2>Trending in Digital Marketing</h2>
        <div className="trending-list">
          {/* Trending services would be mapped here */}
        </div>
      </div>
      
      <div className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-cards">
          {/* Testimonials would go here */}
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingCategory;
