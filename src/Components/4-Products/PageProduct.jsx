import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { putLikeForProduct, getUserProfileLike } from "../../redux/apiCalls/likeApiCalls";
import {
  fetchSingleProduct,
  putCartForProduct,
  fetchProduct
} from "../../redux/apiCalls/productApiCalls";
import { getUserProfileCart } from "../../redux/apiCalls/cartApiCalls";
import { getCategories } from "../../redux/apiCalls/categoryApiCalls";

// Your existing styled components
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



const CategoryPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();  
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(getCategories());
  }, []);

  const { cart } = useSelector(state => state.cart)
  const { like } = useSelector(state => state.like);

     
  useEffect(() => {  
    if(id) {
      dispatch(getUserProfileLike(id))
    }
    if(id) {
      dispatch(getUserProfileCart(id))
    }
    dispatch(fetchProduct());
  }, [dispatch, id]); 

  const handleCardClick = (product) => {
    navigate(`/getProduct/${product._id}`);
  };

  const CategoryModal = ({ product, open, onClose }) => {
    if (!product) return null;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent onClick={() => handleCardClick(product)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                src={product.productImage.url}
                alt={product.productTitle}
                style={{ width: "100%", height: "75%", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.productName}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.productDescription}
              </Typography>
              <Typography variant="body2">
                Color: {product.productCategory}
              </Typography>
              <Typography variant="body2">
                Size: {product.productCategorySize}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            startIcon={<FavoriteIcon />}
            onClick={(e) => handleAddToFavorites(e, product)}
          >
            Add to Wishlist
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingBagIcon />}
            onClick={(e) => handleAddToCart(e, product)}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const { productSingle } = useSelector((state) => state.product);

  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent opening modal when clicking cart button
    if (productSingle?._id) {
      dispatch(putCartForProduct(productSingle._id));
      toast.success("Product like status updated!");
    }
  };
  const handleAddToFavorites = (e) => {
    e.stopPropagation(); // Prevent opening modal when clicking favorite button
    if (!user) {
      // Show toast notification if user is not logged in
      toast.error("Please login to add items to favorites!");
      return;
    }

    if (productSingle?._id) {
      dispatch(putLikeForProduct(productSingle._id));
      toast.success("Product like status updated!");
    }
  };

  if (!productSingle) {
    console.log("🚀 Product not found");
    return <div>Loading...</div>;
  }

const { product } = useSelector((state) => state.product);
const similarProducts = product.filter(
  (product) => 
    product.productCategory === productSingle?.productCategory && 
    product._id !== productSingle?._id
).slice(0, 6)


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <ToastContainer />

      {productSingle && (
        <>
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link onClick={() => navigate("/")} underline="hover">
              Home
            </Link>
            <Link onClick={() => navigate(`/products/${productSingle?.productCategory?.toLowerCase()}`)} underline="hover">
              {productSingle?.productCategory}
            </Link>
            <Typography color="text.primary">
              {productSingle?.productName}
            </Typography>
          </Breadcrumbs>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper elevation={0}>
                <Box
                  component="img"
                  src={productSingle?.productImage.url}
                  alt={productSingle?.productName}
                  sx={{
                    width: "100%",
                    height: "50%",
                    borderRadius: 1,
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom>
                {productSingle?.productName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  (245 reviews)
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" color="primary" gutterBottom>
                ${productSingle?.productPrice}
              </Typography>
              <Typography variant="body1" paragraph>
                {productSingle?.productDescription}
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Category"
                    secondary={productSingle?.productCategory}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Size"
                    secondary={productSingle?.productCategorySize}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  ${productSingle?.productPrice}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocalShippingIcon sx={{ mr: 1, color: "success.main" }} />
                  <Typography color="success.main">Free Delivery</Typography>
                </Box>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Quantity</InputLabel>
                  <Select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingBagIcon />}
                  onClick={(e) => handleAddToCart(e, product)}
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
                  {productSingle?.likes?.includes(user?._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
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

          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" gutterBottom>
              Similar Products
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
            {Array.isArray(similarProducts) && similarProducts.length > 0 ? (
            similarProducts.map((product) => (
              <Grid key={product._id} xs={12} sm={6} md={3}>
                <StyledCard onClick={() => setSelectedProduct(product)}>
                  <ProductImage
                    image={product.productImage.url}
                    title={product.productTitle}
                    id='bell'
                  >


                    <ProductActions className="product-actions">

                    <IconButton
                      onClick={(e) => handleAddToFavorites(e, product._id)}
                      sx={{
                        color: Array.isArray(like) && like.some(item => item._id === product._id) ? "red" : "white",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                        zIndex: 2 // Ensure button stays above other elements
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
            ))) : (
            <Typography variant="h6" align="center" sx={{ width: '100%' }}>
              No products available
            </Typography>
          )}
            </Grid>
          </Box>


        </>
      )}
      <CategoryModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </Container>
  );
};

export default CategoryPage;
