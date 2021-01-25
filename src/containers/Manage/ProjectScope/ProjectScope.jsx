import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "actions/action_authentication";

import Navbar from "../../../components/NavBar/Navbar";
import Footer from "../../../components/Footer/Footer";
import LeftSideBar from "../../../components/SideBar/left/leftsidebar";
// import RightSIdeBar from "../../../components/SideBar/right/rightsidebar";
import "./projectscope.css";
import RightSidebar from "../../../components/SideBar/right/rightsidebar";

// import { LargeButton } from "Layout/styled component/Button";
import ProjectScopeForm from "./ProjectScopeForm.js";
import ProjectSidebarModal from "Layout/ServerSucess/ProjectSidebarModal";
import HOC from "HOC/ProjectHOC";
import "./projectscoperadio.css";
import "./style.css";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";

var dropdown = {
  position: "relative",
  display: "inline-block"
};

class ProjectScope extends Component {
  state = {};

  /* componentDidMount = () => {
    this.props.getExistingProject({}, this.props.token);
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.projectData !== null &&
      nextProps.projectData != this.props.projectData
    ) {
      let projectUrl = this.props.history.location.pathname.split("/");
      let projectId = projectUrl[2];
      let projectData = nextProps.projectData.filter(project => {
        if (project.project_id == projectId) {
          return project;
        }
      });

      if (projectData.length > 0) {
        if (projectData[0].project_status == 1) {
          projectData[0].project_category = "Residential";
          projectData[0].project_type = "Design";
          projectData[0].project_subcategory = "House Villa";
          projectData[0].project_subtype = "Room";
        }

        // alert(JSON.stringify(projectData[0]));
        this.setState({
          projectData: projectData[0],
          editToggle: projectData[0].project_status == 1 ? false : true,
          projectType: projectData[0].project_status == 1 ? "new" : "old"
        });
      } else {
        this.setState({
          projectNotFound: true
        });
      }
    }
  }; */

  componentDidMount = () => {
    //this.props.getExistingProject({}, this.props.token);
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = projectUrl[2];
    let body = { project_id: projectId };
    this.props.dockTheProject(body, this.props.token);
    let ProjectDatas = {};
    ProjectDatas = this.state.newProject;
    console.log(ProjectDatas);
    
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.dockedProject !== null &&
      nextProps.dockedProject != this.props.dockedProject
    ) {
      let dockedProject = nextProps.dockedProject;
      console.log("dockerProject ID");
      console.log(dockedProject[0]._id);
      console.log("dockerProject ID");
      if (dockedProject.length > 0) {
        if (dockedProject[0].project_status == 1) {
          dockedProject[0].project_category = "Residential";
          dockedProject[0].project_type = "Design";
          dockedProject[0].project_subcategory = "House Villa";
          dockedProject[0].project_subtype = "Room";
        }

        // alert("DockProject called", JSON.stringify(dockedProject[0][0]));
        this.setState({
          projectData: dockedProject[0],
          editToggle: dockedProject[0].project_status == 1 ? false : true,
          projectType: dockedProject[0].project_status == 1 ? "new" : "old"
        });
      } else {
        this.setState({
          projectNotFound: true
        });
      }
    }
  };

  formLayout = () => {
    if (
      this.state.projectData !== null &&
      this.state.projectData !== undefined
    ) {
      return (
        <ProjectScopeForm
          formdata={this.state.projectData}
          projectType={
            this.state.projectData.project_status == 1 ? "new" : "old"
          }
          history={this.props.history}
        />
      );
    } else if (this.state.projectNotFound == true) {
      return (
        <ProjectSidebarModal
          modalHeader={"Project Not Found "}
          modalCase={400}
          click={this.backToLandingPage}
        />
      );
    }
  };

  refreshSucess = () => {
    if (this.props.isServerStatus == 200) {
      let projectData = this.state.projectData;
      if (projectData.project_status == 1) {
        this.props.hideServerSucessModal();
        this.props.history.push(`/project_brief/${projectData.project_id}`);
      } else {
        this.props.hideServerSucessModal();
        window.location.reload(); // this.props.getExistingProject({}, this.props.token);
      }
    } else {
      this.props.hideServerSucessModal();
    }
  };

  backToLandingPage = () => {
    this.props.history.push("/my_projects");
  };

  render() {
    return (
      <div>

        {/* {console.log(this.state.ProjectDatas)} */}
        <Navbar />
        <LeftSideBar
          history={this.props.history}
          project_current={this.state.projectData}
        />
        <RightSidebar history={this.props.history} />
        {this.props.isServerError ? (
          <ServerError click={this.props.hideServerErrorModal} />
        ) : null}
        {this.props.isServerStatus ? (
          <ServerStatus
            modalHeader={this.props.isServerMessage}
            modalCase={this.props.isServerStatus}
            click={this.refreshSucess}
          />
        ) : null}
        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}

        <div
          style={{ minHeight: "90vh" }}
          onClick={this.props.hideProjectSideBar}
        >
          {this.formLayout()}
        </div>
        <Footer />
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    projectData: state.projectData.project,
    isDock: state.projectData.dockProject,
    dockedProject: state.projectData.dockedProject,
    // auth: state.auth,
    newProject: state.projectData.newProject,
    token: state.auth.token
  };
};

export default HOC(
  connect(
    mapStateToProps,
    actions
  )(ProjectScope)
);
