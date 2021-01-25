import Api from "../utils/fetchPostApi"

import {
  SERVERBASEURL,
  LOGIN_URL,
  REGISTER_URL,
  RESETPASSWORD_URL,
  VALIDATEOTP_URL,
  SUPPORT_URL,
  SHOW_TEMPLATE,
  CREATE_USERFIELD_MODE,
  EDIT_USERFIELD_MODE,
  FETCH_USERFIELD_MODE,
  DELETE_USERFIELD_MODE,
  FETCH_PROJECT_DETAILS,
  DELETE_PROJECT_DETAILS,
  POST_PROJECT_DETAILS,
  GET_EXISTING_PROJECT,
  FETCH_PROJECT_BRIEF,
  DELETE_PROJECT_BRIEF,
  POST_PROJECT_BRIEF,
  FETCH_DESIGNATION_LIST,
  FETCH_USER_PROFILE,
  CREATE_PROJECT,
  FETCH_PROJECT,
  TEMPLATE,
  TEMPLATE_PAGE
} from "../constant/backend_url";

import {
  LOGOUT,
  LOGIN,
  RESETPASSWORD_RESP,
  RESETPASSWORD,
  LOADING,
  SERVER_ERROR,
  SUPPORT_RESP,
  REGISTER_RESP,
  LOGIN_RESP,
  VALIDATEOTP_RESP,
  FLUSH_DATA,
  CLIENT_FETCH_RESP,
  HIDE_ERROR_MODAL,
  HIDE_SERVERSTATUS_MODAL,
  HIDE_PROJECT_SIDEBAR,
  HIDE_RESOURCES_SIDEBAR,
  SHOW_PROJECT_SIDEBAR,
  SHOW_RESOURCES_SIDEBAR,
  HIDE_LOADER,
  RESENDOTP_RESP,
  USER_FIELDMODE_SAVE_RESP,
  USER_FIELDMODE_FETCH_RESP,
  USER_FIELDMODE_DELETE_RESP,
  PROJECT_DETAILS_FETCH_RESP,
  PROJECT_DETAILS_POST_RESP,
  PROJECT_DETAILS_DELETE_RESP,
  PROJECT_BRIEF_FETCH_RESP,
  PROJECT_BRIEF_POST_RESP,
  PROJECT_BRIEF_DELETE_RESP,
  GET_EXISTING_PROJECT_RESP,
  USER_DESIGNATION_RESP,
  USER_DESIGNATION_FETCH_RESP,
  USER_DESIGNATION_CREATE_RESP
} from "../constant/types";

import * as actionTypes from "../constant/types";

//url
import * as URL from "../constant/backend_url";

// structure of this file
// - COMMON ACTION FUNCTIONS
//    - UTILITY LAYOUT ACTIONS
// - PAGEWISE ACTION FUNCTIONS
//    - CREATE PROJECT
// 
//    - PROJECT BRIEF



/********************************** START | COMMON ACTION FUNCTIONS ****************************************/ 


/************************ START | UTILITY LAYOUT ACTIONS ************************/
export const hideServerSucessModal = () => dispatch => {
  dispatch({ type: HIDE_ERROR_MODAL });
  dispatch({ type: HIDE_SERVERSTATUS_MODAL });
};

export const hideServerErrorModal = () => dispatch => {
  dispatch({ type: HIDE_ERROR_MODAL });
};

export const showProjectSidebar = () => dispatch => {
  dispatch({ type: SHOW_PROJECT_SIDEBAR });
};

export const hideProjectSidebar = () => dispatch => {
  dispatch({ type: HIDE_PROJECT_SIDEBAR });
};

export const hideSidebars = () => dispatch => {
  dispatch({ type: HIDE_PROJECT_SIDEBAR });
  dispatch({ type: HIDE_RESOURCES_SIDEBAR });
}

export const showResourcesSidebar = () => dispatch => {
  dispatch({ type: SHOW_RESOURCES_SIDEBAR });
};

export const hideResourcesSidebar = () => dispatch => {
  dispatch({ type: HIDE_RESOURCES_SIDEBAR });
};

export const pinProjectSidebar = () => dispatch => {
  dispatch({ type: "PIN_PROJECT_SIDEBAR" });
};

export const pinResSidebar = () => dispatch => {
  dispatch({ type: "PIN_RES_SIDEBAR" });
};

/************************ END | UTILITY LAYOUT ACTIONS ************************/

/************************* Start Template ***********************/
//Nrupali Coded..
export const NewTemplate = (body, token) => dispatch => {
  const url = `${SERVERBASEURL}${TEMPLATE}`;
  dispatch({
    type: LOADING
  });
  // const body = {
  //   "type":"project",
  //   "project_id":"5c8fa9d08b653e0f4e6a2101",
  //   "template_id":"5c90ae773a68955dc0096cfb"
  // }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    // dispatch({
    //   type: 'NEW_TEMPLATE',
    //   payload: res
    // })
  })
  .catch(err => console.log(err))


}

// START | FUNCTION TO GET DOCKED PROJECT'S (LATEST) DETAILS
// dockTheProject() - action function (to get details from backend and) to dock the project
// dockedProject - variable to store docked project's details
// undockTheProject() - action function to undock the project

export const dockTheProject = (body, token , successCall) => dispatch => {
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${FETCH_PROJECT}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      // dispatch the action to update store
      dispatch({
        type: 'DOCK_THE_PROJECT',
        payload: response
      });
      // successCall();
      console.log("DockTheProject Called =>",response);
      
      // dispatch({ type: actionTypes.GET_PROJECT, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      console.log("error in dockProject",error);
      
      dispatch({ type: HIDE_LOADER });
    });
}
// END | FUNCTION TO GET DOCKED PROJECT'S (LATEST) DETAILS



/********************************** END | COMMON ACTION FUNCTIONS ****************************************/ 


export const undockTheProject = () => dispatch => {
  dispatch({
    type: 'UNDOCK_THE_PROJECT'
  });
}



/********************************** END | COMMON ACTION FUNCTIONS ****************************************/ 




/********************************** START | PAGEWISE ACTION FUNCTIONS ****************************************/ 

/********************************** START | CREATE PROJECT (PAGE 1) ACTION FUNCTIONS ****************************************/ 
// START | ACTION/FUNCTION TO CREATE NEW PROJECT | url: createproject
export const projectDetails = (body, token) => dispatch => {
  console.log("createproject API called.");
  
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${CREATE_PROJECT}`;
  // alert("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.PROJECT_DETAILS_RESP,
        payload: response
      });

      dispatch({ type: HIDE_LOADER });

      if (response.status == 200) {
        dispatch({
          type: actionTypes.NEW_PROJECT,
          payload: response
        });

        dispatch({
          type: actionTypes.PROJECT_FLAG,
          payload: "CREATE"
        });
      }
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};

/********************************** START | PAGEWISE ACTION FUNCTIONS ****************************************/ 


// START | ACTION/FUNCTION TO EDIT PROJECT (PAGE 1)| url: editproject
export const editProjectDetails = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });
  const url = `${URL.SERVERBASEURL}${URL.EDIT_PROJECT}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.PROJECT_DETAILS_RESP,
        payload: response
      });

      dispatch({ type: HIDE_LOADER });
      if (response.status == 200) {
        dispatch({
          type: actionTypes.NEW_PROJECT,
          payload: null
        });
        dispatch({
          type: actionTypes.PROJECT_FLAG,
          payload: "EDIT"
        });
      }
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// END | ACTION/FUNCTION TO EDIT PROJECT (PAGE 1)| url: editproject


// START | ACTION/FUNCTION TO DELETE PROJECT (PAGE 1)| url: deleteproject
export const deleteProjectDetails = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });
  const url = `${URL.SERVERBASEURL}${URL.DELETE_PROJECT}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      let data = response;
      dispatch({
        type: actionTypes.PROJECT_DETAILS_RESP,
        payload: data
      });

      if (data.status == 200) {
        dispatch({
          type: actionTypes.NEW_PROJECT,
          payload: null
        });

        dispatch({
          type: actionTypes.PROJECT_FLAG,
          payload: "DELETE"
        });
      }

      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      // alert(JSON.stringify(error))
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// END | ACTION/FUNCTION TO DELETE PROJECT (PAGE 1)| url: deleteproject
/********************************** END | CREATE PROJECT (PAGE 1) ACTION FUNCTIONS ****************************************/ 


/************************** START | PROJECT BRIEF (PAGE 3) ACTION FUNCTIONS *************************/
// START | ACTION FUNCTION TO UPDATE PROJECT BRIEF | (projectupdate - creates template in db)
export const updateProjectBreif = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });
  // console.log(body)
  const url = `${URL.SERVERBASEURL}${URL.PROJECT_BREIF}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      // console.log(response)
      dispatch({
        type: actionTypes.PROJECT_DETAILS_RESP,
        payload: response
      });

      dispatch({ type: HIDE_LOADER });

      if (response.status == 200) {
        // dispatch({
        //   type:actionTypes.NEW_PROJECT,
        //   payload:null
        // })
        // dispatch({
        //   type:actionTypes.PROJECT_FLAG,
        //   payload:'DELETE'
        // })
      }
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// START | ACTION FUNCTION TO UPDATE PROJECT BRIEF 
/************************** END | PROJECT BRIEF (PAGE 3) ACTION FUNCTIONS *************************/




/********************************** END | PAGEWISE ACTION FUNCTIONS ****************************************/ 






























//auth
export const login = body => dispatch => {
  console.log(" login action call");
  let url = `${URL.SERVERBASEURL}${URL.LOGIN_URL}`;
  dispatch({
    type: LOADING
  });
  console.log("body" + JSON.stringify(body));
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: actionTypes.LOGIN, payload: response });

      dispatch({ type: LOGIN_RESP, payload: response });

      dispatch({ type: HIDE_LOADER });

      //  dispatch({  type: FLUSH_DATA
      //             })
    })
    .catch(e => {
      dispatch({
        type: SERVER_ERROR
      });
    });
};
export const alreadylogged = (auth) => dispatch => {
  console.log("IN reducer")
  console.log(auth)
  dispatch({
    type: "ALREADY_LOGGED_IN",
    payload: auth,

  })
}
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });

  dispatch({
    type: "FLUSH_LOGIN"
  });
};

export const register = body => dispatch => {
  console.log("register action call");
  // alert(JSON.stringify(body))
  dispatch({
    type: LOADING
  });

  let url = `${SERVERBASEURL}${REGISTER_URL}`;
  console.log(body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: REGISTER_RESP,
        payload: response
      });
    })
    .then(res => {
      dispatch({ type: HIDE_LOADER });
    })
    .catch(e => {
      dispatch({
        type: SERVER_ERROR
      });
    });
};

export const resetPassword = body => dispatch => {
  console.log("reset password action call");
  dispatch({
    type: LOADING
  });
  let url = `${SERVERBASEURL}${RESETPASSWORD_URL}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: RESETPASSWORD_RESP,
        payload: response
      });
      dispatch({
        type: RESETPASSWORD,
        payload: response
      });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(e => {
      dispatch({
        type: SERVER_ERROR
      });
    });
};

export const validateOtp = body => dispatch => {
  console.log("validate action call");
  let url = `${SERVERBASEURL}${VALIDATEOTP_URL}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: VALIDATEOTP_RESP,
        payload: response
      });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(e => {
      dispatch({
        type: SERVER_ERROR
      });
    });
};

export const resendOtp = body => dispatch => {
  console.log("reset password action call");
  dispatch({
    type: LOADING
  });

  // alert(JSON.stringify(body));
  let url = `${SERVERBASEURL}${RESETPASSWORD_URL}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: RESENDOTP_RESP,
        payload: response
      });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(e => {
      dispatch({
        type: SERVER_ERROR
      });
    });
};

export const support = body => dispatch => {
  console.log("support  action call");
  dispatch({
    type: LOADING
  });
  // alert(JSON.stringify(body))
  const url = `${SERVERBASEURL}${SUPPORT_URL}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: SUPPORT_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
};

//project dashboard core_

//////My Team///////
export const fetchUserFieldMode = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });

  dispatch({
    type: FLUSH_DATA
  });

  const url = `${SERVERBASEURL}${FETCH_USERFIELD_MODE}`;
  // alert(url)
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_FETCH_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
      // alert('suces')
    })
    .catch(error => {
      // alert('catch')
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};

export const postUserFieldMode = (body, token) => dispatch => {
  console.log("userFieldMode  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${CREATE_USERFIELD_MODE}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_SAVE_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
};

export const editUserFieldMode = (body, token) => dispatch => {
  // console.log('userFieldMode  action call');
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${EDIT_USERFIELD_MODE}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_SAVE_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
};

export const deleteUserFieldMode = (body, token) => dispatch => {
  console.log("deleteUserFieldMode  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${DELETE_USERFIELD_MODE}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_DELETE_RESP, payload: response });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

//////My Clients Actiosn ///////
export const fetchMyClients = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });
  dispatch({
    type: FLUSH_DATA
  });

  const url = `${URL.SERVERBASEURL}${URL.FETCH_MYCLIENTS}`;
  // alert(url)
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: CLIENT_FETCH_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
      // alert('suces')
    })
    .catch(error => {
      // alert('catch')
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};

export const postMyClients = (body, token) => dispatch => {
  console.log("userFieldMode  action call");
  dispatch({
    type: LOADING
  });
  const url = `${URL.SERVERBASEURL}${URL.CREATE_MYCLIENTS}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_SAVE_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
};

export const editMyClients = (body, token) => dispatch => {
  // console.log('userFieldMode  action call');
  dispatch({
    type: LOADING
  });
  const url = `${URL.SERVERBASEURL}${URL.EDIT_MYCLIENTS}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_SAVE_RESP, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
};

export const deleteMyClients = (body, token) => dispatch => {
  console.log("deleteUserFieldMode  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${DELETE_USERFIELD_MODE}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({ type: USER_FIELDMODE_DELETE_RESP, payload: response });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

/////PROJECT DETAIL ACTION////////
export const projectFetchDetailsForm = body => dispatch => {
  console.log("projectDetailsForm  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${FETCH_PROJECT_DETAILS}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response =>
      dispatch({ type: PROJECT_DETAILS_FETCH_RESP, payload: response })
    )
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

export const projectPostDetailsForm = body => dispatch => {
  console.log("projectDetailsForm  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${POST_PROJECT_DETAILS}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response =>
      dispatch({ type: PROJECT_DETAILS_POST_RESP, payload: response })
    )
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

export const projectDeleteDetailsForm = body => dispatch => {
  console.log("projectDetailsForm  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${DELETE_PROJECT_DETAILS}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response =>
      dispatch({ type: PROJECT_DETAILS_DELETE_RESP, payload: response })
    )
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

///////project breif////////
export const fetchProjectBriefForm = body => dispatch => {
  console.log("projectDetailsForm  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${FETCH_PROJECT_BRIEF}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response =>
      dispatch({ type: PROJECT_BRIEF_FETCH_RESP, payload: response })
    )
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

export const postProjectBriefForm = body => dispatch => {
  console.log("projectDetailsForm  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${POST_PROJECT_BRIEF}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response =>
      dispatch({ type: PROJECT_BRIEF_POST_RESP, payload: response })
    )
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

export const deleteProjectBriefForm = body => dispatch => {
  console.log("projectDetailsForm  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${DELETE_PROJECT_BRIEF}`;
  console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response =>
      dispatch({ type: PROJECT_BRIEF_DELETE_RESP, payload: response })
    )
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

//Manpower
export const fetchUserDesignationList = (body, token,isSuccessCall) => dispatch => {
  // console.log("fetchUserDesignationList  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${FETCH_DESIGNATION_LIST}`;
  // console.log(url);
  // console.log("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: USER_DESIGNATION_RESP,
        payload: response
      });
      dispatch({
        type: USER_DESIGNATION_FETCH_RESP,
        payload: response
      });
      isSuccessCall()
    })
    .catch(error =>{
      console.log("fetchUserDesignationList",error)
      dispatch({
        type: SERVER_ERROR
      })
    }
    );
  dispatch({ type: HIDE_LOADER });
};

//User_Profile

export const fetchUserProfile = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${FETCH_USER_PROFILE}`;
  // alert("feild mode ", body);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: "VIEWPROFILE",
        payload: response
      });
    })
    .catch(error =>
      dispatch({
        type: SERVER_ERROR
      })
    );
  dispatch({ type: HIDE_LOADER });
};

export const UndockProject = () => dispatch => {
  dispatch({
    type: "UNDOCK_PROJECT"
  });
};

//create project





export const updateProjectDocs = (body, token) => dispatch => {
  dispatch({
    type: LOADING
  });
  const url = `${URL.SERVERBASEURL}${URL.PROJECT_DOCS}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.PROJECT_DETAILS_RESP,
        payload: response
      });

      dispatch({ type: HIDE_LOADER });

      if (response.status == 200) {
        // dispatch({
        //   type:actionTypes.NEW_PROJECT,
        //   payload:null
        // })
        // dispatch({
        //   type:actionTypes.PROJECT_FLAG,
        //   payload:'DELETE'
        // })
      }
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};

/////EXISTING PROJECT SEARCH ACTION////////

// START | ACTION FUNCTION TO GET DETAILS OF ALL MY PROJECTS | url: projectlist
export const getExistingProject = (body, token) => dispatch => {
  // console.log("getExistingProject  action call");
  dispatch({
    type: LOADING
  });
  const url = `${SERVERBASEURL}${FETCH_PROJECT}`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_PROJECT_DETAILS_RESP,
        payload: response
      });
      dispatch({ type: actionTypes.GET_PROJECT, payload: response });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// END | ACTION FUNCTION TO GET DETAILS OF ALL MY PROJECTS | url: projectlist




export const dockProject = project => dispatch => {
  // alert(index)
  dispatch({
    type: "DOCK_PROJECT",
    payload: project
  });
};

export const projectTemplate = (body, token) => async dispatch => {
  // console.log("projectTemplate Action Call");
  let url = `${URL.SERVERBASEURL}${URL.PROJECT_TEMPLATE}`;
  dispatch({
    type: LOADING
  });
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.PROJECT_TEMPLATE_RESP,
        payload: response
      });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
export const login_stopped = (body) => dispatch => {
  dispatch({
    type: "LOGIN_STOPPED"
  })
}

// START | ACTION/FUNCTION SHOW TEMPLATE LIST FOR DEFAULT AND SAVED TEMPLATES | url: showtemplate
export const showTemplate = (body, token) => async dispatch => {
  // console.log("showTemplate Action Call");
  let url = `${SERVERBASEURL}${SHOW_TEMPLATE}`;
  dispatch({
    type: LOADING
  });

  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.SHOW_TEMPLATE_RESP,
        payload: response
      });
      console.log(response);
      
    })
    .then(res => {
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// END | ACTION/FUNCTION SHOW TEMPLATE LIST FOR DEFAULT AND SAVED TEMPLATES | url: showtemplate

/* export const templatePage = (body, token) => async dispatch => {
  console.log("templatePage Action Call");
  let url = `${URL.SERVERBASEURL}${URL.TEMPLATE_PAGE}`;
  dispatch({
    type: LOADING
  });

  let data = await Api(url, body, token)
   let data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  }) 
  console.log(data)
  .then(res => res.json()
  )
  .then(response => {
    console.log(data)
    dispatch({
      type: actionTypes.TEMPLATE_PAGE_RESP,
      payload: response
    });
  })
  .then(resposne => {
    dispatch({ type: HIDE_LOADER });
  })
  .catch(error => {
    dispatch({
      type: SERVER_ERROR
    });
    dispatch({ type: HIDE_LOADER });
  }); 
}; */
export const clearResetData = () => dispatch => {
  // console.log("TTTTTT")
  dispatch({
    type: "CLEAR_RESET_DATA"
  })
}

// START | ACTION FUNCTION TO GET TEMPLATE DATA FOR GIVEN PROJECT PLAN PAGE AND PROJECTID
export const templatePage = (body, token,isSuccessCall) => async dispatch => {
  console.log("templatePage Action Call",body);
  let url = `${SERVERBASEURL}${TEMPLATE_PAGE}`;
  dispatch({
    type: LOADING
  });
  try {
    let data = await Api(url, body, token)
    // data = await fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json",
    //     "access-token": token
    //   }
    // }) 
    // console.log(body)
    console.log("FFFFFF",data)
    if (body.sub_type == "Estimate") {
      dispatch({
        type: actionTypes.TEMPLATE_PAGE_RESP,
        payload: data,
      });
    } else {
      dispatch({
        type: "TEMPLATE_PAGE_RESP_EXEC",
        payload: data,
      });
    }
    dispatch({ type: HIDE_LOADER });
    isSuccessCall();
  }
  catch(error) {

    dispatch({
      type: SERVER_ERROR
    });
    dispatch({ type: HIDE_LOADER });
  }
};
// END | ACTION FUNCTION TO GET TEMPLATE DATA FOR GIVEN PROJECT PLAN PAGE AND PROJECTID

// START | FUNCTION TO SAVE EDITED ESTIMATION DATA || COMMON FOR BOTH DESIGN AND BUILD
export const editTemplate = (body, token) => async dispatch => {
  let url = `${URL.SERVERBASEURL}${URL.EDIT_TEMPLATE}`;
  dispatch({
    type: LOADING
  });
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {

      if(response.status === 200) {
        if(response.template_estmt_status === 'Close') {
          alert('The (Design) Estimation project plan has been submitted successfully');
        }
      }

      dispatch({
        type: actionTypes.EDIT_TEMPLATE_RESP,
        payload: response
      });

      // dispatch({
      //   type: actionTypes.TEMPLATE_PAGE_RESP,
      //   payload: response,
      // });
      
    })
    .then(res => {
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// END | FUNCTION TO SAVE EDITED ESTIMATION DATA || COMMON FOR BOTH DESIGN AND BUILD

// START | FUNCTION TO SAVE EDITED EXECUTION DATA || COMMON FOR BOTH DESIGN AND BUILD
export const editExecute = (body, token) => async dispatch => {
  console.log("editExecute Action Call");
  let url = `${URL.SERVERBASEURL}${URL.EDIT_EXECUTE}`;
  dispatch({
    type: LOADING
  });
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token
    }
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.EDIT_EXECUTE_RESP,
        payload: response
      });
      dispatch({ type: HIDE_LOADER });
    })
    .catch(error => {
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};
// END | FUNCTION TO SAVE EDITED EXECUTION DATA || COMMON FOR BOTH DESIGN AND BUILD

export const hideStatus = () => async dispatch => {
  dispatch({
    type: "HIDE_STATUS_RESP"
  })
}

export const createDesignation = (postData, token) => dispatch => {
  console.log("Action called createDesignation");
  console.log(postData);
  var designation = postData.designation.trim()
  postData.designation = designation.charAt(0).toUpperCase() + designation.slice(1);
  fetch("http://35.200.132.218:3009/manpowercreate", {
    method: "POST",
    headers: {
      "access-token": token,
      "content-type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: USER_DESIGNATION_CREATE_RESP,
        payload: response
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: SERVER_ERROR
      });
      dispatch({ type: HIDE_LOADER });
    });
};

export const deleteDesignation = (data, token) => dispatch => {
  console.log("In Delete Action deleteDesignation");
  console.log(data);
  fetch("http://35.200.132.218:3009/manpowerdelete", {
    method: "POST",
    headers: {
      "access-token": token,
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(post => console.log(post));
};
