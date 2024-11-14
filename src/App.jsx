import Navbar from "./Components/1-Navbar/Navbar";
import Swiper from './Components/2-HomePage/SwiperC'
import SliderCategory  from './Components/3-Category/SliderCategory'
<<<<<<< HEAD
import Product from "./Components/4-Products/Product";
=======
import CardCategory from './Components/3-Category/CardCategory'
import Filtertion from './Components/4-Filtertion/Filtertion'
import Card1 from "./Components/5-Card/Card1";
import CTA from "./Components/6-CTA/CTA";
import Stores from "./Components/7-Stores/Stores";


>>>>>>> 0550a05d3f3121f66a27fdac2a9407497fe8e418
// eslint-disable-next-line no-unused-vars
import HeaderNav from "./Components/1-Navbar/HeaderNav";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
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
          <SliderCategory />
<<<<<<< HEAD
          <Product />
=======
          <CardCategory />
          {/* <Card1 /> */}
          <Filtertion />
                    
          <CTA />
          {/* <Stores /> */}




>>>>>>> 0550a05d3f3121f66a27fdac2a9407497fe8e418
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
