import React, { Component } from "react";
import cx from "classnames";
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
import styles from "./projectdetails.module.css";
import Footer from "./../../../components/Footer/Footer";
import { LargeButton } from "Layout/styled component/Button";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
// ACTIONS (from redux) used on this page: updateProjectBreif(), hideProjectSideBar()
// import * as actions from "actions/action_authentication";
import { updateProjectBreif, hideProjectSidebar as hideProjectSideBar } from "actions/action_authentication";
import InputError from "Layout/InputError/InputError";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    project_brief: Yup.string()
      .nullable()
      .required("Project Brief is required")
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  handleSubmit: (values, { props }) => {
    let body = values;
    body["project_id"] = body._id;
    body['working_page'] = 3;
    props.updateProjectBreif(body, props.token);

  },
  displayName: "ProjectbriefForm"
});

class ProjectbriefForm extends Component {
  state = {
    editToggle: true
  };

  editToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle
    });
  };

  componentWillMount = () => {
    // alert(this.props.projectType)
    if (this.props.projectType == "new") {

      this.setState({
        editToggle: false
      })
    }
  }

  pushNextLocation = () => {
    this.props.history.push(`/project_documents/${this.props.values.project_id}`)
  }


  textarea = {
    border: "none",
    display: "block",
    width: "100%",
    height: "46vh",
    boxShadow: "none",
    boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 15px",
    borderRadius: "8px",
    height: "60vh"
  };

  containers = {
    margin: "0 auto",
    marginTop: "55px",
    width: "50%",
    height: "80%"
  };

  render() {
    let {
      values,
      handleChange,
      handleSubmit,
      handleBlur,
      errors,
      touched,
      projectType
    } = this.props;
    return (
      <>
        <div style={{ minHeight: "90vh" }} onClick={this.props.hideProjectSideBar}>
          <form style={this.containers} onSubmit={handleSubmit}>
            <fieldset>
              <legend style={{ fontSize: "20px" }}>Project Brief</legend>
              <textarea
                rows="20"
                cols="90"
                placeholder="Enter Project Brief Here"
                disabled={this.state.editToggle == true ? true : false}
                className="projectbreif__textarea"
                value={values.project_brief || ''}
                onChange={handleChange}
                name='project_brief'
                style={{
                  boxShadow:
                    touched.project_description && errors.project_description
                      ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                      : "",
                  padding: "15px"
                }}
                autoFocus={true}
              />
              <InputError
                errorMsg={errors.project_brief}
                value={
                  touched.project_brief && errors.project_brief ? "e" : null
                }
              />
              <div
                className={cx(
                  Bootstrap.row,

                  styles["projectdetails-btn-wrapper"]
                )}
              >

                {/* Edit, Save, Next, Create Buttons */}

                {
                  projectType == "old" ? 
                  (
                  <>
                    <div className={Bootstrap["row"]}>
                      <div className={Bootstrap["col-sm"]}>
                        <LargeButton
                          className={cx(Bootstrap.btn)}
                          type="button"
                          onClick={this.editToggle}
                        >
                          Edit &nbsp;&nbsp;&nbsp;&nbsp;
                          <i className="fa fa-pencil-square-o" aria-hidden="true" />
                        </LargeButton>
                      </div>

                      
                      <div className={Bootstrap["col-sm"]} style={{ marginLeft: "10px" }}>
                        <LargeButton disabled={this.state.editToggle == true ? true : false}>
                          {"Save"}
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-floppy-o" aria-hidden="true" />
                        </LargeButton>
                      </div>


                      <div className={Bootstrap["col-sm"]} style={{ marginLeft: "10px" }}>
                        <LargeButton
                          className={cx(Bootstrap.btn)}
                          type="button"
                          onClick={this.pushNextLocation}
                        >
                          Next &nbsp;&nbsp;&nbsp;&nbsp;
                          <i className="fa fa-angle-right" aria-hidden="true" />
                        </LargeButton>
                      </div>
                    </div>
                  </>
                ) 
                : 
                  <div className="col-2 offset-5">
                    <LargeButton disabled={this.state.editToggle == true ? true : false}>
                      {"Create"}
                      &nbsp;&nbsp;&nbsp;
                      <i className="fa fa-floppy-o" aria-hidden="true" />
                    </LargeButton>
                  </div>
                }
              </div>
            </fieldset>
          </form>
        </div>
        <div className="projectbrief__footer">
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  { updateProjectBreif, hideProjectSideBar }
)(formikEnhancer(ProjectbriefForm));