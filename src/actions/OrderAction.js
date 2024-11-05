import axios from "axios";
import {GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_ALL_ORDER_FAIL, GET_ORDER_DETAIL_REQUEST, GET_ORDER_DETAIL_SUCCESS, GET_ORDER_DETAIL_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL} from "../constants/orderConstant"


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
        const response = await axios.get("http://localhost:5000/api/order/" + orderId);

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

export const deleteOrderId = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    
    try {
        const response = await axios.delete("http://localhost:5000/api/order/deleteOrder/" + orderId);
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.message
        })
    }
}