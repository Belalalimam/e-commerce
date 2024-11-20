import Navbar from "./Components/1-Navbar/Navbar"
import Swiper from './Components/2-HomePage/SwiperC'
import FeaturedCategories from './Components/3-Category/FeaturedCategories'
import FilterationProduct from './Components/4-Filtertion/FilterationProduct'
import FeaturedProducts from './Components/4-Products/FeaturedProducts'
// import HeaderNav from "./Components/1-Navbar/HeaderNav";
import "./App.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { cyan, red, purple } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: red[700],
        main1: "#000000",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  

  return (
    <>
      <BrowserRouter>




        <ThemeProvider theme={theme}>



          <Navbar />
          <Swiper />
          <FeaturedCategories />
          <FilterationProduct />
          <FeaturedProducts />
          <FeaturedProducts />

          

        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
