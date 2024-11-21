import React from "react";
import { Modal, Box, Typography, Button, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  // Mock wishlist items
  const wishlistItems = [
    { id: 1, name: "Wireless Earbuds", type: "Stereo", color: "Black", price: 49.99 },
    { id: 2, name: "Smart Watch", type: "Electronics", color: "Silver", price: 129.99 },
    { id: 3, name: "Portable Speaker", type: "Stereo", color: "Blue", price: 39.99 },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          My Wishlist ({wishlistItems.length})
        </Typography>
        <Divider />
        {wishlistItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Box>
              <Typography>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {item.type}, Color: {item.color}
              </Typography>
              <Typography>${item.price.toFixed(2)}</Typography>
            </Box>
            <Box>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => alert("Go to Wishlist Page")}
        >
          View All
        </Button>
      </Box>
    </Modal>
  );
};

export default WishlistModal;
