// import {PROJECT} from '../constant/types'
import { updateObject } from "./Utility";
import FormActionBtns from "../containers/Grid/formactionbtns";
const initialState = {
  project: [
    {
      project_id: 1,
      project_name: "haha",
      project_description: "",
      client_mobile: "9820995114",
      client_email: "sharad.jaiswal70@gmail.com",
      client_first_name: "",
      client_last_name: "",
      client_city: "",
      client_state: "",
      client_pincode: "",
      client_area: "",
      client_addr: "",
      site_city: "",
      site_state: "",
      site_addr: "",
      contactPerson_name: "",
      contactPerson_mobile: "",
      site_first_name: "",
      site_last_name: "",
      site_mobile: "",
      site_email: ""
    },
    {
      project_id: 2,
      project_name: "haha",
      project_description: "",
      client_mobile: "9820995114",
      client_email: "sharad.jaiswal70@gmail.com",
      client_first_name: "",
      client_last_name: "",
      client_city: "",
      client_state: "",
      client_pincode: "",
      client_area: "",
      client_addr: "",
      site_city: "",
      site_state: "",
      site_addr: "",
      contactPerson_name: "",
      contactPerson_mobile: "",
      site_first_name: "",
      site_last_name: "",
      site_mobile: "",
      site_email: ""
    },
    {
      project_id: 3,
      project_name: "haha",
      project_description: "",
      client_mobile: "9820995114",
      client_email: "sharad.jaiswal70@gmail.com",
      client_first_name: "",
      client_last_name: "",
      client_city: "",
      client_state: "",
      client_pincode: "",
      client_area: "",
      client_addr: "",
      site_city: "",
      site_state: "",
      site_addr: "",
      contactPerson_name: "",
      contactPerson_mobile: "",
      site_first_name: "",
      site_last_name: "",
      site_mobile: "",
      site_email: ""
    },
    {
      project_id: 4,
      project_name: "haha",
      project_description: "",
      client_mobile: "9820995114",
      client_email: "sharad.jaiswal70@gmail.com",
      client_first_name: "",
      client_last_name: "",
      client_city: "",
      client_state: "",
      client_pincode: "",
      client_area: "",
      client_addr: "",
      site_city: "",
      site_state: "",
      site_addr: "",
      contactPerson_name: "",
      contactPerson_mobile: "",
      site_first_name: "",
      site_last_name: "",
      site_mobile: "",
      site_email: ""
    },
    {
      project_id: 5,
      project_name: "haha",
      project_description: "",
      client_mobile: "9820995114",
      client_email: "sharad.jaiswal70@gmail.com",
      client_first_name: "",
      client_last_name: "",
      client_city: "",
      client_state: "",
      client_pincode: "",
      client_area: "",
      client_addr: "",
      site_city: "",
      site_state: "",
      site_addr: "",
      contactPerson_name: "",
      contactPerson_mobile: "",
      site_first_name: "",
      site_last_name: "",
      site_mobile: "",
      site_email: ""
    }
  ],
  dockProject: [],
  ProjectIDforTemplate: null,
  Templatetype: "template",
};
export default function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    // New Action and variable to store the docked project's details
    case "DOCK_THE_PROJECT":
      return updateObject(state, {
        dockedProject: action.payload.data
      });
      //Nrupali Coded..
    case 'NEW_TEMPLATE':
      return updateObject(state , {
        templateData: action.payload
      })
    case "UNDOCK_THE_PROJECT":
      return updateObject(state, {
        dockedProject: []
      });


    case "DOCK_PROJECT":
      const newProject = updateObject(action.payload, { id: "1" });
      return updateObject(state, {
        dockProject: state.dockProject.concat(newProject)
      });
    case "UNDOCK_PROJECT":
      return updateObject(state, {
        dockProject: [],

      });
    case "GET_PROJECT":
      return updateObject(state, {
        project: action.payload.data
      });
    case "NEW_PROJECT":
      return updateObject(state, {
        newProject: action.payload != null ? action.payload.data : null
      });
    case "PROJECT_FLAG":
      return updateObject(state, {
        projectFlag: action.payload
      });

    case "TEMPLATE_PAGE_RESP":
      // console.log("QQQQQ")

      return updateObject(state, {
        templatePage: action.payload.data
      });
    case "TEMPLATE_PAGE_RESP_EXEC":
      // console.log("QQQQQ")

      return updateObject(state, {
        templatePageExec: action.payload.data
      });

    case "SHOW_TEMPLATE_RESP":
      // console.log("AAAAA")
      return updateObject(state, {
        templateData: action.payload.data
      });
    case "PROJECT_TEMPLATE_RESP":
      return updateObject(state, {
        templateData: action.payload.data
      });
    case "EDIT_TEMPLATE_RESP":
      // console.log(action.payload)
      return updateObject(state, { estmt_status: action.payload.template_estmt_status, server_status: action.payload.status })
    case "HIDE_STATUS_RESP":
      return updateObject(state, { estmt_status: null, server_status: null })
    case "FLUSH_LOGIN":
      return updateObject(initialState);
    case "EDIT_EXECUTE_RESP":
      // console.log(action.payload)
      return updateObject(state, { estmt_status: action.payload.template_exec_status, server_status: action.payload.status })
    default:
      return state;
  }
}
