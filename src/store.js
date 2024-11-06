import { createStore, combineReducers, applyMiddleware } from 'redux';
import {productReducer, getAllProductReducer, getDetailProductReducer} from './reducers/productReducer';
import {apparelNameReducer,brandNameReducer,genderNameReducer} from './reducers/categoryReducer';
import loginReducer from './reducers/authReducer'
import {getAllUserReducer, getDetailUserReducer} from './reducers/userReducer';
import {getAllReviewReducer, getReviewDetailReducer} from './reducers/reviewReducer';
import {getAllOrderReducer, getDetailOrderReducer, getOrderItemDetailReducer} from './reducers/orderReducer'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; 



const rootReducer = combineReducers({
    products: productReducer,
    brands: brandNameReducer,
    apparels: apparelNameReducer,
    genders: genderNameReducer,
    user: loginReducer,
    productList: getAllProductReducer,
    product: getDetailProductReducer,
    userList: getAllUserReducer,
    userDetail: getDetailUserReducer,
    orderList: getAllOrderReducer,
    orderDetail: getDetailOrderReducer,
    reviewList: getAllReviewReducer,
    reviewDetail: getReviewDetailReducer,
    orderItemList: getOrderItemDetailReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;