import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaMapMarkerAlt, FaHeart, FaShoppingCart, FaBars } from 'react-icons/fa';
import { IconButton, Badge, Box, Tooltip, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './Navbar.css';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { logoutUser } from "../../redux/apiCalls/authApiCalls";


const Header = ({ onCartClick, onWishlistClick, wishlistItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartCount, setCartCount] = useState(0);



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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const settings = useMemo(() => 
    user ? ['Profile', 'Logout'] : ['Login', 'Register'], 
    [user]
  );

  const handleMenuItemClick = (setting) => {
    switch (setting.toLowerCase()) {
      case 'profile':
        if (user?._id) {
          navigate(`/profile/${user._id}`);
        }
        break;

      case 'logout':
        dispatch(logoutUser());
        navigate('/Home');
        break;

      case 'login':
        navigate('/login');
        break;

      case 'register':
        navigate('/register');
        break;
    }
    handleCloseUserMenu();
  };



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleCartClick = () => {
    navigate('/cart');
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
<<<<<<< HEAD
            <Link to="/WishlistModal" className="action-item">
=======
            <Link to="#" className="action-item">
>>>>>>> 8d6b9566c8b71b617b0b42fe91f63314848c2c70
              <IconButton onClick={onWishlistClick}>
                <Badge badgeContent={wishlistItems} color="primary">
                  <FaHeart />
                </Badge>
              </IconButton>
              <span className="desktop-only">Wishlist</span>
            </Link>

            <Link to="/" className="action-item">
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartCount} color="secondary">
                  <FaShoppingCart />
                </Badge>
              </IconButton>
              <span className="desktop-only">Cart</span>
            </Link>

            <Link className="action-item">
              {/* <IconButton onClick={onProfialClick}>
            <Badge color="primary">
              <FaUser />
                </Badge>
            </IconButton> */}
              <Box sx={{ flexGrow: 0 }}>
                
                <Tooltip title={user ? 'Account Settings' : 'Login'}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user ? (
                      <Avatar
                        alt={user.name}
                        src={user.avatar || '/default-avatar.png'}
                      />
                    ) : (
                      <FaUser />
                    )}
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
                    <MenuItem key={setting}>
                      <Link
                        to={
                          setting.toLowerCase() === 'profile'
                            ? `/profile/${user._id}`
                            : `/${setting.toLowerCase()}`
                        }
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={() => {
                          if (setting.toLowerCase() === 'logout') {
                            dispatch(logoutUser());
                          }
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ))}



                </Menu>
              </Box>


              <span className="desktop-only">{user?.name || 'Account'}</span>

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
