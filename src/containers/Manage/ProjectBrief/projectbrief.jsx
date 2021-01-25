import React, { Component } from "react";
import Navbar from "./../../../components/NavBar/Navbar";
import "./projectbrief.css";
import Leftsidebar from "./../../../components/SideBar/left/leftsidebar";
import Rightsidebar from "./../../../components/SideBar/right/rightsidebar";
import HOC from "HOC/ProjectHOC";
import ProjectbriefForm from "./ProjectbriefForm";
import { connect } from "react-redux";
// ACTIONS (from redux) used on this page: getExistingProject(), hideProjectSideBar(), hideServerErrorModal(), hideServerSucessModal()
// import * as actions from "actions/action_authentication";
import { dockTheProject, hideProjectSidebar as hideProjectSideBar, hideServerErrorModal, hideServerSucessModal } from "actions/action_authentication";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import ProjectSidebarModal from "Layout/ServerSucess/ProjectSidebarModal";

class ProjectBrief extends Component {
  state = {
    editToggle: true
  };

  componentDidMount = () => {
    // this.props.getExistingProject({}, this.props.token);
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = projectUrl[2];
    let bodydata2 = { project_id: projectId };
    this.props.dockTheProject(bodydata2, this.props.token);
  };

  componentWillReceiveProps = nextProps => {
    
    if(nextProps.dockedProject !== null && nextProps.dockedProject !== this.props.dockedProject) {
      let { dockedProject } = nextProps;
      if(dockedProject.length > 0) {
        this.setState({
          dockedProject: dockedProject[0],
          editToggle: dockedProject[0].project_status == 2 ? false : true,
          projectType: dockedProject[0].project_status == 2 ? "new" : "old"
        });
      } else {
        this.setState({ projectNotFound: true });
      }
    }

  };


  backToPrevPath = () => {
    this.props.history.push(`/project_scope/${this.state.dockedProject.project_id}`)
  };


  projectBriefForm = () => {
    if (this.state.dockedProject !== null && this.state.dockedProject !== undefined) {
      if ( this.state.dockedProject.project_status >= 2) {
        return (
          <ProjectbriefForm
            formdata={this.state.dockedProject}
            projectType={
              this.state.dockedProject.project_status == 2 ? "new" : "old"
            }
            history={this.props.history}
          />
        );
      }
      else {
        return (
          <ProjectSidebarModal
            modalHeader={"Please Complete Project Scope First "}
            modalCase={400}
            click={this.backToPrevPath}
          />
        )
      }
    }
    else if (this.state.projectNotFound == true) {
      return <ProjectSidebarModal
        modalHeader={"Project Not Found "}
        modalCase={400}
        click={this.backToLandingPage}
      />
    }
  };

  // START | FUNCTION TO HANDLE CLOSE OF SERVER STATUS MODAL
  refreshSucess = () => {
    if (this.props.isServerStatus == 200) {
      let dockedProject = this.state.dockedProject;
      if (dockedProject.project_status == 2) {
        this.props.hideServerSucessModal();
        this.props.history.push(`/project_documents/${dockedProject.project_id}`);
      } else {
        this.props.hideServerSucessModal();
        window.location.reload();
      }
    } else {
      this.props.hideServerSucessModal();
    }
  };
  // END | FUNCTION TO HANDLE CLOSE OF SERVER STATUS MODAL

  backToLandingPage = () => {
    this.props.history.push('/my_projects')
  }



  render() {
    return (
      <>
        <Leftsidebar history={this.props.history} project_current={this.state.dockedProject} />
        <Rightsidebar history={this.props.history} />
        <div className="projectbrief__main" onClick={this.props.hideProjectSideBar}>
          <Navbar />

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

          {this.projectBriefForm()}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    dockedProject: state.projectData.dockedProject,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  { dockTheProject, hideProjectSideBar, hideServerErrorModal, hideServerSucessModal }
)(HOC(ProjectBrief));