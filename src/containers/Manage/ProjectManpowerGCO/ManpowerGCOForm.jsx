import React, { Component } from "react";
import styles from "./mymanpower.module.css";
import cx from "classnames";
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
import Backdrop from "Layout/Backdrop/Backdrop";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { createDesignation } from "actions/action_authentication";
//import * as actions from "actions/action_authentication";
import InputError from "Layout/InputError/InputError";
import { LargeButton } from "Layout/styled component/Button";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    designation: Yup.string().required("Designation is required"),
    uom: Yup.string()
      .required("Unit of Measure is required")
      .matches(/^([^0-9]*)$/, "Unit of Measure is invalid"),
    cost: Yup.string()
      .required("Cost is required")
      .matches(/^\d{1,}$/, "Cost is invalid"),
    billing: Yup.string()
      .required("Billing is required")
      .matches(/^\d{1,}$/, "Billing is invalid"),
    workdays: Yup.string()
      .required("Workdays is required")
      .matches(/^[0-7]$/, "Workdays must be between 1 and 7"),
    offdays: Yup.string().required("Offdays is required")
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),

  handleSubmit: (values, { props }) => {
    let body = { ...values, status: 1 };
    props.createDesignation(body, props.token);
    values.errors = false;
    props.toggleOperationType();
    //document.getElementById("closebtn").click();
  },
  displayName: "ManpowerForm"
});

class ManpowerGCOForm extends Component {
  state = {
    errors: true,
    add: false
  };

  componentWillMount() {
    let values = this.props.values;
    values.errors = true;
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  editProfile = () => {
    let body = this.props.values;
    body["designation_id"] = body._id;
    body["status"] = 1;
    if (Object.keys(this.props.errors).length === 0) {
      this.props.createDesignation(body, this.props.token);
      //document.getElementById("closebtn").click();
    }
  };

  render() {
    let {
      values,
      handleChange,
      index,
      handleSubmit,
      touched,
      errors,
      handleBlur,

    } = this.props;
    return (
      <Backdrop zIndexLevel={1}>
        <div
          className={cx(
            Bootstrap["col-md-4"],
            styles["fieldform-form"],
            Bootstrap["mt-5"]
          )}

        >
          <div className={Bootstrap[""]}>
            <div
              className={cx(
                Bootstrap["form-group"],
                Bootstrap["mb-8"],
                styles["fieldmode-main__logo--text"]
              )}
            >
              <img
                src={require("../../../assets/icons/Smile_icon.svg")}
                className="footer_icon_img"
                width="50px"
                height="50px"
                alt=""
              />
              <b>Manpower No: {index + 1}</b>
              <hr
                className={cx(
                  styles["field-form-icon-underline"],
                  Bootstrap["ml-2"]
                )}
              />

              <span
                id="closebtn"
                className={"fas fa-times fa-2x"}
                style={{
                  float: "right",
                  position: "absolute",
                  top: "0",
                  left: "90%",
                  marginTop: "5%",
                  width: "100px",
                  height: "50px",
                  color: "#344466"
                }}
                onClick={e =>
                  this.props.closePopup(
                    index,
                    values.errors,
                    this.props.operationType
                  )
                }
              />
            </div>
            <form onSubmit={handleSubmit} id="manpowerform">
              <div className="">
                <label htmlFor="designation">Designation* (Primary)</label>
                <input
                  type="text"
                  name="designation"
                  className={Bootstrap["form-control"]}
                  value={values.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  style={
                    touched.designation && errors.designation
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.designation}
                  value={touched.designation && errors.designation ? "e" : null}

                />
              </div>
              <div className="">
                <label htmlFor="uom">Unit of Measure*</label>
                <input
                  type="text"
                  name="uom"
                  className={Bootstrap["form-control"]}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={values.uom}
                  onChange={handleChange}
                  placeholder="Unit of Measure"
                  style={
                    touched.uom && errors.uom
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.uom}
                  value={touched.uom && errors.uom ? "e" : null}
                />
              </div>
              <div className="">
                <label htmlFor="cost">Cost per Unit*</label>
                <input
                  type="text"
                  name="cost"
                  className={Bootstrap["form-control"]}
                  value={values.cost}
                  onChange={handleChange}
                  placeholder="Cost per Unit"
                  style={
                    touched.cost && errors.cost
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />

                <InputError
                  margin={"-10px"}
                  errorMsg={errors.cost}
                  value={touched.cost && errors.cost ? "e" : null}
                />
              </div>
              <div className="">
                <label htmlFor="billing">Billing per Unit*</label>
                <input
                  type="text"
                  name="billing"
                  className={Bootstrap["form-control"]}
                  value={values.billing}
                  onChange={handleChange}
                  placeholder="Billing per Unit"
                  style={
                    touched.billing && errors.billing
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.billing}
                  value={touched.billing && errors.billing ? "e" : null}
                />
              </div>

              <div className="">
                <label htmlFor="workdays">Workdays for week*</label>
                <input
                  type="text"
                  name="workdays"
                  className={Bootstrap["form-control"]}
                  value={values.workdays}
                  onChange={handleChange}
                  placeholder="Workdays"
                  style={
                    touched.workdays && errors.workdays
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.workdays}
                  value={touched.workdays && errors.workdays ? "e" : null}
                />
              </div>
              <div className="">
                <label htmlFor="offdays">Off days*</label>
                <input
                  type="text"
                  name="offdays"
                  className={Bootstrap["form-control"]}
                  value={values.offdays}
                  onChange={handleChange}
                  placeholder="Off days"
                  style={
                    touched.offdays && errors.offdays
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.offdays}
                  value={touched.offdays && errors.offdays ? "e" : null}
                />
              </div>

              <div className={Bootstrap.row}>
                {values.check !== true ? (
                  <div
                    className={cx(Bootstrap["col-md-2"], Bootstrap["offset-4"])}
                  >
                    <LargeButton type="button" onClick={this.editProfile}>
                      Save &nbsp;&nbsp;&nbsp;
                      <i className="fa fa-floppy-o" aria-hidden="true" />
                    </LargeButton>
                  </div>
                ) : (
                    <div
                      className={cx(Bootstrap["col-md-6"], Bootstrap["offset-4"])}
                    >
                      <LargeButton type="submit">
                        Create &nbsp;&nbsp;&nbsp;
                      <i className="fa fa-floppy-o" aria-hidden="true" />
                      </LargeButton>
                    </div>
                  )}
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.userDesignationStatus,
    isServerMsg: state.serverStatus.userDesignationMessage,
    token: state.auth.token,
    payloadFetchData: state.serverData.fetchDesignationList,
    userFieldAccess: state.serverStatus.userDesignationAccess
  };
};

export default connect(
  mapStateToProps,
  { createDesignation }
)(formikEnhancer(ManpowerGCOForm));
