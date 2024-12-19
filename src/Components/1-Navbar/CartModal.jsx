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
import CardProucts from '../4-Products/CardProduct'

const CartModal = () => {
  const [quantity, setQuantity] = useState(1);
  const [logedin, setIsLogedIn] = useState(null);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { like } = useSelector(state => state.like);
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const { item = { items: [] } } = useSelector(state => state.cart) || {};
  const cart = item?.items || [];



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

    if (user) {
      setIsLogedIn(true);
    }

    dispatch(getUserProfileCart())

  }, [dispatch]);

  return (
    <>
      <Container maxWidth='md' sx={{ mt: 4, px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
          {Array.isArray(cart) && cart.length > 0 ? (
            cartProducts?.map((product) => (
              <Grid key={product._id} xs={12}>
                <Card sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  m: { xs: 1, sm: 2 }
                }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: {
                        xs: '100%',
                        '@media (min-width: 368px) and (max-width: 580px)': '200px'
                      },
                      height: { xs: 200, sm: 200 }
                    }}
                    image={product.productImage.url}
                    onClick={() => handleCardClick(product)}
                  />
                  <Box sx={{
                    display: 'flex', 
                    flexDirection: { 
                      xs: 'column', 
                      '@media (min-width: 368px) and (max-width: 580px)': 'row',
                      sm: 'row' 
                    },
                    width: '100%',
                    p: { xs: 1, sm: 2 }
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Category : {product.productCategory}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardContent sx={{
                      display: 'flex', alignItems: 'center', gap: 1
                    }}>
                      <div className='flex items-center gap-2'>
                        <Typography>Quantity: </Typography>
                        <Select
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          size="small"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          size="small"
                          onClick={(e) => liked(product._id)}
                          startIcon={<FavoriteBorderIcon />}
                        >
                          Favorite
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => handleRemoveFromCart(product._id)}
                          startIcon={<DeleteOutlineIcon />}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h4"
              align="center"
              sx={{
                width: '100%',
                mt: 4,
                mb: 4,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              {logedin ? "Your Cart is Empty" : (
                <>
                  <h1>Your Cart is Empty</h1>
                  <Button onClick={() => navigate('/login')}>Login to add to cart</Button>
                </>
              )}
            </Typography>
          )}
        </Grid>
      </Container>


      {cartProducts.length == 0 ? <CardProucts name={'Related Products'} /> : null}





    </>
  );
};

export default CartModal;
