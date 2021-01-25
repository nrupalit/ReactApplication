import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/action_authentication";
import cx from "classnames";
//component
import Navbar from "../../../components/NavBar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Leftsidebar from "./../../../components/SideBar/left/leftsidebar";
import Rightsidebar from "./../../../components/SideBar/right/rightsidebar";
//utis
import Backdrop from "../../../Layout/Backdrop/Backdrop";
import Spinner from "../../../Layout/Spinner/Spinner";
import ServerError from "../../../Layout/ServerError/ServerError";
import ServerStatus from "../../../Layout/ServerSucess/ServerStatus";
import ProjectLoadStatus from "../../../Layout/ServerSucess/ProjectSidebarModal";
//css
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
import styles from "./existproject.module.css";
//core component
import ProjectsCard from "./ProjectsCard";
import HOC from "HOC/ProjectHOC";

class ExistingProjectView extends Component {
  state = {
    check: false,
    projectData: null,
    projectNotFound: false
  };

  projectCard = () => {
    if (this.state.projectData != null) {
      if (this.state.projectNotFound == false) {
        return this.state.projectData.map((formval, index) => {
          return (
            <ProjectsCard
              formval={formval}
              onEdit={"sd"}
              dock={this.dock}
              index={index}
              projectId={formval.project_id}
              key={index}
            />
          );
        });
      } else {
        return (
          <ProjectLoadStatus
            modalHeader={"No Project Found Please Create New Project"}
            modalCase={300}
            click={this.projectNotFound}
          />
        );
      }
    }
  };

  projectNotFound = () => {
    this.setState({
      projectNotFound: false
    })
    this.props.history.push('/create_project/new')
  }

  dock = (index, projectId) => e => {
    e.preventDefault();
    if (this.props.SideBarProject.length == 0) {
      console.log(this.state.projectData[index])
      const bodydata = {
        project_id: this.state.projectData[index]._id,
        prj_type: this.state.projectData[index].project_type,
        sub_type: "Estimate"
      };
      const bodydata1 = {
        project_id: this.state.projectData[index]._id,
        prj_type: this.state.projectData[index].project_type,
        sub_type: "Execute"
      };
      this.props.dockProject(this.state.projectData[index]);
      console.log('here it is ');
      // Nrupali Edited
      // this.props.templatePage(bodydata, this.props.token)
      //this.props.templatePage(bodydata1, this.props.token)
      this.props.history.push(
        `/create_project/${this.state.projectData[index].project_id}`
      );
    } else {
      let check = this.props.SideBarProject.find(project => {
        return project.project_id === this.state.projectData[index].project_id;
      });

      if (check == null || check == undefined) {
        this.setState({
          loadDiffError: true,
          loadErrorMsg: `A Project is already open Please close Current Project  to open a  Project Id : ${
            this.state.projectData[index].project_id
            }`
        });
      } else {
        this.setState({
          loadError: true,
          loadErrorMsg: `Project  is Already Open `
        });
      }
    }
  };

  componentDidMount = () => {
    // this.setState({ projectData: this.props.projectData });
    this.props.getExistingProject({}, this.props.token);
  };

  componentWillReceiveProps(props) {
    if (props.projectData != null) {
      if (props.projectData.length > 0) {
        this.setState({ projectData: props.projectData });
      } else {
        this.setState({
          projectData: [],
          projectNotFound: true
        });
      }
    }
    return null;
  }

  clearLoadErrorModal = () => {
    this.setState({
      loadError: null,
      loadDiffError: null
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Leftsidebar history={this.props.history} />
        <Rightsidebar history={this.props.history} />
        {this.state.loadDiffError != null ? (
          <ProjectLoadStatus
            modalHeader={this.state.loadErrorMsg}
            modalCase={300}
            click={this.clearLoadErrorModal}
          />
        ) : null}
        {this.state.loadError != null ? (
          <ServerStatus
            modalHeader={this.state.loadErrorMsg}
            modalCase={300}
            click={this.clearLoadErrorModal}
          />
        ) : null}
        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}
        <div onClick={this.props.hideProjectSideBar}>
          <div
            style={{ minWidth: "97 vh" }}
            className={cx(Bootstrap.container, styles.searchProject__wrapper)}
            onClick={this.props.hideProjectSideBar}
          >
            <div className={cx(Bootstrap.row, styles.searchProject__mainbody)}>
              {this.projectCard()}
            </div>
          </div>
          <div className={styles["projectsearch__footer"]}>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.userFieldModeSaveStatus,
    isServerMsg: state.serverStatus.userFieldModeSaveMessage,
    projectData: state.projectData.project,
    SideBarProject: state.projectData.dockProject,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  actions
)(HOC(ExistingProjectView));
