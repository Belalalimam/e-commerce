import Navbar from './Components/1-Navbar/Navbar'
// import Swiper from './Components/2-HomePage/SwiperC'
// eslint-disable-next-line no-unused-vars
import HeaderNav from './Components/1-Navbar/HeaderNav'
import './App.css'
// eslint-disable-next-line no-unused-vars
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';




function App() {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
        main1: '#000000',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
      <Navbar />
      {/* <Swiper /> */}
    </ThemeProvider>
    </>
  )
}

export default App
