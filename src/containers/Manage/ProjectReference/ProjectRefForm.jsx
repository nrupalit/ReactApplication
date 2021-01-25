import React, { Component } from "react";
import cx from "classnames";
import * as actions from "./../../../actions/action_authentication.js";
import { connect } from "react-redux";
import Bootstrap from "Bootstrap/bootstrap.module.css";
import styles from "./projectdetails.module.css";
import Label from "./../UtilsLayout/label";
import { LargeButton } from "Layout/styled component/Button";
import HOC from "HOC/ProjectHOC";
import ProjectSidebarModal from "Layout/ServerSucess/ProjectSidebarModal";
import ProjectLoadStatus from "../../../Layout/ServerSucess/ProjectSidebarModal";
import ServerStatus from "Layout/ServerSucess/ServerStatus";

import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
class ProjectRefForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      editToggle: true,
      projectType: "new",
      templateresult: "",
      selected: "",
      selectedTemplate: "",
      validationStatus: true,
      loadErrorMsg: null,
      created: false,
      flag: false,
      errormsg: ""
    };
    //this.handleChangeType = this.handleChangeType.bind(this);
    //this.changeTemplate = this.changeTemplate.bind(this);
  }

  componentDidMount() {}

  actionbtn = [
    {
      name: "Edit",
      bclass: "btn btn-outline-dark",
      iclass: "fa fa-pencil",
      onClick: this.onEdit
    },
    {
      name: "Save",
      bclass: "btn btn-outline-dark",
      iclass: "fa fa-save",
      onClick: this.onAdd
    },
    {
      name: "Delete",
      bclass: "btn btn-outline-dark",
      iclass: "fa fa-trash",
      onClick: this.onDelete
    }
  ];

  textarea = {
    border: "none",
    display: "block",
    width: "100%",
    height: "46vh",
    boxShadow: "none"
  };
  docs = {
    width: "100%",
    height: "auto",
    borderRadius: "15px",
    boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
    display: "block"
  };
  containers = {
    margin: "0 auto",
    marginTop: "55px",
    width: "80%",
    height: "70vh"
  };
  attach = {
    position: "absolute",
    fontSize: "30px",
    marginLeft: "20px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    zIndex: 1
  };

  upload = {
    marginLeft: "20px",
    float: "right",
    position: "absolute",
    zIndex: 1,
    fontSize: "7px",
    transform: "rotate(180deg)",
    opacity: "0",
    width: "30px",
    height: "30px",
    fontSize: "0px"
    // cursor: this.state.editToggle == true ? "not-allowed" : "pointer",
    // pointer: this.state.editToggle == true ? "none" : "pointer"
  };

  componentWillMount = () => {
    // alert(this.props.editToggle)

    this.setState({
      projectData: this.props.projectData,
      projectType: this.props.projectType,
      labels: this.props.labels,
      editToggle: this.props.editToggle,
      templateData: this.props.templateData
    });
  };

  projectDocumentForm = () => {
    return this.state.labels.map((label, index) => (
      <Label
        onChange={this.getFile}
        key={label.id}
        labelobj={label}
        onChangeLabels={this.onChangeLabels}
        onPushHastags={this.onPushHastags}
        index={index}
        editToggle={this.state.editToggle}
        // hastags={}
      />
    ));
  };

  editToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle
    });
  };

  getFile = event => {
    let input = event.target.files;
    var labels = [];
    let existingLabel = this.state.labels;
    let existingLabelIndex = 0;
    existingLabelIndex = existingLabel.length;

    for (var i = 0; i < input.length; ++i) {
      let ext = input[i]["name"]
        .split(".")
        .pop()
        .toLowerCase();
      let name = input[i]["name"];
      let extlen = ext.length;
      let nlen = name.length;
      name = name.substr(0, nlen - extlen - 1);

      if (ext === "docx" || ext === "doc") {
        labels[i] = {
          id: existingLabelIndex + i + 1,
          url:
            "https://via.placeholder.com/728x90.png?text=D2B+Attachment+File",
          file_type: "BluePrint",
          name: input[i]["name"]
        };
      } else {
        labels[i] = {
          id: existingLabelIndex + i + 1,
          url:
            "https://via.placeholder.com/728x90.png?text=D2B+Attachment+File",
          file_type: "BluePrint",
          name: input[i]["name"]
        };
      }

      // if (ext === "docx" || ext === "doc") {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "word.png",
      //     bg: "#d4e3f4",
      //     format: "DOCX",
      //     file_type: "BluePrint"
      //   };
      // } else if (ext === "pptx" || ext === "ppt") {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "ppt.png",
      //     bg: "#ffe1db",
      //     format: "PPT",
      //     file_type: "BluePrint"
      //   };
      // } else if (ext === "psd" || ext === "pdd") {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "photoshop.png",
      //     bg: "#d3d5e9",
      //     format: "PSD",
      //     file_type: "BluePrint"
      //   };
      // } else if (ext === "jpg" || ext === "jpeg" || ext === "png") {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "image.png",
      //     bg: "#d8f0f7",
      //     format: "Picture"
      //   };
      // } else if (ext === "mp4" || ext === "mkv" || ext === "avi") {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "video.png",
      //     bg: "#e2d8fb",
      //     format: "Video",
      //     file_type: "BluePrint"
      //   };
      // } else if (ext === "pdf") {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "pdf.png",
      //     bg: "#d3d5e9",
      //     format: "PPDF",
      //     file_type: "BluePrint"
      //   };
      // } else {
      //   labels[i] = {
      //     id: existingLabelIndex + i + 1,
      //     name: name,
      //     image: "file.png",
      //     bg: "#d8f0f7",
      //     format: "File",
      //     file_type: "BluePrint"
      //   };
      // }
    }
    labels = existingLabel.concat(labels);
    this.setState({ labels: labels });
    console.log(this.state.labels);
  };

  submitDocumentForm = e => {
    e.preventDefault();
    let body = {};
    var flag = false;
    // alert(JSON.stringify(this.state.projectData[0].project_status))
    body.project_id = this.state.projectData["_id"];
    body.project_docs = this.state.labels;
    alert(JSON.stringify(this.state.projectData));
    this.state.labels.map(label => {
      if (!label.file_information) {
        flag = true;
      }
    });
    if (flag == true) {
      this.setState({
        flag: true,
        errormsg: "Enter valid file information"
      });
    } else {
      body.project_status = this.state.projectData.project_status;
      this.props.updateProjectDocs(body, this.props.token);
      /* if (type == "Next") {
        this.props.hideSuccess()
      } */ this.setState(
        {
          editToggle: !this.state.editToggle,
          created: true
        }
      );
    }
    //this.setState({ projectType: "old" });
  };

  onChangeLabels = index => e => {
    e.preventDefault();
    let labels = this.state.labels;
    labels[index][e.target.name] = e.target.value;
    this.setState({
      labels: labels
    });
  };

  onPushHastags = e => {
    e.preventDefault();
    let labels = this.state.labels;
    labels[e.target.index]["hashtags"] = e.target.hashtags;
    this.setState({
      labels: labels
    });
  };

  push = () => {
    this.setState({ validationStatus: true, loading: false });

    this.props.history.push(
      `/project_plan/estimation/${this.props.isDock[0]._id}`
    );
  };
  pushNextLocation = e => {
    const dockProject = this.props.isDock[0];
    // this.props.history.push(`/project_estimation/${dockProject.project_id}`);
    this.props.history.push(`/project_plan/design_estimation/${dockProject.project_id}`);
    /* if (
      e.key != "Enter" &&
      (this.props.isDock[0].project_status >= 4 ||
        this.state.selectedTemplate != "")
    ) { */
    /* var projects;
      const dockProject = this.props.isDock[0];
      this.props.projectsData.map(project => {
        if (project.project_id == dockProject.project_id) {
          projects = project;
        }
      });
      console.log(projects)
      const projectDocuments = projects.project_docs
        ? projects.project_docs
        : [];

      var documents = projectDocuments.map(item => {
        return {
          url:
            "https://via.placeholder.com/728x90.png?text=D2B+Attachment+File",
          hashtags: item.hashtags,
          file_name: item.name,
          file_information: item.file_information,
          type: item.file_type
        };
        //this.props.templatePage(bodydata, this.props.token);
      });
      const bodyData2 = {
        project_id: dockProject._id,
        project_docs: documents,
        template_id: this.state.selectedTemplate,
        type: this.state.selected,
        project_status: 3
      };
      this.props.updateProjectDocs(bodyData2, this.props.token); */
    /* this.setState({ loading: true });
      setTimeout(this.push, 200);
    } else if (e.key != "Enter") {
      this.setState({
        validationStatus: false,
        loadErrorMsg: `Please select a template first `
      });
    } */
  };

  clearLoadErrorModal = () => {
    this.setState({
      validationStatus: true
    });
  };
  updateState = () => {
    this.setState({
      flag: false,
      errormsg: ""
    });
  };
  render() {
    console.log(this.props.templateList);
    return (
      <>
        {this.state.flag ? (
          <Backdrop>
            <ServerStatus
              modalHeader={this.state.errormsg}
              modalCase={"202"}
              click={this.updateState}
            />
          </Backdrop>
        ) : null}
        {this.state.loading ? (
          <Backdrop>
            <Spinner></Spinner>
          </Backdrop>
        ) : null}
        <div
          style={{ minHeight: "90vh" }}
          onClick={this.props.hideProjectSideBar}
        >
          <form
            style={this.containers}
            className="projectreferebce"
            onSubmit={e => e.preventDefault()}
          >
            {this.state.validationStatus == false ? (
              <ProjectLoadStatus
                modalHeader={this.state.loadErrorMsg}
                modalCase={300}
                click={this.clearLoadErrorModal}
              />
            ) : null}
            <fieldset>
              <div style={{ margin: "30px auto" }}>
                <div style={{ position: "relative" }}>
                  <legend style={{ fontSize: "20px" }}>
                    Project Documents
                    <span
                      className="fa fa-paperclip fa-sm"
                      style={this.attach}
                    />
                    <input
                      type="file"
                      name="files"
                      multiple={true}
                      onChange={this.getFile}
                      style={this.upload}
                      disabled={this.state.editToggle == true ? true : false}
                    />
                  </legend>
                </div>
                <div style={this.docs}>
                  <div />
                  <div
                    style={{
                      overflow: "auto",
                      height: "55vh",
                      backgroundColor:
                        this.state.editToggle == true
                          ? "rgba(240, 239, 239, 0.822)"
                          : "#fff"
                    }}
                  >
                    {this.projectDocumentForm()}
                  </div>
                </div>
              </div>

              <div
                className={cx(
                  Bootstrap.row,
                  styles["projectdetails-btn-wrapper"]
                )}
              >
                <div className={Bootstrap["row"]}>
                  {this.state.projectType != "new" ||
                  this.state.created == true ? (
                    <div className={Bootstrap["col-sm"]}>
                      <LargeButton type="button" onClick={this.editToggle}>
                        Edit &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-pencil-square-o" aria-hidden="true" />
                      </LargeButton>
                    </div>
                  ) : null}

                  <div className={Bootstrap["col-sm"]}>
                    <LargeButton
                      type="button"
                      onClick={e => this.submitDocumentForm(e)}
                      disabled={this.state.editToggle == true ? true : false}
                    >
                      {this.state.projectType == "new" ? "Create" : "Save"}
                      &nbsp;&nbsp;&nbsp;
                      <i class="fa fa-floppy-o" aria-hidden="true" />
                    </LargeButton>
                  </div>
                  <div className={Bootstrap["col-sm"]}>
                    <LargeButton onClick={e => this.pushNextLocation(e)}>
                      Next &nbsp;&nbsp;&nbsp;
                      <i class="fa fa-angle-right" aria-hidden="true" />
                    </LargeButton>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    projectsData: state.projectData.project,
    isDock: state.projectData.dockProject,
    templateList: state.projectData.templateData,
    auth: state.auth,
    newProject: state.projectData.newProject,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  actions
)(HOC(ProjectRefForm));
