import {
  ALL_ROLE_REQUEST,
  ALL_ROLE_SUCCESS,
  ALL_ROLE_FAIL,
} from "constants/roleConstants";
import { BASE_URL } from "../constants/urlConstants";
import axios from "axios";

export const getAllRoles = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ROLE_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/admin/get/roles`);

    dispatch({ type: ALL_ROLE_SUCCESS, payload: data.roles });
  } catch (error) {
    dispatch({ type: ALL_ROLE_FAIL, payload: error.response.data.message });
  }
};
