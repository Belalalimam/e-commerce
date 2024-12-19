import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button, Card, CardMedia, CardContent, Rating, Divider, List, ListItem, ListItemText, Paper, Breadcrumbs, Link, Select, MenuItem, FormControl, IconButton, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import { putLikeForProduct, getUserProfileLike } from "../../redux/apiCalls/likeApiCalls";
import { fetchSingleProduct, fetchProduct } from "../../redux/apiCalls/productApiCalls";
import { getUserProfileCart, putCartForProduct } from "../../redux/apiCalls/cartApiCalls";
import { getCategories } from "../../redux/apiCalls/categoryApiCalls";

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: '95%', sm: '80%', md: '100%' },
          margin: { xs: '10px', sm: '20px' }
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: { xs: 1, sm: 2 } }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: { xs: 4, sm: 8 },
            top: { xs: 4, sm: 8 }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        onClick={() => handleCardClick(product)}
        sx={{ p: { xs: 1, sm: 2 } }}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              src={product.productImage.url}
              alt={product.productName}
              style={{
                width: "100%",
                height: { xs: "200px", sm: "250px", md: "300px" },
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} paragraph>
              {product.productDescription}
            </Typography>
            <Typography variant="body2" sx={{ mt: { xs: 1, sm: 2 } }}>
              Category: {product.productCategory}
            </Typography>
            <Typography variant="body2">
              Color: {product.productColor}
            </Typography>
            <Typography variant="body2">
              Size: {product.productCategorySize}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};



// Main Component
const CategoryPage = () => {
  const navigate = useNavigate();
  const { productId, id } = useParams();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { productSingle, product } = useSelector((state) => state.product);
  const { item = { items: [] } } = useSelector(state => state.cart) || {};
  const cart = item?.items || [];
  const { like } = useSelector(state => state.like);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(getCategories());
  }, [dispatch, productId]);
  useEffect(() => {
    if (id) {
      dispatch(getUserProfileLike(id));
      dispatch(getUserProfileCart(id));
    }
    dispatch(fetchProduct());
  }, [dispatch, id]);
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
    setSelectedProduct(null)
    window.scrollTo(0, 0);
  };

  if (!productSingle) {
    return <h1>Loading...</h1>;
  }

  const similarProducts = product.filter(
    (item) => item.productCategory === productSingle?.productCategory &&
      item._id !== productSingle?._id
  ).slice(0, 6);

  return (
    <Container maxWidth="xxl" sx={{ py: 4 }}>
      {productSingle && (
        <>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link onClick={() => navigate("/")} underline="hover">Home</Link>
            <Link onClick={() => navigate(`/${productSingle.productCategory}`)} underline="hover">
              {productSingle?.productCategory}
            </Link>
            <Typography color="text.primary">{productSingle?.productName}</Typography>
          </Breadcrumbs>

          {/* Product Details */}
          <Grid container spacing={4}>
            {/* Product Image */}
            <Grid item xs={12} md={5}>
              <Paper elevation={0}>
                <Box
                  component="img"
                  src={productSingle?.productImage.url}
                  alt={productSingle?.productName}
                  sx={{ width: "100%", height: "50%", borderRadius: 1 }}
                />
              </Paper>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom>{productSingle?.productName}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>(245 reviews)</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>{productSingle?.productDescription}</Typography>

              {/* Product Details List */}
              <List>
                <ListItem>
                  <ListItemText primary="Category" secondary={productSingle?.productCategory} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Size" secondary={productSingle?.productCategorySize} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Color" secondary={productSingle?.productColor} />
                </ListItem>
              </List>
            </Grid>

            {/* Purchase Section */}
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  ${productSingle?.productPrice}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocalShippingIcon sx={{ mr: 1, color: "success.main" }} />
                  <Typography color="success.main">Free Delivery</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography>Quantity:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                    <IconButton
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= 10}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingBagIcon />}
                  onClick={handleAddToCart}
                  sx={{ mb: 2 }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  onClick={handleAddToFavorites}
                  fullWidth
                >
                  {productSingle?.likes?.includes(user?._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>

                <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <SecurityIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">Secure transaction</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Ships from and sold by YourStore
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Similar Products Section */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" gutterBottom>Similar Products</Typography>
            <Container maxWidth="xxl" className=" CardProductContaienr">
              <Grid container spacing={4} sx={{ mt: 2 }} justifyContent={"center"} className="p-[0px] m-[0px]">
                {similarProducts.length > 0 ? similarProducts.map((product) => (
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
                )) : (
                  <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                    No similar products available
                  </Typography>
                )}
              </Grid>
            </Container>
          </Box>
        </>
      )}
      <CategoryModal
        product={selectedProduct}
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        handleCardClick={handleCardClick}
      />

    </Container>
  );
};

export default CategoryPage;
