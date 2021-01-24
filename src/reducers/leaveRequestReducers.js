import {
  LEAVE_REQUEST_LIST_REQUEST,
  LEAVE_REQUEST_LIST_SUCCESS,
  LEAVE_REQUEST_LIST_FAIL,
  LEAVE_REQUEST_LIST_MY_REQUEST,
  LEAVE_REQUEST_LIST_MY_SUCCESS,
  LEAVE_REQUEST_LIST_MY_FAIL,
  LEAVE_REQUEST_CREATE_REQUEST,
  LEAVE_REQUEST_CREATE_SUCCESS,
  LEAVE_REQUEST_CREATE_FAIL,
  LEAVE_REQUEST_CREATE_RESET,
  LEAVE_REQUEST_DETAILS_REQUEST,
  LEAVE_REQUEST_DETAILS_SUCCESS,
  LEAVE_REQUEST_DETAILS_FAIL,
  LEAVE_REQUEST_UPDATE_REQUEST,
  LEAVE_REQUEST_UPDATE_SUCCESS,
  LEAVE_REQUEST_UPDATE_FAIL,
  LEAVE_REQUEST_UPDATE_RESET,
  LEAVE_REQUEST_APPROVE_RESET,
  LEAVE_REQUEST_APPROVE_FAIL,
  LEAVE_REQUEST_APPROVE_SUCCESS,
  LEAVE_REQUEST_APPROVE_REQUEST,
  LEAVE_REQUEST_REJECT_REQUEST,
  LEAVE_REQUEST_REJECT_SUCCESS,
  LEAVE_REQUEST_REJECT_FAIL,
  LEAVE_REQUEST_REJECT_RESET,
  LEAVE_REQUEST_DELETE_REQUEST,
  LEAVE_REQUEST_DELETE_SUCCESS,
  LEAVE_REQUEST_DELETE_FAIL,

} from "../constants/leaveRequestConstants.js";

export const leaveRequestListReducer = (state = { pendingLeaveRequests: [], approvedLeaveRequests: [], rejectedLeaveRequests: [] }, action) => {
  switch (action.type) {
    case LEAVE_REQUEST_LIST_REQUEST:
      return { loading: true, leaveRequests: [] };
    case LEAVE_REQUEST_LIST_SUCCESS:
      return {
        loading: false,
        pendingLeaveRequests: action.payload.pendingLeaveRequests,
        approvedLeaveRequests: action.payload.approvedLeaveRequests,
        rejectedLeaveRequests: action.payload.rejectedLeaveRequests,
      };
    case LEAVE_REQUEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaveRequestListMyReducer = (state = { pendingLeaveRequests: [], approvedLeaveRequests: [], rejectedLeaveRequests: [] }, action) => {
  switch (action.type) {
    case LEAVE_REQUEST_LIST_MY_REQUEST:
      return { loading: true, };
    case LEAVE_REQUEST_LIST_MY_SUCCESS:
      return {
        loading: false,
        pendingLeaveRequests: action.payload.pendingLeaveRequests,
        approvedLeaveRequests: action.payload.approvedLeaveRequests,
        rejectedLeaveRequests: action.payload.rejectedLeaveRequests,
      };
    case LEAVE_REQUEST_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaveRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_REQUEST_CREATE_REQUEST:
      return { loading: true, };
    case LEAVE_REQUEST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        leaveRequest: action.payload
      };
    case LEAVE_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveRequestDetailsReducer = (
  state = { leaveRequest: {} },
  action
) => {
  switch (action.type) {
    case LEAVE_REQUEST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case LEAVE_REQUEST_DETAILS_SUCCESS:
      return {
        loading: false,
        leaveRequest: action.payload,
      };
    case LEAVE_REQUEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaveRequestUpdateReducer = (
  state = { leaveRequest: {} },
  action
) => {
  switch (action.type) {
    case LEAVE_REQUEST_UPDATE_REQUEST:
      return { loading: true };
    case LEAVE_REQUEST_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        leaveRequest: action.payload,
      };
    case LEAVE_REQUEST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_REQUEST_UPDATE_RESET:
      return { leaveRequest: {} };
    default:
      return state;
  }
};

export const leaveDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_REQUEST_DELETE_REQUEST:
      return { loading: true };
    case LEAVE_REQUEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LEAVE_REQUEST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaveRequestApproveReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case LEAVE_REQUEST_APPROVE_REQUEST:
      return { loading: true };
    case LEAVE_REQUEST_APPROVE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case LEAVE_REQUEST_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_REQUEST_APPROVE_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveRequestRejectReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case LEAVE_REQUEST_REJECT_REQUEST:
      return { loading: true };
    case LEAVE_REQUEST_REJECT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case LEAVE_REQUEST_REJECT_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_REQUEST_REJECT_RESET:
      return {};
    default:
      return state;
  }
};