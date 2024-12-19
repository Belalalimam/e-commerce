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
  // Extra small mobile devices (under 387px)
  [`@media (max-width: 387px)`]: {
    width: "130px",
    // height: "300px",
    margin: "0 auto",
    padding: "0px",
  },
  // Mobile devices (extra small)
  [theme.breakpoints.down('sm')]: {
    width: "150px",
    // height: "320px",
    margin: "0 auto",
    padding: "8px",
  },
  // Tablets (small)
  [theme.breakpoints.between('sm', 'md')]: {
    width: "220px",
    // height: "380px",
    padding: "12px",
  },
  // Small laptops (medium)
  [theme.breakpoints.between('md', 'lg')]: {
    width: "260px",
    // height: "420px",
    padding: "16px",
  },
  // Desktops (large)
  [theme.breakpoints.up('lg')]: {
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent onClick={() => handleCardClick(product)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              src={product.productImage.url}
              alt={product.productName}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.productName}</Typography>
            <Typography variant="body1" paragraph>{product.productDescription}</Typography>
            <Typography variant="body2">Category: {product.productCategory}</Typography>
            <Typography variant="body2">Color: {product.productColor}</Typography>
            <Typography variant="body2">Size: {product.productCategorySize}</Typography>
          </Grid>
        </Grid>
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
  const categories = ["lace", "fabric", "elastic"];
  const sizes = ["xs", "s", "m", "l", "xl"];

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
    window.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.closest(".filter-sidebar") && showMobileFilters) {
        setShowMobileFilters(false);
      }
    });
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
    <Box sx={{ py: 8, backgroundColor: "#fff" }} onClick={() => setShowMobileFilters(!showMobileFilters)}>
      <Container maxWidth="xl" className="flex flex-col lg:flex-row">
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 4, fontWeight: 600, color: "#1a1a1a" }}
        >
          {name}
        </Typography>

        <div className="filter-toggle" onClick={() => setShowMobileFilters(!showMobileFilters)}>
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
        <Grid container spacing={2} className="products-area" justifyContent={"center"}>
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
