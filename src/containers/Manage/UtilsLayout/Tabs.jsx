import React, { Component } from "react";
import ProjectPlan from "./ProjectPlan";
import Navbar from "./Navbar";
import ProjectBrief from "./projectbrief";
import RegisterForm from "./RegisterForm";
var tabContainer = {
  width: "100%",
  //marginLeft: "0",
  marginRight: "15%",
  padding: 25
};
var tabStyle = {
  width: 200,
  fontFamily: "Helvetica"
};

class Tabs extends Component {
  state = {};
  render() {
    return (
      <div>
        <div style={{ marginBottom: "50px" }}>
          <Navbar />
        </div>
        <div className="container" style={tabContainer}>
          {/* <!-- Nav tabs --> */}
          <ul
            className="nav"
            role="tablist"
            style={{
              borderColor: "white",
              height: 30,
              boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
              marginBottom: "25px",
              marginLeft: "20px",
              width: "1180px"
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
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link"
                data-toggle="tab"
                href="#material"
                style={{ paddingTop: "0px" }}
              >
                Material
              </a>
            </li>
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link"
                data-toggle="tab"
                href="#jobwork"
                style={{ paddingTop: "0px" }}
              >
                Jobwork
              </a>
            </li>
            <li className="nav-item" style={tabStyle}>
              <a
                className="nav-link"
                data-toggle="tab"
                href="#tools"
                style={{ paddingTop: "0px" }}
              >
                Tools
              </a>
            </li>
          </ul>

          {/* <!-- Tab panes --> */}
          <div className="tab-content" style={{ border: "none" }}>
            <div id="schedule" className="container tab-pane active">
              <p>
                <ProjectPlan />
              </p>
            </div>
            <div id="manpower" className="container tab-pane fade">
              <p>
                <ProjectBrief />
              </p>
            </div>
            <div id="material" className="container tab-pane fade">
              <p>
                <RegisterForm />
              </p>
            </div>
            <div id="jobwork" className="container tab-pane fade">
              <p>
                Meaning of name Ritika - Name Ritika means Joy, Of truth,
                Generous, A small flowing river or stream, Truthful.
              </p>
            </div>
            <div id="tools" className="container tab-pane fade">
              <p>
                It's said that the female meaning of Arya in India is “noble
                goddess”, while Aria means “lioness” in Aramaic and Hebrew. Arya
                is a Sanskrit word that used to be used to show respect to
                others. This is one of the first origins of the word before it
                started to be given as a name.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
