import React, { useEffect, useState } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, IconButton, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { putLikeForProduct } from './redux/apiCalls/likeApiCalls';
import { putCartForProduct } from './redux/apiCalls/cartApiCalls';
import { fetchProductsBasedOnCategory, fetchProductsBasedOnCategorySize, fetchProduct, getProductsCount } from './redux/apiCalls/productApiCalls';
import { getCategories } from "./redux/apiCalls/categoryApiCalls";
import Pagination from "@mui/material/Pagination";



const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));
const ProductImage = styled(CardMedia)({
  height: 300,
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    "& .product-actions": {
      transform: "translateY(0)",
    },
  },
});
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

const FilteredCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { productsCate } = useSelector((state) => state.product);
  const { cart } = useSelector(state => state.cart);
  const { like } = useSelector(state => state.like);
    const item = useSelector(state => state.cart.item.items);
    const Products = useSelector((state) => state.product.product);
  const { productsCount } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchProductsBasedOnCategory(category));
    console.log("🚀 ~ FilteredCategory ~ productsCate:", productsCate)
    // dispatch(fetchProductsBasedOnCategorySize(category));    
    dispatch(fetchProduct(currentPage));
    dispatch(getProductsCount());
  }, [dispatch, category, currentPage]);

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    dispatch(putCartForProduct(productId));
  };

  const handleAddToFavorites = (e, productId) => {
    e.stopPropagation();
    dispatch(putLikeForProduct(productId));
  };

  const handleCardClick = (product) => {
    navigate(`/getProduct/${product._id}`);
  };

  const isProductFiltered = () => {
    <Grid container spacing={4}>
          {Array.isArray(Products) && Products.length > 0 ? (
            Products.map((product) => (
              <Grid key={product._id} xs={12} sm={6} md={3}>
                <StyledCard onClick={() => setSelectedProduct(product)}>
                  <ProductImage image={product.productImage.url} title={product.productTitle}>
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
                          color: Array.isArray(item) && item.some(item => item._id === product._id) ? "#4CAF50" : "white",
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
                    <Typography gutterBottom variant="h6">{product.productName}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.productCategory}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalShippingIcon sx={{ fontSize: 16, color: "success.main", mr: 0.5 }} />
                        <Typography variant="caption" color="success.main">Free Shipping</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: '100%' }}>
              No products available
            </Typography>
          )}
        </Grid>
  }
  useEffect(() => {
    console.log("🚀 ~ isProductFiltered ~ isProductFiltered:", productsCate.length)

  },[])

  return (
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>
      <ToastContainer />
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 5, fontWeight: 600, color: "#1a1a1a" }}
        >
          {category?.charAt(0).toUpperCase() + category?.slice(1)} Collection
        </Typography>

        <Grid container spacing={4}>
          {productsCate?.length > 0 ? (
            productsCate.map((product) => (
              <Grid key={product._id} xs={12} sm={6} md={3}>
                <StyledCard onClick={() => handleCardClick(product)}>
                  <ProductImage
                    image={product.productImage.url}
                    title={product.productTitle}
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
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalShippingIcon sx={{ fontSize: 16, color: "success.main", mr: 0.5 }} />
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
            isProductFiltered()
          )}
        </Grid>
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

export default FilteredCategory;
