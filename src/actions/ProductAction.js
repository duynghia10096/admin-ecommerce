import {ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE,
    GET_ALL_PRODUCT_FAIL,GET_ALL_PRODUCT_REQUEST,GET_ALL_PRODUCT_SUCCESS,
    GET_DETAIL_PRODUCT_REQUEST,
    GET_DETAIL_PRODUCT_FAIL,
    GET_DETAIL_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS
} from "../constants/productConstant";

// src/redux/actions/productActions.js
import axios from 'axios';
import Cookies from 'js-cookie';
import {AUTH_DETAILS_COOKIE} from '../constants/authConstant';


export const addProduct = (product) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const userCookie = Cookies.get(AUTH_DETAILS_COOKIE);
 
    // Parse the cookie data to JSON (assuming it's stored as JSON string)
    const user = userCookie ? JSON.parse(userCookie) : null;
    try {
        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("apparelName", product.apparelName);
        formData.append("genderName", product.genderName);
        formData.append("brandName", product.brandName);
        formData.append("color", product.color);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("description", product.description);
        formData.append("userName", user.username);
        product.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
  

        const response = await axios.post("http://localhost:5000/commondata/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },  
        });

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: error.message,
        });
    }
};

export const getAllProduct = (page, pagesize) => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/commondata/getAllProducts", {
            params : {
                page: page,
                pageSize: pagesize
            }
        });
        
        dispatch({
            type: GET_ALL_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCT_FAIL,
            payload: error.message,
        });
    }
}

export const getProductDetail = (productId) => async (dispatch) => {
    dispatch({ type: GET_DETAIL_PRODUCT_REQUEST });
    try {
        const response = await axios.get("http://localhost:5000/commondata/detail/" + productId);

        dispatch({
            type: GET_DETAIL_PRODUCT_SUCCESS,
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: GET_DETAIL_PRODUCT_FAIL,
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