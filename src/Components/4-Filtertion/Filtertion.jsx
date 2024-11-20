import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './Filteration.css';

const FilterSection = ({ onFilterChange }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    categories: [],
    sizes: []
  });

  const colors = [
    { id: 1, name: 'Black', hex: '#000000' },
    { id: 2, name: 'White', hex: '#FFFFFF' },
    { id: 3, name: 'Red', hex: '#FF0000' },
    { id: 4, name: 'Blue', hex: '#0000FF' },
    { id: 5, name: 'Green', hex: '#00FF00' }
  ];

  const categories = [
    'T-Shirts',
    'Pants',
    'Shoes',
    'Accessories',
    'Dresses',
    'Jackets'
  ];

  const sizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
  ];

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => {
      const updatedFilters = {
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value]
      };

      onFilterChange?.(updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      colors: [],
      categories: [],
      sizes: []
    });
    onFilterChange?.({
      colors: [],
      categories: [],
      sizes: []
    });
  };

  return (
    <div className="filter-section">
      <button
        className="mobile-filter-btn"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <FaFilter /> Filters
      </button>

      <div className={`filters-container ${showMobileFilters ? 'show' : ''}`}>
        <div className="filters-header">
          <h3>Filters</h3>
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        </div>

        {/* Color Filter */}
        <div className="filter-group">
          <h4>Colors</h4>
          <div className="color-options">
            {colors.map(color => (
              <div
                key={color.id}
                className={`color-option ${selectedFilters.colors.includes(color.name) ? 'selected' : ''
                  }`}
                onClick={() => handleFilterChange('colors', color.name)}
              >
                <span
                  className="color-circle"
                  style={{ backgroundColor: color.hex }}
                ></span>
                <span className="color-name">{color.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <h4>Categories</h4>
          <div className="category-options">
            {categories.map(category => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="filter-group">
          <h4>Sizes</h4>
          <div className="size-options">
            {sizes.map(size => (
              <button
                key={size}
                className={`size-btn ${selectedFilters.sizes.includes(size) ? 'selected' : ''
                  }`}
                onClick={() => handleFilterChange('sizes', size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
