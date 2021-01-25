import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectPlan from "./ProjectPlan";
import Navbar from "components/NavBar/Navbar";
import LeftSidebar from "components/SideBar/left/leftsidebar.jsx";
import RightSidebar from "components/SideBar/right/rightsidebar.jsx";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import HOC from "HOC/ProjectHOC";

var tabContainer = {
  width: "100%",
  padding: "25px",
  marginTop: "30px"
};
var tabStyle = {
  width: 200,
  fontFamily: "Helvetica"
};

var grid = {
  overflowX: "auto",
  overflowY: "hidden",
  marginLeft: "10px"
};
class Tabs extends Component {
  state = {
    tempData: "",
  };

  refreshSucess = () => {
    if (this.props.isServerStatus == 200) {
      let projectData = this.state.projectData;
      if (projectData.project_status == 1) {
        this.props.history.push(`/project_plan/${projectData.project_id}`);
        this.props.hideServerSucessModal();
      } else {
        this.props.hideServerSucessModal();
        window.location.reload();
      }
    }
  };

  backToPrevPath = () => {
    this.props.history.push(
      `/project_brief/${this.state.projectData.project_id}`
    );
  };

  componentWillMount = () => {
    const dockProject = this.props.isDock[0];
    const bodydata = {
      project_id: dockProject._id,
      prj_type: "plan"
    };
    this.props.templatePage(bodydata, this.props.token);
    let tempData = JSON.parse(this.props.templateTable.template);
    this.setState({
      tempData
    });
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.projectData !== null &&
      nextProps.projectData !== undefined &&
      nextProps.projectData !== this.props.projectData
    ) {
      let projectUrl = this.props.history.location.pathname.split("/");
      let projectId = projectUrl[2];
      let projectData = nextProps.projectData.filter(project => {
        if (project.project_id == projectId) {
          return project;
        }
      });
      if (projectData.length > 0) {
        this.setState({
          projectData: projectData[0],
          editToggle: projectData[0].project_status < 5 ? false : true,
          projectType: projectData[0].project_status < 5 ? "new" : "old",
          labels:
            projectData[0].project_docs == null
              ? []
              : projectData[0].project_docs,
          invalidProject: projectData[0].project_status < 4 ? true : false
        });
      } else {
        this.setState({
          projectNotFound: true
        });
      }
    }
  };

  render() {
    // let screen = document.body.style.width;
    let tempData = this.state
    return (
      <div>
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

        <LeftSidebar history={this.props.history} />
        <RightSidebar history={this.props.history} />
        <div
          style={tabContainer}
          onClick={this.props.hideProjectSideBar}
        >
          {/* <!-- Nav tabs --> */}
          <ul
            className="nav"
            role="tablist"
            style={{
              borderColor: "white",
              height: 30,
              boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
              marginBottom: "25px",
              marginLeft: "20px"
            }}
          >
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#schedule"
                style={{ paddingTop: "0px" }}
              >
                Schedule
              </a>
            </li>
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link"
                data-toggle="tab"
                href="#manpower"
                style={{ paddingTop: "0px" }}
              >
                Manpower
              </a>
            </li>
          </ul>

          {/* <!-- Tab panes --> */}
          <div className="tab-content" style={{ border: "none" }}>
            <div id="schedule"
            className="tab-pane active"
              style={grid}
            >
              <ProjectPlan schedule data={this.state.tempData}/>
            </div>
            <div id="manpower" className="tab-pane fade" style={grid}>
              <ProjectPlan manpower data={this.state.tempData} />
            </div>
            <div id="material" className="container tab-pane fade" style={grid}>
              <p />
            </div>
            <div id="jobwork" className="container tab-pane fade">
              <p />
            </div>
            <div id="tools" className="container tab-pane fade">
              <p />
            </div>
          </div>
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
  templateTable: state.projectData.templatePage,
  isDock: state.projectData.dockProject,
  auth: state.auth,
  newProject: state.projectData.newProject,
  token: state.auth.token
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HOC(Tabs));
