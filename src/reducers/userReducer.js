import {GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_DETAIL_USER_FAIL, GET_DETAIL_USER_REQUEST, GET_DETAIL_USER_SUCCESS} from "../constants/authConstant";

export const getAllUserReducer = (state = { userList: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userList: action.payload
            };
        case GET_ALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const getDetailUserReducer = (state = { userDetail: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_DETAIL_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_DETAIL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetail: action.payload,
            };
        case GET_DETAIL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}