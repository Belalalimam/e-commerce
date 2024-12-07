import { likeActions } from "../slices/likeReducer";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function getUserProfileLike(userId) {
    return async (dispatch) => {
        try{
            const {data} = await request.get(`/api/users/Profile/${userId}`); 
            dispatch(likeActions.setlike(data.likes))
            // console.log("🚀 ~ return ~ data:", data.likes)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}

export function putLikeForProduct(productId) {
    return async (dispatch, getState) => {
        try{
            const state = getState();
            console.log("🚀 ~ return ~ state:", state.auth.user.token)
            const {data} = await request.put(`/Products/like/${productId}`,{}, {
                headers: {
                    authorization: 'Bearer ' + state.auth.user.token
                }
            }); 
            dispatch(likeActions.setlike(data))
            console.log("🚀 ~ return ~ data:", data)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}