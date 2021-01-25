import React, { Component } from "react";

import Bootstrap from "Bootstrap/bootstrap.module.css";
import styles from "./Register.module.css";
import cx from "classnames";

import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";

import * as URL from "constant/backend_url";
import InputError from "Layout/InputError/InputError";

// import {LrgeButton} from './../../Layout/Button/Button';
import { XLargeButton } from "Layout/styled component/Button";
import { UploadButton } from "Layout/styled component/Button";


//smart search
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';



const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    mobile: Yup.string()
      .typeError("Mobile Number Must Be Number")
      .required("Mobile is required")
      .test("mobilelen", "Mobile Number cannot start with zero / required number only", function (val) {
        let re = /^[1-9][0-9]*$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .test("mobilelen", "Mobile Number Should be 10 digits", function (val) {
        let re = /^[0-9]{10,10}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),
    first_name: Yup.string().required("First Name is required")
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
    email: Yup.string()
      .email("Email is required")
      .required("Email is required"),
    pwd: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .test("passwordalphanum", "Password must be AlphaNumeric Only and contain each one", function (val) {
        let re = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .required("Password is required"),
    cpwd: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .oneOf([Yup.ref("pwd"), null], "Passwords must match")
      .required("Confirm Password is required"),
    pin: Yup.string()
      .nullable()
      .notRequired()
      .test("pinlen", "Pincode Should be 6 digits", function (val) {
        let re = /^[0-9]{6,6}$/;
        if (re.test(val) || val == "") {
          return true;
        } else {
          return false;
        }
      })

  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  handleSubmit: (values, { props }) => {
    props.register(values);
  },

  displayName: "MyForm"
});

class RegisterForm extends Component {
  state = {};
  onCityChange = e => {
    let city = e.target.value;
    this.props.setFieldValue("city", city);
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
              backgroundColor: "#fff",
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
    this.props.setFieldValue("city", data[0]);
    this.props.setFieldValue("state", data[1]);
    this.setState({
      city: null
    });
  };

  render() {
    return (
      <>
        <div className={cx(Bootstrap["ml-5"], Bootstrap["mr-5"])}>
          <div
            className={cx(Bootstrap["container"], styles["register-wrapper"])}
          >
            <form onSubmit={this.props.handleSubmit}>
              <div
                className={cx(
                  Bootstrap["form-group"],
                  styles["register-form-headers"]
                )}
              >
                <h1>
                  <center className={Bootstrap["mb-4"]}>
                    Register as D&B expert
                  </center>
                </h1>
                <p className={styles["mystyle"]}>
                  <h3>
                    <center className={Bootstrap["mb-3"]}>
                      Primary Details

                    {/* {JSON.stringify(this.props, null, 2)}  */}
                      <hr className={styles["register--underline"]} />
                    </center>
                  </h3>
                </p>
              </div>

              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap["form-group"],
                  styles["register-form-div"]
                )}
              >
                <div
                  className={cx(
                    Bootstrap["col-md-5"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label>Email Address</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="email"
                    value={this.props.values.email}
                    onChange={this.props.handleChange}
                    style={
                      this.props.touched.email && this.props.errors.email
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                    onBlur={this.props.handleBlur}
                  />
                  <InputError
                    errorMsg={this.props.errors.email}
                    value={
                      this.props.touched.email && this.props.errors.email
                        ? "e"
                        : null
                    }
                  />
                </div>
                <div
                  className={cx(
                    Bootstrap["col-md-4"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Mobile Number</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="mobile"
                    maxLength="10"
                    onChange={this.props.handleChange}
                    value={this.props.values.mobile}
                    style={
                      this.props.touched.mobile && this.props.errors.mobile
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                    onBlur={this.props.handleBlur}
                  />
                  <InputError
                    errorMsg={this.props.errors.mobile}
                    value={
                      this.props.touched.mobile && this.props.errors.mobile
                        ? "e"
                        : null
                    }
                  />
                </div>
              </div>
              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap["form-group"],
                  styles["register-form-div"]
                )}
              >
                <div
                  className={cx(
                    Bootstrap["col-md-5"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> First Name</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="first_name"
                    onChange={this.props.handleChange}
                    value={this.props.values.first_name}
                    style={
                      this.props.touched.first_name &&
                        this.props.errors.first_name
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                    onBlur={this.props.handleBlur}
                  />
                  <InputError
                    errorMsg={this.props.errors.first_name}
                    value={
                      this.props.touched.first_name &&
                        this.props.errors.first_name
                        ? "e"
                        : null
                    }
                  />
                </div>
                <div
                  className={cx(
                    Bootstrap["col-md-4"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Last Name</label>

                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="last_name"
                    onChange={this.props.handleChange}
                    value={this.props.values.last_name}
                    style={
                      this.props.touched.last_name &&
                        this.props.errors.last_name
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                    onBlur={this.props.handleBlur}
                  />
                  <InputError
                    errorMsg={this.props.errors.last_name}
                    value={
                      this.props.touched.last_name &&
                        this.props.errors.last_name
                        ? "e"
                        : null
                    }
                  />
                </div>

              </div>

              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap["form-group"],
                  styles["register-form-div"]
                )}
              >

                <div
                  className={cx(
                    Bootstrap["col-md-5"],
                    styles["register-form-col-div"]
                  )}
                >

                  <label> City</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="city"
                    onChange={this.onCityChange}
                    onBlur={this.props.handleBlur}
                    value={this.props.values.city}
                  />
                  <Paper
                    id="cities"
                    className={
                      this.state.ToggleCity != null ? "autosearch--ul" : null
                    }
                  >
                    {this.dataList()}
                  </Paper>
                </div>
                <div
                  className={cx(
                    Bootstrap["col-md-4"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label>State</label>

                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="state"
                    onChange={this.props.handleChange}
                    value={this.props.values.state}
                    onBlur={this.props.handleBlur}
                  />
                </div>
              </div>
              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap["form-group"],
                  styles["register-form-div"]
                )}
              >
                <div
                  className={cx(
                    Bootstrap["col-md-5"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Locality / Area</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="area"
                    onChange={this.props.handleChange}
                    value={this.props.values.area}
                    onBlur={this.props.handleBlur}
                  />
                </div>
                <div
                  className={cx(
                    Bootstrap["col-md-4"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Pin Code</label>
                  <input
                    class={Bootstrap["form-control"]}
                    name="pin"
                    type="text"
                    onChange={this.props.handleChange}
                    value={this.props.values.pin}
                    onBlur={this.props.handleBlur}
                    style={
                      this.props.touched.pin && this.props.errors.pin
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                  />
                  <InputError
                    errorMsg={this.props.errors.pin}
                    value={
                      this.props.touched.pin && this.props.errors.pin
                        ? "e"
                        : null
                    }
                  />
                </div>
              </div>
              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap["form-group"],
                  styles["register-form-div"]
                )}
              >
                <div
                  className={cx(
                    Bootstrap["col-md-9"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Address</label>
                  <textarea
                    class={Bootstrap["form-control"]}
                    type="text"
                    name="addr"
                    onChange={this.props.handleChange}
                    style={{
                      height: "50px"
                    }}
                    value={this.props.values.addr}
                  />
                </div>
              </div>
              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap["form-group"],
                  styles["register-form-div"]
                )}
              >
                <div
                  className={cx(
                    Bootstrap["col-md-5"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Password</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="password"
                    name="pwd"
                    onChange={this.props.handleChange}
                    placeholder="Minimum 6 Characters. AlphaNumeric"
                    style={
                      this.props.touched.pwd && this.props.errors.pwd
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                    onBlur={this.props.handleBlur}
                    value={this.props.values.pwd}
                  />
                  <InputError
                    errorMsg={this.props.errors.pwd}
                    value={
                      this.props.touched.pwd && this.props.errors.pwd
                        ? "e"
                        : null
                    }
                  />
                </div>

                <div
                  className={cx(
                    Bootstrap["col-md-4"],
                    styles["register-form-col-div"]
                  )}
                >
                  <label> Confirm Password</label>
                  <input
                    class={Bootstrap["form-control"]}
                    type="password"
                    name="cpwd"
                    onChange={this.props.handleChange}
                    value={this.props.values.cpwd}
                    style={
                      this.props.touched.cpwd && this.props.errors.cpwd
                        ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                        : {}
                    }
                    onBlur={this.props.handleBlur}
                  />
                  <InputError
                    errorMsg={this.props.errors.cpwd}
                    value={
                      this.props.touched.cpwd && this.props.errors.cpwd
                        ? "e"
                        : null
                    }
                  />
                </div>
              </div>
              {this.props.type == "company" ? (
                <div
                  className={cx(
                    Bootstrap["form-group"],
                    styles["register-form-headers"]
                  )}
                >
                  <p className={styles["mystyle"]}>
                    <h3>
                      <center
                        className={cx(Bootstrap["mb-5"], Bootstrap["mt-3"])}
                      >
                        Company Details
                        <hr className={styles["register--underline"]} />
                      </center>
                    </h3>
                  </p>
                </div>
              ) : null}
              {this.props.type == "company" ? (
                <>
                  <div
                    className={cx(
                      Bootstrap.row,
                      Bootstrap["form-group"],
                      styles["register-form-div"]
                    )}
                  >
                    <div className={cx(Bootstrap["col-md-5"])}>
                      <label> Company Name</label>

                      <input
                        class={Bootstrap["form-control"]}
                        type="text"
                        name="comp_name"
                        onChange={this.props.handleChange}
                        value={this.props.values.comp_name}
                        onBlur={this.props.handleBlur}
                      />
                    </div>
                    <div className={cx(Bootstrap["col-md-4"])}>
                      <label> Company Brand</label>

                      <input
                        class={Bootstrap["form-control"]}
                        type="text"
                        name="comp_brand"
                        onChange={this.props.handleChange}
                        value={this.props.values.comp_brand}
                      />
                    </div>
                  </div>
                  <div className={Bootstrap.row} />
                </>
              ) : null}
              <div
                className={cx(
                  Bootstrap["form-group"],
                  styles["register-form-headers"],
                  Bootstrap["mt-3"],
                  Bootstrap["mb-5"]
                )}
              >
                <div className={Bootstrap.row}>
                  <div
                    className={cx(
                      Bootstrap["col-md-2"],
                      styles["register-form-div"]
                    )}
                  >
                    <input
                      // class={Bootstrap["form-control"]}
                      type="file"
                      name="comp_logo"
                      onChange={e => {
                        e.preventDefault()
                        this.props.setFieldValue('comp_logo', e.target.files[0].name)
                      }}
                      style={{
                        backgroundColor: "#344466",
                        color: "#ffffff",
                        opacity: 0,
                        zIndex: 2,
                        position: "absolute",
                        cursor: "pointer",
                        top: 10,
                        width: "70px",
                        left: "30px",
                        fontSize: 0
                      }}
                      onBlur={this.props.handleBlur}
                      size="40"
                    />
                    <UploadButton
                      style={{
                        // fontSize: "12px",
                        // position: "absolute",
                        top: 20,
                        backgroundColor:
                          this.props.values.comp_logo == null
                            ? "#344466"
                            : "#987c46",
                        // color: "white",
                        // width: "80px",
                        // height: "35px",
                        // textAlign: "center",
                        left: "30px"
                        // paddingTop: "6px",
                        // borderRadius: "6px",
                        // fontWeight: "400"
                      }}
                    >
                      {this.props.values.comp_logo == null
                        ? " Upload Logo"
                        : this.props.values.comp_logo}
                    </UploadButton>
                    <span
                      style={{
                        fontSize: "13px",
                        position: "absolute",
                        top: 52,
                        left: 35,
                        color: "#cfcfcf"
                      }}
                    >
                      Max Size 5mb
                    </span>
                  </div>
                  <div className={"col-md-3"}>
                    <XLargeButton
                      type="submit"
                      className={styles["register_btn"]}
                    >
                      Register
                    </XLargeButton>
                  </div>
                </div>
              </div>
              <div
                className={cx(
                  Bootstrap["form-group"],
                  styles["register-form-headers"],
                  Bootstrap["mb-5"]
                )}
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default connect(
  null,
  actions
)(formikEnhancer(RegisterForm));
