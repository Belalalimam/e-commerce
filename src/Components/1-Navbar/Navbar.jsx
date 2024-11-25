// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaMapMarkerAlt, FaHeart, FaShoppingCart, FaBars } from 'react-icons/fa';
import { IconButton, Badge, Box, Tooltip, Avatar, Menu, MenuItem, Typography    } from "@mui/material";
import './Navbar.css';

const Header = ({ onCartClick, onWishlistClick, wishlistItems, onProfialClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);



  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home',
    'Beauty',
    'Grocery',
    'Sports',
    'Toys',
    'addUser'
  ];
  const settings = ['Account', 'Dashboard', 'Logout'];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <header className="header">
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

      <div className="main-header">
        <div className="container">
          <div className="mobile-menu">
            <IconButton className="menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FaBars />
            </IconButton>
          </div>

          <Link to="/" className="logo">
            <h1>YourStore</h1>
          </Link>

          <div className="search-section">
            <div className="category-select desktop-only">
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
            <Link to="/" className="action-item">
              <IconButton onClick={onWishlistClick}>
                <Badge badgeContent={wishlistItems} color="primary">
                  <FaHeart />
                </Badge>
              </IconButton>
              <span className="desktop-only">Wishlist</span>
            </Link>

            <Link to="/" className="action-item">
              <IconButton onClick={onCartClick}>
                <Badge badgeContent={3} color="primary">
                  <FaShoppingCart />
                </Badge>
              </IconButton>
              <span className="desktop-only">Cart</span>
            </Link>

            <Link  className="action-item">
            <IconButton onClick={onProfialClick}>
            <Badge color="primary">
              <FaUser />
                </Badge>
            </IconButton>
              {/* <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Link to={setting} className="action-item" key={setting}>
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box> */}
              <span className="desktop-only">Accont</span>

            </Link>
          </div>
        </div>
      </div>

      <nav className={`categories-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="container">
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/${category.toLowerCase()}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
