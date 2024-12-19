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
import { toast } from "react-toastify";

import { putLikeForProduct } from '../../redux/apiCalls/likeApiCalls';
import { putCartForProduct, getUserProfileCart } from '../../redux/apiCalls/cartApiCalls';
import { fetchProduct } from "../../redux/apiCalls/productApiCalls";

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
const FeaturedProducts = ({ name }) => {
  const [quantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const Products = useSelector((state) => state.product.product);
  const { like } = useSelector(state => state.like);
  const { user } = useSelector((state) => state.auth);
  const { item = { items: [] } } = useSelector(state => state.cart) || {};
  const cart = item?.items || [];

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
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#fff" }} className=''>
      <Container maxWidth="xxl" className=" CardProductContaienr">
        <Typography variant='h3' align="center" sx={{ mb: { xs: 2, sm: 3, md: 5 }, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, color: "#1a1a1a" }}>
          {name}
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent={"center"} className="p-[0px] m-[0px]">
          {Array.isArray(Products) && Products.length > 0 ? (
            Products.map((product) => (
              <Grid key={product._id} xs={6} sm={6} md={3}>
                <StyledCard onClick={() => setSelectedProduct(product)}>
                  <ProductImage
                    image={product.productImage.url}
                    title={product.productName}
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
