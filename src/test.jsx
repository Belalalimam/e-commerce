import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from './redux/apiCalls/productApiCalls';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';

export default function Test() {
  const dispatch = useDispatch();
  const { loading, isProductCreated } = useSelector(state => state.product);
  const [newProduct, setProduct] = React.useState({
    productCategory: '',
    productName: '',
    productDescription: '',
    productImage: null
  });

  const handleChange = (e) => {
    setProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({
        ...newProduct,
        productImage: file
      });
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });
    
    dispatch(createProduct(formData));
  };
  
  


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create Product
        </Typography>

        <form  onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category"
            name="productCategory"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            value={newProduct.productCategory}
          />

          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            value={newProduct.productName}
          />

          <TextField
            fullWidth
            label="Description"
            name="productDescription"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            value={newProduct.productDescription}
            rows={4}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              name="productImage"
              accept="image/*"
            />
          </Button>

          {newProduct.productImage && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {newProduct.productImage.name}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </Button>

          </form>
          
      </Paper>
    </Container>
  );
}
