import React, { Component } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import Navbar from "./../../../components/NavBar/Navbar";
import Footer from "./../../../components/Footer/Footer";
import Bootstrap from "../../../Bootstrap/bootstrap.module.css";
import LeftSideBar from "../../../components/SideBar/left/leftsidebar";
import RightSideBar from "../../../components/SideBar/right/rightsidebar";
import HOC from 'HOC/ProjectHOC';
import "./manage.css";


//button
import { XLargeButton } from 'Layout/styled component/Button';

var addButton = {
  backgroundColor: "#987c46",
  marginLeft: 15,
  display: "inline-block",
  marginTop: 0,
  padding: "0px 13px 0px 13px",
  color: "white",
  fontSize: 25,
  borderRadius: 10,
  cursor: "pointer",
  border: "none",
  width: "48px",
  height: "49px",
  position: "relative",
  // top: "5px",
  fontFamily: "Helvetica, FontAwesome"
};

var serviceItem = {
  margin: "0 0 20px",
  padding: "15px 0",
  cursor: "pointer",
  width: 500
};

var serviceItemDesc = {
  paddingLeft: 15,
  fontSize: 14,
  color: "#78849e"
};

var serviceItemDescPara = {
  margin: 0,
  paddingLeft: 45,
  paddingRight: 100,
  position: "relative",
  top: 10
};
var serviceItemTitle = {
  // fontSize: 15,
  // fontWeight: 600,
  // margin: "0 0 10",
  // color: "#78849e",
  // marginBottom: 5,
  // letterSpacing:'1.2px'
};

class Manage extends Component {
  constructor() {
    super();
    this.state ={
      width: 0
    }
  }
  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ width : window.innerWidth });
    console.log(this.state.width);
  }
  
  // Nrupali Edited..
  HeadingProjects = (props) => {
    return(
      <div
        class="content-title"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <ul style={{ listStyleType: "none" }}>
          <li
            style={{
              display: "inline",
              paddingLeft: "15.3%",
              fontSize: "25px",
              fontWeight: 600,
              color: "#78849e",
              letterSpacing: "2.2px"
            }}
          >
            { props.projectName }
          </li>
          <li
            // style={{
            //   display: "inline",
            //   paddingLeft: "38.7%",
            //   fontSize: "25px",
            //   fontWeight: 700,
            //   color: "#78849e"
            // }}
            className="manage__header"
          >
           { props.otherName }
          </li>
        </ul>
      </div>
    );
  }
  SubHeading = (props) => {
    return(
      <div
        className={cx(
          Bootstrap["col-md-6"],
          Bootstrap["col-sm-4"]
        )}
        style={{ borderRight: "1px solid dimgray" }}
      >
        <div class="service-item" style={serviceItem}>
          <div class="service-item-icon">
            <i class={props.iconClass} />
          </div>
          <div class="service-item-title">
            <h6 className="serviceItemTitle">{ props.subheadingName }</h6>
          </div>
          <div class="service-item-desc" style={serviceItemDesc}>
            <p style={serviceItemDescPara}>
              { props.description }
            </p>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Navbar />
        <LeftSideBar history={this.props.history} />
        <RightSideBar history={this.props.history} />
        <div className="manage-main" style={{ minHeight: "90vh" }} onClick={this.props.hideProjectSideBar}>
          <div style={{ marginTop: "5%" }}>
            <XLargeButton className="landing__managebtn" onClick={
              e => {
                this.props.history.push('/team_members')
              }
            }>
              <Link
                to="/team_members"
                style={{
                  appearance: "none",
                  color: "white",
                  textDecoration: "none",
                  // fontSize:"14px"
                }}
              >{" "}
                <img
                  src={require("assets/icons/teamMembers.svg")}
                  className={"fieldmode__addMember--btn"}
                />
                &nbsp;Manage Team
  
              </Link>
            </XLargeButton>
            <div className="manage-wrapper">
              <this.HeadingProjects projectName ="Projects" otherName="Resource" />
              <div
                class="content-box"
                style={{ paddingLeft: "4%" , marginBottom: "30px" }}>
                <div
                  className={Bootstrap.container}
                  style={{
                    width: "100%",
                    paddingRight: "0",
                    paddingLeft: "0",
                    marginRight: "0",
                    marginLeft: "0"
                  }}
                >
                  <div
                    className={Bootstrap.row}
                    style={{
                      display: "flex",
                      msFlexWrap: "wrap",
                      flexWrap: "wrap",
                      marginRight: "0",
                      marginLeft: "0",
                      width: this.state.width
                    }}
                  >
                    {/* Nrupali edited.. */}
                    <this.SubHeading 
                    iconClass = "fa fa-pencil fa-1x" 
                    subheadingName = "Create"
                    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas in ratione neque soluta excepturi quaerat"
                     />
                    
                    <this.SubHeading 
                    iconClass = "fa fa-inbox fa-1x" 
                    subheadingName = "Product"
                    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas in ratione neque soluta excepturi quaerat"
                     />
                    
                    <this.SubHeading 
                    iconClass = "fa fa-align-left fa-1x" 
                    subheadingName = "Brief"
                    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas in ratione neque soluta excepturi quaerat"
                     />
                    {/*  */}
                    <this.SubHeading 
                    iconClass = "fas fa-store-alt fa-1x" 
                    subheadingName = "Retailers"
                    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas in ratione neque soluta excepturi quaerat"
                     />
                    
                    <this.SubHeading 
                    iconClass = "fa fa-shopping-cart fa-1x" 
                    subheadingName = "Material"
                    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas in ratione neque soluta excepturi quaerat"
                     />

                    <this.SubHeading 
                    iconClass = "fas fa-user-check fa-1x" 
                    subheadingName = "My Resources"
                    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas in ratione neque soluta excepturi quaerat"
                     />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HOC(Manage);
