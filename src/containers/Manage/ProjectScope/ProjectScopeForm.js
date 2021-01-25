import React, { Component } from "react";
import { withFormik } from "formik";
import cx from "classnames";
import Bootstrap from "Bootstrap/bootstrap.module.css";
import styles from "../ProjectReference/projectdetails.module.css";
import * as Yup from "yup";
import { connect } from "react-redux";
// updateProjectBreif
import * as actions from "actions/action_authentication";
import InputError from "Layout/InputError/InputError";
import { SERVERBASEURL, TEMPLATE } from '../../../constant/backend_url';
import { NewTemplate } from '../../../actions/action_authentication';

import { LargeButton } from "Layout/styled component/Button";

var dropdown = {
  position: "relative",
  display: "inline-block"
};

const formikEnhancer = withFormik({
  bodyData: (values) => {
    console.log("bodydata =>",values);
  },
  validationSchema: Yup.object().shape({
    project_category: Yup.string()
      .nullable()
      .required("Project Category is required"),
    project_subcategory: Yup.string()
      .nullable()
      .required("Project Sub Category is required"),
    project_type: Yup.string()
      .nullable()
      .required("Project Type is required"),
    project_subtype: Yup.string()
      .nullable()
      .required("Project Sub Type is required"),
    type: Yup.string().nullable(),
    template_id: Yup.string().nullable()
    // .required("Please select a template")
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  handleSubmit: (values, { props }) => {
    // console.log("values of templatelist",values);
    console.log(`Values for templateAPI => template type: ${values.type} , template id: ${values.template_id} , Project Id : ${values._id}`);
    
    // console.log("props",props);
    // console.log("template lists",templateList);
    
    
    
    let body = values;
    // const BodyData = {
    //   "type": values.Templatetype
    // }
    // console.log(BodyData);
    
    props.UndockProject();
    props.dockProject(body);
    body["project_id"] = body._id;
    // console.log();
    
    body["working_page"] = 2;
    // console.log(body['type']);
    // console.log(body.forms[0].name);
    // body["type"] = body.selected;
    // body["template_id"] = body.selectedTemplate;

    // action function to create template in database
    props.updateProjectBreif(body, props.token);
    // console.log("AAAA")
    // console.log(props)
    // console.log(Templatetype)
    // console.log("Gau", values._id, props.token, "Gau");

    // Nrupali edited..
    // Now calling template api to fill values in template

    let bodyData = {
      "type": values.type,
      "project_id": values._id,
	    "template_id": values.template_id
    }
    props.NewTemplate(bodyData , props.token);

    // const url = `${SERVERBASEURL}${TEMPLATE}`;
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "access-token": props.token
    //   },
    //   body: JSON.stringify(bodyData),
    // })
    // .then(res => res.json())
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => console.log(err)
    // )
  },

  displayName: "MyForm"
});
class ProjectScopeForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.handleProceed = this.handleProceed.bind(this);
  }

  state = {
    editToggle: true,
    projectCat: {
      Residential: [
        {
          value: "House Villa",
          name: "House Villa"
        },
        {
          value: "Home",
          name: "Home"
        },
        {
          value: "Bunglow",
          name: "Bumglow"
        }
      ],
      Commerical: [
        {
          value: "Buildings",
          name: "Buildings"
        },
        {
          value: "Multi-Building",
          name: "Multi-Building"
        },
        {
          value: "Task",
          name: "Task"
        }
      ]
    },
    projectType: {
      Design: [
        {
          value: "Room",
          name: "Room"
        },
        {
          value: "Bathroom",
          name: "Bathroom"
        },
        {
          value: "Kitchen",
          name: "Kitchen"
        }
      ],
      Build: [
        {
          value: "Room",
          name: "Room Build"
        },
        {
          value: "Multi-Building",
          name: "Garden Build"
        },
        {
          value: "Task",
          name: "Kitchen Build"
        }
      ],
      Both: [
        {
          value: "Room",
          name: "Room Build & Design"
        },
        {
          value: "Multi-Building",
          name: "Garden Build & Design"
        },
        {
          value: "Task",
          name: "Kitchen Build & Design"
        }
      ]
    },
    ProjectCatIndex: "Residential",
    ProjectTypeIndex: "Design",
    showTemplateSelection: false,
    //Nrupali edited
    ProjectIDforTemplate: this.props.ProjectIDforTemplate,
    Templatetype: "template",
  };

  selectProjectCategory = e => {
    this.props.setFieldValue("project_category", e.target.value);
    let ProjectCatIndex = e.target.value;
    this.setState({
      ProjectCatIndex: ProjectCatIndex
    });
  };
  Capitalize = string => {
    // console.log(string)
    return string[0].toUpperCase() + string.slice(1);
  };
  appendProjectCategory = () => {
    let type =
      this.state.ProjectCatIndex == null
        ? "Residential"
        : this.state.ProjectCatIndex;
    var a = this.Capitalize(type);
    // console.log(a)
    // console.log(this.state.projectCat[a])
    return this.state.projectCat[a].map((data, i) => {
      return (
        <>
          <option
            value={data.value}
            selected={
              this.props.values.project_subcategory == data.value ? true : false
            }
            key={i}
          >
            {data.name}
          </option>
        </>
      );
    });
  };

  pushNextLocation = () => {
    this.props.history.push(`/project_brief/${this.props.values.project_id}`);
  };

  selectProjectType = e => {
    this.props.setFieldValue("project_type", e.target.value);
    let ProjectTypeIndex = e.target.value;
    this.setState({
      ProjectTypeIndex: ProjectTypeIndex
    });
  };

  appendProjectType = () => {
    let type =
      this.state.ProjectTypeIndex == null
        ? "Design"
        : this.state.ProjectTypeIndex;
    var a = this.Capitalize(type);
    // console.log(a)
    if (a == "Design and Build") {
      a = "Both";
    }
    return this.state.projectType[a].map((data, i) => {
      return (
        <>
          <option
            value={data.value}
            selected={
              this.props.values.project_subtype == data.value ? true : false
            }
            key={i}
          >
            {data.name}
          </option>
        </>
      );
    });
  };

  editToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle
    });
  };

  componentWillMount = () => {
    // alert(this.props.projectType )
    //Nrupali
    
    if (
      this.props.projectType == "new" ||
      this.props.projectType == undefined ||
      this.props.projectType == null
    ) {
      this.setState({
        editToggle: false,
        ProjectTypeIndex: "Design",
        ProjectCatIndex: "Residential"
      });
    }
    if (this.props.projectType != "new") {
      this.setState({
        ProjectTypeIndex: this.props.values.project_type,
        ProjectCatIndex: this.props.values.project_category
      });
    }
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ProjectIDforTemplate: nextProps.ProjectIDforTemplate
    })
  }

  handleProceed = () => {
    // console.log(this.props.values.project_type);
    // const bodyData = {
    //   category: this.props.values.project_category,
    //   sub_category: this.props.values.project_subcategory,
    //   type: this.props.values.project_type,
    //   sub_type: this.props.values.project_subtype
    // }

    this.setState({ showTemplateSelection: true });
  };

  // START | HANDLE SELECTION OF TAB AND SHOW RELATED TEMPLATES IN DROPDOWN
  // (Template Type) project | template - type:  this.state.selected
  // working_page = 2
  // template_id: this.state.selectedTemplate
  handleChangeType = event => {
    // console.log("Clicked on handleChangeType",event.target.value);
    
    this.setState(
      {
        selected: event.target.value,
        Templatetype: event.target.value
      },
      () => {
        this.props.setFieldValue("type", this.state.selected);
        // let dockProject = this.props.isDock[0];
        // var projects;
        // this.props.projectsData.map(project => {
        //   if (project._id == dockProject._id) {
        //     projects = project;
        //   }
        // });
        // console.log('hello');
        // console.log(projects);

        const bodyData = {
          category: this.props.values.project_category,
          sub_category: this.props.values.project_subcategory,
          type: this.props.values.project_type,
          sub_type: this.props.values.project_subtype,
        };
        if (this.state.selected === "template") {
          //Nrupali
          this.props.showTemplate(bodyData, this.props.token);
          // console.log(bodyData);
        } else {
          this.props.projectTemplate(bodyData, this.props.token);
          // console.log("ProjectID called.",bodyData);
          
        }
      }
    );
  };
  // END | HANDLE SELECTION OF TAB AND SHOW RELATED TEMPLATES IN DROPDOWN

  changeTemplate = event => {
    //Nrupali Edited
    this.setState({ProjectIDforTemplate : event.target.value});
    this.setState({ selectedTemplate: event.target.value }, () => {
      this.props.setFieldValue("template_id", this.state.selectedTemplate);
      
      // const dockProject = this.props.isDock[0];
      // console.log(dockProject)
      // console.log(this.props.projectsData)

      // var projects;
      // this.props.projectsData.map(project => {
      //   if (project.project_id == dockProject.project_id) {
      //     projects = project;
      //   }
      // });

      // console.log(projects)
      // const projectDocuments = projects.project_docs
      //   ? projects.project_docs
      //   : [];

      // var documents = projectDocuments.map(item => {
      //   return {
      //     url:
      //       "https://via.placeholder.com/728x90.png?text=D2B+Attachment+File",
      //     hashtags: item.hashtags,
      //     file_name: item.name,
      //     file_information: item.file_information,
      //     type: item.file_type
      //   };
      //   //this.props.templatePage(bodydata, this.props.token);
      // });
      // const bodyData2 = {
      //   project_id: dockProject._id,
      //   project_docs: documents,
      //   template_id: this.state.selectedTemplate,
      //   type: this.state.selected,
      //   project_status: 3
      // };

      // console.log(bodyData2);
      // this.props.updateProjectDocs(bodyData2, this.props.token);

      // const bodydata = {
      //   project_id: dockProject._id,
      //   prj_type: this.props.values.project_type,
      //   sub_type: "Estimate"
      // };
      // this.props.templatePage(bodydata, this.props.token)
    });
  };
  // Nrupali Edited
  ProjectCategory = (props) => {
    return(
      <div className="projectTitle" style={{ paddingLeft: 12 , marginTop: "5%" }}>
        <ul style={{ marginBottom: 0 }}>
          <li
            style={{
              marginLeft: "-37px",
              fontSize: "18px",
              fontWeight: 500,
              color: "#344466",
              marginTop: "10px"
            }}
          >
            &nbsp;&nbsp;{props.categoryName}
          </li>
        </ul>
      </div>
    );
  }

  // Nrupali Edited..
  ProjectSubCategory = (props) => {
    return(
      <div className="projectTitle" style={{ paddingLeft: 12 }}>
        <ul style={{ marginBottom: 0, marginTop: "10px" }}>
          <ol
            style={{
              marginLeft: "-60px",
              fontSize: "16px",
              fontWeight: 500,
              color: "#344466"
            }}
          >
            <label className="">
              <input type="radio" name="radio" disabled />
              <span className=" ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ props.subCategoryName }
              </span>
            </label>
          </ol>
        </ul>
      </div>
    );
  }


  render() {
    const { handleSubmit , errors, touched, handleBlur } = this.props;
    // console.log(handleSubmit)
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div
            className="container projectscope__wrapper"
            style={{}}
            onClick={this.props.hideProjectSideBar}
          >
            {/* Nrupali Edited */}
            <this.ProjectCategory categoryName = "Project Category" />
            <div
              style={{
                paddingTop: 10,
                borderLeftStyle: "dotted",
                borderLeftWidth: 2,
                borderColor: "#dcdcdc",
                paddingLeft: 15,
                paddingBottom: 10
              }}
            >
              <div className="dropdown" style={dropdown}>
                <select
                  key="1"
                  className="dropdownbtn"
                  onChange={this.selectProjectCategory}
                  disabled={this.state.editToggle == true ? true : false}
                  name="project_category"
                  style={{
                    boxShadow:
                      touched.project_category && errors.project_category
                        ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                        : ""
                  }}
                  onBlur={handleBlur}
                >
                  <option
                    value="Residential"
                    selected={
                      this.state.ProjectCatIndex == "Residential" ? true : false
                    }
                  >
                    Residential
                  </option>
                  <option
                    value="Commerical"
                    selected={
                      this.state.ProjectCatIndex == "Commerical" ? true : false
                    }
                  >
                    Commercial
                  </option>
                </select>
              </div>
              <InputError
                errorMsg={this.props.errors.project_category}
                value={
                  touched.project_category && errors.project_category
                    ? "e"
                    : null
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            {/* Nrupali Edited */}

            <this.ProjectSubCategory subCategoryName = "Project Sub-Category" /> 

            <div
              style={{
                paddingTop: 10,
                borderLeftStyle: "dotted",
                borderLeftWidth: 2,
                borderColor: "#dcdcdc",
                paddingLeft: 55,
                paddingBottom: 10
              }}
            >
              <div className="dropdown" style={dropdown}>
                <select
                  key="3"
                  className="dropdownbtn"
                  disabled={this.state.editToggle == true ? true : false}
                  name="project_subcategory"
                  style={{
                    boxShadow:
                      touched.project_subcategory && errors.project_subcategory
                        ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                        : ""
                  }}
                  onChange={this.props.handleChange}
                  onBlur={handleBlur}
                >
                  {this.appendProjectCategory()}
                </select>
              </div>
              <InputError
                errorMsg={errors.project_subcategory}
                value={
                  touched.project_subcategory && errors.project_subcategory
                    ? "e"
                    : null
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            {/* Nrupali Edited */}
            <this.ProjectCategory categoryName = "Project Types" />
            <div
              style={{
                paddingTop: 10,
                borderLeftStyle: "dotted",
                borderLeftWidth: 2,
                borderColor: "#dcdcdc",
                paddingLeft: 15,
                paddingBottom: 10
              }}
            >
              <div className="dropdown" style={dropdown}>
                <select
                  key="5"
                  className="dropdownbtn"
                  onChange={this.selectProjectType}
                  disabled={this.state.editToggle == true ? true : false}
                  name="project_type"
                  style={{
                    boxShadow:
                      touched.project_type && errors.project_type
                        ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                        : ""
                  }}
                  onBlur={handleBlur}
                >
                  {/* <option value="design" selected disabled>
                  Please Select Project Type
                </option> */}
                  <option
                    value="Design"
                    selected={
                      this.state.ProjectTypeIndex == "Design" ? true : false
                    }
                  >
                    Design
                  </option>
                  <option
                    value="Build"
                    selected={
                      this.state.ProjectTypeIndex == "Build" ? true : false
                    }
                  >
                    Build
                  </option>
                  <option
                    value="Design and Build"
                    selected={
                      this.state.ProjectTypeIndex == "Design and Build"
                        ? true
                        : false
                    }
                  >
                    Design & Build
                  </option>
                </select>
              </div>
              <InputError
                errorMsg={errors.project_type}
                value={touched.project_type && errors.project_type ? "e" : null}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            {/* Nrupali Edited */}
            <this.ProjectSubCategory subCategoryName = "Project Sub-Type" /> 

            <div
              style={{
                paddingTop: 10,
                borderColor: "#dcdcdc",
                borderLeftStyle: "dotted",
                paddingLeft: 55
              }}
            >
              <div className="dropdown" style={dropdown}>
                <select
                  key="7"
                  className="dropdownbtn"
                  disabled={this.state.editToggle == true ? true : false}
                  name="project_subtype"
                  style={{
                    boxShadow:
                      touched.project_subtype && errors.project_subtype
                        ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                        : ""
                  }}
                  onChange={this.props.handleChange}
                  onBlur={handleBlur}
                >
                  {this.appendProjectType()}
                </select>
              </div>
              <InputError
                errorMsg={errors.project_subtype}
                value={
                  touched.project_subtype && errors.project_subtype ? "e" : null
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            {/* START | TEMPLATE SELECTION | ADDED BY ABHILASH */}

            {/* <div style={{ fontSize: 16 }}>
              Based on your selection of Project Category and Project Type, you
              can select a template.
            </div>
            <div style={{ fontSize: 16 }}>
              Please click below to get templates
            </div>
            <LargeButton type="button" onClick={this.handleProceed}>
              Proceed
            </LargeButton> */}

            <>
              {/* <div className={cx( styles["template-radio-btn"])}>
                    <label className="btn btn-secondary" htmlFor="project" key={0} style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="type"
                        id="project"
                        value="project"
                        onClick={this.handleChangeType}
                      />
                      Template from Prev. Projects
                    </label>
                    <label className="btn btn-secondary" htmlFor="template" key={1}>
                      <input
                        type="radio"
                        name="type"
                        id="template"
                        value="template"
                        onClick={this.handleChangeType}
                      />
                      Default and Saved Templates
                    </label>
                  </div> */}
              {/* Nrupali edited */}
              <this.ProjectCategory categoryName = "Select Template" />
              <div
                style={{
                  paddingTop: 10,
                  borderLeftStyle: "dotted",
                  borderLeftWidth: 2,
                  borderColor: "#dcdcdc",
                  paddingLeft: 15,
                  paddingBottom: 10
                }}
              >
                <div className="dropdown" style={dropdown}>
                  <select
                    key="10"
                    className="dropdownbtn"
                    onChange={e => this.handleChangeType(e)}
                    disabled={this.state.editToggle == true ? true : false}
                    name="template_type"
                    style={{
                      boxShadow:
                        touched.template_type && errors.template_type
                          ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                          : ""
                    }}
                    onBlur={handleBlur}
                  >
                    {/* <option value="design" selected disabled>
                  Please Select Project Type
                </option> */}
                    <option value="" selected="selected">
                      Choose template type
                    </option>
                    <option value="project" type>Previous Project Templates</option>
                    <option value="template">Default Templates</option>
                  </select>
                </div>
              </div>

              {/* Nrupali Edited */}
              <this.ProjectSubCategory subCategoryName = "Select Project" /> 
              <div
                style={{
                  paddingTop: 10,
                  borderColor: "#dcdcdc",
                  borderLeftStyle: "dotted",
                  paddingLeft: 55
                }}
              >
                <div className="dropdown" style={dropdown}>
                  {this.props.templateList ? (
                    <select
                      //className={cx(styles["template-select"])}
                      className="dropdownbtn"
                      disabled={this.state.editToggle == true ? true : false}
                      onChange={this.changeTemplate}
                      name="template_id"
                    >
                      <option value="">Select One Project</option>
                      {this.state.selected == "template"
                        ? this.props.templateList.map((item, i) => {
                            if (item.template_name) {
                              console.log(item.template_name);
                              
                              return (
                                <option value={item._id} key={i}>
                                  {/* {this.setState(this.state.ProjectIDforTemplate = item._id)} */}
                                  {/* {console.log(item._id)
                                  } */}
                                  {/* {this.setState(this.state.ProjectIDforTemplate = item._id)} */}
                                  {item.template_name}
                                  {/* {this.props.ProjectIDforTemplate} */}
                                </option>
                              );
                            }
                          })
                        : this.props.templateList.map((item, i) => {
                            if (item.project_name) {
                              return (
                                <option value={item._id} key={i}>
                                  {item.project_name}
                                </option>
                              );
                            }
                          })}
                    </select>
                  ) : null}
                </div>
                {/* <h1>
                  This is IDs of Template
                  {this.state.ProjectIDforTemplate}
                </h1> */}
              </div>
            </>
          </div>

          {/* END | TEMPLATE SELECTION | ADDED BY ABHILASH */}

          <div
            className="editSaveNextBtn"
            style={{ marginLeft: "45%", marginBottom: "7%", marginTop: 50 }}
          >
            
            {this.props.projectType != "new" ? (
              <>
                <LargeButton type="button" onClick={this.editToggle}>
                  Edit
                  <i className="fa fa-floppy-o" aria-hidden="true" />
                </LargeButton>
                <LargeButton
                  type="submit"
                  disabled={this.state.editToggle == true ? true : false}
                >
                  Save
                  <i className="fa fa-floppy-o" aria-hidden="true" />
                </LargeButton>
                <LargeButton type="button" onClick={this.pushNextLocation}>
                  Next &nbsp;&nbsp;&nbsp;
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </LargeButton>
              </>
            ) : (
              <>
                <LargeButton type="submit">
                  Create &nbsp;&nbsp;&nbsp;
                  <i className="fa fa-floppy-o" aria-hidden="true" />
                </LargeButton>
              </>
            )}
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    dataFull: state.projectData,
    projectsData: state.projectData.project,
    isDock: state.projectData.dockProject,
    templateList: state.projectData.templateData,
    token: state.auth.token,
    dockedProject: state.projectData.dockedProject,
    ProjectIDforTemplate: state.projectData.ProjectIDforTemplate,
    Templatetype: state.projectData.Templatetype
  };
};

export default connect(
  mapStateToProps,
  actions
)(formikEnhancer(ProjectScopeForm));
