import React, { Component } from "react";
import { connect } from "react-redux";

// ACTIONS (from redux) used on this page: dockProject(), UndockProject(), hideServerSucessModal(), hideServerErrorModal(), hideProjectSideBar(), getExistingProject()
// import * as actions from "actions/action_authentication";
import { dockProject, UndockProject, hideServerSucessModal, hideServerErrorModal, hideProjectSidebar as hideProjectSideBar, getExistingProject } from "actions/action_authentication";
//component
import LeftSideBar from "components/SideBar/left/leftsidebar";
import RightideBar from "components/SideBar/right/rightsidebar";
import Navbar from "components/NavBar/Navbar";
import Footer from "components/Footer/Footer";
//styles
import styles from "./projectdetails.module.css";
//inner component
import Create from "./create";
import HOC from "HOC/ProjectHOC";
import ServerError from "Layout/ServerError/ServerError";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import ProjectSidebarModal from "Layout/ServerSucess/ProjectSidebarModal";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";

class CreateForm extends Component {
  state = {
    formval: {
      project_id: "",
      project_name: "",
      project_description: "",
      client_mobile: "",
      client_email: "",
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
    check: false,
    projectData: null
  };

  
  // START | FUNCTION TO SHOW FORM BASED ON DIFFERENT CONDITIONS
  formLayout = () => {
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = projectUrl[2];

    let isDock = this.props.isDock.length == 0 ? false : true;
    if (
      (isDock == true && projectId !== "new") ||
      (isDock == false && projectId == "new")
    ) {
      if (projectId == "new") {
        return <Create formdata={this.state.formval} type="new" />;
      } else {
        if (this.state.projectData == null) {
          return null;
        } else {
          // Out of all all projects' data, get data for only projectId's project
          let projectData = this.state.projectData.filter(project => {
            if (project.project_id == projectId) {
              return project;
            }
            // else alert('This project id do not exist yet'). Redirect to my projects OR remove edit and delete btn
          });
          return (
            <Create
              formdata={projectData[0]}
              history={this.props.history}
              type="existing"
            />
          );
        }
      }
    } else {
      return (
        <ProjectSidebarModal
          modalHeader={
            "Please close current project from sidebar to create new project"
          }
          modalCase={300}
          click={this.backToPrevPath}
        />
      );
    }
  };
  // END | FUNCTION TO SHOW FORM BASED ON DIFFERENT CONDITIONS

  componentWillMount = () => {
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = projectUrl[2];
    // Through this.props.projectData we are getting details of all projects.
    this.setState({
      projectData: this.props.projectData,
      projectType: projectId == "new" ? "new" : projectId,
      projectFlag: projectId == "new" ? "CREATE" : "EDIT"
    });

    // WHY TO GET ALL EXISTING PROJECTS' DATA, WHEN ONLY ONE PROJECT IS OPENED??
    // 400 bad request error is coming
    // this.props.getExistingProject({}, this.props.token);

  };

  componentWillReceiveProps = nextProps => {
    let projectUrl = nextProps.history.location.pathname.split("/");
    let projectId = projectUrl[2];
    this.setState({
      projectType: projectId == "new" ? "new" : projectId
    });

    if (nextProps.newProjectData !== null && this.props.newProjectData !== nextProps.newProjectData) {
      this.setState({
        newProjectData: nextProps.newProjectData
      });
    }
    if (nextProps.projectFlag !== null) {
      this.setState({
        projectFlag: nextProps.projectFlag
      })
    }

    if (nextProps.projectData !== null && nextProps.projectData !== this.props.projectData) {
      this.setState({
        projectData: nextProps.projectData
      })
    }

  };

  backToPrevPath = () => {
    window.history.back();
  };

  // START | FUNCTION TO HANDLE CLOSE BUTTON ON SUCCESS MODAL
  successFunction = () => {
    let projectFlag = this.state.projectFlag;
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = projectUrl[2];
    if (this.props.isServerStatus == 200) {
      projectFlag = this.state.projectFlag;
      if (projectFlag == "CREATE") {
        this.props.hideServerSucessModal();
        let projectId = this.state.newProjectData.project_id;
        // go to next page
        this.props.history.push(`/project_scope/${projectId}`);
        this.props.dockProject(this.state.newProjectData);
      }
      else if (projectFlag == "EDIT") {
        this.props.hideServerSucessModal();
        this.props.history.push(`/project_scope/${projectId}`);
      }
      else {
        this.props.history.push(`/my_projects`);
        this.props.hideServerSucessModal();
        this.props.UndockProject();
      }

    } else {
      this.props.hideServerSucessModal();
    }
  }
  // END | FUNCTION TO HANDLE CLOSE BUTTON ON SUCCESS MODAL

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <LeftSideBar history={this.props.history} />
        <RightideBar history={this.props.history} />
        {this.props.isServerError ? (
          <ServerError click={this.props.hideServerErrorModal} />
        ) : null}
        {this.props.isServerStatus ? (
          <ProjectSidebarModal
            modalHeader={this.props.isServerMessage}
            modalCase={this.props.isServerStatus}
            click={this.successFunction}
          />
        ) : null}
        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}

        <div
          className={styles["projectdetails__wrapper"]}
          onClick={this.props.hideProjectSideBar}
        >
          {this.formLayout()}
          <div
            style={{
              margin: "0 25px"
            }}
          />
        </div>
        <Footer />
      </React.Fragment>
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
    projectFlag: state.projectData.projectFlag,
    // auth: state.auth,
    newProjectData: state.projectData.newProject,
    token: state.auth.token
  };
};

export default HOC(
  connect(
    mapStateToProps,
    {dockProject, UndockProject, hideServerSucessModal, hideServerErrorModal, hideProjectSideBar, getExistingProject}
  )(CreateForm)
);