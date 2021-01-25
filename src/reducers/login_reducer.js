import { LOGIN, LOGOUT } from "../constant/types";
import { updateObject } from "./Utility";
const initialState = {
  auth: null
};
export default function loginReducer(state = initialState, action) {
  // console.log('login reducer call');
  // console.log("login reducer action type " + JSON.stringify(action.type));
  switch (action.type) {
    case LOGIN:
      if (action.payload.status == 200) {
        const serializedState = JSON.stringify(action.payload);
        localStorage.setItem('auth', serializedState);
        return updateObject(state, action.payload);
      }
    case LOGOUT:
      localStorage.clear()
      return null;
    case "ALREADY_LOGGED_IN":
      // console.log(action)
      return {
        ...state,
        ...action.payload,

      }
    default:
      return state;
  }
}
