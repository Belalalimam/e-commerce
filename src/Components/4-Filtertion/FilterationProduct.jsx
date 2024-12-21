import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  getProductsCount,
} from "../../redux/apiCalls/productApiCalls";
import { putLikeForProduct } from '../../redux/apiCalls/likeApiCalls';
import { putCartForProduct, getUserProfileCart } from '../../redux/apiCalls/cartApiCalls';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import "./Filteration.css";

// Your existing styled components
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  [`@media (max-width: 387px)`]: {
    width: "130px",
    margin: "0 auto",
    padding: "0px",
  },
  [theme.breakpoints.down('sm')]: {
    width: "150px",
    margin: "0 auto",
    padding: "8px",
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: "220px",
    padding: "12px",
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: "260px",
    padding: "16px",
  },
  [theme.breakpoints.up('lg')]: {
    width: "290px",
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
  [theme.breakpoints.down('sm')]: {
    height: 190,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: 250,
  },
  [theme.breakpoints.up('md')]: {
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
// Modal Component
const CategoryModal = ({ product, open, onClose, handleCardClick }) => {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { width: '800px', height: '400px', margin: '20px' } }}
    >
      <DialogTitle sx={{ m: 0, }} className="flex items-center">
        <Typography variant="h5" sx={{ m: 0, fontSize: { xs: '1.1rem', sm: '0.9rem' }, fontWeight: 600 }}>
          {product.productName}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className=""
        onClick={() => handleCardClick(product)}
        sx={{ p: 2, display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Box sx={{ width: '100%', height: '300px' }}>
          <CardMedia
            className=""
            component="img"
            src={product.productImage.url}
            alt={product.productName}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1,
              backgroundColor: 'grey.100'
            }}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '50%' }, height: '100%' }} className="">
          <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
          <span style={{color:"#052659"}}>Description</span> : {product.productDescription}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
            <span style={{color:"#052659"}}>Category</span> : {product.productCategory}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
            <span style={{color:"#052659"}}>Color</span> : {product.productColor}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
            <span style={{color:"#052659"}}>Size</span> : {product.productCategorySize}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const FilterationProduct = ({ name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PRODUCTS_PER_PAGE = 10;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity] = useState(1);
  const [filters, setFilters] = useState({ colors: [], categories: [], sizes: [] });
  const { user } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);
  const { productsCount } = useSelector((state) => state.product);
  const { like } = useSelector(state => state.like);
  const { item = { items: [] } } = useSelector(state => state.cart) || {};
  const cart = item?.items || [];
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
    dispatch(getProductsCount());
  }, [currentPage, dispatch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (!event.target.closest('.filter-sidebar') && !event.target.closest('.filter-toggle')) {
            setShowMobileFilters(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const getFilteredProducts = () => {
    if (!Array.isArray(product)) return [];

    return product.filter((product) => {
      const colorMatch =
        filters.colors.length === 0 ||
        filters.colors.includes(product.productColor?.toLowerCase());
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.productCategory?.toLowerCase());
      const sizeMatch =
        filters.sizes.length === 0 ||
        filters.sizes.includes(product.productCategorySize?.toLowerCase());

      return colorMatch && categoryMatch && sizeMatch;
    });
  };
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };
  const clearFilters = () => { setFilters({ colors: [], categories: [], sizes: [], }) };


  return (
    <Box sx={{  pb: { xs: 4, md: 8 }, backgroundColor: "#fff" }} className='' >
      <Container maxWidth="xxl" className="flex flex-col lg:flex-row">

        <div className="filter-toggle" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          <FaFilter />
          <span>Filters</span>
        </div>

        <div className="main-container">
          <aside className={`filter-sidebar ${showMobileFilters ? "show" : ""}`}>
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

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent={"center"}  className=''>
          {Array.isArray(product) && product.length > 0 ? (
            getFilteredProducts().map((product) => (
              <Grid key={product._id} xs={12} sm={6} md={3}>
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
                          color: Array.isArray(like) && like.some(item => item._id === product._id) ? "red" : "white",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                          zIndex: 2
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleAddToCart(e, product._id)}
                        sx={{
                          color: Array.isArray(cart) && cart.some(item => item._id === product._id) ? "#4CAF50" : "white",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                          zIndex: 2
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
            <Typography variant="h6" align="center" sx={{ width: '100%', mt: 3 }}>
              No products available
            </Typography>
          )}
        </Grid>
        
        <CategoryModal
          product={selectedProduct}
          open={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          handleCardClick={handleCardClick}
        />
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FilterationProduct;



