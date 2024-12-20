import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  fetchProductDashboard,
  EditProduct,
  updateProductImage,
  deleteProduct,
} from "./redux/apiCalls/productApiCalls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const Dashboard = () => {
  // Genral States
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

  // Add Product functions
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productCategorySize: "",
    productColor: "",
    productImage: null,
  });
  const { loading, isProductCreated } = useSelector((state) => state.product);
  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    dispatch(createProduct(formData));
    setProductData({
      productName: "",
      productDescription: "",
      productCategory: "",
      productImage: null,
      productCategorySize: "",
      productColor: "",
    });

    handleClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        productImage: file,
      });
    }
  };

  // Edit Product functions
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productCategorySize: "",
    productColor: "",
    productImage: null,
  });
  const handleEditOpen = (product) => {
    setEditProductData({
      id: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productCategory: product.productCategory,
      productCategorySize: product.productCategorySize,
      productColor: product.productColor,
    });
    setEditModalOpen(true);
  };
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(editProductData).forEach((key) => {
      if (key !== "id") {
        // Keep the ID separate from formData
        formData.append(key, editProductData[key]);
      }
    });

    // Pass id and formData separately to EditProduct action
    dispatch(EditProduct(formData, editProductData.id));
    handleEditClose();
  };

  // Edit Image Product functions
  const [editImageModalOpen, setEditImageModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const handleImageEditOpen = (product) => {
    setEditProductData({
      id: product._id,
      productImage: product.productImage,
    });
    setEditImageModalOpen(true);
  };
  const handleEditImageClose = () => {
    setEditImageModalOpen(false);
  };
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("productImage", file);
    dispatch(updateProductImage(formData, editProductData.id));
    handleEditImageClose();
  };

  // Fetch All Product functions
  const Products = useSelector((state) => state.product.productsDashboard);
  useEffect(() => {
    dispatch(fetchProductDashboard());
  }, []);
  useEffect(() => {
    if (isProductCreated) {
      handleClose();
      // navigate("/");
    }
  }, [isProductCreated]);

  // Delete Product functions
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState({
    id: null,
    name: "",
  });
  const handleDeleteOpen = (product) => {
    setDeleteProductData({
      id: product._id,
      name: product.productName,
    });
    setDeleteModalOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteConfirm = () => {
    dispatch(deleteProduct(deleteProductData.id));
    handleDeleteClose();
  };

  // Modules
  const ProductTable = ({ products }) => {
    return (
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>CategorySize</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={product.productImage.url}
                    alt={product.productName}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productDescription}</TableCell>
                <TableCell>{product.productCategory}</TableCell>
                <TableCell>{product.productCategorySize}</TableCell>
                <TableCell>{product.productColor}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1, my: 1 }}
                    onClick={() => handleEditOpen(product)}
                  >
                    EditContent
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1, my: 1 }}
                    onClick={() => handleImageEditOpen(product)}
                  >
                    EditImage
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ mr: 1, my: 1 }}
                    onClick={() => handleDeleteOpen(product)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const AddProduct = (
    <>
      <div className="fixed bottom-10 left-5">
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
          Add New Product
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={modalStyle}>
          <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant='h3' align="center" sx={{ mb: { xs: 2, sm: 3, md: 5 }, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, color: "#1a1a1a" }}>
          Create New Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="productName"
                    label="Product Name"
                    value={productData.productName}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    multiline
                    name="productDescription"
                    label="Description"
                    value={productData.productDescription}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="productCategory"
                      value={productData.productCategory}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Lace">Lace</MenuItem>
                      <MenuItem value="Elastic">Elastic</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>CategorySize</InputLabel>
                    <Select
                      name="productCategorySize"
                      value={productData.productCategorySize}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="1>>>5">{"1>>>5"}</MenuItem>
                      <MenuItem value="5>>>10">{"5>>>10"}</MenuItem>
                      <MenuItem value="10>>>20">{"10>>>20"}</MenuItem>
                      <MenuItem value="NoLimits">NoLimits</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select
                      name="productColor"
                      value={productData.productColor}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="black">Black</MenuItem>
                      <MenuItem value="white">White</MenuItem>
                      <MenuItem value="red">Red</MenuItem>
                      <MenuItem value="blue">Blue</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {productData.productImage && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected file: {productData.productImage.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );

  const EditProductImgModal = (
    <Modal
      open={editImageModalOpen}
      onClose={handleEditImageClose}
      aria-labelledby="edit-modal-title"
    >
      <Box sx={modalStyle}>
        <Paper elevation={3} sx={{ p: 4 }}>
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
            Edit Product
          </Typography>

          <Box component="form" onSubmit={updateImageSubmitHandler} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Change Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    // onChange={handleImageChange}
                  />
                </Button>
                {file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {file.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Update Product
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );

  const EditProductModal = (
    <Modal
      open={editModalOpen}
      onClose={handleEditClose}
      aria-labelledby="edit-modal-title"
    >
      <Box sx={modalStyle}>
        <Paper elevation={3} sx={{ p: 4 }}>
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
            Edit Product
          </Typography>

          <Box component="form" onSubmit={handleEditSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="productName"
                  label="Product Name"
                  value={editProductData.productName}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      productName: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  name="productDescription"
                  label="Description"
                  value={editProductData.productDescription}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      productDescription: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="productCategory"
                    value={editProductData.productCategory}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        productCategory: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Lace">Lace</MenuItem>
                    <MenuItem value="Elastic">Elastic</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>CategorySize</InputLabel>
                  <Select
                    name="productCategorySize"
                    value={productData.productCategorySize}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="1>>>5">{"1>>>5"}</MenuItem>
                    <MenuItem value="5>>>10">{"5>>>10"}</MenuItem>
                    <MenuItem value="10>>>20">{"10>>>20"}</MenuItem>
                    <MenuItem value="NoLimits">No Limits</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>productColor</InputLabel>
                  <Select
                    name="productColor"
                    value={editProductData.productColor}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        productColor: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Update Product
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );

  const DeleteProductModal = (
    <Modal
      open={deleteModalOpen}
      onClose={handleDeleteClose}
      aria-labelledby="delete-modal-title"
    >
      <Box sx={modalStyle}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Delete Product
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to delete " {deleteProductData.name} " ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );

  return (
    <>
      <ProductTable products={Products} />
      {EditProductModal}
      {EditProductImgModal}
      {DeleteProductModal}
      {AddProduct}
    </>
  );
};
export default Dashboard;
