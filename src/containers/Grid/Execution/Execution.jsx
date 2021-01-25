import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectPlanExecution from "./ProjectPlanExecution";
import Navbar from "components/NavBar/Navbar";
import LeftSidebar from "components/SideBar/left/leftsidebar.jsx";
import RightSidebar from "components/SideBar/right/rightsidebar.jsx";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import "../Estimation/estimation.css";

import HOC from "HOC/ProjectHOC";
var tabContainer = {
  width: "100%",
  //marginLeft: "0",
  // marginRight: "15%",
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
    tempData: {}
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
    var bodydata
    const dockProject = this.props.isDock[0];
    if (dockProject.project_type == "Design and Build") {
      bodydata = {
        project_id: dockProject._id,
        prj_type: "Design",
        sub_type: "Execute"
      };
    }
    else {
      bodydata = {
        project_id: dockProject._id,
        prj_type: dockProject.project_type, //,
        sub_type: "Execute"
      };
    }
    window.addEventListener("scroll", this.handleScroll);
    this.props.templatePage(bodydata, this.props.token);

    this.parseData()
    console.log(this.props);
    /* if (this.props.templateTable != undefined) {
      console.log("AAAAb");
      console.log(this.props.templateTable)
      if (this.props.templateTable.template) {
        let tempData = JSON.parse(this.props.templateTable.template);
        this.setState({
          tempData: JSON.parse(this.props.templateTable.template)
        });
      }
    } */
  };
  parseData = () => {
    console.log("RRRR")
    console.log(this.props.templateTable)
    if (this.props.templateTable && this.props.templateTable.template) {
      let tempData = this.props.templateTable.template
        ? JSON.parse(this.props.templateTable.template)
        : null;
      this.setState({
        tempData
      });
    }
  }
  componentDidMount() {
    var bodydata
    const dockProject = this.props.isDock[0];
    if (dockProject.project_type == "Design and Build") {
      bodydata = {
        project_id: dockProject._id,
        prj_type: "Design",
        sub_type: "Execute"
      };
    }
    else {
      bodydata = {
        project_id: dockProject._id,
        prj_type: dockProject.project_type, //,
        sub_type: "Execute"
      };
    }
    window.addEventListener("scroll", this.handleScroll);
    this.props.templatePage(bodydata, this.props.token);
    this.props.fetchUserDesignationList({}, this.props.token);
    if (this.props.templateTable != undefined) {
      console.log("AAAA");
      let tempData = JSON.parse(this.props.templateTable.template);

      this.setState({
        tempData
      });
    }
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

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    console.log("the scroll things", event);
  };

  render() {
    // let screen = document.body.style.width;
    let tempData = this.state;
    console.log(this.state);
    console.log("ZZZZZ");
    /* if (tempData.tempData.columns.length < 12) {
      window.location.reload()
    } */

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
          style={{
            ...tabContainer,
            marginLeft: this.props.projectToggle ? "15%" : "",
            width: this.props.projectToggle ? "85%" : "100%",
            position: "relative",
            left: this.props.isProjectSidebar ? "50px" : ""
          }}
          onClick={this.props.hideProjectSideBar}
        >
          {/* <!-- Nav tabs --> */}
          <ul
            className="nav"
            role="tablist"
            style={{
              borderColor: "white",
              height: "40px",
              boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
              marginBottom: "25px",
              marginLeft: "10px"
            }}
          >
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#eschedule"
                style={{ height: 44, fontSize: 19 }}
                id="navlinkshow"
              >
                Schedule
              </a>
            </li>
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link"
                data-toggle="tab"
                href="#emanpower"
                id="navlinkshow"
                style={{ height: 44, fontSize: 19 }}
              >
                Manpower
              </a>
            </li>
          </ul>

          {/* <!-- Tab panes --> */}
          <div className="tab-content" style={{ border: "none" }}>
            <div
              id="eschedule"
              className="tab-pane active"
              style={{
                ...grid,
                position: "relative"
              }}
            >
              <ProjectPlanExecution
                eschedule
                data={this.state.tempData}
                isProjectSidebar={this.props.isProjectSidebar}
              />
            </div>
            <div
              id="emanpower"
              className="tab-pane fade"
              style={{
                ...grid,
                position: "relative"
              }}
            >
              <ProjectPlanExecution
                emanpower
                data={this.state.tempData}
                isProjectSidebar={this.props.isProjectSidebar}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("XXXX");
  console.log(state);
  return {
    isLoading: state.utilityLayout.isLoading,
    isProjectSidebar: state.utilityLayout.projectSidebar,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    projectData: state.projectData.project,
    templateTable: state.projectData.templatePageExec,
    isDock: state.projectData.dockProject,
    auth: state.auth,
    newProject: state.projectData.newProject,
    token: state.auth.token
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HOC(Tabs));
