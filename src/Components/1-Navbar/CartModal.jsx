// Update the imports
import React, { useEffect } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileCart, putCartForProduct } from '../../redux/apiCalls/cartApiCalls'

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

const CartModal = ({ open, onClose }) => {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const id = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))._id : null;

  const handleRemoveFromCart = (cartId) => {
    dispatch(putCartForProduct(cartId));
  };

  useEffect(() => {
    if(id) {
      dispatch(getUserProfileCart(id))
    }
  }, [dispatch, id, open, cart])

  const cartItems = Array.isArray(cart) ? cart : [];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          My Cart ({cartItems?.length})
        </Typography>
        <Divider />
        {cartItems?.map((item) => (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <img
                src={item.productImage.url}
                alt={item.productName}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
              />
              <Box>
                <Typography variant="subtitle1">{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {item.productCategory}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${item.productPrice}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => handleRemoveFromCart(item._id)}
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
  );
};

export default CartModal;
