import {
  RESETPASSWORD,
  USER_FIELDMODE_FETCH_RESP,
  USER_DESIGNATION_FETCH_RESP,
  FLUSH_DATA,
  CLIENT_FETCH_RESP
} from "../constant/types";
import { updateObject } from "./Utility";
const initialState = {
  resetPasswordData: null,
  fetchUserData: null,
  fetchDesignationList: null
};
export default function registerReducer(state = initialState, action) {
  // console.log("login reducer call");
  // console.log("login reducer action type " + JSON.stringify(action.payload));
  switch (action.type) {
    case RESETPASSWORD:
      return updateObject(state, {
        resetPasswordData: action.payload.mobileEmail,
        reset_id: action.payload.account_id
      });
    case USER_FIELDMODE_FETCH_RESP:
      return updateObject(state, { fetchUserData: action.payload.data });
    case USER_DESIGNATION_FETCH_RESP:
      return updateObject(state, { fetchDesignationList: action.payload.data });
    case CLIENT_FETCH_RESP:
      return updateObject(state, { fetchClientsList: action.payload.data });
    case FLUSH_DATA:
      return updateObject(state, {
        resetPasswordData: null,
        fetchUserData: null
      });
    case "FLUSH_LOGIN":
      return updateObject(initialState);
    case "VIEWPROFILE":
      return updateObject(state, {
        viewProfile: action.payload.data,
        viewProfileStatus: action.payload.status,
        viewProfileMessage: action.payload.msg
      });
    default:
      return state;
  }
}
