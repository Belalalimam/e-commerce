import Navbar from "./Components/1-Navbar/Navbar";
import Swiper from "./Components/2-HomePage/SwiperC";
import Categories from "./Components/3-Category/Categories";
import FilterationProduct from "./Components/4-Filtertion/FilterationProduct";
import FeaturedProducts from "./Components/4-Products/FeaturedProducts";
// import HeaderNav from "./Components/1-Navbar/HeaderNav";
import "./App.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { cyan, red, purple, lightBlue } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/8-Footer/Footer";
import { useState } from "react";
import CartModal from "./Components/1-Navbar/CartModal";
import WishlistModal from "./Components/1-Navbar/WishlistModal";
import ProductPage from "./Components/5-Card/ProductPage";
import AddUser from "./Components/1-Navbar/backend/AddUser";
import Test3 from "./test3";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#052659", //lightBlue[900],
        main1: "#000000",
      },
      secondary: {
        main: "#f44336",
        main1: "#f44336",
      },
    },
  });

  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(!isWishlistOpen);
  };

  const homepage = (
    <>
      <Swiper />
      <Categories />
      <FeaturedProducts name={"New Arivve"} category={"lace"} />
      <FeaturedProducts name={"Recently visite"} category={"fabric"} />
      <FilterationProduct />
      <FeaturedProducts name={"Featured Products"} category={"all"} />
    </>
  );

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>

          <Navbar
            onCartClick={handleCartClick}
            onWishlistClick={handleWishlistClick}
          />
          <CartModal open={isCartOpen} onClose={() => setCartOpen(false)} />
          <WishlistModal
            open={isWishlistOpen}
            onClose={() => setWishlistOpen(false)}
          />

          <Routes>
            <Route path="/" element={homepage} />

            <Route path="/addProduct" element={<AddUser />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/category/:category" element={<Test3 />} />
            <Route path="/" element={<FeaturedProducts name="Featured Products" />} />
          </Routes>

          <Footer />

         
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
