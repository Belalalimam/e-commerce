import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const collections = [
  {
    id: 1,
    title: 'Bridal Lace',
    image: '/images/bridal-lace.jpg',
    description: 'Elegant French and Italian laces'
  },
  // Add more collections
];

const FeaturedCollections = () => {
  return (
    <Grid container spacing={3}>
      {collections.map(collection => (
        <Grid item xs={12} md={4} key={collection.id}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={collection.image}
              alt={collection.title}
            />
            <CardContent>
              <Typography variant="h6">{collection.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {collection.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedCollections;
