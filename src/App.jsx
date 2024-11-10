import Navbar from "./Components/1-Navbar/Navbar";
import Swiper from './Components/2-HomePage/SwiperC'
import SliderCategory  from './Components/3-Category/SliderCategory'
import CardCategory from './Components/3-Category/CardCategory'
import Filtertion from './Components/4-Filtertion/Filtertion'
import Card1 from "./Components/5-Card/Card1";
import CTA from "./Components/6-CTA/CTA";
import Stores from "./Components/7-Stores/Stores";


// eslint-disable-next-line no-unused-vars
import HeaderNav from "./Components/1-Navbar/HeaderNav";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <CardCategory />
          {/* <Card1 /> */}
          <Filtertion />
                    
          <CTA />
          {/* <Stores /> */}




        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
