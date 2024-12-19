// WishlistModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileLike, putLikeForProduct } from '../../redux/apiCalls/likeApiCalls'
 
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

const WishlistModal = ({ open, onClose }) => {
  const { like } = useSelector(state => state.like);
  const dispatch = useDispatch();
  const id = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))._id : null;
  

  const handleRemoveFromWishlist = (likeId) => {
    dispatch(putLikeForProduct(likeId));
    dispatch(getUserProfileLike(id));
  };

  useEffect(() => {
    if(id) {
      dispatch(getUserProfileLike(id))
    }
  }, [dispatch, id, open, like]) // Added open as dependency

  const likeItems = Array.isArray(like) ? like : [];

  return (
    <Modal open={open} onClose={onClose} className=''>
      <Box sx={style} className='overscroll-auto '>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          My Wishlist ({likeItems?.length})
        </Typography>
        <Divider />
        <div className='overflow-y-auto WishlistModal' >
        {likeItems?.map((item) => (
            <Box
            key={item._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }} >
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
        </div>
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

export default WishlistModal;
