import {GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAIL, GET_DETAIL_USER_REQUEST, GET_DETAIL_USER_SUCCESS, GET_DETAIL_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from "../constants/authConstant"
import axios from "axios";
export const getAllUsers = (page, pagesize) => async (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/api/auth/allUsers", {
            params : {
                page: page,
                pageSize: pagesize
            }
        });
        
        dispatch({
            type: GET_ALL_USER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_USER_FAIL,
            payload: error.message,
        });
    }
}

export const getUserDetail = (userId) => async (dispatch) => {
    dispatch({ type: GET_DETAIL_USER_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/api/auth/detail/" + userId);

        dispatch({
            type: GET_DETAIL_USER_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: GET_DETAIL_USER_FAIL,
            payload: error.message
        });
    }
}

export const deleteUserById = (userId) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    
    try {
        const response = await axios.delete("http://localhost:5000/api/auth/delete/" + userId);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.message
        })
    }
}