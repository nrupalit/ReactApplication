import { combineReducers } from "redux";
import loginReducer from "./login_reducer";
import layoutUtilsReducer from "./LayoutUtils";
import serverStatusReducer from "./serverStatus";
import serverDataReducer from "./serverData";
import Project from "./Project";

const rootReducer = combineReducers({
  auth: loginReducer,
  utilityLayout: layoutUtilsReducer,
  serverStatus: serverStatusReducer,
  serverData: serverDataReducer,
  projectData: Project
});

export default rootReducer;
