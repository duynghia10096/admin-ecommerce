import {GET_ALL_REVIEW_FAIL, GET_ALL_REVIEW_REQUEST, GET_ALL_REVIEW_SUCCESS, GET_REVIEW_DETAIL_FAIL, GET_REVIEW_DETAIL_REQUEST, GET_REVIEW_DETAIL_SUCCESS} from "../constants/reviewConstant";

export const getAllReviewReducer = (state = { reviewList: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviewList: action.payload
            };
        case GET_ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const getReviewDetailReducer = (state = { review: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_REVIEW_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_REVIEW_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                review: action.payload,
            };
        case GET_REVIEW_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}