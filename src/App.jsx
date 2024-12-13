// Libraries imported 
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Components imported
import FilterationProduct from "./Components/4-Filtertion/FilterationProduct";
import FeaturedProducts from "./Components/4-Products/CardProduct";
import NavContainer from "./Components/1-Navbar/navContainer";
import Categories from "./Components/3-Category/Categories";
import Register from './Components/Auth/Registe/register';
import ProductPage from "./Components/4-Products/PageProduct";
import CartModal from "./Components/1-Navbar/CartModal";
import FilteredProductPage from "./allProductFiltered";
import Swiper from "./Components/2-HomePage/SwiperC";
import Footer from "./Components/8-Footer/Footer";
import Login from './Components/Auth/Login/Login';
import Profial from "./Profial";
import Test from './test'
import "./App.css"
import Dashboard from "./Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useSelector((state) => state.auth);
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
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <NavContainer />

          <Routes>
            <Route path="/" element={homepage} />
            <Route path="/Home" element={homepage} />

            <Route path="/cart" element={<CartModal />} />

            {/* <Route path="/addProduct" element={<AddUser />} /> */}
            <Route path="/getProduct/:productId" element={<ProductPage />} />
            <Route path="/products/:category" element={<FilteredProductPage />} />


            <Route path="/" element={<FeaturedProducts name="Featured Products" />} />

            <Route path="/profile" element={<Profial />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/test" element={<Test />} />

          </Routes>

          <Footer />


        </ThemeProvider>
    </>
  );
}

export default App;
