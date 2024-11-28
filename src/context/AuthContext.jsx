import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('_id');
    
    if (token && userId) {
      // Fetch user data using the stored token
      axios.get(`https://myserverbackend.up.railway.app/api/users/getUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data.data.user);
      });
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('https://myserverbackend.up.railway.app/api/users/login', credentials);
    setUser(response.data.data.user);
    console.log("🚀 ~ login ~ ", response.data.data.user)
    localStorage.setItem('token', response.data.data.user.token);
    localStorage.setItem('_id', response.data.data.user._id);
    return response.data.data.user;
  };

  const register = async (userData) => {
    const response = await axios.post('https://myserverbackend.up.railway.app/api/users/addUser', userData);
    setUser(response.data.data.newUser);
    localStorage.setItem('token', response.data.data.newUser.token);
    localStorage.setItem('_id', response.data.data.newUser._id);
    console.log("🚀 ~ login ~ ", response.data.data.newUser)
    return response.data.data.newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
