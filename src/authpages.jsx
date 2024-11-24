import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  useTheme,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook, Email, Person, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const authService = {
  login: async (credentials) => {
    const response = await axios.post('http://localhost:4000/api/users/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await axios.post('http://localhost:4000/api/users/addUser', userData);
    console.log("🚀 ~ register: ~ response:", response)
    return response.data;
  }
};

const AuthPages = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const formStyles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 8
    },
    paper: {
      width: '100%',
      maxWidth: 450,
      mx: 'auto',
      p: 4,
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      background: '#fff',
      position: 'relative',
      overflow: 'hidden'
    },
    title: {
      color: theme.palette.primary.main,
      mb: 4,
      fontWeight: 700,
      textAlign: 'center'
    },
    input: {
      mb: 2,
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
    },
    button: {
      py: 1.5,
      mt: 2,
      mb: 2,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    socialButton: {
      width: '48%',
      py: 1,
      color: '#fff',
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const validateForm = () => {
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        const result = await authService.login({
          email: formData.email,
          password: formData.password
        });
        setSuccess('Login successful!');
        localStorage.setItem('userToken', result.token);
        navigate('/dashboard');
      } else {
        const result = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setSuccess('Registration successful!');
        localStorage.setItem('userToken', result.token);
        navigate('/test');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={formStyles.wrapper}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper sx={formStyles.paper}>
            <Typography variant="h4" sx={formStyles.title}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={formStyles.input}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={formStyles.input}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                sx={formStyles.input}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {!isLogin && (
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  sx={formStyles.input}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={formStyles.button}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isLogin ? 'Login' : 'Sign Up'
                )}
              </Button>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  startIcon={<Google />}
                  sx={{
                    ...formStyles.socialButton,
                    backgroundColor: '#DB4437',
                    '&:hover': { backgroundColor: '#C53929' },
                  }}
                >
                  Google
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Facebook />}
                  sx={{
                    ...formStyles.socialButton,
                    backgroundColor: '#4267B2',
                    '&:hover': { backgroundColor: '#365899' },
                  }}
                >
                  Facebook
                </Button>
              </Box>

              <Typography sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Box
                  component="span"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </Box>
              </Typography>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AuthPages;
