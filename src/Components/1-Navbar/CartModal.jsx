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

const CartModal = ({ open, onClose }) => {
  // Mock cart items
  const cartItems = [
    { id: 1, name: "TWS Bujug", type: "Stereo", color: "Blue", price: 29.9, oldPrice: 100 },
    { id: 2, name: "HEADSOUND XIAMI F", type: "Stereo", color: "Blue", price: 59.99, oldPrice: 100 },
    { id: 3, name: "Headshound Baptis", type: "Stereo", color: "Blue", price: 12.0, oldPrice: 100 },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          My Cart ({cartItems.length})
        </Typography>
        <Divider />
        {cartItems.map((item) => (
          <Box key={item.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
            <Box>
              <Typography>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {item.type}, Color: {item.color}
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                ${item.oldPrice.toFixed(2)}
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
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => alert("Proceed to Checkout")}
        >
          View All
        </Button>
      </Box>
    </Modal>
  );
};

export default CartModal;
