import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiSearch, FiStar, FiClock } from 'react-icons/fi';
import { FaHeart, FaRegHeart, FaCrown } from 'react-icons/fa';
import './ProgrammingTechPage.scss';

const ProgrammingTechPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    sort: 'popular',
    skill: '',
    proOnly: false,
    rating: ''
  });
  const { subcategory } = useParams();

  const mockServices = [
    {
      id: 1,
      title: 'Build a Responsive React Website',
      seller: 'react_dev',
      rating: 4.9,
      reviews: 342,
      price: 300,
      deliveryTime: 5,
      image: 'https://via.placeholder.com/400x300/3d5a80/ffffff?text=React',
      isFavorite: false,
      category: 'web',
      skills: ['react', 'javascript', 'css', 'responsive'],
      isPro: true,
      description: 'I will build a responsive website using React.js with modern design'
    },
    {
      id: 2,
      title: 'Python Data Analysis Script',
      seller: 'python_expert',
      rating: 4.8,
      reviews: 215,
      price: 150,
      deliveryTime: 3,
      image: 'https://via.placeholder.com/400x300/2d5e4f/ffffff?text=Python',
      isFavorite: false,
      category: 'data',
      skills: ['python', 'pandas', 'numpy', 'data-analysis'],
      isPro: false,
      description: 'Professional Python script for data analysis and visualization'
    },
    {
      id: 3,
      title: 'Full Stack Web Application',
      seller: 'fullstack_pro',
      rating: 5.0,
      reviews: 428,
      price: 500,
      deliveryTime: 7,
      image: 'https://via.placeholder.com/400x300/4d4d4d/ffffff?text=MERN',
      isFavorite: false,
      category: 'web',
      skills: ['node', 'express', 'mongodb', 'react'],
      isPro: true,
      description: 'Complete MERN stack application development'
    },
    {
      id: 4,
      title: 'WordPress Website Fix',
      seller: 'wp_specialist',
      rating: 4.7,
      reviews: 187,
      price: 50,
      deliveryTime: 2,
      image: 'https://via.placeholder.com/400x300/21759b/ffffff?text=WordPress',
      isFavorite: false,
      category: 'web',
      skills: ['wordpress', 'php', 'css', 'elementor'],
      isPro: false,
      description: 'Fix any WordPress issues or customize your site'
    },
    {
      id: 5,
      title: 'Mobile App with Flutter',
      seller: 'flutter_dev',
      rating: 4.9,
      reviews: 276,
      price: 400,
      deliveryTime: 10,
      image: 'https://via.placeholder.com/400x300/02569b/ffffff?text=Flutter',
      isFavorite: false,
      category: 'mobile',
      skills: ['flutter', 'dart', 'firebase', 'mobile'],
      isPro: true,
      description: 'Cross-platform mobile app development with Flutter'
    },
    {
      id: 6,
      title: 'REST API Development',
      seller: 'backend_engineer',
      rating: 4.8,
      reviews: 198,
      price: 250,
      deliveryTime: 5,
      image: 'https://via.placeholder.com/400x300/689f63/ffffff?text=API',
      isFavorite: false,
      category: 'backend',
      skills: ['node', 'express', 'mongodb', 'api'],
      isPro: false,
      description: 'Professional REST API development with Node.js'
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const filtered = subcategory
          ? mockServices.filter(service => service.category === subcategory)
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
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleFavorite = (id) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, isFavorite: !service.isFavorite } : service
    ));
  };

  const filteredServices = services.filter(service => {
    if (searchQuery &&
      !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.minPrice && service.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && service.price > Number(filters.maxPrice)) return false;
    if (filters.deliveryTime) {
      if (filters.deliveryTime === 'fast' && service.deliveryTime > 3) return false;
      if (filters.deliveryTime === 'very_fast' && service.deliveryTime > 1) return false;
    }
    if (filters.skill && !service.skills.includes(filters.skill)) return false;
    if (filters.proOnly && !service.isPro) return false;
    if (filters.rating && service.rating < Number(filters.rating)) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'price_low') return a.price - b.price;
    if (filters.sort === 'price_high') return b.price - a.price;
    if (filters.sort === 'rating') return b.rating - a.rating;
    if (filters.sort === 'delivery') return a.deliveryTime - b.deliveryTime;
    return b.reviews - a.reviews;
  });

  const subcategories = [
    { name: 'Website Development', id: 'web', icon: '💻' },
    { name: 'Mobile Development', id: 'mobile', icon: '📱' },
    { name: 'Desktop Software', id: 'desktop', icon: '🖥' },
    { name: 'Data Science & AI', id: 'data', icon: '📊' },
    { name: 'DevOps & Cloud', id: 'devops', icon: '☁' },
    { name: 'E-Commerce', id: 'ecommerce', icon: '🛒' },
    { name: 'Game Development', id: 'gaming', icon: '🎮' },
    { name: 'QA & Testing', id: 'testing', icon: '🧪' }
  ];

  const skillsList = [
    'react', 'angular', 'vue', 'javascript', 'typescript',
    'python', 'django', 'flask', 'node', 'express',
    'php', 'laravel', 'wordpress', 'shopify', 'java',
    'c#', 'c++', 'swift', 'kotlin', 'flutter',
    'react native', 'docker', 'kubernetes', 'aws',
    'azure', 'gcp', 'firebase', 'mongodb', 'mysql',
    'postgresql', 'machine learning', 'tensorflow', 'pytorch'
  ];

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      sort: 'popular',
      skill: '',
      proOnly: false,
      rating: ''
    });
    setSearchQuery('');
  };

  return (
    <div className="programming-tech-page">
      <div className="pt-hero">
        <div className="pt-hero-content">
          <h1>Programming & Tech Services</h1>
          <p>Find expert developers, engineers, and IT specialists for your project</p>

          <div className="pt-search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="What service are you looking for today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      <div className="pt-container">
        <div className="pt-sidebar">
          <div className="pt-filter-section">
            <h3>Filters</h3>
            <div className="pt-filter-group">
              <h4>Price Range ($)</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="pt-filter-group">
              <h4>Delivery Time</h4>
              <select
                name="deliveryTime"
                value={filters.deliveryTime}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="very_fast">Up to 24 hours</option>
                <option value="fast">Up to 3 days</option>
                <option value="standard">Up to 7 days</option>
              </select>
            </div>

            <div className="pt-filter-group">
              <h4>Minimum Rating</h4>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4.0">4.0+ stars</option>
                <option value="3.0">3.0+ stars</option>
              </select>
            </div>

            <div className="pt-filter-group">
              <h4>Skills & Technologies</h4>
              <select
                name="skill"
                value={filters.skill}
                onChange={handleFilterChange}
              >
                <option value="">All Skills</option>
                {skillsList.map(skill => (
                  <option key={skill} value={skill}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-filter-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="proOnly"
                  checked={filters.proOnly}
                  onChange={handleFilterChange}
                />
                <span>Pro Services Only</span>
              </label>
            </div>

            <button className="reset-filters" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>

          <div className="pt-subcategories">
            <h3>Categories</h3>
            <ul>
              <li>
                <Link to="/categories/programming-tech" className={!subcategory ? 'active' : ''}>
                  All Programming & Tech
                </Link>
              </li>
              {subcategories.map(sub => (
                <li key={sub.id}>
                  <Link to={`/categories/programming-tech/${sub.id}`} className={subcategory === sub.id ? 'active' : ''}>
                    <span className="subcategory-icon">{sub.icon}</span>
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rest of your services rendering area here */}
        {/* Want me to continue and send the services grid part as well? (✅) */}
      </div>
    </div>
  );
};

export default ProgrammingTechPage;
