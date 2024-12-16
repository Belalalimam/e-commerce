import React from "react";
import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Button, Card, CardMedia, CardContent, Select, MenuItem, FormControl, IconButton, InputLabel } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileCart, putCartForProduct, deleteCartForProduct } from '../../redux/apiCalls/cartApiCalls';
import { putLikeForProduct, getUserProfileLike } from "../../redux/apiCalls/likeApiCalls";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";

const CartModal = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cart = useSelector(state => state.cart.item.items)
  const { like } = useSelector(state => state.like);
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(deleteCartForProduct(productId));
    // console.log(productId)
  };

  const cartProducts = product?.filter(prod =>
    cart?.some(cartItem => cartItem.productId === prod._id)
  )

  const getQuantityForProduct = (productId) => {
    const cartItem = cart?.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

const liked = (productId) => {
    dispatch(putLikeForProduct(productId));

}

const handleCardClick = (product) => {
  navigate(`/getProduct/${product._id}`);
};

  useEffect(() => {
    dispatch(getUserProfileCart())
    
  }, [dispatch]);

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {cartProducts.map((product) => (
          <Grid key={product._id} xs={12} sm={12} md={12}>
            <Card sx={{ display: 'flex', m: 2 }} /* onClick={() => setSelectedProduct(product)} */>
              <CardMedia
                component="img"
                sx={{ width: 300, height: "100%" }}
                image={product.productImage.url}
                onClick={() => handleCardClick(product)}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
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
                <CardContent className='flex items-center justify-between' sx={{ width: "100%" }}>
                  <div className='w-[115px] h-[30px] flex items-center justify-between'>
                    <Typography>Quantity: </Typography>
                    <Select value={quantity} onChange={(e) => setQuantity(e.target.value)} className="Select"  >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Button onClick={(e) => liked(product._id)}>Add To Favorite<FavoriteBorderIcon /></Button>
                    <Button onClick={(e) => handleRemoveFromCart(product._id)}>Remove<DeleteOutlineIcon /></Button>
                  </div>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CartModal;
