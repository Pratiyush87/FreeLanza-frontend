// src/components/GraphicDesign/Filters.jsx
import React, { useState } from 'react';

const Filters = ({ categories, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories });
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange });
  };

  return (
    <div className="filters-sidebar">
      <h3>Filter By</h3>
      
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <input
                type="checkbox"
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`cat-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-range">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
          <div className="price-values">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Seller Level</h4>
        <div className="seller-level">
          <label>
            <input type="checkbox" /> Top Rated Sellers
          </label>
          <label>
            <input type="checkbox" /> Level 2 Sellers
          </label>
          <label>
            <input type="checkbox" /> New Sellers
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;