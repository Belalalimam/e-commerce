import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  height: '80vh',
  backgroundImage: 'url(/images/hero-lace.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
}));

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container>
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h1" color="white" gutterBottom>
            Premium Lace Fabrics
          </Typography>
          <Typography variant="h5" color="white" paragraph>
            Discover our exquisite collection of bridal and fashion lace
          </Typography>
          <Button variant="contained" size="large">
            Shop Collection
          </Button>
        </Box>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
