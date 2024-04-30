import {
  ALL_ROLE_FAIL,
  ALL_ROLE_REQUEST,
  ALL_ROLE_SUCCESS,
  CREATE_ROLE_REQUEST,
  DELETE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  CLEAR_ERRORS,
  ALL_PERMISSION_REQUEST,
  ALL_PERMISSION_SUCCESS,
  ALL_PERMISSION_FAIL,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAIL,
  CREATE_ROLE_RESET,
} from "../constants/roleConstants";

export const createRoleReducer = (state = { newRole: {} }, action) => {
  switch (action.type) {
    case CREATE_ROLE_REQUEST:
      return {
        loading: true,
        isCreated: false,
      };

    case CREATE_ROLE_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        newrole: action.payload,
      };

    case CREATE_ROLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_ROLE_RESET:
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

export const allRoleReducer = (state = { roles: {} }, action) => {
  switch (action.type) {
    case CREATE_ROLE_REQUEST:
    case ALL_ROLE_REQUEST:
      return {
        loading: true,
        roles: [],
      };

    case CREATE_ROLE_SUCCESS:
    case ALL_ROLE_SUCCESS:
      return {
        loading: false,
        roles: action.payload,
      };

    case CREATE_ROLE_FAIL:
    case ALL_ROLE_FAIL:
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

export const permissionReducer = (state = { permissions: [] }, action) => {
  switch (action.type) {
    case ALL_PERMISSION_REQUEST:
      return {
        loading: true,
        permissions: [],
      };

    case ALL_PERMISSION_SUCCESS:
      return {
        loading: false,
        permissions: action.payload,
      };

    case ALL_PERMISSION_FAIL:
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
