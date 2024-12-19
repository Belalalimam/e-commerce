import React from 'react'
import Navbar from './Navbar'
import WishlistModal from './WishlistModal'

export default function navContainer() {
  const [isWishlistOpen, setWishlistOpen] = React.useState(false);
  const [isProfialOpen, setProfialOpen] = React.useState(false);

  const handleWishlistClick = () => {
    setWishlistOpen(!isWishlistOpen);
  };

  const handleProfialClick = () => {
    setProfialOpen(!isProfialOpen);
  };
  return (
    <div>
        <Navbar
            onWishlistClick={handleWishlistClick}
            onProfialClick={handleProfialClick}
          />
          <WishlistModal
            open={isWishlistOpen}
            onClose={() => setWishlistOpen(false)}
          />
      
    </div>
  )
}
