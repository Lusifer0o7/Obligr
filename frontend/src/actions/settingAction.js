import {
  ALL_HOME_MENU_REQUEST,
  ALL_HOME_MENU_SUCCESS,
  ALL_HOME_MENU_FAIL,
} from "../constants/settingConstants";
import { BASE_URL } from "../constants/urlConstants";
import axios from "axios";
import { CREATE_HOME_MENU_REQUEST } from "../constants/settingConstants";
import { CREATE_HOME_MENU_FAIL } from "../constants/settingConstants";
import { CREATE_HOME_MENU_SUCCESS } from "../constants/settingConstants";
import { UPDATE_HOME_MENU_REQUEST } from "../constants/settingConstants";
import { UPDATE_HOME_MENU_SUCCESS } from "../constants/settingConstants";
import { UPDATE_HOME_MENU_FAIL } from "../constants/settingConstants";
import { DELETE_HOME_MENU_REQUEST } from "../constants/settingConstants";
import { DELETE_HOME_MENU_SUCCESS } from "../constants/settingConstants";
import { DELETE_HOME_MENU_FAIL } from "../constants/settingConstants";

export const createHomeMenu = (homeMenuData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_HOME_MENU_REQUEST });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/create/home-menu`,
      homeMenuData
    );

    dispatch({ type: CREATE_HOME_MENU_SUCCESS, payload: data.menu });
  } catch (error) {
    dispatch({
      type: CREATE_HOME_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateHomeMenu = (homeMenuData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HOME_MENU_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/update/home-menu`,
      homeMenuData
    );

    dispatch({ type: UPDATE_HOME_MENU_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_HOME_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllHomeMenus = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_HOME_MENU_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/get/home-menus`);

    dispatch({ type: ALL_HOME_MENU_SUCCESS, payload: data.menus });
  } catch (error) {
    dispatch({
      type: ALL_HOME_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteHomeMenu = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HOME_MENU_REQUEST });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/home-menu/${id}`);

    dispatch({ type: DELETE_HOME_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_HOME_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};
