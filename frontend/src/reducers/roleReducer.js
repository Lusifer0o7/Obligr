import {
  ALL_ROLE_FAIL,
  ALL_ROLE_REQUEST,
  ALL_ROLE_SUCCESS,
  CREATE_ROLE_REQUEST,
  DELETE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  CLEAR_ERRORS,
} from "../constants/roleConstants";

export const roleReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case CREATE_ROLE_REQUEST:
    case ALL_ROLE_REQUEST:
      return {
        loading: true,
        role: [],
      };

    case ALL_ROLE_SUCCESS:
      return {
        loading: false,
        role: action.payload,
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
