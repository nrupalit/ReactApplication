import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectCard from "./ProjectCard";
// ACTIONS (from redux) used on this page: showProjectSidebar(), UndockProject(), pinProjectSidebar()
// import * as actions from "actions/action_authentication";
import { showProjectSidebar, UndockProject, undockTheProject, pinProjectSidebar } from "actions/action_authentication";
import "./leftsidebar.css";

import { SidebarLabel } from "Layout/styled component/Button";

class LeftSidebar extends Component {
  state = {
    nav: false,
    dockProject: null,
    pinProject: false
  };

  // START | STYLING
  sidenavs = {
    display: "none"
  };
  open = {
    cursor: "pointer",
    position: "fixed",
    top: "33px",
    left: "0",
    height: "100%",
    width: "3em",
    overflow: "visible",
    backgroundColor: "#344466",
    zIndex: "800"
  };
  close = {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "36px",
    display: "block",
    padding: "8px 8px 8px 32px",
    fontSize: "25px",
    zIndex: "800"
  };

  main = {
    transition: "all 60s ease  2s"
    // padding: "50px"
  };
  link = {
    textDecoration: "none",
    color: "#344466",
    marginTop: "10px"
  };
  sidetitle = {
    fontSize: "normal",
    transform: "rotate(270deg)",
    fontSize: "18px",
    marginTop: "55vh",
    color: "white",
    letterSpacing: "18px",
    fontFamily: "Roboto",
    lineHeight: "1",
    fontWeight: "normal"
    // padding:"10px"
  };
  // END | STYLING

  closeNav = () => {
    this.sidenavs = {
      display: "none"
    };
    this.setState({ nav: false });
  };

  openNav = () => {
    // this.sidenavs = {

    // };

    // this.setState({ nav: true });

    this.props.showProjectSidebar();
  };

  projectCard = () => {
    // console.log(this.props)
    // console.log(this.state.dockProject)
    let projectUrl = this.props.history.location.pathname.split("/");
    let projectId = this.state.dockProject[0] ? this.state.dockProject[0].project_id : projectUrl[2];

    let current_project = this.props.projectCurrent && this.props.projectCurrent.filter(pro => {
      if (pro.project_id == projectId) {
        return pro;
      }
    })
    // console.log("DDDDD")
    // console.log(current_project)
    if (current_project != null && current_project.length > 0) {
      return current_project.map((project, index) => {
        return (
          <ProjectCard
            template={this.props.template}
            project={project}
            unDockProject={this.props.UndockProject}
            undockTheProject={this.props.undockTheProject}
            history={this.props.history}
            key={index}
          />
        );
      });
    }
    else {
      return this.props.sideBarProject.map((project, index) => {
        return (
          <ProjectCard
            template={this.props.template}
            project={project}
            unDockProject={this.props.UndockProject}
            undockTheProject={this.props.undockTheProject}
            history={this.props.history}

          />
        );
      });
    }
  };

  componentWillMount = () => {
    this.setState({
      dockProject: this.props.sideBarProject,
      nav: this.props.projectToggle
    });

    if (this.props.pinProject != null) {
      this.setState({ pinProject: this.props.pinProject });
    }
  };

  componentWillReceiveProps(props) {
    if (props.sideBarProject != null) {
      this.setState({ dockProject: props.sideBarProject });
    }

    if (props.pinProject != null) {
      this.setState({ pinProject: props.pinProject });
    }
    if (props.projectToggle != null) {
      this.setState({
        nav: props.projectToggle
      });
    }
    return null;
  }

  toggle = () => {
    if (this.state.nav == true) {
      // alert('hiiii')
      return (
        <div className="sidenavs__main__left">
          <div
            id="mySidenav"
            style={{
              width: this.state.nav == true ? "20em" : "0",
              transition: "width 0.5s",
              marginLeft: "30%",
              overflow: "visible"
            }}
          >
            <a
              href="#"
              style={this.close}
              onClick={this.props.pinProjectSidebar}
            >
              {/* X */}

              {this.state.pinProject == false ? (
                <img
                  src={require("assets/icons/pushdown.svg")}
                  height="16"
                  width="20"
                />
              ) : (
                  <img
                    src={require("assets/icons/map.svg")}
                    height="16"
                    width="20"
                  />
                )}
            </a>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <SidebarLabel className="btn btn-dark sidenavs__btn">
                  <img
                    src={require("../../../assets/icons/home.svg")}
                    height="17px"
                    width="20px"
                    style={{
                      marginBottom: "8px"
                    }}
                  />
                  {/* <Link to="/landing_page" style={{
                  appearance:"none",
                  color:"#fff",
                  textDecoration:"none",
                  fontSize:"17px"
                   }}> */}
                  &nbsp; Projects &nbsp; &nbsp; {/* </Link> */}
                  {/* <span className="fa fa-angle-down" />  */}
                  &nbsp;
                </SidebarLabel>
                <ul style={{ listStyleType: "none", marginLeft: "-10px" }}>
                  <li className="leftsidebarComponents">
                    <div style={{ padding: "15px 8px" }}>
                      <Link to="/my_projects" style={this.link}>
                        <img
                          src={require("../../../assets/icons/calendar.svg")}
                          height="18px"
                          width="18px"
                        />
                        <span 
                          style={{
                            appearance: "none",
                            textDecoration: "none"
                          }}
                          className="sidenavs__link"
                        >&nbsp; My Projects</span>
                      </Link>
                    </div>
                    <div style={{ padding: "1px 10px", marginTop: "-10px" }}>
                      <Link to="/create_project/new" style={this.link}>
                        <img
                          src={require("../../../assets/icons/create.svg")}
                          height="18px"
                          width="18px"
                        />
                        <span 
                          className="sidenavs__link"
                          style={{
                            textDecoration: "none"
                          }}
                        >&nbsp; Create</span>
                      </Link>
                    </div>
                  </li>
                  {this.projectCard()}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div style={this.open} onClick={this.openNav} className="leftsidebar">
          <div className="sidetitle">
            PROJECTS
          </div>
        </div>
        {this.toggle()}

        <div id="main" style={this.main} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    sideBarProject: state.projectData.dockProject,
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.loginStatus,
    isServerMessage: state.serverStatus.loginMessage,
    projectToggle: state.utilityLayout.projectSidebar,
    pinProject: state.utilityLayout.projectPin,
    template: state.projectData.templatePage,
    projectCurrent: state.projectData.project
  };
};

export default connect(
  mapStateToProps,
  { showProjectSidebar, UndockProject, undockTheProject, pinProjectSidebar }
)(LeftSidebar);