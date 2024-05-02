import { CREATE_WEBSITE_FAIL } from "constants/websiteConstants";
import { ALL_WEBSITE_REQUEST } from "constants/websiteConstants";
import { ALL_WEBSITE_FAIL } from "constants/websiteConstants";
import { CLEAR_ERRORS } from "constants/websiteConstants";
import { ALL_WEBSITE_SUCCESS } from "constants/websiteConstants";
import { CREATE_WEBSITE_RESET } from "constants/websiteConstants";
import { CREATE_WEBSITE_SUCCESS } from "constants/websiteConstants";
import { CREATE_WEBSITE_REQUEST } from "constants/websiteConstants";

export const createWebsiteReducer = (state = { newWebsite: {} }, action) => {
  switch (action.type) {
    case CREATE_WEBSITE_REQUEST:
      return {
        loading: true,
        isCreated: false,
      };

    case CREATE_WEBSITE_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        newwebsite: action.payload,
      };

    case CREATE_WEBSITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_WEBSITE_RESET:
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

export const allWebsiteReducer = (state = { allWebsites: {} }, action) => {
  switch (action.type) {
    case ALL_WEBSITE_REQUEST:
      return {
        loading: true,
        websites: [],
      };

    case ALL_WEBSITE_SUCCESS:
      return {
        loading: false,
        websites: action.payload,
      };

    case ALL_WEBSITE_FAIL:
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
