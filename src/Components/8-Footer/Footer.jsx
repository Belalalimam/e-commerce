// src/components/Footer.js
import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Lace Fabric is dedicated to providing high-quality lace materials for all your crafting needs. Our mission is to inspire creativity and elegance in every project.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" variant="body2">
              Home
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2">
              Shop
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2">
              Contact
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2">
              FAQ
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Lace Fabric. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
