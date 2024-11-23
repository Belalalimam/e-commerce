import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
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
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "./Filteration.css";

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

const CategoryModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
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
              Category: {product.productCategory}
            </Typography>
            <Typography variant="body2">
              Color: {product.productColor}
            </Typography>
            <Typography variant="body2">Size: {product.productSize}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" color="primary" gutterBottom>
              ${product.productPrice}
            </Typography>
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

const FeaturedProducts = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    colors: [],
    categories: [],
    sizes: [],
  });

  const colors = [
    { id: 1, name: "Black", hex: "#000000" },
    { id: 2, name: "White", hex: "#FFFFFF" },
    { id: 3, name: "Red", hex: "#FF0000" },
    { id: 4, name: "Blue", hex: "#0000FF" },
    { id: 5, name: "Green", hex: "#00FF00" },
  ];

  const categories = ["lace", "fabric", "etylo"];

  const sizes = ["xs", "s", "m"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Products");
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const colorMatch =
        filters.colors.length === 0 ||
        filters.colors.includes(product.productColor);
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.productCategory);
      const sizeMatch =
        filters.sizes.length === 0 ||
        filters.sizes.includes(product.productCategorySize);
      return colorMatch && categoryMatch && sizeMatch;
    });
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      colors: [],
      categories: [],
      sizes: [],
    });
  };

  return (
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          className="border"
          align="center"
          sx={{ mb: 2, fontWeight: 600, color: "#1a1a1a" }}
        >
          {name}
        </Typography>


        <div
              className="filter-toggle"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <FaFilter />
              <span>Show Filters</span>
            </div>

        <div className="main-container">
          

          <aside
            className={`filter-sidebar ${showMobileFilters ? "show" : ""}`}
          >

            

            <div className="filter-group">
              <Typography variant="subtitle2" gutterBottom>
                Colors
              </Typography>
              <div className="color-options">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className={`color-option ${
                      filters.colors.includes(color.name) ? "selected" : ""
                    }`}
                    onClick={() => handleFilterChange("colors", color.name)}
                  >
                    <span
                      className="color-circle"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    <span>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <Typography variant="subtitle2" gutterBottom>
                Categories
              </Typography>
              <div className="category-options">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      filters.categories.includes(category)
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleFilterChange("categories", category)}
                    sx={{ m: 0.5 }}
                    fullWidth
                    size="small"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <Typography variant="subtitle2" gutterBottom>
                Sizes
              </Typography>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      filters.sizes.includes(size) ? "selected" : ""
                    }`}
                    onClick={() => handleFilterChange("sizes", size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="outlined"
              onClick={clearFilters}
              fullWidth
              sx={{ mt: 2 }}
            >
              Clear All Filters
            </Button>
          </aside>
        </div>

        <Grid container spacing={4}>
          {getFilteredProducts().map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <StyledCard onClick={() => setSelectedProduct(product)}>
                <ProductImage
                  component="img"
                  image={`http://localhost:3000/uploads/${product.productImage}`}
                  title={product.productTitle}
                />
                <ProductActions className="product-actions">
                  <IconButton
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </ProductActions>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6">
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.productCategory}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingIcon
                        sx={{ fontSize: 16, color: "success.main", mr: 0.5 }}
                      />
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

        <CategoryModal
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
