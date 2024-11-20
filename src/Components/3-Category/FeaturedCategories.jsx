import React, { useState } from 'react';
import {
  Container,
  Grid,
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15],
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 280,
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const categories = [
  {
    id: 1,
    title: "French Lace",
    image: "/img/img1.jpg",
    description: "Elegant French Chantilly Lace",
    price: "$299.99",
    rating: 4.8,
    reviews: 156,
    details: {
      material: "100% French Chantilly Lace",
      width: "150cm",
      colors: ["White", "Ivory", "Champagne"],
      minimumOrder: "5 yards",
      features: [
        "Delicate floral pattern",
        "Scalloped edges",
        "Beaded details",
        "Premium quality"
      ]
    }
  },
  {
    id: 2,
    title: "Beaded Lace",
    image: "/img/img1.jpg",
    description: "Hand-beaded Premium Lace",
    price: "$399.99",
    rating: 4.9,
    reviews: 128,
    details: {
      material: "Beaded Tulle Lace",
      width: "140cm",
      colors: ["White", "Ivory", "Blush"],
      minimumOrder: "3 yards",
      features: [
        "Hand-sewn beads",
        "Pearls and sequins",
        "Luxury finish",
        "Custom beading available"
      ]
    }
  },
  // Add more categories as needed
];

const FeaturedCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const CategoryModal = ({ category, open, onClose }) => {
    if (!category) return null;

    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <img
                src={category.image}
                alt={category.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {category.title}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {category.price}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={category.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({category.reviews} reviews)
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {category.description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Typography variant="body2" gutterBottom>
                Material: {category.details.material}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Width: {category.details.width}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Colors:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {category.details.colors.map((color) => (
                    <Chip key={color} label={color} />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Features:
                </Typography>
                {category.details.features.map((feature) => (
                  <Typography key={feature} variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    • {feature}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            variant="outlined" 
            startIcon={<FavoriteIcon />}
          >
            Add to Wishlist
          </Button>
          <Button 
            variant="contained" 
            startIcon={<ShoppingBagIcon />}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ py: 8, backgroundColor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Premium Lace Collection
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          Discover our exquisite selection of wedding fabrics
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <StyledCard onClick={() => setSelectedCategory(category)}>
                <StyledCardMedia
                  image={category.image}
                  title={category.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {category.price}
                    </Typography>
                    <Rating value={category.rating} size="small" readOnly />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <CategoryModal 
          category={selectedCategory}
          open={Boolean(selectedCategory)}
          onClose={() => setSelectedCategory(null)}
        />
      </Container>
    </Box>
  );
};

export default FeaturedCategories;
