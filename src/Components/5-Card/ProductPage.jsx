// src/components/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryPage = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryId}`);
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <Typography variant="h6">Loading products...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error fetching products.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products in {categoryId}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 2 }}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{ width: '100%', height: 'auto' }}
              />
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2">${product.price}</Typography>
              <Link to={`/product/${product.id}`}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  View Details
                </Button>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
