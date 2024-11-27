import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await axios.post('https://myserverbackend.up.railway.app/api/users/login', credentials);
    setUser(response.data.user);
    console.log("🚀 ~ login ~ ", response.data.data.user)
    localStorage.setItem('token', response.data.data.user.token);
    localStorage.setItem('_id', response.data.data.user._id);
    return response.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
