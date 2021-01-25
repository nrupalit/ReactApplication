import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarButton } from 'Layout/styled component/Button';
import "./leftsidebar.css"
let link = {
  textDecoration: "none",
  color: "#344466",
  marginTop: "10px"
};
export default function SidebarCard(props) {
  
  const { projectData, toggle, toggleDropdown, removeProject } = props;
  // console.log(props)
  // console.log("PPPPP")
  const dropDown = () => {
    if (toggle == true) {
      return <>
        <li>
          <div style={{ padding: "4px 4px" }}>
            <Link to={"/create_project/" + projectData.project_id} style={link}>
              <label className="sidebar__container sidenavs__link--project">

                <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/create_project/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project"> Client Details
            </span>
              </label>
            </Link>
          </div>
        </li>
        <li>
          <div style={{ padding: "4px 4px", marginTop: "-10px" }}>
            {props.projectData.project_status >= 1 ? < Link to={"/project_scope/" + projectData.project_id} style={link}>
              <label className="sidebar__container sidenavs__link--project">
                <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/project_scope/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project"> Project Scope  </span>
              </label>
            </Link> :
              <label className="sidebar__container sidenavs__link--project">
                <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/project_scope/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}> Project Scope  </span>
              </label>

            }

          </div>
        </li>
        <li>
          <div style={{ padding: "4px 4px", marginTop: "-10px" }}>
            {props.projectData.project_status >= 2 ? <Link to={"/project_brief/" + projectData.project_id} style={link}>
              <label className="sidebar__container sidenavs__link--project">
                <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/project_brief/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project">Project Brief</span>
              </label>
            </Link> : <label className="sidebar__container sidenavs__link--project">
                <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/project_brief/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}>Project Brief</span>
              </label>}

          </div>
        </li>
        {/* <li>
      <div
        style={{
          padding: "4px 4px",
          marginTop: "-10px",
          // fontSize: "16px"
        }}
      >
        <Link to="/landing_page" style={link}>
          <label className="sidebar__container sidenavs__link--project"> 
            <input type="radio"  name="radio" />
            <span className="sidebar__container sidenavs__link--project"> Project Plan</span>
          </label>
        </Link>
      </div>
    </li> */}

        <li>
          <div
            style={{
              padding: "4px 4px",
              marginTop: "-10px",
              // fontSize: "16px"
            }}
          >{props.projectData.project_status >= 3 ? <Link to={"/project_documents/" + projectData.project_id} style={link}>
            <label className="sidebar__container sidenavs__link--project">
              <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/project_documents/${projectData.project_id}` ? true : false} />
              <span className="sidebar__container sidenavs__link--project"> Project Document</span>
            </label>
          </Link> : <label className="sidebar__container sidenavs__link--project">
              <input type="radio" name="radio" defaultChecked={props.history.location.pathname == `/project_documents/${projectData.project_id}` ? true : false} />
              <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}> Project Document</span>
            </label>}

          </div>
        </li>

        <li className='dropdown plandrop'>
          <div style={{ padding: "4px 4px", marginTop: "-10px" }} >
            {props.projectData.project_status >= 4 ? <Link to={"/project_plan/design_estimation/" + projectData.project_id} style={link}>
              <label className="sidebar__container sidenavs__link--project">
                <input type="radio" name="radio"
                  defaultChecked={props.history.location.pathname == `/project_plan/estimation/${projectData.project_id}`
                    || props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project"> Project Plan</span>
              </label>
            </Link> : <label className="sidebar__container sidenavs__link--project">
                <input type="radio" name="radio"
                  defaultChecked={props.history.location.pathname == `/project_plan/estimation/${projectData.project_id}`
                    || props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}> Project Plan</span>
              </label>}
          </div>

          {props.history.location.pathname == `/project_plan/estimation/${projectData.project_id}`
            || props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ?
            <>
              {props.template.project_type == "Design" || props.template.project_type == "Build"
                ?
                <>
                  <div style={{ marginLeft: "-40px", padding: "2px 4px", marginTop: "-10px" }} >
                    <Link to={"/project_plan/estimation/" + projectData.project_id} style={link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio1"
                          defaultChecked={props.history.location.pathname == `/project_plan/estimation/${projectData.project_id}` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">
                          Project {props.template.project_type}-Estimate</span>
                      </label>
                    </Link>
                  </div>
                  <div style={{ marginLeft: "-40px", padding: "4px 4px", marginTop: "-10px" }} >
                    {(props.template.design_estmt_status && props.template.design_estmt_status == "Open") ||
                      (props.template.build_estmt_status && props.template.build_estmt_status == "Open") ?

                      <label className="sidebar__container sidenavs__link--project" >
                        <input type="radio" name="radio1"
                          defaultChecked={props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}>
                          Project {props.template.project_type}-Execute</span>
                      </label> :
                      <Link to={"/project_plan/execution/" + projectData.project_id} style={link}>
                        <label className="sidebar__container sidenavs__link--project">
                          <input type="radio" name="radio1"
                            defaultChecked={props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                          <span className="sidebar__container sidenavs__link--project"> Project {props.template.project_type}-Execute</span>
                        </label>
                      </Link>}
                  </div>
                </>
                :
                <>
                  <div style={{ marginLeft: "-40px", padding: "2px 4px", marginTop: "-10px" }} >
                    <Link to={"/project_plan/estimation/" + projectData.project_id} style={link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio1"
                          defaultChecked={props.history.location.pathname == `/project_plan/estimation/${projectData.project_id}` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">
                          Project Design-Estimate</span>
                      </label>
                    </Link>
                  </div>
                  <div style={{ marginLeft: "-40px", padding: "4px 4px", marginTop: "-10px" }} >
                    {(props.template.design_estmt_status && props.template.design_estmt_status == "Open") ||
                      (props.template.build_estmt_status && props.template.build_estmt_status == "Open") ?

                      <label className="sidebar__container sidenavs__link--project" >
                        <input type="radio" name="radio1"
                          defaultChecked={props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}>
                          Project Design-Execute</span>
                      </label> :
                      <Link to={"/project_plan/execution/" + projectData.project_id} style={link}>
                        <label className="sidebar__container sidenavs__link--project">
                          <input type="radio" name="radio1"
                            defaultChecked={props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                          <span className="sidebar__container sidenavs__link--project"> Project Design-Execute</span>
                        </label>
                      </Link>}
                  </div>
                  <div style={{ marginLeft: "-40px", padding: "2px 4px", marginTop: "-10px" }} >
                    <Link to={"/project_plan/estimation/" + projectData.project_id} style={link}>
                      <label className="sidebar__container sidenavs__link--project">
                        <input type="radio" name="radio1"
                          defaultChecked={props.history.location.pathname == `/project_plan/estimation/${projectData.project_id}` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project">
                          Project Build-Estimate</span>
                      </label>
                    </Link>
                  </div>
                  <div style={{ marginLeft: "-40px", padding: "4px 4px", marginTop: "-10px" }} >
                    {(props.template.design_estmt_status && props.template.design_estmt_status == "Open") ||
                      (props.template.build_estmt_status && props.template.build_estmt_status == "Open") ?

                      <label className="sidebar__container sidenavs__link--project" >
                        <input type="radio" name="radio1"
                          defaultChecked={props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                        <span className="sidebar__container sidenavs__link--project" style={{ cursor: "not-allowed" }}>
                          Project Build-Execute</span>
                      </label> :
                      <Link to={"/project_plan/execution/" + projectData.project_id} style={link}>
                        <label className="sidebar__container sidenavs__link--project">
                          <input type="radio" name="radio1"
                            defaultChecked={props.history.location.pathname == `/project_plan/execution/${projectData.project_id}` ? true : false} />
                          <span className="sidebar__container sidenavs__link--project"> Project Build-Execute</span>
                        </label>
                      </Link>}
                  </div>
                  
                  


                </>
              }

            </> : null}

            <div style={{marginTop: 10 }}></div>
            <div style={{ marginLeft: -40 }}>
              <li>
                <div style={{ padding: "1px" }}>
                <Link to={"/project_plan/design_estimation/" + projectData.project_id} style={link}>
                    <label className="sidebar__container sidenavs__link--subproject">
                      <input type="radio" name="radio" />
                      <span className="sidebar__container sidenavs__link--subproject"> Design Estimation
                  </span>
                    </label>
                  </Link>
                </div>
              </li>

              <li>
                <div style={{ padding: "1px" }}>
                <Link to={"/project_plan/build_estimation/" + projectData.project_id} style={link}>
                    <label className="sidebar__container sidenavs__link--subproject">
                      <input type="radio" name="radio" />
                      <span className="sidebar__container sidenavs__link--subproject"> Build Estimation
                  </span>
                    </label>
                  </Link>
                </div>
              </li>

              <li>
                <div style={{ padding: "1px" }}>
                <Link to={"/project_plan/design_execution/" + projectData.project_id} style={link}>
                    <label className="sidebar__container sidenavs__link--subproject">
                      <input type="radio" name="radio" />
                      <span className="sidebar__container sidenavs__link--subproject"> Design Execution
                  </span>
                    </label>
                  </Link>
                </div>
              </li>

              <li>
                <div style={{ padding: "1px" }}>
                <Link to={"/project_plan/build_execution/" + projectData.project_id} style={link}>
                    <label className="sidebar__container sidenavs__link--subproject">
                      <input type="radio" name="radio" />
                      <span className="sidebar__container sidenavs__link--subproject"> Build Execution
                  </span>
                    </label>
                  </Link>
                </div>
              </li>
            </div>
        </li>

      </>
    }
    else {
      return <></>
    }
  }
  return (
    <>
      <li>

        <div style={{ padding: "12px 8px" }}>
          <SidebarButton
            className="btn btn-dark project__dropdown"
            style={{
            }}
            onClick={removeProject}
          >
            <img
              src={require("../../../assets/icons/projectlist.svg")}
              height="15px"
              width="15px"
            />
            {console.log(projectData.project_name.length)
            }
            &nbsp; Project - {projectData.project_name.slice(0, 7)}..&nbsp;&nbsp;&nbsp;
          <span className={toggle == false ? "fas fa-times" : "fas fa-times"} style={{
              color: "white"
            }} />
            &nbsp;&nbsp;
        </SidebarButton>
        </div>
      </li>
      {dropDown()}
    </>
  )
}
