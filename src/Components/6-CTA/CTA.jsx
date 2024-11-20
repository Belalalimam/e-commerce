import { Box, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const CategoryItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const Categories = () => {
  const [categories] = useState([
    {
      id: 1,
      name: 'Electronics',
      image: '/images/electronics.png',
    },
    {
      id: 2,
      name: 'Fashion',
      image: '/images/fashion.png',
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      image: '/images/home.png',
    },
    {
      id: 4,
      name: 'Beauty',
      image: '/images/beauty.png',
    },
    {
      id: 5,
      name: 'Sports',
      image: '/images/sports.png',
    },
    {
      id: 6,
      name: 'Books',
      image: '/images/books.png',
    },
  ]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Shop By Category
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(6, 1fr)',
          },
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <Box
              component="img"
              src={category.image}
              alt={category.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 120,
                objectFit: 'contain',
                mb: 1,
              }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {category.name}
            </Typography>
          </CategoryItem>
        ))}
      </Box>
    </Container>
  );
};

export default Categories;
