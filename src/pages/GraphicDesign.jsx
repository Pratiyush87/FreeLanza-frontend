// src/pages/GraphicDesign.jsx
import React, { useState, useEffect } from 'react';
import GigCard from '../components/GraphicDesign/GigCard';
import Filters from '../components/GraphicDesign/Filters';
import './GraphicDesign.css';

const GraphicDesign = () => {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample categories data
  const categories = [
    { id: 'logo-design', name: 'Logo Design' },
    { id: 'brand-identity', name: 'Brand Identity' },
    { id: 'illustration', name: 'Illustration' },
    { id: 'social-media', name: 'Social Media Design' },
    { id: 'print-design', name: 'Print Design' },
    { id: 'packaging', name: 'Packaging Design' },
  ];

  // Subcategories for the active category
  const subcategories = {
    'logo-design': [
      { id: 'mascot', name: 'Mascot Logo' },
      { id: '3d', name: '3D Logo' },
      { id: 'minimalist', name: 'Minimalist Logo' },
    ],
    'brand-identity': [
      { id: 'full-identity', name: 'Full Brand Identity' },
      { id: 'business-card', name: 'Business Cards' },
      { id: 'letterhead', name: 'Letterheads' },
    ],
    // Add more subcategories for other categories
  };

  // Fetch gigs (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleGigs = [
        {
          id: 1,
          title: 'Design a professional logo for your business',
          image: 'https://via.placeholder.com/300x200',
          seller: {
            name: 'designexpert',
            avatar: 'https://via.placeholder.com/50',
          },
          rating: 4.9,
          reviews: 128,
          startingPrice: 20,
          category: 'logo-design',
          deliveryTime: '3 days',
        },
        {
          id: 2,
          title: 'Create a complete brand identity package',
          image: 'https://via.placeholder.com/300x200',
          seller: {
            name: 'brandpro',
            avatar: 'https://via.placeholder.com/50',
          },
          rating: 5.0,
          reviews: 256,
          startingPrice: 50,
          category: 'brand-identity',
          deliveryTime: '5 days',
        },
        // Add more sample gigs
      ];
      
      setGigs(sampleGigs);
      setFilteredGigs(sampleGigs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters) => {
    // Apply filters to gigs
    let results = [...gigs];
    
    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(gig => gig.category === activeCategory);
    }
    
    // Filter by price range
    if (filters.priceRange) {
      results = results.filter(gig => 
        gig.startingPrice >= filters.priceRange[0] && 
        gig.startingPrice <= filters.priceRange[1]
      );
    }
    
    // Filter by selected categories if any
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter(gig => filters.categories.includes(gig.category));
    }
    
    setFilteredGigs(results);
  };

  return (
    <div className="graphic-design-page">
      <div className="category-header">
        <h1>Graphics & Design</h1>
        <p>Find the perfect design service for your business</p>
      </div>
      
      <div className="category-navigation">
        <div className="main-categories">
          <button 
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={activeCategory === category.id ? 'active' : ''}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {activeCategory !== 'all' && (
          <div className="subcategories">
            {subcategories[activeCategory]?.map(sub => (
              <button key={sub.id}>{sub.name}</button>
            ))}
          </div>
        )}
      </div>
      
      <div className="content-container">
        <Filters 
          categories={categories} 
          onFilterChange={handleFilterChange} 
        />
        
        <div className="gigs-container">
          {loading ? (
            <div className="loading">Loading gigs...</div>
          ) : filteredGigs.length > 0 ? (
            <div className="gigs-grid">
              {filteredGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          ) : (
            <div className="no-results">No gigs match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphicDesign;