import {GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_ALL_ORDER_FAIL, GET_ORDER_DETAIL_REQUEST, GET_ORDER_DETAIL_SUCCESS, GET_ORDER_DETAIL_FAIL} from "../constants/orderConstant"
import { GET_ALL_PRODUCT_FAIL } from "../constants/productConstant";

export const getAllOrder = (page, pagesize) => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDER_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/api/order/allOrders", {
            params : {
                page: page,
                pageSize: pagesize
            }
        });
        
        dispatch({
            type: GET_ALL_ORDER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_ORDER_FAIL,
            payload: error.message,
        });
    }
}

export const getOrderDetail = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_DETAIL_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/commondata/detail/" + orderId);

        dispatch({
            type: GET_ORDER_DETAIL_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: GET_ORDER_DETAIL_FAIL,
            payload: error.message
        });
    }
}

export const deleteProductById = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    
    try {
        const response = await axios.delete("http://localhost:5000/commondata/deleteProduct/" + productId);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.message
        })
    }
}