import * as actionTypes from "constant/types";
import {
  LOADING,
  SERVER_ERROR,
  HIDE_ERROR_MODAL,
  HIDE_LOADER
} from "../constant/types";
import { updateObject } from "./Utility";
const initialState = {
  isLoading: false,
  isServerError: false,
  projectPin: false,
  resPin: false
};

export default function layoutUtils(state = initialState, action) {
  // console.log("layoutUtils reducer call");
  switch (action.type) {
    case LOADING:
      return updateObject(state, { isLoading: true, isServerError: false });
    case HIDE_LOADER:
      return updateObject(state, {
        isLoading: false
      });
    case SERVER_ERROR:
      return updateObject(state, { isServerError: true, isLoading: false });
    case HIDE_ERROR_MODAL:
      return updateObject(state, { isServerError: false, isLoading: false });
    case actionTypes.SHOW_PROJECT_SIDEBAR:
      return updateObject(state, { projectSidebar: true });
    case actionTypes.HIDE_PROJECT_SIDEBAR:
      return updateObject(state, { projectSidebar: false });
    case actionTypes.SHOW_RESOURCES_SIDEBAR:
      return updateObject(state, { resourceSidebar: true });
    case actionTypes.HIDE_RESOURCES_SIDEBAR:
      return updateObject(state, { resourceSidebar: false });

    //    actionTypes.HIDE_RESOURCES_SIDEBAR:
    case "PIN_PROJECT_SIDEBAR":
      return updateObject(state, { projectPin: !state.projectPin });
    case "PIN_RES_SIDEBAR":
      return updateObject(state, { resPin: !state.resPin });

    default:
      return state;
  }
}
