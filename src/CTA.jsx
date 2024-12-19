import { useDispatch } from 'react-redux';
import { Button, Container, Typography, Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!email) {
      setError('Please enter your email');
    } else {
      // Dispatch action to sign up for newsletter
      dispatch(signUpForNewsletter(email));
      setEmail('');
      setError(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', my: 4, py: 4, bgcolor: '#C1E8FF', borderRadius: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Don't Miss Our Special Offer!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sign up for our newsletter and get 10% off your first purchase! <strong>Limited Time Offer!</strong>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          size="small"
          sx={{ mr: 1 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up Now
        </Button>
      </Box>
    </Container>
  );
};
export default CTASection;
// const CTASection = () => {
//   return (
//     <Container maxWidth="lg" sx={{ textAlign: 'center', my: 4, py: 4, bgcolor: '#C1E8FF', borderRadius: 2 }}>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Don't Miss Our Special Offer!
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Sign up for our newsletter and get 10% off your first purchase! <strong>Limited Time Offer!</strong>
//       </Typography>
//       <Box sx={{ mt: 2 }}>
//         <TextField
//           variant="outlined"
//           placeholder="Enter your email"
//           size="small"
//           sx={{ mr: 1 }}
//         />
//         <Button variant="contained" color="primary">
//           Sign Up Now
//         </Button>
//       </Box>
//     </Container>
//   );
// };
// export default CTASection;


