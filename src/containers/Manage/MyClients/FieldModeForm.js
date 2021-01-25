import React, { Component } from "react";
import styles from "./fieldmode.module.css";
import cx from "classnames";
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
import Backdrop from "Layout/Backdrop/Backdrop";
import Paper from "@material-ui/core/Paper";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";
import InputError from "Layout/InputError/InputError";
import * as URL from "constant/backend_url";
import { LargeButton } from "Layout/styled component/Button";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    client_mobile: Yup.string()
      .required("Mobile is required")
      .test(
        "clientmobilezero",
        "Mobile Number cannot start with zero / required number only",
        function (val) {
          let re = /^[1-9][0-9]*$/;
          if (re.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      )
      .test("clientmobilelen", "Mobile Number Should be 10 digits", function (
        val
      ) {
        let re = /^[0-9]{10,10}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),
    client_first_name: Yup.string().required("First Name is required")
      .test("alphabet", "Enter valid first name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    client_last_name: Yup.string().required("Last Name is required")
      .test("alphabet", "Enter valid last name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    client_email: Yup.string().email("Enter Valid Email").notRequired(),
    client_city: Yup.string().required("Please Enter City"),
    client_state: Yup.string().required("Please Enter State"),
    client_addr: Yup.string().required("Please Enter your Address"),
    client_pincode: Yup.string()
      // .typeError("Pincode Must Be Number")
      .nullable()
      .test("mobilelen", "Pincode Should be 6 digits", function (val) {
        let re = /^[0-9]{6,6}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .required("Client Pincode is required")
  }),

  mapPropsToValues: ({ formdata }) => ({

    ...formdata
  }),

  handleSubmit: (values, { props }) => {
    let body = values;
    body["client_id"] = body._id;
    props.postMyClients(body, props.token);
  },
  displayName: "MyForm"
});

class FieldModeForm extends Component {
  state = {};

  editProfile = () => {
    let body = this.props.values;
    body["client_id"] = body._id;
    if (Object.keys(this.props.errors).length === 0) {
      this.props.editMyClients(body, this.props.token);
    }
  };

  onCityChange = e => {
    let city = e.target.value;
    this.props.setFieldValue("client_city", city);
    let body = {
      city: e.target.value
    };

    const url = `${URL.SERVERBASEURL}${"city"}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          city: response.data
        });

        // alert('hii')
      })
      .catch(error => { });
  };

  dataList = () => {
    if (this.state.city != null) {
      return this.state.city.map(city => {
        return (
          <li
            onClick={this.selectCity}
            id={`${city.city}?${city.state}?${city.pincode}`}
            state={city.state}
            pincode={city.pincode}
            className="form-control  autosearch--li"
            style={{
              backgroundColor: "#fff"
              // height:"30px"
            }}
          >
            {city.city}
          </li>
        );
      });
    } else {
      return <></>;
    }
  };

  selectCity = e => {
    e.preventDefault();
    let data = e.target.id.split("?");
    // alert(JSON.stringify(data))
    this.props.setFieldValue("client_city", data[0]);
    this.props.setFieldValue("client_state", data[1]);
    this.setState({
      city: null
    });
  };

  render() {
    let {
      values,
      handleChange,
      index,
      handleSubmit,
      touched,
      errors,
      handleBlur
    } = this.props;
    return (
      <Backdrop>
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
              <b>Client No: {index + 1}</b>
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
                onClick={
                  values.check !== true
                    ? this.props.onEditClose(index)
                    : this.props.onClose(index)
                }
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="mobileno">Mobile Number* ( Primary )</label>
                <input
                  type="text"
                  name="client_mobile"
                  className={Bootstrap["form-control"]}
                  value={values.client_mobile}
                  onChange={handleChange}
                  placeholder="mobile no"
                  style={
                    touched.client_mobile && errors.client_mobile
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_mobile}
                  value={
                    touched.client_mobile && errors.client_mobile ? "e" : null
                  }

                />
              </div>
              <div className="">
                <label htmlFor="exampleInputEmail1">Email Id</label>
                <input
                  type="text"
                  name="client_email"
                  className={Bootstrap["form-control"]}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={values.client_email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={
                    touched.client_email && errors.client_email
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_email}
                  value={
                    touched.client_email && errors.client_email ? "e" : null
                  }
                />
              </div>
              <div className="">
                <label htmlFor="mobileno">First Name*</label>
                <input
                  type="text"
                  name="client_first_name"
                  className={Bootstrap["form-control"]}
                  value={values.client_first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  style={
                    touched.client_first_name && errors.client_first_name
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />

                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_first_name}
                  value={
                    touched.client_first_name && errors.client_first_name
                      ? "e"
                      : null
                  }
                />
              </div>
              <div className="">
                <label htmlFor="mobileno">Last Name*</label>
                <input
                  type="text"
                  name="client_last_name"
                  className={Bootstrap["form-control"]}
                  value={values.client_last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  style={
                    touched.client_last_name && errors.client_last_name
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_last_name}
                  value={
                    touched.client_last_name && errors.client_last_name
                      ? "e"
                      : null
                  }
                />
              </div>

              <div className="">
                <label htmlFor="mobileno">City*</label>
                <input
                  type="text"
                  name="client_city"
                  className={Bootstrap["form-control"]}
                  value={values.client_city}
                  onChange={this.onCityChange}
                  placeholder="City"
                  style={
                    touched.client_city && errors.client_city
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <Paper
                  id="cities"
                  className={
                    this.state.ToggleCity != null ? "autosearch--ul" : null
                  }
                >
                  {this.dataList()}
                </Paper>
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_city}
                  value={touched.client_city && errors.client_city ? "e" : null}
                />
              </div>
              <div className="">
                <label htmlFor="mobileno">State*</label>
                <input
                  type="text"
                  name="client_state"
                  className={Bootstrap["form-control"]}
                  value={values.client_state}
                  onChange={handleChange}
                  placeholder="State"
                  style={
                    touched.client_state && errors.client_state
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_state}
                  value={
                    touched.client_state && errors.client_state ? "e" : null
                  }
                />
              </div>
              <div className="">
                <label htmlFor="mobileno">Pincode*</label>
                <input
                  type="text"
                  name="client_pincode"
                  className={Bootstrap["form-control"]}
                  value={values.client_pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  style={
                    touched.client_pincode && errors.client_pincode
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_pincode}
                  value={
                    touched.client_pincode && errors.client_pincode ? "e" : null
                  }
                />
              </div>

              <div className="">
                <label htmlFor="mobileno">Address*</label>
                <input
                  type="text"
                  name="client_addr"
                  className={Bootstrap["form-control"]}
                  value={values.client_addr}
                  onChange={handleChange}
                  placeholder="Address"
                  style={
                    touched.client_addr && errors.client_addr
                      ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                      : {}
                  }
                  onBlur={handleBlur}
                />
                <InputError
                  margin={"-10px"}
                  errorMsg={errors.client_addr}
                  value={touched.client_addr && errors.client_addr ? "e" : null}
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
    isServerStatus: state.serverStatus.userFieldModeSaveStatus,
    isServerMsg: state.serverStatus.userFieldModeSaveMessage,
    token: state.auth.token,
    payloadFetchData: state.serverData.fetchUserData,
    userFieldAccess: state.serverStatus.userFieldAccess
  };
};

export default connect(
  mapStateToProps,
  actions
)(formikEnhancer(FieldModeForm));
