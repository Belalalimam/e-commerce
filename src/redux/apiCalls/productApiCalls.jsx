import { productActions } from "../slices/productSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch Posts Based On Page Number
export function fetchProduct(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/products?pageNumber=${pageNumber}`);
      dispatch(productActions.setProducts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Posts Based On Page Number
export function fetchProductDashboard() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/products`);
      dispatch(productActions.setProductDashboard(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Posts Count
export function getProductsCount() {
  return async (dispatch) => { 
    try {
      const { data } = await request.get(`/products/count`);
      dispatch(productActions.setProductCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Posts Based On Category
export function fetchProductsBasedOnCategory(productCategory) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/Products?productCategory=${productCategory}`);
      dispatch(productActions.setProductCate(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Posts Based On CategorySize
export function fetchProductsBasedOnCategorySize(productCategorySize) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/Products?productCategorySize=${productCategorySize}`);
      dispatch(productActions.setProductCateSize(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Product
export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch(productActions.setLoading())
    await request.post('/products/newProduct', formData,{
      headers: {
        authorization: 'Bearer ' + getState().auth.user.token,
        'Content-Type': 'multipart/form-data'
      }
    });
    toast.success("Product created successfully!");
    dispatch(productActions.setIsProductCreated());
    setTimeout(() => dispatch(productActions.clearIsProductCreated()), 2000);
  } catch (error) {
    dispatch(productActions.clearLoading());
    toast.error(`Failed to create product ${error.response.data.message}`);
  }
};


// Fetch Single Product
export function fetchSingleProduct(productId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/Products/getProduct/${productId}`);
      dispatch(productActions.setSingleProduct(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// // Toggle Like Post
// export function toggleLikePost(postId) {
//   return async (dispatch,getState) => {
//     try {
//       const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
//         headers: {
//           Authorization: "Bearer " + getState().auth.user.token,
//         }
//       });
//       dispatch(productActions.setLike(data));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }

// Update Post Image
export function updateProductImage(newImage,productId) {
  return async (dispatch,getState) => {
    try {
      await request.put(`/products/upload-image/${productId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type":"multipart/form-data",
        }
      });
      toast.success("New post image uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Product
export function EditProduct(newProduct,productId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/products/updateProduct/${productId}`, newProduct, {
        headers: {
          authorization: 'Bearer ' + getState().auth.user.token,
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(productActions.setSingleProduct(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Product
export function deleteProduct(productId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/products/deleteProduct/${productId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(productActions.deleteProduct(data.productId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function putCartForProduct(productId) {
  return async (dispatch, getState) => {
      try{
          const state = getState();
          const {data} = await request.put(`/Products/cart/${productId}`,{}, {
              headers: {
                  authorization: 'Bearer ' + state.auth.user.token
              }
          }); 
          dispatch(productActions.setCart(data))
      }catch(error){
          toast.error(error.response.data.message);
      }

  }
}

// // Get All Posts
// export function getAllPosts() {
//   return async (dispatch) => {
//     try {
//       const { data } = await request.get(`/api/posts`);
//       dispatch(productActions.setPosts(data));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }