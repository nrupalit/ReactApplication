import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";
import './rightsidebar.css'
import { SidebarLabel } from 'Layout/styled component/Button';
class RightSidebar extends Component {
  state = {
    nav: false,
    pinRes: false
  };
  open = {
    cursor: "pointer",
    position: "fixed",
    top: "33px",
    right: "0",
    height: "100%",
    width: "25px",
    overflowX: "hidden",
    zIndex: "",
    backgroundColor: "#344466",
    zIndex: "800"
  };
  sidenavs = {
    display: "none"
  };
  close = {
    position: "absolute",
    top: "10px",
    right: "210px",
    fontSize: "36px",
    display: "block",
    padding: "8px 8px 8px 32px",
    fontSize: "25px",
    zIndex: "800"
  };
  link = {
    textDecoration: "none",
    color: "#344466",
    marginTop: "40px",
    fontSize: "17px"
  };
  sidetitle = {
    transform: "rotate(270deg)",
    fontSize: "18px",
    marginTop: "55vh",
    color: "white",
    letterSpacing: "18px",
    fontFamily: "Roboto",
    lineHeight: "1",
    fontWeight: "normal"
  };

  closeNav = () => {
    this.sidenavs = {
      display: "none"
    };
    this.setState({ nav: false });
  };
  openNav = () => {
    this.props.showResourcesSidebar();
  };

  componentWillReceiveProps(props) {
    if (props.pinRes != null) {
      this.setState({ pinRes: props.pinRes });
    }
    if (props.projectToggle != null) {
      // alert(props.projectToggle)
      this.setState({
        nav: props.projectToggle
      })
    }
    return null;
  }
  componentWillMount = () => {
    this.setState({ nav: this.props.projectToggle });

    if (this.props.pinRes != null) {
      this.setState({ pinRes: this.props.pinRes });
    }
  }
  toggle = () => {
    if (this.state.nav == true) {
      return (<div className="sidenavs__main__right">
        <div
          id="mySidenav"
          style={{
            width: this.state.nav == true ? 200 : 0,
            transition: "width 0.5s"
          }}
        >
          <a
            href="#"
            style={this.close}
            onClick={this.props.pinResSidebar}
          >
            {(this.state.pinRes == false) ? (<img src={require('assets/icons/pushdown.svg')} height="16" width="20" />) : (
              <img src={require('assets/icons/map.svg')} height="16" width="20" />
            )}
          </a>
          <ul
            style={{
              listStyleType: "none",
              //float: "right",
              // marginRight: "5px"
              marginLeft: "15px"
            }}
            dir="rtl"
          >
            <li>
              <SidebarLabel
                className="btn btn-dark sidenavs__right--btn"
                style={{
                  borderRadius: "10px",
                  fontSize: "18px"
                }}
              >
                {/* <Link to="/landing_page" style={{
                  appearance:"none",
                  color:"#fff",
                  textDecoration:"none",
                  fontSize:"17px"
                   }}> */}
                &nbsp; Resources &nbsp; &nbsp;{" "}

                {/* </Link> */}
                <img
                  src={require("../../../assets/icons/resourcesicon.svg")}
                  height="20px"
                  width="20px"
                  style={{
                    marginBottom: "10px"
                  }}
                />
              </SidebarLabel>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <div style={{ paddingTop: "20px" }}>
                    <p href="#" className='sidenavs__link no__hover' style={{ textDecoration: "none", fontWeight: "600" }}>
                      My Resources&nbsp;&nbsp;
                <img
                        src={require("../../../assets/icons/resourcesicon.svg")}
                        height="18px"
                        width="18px"
                        font="white"
                      />
                    </p>
                  </div>
                </li>

                <li>
                  <div
                    style={{
                      padding: "3px 10px",

                      marginRight: "-15px",
                      //marginLeft: "12px"
                    }}
                  >
                    <Link to={"/team_members"} style={this.link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio" readOnly checked={this.props.history.location.pathname == `/team_members` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">My Team</span>
                      </label>
                    </Link>
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      padding: "3px 10px",
                      marginTop: "-15px",
                      marginRight: "-15px",
                      //marginLeft: "12px"
                    }}
                  >
                    <Link to={"/manpowergco"} style={this.link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio" readOnly checked={this.props.history.location.pathname == `/manpowergco` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">My Manpower</span>
                      </label>
                    </Link>
                  </div>
                </li>

                {/* my clients */}
                <li>
                  <div
                    style={{
                      padding: "3px 10px",
                      marginTop: "-15px",
                      marginRight: "-15px",
                      // marginLeft: "12px"
                    }}
                  >
                    <Link to={"/my_clients"} style={this.link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio" readOnly checked={this.props.history.location.pathname == `/my_clients` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">My Clients</span>
                      </label>
                    </Link>
                  </div>
                </li>

                <li>
                  <div
                    style={{
                      paddingTop: "4px",
                      marginTop: "50px",
                      //marginLeft: "12px",
                      paddingBottom: "10px"
                    }}
                  >
                    <a href="#" style={this.link}>
                      D2B Resources&nbsp;&nbsp;
                <img
                        src={require("../../../assets/icons/resourcesicon.svg")}
                        height="18px"
                        width="18px"
                        font="white"
                      />
                    </a>
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      padding: "3px 10px",
                      // marginTop: "-15px",
                      marginRight: "-15px",
                      // marginLeft: "12px"
                    }}
                  >
                    <Link to={"#"} style={this.link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio" readOnly checked={this.props.history.location.pathname == `/unit_convertor` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">Unit Convertor</span>
                      </label>
                    </Link>
                  </div>
                </li>
                {/* <li>
            <div
              style={{
                padding: "4px 4px",
                MarginRight: "30px",
                fontSize: "10px"
              }}
            >
              <a href="#" style={this.link}>
                Unit Converter
              </a>
            </div>
          </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>)

    }
  }
  render() {
    return (
      <React.Fragment>
        <div style={this.open} onClick={this.openNav} className="rightsidebar">
          <div className="sidetitle" >RESOURCES</div>
        </div>
        {this.toggle()}


        <div id="main" style={{
          // marginRight: this.state.nav == true ? 230 : 0,
          transition: "all 1s ease  2s"
        }}
        >
          {/* <div
            style={{
              marginRight: this.state.nav == true ? 230 : 0,
              transition: "0.5s"
            }}
          /> */}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectToggle: state.utilityLayout.resourceSidebar,
    pinRes: state.utilityLayout.resPin

  };
};

export default connect(
  mapStateToProps,
  actions
)(RightSidebar);
