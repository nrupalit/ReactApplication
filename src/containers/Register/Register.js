import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";
import * as Url from "constant/backend_url";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import Spinner from "../../Layout/Spinner/Spinner";
import ServerError from "../../Layout/ServerError/ServerError";
import ServerStatus from "../../Layout/ServerSucess/ProjectSidebarModal";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import RegisterForm from "./RegisterForm";
import { SERVERBASEURL } from "constant/backend_url";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formval: {
        comp_name: "",
        comp_brand: "",
        comp_logo: null,
        addr: "",
        pin: "",
        state: "",
        country: "",
        city: "",
        first_name: "",
        last_name: "",
        acct_type: "company",
        email: "",
        mobile: "",
        pwd: "",
        comp_phone: "",
        comp_email: "",
        acc_type: "",
        cpwd: ""
      },
      passwordError: null,
      account_type: null,
      errors: {}
    };
  }
  onChange(event) { }

  handleChange = event => {
    let input = event.target.name;
    let value = "";

    if (input == "comp_logo") {
      var labels = [];
      let ext = "";
      let input = event.target.files;
      for (var i = 0; i < input.length; ++i) {
        ext = input[i]["name"].split(".");
      }
      value = ext[0] + "." + ext[1];
    } else {
      value = event.target.value;
    }

    let formval = this.state.formval;
    formval[input] = value;
    let mobileRe = /^\d+$/;
    if (formval["mobile"]) {
      if (mobileRe.test(formval["mobile"]) != false) {
        if (formval["mobile"].length > 10) {
        } else {
          this.setState({ [formval]: [formval] });
        }
      }
    } else if (formval["email"]) {
      var re = /\S+@\S+\.\S+/;
      let test = re.test(formval["email"]);
      // alert(test)
      if (test) {
        this.setState({ [formval]: [formval], emailError: null });
      } else {
        // alert('truuee')
        this.setState({ [formval]: [formval], emailError: true });
      }
    } else if (formval["pwd"]) {
      var re = /^[0-9a-zA-Z]+$/;
      let test = re.test(formval["pwd"]);
      if (test) {
        this.setState({ [formval]: [formval], passwordError: false });
      } else {
        // alert('truuee')
        this.setState({
          passwordError: true
        });
      }
    } else if (formval["cpwd"]) {
      var re = /^[0-9a-zA-Z]+$/;
      let test = re.test(formval["cpwd"]);
      // alert(test)
      if (test) {
        this.setState({ [formval]: [formval], passwordError: false });
      } else {
        //  alert('truuee')
        this.setState({
          passwordError: true
        });
      }
    } else {
      // alert(formval['state'])
      this.setState({ [formval]: [formval] });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.formval)
    if (
      this.state.formval.pwd == this.state.formval.cpwd &&
      this.state.formval.pwd.length > 5 &&
      this.state.formval.first_name !== "" &&
      this.state.formval.last_name !== "" &&
      this.state.formval.mobile !== "" &&
      this.state.formval.email !== ""
    ) {
      this.setState({
        passwordError: false
      });

      this.props.register(this.state.formval);
    } else {
      alert("indie");
      if (
        this.state.formval.pwd == this.state.formval.cpwd &&
        this.state.formval.pwd.length > 5
      ) {
        this.setState({
          passwordError: true
        });
      } else if (this.state.formval.first_name !== "") {
        let errros = this.state.errors;
      } else if (this.state.formval.last_name !== "") {
      } else if (this.state.formval.mobile !== "") {
      } else if (this.state.formval.first_name !== "") {
      }
    }
  };

  changeAccountType = type => e => {
    // alert(type)
    this.setState({
      account_type: type
    });
  };

  onCityChange = e => {
    let formval = this.state.formval;
    formval["city"] = e.target.value;
    this.setState({ [formval]: [formval] });
    let body = {
      city: e.target.value
    };

    const url = `${SERVERBASEURL}${"city"}`;
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
      })
      .catch(error => {
        this.setState({
          city: {}
        });
      });
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
          >
            {city.city}
          </li>
        );
      });
    }
  };

  selectCity = e => {
    e.preventDefault();

    let data = e.target.id.split("?");
    // alert(data[0])
    let formval = this.state.formval;
    formval["state"] = data[1];
    formval["city"] = data[0];
    formval["pin"] = data[2];

    this.setState({ [formval]: [formval], city: null });
  };

  registerForm = () => {
    return <RegisterForm formdata={this.state.formval}
      type="company" />;
  };

  refreshSucess = () => {
    if (this.props.isServerStatus == 200) {
      this.props.hideServerSucessModal();
      this.props.history.push('/login')
    } else {
      this.props.hideServerSucessModal();
    }
  };

  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}
        {this.props.isServerError ? (
          <ServerError click={this.props.hideServerErrorModal} />
        ) : null}
        {this.props.isServerStatus ? (
          <ServerStatus
            modalHeader={this.props.isServerMsg}
            modalCase={this.props.isServerStatus}
            click={this.refreshSucess}
          />
        ) : null}
        <Navbar history={this.props.history.location.pathname} />
        {this.registerForm()}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.registerStatus,
    isServerMsg: state.serverStatus.registerMessage
    //  isData:state.serverStatus.registerdata
  };
};

export default connect(
  mapStateToProps,
  actions
)(Register);
