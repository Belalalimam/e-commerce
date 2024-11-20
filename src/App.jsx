import Navbar from "./Components/1-Navbar/Navbar"
import Swiper from './Components/2-HomePage/SwiperC'
import Categories from './Components/3-Category/Categories'
import FilterationProduct from './Components/4-Filtertion/FilterationProduct'
import FeaturedProducts from './Components/4-Products/FeaturedProducts'
// import HeaderNav from "./Components/1-Navbar/HeaderNav";
import "./App.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { cyan, red, purple, lightBlue } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/8-Footer/Footer"

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: lightBlue[900],
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
          <Categories />
          <FeaturedProducts name={'New Arrivals'} />
          <FeaturedProducts name={'Recently Viewed'} />
          <FilterationProduct />
          <FeaturedProducts name={'Featured Products'} />
          <Footer />

          

        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
