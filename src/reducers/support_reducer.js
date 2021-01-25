import { SUPPORT_CREATE } from "../constant/types";
const initialState = {
  loginData: {}
};
export default function supportReducer(state = initialState, action) {
  console.log("support reducer call");
  switch (action.type) {
    case SUPPORT_CREATE:
      return action.payload;
    default:
      return state;
  }
}
