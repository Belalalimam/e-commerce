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
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green'],
    inStock: false,
    sortBy: 'newest'
  });
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const FilterSidebar = () => (
    <Box sx={{ width: isMobile ? 250 : 280, p: 3 }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ color: theme.palette.primary.main }}
        />
        <Typography variant="caption">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography gutterBottom>Sizes</Typography>
        <FormGroup>
          {filters.sizes.map((size) => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox
                  checked={filters.selectedSizes?.includes(size)}
                  onChange={(e) => {
                    const newSizes = e.target.checked
                      ? [...(filters.selectedSizes || []), size]
                      : filters.selectedSizes?.filter(s => s !== size);
                    handleFilterChange('selectedSizes', newSizes);
                  }}
                />
              }
              label={size}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography gutterBottom>Colors</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {filters.colors.map((color) => (
            <Box
              key={color}
              onClick={() => {
                const newColors = filters.selectedColors?.includes(color)
                  ? filters.selectedColors.filter(c => c !== color)
                  : [...(filters.selectedColors || []), color];
                handleFilterChange('selectedColors', newColors);
              }}
              sx={{
                width: 30,
                height: 30,
                bgcolor: color.toLowerCase(),
                border: filters.selectedColors?.includes(color) ? '2px solid black' : '1px solid grey',
                cursor: 'pointer',
                borderRadius: '50%'
              }}
            />
          ))}
        </Box>
      </Box>

      <FormGroup>
        <Typography gutterBottom>Availability</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            />
          }
          label="In Stock"
        />
      </FormGroup>
    </Box>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://myserverbackend.up.railway.app/products`, {
          params: {
            category,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
            sizes: filters.selectedSizes?.join(','),
            colors: filters.selectedColors?.join(','),
            inStock: filters.inStock,
            sortBy: filters.sortBy
          }
        });
        setProducts(response.data.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, filters]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component="button"
            onClick={() => navigate('/')}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Home
          </Link>
          <Typography color="text.primary">
            {category?.charAt(0).toUpperCase() + category?.slice(1)}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          {/* {!isMobile && (
            <Grid item xs={12} md={3}>
              <FilterSidebar />
            </Grid>
          )} */}

          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4">
                {category?.charAt(0).toUpperCase() + category?.slice(1)} Collection
              </Typography>
              
              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <FilterListIcon />
                </IconButton>
              )}
            </Box>

            <FeaturedProducts
            category={category}
              products={products}
              loading={loading}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 3,
                padding: 2
              }}
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



