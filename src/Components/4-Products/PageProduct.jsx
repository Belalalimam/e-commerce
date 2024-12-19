import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Card, CardMedia, CardContent, Rating, Divider, List, ListItem, ListItemText, Paper, Breadcrumbs, Link, Select, MenuItem, FormControl, IconButton, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
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



// Main Component
const CategoryPage = () => {
  const navigate = useNavigate();
  const { productId, id } = useParams();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productSingle, product } = useSelector((state) => state.product);
  const { like } = useSelector(state => state.like);
  const { user } = useSelector((state) => state.auth);
  const { item = { items: [] } } = useSelector(state => state.cart) || {};
  const cart = item?.items || [];

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
    <>
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
          </>
        )}
      </Container>
      {/* Similar Products Section  */}
      <Box sx={{ py: 8, backgroundColor: "#fff" }}>
        <Container maxWidth="xxl" className=" CardProductContaienr">
          <Typography  variant='h3' align="center" sx={{ mb: { xs: 2, sm: 3, md: 5 }, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, color: "#1a1a1a" }}>
            Similar Products
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent={"center"} className="p-[0px] m-[0px]">
            {similarProducts.length > 0 ? similarProducts.map((product) => (
              <Grid key={product._id} xs={6} sm={6} md={3} className="p-[0px] m-[0px]">
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
            )
            ) : (
              <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                No Similar Products available
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
    </>
  );
};

export default CategoryPage;


