import React, { Component } from "react";
import { connect } from "react-redux";
import Leftsidebar from "components/SideBar/left/leftsidebar";
import Rightsidebar from "components/SideBar/right/rightsidebar";
import * as actions from "actions/action_authentication";
import Navbar from "components/NavBar/Navbar";
import Footer from "components/Footer/Footer";
import HOC from "HOC/ProjectHOC";

import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import "../ProjectScope/style.css";
import ProjectRefForm from "./ProjectRefForm.jsx";
import ProjectSidebarModal from "Layout/ServerSucess/ProjectSidebarModal";
export class ProjectReference extends Component {
  state = {
    labels: [],
    editToggle: true,
    projectType: "new",
    template: "prj",
    templateData: "",
    Success: true
  };

  refreshSucess = () => {
    if (this.props.isServerStatus == 200) {
      let projectData = this.state.projectData;
      if (projectData.project_status == 1) {
        this.props.history.push(`/project_documents/${projectData.project_id}`);
        this.props.hideServerSucessModal();
      } else {
        this.props.hideServerSucessModal();
      }
    }
  };

  backToPrevPath = () => {
    this.props.history.push(
      `/project_brief/${this.state.projectData.project_id}`
    );
  };

  componentWillMount = () => {
    //this.props.getExistingProject({}, this.props.token);
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = projectUrl[2];
    let body = { project_id: projectId };
    this.props.dockTheProject(body, this.props.token);
  };

  componentWillReceiveProps = nextProps => {
    console.log("Gaurav3", nextProps);
    if (
      nextProps.dockedProject !== undefined &&
      nextProps.dockedProject !== null &&
      nextProps.dockedProject !== this.props.dockedProject
    ) {
      console.log("Gaurav2");
      console.log(nextProps.dockedProject);

      let dockedProject = nextProps.dockedProject;
      if (dockedProject.length > 0) {
        this.setState({
          projectData: dockedProject[0],
          editToggle: dockedProject[0].project_status == 3 ? false : true,
          projectType: dockedProject[0].project_status == 3 ? "new" : "old",
          labels:
            dockedProject[0].project_docs == null
              ? []
              : dockedProject[0].project_docs,
          invalidProject: dockedProject[0].project_status < 3 ? true : false
        });
      } else {
        this.setState({
          projectNotFound: true
        });
      }
    }
  };
  hideSuccess = () => {
    this.setState({
      Success: false
    });
  };
  projectRefForm = () => {
    if (this.state.projectData != null && this.state.projectData != undefined) {
      if (this.state.projectData.project_status >= 3) {
        return (
          <ProjectRefForm
            labels={this.state.labels}
            projectData={this.state.projectData}
            projectType={this.state.projectType}
            editToggle={this.state.editToggle}
            templateData={this.state.templateData}
            history={this.props.history}
            hideSuccess={this.hideSuccess}
          />
        );
      } else {
        return (
          <ProjectSidebarModal
            modalHeader={"Please Complete Project Brief First "}
            modalCase={400}
            click={this.backToPrevPath}
          />
        );
      }
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

  backToLandingPage = () => {
    this.props.history.push("/my_projects");
  };

  render() {
    return (
      <div className="projectbrief__main">
        <Navbar />
        {this.props.isServerError ? (
          <ServerError click={this.props.hideServerErrorModal} />
        ) : null}
        {this.props.isServerStatus && this.state.Success == true ? (
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
        <Leftsidebar
          history={this.props.history}
          project_current={this.state.projectData}
        />
        <Rightsidebar history={this.props.history} />
        {this.projectRefForm()}
        <div className="projectbrief__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.utilityLayout.isLoading,
  isServerError: state.utilityLayout.isServerError,
  isServerStatus: state.serverStatus.projectDetailStatus,
  isServerMessage: state.serverStatus.projectDetailMessage,
  projectData: state.projectData.project,
  isDock: state.projectData.dockProject,
  templateList: state.projectData.templateData,
  auth: state.auth,
  dockedProject: state.projectData.dockedProject,
  newProject: state.projectData.newProject,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  actions
)(HOC(ProjectReference));
