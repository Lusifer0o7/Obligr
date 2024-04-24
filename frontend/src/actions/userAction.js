import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  IMP_USER_DETAILS_REQUEST,
  IMP_USER_DETAILS_SUCCESS,
  IMP_USER_DETAILS_FAIL,
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_FAIL,
  CLEAR_ERRORS,
  VERIFY_EMAIL_OTP_REQUEST,
  VERIFY_EMAIL_OTP_SUCCESS,
  VERIFY_EMAIL_OTP_FAIL,
  VERIFY_MOBILE_OTP_REQUEST,
  VERIFY_MOBILE_OTP_SUCCESS,
  VERIFY_MOBILE_OTP_FAIL,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  SEND_MOBILE_OTP_FAIL,
  CLEAR_EMAIL_OTP_DATA,
  CLEAR_MOBILE_OTP_DATA,
  LOGOUT_REQUEST,
} from "../constants/userConstants";
import { BASE_URL } from "../constants/urlConstants";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/register`,
      userData,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS });
    dispatch({ type: CLEAR_EMAIL_OTP_DATA });
    dispatch({ type: CLEAR_MOBILE_OTP_DATA });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const registeruseradmin = (userData) => async (dispatch) => {
  try {
    //dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/registeruseradmin`,
      userData
    );

    //dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    // dispatch({
    //   type: REGISTER_USER_FAIL,
    //   payload: error.response.data.message,
    // });
  }
};

export const sendEmailOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_OTP_REQUEST });
    const { data } = await axios.post(`${BASE_URL}/api/v1/send/emailotp`, {
      email,
    });
    dispatch({ type: SEND_EMAIL_OTP_SUCCESS, payload: data.data.success });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_OTP_FAIL, payload: "Unable to send OTP" });
  }
};

export const verifyEmailOtp = (emailOtp) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_EMAIL_OTP_REQUEST });
    const { data } = await axios.post(`${BASE_URL}/api/v1/verify/emailotp`, {
      emailOtp,
    });
    dispatch({ type: VERIFY_EMAIL_OTP_SUCCESS, payload: data.data.success });
  } catch (error) {
    dispatch({ type: VERIFY_EMAIL_OTP_FAIL, payload: "Invalid OTP !" });
  }
};

export const sendMobileOtp = (phone) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MOBILE_OTP_REQUEST });
    const { data } = await axios.post(`${BASE_URL}/api/v1/send/mobileotp`, {
      phone,
    });
    dispatch({ type: SEND_MOBILE_OTP_SUCCESS, payload: data.data.success });
  } catch (error) {
    dispatch({ type: SEND_MOBILE_OTP_FAIL, payload: "Unable to send OTP" });
  }
};

export const verifyMobileOtp = (mobileOtp) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_MOBILE_OTP_REQUEST });
    const { data } = await axios.post(`${BASE_URL}/api/v1/verify/mobileotp`, {
      mobileOtp,
    });
    dispatch({ type: VERIFY_MOBILE_OTP_SUCCESS, payload: data.data.success });
  } catch (error) {
    dispatch({ type: VERIFY_MOBILE_OTP_FAIL, payload: "Invalid OTP !" });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(`${BASE_URL}/api/v1/me`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const loadImpersonatedUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: IMP_USER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/admin/impersonate/${id}`
    );

    dispatch({
      type: IMP_USER_DETAILS_SUCCESS,
      payload: data.impUser,
    });
  } catch (error) {
    dispatch({
      type: IMP_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    await axios.get(`${BASE_URL}/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/me/update`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/password/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
