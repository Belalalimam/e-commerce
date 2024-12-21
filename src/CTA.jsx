import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const CTASection = () => {
  const { user } = useSelector((state) => state.auth);
  window.scrollTo(0, 0);
  return (
    <Link to={user ? '/Lace' : '/login'} onClick={() => window.scrollTo(0, 0)}>
    <Container maxWidth="lg" sx={{ textAlign: 'center', my: 4, py: 4, bgcolor: '#f1f1f1', borderRadius: 2 }} className='CTA-section'>
     <Typography
             variant="h3"
             align="center"
             sx={{
               mb: { xs: 2, sm: 3, md: 5 },
               fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
               color: "#1a1a1a",
             }}
           >
        Don't Miss Our Special Offer!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sign up for our newsletter and get 10% off your first purchase! <strong>Limited Time Offer!</strong>
      </Typography>      
    </Container>
    </Link>
  );
};
export default CTASection;


