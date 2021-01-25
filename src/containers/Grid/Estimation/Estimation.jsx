import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectPlanEstimation from "./ProjectPlanEstimation";
import Navbar from "components/NavBar/Navbar";
import LeftSidebar from "components/SideBar/left/leftsidebar.jsx";
import RightSidebar from "components/SideBar/right/rightsidebar.jsx";
import * as actions from "actions/action_authentication";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import "./estimation.css";
import "../style.scss";
import HOC from "HOC/ProjectHOC";
var tabContainer = {
  //width: "100%",
  padding: "25px",
  marginTop: "30px",
  //overflowX: "scroll !important"
};
var tabStyle = {
  width: 200,
  fontFamily: "Helvetica",

};

var grid = {
  width: "100%",
  //overflowX: "scroll",
  //overflowY: "hidden",
  marginLeft: "10px"
};
class Estimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: "empty",
      tempData: {
        Rows: []
      }
    };
    const dockProject = this.props.isDock[0];
    const bodydata = {
      project_id: dockProject._id,
      prj_type: dockProject.project_type,
      sub_type: "Estimate"
    };
    // this.props.templatePage(bodydata, this.props.token);
  }

  refreshSucess = () => {
    if (this.props.isServerStatus == 200) {
      let projectData = this.state.projectData;
      if (projectData.project_status == 1) {
        this.props.history.push(
          `/project_plan/estimation/${projectData.project_id}`
        );
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

  /* componentWillMount = () => {
    var bodydata
    const dockProject = this.props.isDock[0];
    //alert(dockProject.project_type);
     if (this.props.estmt_status != "Open") {
      this.props.history.push(
        `/project_plan/execution/${dockProject.project_id}`
      )
    } 
    if (dockProject.project_type == "Design and Build") {
      bodydata = {
        project_id: dockProject._id,
        prj_type: "Design",
        sub_type: "Estimate"
      };
    }
    else {
      bodydata = {
        project_id: dockProject._id,
        prj_type: dockProject.project_type,
        sub_type: "Estimate"
      };
    }

    this.props.templatePage(bodydata, this.props.token);

    console.log(this.props.selectedTemplate)
    if (this.props.selectedTemplate && this.props.selectedTemplate.template) {
      let tempData = this.props.selectedTemplate.template
        ? JSON.parse(this.props.selectedTemplate.template)
        : null;

      this.setState({
        tempData
      });
    }



  }; */
  componentDidMount = () => {
    var bodydata;
    console.log("AAAA");
    const dockProject = this.props.isDock[0];
    console.log(this.props.selectedTemplate)
    if (dockProject.project_type == "Design and Build") {
      bodydata = {
        project_id: dockProject._id,
        prj_type: "Design",
        sub_type: "Estimate"
      };
    }
    else {
      bodydata = {
        project_id: dockProject._id,
        prj_type: dockProject.project_type,
        sub_type: "Estimate"
      };
    }



    this.props.templatePage(bodydata, this.props.token);
    this.props.fetchUserDesignationList({}, this.props.token);
    this.parseData();


  };

  parseData = () => {
    if (this.props.selectedTemplate && this.props.selectedTemplate.template) {
      let tempData = this.props.selectedTemplate.template
        ? JSON.parse(this.props.selectedTemplate.template)
        : null;
      this.setState({
        tempData
      });
    }
    // } else {
    //   alert("no template");
    //   console.log("AAAA");
    //   console.log(this.props);
    //   this.props.history.push(
    //     `/project_documents/${this.props.match.params.project_id}`
    //   );
    // }
  };
  updateProps = () => {
    console.log("update");

    this.setState({
      tempData: JSON.parse(this.props.selectedTemplate.template)
    });
  };
  static getderivedstatefromprops = nextProps => {
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
      this.parseData();
    }
    return null;
  };



  render() {
    console.log(this.props);
    let { tempData } = this.state;
    console.log(tempData)


    return (
      <>
        {tempData.columns && tempData.columns.length <= 7 ?
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
            <div style={{ width: "100%", overflowX: "auto" }}>
              <div
                className="main-container"
                style={{
                  ...tabContainer,
                  marginLeft: this.props.projectToggle ? "220px" : "",
                  width: this.props.projectToggle ? "1500px" : "1500px",
                  overflowX: "auto"
                }}
                onClick={this.props.hideProjectSideBar}
              >
                {/* <!-- Nav tabs --> */}
                <ul
                  className="nav"
                  role="tablist"
                  style={{
                    borderColor: "white",
                    height: 44,
                    boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
                    marginBottom: "25px",
                    marginLeft: 10
                  }}
                >
                  <li className="nav-item" style={tabStyle}>
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#schedule"

                      id="navlinkshow"
                      style={{ height: 44, fontSize: 19 }}
                    >
                      Schedule
              </a>
                  </li>
                  <li className="nav-item" style={tabStyle}>
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#manpower"

                      id="navlinkshow"
                      style={{ height: 44, fontSize: 19 }}
                    >
                      Manpower
              </a>
                  </li>
                </ul>

                {/* <!-- Tab panes --> */}

                <div className="tab-content" style={{ border: "none" }}>
                  <div id="schedule" className="tab-pane active" style={grid}>
                    <ProjectPlanEstimation
                      schedule
                      data={tempData}
                      projectToggle={this.props.projectToggle}
                      updateProps={this.updateProps}
                    />
                  </div>
                  <div id="manpower" className="tab-pane fade" style={grid}>
                    <ProjectPlanEstimation
                      manpower
                      data={tempData}
                      projectToggle={this.props.projectToggle}
                      updateProps={this.updateProps}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> :
          null}
      </>
    );



  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    projectData: state.projectData.project,
    selectedTemplate: state.projectData.templatePage,

    isDock: state.projectData.dockProject,
    auth: state.auth,
    newProject: state.projectData.newProject,
    token: state.auth.token,
    projectToggle: state.utilityLayout.projectSidebar
  }
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  actions
)(HOC(Estimation));
