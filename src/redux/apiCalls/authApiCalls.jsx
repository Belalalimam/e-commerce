import axios from "axios";
import { authActions } from "../slices/authSlic";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function loginUser(user) {
    return async (dispatch) => {
        try{
            const {data} = await request.post('/api/auth/login', user); 
            dispatch(authActions.Login(data))
            localStorage.setItem('userInfo', JSON.stringify(data));
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}

export function logoutUser(user) {
    return async (dispatch) => {
        dispatch(authActions.Logout())
        localStorage.removeItem('userInfo');
    }
}