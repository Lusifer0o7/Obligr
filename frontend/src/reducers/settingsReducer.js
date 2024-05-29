import {
  ALL_HOME_MENU_FAIL,
  ALL_HOME_MENU_REQUEST,
  ALL_HOME_MENU_SUCCESS,
  CREATE_HOME_MENU_REQUEST,
  DELETE_HOME_MENU_FAIL,
  UPDATE_HOME_MENU_REQUEST,
  CLEAR_ERRORS,
  CREATE_HOME_MENU_SUCCESS,
  CREATE_HOME_MENU_FAIL,
  CREATE_HOME_MENU_RESET,
  DELETE_HOME_MENU_REQUEST,
  UPDATE_HOME_MENU_SUCCESS,
  DELETE_HOME_MENU_SUCCESS,
  UPDATE_HOME_MENU_FAIL,
  UPDATE_HOME_MENU_RESET,
  DELETE_HOME_MENU_RESET,
} from "../constants/settingConstants";

export const createHomeMenuReducer = (state = { newHomeMenu: {} }, action) => {
  switch (action.type) {
    case CREATE_HOME_MENU_REQUEST:
      return {
        loading: true,
        isCreated: false,
      };

    case CREATE_HOME_MENU_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        newhomeMenu: action.payload,
      };

    case CREATE_HOME_MENU_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_HOME_MENU_RESET:
      return {
        ...state,
        isCreated: false,
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

export const HomeMenuReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HOME_MENU_REQUEST:
    case DELETE_HOME_MENU_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_HOME_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_HOME_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_HOME_MENU_FAIL:
    case DELETE_HOME_MENU_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_HOME_MENU_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_HOME_MENU_RESET:
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

export const allHomeMenuReducer = (state = { allHomeMenus: {} }, action) => {
  switch (action.type) {
    case ALL_HOME_MENU_REQUEST:
      return {
        loading: true,
        homeMenus: [],
      };

    case ALL_HOME_MENU_SUCCESS:
      return {
        loading: false,
        homeMenus: action.payload,
      };

    case ALL_HOME_MENU_FAIL:
      return {
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
