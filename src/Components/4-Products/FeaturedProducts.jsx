import React from "react";
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
  DialogActions,
  IconButton,
  Box,
  Chip,
  Rating,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const FeaturedProducts = ({ name, typey, category, initialCategory = 'all' }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://myserverbackend.up.railway.app/Products");
        const productsData = response.data.data.products;
        setProducts(productsData);
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.productCategory)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    // e.stopPropagation(); // Prevent opening modal when clicking cart button
    // addToCart(product);
    // toast.success("Product added to cart!");
  };

  // const handleAddToFavorites = async (e, product) => {
  //   e.stopPropagation();
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     toast.error("Please login first");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `https://myserverbackend.up.railway.app/api/users/like/${getId}/${product._id}`,
  //       {},
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       }
  //     );
      
  //     console.log("Server response:", response.data);

  //     // Toggle favorite status locally
  //     const isFavorite = favorites.some(fav => fav._id === product._id);

  //     if (!isFavorite) {
  //       setFavorites(prev => [...prev, product]);
  //       toast.success('🦄 Wow so easy!', {
  //         position: "top-left",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Bounce,
  //       });
  //     } else {
  //       setFavorites(prev => prev.filter(fav => fav._id !== product._id));
  //       toast.success('Removed from favorites!', {
  //         position: "top-left",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Bounce,
  //       });
  //     }

  //   } catch (error) {
  //     console.log('Error:', error.response?.data || error.message);
  //     toast.error("Failed to update favorites");
  //   }
  // };


//   const handleAddToFavorites = async (e, product) => {
//     e.stopPropagation();
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('_id');

//     if (!token) {
//         toast.error("Please login first");
//         return;
//     }

//     try {
//         const response = await axios.post(
//             `https://myserverbackend.up.railway.app/api/users/like/${userId}/${product._id}`,
//             {},
//             {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         console.log("🚀 ~ handleAddToFavorites ~ response:", response)

//         // Toggle favorite status locally
//         const isFavorite = favorites.some(fav => fav._id === product._id);

//         if (!isFavorite) {
//             setFavorites(prev => [...prev, product]);
//             toast.success('🦄 Product added to favorites!', {
//                 position: "top-left",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         } else {
//             setFavorites(prev => prev.filter(fav => fav._id !== product._id));
//             toast.success('Removed from favorites!', {
//                 position: "top-left",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         }

//     } catch (error) {
//         console.log('Error:', error.response?.data || error.message);
//         toast.error("Failed to update favorites");
//     }
// };

const handleAddToFavorites = async (e, product) => {
  e.stopPropagation();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('_id');

  if (!token) {
      toast.error("Please login first");
      return;
  }

  try {
      // First, get the current user data to check if product is already liked
      const checkUser = await axios.get(
          `https://myserverbackend.up.railway.app/api/users/getUser/${userId}`,
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }
      );

      // Then make the like/unlike request
      const response = await axios.post(
          `https://myserverbackend.up.railway.app/api/users/like/${userId}/${product._id}`,
          {},
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }
      );
      console.log("🚀 ~ handleAddToFavorites ~ response:", response)

      // Update UI based on server response
      if (response.data.success) {
          setFavorites(response.data.data.likedProducts);
          toast.success('Updated favorites successfully!', {
              position: "top-left",
              autoClose: 3000,
              theme: "colored",
              transition: Bounce,
          });
      }

  } catch (error) {
      toast.error("Failed to update favorites");
      console.log('Error:', error.response?.data || error.message);
  }
};










  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
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
                src={`https://myserverbackend.up.railway.app/uploads/${product.productImage}`}
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

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.productCategory === category);



  return (
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
          variant="h3"
          align="center"
          sx={{ mb: 2, fontWeight: 600, color: "#1a1a1a" }}
        >
          {name}
        </Typography>
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
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <StyledCard onClick={() => setSelectedProduct(product)}>
                <ProductImage
                  image={`https://myserverbackend.up.railway.app/uploads/${product.productImage}`}
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

      <CategoryModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </Box >
  );
};
export default FeaturedProducts;





// const addToFavorites = (product) => {
//   const existingFavorite = favorites.find((favorite) => favorite.id === product.id);
//   if (!existingFavorite) {
//     setFavorites([...favorites, product]);
//   }
// };
// const addToCart = (product) => {
//     // const existingItem = cartItems.find((item) => item.id === product.id);
//     // if (existingItem) {
//     //   const updatedCartItems = cartItems.map((item) =>
//     //     item.id === product.id
//     //       ? { ...item, quantity: item.quantity + 1 }
//     //       : item
//     //   );
//     //   setCartItems(updatedCartItems);
//     // } else {
//     //   setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     // }
//   };

//   const removeFromCart = (product) => {
//     const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
//     setCartItems(updatedCartItems);
//   };
// const removeFromFavorites = (product) => {
//   const updatedFavorites = favorites.filter((favorite) => favorite.id !== product.id);
//   setFavorites(updatedFavorites);
// };

// const handleProductClick = (product) => {
//   setSelectedProduct(product);
// };

// const handleCloseModal = () => {
//   setSelectedProduct(null);
// };

// const handleRemoveFromCart = (product) => {
//   removeFromCart(product);
//   toast.success("Product removed from cart!");
// };