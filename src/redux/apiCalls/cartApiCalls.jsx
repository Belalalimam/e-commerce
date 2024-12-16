import { cartActions } from "../slices/cartReducer";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get user cart items
export function getUserProfileCart() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/cart`, {
                headers: {
                    authorization: 'Bearer ' + getState().auth.user.token
                }
            });
            dispatch(cartActions.setCartItem(data));
        } catch (error) {
            toast.error(`from cart ${error.response.data.message}`);
        }
    }
}

// Add cart item
export function putCartForProduct(productId, quantity) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { data } = await request.post(`/api/cart/${productId}`, {quantity}, {
                headers: {
                    authorization: 'Bearer ' + state.auth.user.token
                }
            });
            dispatch(cartActions.setCartItem(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


// Remove cart item
export function deleteCartForProduct(productId) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { data } = await request.delete(`/api/cart/${productId}`, {
                headers: {
                    authorization: 'Bearer ' + state.auth.user.token
                }
            });
            dispatch(cartActions.setCartItem(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

