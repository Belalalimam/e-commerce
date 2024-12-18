import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from '../../../redux/apiCalls/authApiCalls';



const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', });
  const [errors, setErrors] = useState({});
  const { registerMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));

  };

  if(registerMessage) {
    swal({
        title: registerMessage,
        icon: "success"
    }).then(isOk => {
        if(isOk) {
           navigate("/login");
        }
    })
}

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {errors.submit && (
            <Typography color="error" align="center">
              {errors.submit}
            </Typography>
          )}
          <Typography align="center">
            Already have an account?{' '}
            <Link to={"/login"} >
              Sign In
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;