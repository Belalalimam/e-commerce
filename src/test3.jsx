import React from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useState, useEffect } from "react";
import axios from "axios";

// Your existing styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));

const ProductImage = styled(CardMedia)({
  height: 300,
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    "& .product-actions": {
      transform: "translateY(0)",
    },
  },
});

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

const FeaturedProducts = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  const CategoryModal = ({ product, open, onClose }) => {
    if (!product) return null;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                src={`http://localhost:3000/uploads/${product.productImage}`}
                alt={product.productTitle}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.productName}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.productDescription}
              </Typography>
              <Typography variant="body2">
                Color: {product.productCategory}
              </Typography>
              <Typography variant="body2">
                Size: {product.productCategorySize}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" startIcon={<FavoriteIcon />}>
            Add to Wishlist
          </Button>
          <Button variant="contained" startIcon={<ShoppingBagIcon />}>
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Products");
        const productsData = response.data.data.products;
        setProducts(productsData);
        const uniqueCategories = [...new Set(productsData.map(product => 
          product.productCategory))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.productCategory === selectedCategory);

  const CategoryFilter = () => (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Button 
        variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
        onClick={() => setSelectedCategory('all')}
        sx={{ m: 1 }}
      >
        All
      </Button>
      {categories.map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'contained' : 'outlined'}
          onClick={() => setSelectedCategory(category)}
          sx={{ m: 1 }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );

  return (
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 600, color: "#1a1a1a" }}>
          {name}
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 6, color: "text.secondary", maxWidth: "800px", mx: "auto" }}>
          Discover our handpicked selection of premium lace fabrics and wedding materials
        </Typography>

        <CategoryFilter />

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <StyledCard onClick={() => setSelectedProduct(product)}>
                <ProductImage
                  component="img"
                  image={`http://localhost:3000/uploads/${product.productImage}`}
                  title={product.productTitle}
                />
                  <ProductActions className="product-actions">
                    <IconButton sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)", "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" } }}>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)", "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" } }}>
                      <ShoppingCartIcon />
                    </IconButton>
                  </ProductActions>
                {/* </ProductImage> */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.productCategory}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingIcon sx={{ fontSize: 16, color: "success.main", mr: 0.5 }} />
                      <Typography variant="caption" color="success.main">
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
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </Box>
  );
};

export default FeaturedProducts;
