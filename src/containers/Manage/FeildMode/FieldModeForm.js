import React from "react";
import styles from "./fieldmode.module.css";
import cx from "classnames";
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
import Backdrop from "Layout/Backdrop/Backdrop";

import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { postUserFieldMode, editUserFieldMode } from "actions/action_authentication"
//import * as actions from "actions/action_authentication";
import InputError from "Layout/InputError/InputError";
import { LargeButton } from "Layout/styled component/Button";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    mobile: Yup.number()
      .typeError("Mobile Number Must Be Number")
      .required("Mobile is required")
      .test("mobilelen", "Mobile Number Should be 10 digits", function (val) {
        let re = /^[0-9]{10,10}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),

    first_name: Yup.string()
      .required("First Name is required")
      .test("alphabet", "Enter valid first name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    last_name: Yup.string().required("Last Name is required")
      .test("alphabet", "Enter valid last name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    role: Yup.string()
      //.min(1)
      // .notOneOf("")
      .required("Role is required"),
    email: Yup.string()
      .email("Email is required")
      .required("Email is required")
  }),

  mapPropsToValues: ({ formdata }) => {
    if (formdata.userrole.name === "user") {
      return {
        ...formdata,
        role: "user"
      }
    }
    else {
      return {
        ...formdata,
        role: ""
      }
    }
  },
  handleSubmit: (values, { props }) => {
    let body = values;
    body["userid"] = body._id;
    props.postUserFieldMode(body, props.token);

  },
  displayName: "MyForm"
});

function FieldModeForm(props) {
  const editProfile = () => {
    let body = props.values;
    body["userid"] = body._id;
    if (Object.keys(props.errors).length === 0) {
      props.editUserFieldMode(props.values, props.token);
    }
  };

  let {
    values,
    handleChange,
    onDelete,
    index,
    handleSubmit,
    touched,
    errors,
    handleBlur
  } = props;

  return (
    <Backdrop>
      <div
        key={index}
        className={cx(
          Bootstrap["col-md-4"],
          styles["fieldform-form"],
          Bootstrap["mt-5"]
        )}
      >
        <div className={Bootstrap[""]}>
          {/* { JSON.stringify(props.values, null, 2)}  */}
          {/* <form> */}
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
            <b>Team Member No: {index + 1}</b>
            <hr
              className={cx(
                styles["field-form-icon-underline"],
                Bootstrap["ml-2"]
              )}
            />

            <span
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
              onClick={values.check != true ? props.onEditClose(index) : props.onClose(index)}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="mobileno">Mobile Number* ( Primary )</label>
              <input
                type="text"
                name="mobile"
                className={Bootstrap["form-control"]}
                value={values.mobile}
                onChange={handleChange}
                placeholder="mobile no"
                style={
                  touched.mobile && errors.mobile
                    ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                    : {}
                }
                onBlur={handleBlur}
              />
              <InputError
                margin={"-10px"}
                errorMsg={errors.mobile}
                value={touched.mobile && errors.mobile ? "e" : null}
                margin={"-10px"}
              />
            </div>
            <div className="">
              <label htmlFor="exampleInputEmail1">Email ID* ( Primary )</label>
              <input
                type="text"
                name="email"
                className={Bootstrap["form-control"]}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter email"
                style={
                  touched.email && errors.email
                    ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                    : {}
                }
                onBlur={handleBlur}
              />
              <InputError
                margin={"-10px"}
                errorMsg={errors.email}
                value={touched.email && errors.email ? "e" : null}
              />
            </div>
            <div className="">
              <label htmlFor="mobileno">First Name*</label>
              <input
                type="text"
                name="first_name"
                className={Bootstrap["form-control"]}
                value={values.first_name}
                onChange={handleChange}
                placeholder="First Name"
                style={
                  touched.first_name && errors.first_name
                    ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                    : {}
                }
                onBlur={handleBlur}
              />

              <InputError
                margin={"-10px"}
                errorMsg={errors.first_name}
                value={touched.first_name && errors.first_name ? "e" : null}
              />
            </div>
            <div className="">
              <label htmlFor="mobileno">Last Name*</label>
              <input
                type="text"
                name="last_name"
                className={Bootstrap["form-control"]}
                value={values.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                style={
                  touched.last_name && errors.last_name
                    ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                    : {}
                }
                onBlur={handleBlur}
              />
              <InputError
                margin={"-10px"}
                errorMsg={errors.last_name}
                value={touched.last_name && errors.last_name ? "e" : null}
              />
            </div>
            <div className="">
              <label htmlFor="mobileno">Role</label>
              <select
                type="text"
                name="role"
                value={values.role}
                className={Bootstrap["form-control"]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Role"
                style={{
                  fontSize: "14px",
                  color: "#4d5c7c",
                  width: "100%",
                  boxShadow:
                    touched.role && errors.role
                      ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                      : ""
                }}
              >
                <option
                  style={{
                    color: "#4d5c7c"
                  }}
                  value={""}

                //selected={values.userrole.name === "" ? true : false}
                >
                  Select Role
                </option>
                <option
                  style={{
                    color: "#4d5c7c"
                  }}

                  value={"user"}
                //selected={values.userrole.name ==== "user" ? true : false}

                >
                  User
                </option>

              </select>
              <InputError
                margin={"-10px"}
                errorMsg={errors.role}
                value={touched.role && errors.role ? "e" : null}
              />
            </div>

            <div className="">
              {values.check != true ? (
                <>
                  <label htmlFor="mobileno">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    className={Bootstrap["form-control"]}
                    value={values.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    style={{
                      width: "100%"
                    }}
                  />
                </>
              ) : null}
            </div>
            <div className={Bootstrap.row}>
              {values.check != true ? (
                <div
                  className={cx(Bootstrap["col-md-4"], Bootstrap["offset-2"])}
                >

                  <LargeButton onClick={onDelete(index)}>
                    Delete &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-trash" aria-hidden="true" />
                  </LargeButton>
                </div>
              ) : null}

              {values.check != true ? (
                <div className={Bootstrap["col-md-2"]}>

                  <LargeButton type="button" onClick={editProfile}>
                    Save &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-floppy-o" aria-hidden="true" />
                  </LargeButton>
                </div>
              ) : (
                  <div
                    className={cx(Bootstrap["col-md-6"], Bootstrap["offset-4"])}
                  >
                    <LargeButton type={errors ? "" : "submit"} style={{
                      marginTop: "10px"
                    }}>
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

const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.userFieldModeSaveStatus,
    isServerMsg: state.serverStatus.userFieldModeSaveMessage,
    token: state.auth.token,
    payloadFetchData: state.serverData.fetchUserData,
    userFieldAccess: state.serverStatus.userFieldAccess
  };
};

export default connect(
  mapStateToProps,
  { postUserFieldMode, editUserFieldMode }
)(formikEnhancer(FieldModeForm));
