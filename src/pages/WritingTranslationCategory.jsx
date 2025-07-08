// src/pages/WritingTranslationCategory.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './WritingTranslationCategory.scss';

const WritingTranslationCategory = () => {
  const subcategories = [
    {
      id: 1,
      title: 'Content Writing',
      description: 'Engaging content for your website or blog',
      icon: '✍'
    },
    {
      id: 2,
      title: 'Copywriting',
      description: 'Persuasive writing for marketing materials',
      icon: '📝'
    },
    {
      id: 3,
      title: 'Technical Writing',
      description: 'Clear documentation for technical products',
      icon: '🔧'
    },
    {
      id: 4,
      title: 'Translation',
      description: 'Professional translation services',
      icon: '🌐'
    },
    {
      id: 5,
      title: 'Proofreading & Editing',
      description: 'Polish your existing content',
      icon: '🔍'
    },
    {
      id: 6,
      title: 'Creative Writing',
      description: 'Stories, scripts, and creative content',
      icon: '🎭'
    },
    {
      id: 7,
      title: 'Resume Writing',
      description: 'Professional resumes and cover letters',
      icon: '📄'
    },
    {
      id: 8,
      title: 'Transcription',
      description: 'Convert audio to text',
      icon: '🎧'
    }
  ];

  const popularServices = [
    {
      id: 101,
      title: 'Write a 1000-word blog post',
      rating: 4.9,
      price: 25,
      delivery: '3 days'
    },
    {
      id: 102,
      title: 'Translate document to Spanish',
      rating: 4.8,
      price: 30,
      delivery: '2 days'
    },
    // You can add more services here
  ];

  return (
    <div className="writing-translation-category">
      <div className="hero-section">
        <h1>Writing & Translation</h1>
        <p>Quality content and language services for your business</p>
      </div>

      <div className="subcategories-section">
        <h2>Writing & Translation Services</h2>
        <div className="subcategories-grid">
          {subcategories.map(sub => (
            <Link to={`/writing-translation/${sub.id}`} key={sub.id} className="subcategory-card">
              <div className="subcategory-icon">{sub.icon}</div>
              <h3>{sub.title}</h3>
              <p>{sub.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="popular-services-section">
        <h2>Most Popular Writing Services</h2>
        <div className="popular-services-grid">
          {popularServices.map(service => (
            <Link to={`/service/${service.id}`} key={service.id} className="popular-service-card">
              <h3>{service.title}</h3>
              <div className="service-meta">
                <span className="rating">⭐ {service.rating}</span>
                <span className="price">From ${service.price}</span>
                <span className="delivery">{service.delivery}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="language-selection">
        <h2>Translation Languages</h2>
        <div className="languages-grid">
          {['Spanish', 'French', 'German', 'Chinese', 'Arabic', 'Japanese', 'Russian', 'Portuguese'].map(lang => (
            <div key={lang} className="language-card">
              {lang}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritingTranslationCategory;
