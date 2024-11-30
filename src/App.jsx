// import Navbar from "./Components/1-Navbar/Navbar";
import Swiper from "./Components/2-HomePage/SwiperC";
import Categories from "./Components/3-Category/Categories";
import FilterationProduct from "./Components/4-Filtertion/FilterationProduct";
import FeaturedProducts from "./Components/4-Products/FeaturedProducts";
// import HeaderNav from "./Components/1-Navbar/HeaderNav";
import "./App.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/8-Footer/Footer";
import { useState } from "react";
import CartModal from "./Components/1-Navbar/CartModal";
// import WishlistModal from "./Components/1-Navbar/WishlistModal";
import ProductPage from "./Components/5-Card/ProductPage";
import AddUser from "./Components/1-Navbar/backend/AddUser";
import FilteredProductPage from "./allProductFiltered";
// import AuthPages from "./authpages";
import Test from './test'
import Dashboard from "./dashboard";
// import ProfialModal from './Components/1-Navbar/ProfialModal'
import NavContainer from "./Components/1-Navbar/navContainer";
import { AuthProvider } from './context/AuthContext'
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Registe/register';
import ProtectedRoute from './Components/Auth/protectedRoute';
// import  Test3 from "./test3";



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
  const [isProfialOpen, setProfialOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };
  const handleWishlistClick = () => {
    setWishlistOpen(!isWishlistOpen);
  };
  const handleProfialClick = () => {
    setProfialOpen(!isProfialOpen);
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
        <AuthProvider >
          <ThemeProvider theme={theme}>
            <NavContainer />
            <Routes>
              <Route path="/" element={homepage} />
              <Route path="/home" element={homepage} />
              <Route path="/cart" element={<CartModal />} />

              <Route path="/addProduct" element={<AddUser />} />
              <Route path="/getProduct/:productId" element={<ProductPage />} />
              <Route path="/products/:category" element={<FilteredProductPage />} />
              
              <Route path="/" element={<FeaturedProducts name="Featured Products" />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>


              <Route path="/test" element={<Test />} />
            </Routes>

            <Footer />


          </ThemeProvider>
        </AuthProvider >
      </BrowserRouter>
    </>
  );
}

export default App;
