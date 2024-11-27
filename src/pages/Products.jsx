import React from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://myserverbackend.up.railway.app/api/products');
      setProducts(response.data);
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
