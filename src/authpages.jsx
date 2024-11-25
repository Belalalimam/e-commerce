import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Paper, Typography, TextField, Button,
  IconButton, InputAdornment, Alert, CircularProgress, Tabs, Tab
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Person, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const authService = {
  register: async (userData) => {
    const response = await axios.post('http://localhost:4000/api/users/addUser', userData);
    return response.data.data;
  },
  login: async (credentials) => {
    const response = await axios.post('http://localhost:4000/api/users/login', credentials);
    return response.data;
  }
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
   
    try {
      if (activeTab === 0) {
        const result = await authService.login({
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('userToken', result.token);
        navigate('/dashboard');
      } else {
        const result = await authService.register(formData);
        localStorage.setItem('userToken', result.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || `${activeTab === 0 ? 'Login' : 'Registration'} failed`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({
      name: '',
      email: '',
      age: '',
      password: '',
    });
    setError(null);
  };

  return (
    <Box sx={styles.wrapper}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper sx={styles.paper}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{ mb: 3 }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {activeTab === 1 && (
                <>
                  <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    sx={styles.input}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    name="age"
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    variant="outlined"
                    sx={styles.input}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={styles.input}
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
                sx={styles.input}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={styles.button}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (activeTab === 0 ? 'Login' : 'Sign Up')}
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

const styles = {
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
  },
  title: {
    color: 'primary.main',
    mb: 4,
    fontWeight: 700,
    textAlign: 'center'
  },
  input: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
    },
  },
  button: {
    py: 1.5,
    mt: 2,
    backgroundColor: 'primary.main',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }
};

export default AuthPage;
