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

export const logoutUser = () => async (dispatch) => {
    try {
      localStorage.removeItem("userInfo");
      dispatch({ type: "LOGOUT" });
      window.location.href = '/';  // This will ensure direct navigation to homepage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

export function registerUser(user) {
    return async (dispatch) => {
        try{
            const {data} = await request.post('/api/auth/register', user); 
            dispatch(authActions.register(data.message))
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}

export function verifyEmail(userId,token) {
    return async (dispatch) => {
      try {
        await request.get(`/api/auth/${userId}/verify/${token}`);
        dispatch(authActions.setIsEmailVerified());
      } catch (error) {
        console.log(error);
      }
    }
  }