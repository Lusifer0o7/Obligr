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
  DELETE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  DELETE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_RESET,
  DELETE_ROLE_RESET,
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

export const RoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROLE_REQUEST:
    case DELETE_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_ROLE_FAIL:
    case DELETE_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ROLE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ROLE_RESET:
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

export const allRoleReducer = (state = { allRoles: {} }, action) => {
  switch (action.type) {
    case ALL_ROLE_REQUEST:
      return {
        loading: true,
        roles: [],
      };

    case ALL_ROLE_SUCCESS:
      return {
        loading: false,
        roles: action.payload,
      };

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
