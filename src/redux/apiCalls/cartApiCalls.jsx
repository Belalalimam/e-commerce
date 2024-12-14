import { cartActions } from "../slices/cartReducer";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get user cart items
export function getUserProfileCart(userId) { 
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/users/Profile/${userId}`);
            dispatch(cartActions.setCart(data.cart));
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }
}

// Add/Remove cart item
export function putCartForProduct(productId) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const {data} = await request.put(`/Products/cart/${productId}`, {}, {
                headers: {
                    authorization: 'Bearer ' + state.auth.user.token
                }
            });
            dispatch(cartActions.setCart(data));
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }
}
