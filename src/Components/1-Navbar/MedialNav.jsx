import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

function ResponsiveAppBar() {

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  // Search Style
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "50ch",
        "&:focus": {
          width: "55ch",
        },
      },
    },  
  }));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{display:"flex",  justifyContent:"space-between"}}>

          {/* logo */}
          <Box display={'flex'}>
            <AdbIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>

          {/* Your location */}
          <Box sx={{display: { xs: 'none', md: 'flex' }, minWidth: 170 }}>
            <FormControl fullWidth sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                <i class="fa-solid fa-location-dot"></i> Your location
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="iii Your location"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Input Search */}
          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box sx={{display: { xs: 'none', md: 'flex' } }}>

            {/* Contact */}
            <div style={{display:"flex", alignItems:"center", padding:"10px", borderRight:"2px solid black"}}>
              <div>
              <i class="fa-solid fa-phone"  style={{fontSize:"20px", marginRight:"8px"}}></i>

              </div>
              <div>
                <div>27/4 delavity</div>
                <div>01026420637</div>
              </div>
            </div>

            {/* Favirote */}
            <div style={{borderRight:"2px solid black", padding:"10px"}}><i class="fa-regular fa-heart" style={{fontSize:"30px"}}></i></div>

            {/* Cart */}
            <div style={{borderRight:"2px solid black", padding:"10px"}}><i class="fa-solid fa-cart-shopping" style={{fontSize:"30px"}}></i></div>

            {/* Portfilo */}
            <div style={{display:"flex", alignItems:"center", padding:"10px"}}>
              <div>
              <i class="fa-solid fa-user"  style={{fontSize:"20px", marginRight:"8px"}}></i>

              </div>
              <div>
                <div>Hello</div>
                <div>my Portfilo</div>
              </div>
            </div>
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
