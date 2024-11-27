import { createContext, useState, useContext } from 'react';

const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = async (productId) => {
    try {
      const response = await fetch(`/api/users/like/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setLikedProducts(data.data.likedProducts);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <LikeContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
}

export const useLikes = () => useContext(LikeContext);
