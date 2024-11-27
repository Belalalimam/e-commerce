import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Tab,
    Tabs,
    InputAdornment,
    IconButton,
    Alert,
    Tooltip,
    Avatar,
    Menu,
    Link,
    MenuItem,

} from '@mui/material';
import {
    Email,
    Lock,
    Person,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    p: 4,
};

const AuthModal = ({ open, onClose }) => {
    const [tab, setTab] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [error, setError] = useState('');
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = ['Account', 'Dashboard', 'Logout'];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = tab === 0 ? '/login' : '/signup';
            const response = await axios.post(`https://myserverbackend.up.railway.app//${endpoint}`, formData);

            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                onClose();
                window.location.reload();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            {/* <Box sx={modalStyle}>
        <Tabs 
          value={tab} 
          onChange={(e, newValue) => setTab(newValue)}
          sx={{ mb: 3 }}
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            required
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            required
            type={showPassword ? 'text' : 'password'}
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
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              height: 48,
              background: 'linear-gradient(45deg, #6C5CE7 30%, #a8a4e6 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a4bd4 30%, #8f89e0 90%)',
              }
            }}
          >
            {tab === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </Box> */}
            <Box sx={{ flexGrow: 0 }}>
                
                    {settings.map((setting) => (
                        <Link to={setting} className="action-item" key={setting}>
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        </Link>
                    ))}
            </Box>

        </Modal>
    );
};

export default AuthModal;
