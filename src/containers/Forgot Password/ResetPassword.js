import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";
// import { resetPassword } from "../../utils/formValidators";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import Spinner from "../../Layout/Spinner/Spinner";
import ServerError from "../../Layout/ServerError/ServerError";
import ServerStatus from "../../Layout/ServerSucess/ServerStatus";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import cx from "classnames";
import Bootstrap from "./../../Bootstrap/bootstrap.module.css";
import "./resetpassword.css";
import styles from "./resetpassword.css";
import InputError from "Layout/InputError/InputError";
import { XLargeButton } from "Layout/styled component/Button";
class ResetPassword extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("AAAA")
    if (this.props.ResetCompany != null) {
      let input = "account_id";
      let value = this.props.ResetCompany[0].comp_id;

      console.log(value)
      let formval = this.state.formval;
      formval[input] = value;
      this.setState({ [formval]: [formval] });
    }

  }
  state = {
    formval: {
      mobileEmail: "",
      account_type: ""
    },
    mobileError: null
  };
  componentDidUpdate = () => {
    window.onpopstate = (e) => {
      console.log(this.props)
      this.props.history.push("/login")

    }
  }
  changeAccountType = type => e => {
    let input = "account_type";
    let value = type;
    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval] });
  };
  handleChange = event => {
    let input = event.target.name;
    let value = event.target.value;
    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval] });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.formval.mobileEmail == "") {
      this.setState({ mobileError: "Enter Email Or Mobile Number" });
    } else {
      console.log(this.state.formval)
      this.props.resetPassword(this.state.formval);
      this.setState({ mobileError: null });
    }
  };

  companySelectFunction = () => {
    return this.props.ResetCompany.map((company, index) => {
      return (
        <>
          <option value={company.comp_id}>
            {company.comp_name.toUpperCase()} {company.comp_brand.toUpperCase()}
          </option>
        </>
      );
    });
  };

  componentWillReceiveProps(props) {
    if (props.ResetCompany != null) {
      let input = "account_id";
      let value = props.ResetCompany[0].comp_id;

      let formval = this.state.formval;
      formval[input] = value;
      this.setState({ [formval]: [formval] });
    }
    return null;
  }

  companySelect = e => {
    e.preventDefault();
    // alert('muahhh'+e.target.name)
    let input = "account_id";
    let value = e.target.value;
    console.log(value)

    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval] });
  };

  render() {

    return (
      <div>
        {this.props.isServerError ? (
          <ServerError click={this.props.hideServerErrorModal} />
        ) : null}
        {this.props.isServerStatusSucess == 200
          ? this.props.history.push("/validate_otp")
          : null}
        {this.props.isServerStatus != null ? (
          <ServerStatus
            modalHeader={this.props.isServerMessage}
            modalCase={this.props.isServerStatus}
            click={this.props.hideServerSucessModal}
          />
        ) : null}
        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}
        <Navbar />
        <div className="container col-md-4 reset-password-wrapper">
          <form onSubmit={this.handleSubmit}>
            {this.props.ResetCompanyS == 99 ? (
              <>
                <div
                  className={cx(
                    Bootstrap.row,
                    styles["login_msg"],
                    styles["login-main-div"],
                    Bootstrap["mb-3"]
                  )}
                  style={{
                    // color: "#987c46",
                    fontSize: "17px",
                    color: "#787993"
                  }}
                >
                  Please Select Account To Proceed
                </div>

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
                      fontSize: "16px",
                      height: "35px",
                      color: "#454f63",
                      border: "none",
                      boxShadow: "0 2px 22px 0 rgba(0, 0, 0, 0.12)"
                    }}
                  >
                    {this.companySelectFunction()}) }
                  </select>
                </div>
              </>
            ) : (
                <>
                  <div className="row">
                    {/* <h1 className="">Reset Password!</h1> */}
                    <h2>
                      <center>
                        Reset Password
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
                  <div className="row">
                    <h4>
                      Enter your email address we will send you an email to reset
                      password
                  </h4>
                  </div>
                  <div className="row">
                    <label
                      style={{
                        fontSize: "17px",
                        color: "#787993"
                      }}
                    >
                      Email Address / Mobile Number{" "}
                    </label>
                    <input
                      type="text"
                      placeholder="Email or Mobile No"
                      name="mobileEmail"
                      className="form-control"
                      // required
                      onChange={this.handleChange}
                      value={this.state.mobileEmail}
                      style={
                        this.state.mobileError !== null
                          ? { boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)" }
                          : {}
                      }
                    />
                    <InputError
                      errorMsg={this.state.mobileError}
                      value={this.state.mobileError ? "e" : null}
                    />
                  </div>
                  <div
                    className={cx(
                      "row"
                      // Bootstrap["mb-2"],
                      // styles["login-main-div"]
                    )}
                  />
                </>
              )}

            <div className="row align-self-center ">
              <XLargeButton className="resetpassword_btn" type="submit">
                <center>Submit</center>
              </XLargeButton>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatusSucess: state.serverStatus.resetPasswordStatus,
    isServerStatus: state.serverStatus.resetPasswordStatus,
    isServerMessage: state.serverStatus.resetPasswordMessage,
    ResetCompany: state.serverStatus.ResetCompanyList,
    ResetCompanyS: state.serverStatus.ResetCompanyStatus
  };
};
export default connect(
  mapStateToProps,
  actions
)(ResetPassword);
