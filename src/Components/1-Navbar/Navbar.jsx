import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home',
    'Beauty',
    'Grocery',
    'Sports',
    'Toys',
  ];

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="location">
            <FaMapMarkerAlt />
            <span>Deliver to: </span>
            <select>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
            </select>
          </div>
          <div className="top-links">
            <Link to="/shipping">Track Order</Link>
            <Link to="/sell">Sell with Us</Link>
            <Link to="/customer-service">Customer Service</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>YourStore</h1>
          </Link>

          <div className="search-section">
            <div className="category-select">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="user-actions">
            <Link to="/wishlist" className="action-item">
              <FaHeart />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="action-item">
              <FaShoppingCart />
              <span>Cart</span>
              <div className="cart-badge">3</div>
            </Link>
            <Link to="/account" className="action-item">
              <FaUser />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Nav */}
      <nav className="categories-nav">
        <div className="container">
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

