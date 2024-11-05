import { GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_ALL_ORDER_FAIL, GET_ORDER_DETAIL_REQUEST, GET_ORDER_DETAIL_SUCCESS, GET_ORDER_DETAIL_FAIL } from "../constants/orderConstant";

export const getAllOrderReducer = (state = { orderList: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ALL_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: action.payload
            };
        case GET_ALL_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const getDetailOrderReducer = (state = { order: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case GET_ORDER_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}