import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
// import {
//   newProductReducer,
//   newReviewReducer,
//   productDetailsReducer,
//   productReducer,
//   productReviewsReducer,
//   productsReducer,
//   reviewReducer
// } from "./reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  ImpUserReducer,
  verifyEmailOtpReducer,
  verifyMobileOtpReducer,
  userCountReducer,
} from "./reducers/userReducer";

import {
  allRoleReducer,
  permissionReducer,
  createRoleReducer,
  RoleReducer,
} from "./reducers/roleReducer";

import {
  allWebsiteReducer,
  createWebsiteReducer,
} from "./reducers/websiteReducer";

import {
  allHomeMenuReducer,
  createHomeMenuReducer,
  HomeMenuReducer,
  allHomeSliderReducer,
  createHomeSliderReducer,
  HomeSliderReducer,
  getHomeFooterReducer,
  HomeFooterReducer,
} from "./reducers/settingsReducer";

// import { cartReducer } from "./reducers/cartReducer";
// import {
//   allOrdersReducer,
//   myOrdersReducer,
//   newOrderReducer,
//   orderDetailsReducer,
//   orderReducer,
// } from "./reducers/orderReducer";

const reducer = combineReducers({
  //   products: productsReducer,
  //   productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  //   cart: cartReducer,
  //   newOrder: newOrderReducer,
  //   myOrders: myOrdersReducer,
  //   orderDetails: orderDetailsReducer,
  //   newReview: newReviewReducer,
  //   newProduct: newProductReducer,
  //   product: productReducer,
  //   allOrders: allOrdersReducer,
  //   order: orderReducer,
  userCount: userCountReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  impUser: ImpUserReducer,
  verifyEmailOtp: verifyEmailOtpReducer,
  verifyMobileOtp: verifyMobileOtpReducer,
  allRoles: allRoleReducer,
  newRole: createRoleReducer,
  Role: RoleReducer,
  permission: permissionReducer,
  newWebsite: createWebsiteReducer,
  allWebsites: allWebsiteReducer,
  allHomeMenus: allHomeMenuReducer,
  newHomeMenu: createHomeMenuReducer,
  HomeMenu: HomeMenuReducer,
  allHomeSliders: allHomeSliderReducer,
  newHomeSlider: createHomeSliderReducer,
  HomeSlider: HomeSliderReducer,
  getHomeFooter: getHomeFooterReducer,
  HomeFooter: HomeFooterReducer,

  //   productReviews: productReviewsReducer,
  //   review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = configureStore(
  { reducer: reducer },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
