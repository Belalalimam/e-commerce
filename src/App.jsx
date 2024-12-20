// Libraries imported 
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Components imported
import FilterationProduct from "./Components/4-Filtertion/FilterationProduct";
import FeaturedProducts from "./Components/4-Products/CardProduct";
import VerifyEmail from "./Components/6-Verify-Email/VerifyEmail";
import NavContainer from "./Components/1-Navbar/navContainer";
import ProductPage from "./Components/4-Products/PageProduct";
import FilteredProductsCategory from "./FilteredCategory";
import Register from './Components/Auth/Registe/register';
import CartModal from "./Components/1-Navbar/CartModal";
import Swiper from "./Components/2-HomePage/SwiperC";
import Footer from "./Components/8-Footer/Footer";
import Login from './Components/Auth/Login/Login';
import Profial from "./Profial";
import Test from './test'
import "./App.css"
import Dashboard from "./Dashboard";
import SearchResults from "./SearchResults";
import CTASection from "./CTA";
import { useEffect } from "react";
import { fetchProduct, fetchProductsBasedOnCategory, fetchProductsBasedOnCategorySize } from "./redux/apiCalls/productApiCalls";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { category } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchProductsBasedOnCategory(category));
    dispatch(fetchProductsBasedOnCategorySize(category));
  }, [dispatch, category]);
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
      <FeaturedProducts name={"New Arivve"} />
      <FilterationProduct />
      <FeaturedProducts />
    </>
  );
  
  return (
    <>
        <ThemeProvider theme={theme}>
          <NavContainer />

          <Routes>
            <Route path="/" element={homepage} />
            <Route path="/Home" element={homepage} />

            <Route path="/cart" element={<CartModal />} />

            <Route path="/getProduct/:productId" element={<ProductPage />} />
            <Route path="/:category" element={<FilteredProductsCategory />} />

            <Route path="/search" element={<SearchResults />} />

            <Route path="/profile/:id" element={<Profial />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to={`/profile/${user?._id}`} />} />
            <Route path="/logout" element={homepage} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile/:id" />} />
            <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />}/>

            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/test" element={<Test />} />

          </Routes>
          <CTASection />

          <Footer />


        </ThemeProvider>
    </>
  );
}

export default App;
