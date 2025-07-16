// src/pages/VideoAnimationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VideoAnimationPage.scss';

const VideoAnimationPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    sort: 'popular',
  });
  const { category } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const mockServices = [
          {
            id: 1,
            title: 'Create Whiteboard Animation Videos',
            seller: 'animation_pro',
            rating: 4.9,
            reviews: 128,
            price: 50,
            deliveryTime: '3 days',
            image: 'https://via.placeholder.com/300x200?text=Whiteboard+Animation',
            isFavorite: false,
          },
          {
            id: 2,
            title: '2D Animated Explainer Video',
            seller: 'video_wizard',
            rating: 4.8,
            reviews: 95,
            price: 100,
            deliveryTime: '5 days',
            image: 'https://via.placeholder.com/300x200?text=2D+Explainer',
            isFavorite: false,
          },
          {
            id: 3,
            title: '3D Product Animation',
            seller: '3d_animation_studio',
            rating: 5.0,
            reviews: 64,
            price: 200,
            deliveryTime: '7 days',
            image: 'https://via.placeholder.com/300x200?text=3D+Product',
            isFavorite: false,
          },
          {
            id: 4,
            title: 'Animated Logo Reveal',
            seller: 'motion_designer',
            rating: 4.7,
            reviews: 42,
            price: 30,
            deliveryTime: '2 days',
            image: 'https://via.placeholder.com/300x200?text=Logo+Reveal',
            isFavorite: false,
          },
          {
            id: 5,
            title: 'Character Animation',
            seller: 'character_animator',
            rating: 4.9,
            reviews: 87,
            price: 150,
            deliveryTime: '4 days',
            image: 'https://via.placeholder.com/300x200?text=Character+Animation',
            isFavorite: false,
          },
        ];
        
        setServices(mockServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFavorite = (id) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isFavorite: !service.isFavorite } : service
    ));
  };

  const filteredServices = services.filter(service => {
    if (filters.minPrice && service.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && service.price > Number(filters.maxPrice)) return false;
    if (filters.deliveryTime) {
      const deliveryDays = parseInt(service.deliveryTime);
      if (filters.deliveryTime === 'fast' && deliveryDays > 3) return false;
      if (filters.deliveryTime === 'very_fast' && deliveryDays > 1) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'price_low') return a.price - b.price;
    if (filters.sort === 'price_high') return b.price - a.price;
    if (filters.sort === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const subcategories = [
    { name: 'Whiteboard', id: 'whiteboard' },
    { name: '2D Animation', id: '2d' },
    { name: '3D Animation', id: '3d' },
    { name: 'Logo Animation', id: 'logo' },
    { name: 'Character Animation', id: 'character' },
    { name: 'Explainer Videos', id: 'explainer' },
    { name: 'Lyric Videos', id: 'lyric' },
    { name: 'Motion Graphics', id: 'motion' },
  ];

  return (
    <div className="video-animation-page">
      <div className="hero-section">
        <h1>Video & Animation Services</h1>
        <p>Get professional video editing, animation, and motion graphics services</p>
      </div>

      <div className="container">
        <div className="sidebar">
          <div className="filter-section">
            <h3>Filter By</h3>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range">
                <input 
                  type="number" 
                  placeholder="Min" 
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <span>to</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Delivery Time</label>
              <select 
                name="deliveryTime"
                value={filters.deliveryTime}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="very_fast">Up to 24 hours</option>
                <option value="fast">Up to 3 days</option>
              </select>
            </div>
          </div>

          <div className="subcategories">
            <h3>Subcategories</h3>
            <ul>
              {subcategories.map(sub => (
                <li key={sub.id}>
                  <a 
                    href={`/categories/video-animation/${sub.id}`} 
                    className={category === sub.id ? 'active' : ''}
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="main-content">
          <div className="sort-options">
            <span>Sort by:</span>
            <select 
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <span className="results-count">{filteredServices.length} services available</span>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="services-grid">
              {filteredServices.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                    <button 
                      className={`favorite-btn ${service.isFavorite ? 'active' : ''}`}
                      onClick={() => toggleFavorite(service.id)}
                    >
                      ♥
                    </button>
                  </div>
                  <div className="service-details">
                    <div className="seller-info">
                      <img 
                        src={`https://via.placeholder.com/40x40?text=${service.seller.charAt(0).toUpperCase()}`} 
                        alt={service.seller}
                        className="seller-avatar"
                      />
                      <div>
                        <span className="seller-name">{service.seller}</span>
                        <div className="rating">
                          <span className="stars">★★★★★</span>
                          <span className="rating-value">{service.rating}</span>
                          <span className="reviews">({service.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <div className="service-meta">
                      <span className="price">Starting at ${service.price}</span>
                      <span className="delivery-time">{service.deliveryTime} delivery</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoAnimationPage;
