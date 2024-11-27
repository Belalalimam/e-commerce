// WishlistModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';

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
  const [wishlistItems, setWishlistItems] = useState([]);



  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get('https://myserverbackend.up.railway.app//wishlist');
      setWishlistItems(response.data.data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };
  useEffect(() => {
    fetchWishlistItems();
  }, []);
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`https://myserverbackend.up.railway.app//products/${productId}`);
      fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
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
              bgcolor: 'grey.50',
              borderRadius: 1
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <img 
                src={`https://myserverbackend.up.railway.app//uploads/${item.productImage}`}
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
  );
};

export default WishlistModal;
