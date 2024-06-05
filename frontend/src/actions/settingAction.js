import {
  ALL_HOME_MENU_REQUEST,
  ALL_HOME_MENU_SUCCESS,
  ALL_HOME_MENU_FAIL,
  ALL_HOME_SLIDER_REQUEST,
  ALL_HOME_SLIDER_SUCCESS,
  ALL_HOME_SLIDER_FAIL,
  HOME_FOOTER_REQUEST,
  HOME_FOOTER_SUCCESS,
  HOME_FOOTER_FAIL,
  UPDATE_HOME_FOOTER_REQUEST,
  UPDATE_HOME_FOOTER_SUCCESS,
  UPDATE_HOME_FOOTER_FAIL,
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

import { CREATE_HOME_SLIDER_REQUEST } from "../constants/settingConstants";
import { CREATE_HOME_SLIDER_FAIL } from "../constants/settingConstants";
import { CREATE_HOME_SLIDER_SUCCESS } from "../constants/settingConstants";
import { UPDATE_HOME_SLIDER_REQUEST } from "../constants/settingConstants";
import { UPDATE_HOME_SLIDER_SUCCESS } from "../constants/settingConstants";
import { UPDATE_HOME_SLIDER_FAIL } from "../constants/settingConstants";
import { DELETE_HOME_SLIDER_REQUEST } from "../constants/settingConstants";
import { DELETE_HOME_SLIDER_SUCCESS } from "../constants/settingConstants";
import { DELETE_HOME_SLIDER_FAIL } from "../constants/settingConstants";

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

export const createHomeSlider = (homeSliderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_HOME_SLIDER_REQUEST });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/create/home-slider`,
      homeSliderData
    );

    dispatch({ type: CREATE_HOME_SLIDER_SUCCESS, payload: data.homeSlider });
  } catch (error) {
    dispatch({
      type: CREATE_HOME_SLIDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateHomeSlider = (homeSliderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HOME_SLIDER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/update/home-slider`,
      homeSliderData
    );

    dispatch({ type: UPDATE_HOME_SLIDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_HOME_SLIDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllHomeSliders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_HOME_SLIDER_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/get/home-sliders`);

    dispatch({ type: ALL_HOME_SLIDER_SUCCESS, payload: data.homeSliders });
  } catch (error) {
    dispatch({
      type: ALL_HOME_SLIDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteHomeSlider = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HOME_SLIDER_REQUEST });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/home-slider/${id}`);

    dispatch({ type: DELETE_HOME_SLIDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_HOME_SLIDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getHomeFooter = () => async (dispatch) => {
  try {
    dispatch({ type: HOME_FOOTER_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/get/home-footer`);

    dispatch({ type: HOME_FOOTER_SUCCESS, payload: data.footer });
  } catch (error) {
    dispatch({
      type: HOME_FOOTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateHomeFooter = (homeFooterData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HOME_FOOTER_REQUEST });

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/update/home-footer`,
      homeFooterData
    );

    dispatch({ type: UPDATE_HOME_FOOTER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_HOME_FOOTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
