import { profileActions } from "../slices/profileSlic";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function getUserProfile(userId) {
    return async (dispatch) => {
        try{
            const {data} = await request.get(`/api/users/Profile/${userId}`); 
            dispatch(profileActions.setProfile(data))
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}