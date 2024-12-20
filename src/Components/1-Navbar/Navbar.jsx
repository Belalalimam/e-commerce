import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaMapMarkerAlt, FaHeart, FaShoppingCart, FaBars } from 'react-icons/fa';
import { IconButton, Badge, Box, Tooltip, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCalls";
import { fetchProductsBasedOnCategorySize, fetchProductsBasedOnCategory, fetchProduct } from '../../redux/apiCalls/productApiCalls'


const Header = ({ onWishlistClick, wishlistItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartCount, setCartCount] = useState(0);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const settings = useMemo(() => {
    if (user?.isAdmin) {
      return ['Dashboard', 'Profile', 'Logout'];
    }
    return user ? ['Profile', 'Logout'] : ['Login', 'Register'];
  }, [user]);

  const categories = useMemo(() => {
    return ['All Categories', 'Lace', 'Elastic', '1>>>5', '5>>>10', '10>>>20', 'NoLimits',]
  })


  const handleMenuCategoryClick = (categorie) => {
    switch (categorie) {
      case 'All Categories':
        dispatch(fetchProduct(1));
        navigate('/All Categories');
        break;
      case 'Lace':
        dispatch(fetchProductsBasedOnCategory(categorie));
        navigate('/Lace');
        break;
      case 'Elastic':
        dispatch(fetchProductsBasedOnCategory(categorie));
        navigate('/Elastic');
        break;
      case '1>>>5':
        dispatch(fetchProductsBasedOnCategorySize(categorie));
        navigate('/1>>>5');
        break;
      case '5>>>10':
        dispatch(fetchProductsBasedOnCategorySize(categorie));
        navigate('/5>>>10');
        break;
      case '10>>>20':
        dispatch(fetchProductsBasedOnCategorySize(categorie));
        navigate('/10>>>20');
        break;
      case 'NoLimits':
        dispatch(fetchProductsBasedOnCategorySize(categorie));
        navigate('/NoLimits');
        break;

    }
    setMobileMenuOpen(false);
    handleCloseUserMenu();
  };

  const handleMenuItemClick = (setting) => {
    switch (setting.toLowerCase()) {
      case 'dashboard':
        navigate('/admin/dashboard');
        break;
      case 'profile':
        if (user?._id) {
          navigate(`/profile/${user._id}`);
        }
        break;
      case 'logout':
        localStorage.removeItem("userInfo");
        dispatch({ type: "LOGOUT" });
        navigate('/');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}&category=${selectedCategory}`);
    }
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
            <img src="/img/logo1.png" alt="" />
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
            <form onSubmit={handleSearch} className="search-input">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <FaSearch />
              </button>
            </form>
          </div>

          <div className="user-actions">
            <div className="action-item">
              <IconButton onClick={onWishlistClick}>
                <Badge badgeContent={wishlistItems} color="primary">
                  <FaHeart />
                </Badge>
              </IconButton>
              <span className="desktop-only">Wishlist</span>
            </div>

            <Link to="/cart" className="action-item">
              <IconButton color="inherit">
                <Badge badgeContent={cartCount} color="secondary">
                  <FaShoppingCart />
                </Badge>
              </IconButton>
              <span className="desktop-only">Cart</span>
            </Link>

            <div className="action-item">
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
                    <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
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
                        <Typography textAlign="center">
                          {setting}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>


              <span className="desktop-only">{user?.name || 'Account'}</span>

            </div>
          </div>
        </div>
      </div>

      <nav className={`categories-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="container">
          <ul>
            {categories.map((category) => (
              <li onClick={() => handleMenuCategoryClick(category)} key={category}>
                <Link to={category}>{category}</Link>
                {/* <Link to={`/${category.toLowerCase()}`}>{category}</Link> */}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
