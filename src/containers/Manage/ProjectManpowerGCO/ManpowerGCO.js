//lib
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "../MyClients/fieldmode.module.css";
//ACTIONS
import {
  fetchUserDesignationList, createDesignation, hideServerSucessModal, hideServerErrorModal,
  hideProjectSidebar, hideResourcesSidebar
} from "../../../actions/action_authentication"
//import * as actions from "../../../actions/action_authentication";
import cx from "classnames";
//GRID COMPONENTS
import ManpowerGCOTableNew from "./ManpowerGCOTableNew";
import ManpowerGCOForm from "./ManpowerGCOForm";
//components
import Navbar from "../../../components/NavBar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Leftsidebar from "./../../../components/SideBar/left/leftsidebar";
import Rightsidebar from "./../../../components/SideBar/right/rightsidebar";
import Spinner from "../../../Layout/Spinner/Spinner";
import ServerError from "../../../Layout/ServerError/ServerError";
import ServerStatus from "../../../Layout/ServerSucess/ServerStatus";
import Backdrop from "../../../Layout/Backdrop/Backdrop";
//css styles
import Bootstrap from "./../../../Bootstrap//bootstrap.module.css";
import { XLargeButton } from "Layout/styled component/Button";

class ManpowerGCO extends Component {
  state = {
    operationType: "edit",
    checkedArray: [],
    edit: false,
    header: [
      "Manpower",
      "Unit of Measure",
      "Cost per Unit (Rs)",
      "Billing per Unit (Rs)",
      "Workdays for week",
      "Off days"
    ],
    designationData: null,
    designationDataBody: null,
    checkedIndex: -1,
    actionType: null,
    check: false
  };

  componentDidMount() {
    this.props.fetchUserDesignationList({}, this.props.token);
  }

  componentWillReceiveProps(props) {
    if (props.payloadFetchData != null) {
      this.setState({ designationData: props.payloadFetchData });
    }
  }

  state = {
    edit: false,
    fetchUserData: null,
    formToggle: false,
    formIndex: null
  };

  onEditTable = index => e => {
    e.preventDefault();
    this.setState({
      formToggle: !this.state.formToggle,
      formIndex: index
    });
  };

  onClose = index => e => {
    e.preventDefault();
    let add = this.state.designationData;
    add.pop();
    this.setState({
      formToggle: !this.state.formToggle,
      formIndex: index,
      designationData: add
    });
  };

  onEditClose = index => e => {
    e.preventDefault();
    this.setState({
      formToggle: !this.state.formToggle,
      formIndex: index
    });
  };

  formManpower = () => {
    if (this.state.formToggle === true) {
      return (
        <ManpowerGCOForm
          formdata={this.state.designationData[this.state.formIndex]}
          operationType={this.state.operationType}
          edit={this.state.edit}
          onChange={this.handleChange}
          onSubmit={this.submitFinal}
          onCreate={this.createUser}
          onEdit={this.onEditTable}
          onClose={this.onClose}
          onEditClose={this.onEditClose}
          onDelete={this.onDelete2}
          closePopup={this.closePopup}
          index={this.state.formIndex}
          lastIndex={this.state.designationData.length - 1}
          toggleOperationType={this.toggleOperationType}
        />
      );
    } else {
      return null;
    }
  };

  toggleOperationType = () => {
    this.setState({ operationType: "" });
  };

  closePopup = (index, errors, operationType) => {
    this.setState({ formToggle: !this.state.formToggle });
    if (errors === true && operationType === "add") {
      this.state.designationData.pop();
      this.setState({ formIndex: index - 1 });
    } else {
      this.setState({ formIndex: index });
    }
  };

  onDelete2 = index => e => {
    e.preventDefault();
    let body = this.state.designationData[index];
    body["designation_id"] = body._id;
    body["status"] = 0;
    this.props.createDesignation(body, this.props.token);
  };

  manpowerTable = () => {
    return (
      <ManpowerGCOTableNew
        formval={this.state.designationData}
        onEdit={this.onEditTable}
        onClose={this.onClose}
        onEditClose={this.onEditClose}
        onDelete={this.onDelete2}
      />
    );
  };

  addManpower = () => {
    let addLoop = this.state.designationData;
    let formIndex = 0;
    if (this.state.designationData == null) {
      addLoop = [
        {
          designation: "",
          uom: "",
          cost: "",
          billing: "",
          workdays: "",
          offdays: "",
          check: true,
          new: true
        }
      ];
    } else {
      formIndex = addLoop.length;
      addLoop.push({
        designation: "",
        uom: "",
        cost: "",
        billing: "",
        workdays: "",
        offdays: "",
        check: true,
        new: true
      });
    }
    this.setState({
      designationData: addLoop,
      formToggle: !this.state.formToggle,
      formIndex: formIndex,
      operationType: "add"
    });
  };

  refreshSucess = () => {
    this.props.hideServerSucessModal();
    this.props.fetchUserDesignationList({}, this.props.token);
    this.setState({
      formToggle: false
    });
  };

  refreshError = () => {
    this.props.fetchUserDesignationList({}, this.props.token);
    this.props.hideServerErrorModal();

    this.setState({
      formToggle: false
    });
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
        {this.props.isServerError ? (
          <Backdrop>
            <ServerError click={this.refreshError} />
          </Backdrop>
        ) : null}
        {this.props.isServerStatus ? (
          <Backdrop zIndexLevel={2}>
            <ServerStatus
              modalHeader={this.props.isServerMsg}
              modalCase={this.props.isServerStatus}
              click={this.refreshSucess}
            />
          </Backdrop>
        ) : null}
        <Navbar />
        <div
          className={Bootstrap["container-fluid"]}
          onClick={e => { this.props.hideProjectSidebar(); this.props.hideResourcesSidebar() }}
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
                  onClick={this.addManpower}
                >
                  <img
                    alt=""
                    src={require("assets/icons/teamMembers.svg")}
                    className={styles["fieldmode__addMember--btn"]}
                  />
                  Add Manpower
                </XLargeButton>
              </div>
            </div>
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap.container,
                styles["field-form-wrapper"]
              )}

            >
              {this.manpowerTable()}
            </div>
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap.container,
                styles["field-form-wrapper"]
              )}

            >
              {this.formManpower()}
            </div>
          </div>
        </div>
        <div className={styles["fieldmode-footer"]}>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.userDesignationStatus,
    isServerMsg: state.serverStatus.userDesignationMessage,
    auth: state.auth,
    token: state.auth.token,
    payloadFetchData: state.serverData.fetchDesignationList,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUserDesignationList, createDesignation, hideServerSucessModal, hideServerErrorModal,
    hideProjectSidebar, hideResourcesSidebar
  }
)(ManpowerGCO);
