import { REGISTER } from "../constant/types";
const initialState = {
  loginData: {},
  registerData: {}
};
export default function registerReducer(state = initialState, action) {
  // console.log("login reducer call");
  // console.log("login reducer action type " + JSON.stringify(action.payload));
  switch (action.type) {
    case REGISTER:
      return action.payload;
    default:
      return state;
  }
}
