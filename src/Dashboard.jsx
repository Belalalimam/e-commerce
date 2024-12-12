import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from './redux/apiCalls/productApiCalls';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, isProductCreated} = useSelector(state => state.product);

  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productCategory: '',
    productImage: null
    // productPrice: '',
    // productCategorySize: '',
    // productColor: '',
  });

  const handleInputChange = (e) => {
    setProductData({
        ...productData,
        [e.target.name]: e.target.value
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProductData({
        ...productData,
        productImage: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });

    try {
      dispatch(createProduct(formData));
      setProductData({
        productName: '',
        productDescription: '',
        productCategory: '',
        productImage: null
        // productCategorySize: '',
        // productPrice: '',
        // productColor: '',
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  useEffect(() => {
    if(isProductCreated){
      navigate('/');
    }
  },[isProductCreated])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>  
          Create New Product
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="productName"
                label="Product Name"
                value={productData.productName}
                onChange={handleInputChange}
              />
            </Grid>
            
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="productPrice"
                label="Price"
                type="number"
                value={productData.productPrice}
                onChange={handleInputChange}
              />
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="productDescription"
                label="Description"
                value={productData.productDescription}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="productCategory"
                  value={productData.productCategory}
                  onChange={handleInputChange}
                >
                  <MenuItem value="lace">Lace</MenuItem>
                  <MenuItem value="elastic">Elastic</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  name="productCategorySize"
                  value={productData.productCategorySize}
                  onChange={handleInputChange}
                >
                  <MenuItem value="xs">XS</MenuItem>
                  <MenuItem value="s">S</MenuItem>
                  <MenuItem value="m">M</MenuItem>
                  <MenuItem value="l">L</MenuItem>
                  <MenuItem value="xl">XL</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Color</InputLabel>
                <Select
                  name="productColor"
                  value={productData.productColor}
                  onChange={handleInputChange}
                >
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="white">White</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {productData.productImage && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {productData.productImage.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                {
                    loading ? 'Creating...' : 'Create Product'
                }
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
