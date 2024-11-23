// FilteredProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Slider,
  FormGroup,
  FormControlLabel,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import FeaturedProducts from './Components/4-Products/FeaturedProducts';

const FilteredProductPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    inStock: false
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category, filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Products/${category}`, {
        params: {
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          sizes: filters.sizes.join(','),
          colors: filters.colors.join(','),
          inStock: filters.inStock
        }
      });
      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  };

  const FilterSidebar = () => (
    <Box sx={{ width: isMobile ? 250 : 280, p: 3 }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(e, newValue) => setFilters({ ...filters, priceRange: newValue })}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>

      <FormGroup>
        <Typography gutterBottom>Availability</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.inStock}
              onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
            />
          }
          label="In Stock"
        />
      </FormGroup>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link color="inherit" onClick={() => navigate('/')}>
            Home
          </Link>
          <Typography color="text.primary">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <FilterSidebar />
            </Grid>
          )}

          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4">
                {category.charAt(0).toUpperCase() + category.slice(1)} Collection
              </Typography>
              
              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <FilterListIcon />
                </IconButton>
              )}
            </Box>

            <FeaturedProducts 
              name={`${category.charAt(0).toUpperCase() + category.slice(1)} Collection`}
              initialCategory={category}
              products={products}
              loading={loading}
            />
          </Grid>
        </Grid>

        {isMobile && (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <FilterSidebar />
          </Drawer>
        )}
      </Box>
    </Container>
  );
};

export default FilteredProductPage;
