import {
  ALL_ROLE_REQUEST,
  ALL_ROLE_SUCCESS,
  ALL_ROLE_FAIL,
} from "constants/roleConstants";
import { BASE_URL } from "../constants/urlConstants";
import axios from "axios";
import { ALL_PERMISSION_REQUEST } from "constants/roleConstants";
import { ALL_PERMISSION_SUCCESS } from "constants/roleConstants";
import { ALL_PERMISSION_FAIL } from "constants/roleConstants";
import { CREATE_ROLE_REQUEST } from "constants/roleConstants";
import { CREATE_ROLE_FAIL } from "constants/roleConstants";
import { CREATE_ROLE_SUCCESS } from "constants/roleConstants";
import { UPDATE_ROLE_REQUEST } from "constants/roleConstants";
import { UPDATE_ROLE_SUCCESS } from "constants/roleConstants";
import { UPDATE_ROLE_FAIL } from "constants/roleConstants";
import { DELETE_ROLE_REQUEST } from "constants/roleConstants";
import { DELETE_ROLE_SUCCESS } from "constants/roleConstants";
import { DELETE_ROLE_FAIL } from "constants/roleConstants";

export const createRole = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROLE_REQUEST });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/admin/create/roles`,
      roleData
    );

    dispatch({ type: CREATE_ROLE_SUCCESS, payload: data.roles });
  } catch (error) {
    dispatch({ type: CREATE_ROLE_FAIL, payload: error.response.data.message });
  }
};

export const updateRole = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROLE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/admin/update/roles`,
      roleData
    );

    dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ROLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllRoles = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ROLE_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/admin/get/roles`);

    dispatch({ type: ALL_ROLE_SUCCESS, payload: data.roles });
  } catch (error) {
    dispatch({ type: ALL_ROLE_FAIL, payload: error.response.data.message });
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLE_REQUEST });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/role/${id}`);

    dispatch({ type: DELETE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ROLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllPermissions = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PERMISSION_REQUEST });

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/admin/get/permissions`
    );

    dispatch({ type: ALL_PERMISSION_SUCCESS, payload: data.permissions });
  } catch (error) {
    dispatch({
      type: ALL_PERMISSION_FAIL,
      payload: error.response.data.message,
    });
  }
};
