import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    // API call to login
    const response = await loginAPI(credentials);
    setUser(response.user);
    localStorage.setItem('userToken', response.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
