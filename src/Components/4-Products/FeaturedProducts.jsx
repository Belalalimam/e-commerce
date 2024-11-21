import React from 'react';
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

} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
}));

const ProductImage = styled(CardMedia)({
  height: 300,
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    '& .product-actions': {
      transform: 'translateY(0)',
    },
  },
});

const ProductActions = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '20px',
  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
  transform: 'translateY(100%)',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
});

const products = [
  {
    id: 1,
    name: "Royal French Lace",
    image: "/img/img3.jpg",
    price: 299.99,
    rating: 4.8,
    reviews: 124,
    status: "Best Seller",
    description: "Hand-beaded tulle with pearl embellishments",
    perMeter: true
  },
  {
    id: 2,
    name: "Pearl Beaded Tulle",
    image: "/img/img1.jpg",
    price: 399.99,
    rating: 4.9,
    reviews: 89,
    status: "New Arrival",
    description: "Hand-beaded tulle with pearl embellishments",
    perMeter: true
  },
  {
    id: 3,
    name: "Vintage Embroidered Lace",
    image: "/img/img1.jpg",
    price: 259.99,
    rating: 4.7,
    reviews: 156,
    status: "Limited Edition",
    description: "Classic embroidered lace with vintage patterns",
    perMeter: true
  },
  {
    id: 4,
    name: "Crystal Sequin Fabric",
    image: "/img/img1.jpg",
    price: 449.99,
    rating: 4.9,
    reviews: 78,
    status: "Premium",
    description: "Luxury sequin fabric with crystal embellishments",
    perMeter: true
  }
];

const FeaturedProducts = ({name}) => {

  const [selectedCategory, setSelectedCategory] = useState(null);


  const CategoryModal = ({ product, open, onClose }) => {
    if (!product) return null;

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
                src={product.image}
                // alt={product.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              {/* <Typography variant="h5" color="primary" gutterBottom>
                {product.price}
              </Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.reviews} reviews)
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Typography variant="body2" gutterBottom>
                Material: {product.details.material}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Width: {product.details.width}
              </Typography> */}

              {/* <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Colors:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {product.details.colors.map((color) => (
                    <Chip key={color} label={color} />
                  ))}
                </Box>
              </Box> */}

              {/* <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Features:
                </Typography>
                {category.details.features.map((feature) => (
                  <Typography key={feature} variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    • {feature}
                  </Typography>
                ))}
              </Box> */}
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
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: '#1a1a1a'
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 6,
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Discover our handpicked selection of premium lace fabrics and wedding materials
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <StyledCard onClick={() => setSelectedCategory(product)}>
                <ProductImage
                  image={product.image}
                  title={product.name}
                >
                  <ProductActions className="product-actions">
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                      }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </ProductActions>
                </ProductImage>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={product.status}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating
                      value={product.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <Typography variant="h6" color="primary">
                      ${product.price}
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        /meter
                      </Typography>
                    </Typography> */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon
                        sx={{
                          fontSize: 16,
                          color: 'success.main',
                          mr: 0.5
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="success.main"
                      >
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
        product={selectedCategory}
        open={Boolean(selectedCategory)}
        onClose={() => setSelectedCategory(null)}
      />
    </Box>
  );
};

export default FeaturedProducts;
