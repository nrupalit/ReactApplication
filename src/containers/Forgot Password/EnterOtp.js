import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import Spinner from "../../Layout/Spinner/Spinner";
import ServerError from "../../Layout/ServerError/ServerError";
import ServerStatus from "../../Layout/ServerSucess/ServerStatus";

import Backdrop from "../../Layout/Backdrop/Backdrop";

import "./resetpassword.css";
import { XLargeButton } from "Layout/styled component/Button";
class EnterOtp extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    formval: {
      mobileEmail: "",
      otp: "",
      newpwd: "",
      cpassword: "",
      pwd: "",
      cpwd: ""
    },
    mobileEmail: "",
    isValidated: true
  };
  componentDidUpdate() {
    window.onpopstate = (e) => {
      console.log("RRRRRR")
      console.log(this.props)
      if (this.props.match.path == "/validate_otp") {
        this.props.clearResetData()
        this.props.history.push("/resetpassword")
      }

    }
  }
  handleChange = event => {
    let input = event.target.name;
    let value = event.target.value;
    let formval = this.state.formval;
    formval[input] = value;
    this.setState({ [formval]: [formval] });
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  otpFormSubmit = () => { };
  componentWillReceiveProps(props) {

  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.payloadData != null) {
      return {
        mobileEmail: nextProps.payloadData
      };
    }
    return null;
  };
  componentWillReceiveProps(props) {

  }
  successfulChange = () => {
    console.log("in change")
    this.props.hideServerSucessModal();
    if (this.props.isServerStatus == 200 && this.state.isValidated) {
      this.props.history.push("/login");
    }
  }
  resendOtp = () => {

    let formval = this.state.formval;
    formval["mobileEmail"] = this.state.mobileEmail;



    let value = this.props.reset_id;
    let input = "account_id";
    formval[input] = value;
    console.log(value)

    this.setState({ [formval]: [formval], isValidated: false });
    console.log(this.state.formval)
    this.props.resendOtp(this.state.formval);
  };

  validateOtp = () => {
    let formval = this.state.formval;
    formval["mobileEmail"] = this.state.mobileEmail;
    this.setState({ [formval]: [formval] });
    if (this.state.formval.otp == "" || this.state.formval.otp.split("") == "") {
      this.setState({ OtpError: true, OtpErrorMsg: "Please Enter Otp" })
    }
    else if ((/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i).test(this.state.formval.newpwd) == false) {
      this.setState({ OtpError: false, CmfPasswordError: false, PasswordError: true, passwordErrorMsg: "Password must be AlphaNumeric Only and contain each one" })
    }
    else if (
      this.state.formval.newpwd == this.state.formval.cpassword &&
      this.state.formval.newpwd.length > 5
    ) {
      /* let value = this.props.reset_id;
      let input = "account_id";
      formval[input] = value */
      this.props.validateOtp(this.state.formval);


      this.setState({ PasswordError: false, CmfPasswordError: false, OtpError: false, isValidated: true });

    } else {
      this.setState({ OtpError: false, PasswordError: false, CmfPasswordError: true, CmfpasswordErrorMsg: "Passwords do not match" });
    }
  };
  render() {

    // if(this.props.payloadData!=null){
    return (
      <>
        {this.props.isServerError ? (
          <ServerError
            modalHeader={this.props.isServerMessage}
            modalCase={this.props.isServerStatus}
            click={this.props.hideServerErrorModal}
          />
        ) : null}
        {this.props.isServerStatus ? (
          <>
            <ServerStatus
              modalHeader={this.props.isServerMessage}
              modalCase={this.props.isServerStatus}
              click={this.successfulChange}
            />

          </>
        ) : null}

        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}
        <Navbar />
        {this.state.mobileEmail ? (
          <div className="container col-md-4 reset-password-wrapper">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <img src={require("../../assets/icons/Logo.png")} alt="" />
              </div>
              <div className="row">
                <h1 className="">Reset Password!</h1>
              </div>
              <div className="row">
                <h4>Enter Otp Provided with email and password</h4>
              </div>
              <div className="row">
                <label
                  style={{
                    fontSize: "17px",
                    color: "#787993"
                  }}
                >
                  Otp
                </label>
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  className="form-control"

                  onChange={this.handleChange}
                  value={this.state.formval.otp}
                />
              </div>
              {this.state.OtpError == true ? (
                <div className="row">
                  <label
                    style={{
                      color: "red",
                      fontSize: "17px",

                    }}
                  >
                    {this.state.OtpErrorMsg}
                  </label>
                </div>
              ) : null}
              <div className="row">
                <label
                  style={{
                    fontSize: "17px",
                    color: "#787993"
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="newpwd"
                  className="form-control"

                  onChange={this.handleChange}
                  value={this.state.formval.password}
                />
              </div>
              {this.state.PasswordError == true ? (
                <div className="row">
                  <label
                    style={{
                      color: "red",
                      fontSize: "17px",

                    }}
                  >
                    {this.state.passwordErrorMsg}
                  </label>
                </div>
              ) : null}
              <div className="row">


                <label
                  style={{
                    fontSize: "17px",
                    color: "#787993"
                  }}
                >
                  Confirm Password
                  </label>

                <input
                  type="password"
                  placeholder={
                    "Confirm Password"
                  }
                  name="cpassword"
                  className="form-control"

                  style={{
                    boxShadow:
                      this.state.PasswordError == true
                        ? "0 2px 20px 0 rgba(223, 56, 56, 0.7)"
                        : null
                  }}
                  onChange={this.handleChange}
                  value={this.state.formval.cpassword}
                />
              </div>

              {this.state.CmfPasswordError == true ? (
                <div className="row">
                  <label
                    style={{
                      color: "red",
                      fontSize: "17px",

                    }}
                  >
                    {this.state.CmfpasswordErrorMsg}
                  </label>
                </div>
              ) : null}

              <div className="row align-self-center ">
                <div className="col-6">
                  <XLargeButton onClick={this.validateOtp} type="submit">
                    <center>Submit</center>
                  </XLargeButton>
                </div>
                <div className="col-6">
                  <XLargeButton
                    className="ml-5 "
                    onClick={this.resendOtp}
                    type="submit"
                  >

                    <center>Resend Otp</center>
                  </XLargeButton>
                </div>
              </div>
            </form>
          </div>
        ) : null}
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    ResetCompany: state.serverStatus.ResetCompanyList,
    ResetCompanyS: state.serverStatus.ResetCompanyStatus,
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.validateOtpStatus,
    isServerMessage: state.serverStatus.validateOtpMessage,
    payloadData: state.serverData.resetPasswordData,
    reset_id: state.serverData.reset_id
  };
};
export default connect(
  mapStateToProps,
  actions
)(EnterOtp);
