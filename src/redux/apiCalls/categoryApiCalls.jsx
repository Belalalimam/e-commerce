
import { categoryActions } from "../slices/categoriesReducer";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get user category
export function getCategories() { 
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/categories`);
            dispatch(categoryActions.setCategory(data));
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }
}