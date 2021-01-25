import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  deleteUserFieldMode, fetchUserFieldMode, editUserFieldMode,
  postUserFieldMode, hideServerSucessModal, hideServerErrorModal
} from "../../../actions/action_authentication"
//import * as actions from "../../../actions/action_authentication";
//COMPONENTS
import Navbar from "../../../components/NavBar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Leftsidebar from "./../../../components/SideBar/left/leftsidebar";
import Rightsidebar from "./../../../components/SideBar/right/rightsidebar";
//UTILS
import Spinner from "../../../Layout/Spinner/Spinner";
import ServerError from "../../../Layout/ServerError/ServerError";
import ServerStatus from "../../../Layout/ServerSucess/ServerStatus";
import Backdrop from "../../../Layout/Backdrop/Backdrop";
//STYLES
import styles from "./fieldmode.module.css";
import cx from "classnames";
import Bootstrap from "./../../../Bootstrap/bootstrap.module.css";
//CORE COMPONENT
import FieldModeForm from "./FieldModeForm";
import FieldModeUserTable from "./FeildModeUserTable";
import HOC from "HOC/ProjectHOC";

//button
import { XLargeButton } from "Layout/styled component/Button";

class FeildMode extends Component {
  state = {
    edit: false,
    fetchUserData: null,
    formToggle: false,
    formIndex: null
  };

  onEdit = index => e => {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit
    });
  };
  onClose = index => e => {
    e.preventDefault();
    let add = this.state.fetchUserData;
    add.pop();
    this.setState({
      formToggle: !this.state.formToggle,
      formIndex: index,
      fetchUserData: add
    });
  };

  onEditClose = index => e => {
    e.preventDefault();
    this.setState({
      formToggle: !this.state.formToggle,
      formIndex: index
    });
  };
  onEditTable = index => e => {
    e.preventDefault();

    this.setState({
      formToggle: !this.state.formToggle,
      formIndex: index
    });
  };

  onDelete = index => e => {
    e.preventDefault();
    let body = this.state.fetchUserData[index];
    body["userid"] = body._id;
    this.props.deleteUserFieldMode(body, this.props.token);
  };
  addMember = () => {
    let addLoop = this.state.fetchUserData;
    let formIndex = 0;
    if (this.state.fetchUserData == null) {
      addLoop = [
        {
          first_name: "",
          last_name: "",
          email: "",
          mobile: "",
          userrole: {
            user: "",
            name: ""
          },
          role: "",
          designation: "",
          check: true,
          new: true
        }
      ];
    } else {
      formIndex = addLoop.length;
      addLoop.push({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        userrole: {
          user: "",
          name: ""
        },
        role: "",
        designation: "",
        check: true,
        new: true
      });
    }

    this.setState({
      fetchUserData: addLoop,
      formToggle: true,
      formIndex: formIndex
    });
  };

  componentWillReceiveProps(props) {
    if (props.payloadFetchData != null) {
      this.setState({ fetchUserData: props.payloadFetchData });
    }

    return null;
  }
  componentDidMount() {
    this.props.fetchUserFieldMode({}, this.props.token);
  }
  handleSubmit = e => {
    e.preventDefault();
  };
  // shouldComponentUpdate()
  submitFinal = index => e => {
    e.preventDefault();
    let body = this.state.fetchUserData[index];
    body["userid"] = body._id;
    this.props.editUserFieldMode(body, this.props.token);
  };

  createUser = index => e => {
    e.preventDefault();
    this.props.postUserFieldMode(
      this.state.fetchUserData[index],
      this.props.token
    );
    this.setState({
      load: true
    });
  };

  formFeild = () => {
    if (this.state.formToggle == true) {
      return (
        <FieldModeForm
          formdata={this.state.fetchUserData[this.state.formIndex]}
          edit={this.state.edit}
          onChange={this.handleChange}
          onSubmit={this.submitFinal}
          onCreate={this.createUser}
          onEdit={this.onEditTable}
          onDelete={this.onDelete}
          onClose={this.onClose}
          onEditClose={this.onEditClose}
          index={this.state.formIndex}
          lastIndex={this.state.fetchUserData.length - 1}
          key={this.state.formIndex}
        />
      );
    } else {
      return null;
    }
  };

  refreshSucessAddMembersTable = () => {
    this.props.hideServerSucessModal();
    if (this.props.isServerStatus == 200) {
      this.props.fetchUserFieldMode({}, this.props.token);
      this.setState({
        formToggle: false
      });
    }
  };
  refreshErrorAddMembersTable = () => {
    // this.props.fetchUserFieldMode({}, this.props.token);
    this.props.hideServerErrorModal();
    // this.setState({
    //   formToggle: false
    // });
  };
  userTable = () => {

    // alert(JSON.stringify(this.state.fetchUserData))
    return (
      <FieldModeUserTable

        formval={this.state.fetchUserData}
        onEdit={this.onEditTable}
        onClose={this.onClose}
        onEditClose={this.onEditClose}
        onDelete={this.onDelete}
      />
    );


    return null;
  };
  render() {

    return (
      <Fragment>
        <Leftsidebar history={this.props.history} />
        <Rightsidebar history={this.props.history} />
        {this.props.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}

        <Navbar />
        {this.props.userFieldAccess == true ? (
          <div
            className={Bootstrap["container-fluid"]}
            onClick={this.props.hideProjectSideBar}
            style={{ minHeight: "94vh" }}

          >
            <div className={styles["fieldmode-wrapper"]}>
              <div className={cx(Bootstrap.row)}>
                <div className={Bootstrap["col-md-12"]}>
                  <XLargeButton
                    className={cx(
                      Bootstrap["btn"],
                      styles["fieldmode__addmember-btn"]
                    )}
                    onClick={this.addMember}
                  >
                    <img
                      src={require("assets/icons/teamMembers.svg")}
                      className={styles["fieldmode__addMember--btn"]}
                    />
                    Add Member
                  </XLargeButton>
                  {/* <button
                    onClick={this.addMember}
                    className={cx(
                      Bootstrap["btn"],
                      styles["fieldmode__plus-btn"]
                    )}
                  >
                    +
                  </button> */}
                </div>
              </div>
              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap.container,
                  styles["field-form-wrapper"]
                )}

              >
                {this.userTable()}
              </div>
              <div
                className={cx(
                  Bootstrap.row,
                  Bootstrap.container,
                  styles["field-form-wrapper"]
                )}
              >
                {this.formFeild()}
              </div>

            </div>
          </div>
        ) : null}
        <div className={styles["fieldmode-footer"]}>
          <Footer />
        </div>
        {this.props.isServerError ? (
          <ServerError click={this.refreshErrorAddMembersTable} />
        ) : null}
        {this.props.isServerStatus ? (
          <ServerStatus
            modalHeader={this.props.isServerMsg}
            modalCase={this.props.isServerStatus}
            click={this.refreshSucessAddMembersTable}
          />
        ) : null}
      </Fragment>
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
  { deleteUserFieldMode, fetchUserFieldMode, editUserFieldMode, postUserFieldMode, hideServerSucessModal, hideServerErrorModal }
)(HOC(FeildMode));
