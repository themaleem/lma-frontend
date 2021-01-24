import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  leaveRequestListReducer,
  leaveRequestListMyReducer,
  leaveRequestCreateReducer,
  leaveRequestDetailsReducer,
  leaveRequestUpdateReducer,
  leaveRequestApproveReducer,
  leaveRequestRejectReducer,
} from "./reducers/leaveRequestReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  leaveRequestList: leaveRequestListReducer,
  leaveRequestDetails: leaveRequestDetailsReducer,
  leaveRequestListMy: leaveRequestListMyReducer,
  leaveRequestCreate: leaveRequestCreateReducer,
  leaveRequestUpdate: leaveRequestUpdateReducer,
  leaveRequestApprove: leaveRequestApproveReducer,
  leaveRequestReject: leaveRequestRejectReducer,
});

const userInfoFromStorage = localStorage.getItem("lmUserInfo")
  ? JSON.parse(localStorage.getItem("lmUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
