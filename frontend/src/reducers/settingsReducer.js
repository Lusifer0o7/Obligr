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
  ALL_HOME_SLIDER_FAIL,
  ALL_HOME_SLIDER_REQUEST,
  ALL_HOME_SLIDER_SUCCESS,
  CREATE_HOME_SLIDER_REQUEST,
  DELETE_HOME_SLIDER_FAIL,
  UPDATE_HOME_SLIDER_REQUEST,
  CREATE_HOME_SLIDER_SUCCESS,
  CREATE_HOME_SLIDER_FAIL,
  CREATE_HOME_SLIDER_RESET,
  DELETE_HOME_SLIDER_REQUEST,
  UPDATE_HOME_SLIDER_SUCCESS,
  DELETE_HOME_SLIDER_SUCCESS,
  UPDATE_HOME_SLIDER_FAIL,
  UPDATE_HOME_SLIDER_RESET,
  DELETE_HOME_SLIDER_RESET,
  HOME_FOOTER_REQUEST,
  HOME_FOOTER_SUCCESS,
  HOME_FOOTER_FAIL,
  UPDATE_HOME_FOOTER_REQUEST,
  UPDATE_HOME_FOOTER_SUCCESS,
  UPDATE_HOME_FOOTER_FAIL,
  UPDATE_HOME_FOOTER_RESET,
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

export const createHomeSliderReducer = (
  state = { newHomeSlider: {} },
  action
) => {
  switch (action.type) {
    case CREATE_HOME_SLIDER_REQUEST:
      return {
        loading: true,
        isCreated: false,
      };

    case CREATE_HOME_SLIDER_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        newhomeSlider: action.payload,
      };

    case CREATE_HOME_SLIDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_HOME_SLIDER_RESET:
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

export const HomeSliderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HOME_SLIDER_REQUEST:
    case DELETE_HOME_SLIDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_HOME_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_HOME_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_HOME_SLIDER_FAIL:
    case DELETE_HOME_SLIDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_HOME_SLIDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_HOME_SLIDER_RESET:
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

export const allHomeSliderReducer = (
  state = { allHomeSliders: {} },
  action
) => {
  switch (action.type) {
    case ALL_HOME_SLIDER_REQUEST:
      return {
        loading: true,
        homeSliders: [],
      };

    case ALL_HOME_SLIDER_SUCCESS:
      return {
        loading: false,
        homeSliders: action.payload,
      };

    case ALL_HOME_SLIDER_FAIL:
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

export const getHomeFooterReducer = (state = { getHomeFooter: {} }, action) => {
  switch (action.type) {
    case HOME_FOOTER_REQUEST:
      return {
        loading: true,
        homeFooter: [],
      };

    case HOME_FOOTER_SUCCESS:
      return {
        loading: false,
        homeFooter: action.payload,
      };

    case HOME_FOOTER_FAIL:
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

export const HomeFooterReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HOME_FOOTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_HOME_FOOTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_HOME_FOOTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_HOME_FOOTER_RESET:
      return {
        ...state,
        isUpdated: false,
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
