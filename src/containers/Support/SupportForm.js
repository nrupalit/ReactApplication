import React from "react";
import Bootstrap from "./../../Bootstrap/bootstrap.module.css";
import styles from "./Support.module.css";
import cx from "classnames";
// import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";

//button
import { XLargeButton } from "Layout/styled component/Button";
import { UploadButton } from "Layout/styled component/Button";

import InputError from "Layout/InputError/InputError";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required")
    // attachment: Yup.string().required("Attachment is required")
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  handleSubmit: (values, { props }) => {
    // alert(JSON.stringify(values))
    props.support(values);

    
  },

  displayName: "MyForm"
});

const SupportForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    onSubmit,
    action,
    setFieldValue
  } = props;
  return (
    <>
      <div
        className={cx(
          Bootstrap.container,
          Bootstrap["col-md-4"],
          styles["support--wrapper"]
        )}
      >
        <form onSubmit={handleSubmit} className={Bootstrap["mb-5"]}>
          <div
            className={cx(
              Bootstrap.row,
              Bootstrap["form-group"],
              styles["support--heading-logo"]
            )}
          >
            {/* <img src={require('../../assets/icons/Logo.png')} height="" alt=""/> */}
          </div>
          <div className={cx(Bootstrap.row, Bootstrap["form-group"])}>
            <h2 className={styles["support--heading"]}>
              <center>
                Support
                <hr
                  style={{
                    width: "45px",
                    height: "2px",
                    color: "#987c46",
                    backgroundColor: "#987c46",
                    alignContent: "center"
                  }}
                />
              </center>
            </h2>
          </div>
          <div className={cx(Bootstrap.row, Bootstrap["form-group"])}>
            <label
              style={{
                fontSize: "17px"
              }}
            >
              Category
            </label>

            <span className={cx("fa fa-angle-down", styles["select__icon"])} />
            <select
              type="text"
              name="category"
              onChange={handleChange}
              className={cx(
                Bootstrap["form-control"],
                styles["select"],
                touched.category && errors.category ? "inputError" : ""
              )}
              style={{ height: "40px" }}
            >
              <option value="info">Information</option>
              <option value="login">Login</option>
              <option value="register">Registration</option>
              <option value="howtouse">Support</option>
            </select>
          </div>
          <div className={cx(Bootstrap.row, Bootstrap["form-group"])}>
            <label
              style={{
                fontSize: "17px"
              }}
            >
              Description
            </label>
            {/* {touched.description && errors.description?'Hahahah':'MMUUUUU'} */}
            <textarea
              rows="5"
              cols="190"
              type="text"
              name="description"
              className={cx(
                "form-control",
                touched.description && errors.description ? "inputError" : ""
              )}
              style={{}}
              style={
                props.touched.description && props.errors.description
                  ? {
                      boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)",
                      height: "180px",
                      border: "none"
                    }
                  : { height: "180px", border: "none" }
              }
              value={values.description}
              onChange={handleChange}
            />
            <InputError
              errorMsg={errors.description}
              value={touched.description && errors.description ? "e" : null}
            />
          </div>
          <div className={cx(Bootstrap.row, Bootstrap["form-group"])}>
            <div
              className={cx(
                Bootstrap["col-md-10"],
                Bootstrap["m-0"],
                Bootstrap["p-0"],
                styles["attachment__fileName"]
              )}
            >
              <label
                style={{
                  fontSize: "17px"
                }}
              >
                Attachment
              </label>
              <input
                type="text"
                name="fileName"
                className={cx("form-control")}
                style={
                  touched.attachment && errors.attachment
                    ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                    : {}
                }
                value={values.attachment}
                disabled
              />
              <InputError
                errorMsg={errors.attachment}
                value={touched.attachment && errors.attachment ? "  " : null}
              />
            </div>
            <div className={cx(Bootstrap["col-md-2"], Bootstrap["m-0"])}>
              <input
                type="file"
                name="attachment"
                onChange={e => {
                  e.preventDefault();
                  props.setFieldValue("attachment", e.target.files[0].name);
                  // console.log((e.currentTarget.files))
                  // props.setFieldValue("attachment", e.currentTarget.files);
                }}
                className={cx(
                  Bootstrap["form-control"],
                  styles["attachment__browser"]
                )}
                // value={values.attachment}
                style={{
                  marginTop: "30px",
                  width: "100%",
                  height: "40px",
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: 2,
                  fontSize: "0",
                  cursor: "pointer"
                }}
              />

              <UploadButton
                style={{
                  backgroundColor: values.attachment ? "#987c46" : "#344466",
                  color: "white",
                  marginTop: "23px"
                }}
              >
                {" "}
                Browse
              </UploadButton>
            </div>
            {/* <span className={cx("fa fa-paperclip",styles['attachment__icon'])}></span>  */}
          </div>
          <div className={Bootstrap.row}>
            <div className={Bootstrap["col-md-3"]}>
              <XLargeButton className={styles.submit_button} type="submit">
                Submit
              </XLargeButton>
            </div>
          </div>
          {/* {JSON.stringify(props, null, 2)} */}
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  actions
)(formikEnhancer(SupportForm));
