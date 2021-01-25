import React, { Component } from "react";
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
import cx from "classnames";
import styles from "./projectdetails.module.css";

import { LargeButton } from "Layout/styled component/Button";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
// ACTIONS (from redux) used on this page: projectDetails(), editProjectDetails(), deleteProjectDetails()
// import * as actions from "actions/action_authentication";
import { projectDetails, editProjectDetails, deleteProjectDetails } from "actions/action_authentication";
import InputError from "Layout/InputError/InputError";
import * as URL from "constant/backend_url";

import Paper from '@material-ui/core/Paper';

// setFieldValue() is used from formik library
// props.type is coming from parent component CreateForm

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    project_name: Yup.string().required("Project Name is required"),
    project_description: Yup.string().required(
      "Project Description is required"
    ),
    client_mobile: Yup.string()
      // .typeError("Mobile Number Must Be Number")
      .required("Mobile is required")
      .test("clientmobilezero", "Mobile Number cannot start with zero / required number only", function (val) {
        let re = /^[1-9][0-9]*$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .test("clientmobilelen", "Mobile Number Should be 10 digits", function (val) {
        let re = /^[0-9]{10,10}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),
    client_email: Yup.string().email("Enter Valid Email"),
    site_mobile: Yup.string()
      // .typeError("Mobile Number Must Be Number")
      .required("Mobile is required")
      .test("sitemobilezero", "Mobile Number cannot start with zero / required number only", function (val) {
        let re = /^[1-9][0-9]*$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .test("sitemobilelen", "Mobile Number Should be 10 digits", function (val) {
        let re = /^[0-9]{10,10}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),
    site_email: Yup.string().email("Enter Valid Email"),
    contactPerson_mobile: Yup.string()
      // .typeError("Mobile Number Must Be Number")
      .required("Mobile is required")
      .test("clientmobilezero", "Mobile Number cannot start with zero / required number only", function (val) {
        let re = /^[1-9][0-9]*$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .test("clientmobilelen", "Mobile Number Should be 10 digits", function (val) {
        let re = /^[0-9]{10,10}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),
    client_first_name: Yup.string().required("Client First Name is required")
      .test("alphabet", "Enter valid first name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    client_last_name: Yup.string().required("Client Last Name is required")
      .test("alphabet", "Enter valid last name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    client_city: Yup.string().required("Client City is required"),
    client_state: Yup.string().required("Client State is required"),
    client_area: Yup.string(),
    client_pincode: Yup.string()
      .nullable()
      .test("mobilelen", "Pincode Should be 6 digits", function (val) {
        let re = /^[0-9]{6,6}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      })
      .required("Client Pincode is required"),
    client_addr: Yup.string(),
    site_first_name: Yup.string().required("First Name is required")
      .test("alphabet", "Enter valid first name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    site_last_name: Yup.string().required("Last Name is required")
      .test("alphabet", "Enter valid last Name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    site_city: Yup.string().required("Site City is required"),
    site_state: Yup.string().required("Site State is required"),
    site_addr: Yup.string(),
    contactPerson_name: Yup.string().required("Contact Name is required")
      .test("alphabet", "Enter valid contact name", function (val) {
        let re = /^[a-zA-Z]*$/;
        if (re.test(val)) {
          return true
        } else {
          return false
        }
      }),
    same_type: Yup.number().default(0)
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  // handleSubmit handles creation of new project and editing of a project
  handleSubmit: (values, { props }) => {
    // alert(JSON.stringify(values))
    if (props.type == "new") {
      let body = values;
      if (values.same_type == 1) {
        body.site_mobile = body.client_mobile;
        body.site_email = body.client_email;
        body.site_first_name = body.client_first_name;
        body.site_last_name = body.client_last_name;
        body.site_city = body.client_city;
        body.site_state = body.client_state;
        body.site_addr = body.client_addr;

      }
      props.projectDetails(body, props.token);
    } else {
      let body = values;
      body.project_id = body._id
      if (values.same_type == 1) {
        body.site_mobile = body.client_mobile;
        body.site_email = body.client_email;
        body.site_first_name = body.client_first_name;
        body.site_last_name = body.client_last_name;
        body.site_city = body.client_city;
        body.site_state = body.client_state;
        body.site_addr = body.client_addr;
      }
      // alert(JSON.stringify(values))
      props.editProjectDetails(body, props.token);
      // ALSO UPDATE DOCKPROJECT
      // this.props.dockProject() 
      // dockProject is not API call
      // when editted successfully, backend should provide updated project details and they should be added in dockProject
    }
  },
  enableReinitialize: true,
  displayName: "MyForm"
});

class Create extends Component {
  state = {
    editToggle: false,
    sameToggle: false,
    editClientToggle: false,
  };

  componentWillMount = props => {
    if (this.props.type == "new") {
      this.setState({
        editToggle: true,
        clientDetails: null
      });
    }
    if (this.props.values.same_type == 1) {
      this.setState({
        sameToggle: true,
        clientDetails: null
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.type !== this.props.type) {
      if (nextProps.type == "new") {
        this.setState({
          editToggle: true
        });
      } else {
        this.setState({
          editToggle: false
        });
      }
    }
  };



  onCityChange = target => e => {
    // alert(target)
    let city = e.target.value;
    if (target == "Client") {
      this.props.setFieldValue("client_city", city);
    } else {
      this.props.setFieldValue("site_city", city);
    }
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
        // alert(JSON.stringify(response))
        if (target == "Client") {
          this.setState({
            clientCity: response.data
          });
        } else {
          this.setState({
            siteCity: response.data
          });
        }
      })
      .catch(error => { });
  };

  cityDataList = () => {
    if (this.state.clientCity != null) {
      return this.state.clientCity.map(city => {
        return (
          <li
            onClick={this.selectCity("Client")}
            id={`${city.city}?${city.state}?${city.pincode}`}
            state={city.state}
            pincode={city.pincode}
            className="form-control  autosearch--li"
            style={{
              backgroundColor: "#fff"
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

  siteDataList = () => {
    if (this.state.siteCity != null) {
      return this.state.siteCity.map(city => {
        return (
          <li
            onClick={this.selectCity("Site")}
            id={`${city.city}?${city.state}?${city.pincode}`}
            state={city.state}
            pincode={city.pincode}
            className="form-control  autosearch--li"
            style={{
              backgroundColor: "#fff"
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

  selectCity = target => e => {
    // alert(target)
    e.preventDefault();
    let data = e.target.id.split("?");
    if (target == "Client") {
      this.props.setFieldValue("client_city", data[0]);
      this.props.setFieldValue("client_state", data[1]);
      this.setState({
        clientCity: null
      });
    } else {
      this.props.setFieldValue("site_city", data[0]);
      this.props.setFieldValue("site_state", data[1]);
      this.setState({
        siteCity: null
      });
    }
  };

  siteDataList = () => {
    if (this.state.siteCity != null) {
      return this.state.siteCity.map(city => {
        return (
          <li
            onClick={this.selectCity("Site")}
            id={`${city.city}?${city.state}?${city.pincode}`}
            state={city.state}
            pincode={city.pincode}
            className="form-control  autosearch--li"
            style={{
              backgroundColor: "#fff"
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

  sameAsAbove = e => {
    // alert(e.target.value);
    let values = this.props.values;
    let errors = this.props.errors;
    if (e.target.value == 0) {
      if (
        errors.client_email == null &&
        values.client_mobile != "" &&
        errors.client_mobile == null &&
        values.client_first_name != "" &&
        errors.client_first_name == null &&
        values.client_last_name != "" &&
        errors.client_last_name == null &&
        values.client_city != "" &&
        errors.client_city == null &&
        values.client_state != "" &&
        errors.client_state == null &&
        errors.client_addr != ""
      ) {
        this.setState({
          sameToggle: !this.state.sameToggle,
          sameToggleError: false
        });
        this.props.setFieldValue("site_email", values.client_email);
        this.props.setFieldValue("site_mobile", values.client_mobile);
        this.props.setFieldValue("site_first_name", values.client_first_name);
        this.props.setFieldValue("site_last_name", values.client_last_name);
        this.props.setFieldValue("site_city", values.client_city);
        this.props.setFieldValue("site_state", values.client_state);
        this.props.setFieldValue("site_addr", values.client_addr);
        this.props.errors.client_city = "City is required";

        this.props.setFieldValue("same_type", 1);
      } else {
        this.setState({
          sameToggleError: true
        });
        this.props.setFieldValue("same_type", 0);
      }
    }
    else {
      this.setState({
        sameToggle: !this.state.sameToggle,
        sameToggleError: false
      });
      this.props.setFieldValue('same_type', 0)
    }
  };

  ///client search api
  onClientChange = e => {
    let body = {
      client_mobile: e.target.value
    };

    this.props.setFieldValue("client_mobile", e.target.value);
    if (e.target.value.length <= 2) {
      this.setState({ clientDetails: null })
    }
    else if (e.target.value.length > 2) {
      const url = `${URL.SERVERBASEURL}${"clientsearch"}`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "access-token": this.props.token
        }
      })
        .then(res => res.json())
        .then(response => {
          this.setState({
            clientDetails: response.data
          });

          // alert(JSON.stringify(response));
        })
        .catch(error => { });
    }
    this.setState({
      editClientToggle: false
    })
  };

  selectClient = e => {
    var pincode;
    e.preventDefault();
    let data = e.target.id.split("?");
    this.props.setFieldValue("client_mobile", data[0] == null || data[0] == "undefined" ? " " : data[0]);
    this.props.setFieldValue("client_email", data[1] == null || data[1] == "undefined" ? " " : data[1]);
    this.props.setFieldValue("client_first_name", data[2] == null || data[2] == "undefined" ? " " : data[2]);
    this.props.setFieldValue("client_last_name", data[3] == null || data[3] == "undefined" ? " " : data[3]);
    this.props.setFieldValue("client_city", data[4] == null || data[4] == "undefined" ? " " : data[4]);
    this.props.setFieldValue("client_state", data[5] == null || data[5] == "undefined" ? " " : data[5]);
    if (data[6] != null && data[6] != "undefined") {
      pincode = data[6].replace(/\s/g, "")
    }
    this.props.setFieldValue("client_pincode", data[6] == null || data[6] == "undefined" ? " " : pincode);
    this.props.setFieldValue("client_area", data[7] == null || data[7] == "undefined" ? " " : data[7]);
    this.props.setFieldValue("client_addr", data[8] == null || data[8] == "undefined" ? "  " : data[8]);

    this.setState({
      clientDetails: null,
      editClientToggle: true
    });
  };

  clientDetailsDataList = () => {
    if (this.state.clientDetails != null) {
      return this.state.clientDetails.map(client => {
        return (
          <li
            onClick={this.selectClient}
            id={`${client.client_mobile}?${client.client_email}?${
              client.client_first_name
              }?${client.client_last_name}?${client.client_city}
            ?${client.client_state}?${client.client_pincode}
            ?${client.client_area}?${client.client_addr}`}
            className="form-control  autosearch--li"
            style={{
              backgroundColor: "#fff"
            }}
          >
            {client.client_first_name} {client.client_last_name}
          </li>
        );
      });
    } else {
      return <></>;
    }
  };

  editForm = () => {
    this.setState({
      editToggle: !this.state.editToggle
    });
  };

  // FUNCTION TO DELETE A PROJECT
  deleteProject = () => {
    this.props.deleteProjectDetails({ project_id: this.props.values._id}, this.props.token);
  }


  render() {
    let {
      values,
      handleChange,
      handleSubmit,
      handleBlur,
      errors,
      touched
    } = this.props;
    // console.log(this.props);
    let { sameToggle } = this.state;
    return (
      <div
        style={{
          margin: "0px auto",
          width: "80%",
          position: "sticky",
          height: "80%"
        }}
      >
        <form style={{ margin: "auto", width: "70%" }} onSubmit={handleSubmit}>
          {/* {JSON.stringify(this.props, null, 2)} */}
          <fieldset>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="col-md-12">
                  <label htmlFor="inputProjectNo" style={this.label}>
                    Project Name
                  </label>
                  <input
                    name="project_name"

                    value={values.project_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className="form-control"
                    id="inputProjectNo"
                    place="Your Project Number"
                    style={{
                      boxShadow:
                        touched.project_name && errors.project_name
                          ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                          : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                      border: "none"
                    }}
                    disabled={this.state.editToggle == true ? false : true}
                  />
                  <InputError
                    errorMsg={errors.project_name}
                    value={
                      touched.project_name && errors.project_name ? "e" : null
                    }
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <div className="col-md-12">
                  <label htmlFor="inputPno" style={this.label}>
                    Project ID
                  </label>
                  <input
                    name="project_id"
                    value={values.project_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className="form-control"
                    id="inputPno"
                    place="Project Id"
                    style={{
                      boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                      border: "none"
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-md-12">
              <label style={this.label} htmlFor="inputDescription">
                Description
              </label>
              <input
                name="project_description"
                value={values.project_description}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                className="form-control"
                id="inputDescription"
                place="Project Description"
                style={{
                  boxShadow:
                    touched.project_description && errors.project_description
                      ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                      : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",

                  border: "none",
                  height: "70px"
                }}
                disabled={this.state.editToggle == true ? false : true}
              />
              <InputError
                errorMsg={errors.project_description}
                value={
                  touched.project_description && errors.project_description
                    ? "e"
                    : null
                }
              />
            </div>

            <div>
              <legend
                style={{
                  margin: "10px auto",
                  // textDecoration: "underline",
                  textAlign: "center",
                  color: "#78849e",
                  fontSize: "21px"
                }}
              >
                Client Details
                <hr
                  style={{
                    width: "30px",
                    height: "2px",
                    color: "#987c46",
                    backgroundColor: "#987c46",
                    alignContent: "center",
                    marginLeft: "48%"
                  }}
                />
              </legend>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputMobileNo" style={this.label}>
                      Mobile Number
                    </label>
                    <input
                      name="client_mobile"
                      value={values.client_mobile}
                      onChange={this.onClientChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputMobileNo"
                      place="Your mobile number"
                      style={{
                        boxShadow:
                          touched.client_mobile && errors.client_mobile
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle == true ? false : true}
                    />
                    <Paper>
                      {this.clientDetailsDataList()}
                    </Paper>
                    <InputError
                      errorMsg={errors.client_mobile}
                      value={
                        touched.client_mobile && errors.client_mobile
                          ? "e"
                          : null
                      }
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputEmail" style={this.label}>
                      Email address
                    </label>
                    <input
                      name="client_email"
                      value={values.client_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      place="Your email address"
                      style={{
                        boxShadow:
                          touched.client_email && errors.client_email
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",

                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true}
                    />
                    <InputError
                      errorMsg={errors.client_email}
                      value={
                        touched.client_email && errors.client_email ? "e" : null
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputFirstName" style={this.label}>
                      First Name
                    </label>
                    <input
                      name="client_first_name"
                      value={values.client_first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                      place="Your First name"
                      style={{
                        boxShadow:
                          touched.client_first_name && errors.client_first_name
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",

                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true}
                    />
                    <InputError
                      errorMsg={errors.client_first_name}
                      value={
                        touched.client_first_name && errors.client_first_name
                          ? "e"
                          : null
                      }
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputLastName" style={this.label}>
                      Last Name
                    </label>
                    <input
                      name="client_last_name"
                      value={values.client_last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      place="Your Last name"
                      style={{
                        boxShadow:
                          touched.client_last_name && errors.client_last_name
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true} />
                    <InputError
                      errorMsg={errors.client_last_name}
                      value={
                        touched.client_last_name && errors.client_last_name
                          ? "e"
                          : null
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputFlat" style={this.label}>
                      City
                    </label>
                    <input
                      name="client_city"
                      value={values.client_city}
                      onChange={this.onCityChange("Client")}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputFlat"
                      place="Your City"
                      style={{
                        boxShadow:
                          touched.client_city && errors.client_city
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true} />
                    <Paper>
                      {this.cityDataList()}
                    </Paper>
                    <InputError
                      errorMsg={errors.client_city}
                      value={
                        touched.client_city && errors.client_city ? "e" : null
                      }
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label style={this.label} htmlFor="inputState">
                      State
                    </label>
                    <input
                      name="client_state"
                      value={values.client_state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="inputState"
                      className="form-control"
                      type="text"
                      style={{
                        boxShadow:
                          touched.client_state && errors.client_state
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none",

                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true} />
                    <InputError
                      errorMsg={errors.client_state}
                      value={
                        touched.client_state && errors.client_state ? "e" : null
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputStreet" style={this.label}>
                      Pincode
                    </label>
                    <input
                      name="client_pincode"
                      value={values.client_pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputStreet"
                      place="Pincode"
                      style={{
                        boxShadow:
                          touched.client_pincode && errors.client_pincode
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true} />
                    <InputError
                      errorMsg={errors.client_pincode}
                      value={
                        touched.client_pincode && errors.client_pincode
                          ? "e"
                          : null
                      }
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputArea" style={this.label}>
                      Locality/Area
                    </label>
                    <input
                      name="client_area"
                      value={values.client_area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputArea"
                      place="Your Area name"
                      style={{
                        boxShadow:
                          touched.client_area && errors.client_area
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true} />
                    <InputError
                      errorMsg={errors.client_area}
                      value={
                        touched.client_area && errors.client_area ? "e" : null
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <div className="col-md-12">
                    <label htmlFor="inputCity" style={this.label}>
                      Address
                    </label>
                    <input
                      name="client_addr"
                      value={values.client_addr}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputCity"
                      place="Your Address"
                      style={{
                        boxShadow:
                          touched.client_addr && errors.client_addr
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle && this.state.editClientToggle == false ? false : true} />
                    <InputError
                      errorMsg={errors.client_addr}
                      value={
                        touched.client_addr && errors.client_addr ? "e" : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <legend
                style={{
                  margin: "10px auto",
                  marginBottom: "20px",
                  textAlign: "center",
                  position: "relative",
                  color: "#78849e",
                  fontSize: "21px"
                }}
              >
                Site Details
                <hr
                  style={{
                    width: "30px",
                    height: "2px",
                    color: "#987c46",
                    backgroundColor: "#987c46",
                    alignContent: "center",
                    marginLeft: "48%"
                  }}
                />
              </legend>

              <div
                style={{
                  textAlign: "center",
                  margin: "0 auto",
                  marginBottom: "20px",
                  left: "50%"
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    name="same"
                    value={this.state.sameToggle == true ? 1 : 0}
                    onChange={this.sameAsAbove}
                    className={
                      this.state.sameToggleError == true
                        ? "filled-in checkerror"
                        : "filled-in "
                    }
                    checked={this.state.sameToggle == true ? true : false}
                    disabled={this.state.editToggle == true ? false : true}
                  />
                  <span
                    style={{
                      fontSize: "18px",
                      border: "#4d5c7c"
                    }}
                  >
                    Same As Above
                  </span>
                </label>
                <h1>
                  <InputError
                    errorMsg={"Complete Client Details Form in proper format"}
                    value={this.state.sameToggleError == true ? "e" : null}
                  />
                </h1>
              </div>
              <div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <div className="col-md-12">
                      <label htmlFor="inputFlats" style={this.label}>
                        Mobile Number
                      </label>
                      <input
                        name="site_mobile"
                        value={sameToggle == true ? values.client_mobile : values.site_mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className="form-control"
                        id="inputFlats"
                        style={{
                          boxShadow:
                            touched.site_mobile && errors.site_mobile
                              ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                              : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                          border: "none"
                        }}
                        disabled={
                          this.state.sameToggle == true ||
                            this.state.editToggle == false
                            ? true
                            : false
                        }
                      />
                      <InputError
                        errorMsg={errors.site_mobile}
                        value={
                          touched.site_mobile && errors.site_mobile ? "e" : null
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <div className="col-md-12">
                      <label htmlFor="inputSociety" style={this.label}>
                        Email Address
                      </label>
                      <input
                        name="site_email"
                        value={sameToggle == true ? values.client_email : values.site_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className="form-control"
                        id="inputSociety"
                        place="Your Email"
                        style={{
                          boxShadow:
                            touched.site_email && errors.site_email
                              ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                              : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                          border: "none"
                        }}
                        disabled={
                          this.state.sameToggle == true ||
                            this.state.editToggle == false
                            ? true
                            : false
                        }
                      />
                      <InputError
                        errorMsg={errors.site_email}
                        value={
                          touched.site_email && errors.site_email ? "e" : null
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <div className="col-md-12">
                      <label htmlFor="inputStreet" style={this.label}>
                        First Name
                      </label>
                      <input
                        name="site_first_name"
                        value={sameToggle == true ? values.client_first_name : values.site_first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className="form-control"
                        id="inputStreet"
                        place="Your First Name"
                        style={{
                          boxShadow:
                            touched.site_first_name && errors.site_first_name
                              ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                              : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                          border: "none"
                        }}
                        disabled={
                          this.state.sameToggle == true ||
                            this.state.editToggle == false
                            ? true
                            : false
                        }
                      />
                      <InputError
                        errorMsg={errors.site_first_name}
                        value={
                          touched.site_first_name && errors.site_first_name
                            ? "e"
                            : null
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <div className="col-md-12">
                      <label htmlFor="inputArea" style={this.label}>
                        Last Name
                      </label>
                      <input
                        name="site_last_name"
                        value={sameToggle == true ? values.client_last_name : values.site_last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className="form-control"
                        id="inputArea"
                        place="Your Last Name"
                        style={{
                          boxShadow:
                            touched.site_last_name && errors.site_last_name
                              ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                              : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                          border: "none"
                        }}
                        disabled={
                          this.state.sameToggle == true ||
                            this.state.editToggle == false
                            ? true
                            : false
                        }
                      />
                      <InputError
                        errorMsg={errors.site_last_name}
                        value={
                          touched.site_last_name && errors.site_last_name
                            ? "e"
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <div className="col-md-12">
                      <label htmlFor="inputCity" style={this.label}>
                        City
                      </label>
                      <input
                        name="site_city"
                        value={sameToggle == true ? values.client_city : values.site_city}
                        onChange={this.onCityChange("Site")}
                        onBlur={handleBlur}
                        type="text"
                        className="form-control"
                        id="inputCity"
                        place="Your City "
                        style={{
                          boxShadow:
                            touched.site_city && errors.site_city
                              ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                              : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                          border: "none"
                        }}
                        disabled={
                          this.state.sameToggle == true ||
                            this.state.editToggle == false
                            ? true
                            : false
                        }
                      />
                      <Paper>
                        {this.siteDataList()}
                      </Paper>
                      <InputError
                        errorMsg={errors.site_city}
                        value={
                          touched.site_city && errors.site_city ? "e" : null
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-6">
                    <div className="col-md-12">
                      <label style={this.label} htmlFor="inputState">
                        State
                      </label>
                      <input
                        name="site_state"
                        value={sameToggle == true ? values.client_state : values.site_state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="inputState"
                        className="form-control"
                        type="text"
                        style={{
                          boxShadow:
                            touched.site_state && errors.site_state
                              ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                              : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                          border: "none",

                        }}
                        disabled={
                          this.state.sameToggle == true ||
                            this.state.editToggle == false
                            ? true
                            : false
                        }
                      />
                      <InputError
                        errorMsg={errors.site_state}
                        value={
                          touched.site_state && errors.site_state ? "e" : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <div className="col-md-12">
                    <label htmlFor="inputCity" style={this.label}>
                      Address
                    </label>
                    <input
                      name="site_addr"
                      value={sameToggle == true ? values.client_addr : values.site_addr}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputCity"
                      place="Your Address"
                      style={{
                        boxShadow:
                          touched.site_addr && errors.site_addr
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={
                        this.state.sameToggle == true ||
                          this.state.editToggle == false
                          ? true
                          : false
                      }
                    />
                    <InputError
                      errorMsg={errors.site_addr}
                      value={touched.site_addr && errors.site_addr ? "e" : null}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputCity" style={this.label}>
                      Contact Person Name
                    </label>
                    <input
                      name="contactPerson_name"
                      value={values.contactPerson_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputCity"
                      place="Your City "
                      style={{
                        boxShadow:
                          touched.contactPerson_name &&
                            errors.contactPerson_name
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle == true ? false : true}
                    />
                    <InputError
                      errorMsg={errors.contactPerson_name}
                      value={
                        touched.contactPerson_name && errors.contactPerson_name
                          ? "e"
                          : null
                      }
                    />
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <label htmlFor="inputCity" style={this.label}>
                      Contact Person Mobile No
                    </label>
                    <input
                      name="contactPerson_mobile"
                      value={values.contactPerson_mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="form-control"
                      id="inputCity"
                      place="Your City "
                      style={{
                        boxShadow:
                          touched.contactPerson_mobile &&
                            errors.contactPerson_mobile
                            ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            : "0 2px 2px 0 rgba(0, 0, 0, 0.08)",
                        border: "none"
                      }}
                      disabled={this.state.editToggle == true ? false : true}
                    />
                    <InputError
                      errorMsg={errors.contactPerson_mobile}
                      value={
                        touched.contactPerson_mobile &&
                          errors.contactPerson_mobile
                          ? "e"
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx(
                Bootstrap.row,
                "justify-content-center",
                styles["projectdetails-btn-wrapper"]
              )}
            >
              {/* if the project is existing (means not new), show edit and delete buttons */}
              <div className={Bootstrap["row"]}>
                {this.props.type == "existing" ? (
                  <>
                    <div className={Bootstrap["col-sm"]}>
                      <LargeButton
                        className={cx(
                          Bootstrap.btn,
                          styles["projectdetails-main-create-btn"]
                        )}
                        type="button"
                        onClick={this.editForm}
                      >
                        Edit &nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="fa fa-pencil-square-o" aria-hidden="true" />
                      </LargeButton>
                    </div>
                    <div className={Bootstrap["col-sm"]}>
                      <LargeButton
                        className={cx(
                          Bootstrap.btn,
                          styles["projectdetails-main-edit-btn"]
                        )}
                        type="button"
                        onClick={this.deleteProject}
                      >
                        Delete &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-trash" aria-hidden="true" />
                      </LargeButton>
                    </div>
                  </>
                ) : null}

                <div className={Bootstrap["col-sm"]}>
                  {/* Nrupali */}
                  <LargeButton
                    className={cx(
                      Bootstrap.btn,
                      styles["projectdetails-main-next-btn"]
                    )}
                    type="submit"
                    disabled={this.state.editToggle == true ? false : true}
                    style={{
                      marginLeft: this.props.type == "existing" ? "" : "100%"
                    }}
                  >
                    Save &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-floppy-o" aria-hidden="true" />
                  </LargeButton>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    projectData: state.projectData.project,
    isDock: state.projectData.dockProject,
    // auth: state.auth,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  { projectDetails, editProjectDetails, deleteProjectDetails }
)(formikEnhancer(Create));