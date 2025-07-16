import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MusicAudioPage.scss';

const MusicAudioPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    sort: 'popular',
    serviceType: '',
  });
  const { subcategory } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const mockServices = [
          {
            id: 1,
            title: 'Create a Custom Song for You',
            seller: 'songwriter_pro',
            rating: 4.9,
            reviews: 215,
            price: 100,
            deliveryTime: '7 days',
            image: 'https://via.placeholder.com/300x200?text=Custom+Song',
            isFavorite: false,
            type: 'songwriting',
            tags: ['original', 'lyrics', 'composition']
          },
          {
            id: 2,
            title: 'Professional Voice Over Recording',
            seller: 'voice_artist',
            rating: 4.8,
            reviews: 178,
            price: 50,
            deliveryTime: '3 days',
            image: 'https://via.placeholder.com/300x200?text=Voice+Over',
            isFavorite: false,
            type: 'voiceover',
            tags: ['commercial', 'narration', 'english']
          },
          {
            id: 3,
            title: 'Mix and Master Your Track',
            seller: 'audio_engineer',
            rating: 5.0,
            reviews: 342,
            price: 80,
            deliveryTime: '5 days',
            image: 'https://via.placeholder.com/300x200?text=Mixing+Mastering',
            isFavorite: false,
            type: 'mixing',
            tags: ['edm', 'pop', 'professional']
          },
          {
            id: 4,
            title: 'Create a Podcast Intro Music',
            seller: 'jingle_composer',
            rating: 4.7,
            reviews: 94,
            price: 40,
            deliveryTime: '2 days',
            image: 'https://via.placeholder.com/300x200?text=Podcast+Music',
            isFavorite: false,
            type: 'jingle',
            tags: ['podcast', 'intro', 'short']
          },
          {
            id: 5,
            title: 'Professional Audio Editing',
            seller: 'audio_editor',
            rating: 4.8,
            reviews: 126,
            price: 30,
            deliveryTime: '1 day',
            image: 'https://via.placeholder.com/300x200?text=Audio+Editing',
            isFavorite: false,
            type: 'editing',
            tags: ['cleanup', 'podcast', 'vocal']
          },
          {
            id: 6,
            title: 'Create EDM Track for Your Project',
            seller: 'edm_producer',
            rating: 4.9,
            reviews: 187,
            price: 150,
            deliveryTime: '10 days',
            image: 'https://via.placeholder.com/300x200?text=EDM+Track',
            isFavorite: false,
            type: 'production',
            tags: ['edm', 'dance', 'custom']
          },
        ];

        const filtered = subcategory 
          ? mockServices.filter(service => service.type === subcategory)
          : mockServices;
        
        setServices(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, [subcategory]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFavorite = (id) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, isFavorite: !service.isFavorite } : service
      )
    );
  };

  const filteredServices = services
    .filter(service => {
      if (filters.minPrice && service.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && service.price > Number(filters.maxPrice)) return false;
      if (filters.deliveryTime) {
        const deliveryDays = parseInt(service.deliveryTime);
        if (filters.deliveryTime === 'fast' && deliveryDays > 3) return false;
        if (filters.deliveryTime === 'very_fast' && deliveryDays > 1) return false;
      }
      if (filters.serviceType && !service.tags.includes(filters.serviceType)) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'price_low') return a.price - b.price;
      if (filters.sort === 'price_high') return b.price - a.price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews; // Popular (reviews)
    });

  const subcategories = [
    { name: 'Voice Over', id: 'voiceover' },
    { name: 'Mixing & Mastering', id: 'mixing' },
    { name: 'Songwriting', id: 'songwriting' },
    { name: 'Jingles & Intros', id: 'jingle' },
    { name: 'Audio Editing', id: 'editing' },
    { name: 'Music Production', id: 'production' },
    { name: 'Beat Making', id: 'beats' },
    { name: 'Sound Effects', id: 'sfx' },
  ];

  const serviceTags = [
    'original', 'cover', 'lyrics', 'commercial', 
    'narration', 'edm', 'pop', 'podcast', 'intro',
    'professional', 'english', 'spanish', 'rap'
  ];

  return (
    <div className="music-audio-page">
      <div className="hero-section">
        <h1>Music & Audio Services</h1>
        <p>Find professional musicians, voice artists, and audio engineers for your project</p>
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
              <select name="deliveryTime" value={filters.deliveryTime} onChange={handleFilterChange}>
                <option value="">Any</option>
                <option value="very_fast">Up to 24 hours</option>
                <option value="fast">Up to 3 days</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Service Type</label>
              <select name="serviceType" value={filters.serviceType} onChange={handleFilterChange}>
                <option value="">All Types</option>
                {serviceTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="subcategories">
            <h3>Subcategories</h3>
            <ul>
              <li>
                <Link to="/categories/music-audio" className={!subcategory ? 'active' : ''}>
                  All Music & Audio
                </Link>
              </li>
              {subcategories.map(sub => (
                <li key={sub.id}>
                  <Link
                    to={`/categories/music-audio/${sub.id}`}
                    className={subcategory === sub.id ? 'active' : ''}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="main-content">
          <div className="sort-options">
            <span>Sort by:</span>
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <span className="results-count">{filteredServices.length} services available</span>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : filteredServices.length === 0 ? (
            <div className="no-results">
              <h3>No services match your filters</h3>
              <p>Try adjusting your filters or browse our other categories</p>
            </div>
          ) : (
            <div className="services-grid">
              {filteredServices.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.title || 'Service'} />
                    <button
                      className={`favorite-btn ${service.isFavorite ? 'active' : ''}`}
                      onClick={() => toggleFavorite(service.id)}
                    >
                      ♥
                    </button>
                    {service.tags.includes('original') && (
                      <span className="tag-original">Original Work</span>
                    )}
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

                    <div className="service-tags">
                      {service.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>

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

export default MusicAudioPage;
