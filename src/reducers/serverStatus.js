import {
  SUPPORT_RESP,
  REGISTER_RESP,
  LOGIN_RESP,
  HIDE_SERVERSTATUS_MODAL,
  USER_FIELDMODE_SAVE_RESP,
  USER_FIELDMODE_FETCH_RESP,
  USER_FIELDMODE_DELETE_RESP,
  RESETPASSWORD_RESP,
  VALIDATEOTP_RESP,
  RESENDOTP_RESP,
  USER_DESIGNATION_RESP,
  USER_DESIGNATION_CREATE_RESP
} from "../constant/types";
import { updateObject } from "./Utility";

import * as actionTypes from "../constant/types";

const initialState = {
  registerStatus: null,
  registerMessage: null,
  supportStatus: null,
  supportMessage: null,
  loginStatus: null,
  loginMessage: null,
  userFieldModeSaveStatus: null,
  userFieldModeSaveMessage: null,
  resetPasswordStatus: null,
  resetPasswordMessage: null,
  validateOtpStatus: null,
  validateOtpMessage: null,
  resendOtpStatus: null,
  resendOtpMessage: null,
  userFieldModeFetchStatus: null,
  userFieldModeFetchMessage: null,
  userDesignationStatus: null,
  userDesignationMessage: null,
  userDesignationAccess: null
};

export default function serverStatusReducer(state = initialState, action) {
  // console.log("serverStatusReducer reducer call");
  // console.log(action.payload);
  // console.log(action.payload);

  switch (action.type) {
    case "LOGIN_STOPPED":
      return updateObject(state, {
        loginCompanyStatus: null,

        loginCompanyList: null
      })
    case SUPPORT_RESP:
      return updateObject(state, {
        supportStatus: action.payload.status,
        supportMessage: action.payload.message
      });
    case REGISTER_RESP:
      return updateObject(state, {
        registerStatus: action.payload.status,
        registerMessage: action.payload.message
      });
    case LOGIN_RESP:
      if (action.payload.status === 99) {
        return updateObject(state, {
          loginCompanyStatus: action.payload.status,
          loginCompanyList: action.payload.data
        });
      }
      return updateObject(state, {
        loginStatus: action.payload.status,
        loginMessage: action.payload.message,
        loginCompanyStatus: null,
        loginCompanyList: null,
        loginCompanyList: action.payload.data
      });
    case USER_FIELDMODE_SAVE_RESP:
      return updateObject(state, {
        userFieldModeSaveStatus: action.payload.status,
        userFieldModeSaveMessage: action.payload.message
      });
    case USER_FIELDMODE_FETCH_RESP:
      if (action.payload.status !== 200 && action.payload.status !== 902) {
        return updateObject(state, {
          userFieldModeSaveStatus: action.payload.status,
          userFieldModeSaveMessage: action.payload.message,
          userFieldAccess: false
        });
      } else if (action.payload.status === 902) {
        return updateObject(state, {
          userFieldModeSaveStatus: null,
          userFieldModeSaveMessage: action.payload.message,
          userFieldAccess: true
        });
      }
      return updateObject(state, {
        userFieldModeSaveStatus: null,
        userFieldModeSaveMessage: action.payload.message,
        userFieldAccess: true
      });

    case USER_FIELDMODE_DELETE_RESP:
      return updateObject(state, {
        userFieldModeSaveStatus: action.payload.status,
        userFieldModeSaveMessage: action.payload.message
      });
    case RESETPASSWORD_RESP:
      if (action.payload.status === 99) {
        return updateObject(state, {
          ResetCompanyStatus: action.payload.status,
          ResetCompanyList: action.payload.data
        });
      }
      return updateObject(state, {
        resetPasswordStatus: action.payload.status,
        resetPasswordMessage: action.payload.message,
        ResetCompanyStatus: null,
        ResetCCompanyList: null
      });
    case VALIDATEOTP_RESP:
      return updateObject(state, {
        validateOtpStatus: action.payload.status,
        validateOtpMessage: action.payload.message
      });
    case "CLEAR_RESET_DATA":
      return updateObject(state, {
        resetPasswordStatus: null,
        resetPasswordMessage: null,
        validateOtpStatus: null,
        validateOtpMessage: null,
      });
    case RESENDOTP_RESP:
      return updateObject(state, {
        resendOtpStatus: action.payload.status,
        resendOtpMessage: action.payload.message
      });

    case USER_DESIGNATION_RESP:
      if (action.payload.status !== 200 && action.payload.status !== 902) {
        return updateObject(state, {
          userDesignationStatus: action.payload.status,
          userDesignationMessage: action.payload.message,
          userDesignationAccess: false
        });
      } else if (action.payload.status === 902) {
        return updateObject(state, {
          userDesignationStatus: null,
          userDesignationMessage: action.payload.message,
          userDesignationAccess: true
        });
      }
      return updateObject(state, {
        userDesignationStatus: null,
        userDesignationMessage: action.payload.message,
        userDesignationAccess: true
      });

    case USER_DESIGNATION_CREATE_RESP:
      if (action.payload.status !== 200 && action.payload.status !== 902) {
        return updateObject(state, {
          userDesignationStatus: action.payload.status,
          userDesignationMessage: action.payload.message,
          userDesignationAccess: false
        });
      } else if (action.payload.status === 902) {
        return updateObject(state, {
          userDesignationStatus: null,
          userDesignationMessage: action.payload.message,
          userDesignationAccess: true
        });
      }
      return updateObject(state, {
        userDesignationStatus: action.payload.status,
        userDesignationMessage: action.payload.message,
        userDesignationAccess: true
      });

    case actionTypes.PROJECT_DETAILS_RESP:
      return updateObject(state, {
        projectDetailStatus: action.payload.status,
        projectDetailMessage: action.payload.message
      });

    case actionTypes.FETCH_PROJECT_DETAILS_RESP:
      return updateObject(state, {
        fetchProjectStatus: action.payload.status,
        fetchProjectMessage: action.payload.message
      });

    case "FLUSH_LOGIN":
      return updateObject(state, {
        loginStatus: null,
        loginMessage: null
      });

    case HIDE_SERVERSTATUS_MODAL:
      return initialState, { userFieldAccess: state.userFieldAccess };
    default:
      return state;
  }
}
