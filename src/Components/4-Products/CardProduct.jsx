import React, { useState, useEffect } from "react";
import { Container, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, IconButton, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


import { putLikeForProduct } from '../../redux/apiCalls/likeApiCalls';
import { putCartForProduct, getUserProfileCart } from '../../redux/apiCalls/cartApiCalls';
import { fetchProduct } from "../../redux/apiCalls/productApiCalls";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "180px", // Half of 300px for xs screens
  [theme.breakpoints.up('sm')]: {
    width: "300px",
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

// Main Component
const FeaturedProducts = ({ name }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const Products = useSelector((state) => state.product.product);
  const item = useSelector(state => state.cart.item.items);
  const { like } = useSelector(state => state.like);
  
  useEffect(() => {
    if (id) {
      dispatch(getUserProfileLike(id));
      dispatch(getUserProfileCart(id));
    }
    dispatch(fetchProduct());
    // console.log("🚀 ~ FeaturedProducts ~ cart:", item[0]._id)
  }, [dispatch, id]);

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    dispatch(putCartForProduct(productId,quantity));
  };

  const handleAddToFavorites = (e, productId) => {
    e.stopPropagation();
    dispatch(putLikeForProduct(productId));
  };

  const handleCardClick = (product) => {
    navigate(`/getProduct/${product._id}`);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>
      <ToastContainer />
      <Container maxWidth="xl">
        <Typography variant="h3" align="center" sx={{ mb: 5, fontWeight: 600, color: "#1a1a1a" }}>
          {name}
        </Typography>

        <Grid container spacing={4} justifyContent={"center"}>
          {Array.isArray(Products) && Products.length > 0 ? (
            Products.map((product) => (
              <Grid key={product._id} xs={6} sm={6} md={3}>
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

        

        <CategoryModal
          product={selectedProduct}
          open={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          handleCardClick={handleCardClick}
        />
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
