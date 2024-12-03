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
      axios.get(`https://myserverbackend.up.railway.app/api/auth/getUser/${userId}`, {
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
    const response = await axios.post('https://myserverbackend.up.railway.app/api/auth/login', credentials);
    setUser(response.data);
    console.log("🚀 ~ login ~ ", response.data.token)
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('_id', response.data._id);
    return response.data;
  };  

  const register = async (userData) => {
    const response = await axios.post('https://myserverbackend.up.railway.app/api/auth/register', userData);
    setUser(response.data);
    console.log(response.data);
    // localStorage.setItem('_id', response.data.data.user._id);
    return response.data;
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
