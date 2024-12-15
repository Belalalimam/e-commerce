import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Typography, Box } from '@mui/material';

const CTASection = () => {

return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', my: 4, py: 4, bgcolor: '#5483B3', borderRadius: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Don't Miss Our Special Offer!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sign up for our newsletter and get 10% off your first purchase!
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </Box>
    </Container>
  );
};

export default CTASection;