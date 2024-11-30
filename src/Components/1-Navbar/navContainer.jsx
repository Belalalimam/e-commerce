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
          {/* <CartModal open={isCartOpen} onClose={() => setCartOpen(false)} />
          <WishlistModal
            open={isWishlistOpen}
            onClose={() => setWishlistOpen(false)}
          /> */}
      
    </div>
  )
}
