// WishlistModal.js
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Card,
  CardMedia,
  CardContent, 
  Typography,
  Button,
  IconButton,
  Box,
  Modal,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "react-toastify/dist/ReactToastify.css";


import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

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

const WishlistModal = ({ open, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getId = localStorage.getItem("_id");

  const fetchWishlistItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://myserverbackend.up.railway.app/api/users/getUser/${getId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlistItems(response.data.likes);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    fetchWishlistItems();
    console.log(wishlistItems);
  }, []);
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://myserverbackend.up.railway.app/products/${productId}`
      );
      fetchWishlistItems();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToFavorites = async (e, product) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');}

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            My Wishlist ({wishlistItems.length})
          </Typography>
          <Divider />
          {wishlistItems.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <img
                  src={`https://myserverbackend.up.railway.app/uploads/${item.productImage}`}
                  alt={item.productName}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <Box>
                  <Typography variant="subtitle1">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {item.productCategory}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${item.productPrice}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => handleRemoveFromWishlist(item._id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Modal>

      
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>


      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />


      <Container maxWidth="xl">
        
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 6, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
        >
          Discover our handpicked selection of premium lace fabrics and wedding
          materials
        </Typography>

        {/* <CategoryFilter /> */}

        <Grid container spacing={4}>
          {wishlistItems.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <StyledCard onClick={() => setSelectedProduct(product)}>
                <ProductImage
                  image={product.productImage.url}
                  title={product.productTitle}
                  id='bell'
                >
                  <ProductActions className="product-actions">
                    <IconButton
                      onClick={(e) => handleAddToFavorites(e, product)}
                      sx={{
                        color: favorites.some(
                          (item) => item._id === product._id
                        )
                          ? "red"
                          : "white",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleAddToCart(e, product)}
                      sx={{
                        color: cartItems.some(
                          (item) => item._id === product._id
                        )
                          ? "#4CAF50"
                          : "white",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
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
          ))}
        </Grid>
      </Container>
    </Box >

    </>
  );
};

export default WishlistModal;
