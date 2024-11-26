// import React, { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   Breadcrumbs,
//   Link,
//   FormControl,
//   Select,
//   MenuItem,
//   Pagination,
//   Chip,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Slider,
//   Checkbox,
//   FormGroup,
//   FormControlLabel,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import StraightenIcon from '@mui/icons-material/Straighten';

// const StyledCard = styled(Card)(({ theme }) => ({
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: theme.shadows[8],
//   },
// }));

// const ProductImage = styled(CardMedia)({
//   height: 280,
//   backgroundSize: 'cover',
//   '&:hover': {
//     cursor: 'zoom-in',
//   },
// });

// const stretchLaceProducts = [
//   {
//     id: 1,
//     name: "Floral Stretch Lace",
//     code: "SL-001",
//     price: 12.99,
//     width: "60 inches",
//     colors: ["White", "Ivory", "Black"],
//     image: "/images/floral-stretch-lace.jpg",
//     inStock: true,
//     minOrder: "2 yards"
//   },
//   // Add more products...
// ];

// const StretchLaceProducts = () => {
//   const [sortBy, setSortBy] = useState('featured');
//   const [priceRange, setPriceRange] = useState([0, 50]);
//   const [filterDrawer, setFilterDrawer] = useState(false);

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       {/* Breadcrumb Navigation */}
//       <Breadcrumbs sx={{ mb: 3 }}>
//         <Link href="/" color="inherit">Home</Link>
//         <Link href="/lace" color="inherit">Lace</Link>
//         <Typography color="text.primary">Stretch Lace</Typography>
//       </Breadcrumbs>

//       {/* Page Header */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Stretch Lace Collection
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Premium quality stretch lace fabrics perfect for wedding dresses, lingerie, and formal wear
//         </Typography>
//       </Box>

//       {/* Filter and Sort Controls */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12} md={6}>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Chip 
//               icon={<FilterListIcon />} 
//               label="Filters"
//               onClick={() => setFilterDrawer(true)}
//               variant="outlined"
//             />
//             <Chip 
//               icon={<StraightenIcon />} 
//               label="Width: All"
//               variant="outlined"
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//           <FormControl size="small" sx={{ minWidth: 200 }}>
//             <Select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <MenuItem value="featured">Featured</MenuItem>
//               <MenuItem value="price-low">Price: Low to High</MenuItem>
//               <MenuItem value="price-high">Price: High to Low</MenuItem>
//               <MenuItem value="newest">Newest Arrivals</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Product Grid */}
//       <Grid container spacing={3}>
//         {stretchLaceProducts.map((product) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//             <StyledCard>
//               <ProductImage
//                 image={product.image}
//                 title={product.name}
//               />
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Code: {product.code}
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="h6" color="primary">
//                     ${product.price}
//                     <Typography component="span" variant="caption" color="text.secondary">
//                       /yard
//                     </Typography>
//                   </Typography>
//                   <Chip 
//                     label={product.inStock ? 'In Stock' : 'Out of Stock'}
//                     color={product.inStock ? 'success' : 'error'}
//                     size="small"
//                   />
//                 </Box>
//                 <Typography variant="body2">
//                   Width: {product.width}
//                 </Typography>
//                 <Box sx={{ mt: 1 }}>
//                   {product.colors.map((color) => (
//                     <Chip
//                       key={color}
//                       label={color}
//                       size="small"
//                       sx={{ mr: 0.5, mb: 0.5 }}
//                     />
//                   ))}
//                 </Box>
//               </CardContent>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Pagination */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <Pagination count={10} color="primary" />
//       </Box>

//       {/* Filter Drawer */}
//       <Drawer
//         anchor="left"
//         open={filterDrawer}
//         onClose={() => setFilterDrawer(false)}
//       >
//         <Box sx={{ width: 280, p: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Filters
//           </Typography>
          
//           <Typography gutterBottom>Price Range</Typography>
//           <Slider
//             value={priceRange}
//             onChange={(e, newValue) => setPriceRange(newValue)}
//             valueLabelDisplay="auto"
//             min={0}
//             max={50}
//           />
          
//           <Typography gutterBottom sx={{ mt: 3 }}>Width</Typography>
//           <FormGroup>
//             <FormControlLabel control={<Checkbox />} label="60 inches" />
//             <FormControlLabel control={<Checkbox />} label="58 inches" />
//             <FormControlLabel control={<Checkbox />} label="45 inches" />
//           </FormGroup>

//           <Typography gutterBottom sx={{ mt: 3 }}>Color</Typography>
//           <FormGroup>
//             <FormControlLabel control={<Checkbox />} label="White" />
//             <FormControlLabel control={<Checkbox />} label="Ivory" />
//             <FormControlLabel control={<Checkbox />} label="Black" />
//           </FormGroup>
//         </Box>
//       </Drawer>
//     </Container>
//   );
// };

// export default StretchLaceProducts;


import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:4000/api/users');
      setData(response.data.data.users);
      console.log(response.data.data.users);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

