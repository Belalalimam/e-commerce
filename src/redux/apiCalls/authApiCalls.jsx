import { authActions } from "../slices/authSlic";

export function loginUser(user) {
    return async (dispatch) => {
        try{
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            dispatch(authActions.Login(data))
        }catch(error){
            console.log(error)
        }

    }
}