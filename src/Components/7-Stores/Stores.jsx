import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
export default function Stores() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', widht:"200px", border:"2px solid red" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', background:"black", color:"white" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' ,  background:"black", color:"white" }}

                  >
                Logo <i style={{color:"white"}} class="fa-brands fa-google"></i>
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://picsum.photos/350/200"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
