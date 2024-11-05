import {GET_ALL_REVIEW_REQUEST, GET_ALL_REVIEW_SUCCESS, GET_ALL_REVIEW_FAIL, GET_REVIEW_DETAIL_REQUEST, GET_REVIEW_DETAIL_SUCCESS, GET_REVIEW_DETAIL_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL} from "../constants/reviewConstant";
import axios from "axios";

export const getAllReviews = (page, pagesize) => async (dispatch) => {
    dispatch({ type: GET_ALL_REVIEW_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/api/reviews/getAllReviews", {
            params : {
                page: page,
                pageSize: pagesize
            }
        });
        
        dispatch({
            type: GET_ALL_REVIEW_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_REVIEW_FAIL,
            payload: error.message,
        });
    }
}

export const getReviewDetails = (reviewId) => async (dispatch) => {
    dispatch({ type: GET_REVIEW_DETAIL_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/api/reviews/" + reviewId);

        dispatch({
            type: GET_REVIEW_DETAIL_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: GET_REVIEW_DETAIL_FAIL,
            payload: error.message
        });
    }
}

export const deleteReviewById = (reviewId) => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    
    try {
        const response = await axios.delete("http://localhost:5000/api/reviews/delete/" + reviewId);
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.message
        })
    }
}