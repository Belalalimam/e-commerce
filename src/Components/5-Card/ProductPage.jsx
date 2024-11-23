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
  InputLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ToastContainer, toast } from "react-toastify";


const API_BASE_URL = "http://localhost:3000";

const CategoryPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productResponse, allProductsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/Products/getProduct/${productId}`),
          axios.get(`${API_BASE_URL}/Products`),
        ]);

        const currentProduct = productResponse.data.data.product;
        setProduct(currentProduct);

        const similar = allProductsResponse.data.data.products
          .filter(
            (p) =>
              p.productCategory === currentProduct.productCategory &&
              p._id !== productId
          )
          .slice(0, 6);
        setSimilarProducts(similar);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6">Loading product details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
  };

  const addToFavorites = (product) => {
    const existingFavorite = favorites.find((favorite) => favorite.id === product.id);
    if (!existingFavorite) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (product) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== product.id);
    setFavorites(updatedFavorites);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent opening modal when clicking cart button
    addToCart(product);
    toast.success("Product added to cart!");
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    toast.success("Product removed from cart!");
  };

  const handleAddToFavorites = (e, product) => {
    e.stopPropagation(); // Prevent opening modal when clicking favorite button
    addToFavorites(product);
    toast.success("Product added to favorites!");
  };



  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
  };
  

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <ToastContainer />
      {product && (
        <>
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link href="/" underline="hover">
              Home
            </Link>
            <Link href={product.productCategory} underline="hover">
              {product.productCategory}
            </Link>
            <Typography color="text.primary">{product.productName}</Typography>
          </Breadcrumbs>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper elevation={0}>
                <Box
                  component="img"
                  src={`${API_BASE_URL}/uploads/${product.productImage}`}
                  alt={product.productName}
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
                {product.productName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  (245 reviews)
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.productPrice}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.productDescription}
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Category"
                    secondary={product.productCategory}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Size"
                    secondary={product.productCategorySize}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  ${product.productPrice}
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
                  onClick={(e) => handleAddToFavorites(e, product)}
                  fullWidth
                >
                  Add to Wishlist
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
            <Grid container spacing={2}>
              {similarProducts.map((similarProduct) => (
                <Grid item xs={6} sm={4} md={2} key={similarProduct._id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                    onClick={() => navigate(`/product/${similarProduct._id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={`${API_BASE_URL}/uploads/${similarProduct.productImage}`}
                      alt={similarProduct.productName}
                    />
                    <CardContent>
                      <Typography noWrap>
                        {similarProduct.productName}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        ${similarProduct.productPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CategoryPage;
