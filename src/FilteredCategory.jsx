import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putLikeForProduct } from "./redux/apiCalls/likeApiCalls";
import { putCartForProduct } from "./redux/apiCalls/cartApiCalls";
import {
  fetchProductsBasedOnCategory,
  fetchProduct,
  getProductsCount,
  fetchProductsBasedOnCategorySize,
} from "./redux/apiCalls/productApiCalls";
import Pagination from "@mui/material/Pagination";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  [`@media (max-width: 387px)`]: {
    width: "130px",
    margin: "0 auto",
    padding: "0px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "150px",
    margin: "0 auto",
    padding: "8px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "220px",
    padding: "12px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: "260px",
    padding: "16px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "290px",
    padding: "20px",
  },
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));
const ProductImage = styled(CardMedia)(({ theme }) => ({
  [`@media (max-width: 387px)`]: {
    height: 190,
  },
  [theme.breakpoints.down("sm")]: {
    height: 190,
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: 250,
  },
  [theme.breakpoints.up("md")]: {
    height: 300,
  },
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    "& .product-actions": {
      transform: "translateY(0)",
    },
  },
}));
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

const FilteredCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity] = useState(1);

  const { productsCate } = useSelector((state) => state.product);
  const { productsCateSize } = useSelector((state) => state.product);
  const { item = { items: [] } } = useSelector((state) => state.cart) || {};
  const cart = item?.items || [];
  const { like } = useSelector((state) => state.like);
  const { user } = useSelector((state) => state.auth);
  const Products = useSelector((state) => state.product.product);
  const { productsCount } = useSelector((state) => state.product);

  useEffect(() => {
    if (category && category !== "All Categories") {
      dispatch(fetchProductsBasedOnCategory(category));
    } else {
      dispatch(fetchProduct(currentPage));
    }
    dispatch(fetchProductsBasedOnCategorySize(category));
    dispatch(getProductsCount());
  }, [dispatch, category, currentPage]);

  const displayProducts =
    category && category !== "All Categories"
      ? productsCateSize?.length > 0
        ? productsCateSize
        : productsCate
      : Products;

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to cart!");
      return;
    }
    dispatch(putCartForProduct(productId, quantity));
    toast.success("Product added to cart!");
  };
  const handleAddToFavorites = (e, productId) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to favorites!");
      return;
    }
    dispatch(putLikeForProduct(productId));
  };
  const handleCardClick = (product) => {
    navigate(`/getProduct/${product._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#fff" }}>
      <Container maxWidth="xxl" className="">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: { xs: 2, sm: 3, md: 5 },
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          {category?.charAt(0).toUpperCase() + category?.slice(1)} Collection
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent={"center"}
          className="p-[0px] m-[0px]"
        >
          {displayProducts?.length > 0 ? (
            displayProducts.map((product) => (
              <Grid key={product._id} xs={6} sm={6} md={2}>
                <StyledCard onClick={() => handleCardClick(product)}>
                  <ProductImage
                    image={product.productImage.url}
                    title={product.productTitle}
                    id={product.productImage.publicId}
                  >
                    <ProductActions className="product-actions">
                      <IconButton
                        onClick={(e) => handleAddToFavorites(e, product._id)}
                        sx={{
                          color:
                            Array.isArray(like) &&
                            like.some((item) => item._id === product._id)
                              ? "red"
                              : "white",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.3)",
                          },
                          zIndex: 2,
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleAddToCart(e, product._id)}
                        sx={{
                          color:
                            Array.isArray(cart) &&
                            cart.some((item) => item._id === product._id)
                              ? "#4CAF50"
                              : "white",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.3)",
                          },
                          zIndex: 2,
                        }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </ProductActions>
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
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              No products available in this category
            </Typography>
          )}
        </Grid>
      </Container>
      {(!category || category === "All Categories") &&
        productsCount > PRODUCTS_PER_PAGE && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
              page={currentPage}
              onChange={(e, value) => {
                setCurrentPage(value);
                window.scrollTo(0, 0);
            }}
              color="primary"
            />
          </Box>
        )}
    </Box>
  );
};

export default FilteredCategory;
