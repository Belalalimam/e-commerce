import React from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './ProductCard';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = React.useState([]);

  // Fetch products from your API
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://myserverbackend.up.railway.app/products');
      setProducts(response.data.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
