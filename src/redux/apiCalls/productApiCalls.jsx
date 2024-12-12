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
export function fetchProductsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/products?category=${category}`);
      dispatch(productActions.setPostsCate(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Product
export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_PRODUCT_REQUEST" });
    const response = await request.post('/products/newProduct', formData,{
      headers: {
        authorization: 'Bearer ' + getState().auth.user.token,
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "CREATE_PRODUCT_FAIL", payload: error.message });
    throw error;
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

// // Update Post Image
// export function updatePostImage(newImage,postId) {
//   return async (dispatch,getState) => {
//     try {
//       await request.put(`/api/posts/update-image/${postId}`, newImage, {
//         headers: {
//           Authorization: "Bearer " + getState().auth.user.token,
//           "Content-Type":"multipart/form-data",
//         }
//       });
//       toast.success("New post image uploaded successfully");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }

// // Update Post
// export function updatePost(newPost,postId) {
//   return async (dispatch,getState) => {
//     try {
//       const { data } = await request.put(`/api/posts/${postId}`, newPost, {
//         headers: {
//           Authorization: "Bearer " + getState().auth.user.token,
//         }
//       });
//       dispatch(productActions.setPost(data));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }

// // Delete Post
// export function deletePost(postId) {
//   return async (dispatch,getState) => {
//     try {
//       const { data } = await request.delete(`/api/posts/${postId}`, {
//         headers: {
//           Authorization: "Bearer " + getState().auth.user.token,
//         }
//       });
//       dispatch(productActions.deletePost(data.postId));
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }

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