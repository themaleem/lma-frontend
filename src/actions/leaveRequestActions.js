import axios from "axios";
import {
  LEAVE_REQUEST_LIST_REQUEST,
  LEAVE_REQUEST_LIST_SUCCESS,
  LEAVE_REQUEST_LIST_FAIL,
  LEAVE_REQUEST_LIST_MY_FAIL,
  LEAVE_REQUEST_LIST_MY_SUCCESS,
  LEAVE_REQUEST_LIST_MY_REQUEST,
  LEAVE_REQUEST_CREATE_SUCCESS,
  LEAVE_REQUEST_CREATE_REQUEST,
  LEAVE_REQUEST_CREATE_FAIL,
  LEAVE_REQUEST_DETAILS_FAIL,
  LEAVE_REQUEST_DETAILS_REQUEST,
  LEAVE_REQUEST_DETAILS_SUCCESS,
  LEAVE_REQUEST_UPDATE_SUCCESS,
  LEAVE_REQUEST_UPDATE_FAIL,
  LEAVE_REQUEST_UPDATE_REQUEST,
  LEAVE_REQUEST_APPROVE_FAIL,
  LEAVE_REQUEST_APPROVE_SUCCESS,
  LEAVE_REQUEST_APPROVE_REQUEST,
  LEAVE_REQUEST_REJECT_FAIL,
  LEAVE_REQUEST_REJECT_SUCCESS,
  LEAVE_REQUEST_REJECT_REQUEST,
} from "../constants/leaveRequestConstants.js";

const url = "http://127.0.0.1:8000";
// const url = "https://leave-mgt.herokuapp.com";

export const listLeaveRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${url}/admin-leaves/`, config);
    dispatch({
      type: LEAVE_REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyLeaveRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${url}/leave/`, config);
    dispatch({
      type: LEAVE_REQUEST_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createLeaveRequest = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(`/api/leaverequest`, {}, config);

    dispatch({
      type: LEAVE_REQUEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLeaveRequestDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`/api/leaverequest/${id}`, config);

    dispatch({
      type: LEAVE_REQUEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const leaveRequest = (request) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(`${url}/leave/`, request, config);

    dispatch({
      type: LEAVE_REQUEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveLeaveRequest = (requestId, remark) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LEAVE_REQUEST_APPROVE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${url}/approve/${requestId}/`,
      {
        status: "approved",
        approver_remark: remark,
      },
      config
    );

    dispatch({
      type: LEAVE_REQUEST_APPROVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_APPROVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const rejectLeaveRequest = (requestId, remark) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LEAVE_REQUEST_REJECT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${url}/decline/${requestId}/`,
      {
        status: "declined",
        approver_remark: remark,
      },
      config
    );

    dispatch({
      type: LEAVE_REQUEST_REJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_REJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
