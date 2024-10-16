import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export default function HeaderNav() {
  return (
    <>
    <Box sx={{ flexGrow: 1, bgcolor: 'secondar'}}>
      <Container maxWidth="lg" style={{ height:"30px"}} >

        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xs={12}>
            <Typography>
            <i class="fa-solid fa-location-dot"></i>
              1418 Reverwood Drive, CA 98052, US
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
            Something you love is now on sale! <u>Buy Now!</u>
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="space-between" alignItems="center">


            <Grid> <i class="fa-regular fa-font-awesome"></i> English</Grid>
            <Grid style={{borderLeft:"2px solid black", padding:"5px", paddingTop:"3px"}} > USD <i class="fa-solid fa-angle-down"></i></Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
      
    </>
  )
}
