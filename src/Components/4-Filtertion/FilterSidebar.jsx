import React from 'react';
import { Box, Typography, Button, Slider } from '@mui/material';
import './FilterationSidebar.css';

const FilterSidebar = ({ filters, setFilters }) => {
  const colors = [
    { id: 1, name: "Black", hex: "#000000" },
    { id: 2, name: "White", hex: "#FFFFFF" },
    { id: 3, name: "Red", hex: "#FF0000" },
    { id: 4, name: "Blue", hex: "#0000FF" },
    { id: 5, name: "Green", hex: "#00FF00" },
  ];

  const categories = ["lace", "fabric", "elastic"];
  const sizes = ["xs", "s", "m", "l", "xl"];

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      colors: [],
      categories: [],
      sizes: [],
      priceRange: [0, 1000]
    });
  };

  return (
    <aside className="filter-sidebar my-1 mr-3 border">
      <div className="filter-group">
        <Typography variant="subtitle2" gutterBottom>Colors</Typography>
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`color-option ${filters.colors.includes(color.name.toLowerCase()) ? "selected" : ""}`}
              onClick={() => handleFilterChange("colors", color.name.toLowerCase())}
            >
              <span className="color-circle" style={{ backgroundColor: color.hex }} />
              <span>{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <Typography variant="subtitle2" gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(e, newValue) => setFilters(prev => ({ ...prev, priceRange: newValue }))}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </div>

      <div className="filter-group">
        <Typography variant="subtitle2" gutterBottom>Categories</Typography>
        <div className="category-options">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filters.categories.includes(category) ? "contained" : "outlined"}
              onClick={() => handleFilterChange("categories", category)}
              sx={{ m: 0.5 }}
              fullWidth
              size="small"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <Typography variant="subtitle2" gutterBottom>Sizes</Typography>
        <div className="size-options">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${filters.sizes.includes(size) ? "selected" : ""}`}
              onClick={() => handleFilterChange("sizes", size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="outlined"
        onClick={clearFilters}
        fullWidth
        sx={{ mt: 2 }}
      >
        Clear All Filters
      </Button>
    </aside>
  );
};

export default FilterSidebar;
