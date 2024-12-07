import React from 'react'
import Navbar from './Navbar'
import CartModal from './CartModal'
import WishlistModal from './WishlistModal'

export default function navContainer() {
    const [isCartOpen, setCartOpen] = React.useState(false);
  const [isWishlistOpen, setWishlistOpen] = React.useState(false);
  const [isProfialOpen, setProfialOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(!isWishlistOpen);
  };

  const handleProfialClick = () => {
    setProfialOpen(!isProfialOpen);
  };
  return (
    <div>
        <Navbar
            onCartClick={handleCartClick}
            onWishlistClick={handleWishlistClick}
            onProfialClick={handleProfialClick}
          />
<<<<<<< HEAD
          <CartModal open={isCartOpen} onClose={() => setCartOpen(false)} />
          {/* <WishlistModal
=======
          {/* <CartModal open={isCartOpen} onClose={() => setCartOpen(false)} /> */}
          <WishlistModal
>>>>>>> 8d6b9566c8b71b617b0b42fe91f63314848c2c70
            open={isWishlistOpen}
            onClose={() => setWishlistOpen(false)}
          />
      
    </div>
  )
}
