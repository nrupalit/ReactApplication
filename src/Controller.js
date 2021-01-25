import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import * as actions from "actions/action_authentication";

// Route Components
import Manage from './containers/Manage/ProjectLanding/Manage';
import ProjectSearch from './containers/Manage/ExistingProjectView/ExistingProjectView';

import ProjectDetails from './containers/Manage/ProjectDetails/CreateForm';
import ProjectScope from './containers/Manage/ProjectScope/ProjectScope';
import ProjectBrief from './containers/Manage/ProjectBrief/projectbrief';
import ProjectDocuments from './containers/Manage/ProjectReference/ProjectReference';
import Estimation from './containers/Grid/Estimation/Estimation';
import Execution from './containers/Grid/Execution/Execution';

import DesignEstimation from './containers/Grid2/DesignEstimation';
import DesignExecution from './containers/Grid2/DesignExecute';


import DashBoard from './containers/Dashboard/DashBoard';
import FeildMode from "./containers/Manage/FeildMode/FeildMode";
import ManpowerGCO from './containers/Manage/ProjectManpowerGCO/ManpowerGCO';
import MyClients from "./containers/Manage/MyClients/FeildMode";

import Error from './Layout/404NotFound/404';

// import ProjectManpowerSchedule from './containers/Manage/ProjectManpowerSchedule/ProjectManpowerSchedule';
// import ProjectManpowerMain from './containers/Manage/ProjectManpowerMain/ProjectManpowerMain';

export class Controller extends Component {
  isAuthenticated = () => {
    if (this.props.auth != null) {
      return (
        <>
          <Route path="/landing_page" exact component={Manage} />
          <Route path="/my_projects" exact component={ProjectSearch} />

          <Route path="/create_project/:project_id" exact component={ProjectDetails} />
          <Route path="/project_scope/:project_id" exact component={ProjectScope} />
          <Route path="/project_brief/:project_id" exact component={ProjectBrief} />
          <Route path="/project_documents/:project_id" exact component={ProjectDocuments} />
          <Route path="/project_plan/estimation/:project_id" exact component={Estimation} />
          <Route path="/project_plan/execution/:project_id" exact component={Execution} />

          <Route path="/project_plan/design_estimation/:project_id" exact component={DesignEstimation} />
          <Route path="/project_plan/design_execution/:project_id" exact component={DesignExecution} />
          {/* <Route path="/project_plan/design_execution/:project_id" exact component={DesignExecution} />
          <Route path="/project_plan/build_estimation/:project_id" exact component={BuildEstimation} />
          <Route path="/project_plan/build_execution/:project_id" exact component={BuildExecution} /> */}

          <Route path="/viewprofile" exact component={DashBoard} />
          <Route path="/team_members" component={FeildMode} />
          <Route path="/manpowergco" exact component={ManpowerGCO} />
          <Route path="/my_clients" exact component={MyClients} />

          {/* <Route path="/Grid" exact component={Estimation}/>   */}
          {/* <Route
            path="/manpowerschedule"
            exact
            component={ProjectManpowerSchedule}
          /> */}
          {/* <Route path="/manpower" exact component={ProjectManpowerMain} /> */}
        </>
      );
    } else {
      return (<>
             <Route path='/' component={Error}/>
         </>)
    }
  };
  render() {
    return <>{this.isAuthenticated()}</>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  actions
)(Controller);
