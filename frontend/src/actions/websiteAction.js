import { BASE_URL } from "constants/urlConstants";
import axios from "axios";
import { CREATE_WEBSITE_FAIL } from "constants/websiteConstants";
import { UPDATE_WEBSITE_SUCCESS } from "constants/websiteConstants";
import { ALL_WEBSITE_REQUEST } from "constants/websiteConstants";
import { ALL_WEBSITE_FAIL } from "constants/websiteConstants";
import { DELETE_WEBSITE_SUCCESS } from "constants/websiteConstants";
import { DELETE_WEBSITE_FAIL } from "constants/websiteConstants";
import { DELETE_WEBSITE_REQUEST } from "constants/websiteConstants";
import { ALL_WEBSITE_SUCCESS } from "constants/websiteConstants";
import { UPDATE_WEBSITE_FAIL } from "constants/websiteConstants";
import { UPDATE_WEBSITE_REQUEST } from "constants/websiteConstants";
import { CREATE_WEBSITE_SUCCESS } from "constants/websiteConstants";
import { CREATE_WEBSITE_REQUEST } from "constants/websiteConstants";

export const createWebsite = (websiteData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_WEBSITE_REQUEST });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/create/website`,
      websiteData
    );

    dispatch({ type: CREATE_WEBSITE_SUCCESS, payload: data.websites });
  } catch (error) {
    dispatch({
      type: CREATE_WEBSITE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateWebsite = (websiteData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_WEBSITE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/update/websites`,
      websiteData
    );

    dispatch({ type: UPDATE_WEBSITE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_WEBSITE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllWebsites = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_WEBSITE_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/get/websites`);

    dispatch({ type: ALL_WEBSITE_SUCCESS, payload: data.websites });
  } catch (error) {
    dispatch({ type: ALL_WEBSITE_FAIL, payload: error.response.data.message });
  }
};

export const deleteWebsite = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WEBSITE_REQUEST });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/website/${id}`);

    dispatch({ type: DELETE_WEBSITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_WEBSITE_FAIL,
      payload: error.response.data.message,
    });
  }
};
