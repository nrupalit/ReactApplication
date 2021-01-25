import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { Link } from "react-router-dom";
import * as actions from "../../actions/action_authentication";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import Spinner from "../../Layout/Spinner/Spinner";
import ServerError from "../../Layout/ServerError/ServerError";
import ServerStatus from "../../Layout/ServerSucess/ServerStatus";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import Bootstrap from "./../../Bootstrap/bootstrap.module.css";
import styles from "./Login.module.css";
// import "./checkbox.scss";
//button
import { XLargeButton } from "Layout/styled component/Button";
import InputError from "Layout/InputError/InputError";
class Login extends Component {
  constructor(props) {
    super(props);
    console.log("hiiiii");
  }

  state = {
    formval: {
      mobileEmail: null,
      password: null,
      account_id: null
    },
    errors: {},
    companySelect: false
  };
  componentDidMount = () => {
    var token = JSON.parse(localStorage.getItem("auth"))

    console.log(token)
    if (token) {
      this.props.alreadylogged(token)
    }
  }
  handleSubmit = async e => {
    e.preventDefault();
    if (
      this.state.formval.mobileEmail == null ||
      this.state.formval.mobileEmail == ""
    ) {
      let errors = {};
      errors["mobileEmail"] = "Email / Mobile Email is required";
      this.setState({
        errors: errors
      });
    } else if (
      this.state.formval.password == null ||
      this.state.formval.password == ""
    ) {
      let errors = {};
      errors["password"] = "Password is required";
      this.setState({
        errors: errors
      });
    } else {
      let errors = {};
      this.setState({
        errors: errors
      });
      if (this.state.companySelect == false) {
        this.state.formval["account_id"] = null
      }
      this.props.login(this.state.formval);
    }
  };

  changeAccountType = type => e => {
    let input = "account_type";
    let value = type;
    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval] });
    // alert(type)
  };
  handleChange = event => {
    let input = event.target.name;
    let value = event.target.value;
    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval] });
  };
  componentWillReceiveProps(props) {
    if (props.loginCompany != null) {
      console.log(props.loginCompany)
      let input = "account_id";
      let value = props.loginCompany[0].comp_id;
      let formval = this.state.formval;
      formval[input] = value;
      this.setState({ [formval]: [formval] });
    }
    return null
  }
  companySelectFunction = () => {
    return this.props.loginCompany.map(company => {
      return (
        <>
          <option
            value={company.comp_id}
            style={{
              color: "#454f63",
              width: "80%"
            }}
          >
            {company.comp_name} - {company.comp_brand}
          </option>
        </>
      );
    });
  };
  companySelect = e => {
    e.preventDefault();
    let input = "account_id";
    let value = e.target.value;
    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval], companySelect: true });
  };
  render() {
    return (
      <>
        {this.props.isServerError ? (
          <ServerError click={this.props.hideServerErrorModal} />
        ) : null}
        {this.props.isServerStatus == 200 || (this.props.auth && this.props.auth.status == 200)
          ? this.props.history.push("/landing_page")
          : null}
        {this.props.isServerStatus ? (
          <ServerStatus
            modalHeader={this.props.isServerMessage}
            modalCase={this.props.isServerStatus}
            click={this.props.hideServerSucessModal}
          />
        ) : null}
        <div className={Bootstrap["container-fluid"]}>
          {this.props.isLoading ? (
            <Backdrop>
              <Spinner />
            </Backdrop>
          ) : null}
          <Navbar history={this.props.history.location.pathname} />
          <div
            className={cx(
              Bootstrap["container"],
              Bootstrap["col-md-6"],
              styles["login-wrapper"]
            )}
          >
            <form onSubmit={this.handleSubmit}>
              {this.props.loginCStatus == 99 ? (
                <>
                  <div className={cx(Bootstrap.row, styles["login-main-div"])}>
                    <h2 className={styles["login_heading"]}>
                      <center>
                        Hello!
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

                  <div
                    className={cx(
                      Bootstrap.row,
                      styles["login_msg"],
                      styles["login-main-div"],
                      Bootstrap["mb-4"],
                      Bootstrap["mb-5"]
                    )}
                  >
                    {this.props.loginCompany[0].first_name.toUpperCase()} Select
                    Your Account To Proceed
                  </div>

                  {/* <div
      className={cx(
        Bootstrap.row,
        styles["login_msg"],
        styles["login-main-div"],
        Bootstrap["mb-3"]
      )}
      style={{
        color: "#987c46"
      }}
    >
      Please Select Account To Proceed
    </div> */}

                  <div
                    className={cx(
                      Bootstrap.row,
                      Bootstrap["mb-2"],
                      styles["login-main-div"]
                    )}
                  >
                    <select
                      onChange={this.companySelect}
                      className={Bootstrap["form-control"]}
                      style={{
                        fontSize: "18px",
                        height: "40px",
                        color: "#454f63",
                        border: "none",
                        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.048)",
                        width: "60%"
                      }}
                    >
                      {this.companySelectFunction()}) }
                    </select>
                  </div>

                  <div
                    className={cx(
                      Bootstrap["col-md-3"],
                      Bootstrap["mt-5"],
                      styles["login-main-div"]
                    )}
                  >
                    <XLargeButton className={styles.login_button} type="submit">
                      Proceed
                    </XLargeButton>
                  </div>
                </>
              ) : (
                  <>
                    <div className={cx(Bootstrap.row, Bootstrap["form-group"])}>
                      <h2 className={styles["login_heading"]}>
                        <center>
                          Login
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
                    <div
                      className={cx(Bootstrap["mb-2"], styles["login-main-div"])}
                    >
                      <label
                        style={{
                          fontSize: "17px"
                        }}
                      >
                        Email Address / Mobile Number
                    </label>
                      <input
                        type="text"
                        placeholder=""
                        name="mobileEmail"
                        onChange={this.handleChange}
                        className={cx(
                          Bootstrap["form-control"],
                          styles["login--input"]
                        )}
                        style={
                          this.state.errors.mobileEmail
                            ? {
                              color: "#454f63",
                              border: "none",
                              outline: "none",
                              appearance: "none",
                              width: "60%",
                              boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                            }
                            : {
                              color: "#454f63",
                              border: "none",
                              outline: "none",
                              appearance: "none",
                              width: "60%"
                            }
                        }
                      />
                      <InputError
                        value={this.state.errors.mobileEmail}
                        errorMsg={this.state.errors.mobileEmail}
                      />
                    </div>
                    <div
                      className={cx(
                        // Bootstrap.row,
                        Bootstrap["mb-2"],
                        styles["login-main-div"]
                      )}
                    >
                      <label
                        style={{
                          fontSize: "17px",
                          width: "100%"
                        }}
                      >
                        Password
                    </label>
                      <input
                        type="password"
                        placeholder=""
                        name="password"
                        onChange={this.handleChange}
                        className={cx(
                          Bootstrap["form-control"],
                          styles["login--input"]
                        )}
                        style={
                          this.state.errors.password
                            ? {
                              color: "#454f63",
                              border: "none",
                              outline: "none",
                              appearance: "none",
                              width: "60%",
                              boxShadow: "0 20px 20px 0 rgba(223, 56, 56, 0.7)"
                            }
                            : {
                              color: "#454f63",
                              border: "none",
                              outline: "none",
                              appearance: "none",
                              width: "60%"
                            }
                        }
                      />
                      <InputError
                        value={this.state.errors.password}
                        errorMsg={this.state.errors.password}
                      />
                    </div>
                    <div
                      className={cx(
                        Bootstrap.row,
                        Bootstrap["mb-2"],
                        Bootstrap["ml-2"]
                      )}
                    >
                      <label>
                        <input type="checkbox" className="filled-in" />
                        {" "}
                        <span
                          style={{
                            fontSize: "20px",
                            border: "#4d5c7c"
                          }}
                        >
                          Remember Me
                      </span>
                      </label>
                    </div>

                    <div
                      className={cx(
                        Bootstrap.row,
                        Bootstrap["mb-5"],
                        styles["login-main-div"]
                      )}
                    >
                      <div
                        className={cx(
                          Bootstrap["col-4"],
                          styles["login-main-div"]
                        )}
                      >
                        <XLargeButton
                          className={styles.login_button}
                          type="submit"
                        >
                          Login
                      </XLargeButton>
                      </div>
                      <div
                        className={cx(
                          Bootstrap["col-6"],
                          styles["login_forgetpassword"],
                          styles["login-main-div"]
                        )}
                      >
                        <Link
                          style={{
                            textDecoration: "none"
                          }}
                          to="/resetpassword"
                        >
                          Forgot Password
                      </Link>
                        {/* <hr /> */}
                      </div>
                    </div>
                    <div
                      className={cx(
                        Bootstrap.row,
                        styles["login_remember_me"],
                        styles["login-main-div"],
                        Bootstrap["mt-5"],
                        Bootstrap["ml-2"]
                      )}
                    >
                      <p>
                        Still without an account?{" "}
                        <Link
                          style={{
                            textDecoration: "none"
                          }}
                          to="/register"
                          className={cx(Bootstrap["ml-3"])}
                        >
                          Create one
                      </Link>
                      </p>
                    </div>
                  </>
                )}
            </form>
          </div>
          <div
            className={cx(Bootstrap["container-fluid"], styles["login-footer"])}
          >
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.loginStatus,
    isServerMessage: state.serverStatus.loginMessage,
    loginCompany: state.serverStatus.loginCompanyList,
    auth: state.auth,
    loginCStatus: state.serverStatus.loginCompanyStatus
  };
};

export default connect(
  mapStateToProps,
  actions
)(Login);
