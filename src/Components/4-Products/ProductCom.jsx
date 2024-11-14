// import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/200/100"
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 
          </Typography>
          <Typography variant="body1" sx={{ color: 'blue' }}>
            Brand Name
          </Typography>
          <Typography>
            pound 350 <sup><del>450</del><span style={{color:"green"}}> offer 22%</span></sup>
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}