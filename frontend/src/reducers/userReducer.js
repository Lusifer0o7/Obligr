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
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
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
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  IMP_USER_DETAILS_REQUEST,
  IMP_USER_DETAILS_SUCCESS,
  IMP_USER_DETAILS_FAIL,
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_FAIL,
  SEND_EMAIL_OTP_SUCCESS,
  VERIFY_EMAIL_OTP_REQUEST,
  VERIFY_EMAIL_OTP_SUCCESS,
  VERIFY_EMAIL_OTP_FAIL,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_FAIL,
  SEND_MOBILE_OTP_SUCCESS,
  VERIFY_MOBILE_OTP_REQUEST,
  VERIFY_MOBILE_OTP_SUCCESS,
  VERIFY_MOBILE_OTP_FAIL,
  CLEAR_ERRORS,
  CLEAR_EMAIL_OTP_DATA,
  CLEAR_MOBILE_OTP_DATA,
  LOGOUT_REQUEST,
  USER_COUNT_REQUEST,
  USER_COUNT_SUCCESS,
  USER_COUNT_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT_REQUEST:
      return {
        loading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const verifyEmailOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_OTP_REQUEST:
    case VERIFY_EMAIL_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        emailOtpSent: action.payload,
      };
    case VERIFY_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        emailOtpVerified: action.payload,
      };

    case SEND_EMAIL_OTP_FAIL:
    case VERIFY_EMAIL_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_EMAIL_OTP_DATA:
      return {
        ...state,
        emailOtpSent: null,
        emailOtpVerified: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const verifyMobileOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MOBILE_OTP_REQUEST:
    case VERIFY_MOBILE_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_MOBILE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        mobileOtpSent: action.payload,
      };
    case VERIFY_MOBILE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        mobileOtpVerified: action.payload,
      };

    case SEND_MOBILE_OTP_FAIL:
    case VERIFY_MOBILE_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_MOBILE_OTP_DATA:
      return {
        ...state,
        mobileOtpSent: null,
        mobileOtpVerified: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userCountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        userCount: action.payload,
      };

    case USER_COUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = { otp: {} }, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const ImpUserReducer = (state = { impUser: {} }, action) => {
  switch (action.type) {
    case IMP_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IMP_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        role: action.payload.user.role.name,
        token: action.payload.token,
        user: action.payload.user,
      };

    case IMP_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
