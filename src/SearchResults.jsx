import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchProduct } from "./redux/apiCalls/productApiCalls";
import { putLikeForProduct } from "./redux/apiCalls/likeApiCalls";
import { putCartForProduct } from "./redux/apiCalls/cartApiCalls";
import Pagination from "@mui/material/Pagination";
import { FaFilter } from "react-icons/fa";
import Grid from "@mui/material/Grid2";
import "./FilterationSidebar.css";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  // Extra small mobile devices (under 387px)
  [`@media (max-width: 387px)`]: {
    width: "130px",
    // height: "300px",
    margin: "0 auto",
    padding: "0px",
  },
  // Mobile devices (extra small)
  [theme.breakpoints.down("sm")]: {
    width: "150px",
    // height: "320px",
    margin: "0 auto",
    padding: "8px",
  },
  // Tablets (small)
  [theme.breakpoints.between("sm", "md")]: {
    width: "220px",
    // height: "380px",
    padding: "12px",
  },
  // Small laptops (medium)
  [theme.breakpoints.between("md", "lg")]: {
    width: "260px",
    // height: "420px",
    padding: "16px",
  },
  // Desktops (large)
  [theme.breakpoints.up("lg")]: {
    width: "290px",
    // height: "450px",
    padding: "20px",
  },
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));
const ProductImage = styled(CardMedia)(({ theme }) => ({
  [`@media (max-width: 387px)`]: {
    height: 190,
  },
  [theme.breakpoints.down("sm")]: {
    height: 190,
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: 250,
  },
  [theme.breakpoints.up("md")]: {
    height: 300,
  },
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    "& .product-actions": {
      transform: "translateY(0)",
    },
  },
}));
const ProductActions = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "20px",
  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
  transform: "translateY(100%)",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
});

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const selectedCategory = queryParams.get("category");
  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [setSelectedProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    colors: [],
    categories: [],
    sizes: [],
  });

  const { product, productsCount } = useSelector((state) => state.product);
  const { item = { items: [] } } = useSelector((state) => state.cart) || {};
  const cart = item?.items || [];
  const { like } = useSelector((state) => state.like);
  const { user } = useSelector((state) => state.auth);
  const colors = [
    { id: 1, name: "Black", hex: "#000000" },
    { id: 2, name: "White", hex: "#FFFFFF" },
    { id: 3, name: "Red", hex: "#FF0000" },
    { id: 4, name: "Blue", hex: "#0000FF" },
    { id: 5, name: "Green", hex: "#00FF00" },
  ];
  const categories = ["lace", "elastic"];
  const sizes = ["1>>>5", "5>>>10", "10>>>20", "NoLimits"];

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to cart!");
      return;
    }
    dispatch(putCartForProduct(productId, quantity));
    toast.success("Product added to cart!");
  };
  const handleAddToFavorites = (e, productId) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to favorites!");
      return;
    }
    dispatch(putLikeForProduct(productId));
  };
  const handleCardClick = (product) => {
    navigate(`/getProduct/${product._id}`);
  };

  useEffect(() => {
    dispatch(fetchProduct(currentPage));
  }, [dispatch, currentPage]);
   useEffect(() => {
      const handleClickOutside = (event) => {
          if (!event.target.closest('.filter-sidebar') && !event.target.closest('.filter-toggle')) {
              setShowMobileFilters(false);
          }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      
      return updatedFilters;
    });
  };

  const filteredProducts = product.filter((item) => {
    const searchTerms = searchQuery.toLowerCase();
    
    // Filter by search terms
    const matchesSearch = 
      item.productName.toLowerCase().includes(searchTerms) ||
      item.productCategory.toLowerCase().includes(searchTerms) ||
      item.productCategorySize.toLowerCase().includes(searchTerms) ||
      item.productColor.toLowerCase().includes(searchTerms);
  
    // Filter by selected filters
    const matchesColor = filters.colors.length === 0 || 
      filters.colors.includes(item.productColor?.toLowerCase());
    
    const matchesSize = filters.sizes.length === 0 || 
      filters.sizes.includes(item.productCategorySize?.toLowerCase());
    
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(item.productCategory?.toLowerCase());
  
    return matchesSearch && matchesColor && matchesSize && matchesCategory;
  });

  const clearFilters = () => {
    setFilters({
      colors: [],
      categories: [],
      sizes: [],
    });
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#fff00" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: { xs: 2, sm: 3, md: 5 },
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: 600,
          color: "#1a1a1a",
        }}
      >
        Search Results for "{searchQuery}"
      </Typography>
      <Container maxWidth="xxl" className="flex flex-col lg:flex-row">
        <div
          className="filter-toggle"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FaFilter />
          <span>Filters</span>
        </div>
        <div className="main-container">
                  <aside className={`filter-sidebar ${showMobileFilters ? "show" : false}`}>
                    <div className="filter-group">
                      <Typography variant="subtitle2" gutterBottom>
                        Colors
                      </Typography>
                      <div className="color-options">
                        {colors.map((color) => (
                          <div
                            key={color.id}
                            className={`color-option ${filters.colors.includes(color.name.toLowerCase()) ? "selected" : ""}`}
                            onClick={() => handleFilterChange("colors", color.name.toLowerCase())}
                          >
                            <span
                              className="color-circle"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span>{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
        
                    <div className="filter-group">
                      <Typography variant="subtitle2" gutterBottom>
                        Categories
                      </Typography>
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
                      <Typography variant="subtitle2" gutterBottom>
                        Sizes
                      </Typography>
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
                </div>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          className="products-area1 p-[0px] m-[0px]"
          justifyContent={"center"}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid
                key={product._id}
                xs={6}
                sm={6}
                md={3}
                onClick={() => handleCardClick(product)}
                justifyContent={"center"}
              >
                <StyledCard onClick={() => setSelectedProduct(product)}>
                  <ProductImage
                    image={product.productImage.url}
                    title={product.productTitle}
                    id={product.productImage.publicId}
                  >
                    <ProductActions className="product-actions">
                      <IconButton
                        onClick={(e) => handleAddToFavorites(e, product._id)}
                        sx={{
                          color:
                            Array.isArray(like) &&
                            like.some((item) => item._id === product._id)
                              ? "red"
                              : "white",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.3)",
                          },
                          zIndex: 2,
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleAddToCart(e, product._id)}
                        sx={{
                          color:
                            Array.isArray(cart) &&
                            cart.some((item) => item._id === product._id)
                              ? "#4CAF50"
                              : "white",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.3)",
                          },
                          zIndex: 2,
                        }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </ProductActions>
                  </ProductImage>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6">
                      {product.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {product.productCategory}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalShippingIcon
                          sx={{ fontSize: 16, color: "success.main", mr: 0.5 }}
                        />
                        <Typography variant="caption" color="success.main">
                          Free Shipping
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              No products found matching your search
            </Typography>
          )}
        </Grid>
      </Container>

      {productsCount > PRODUCTS_PER_PAGE && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value);
              window.scrollTo(0, 0);
            }}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;
