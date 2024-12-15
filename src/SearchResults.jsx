import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, CardMedia, CardContent, IconButton, Breadcrumbs, Link, } from '@mui/material';
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { fetchProduct } from './redux/apiCalls/productApiCalls';
import { putLikeForProduct } from './redux/apiCalls/likeApiCalls';
import { putCartForProduct } from './redux/apiCalls/cartApiCalls';
import Pagination from "@mui/material/Pagination";
import { FaFilter } from "react-icons/fa";
import Grid from "@mui/material/Grid2";
import './FilterationSidebar.css'

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: theme.shadows[10],
    },
}));

const ProductImage = styled(CardMedia)({
    height: 300,
    position: "relative",
    overflow: "hidden",
    "&:hover": {
        "& .product-actions": {
            transform: "translateY(0)",
        },
    },
});

const ProductActions = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
    transform: "translateY(100%)",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
});

const SearchResults = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');
    const selectedCategory = queryParams.get('category');

    const PRODUCTS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const [filters, setFilters] = useState({
        colors: [],
        categories: [],
        sizes: [],
        // priceRange: [0, 1000]
    });

    const { product } = useSelector(state => state.product);
    const { cart } = useSelector(state => state.cart);
    const { like } = useSelector(state => state.like);
    const { user } = useSelector((state) => state.auth);
    const { productsCount } = useSelector((state) => state.product);

    const colors = [
        { id: 1, name: "Black", hex: "#000000" },
        { id: 2, name: "White", hex: "#FFFFFF" },
        { id: 3, name: "Red", hex: "#FF0000" },
        { id: 4, name: "Blue", hex: "#0000FF" },
        { id: 5, name: "Green", hex: "#00FF00" },
    ];
    const categories = ["lace", "fabric", "elastic"];
    const sizes = ["xs", "s", "m", "l", "xl"];
    const handleAddToCart = (e, productId) => {
        e.stopPropagation();
        dispatch(putCartForProduct(productId));
    };

    const handleAddToFavorites = (e, productId) => {
        e.stopPropagation();
        dispatch(putLikeForProduct(productId));
    };

    const handleCardClick = (product) => {
        navigate(`/getProduct/${product._id}`);
    };

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);




    const clearFilters = () => {
        setFilters({
            colors: [],
            categories: [],
            sizes: [],
        });
    };

    const filteredProducts = product.filter(item => {
        const searchTerms = searchQuery.toLowerCase();

        const matchesSearch =
            item.productName.toLowerCase().includes(searchTerms) ||
            item.productCategory.toLowerCase().includes(searchTerms) ||
            item.productColor.toLowerCase().includes(searchTerms);

        const matchesCategory = selectedCategory === 'All Categories' ||
            item.productCategory.toLowerCase() === selectedCategory.toLowerCase();

        const matchesColor = filters.colors.length === 0 ||
            filters.colors.includes(item.productColor?.toLowerCase());

        const matchesSize = filters.sizes.length === 0 ||
            filters.sizes.includes(item.productCategorySize?.toLowerCase());

        //   const matchesPrice = item.productPrice >= filters.priceRange[0] && 
        //     item.productPrice <= filters.priceRange[1];

        return matchesSearch && matchesCategory && matchesColor && matchesSize /* && matchesPrice */;
    });

    return (
        <Box sx={{ py: 8, backgroundColor: "#fff00" }}>
            <Typography
                variant="h3"
                align="center"
                sx={{ mb: 4, fontWeight: 600, color: "#1a1a1a" }}
            >
                Search Results for "{searchQuery}"
            </Typography>
            <Container maxWidth="xxl" className="flex filterContainer1 search-results-container">
            
                <div className="filter-toggle1" onClick={() => setShowMobileFilters(!showMobileFilters)}>
                    <FaFilter />
                    <span>Filters</span>
                </div>

                <div className="main-container1">
                    <aside className={`filter-sidebar1 ${showMobileFilters ? "show" : ""}`}>
                        <div className="filter-group1">
                            <Typography variant="subtitle2" gutterBottom>
                                Colors
                            </Typography>
                            <div className="color-options">
                                {colors.map((color) => (
                                    <div
                                        key={color.id}
                                        className={`color-option ${filters.colors.includes(color.name.toLowerCase()) ? "selected" : ""}`}
                                        onClick={() => handleFilterChange("colors", color.name.toLowerCase())}
                                    >
                                        <span
                                            className="color-circle"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <span>{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group1">
                            <Typography variant="subtitle2" gutterBottom>
                                Categories
                            </Typography>
                            <div className="category-options">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={filters.categories.includes(category) ? "contained" : "outlined"}
                                        onClick={() => handleFilterChange("categories", category)}
                                        sx={{ m: 0.5 }}
                                        fullWidth
                                        size="small"
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group1">
                            <Typography variant="subtitle2" gutterBottom>
                                Sizes
                            </Typography>
                            <div className="size-options">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${filters.sizes.includes(size) ? "selected" : ""}`}
                                        onClick={() => handleFilterChange("sizes", size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            variant="outlined"
                            onClick={clearFilters}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Clear All Filters
                        </Button>
                    </aside>
                </div>


                <Grid container spacing={2} className="products-area1">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Grid key={product._id} xs={12} sm={6} md={3}>
                                <StyledCard onClick={() => setSelectedProduct(product)}>
                                    <ProductImage
                                        image={product.productImage.url}
                                        title={product.productTitle}
                                        id='bell'
                                    >


                                        {/* <ProductActions className="product-actions">

                          <IconButton
                            onClick={(e) => handleAddToFavorites(e, product._id)}
                            sx={{
                              color: Array.isArray(like) && like.some(item => item._id === product._id) ? "red" : "white",
                              backgroundColor: "rgba(255,255,255,0.2)",
                              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                              zIndex: 2 // Ensure button stays above other elements
                            }}
                          >
                            <FavoriteIcon />
                          </IconButton>



                          <IconButton
                            onClick={(e) => handleAddToCart(e, product._id)}
                            sx={{
                              color: Array.isArray(cart) && cart.some(item => item._id === product._id) ? "#4CAF50" : "white",
                              backgroundColor: "rgba(255,255,255,0.2)",
                              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                              zIndex: 2
                            }}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </ProductActions> */}

                                    </ProductImage>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6">
                                            {product.productName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            {product.productCategory}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <LocalShippingIcon
                                                    sx={{ fontSize: 16, color: "success.main", mr: 0.5 }}
                                                />
                                                <Typography variant="caption" color="success.main">
                                                    Free Shipping
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                            No products found matching your search
                        </Typography>
                    )}
                </Grid>


            </Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default SearchResults;
