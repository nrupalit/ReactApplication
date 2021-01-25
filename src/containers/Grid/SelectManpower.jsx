import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";

var rowstyle = {
  width: "100px",
  height: "28px",
  margin: "2px"
};
var input = {
  // border: "1px solid rgb(233, 233, 233)",
  borderRadius: "1px",
  height: "30px",
  marginRight: "2px",
  backgroundColor: "white",
  textAlign: "center",
  color: "rgb(120, 132, 158)",
  display: "inline"
};

class SelectManpower extends Component {
  state = {
    designationData: null
  };

  componentWillMount() {
    if (this.props.payloadFetchData == null) {
      this.props.fetchUserDesignationList({}, this.props.token);
    }
  }

  componentWillReceiveProps(props) {
    if (props.payloadFetchData != null) {
      //console.log(props.payloadFetchData);
      this.setState({ designationData: props.payloadFetchData });
    }
  }

  render() {
    let { actions, key, id, rowid, manrow, name, onChange } = this.props;
    let edit = actions.manedit;
    let cost = "";
    let border, boxshadow;
    if (edit == false) {
      border = "0px solid #e9e9e9";
      boxshadow = "none";
    } else {
      border = "1px solid #e9e9e9";
      boxshadow = "rgba(0, 0, 0, 0.1) 5px 5px 10px";
    }

    return (
      <>
        <select
          name="type"
          id={id}
          value={manrow.type}
          style={{
            ...input,
            width: actions.manedit == false ? "27%" : "24%",
            border: border,
            boxShadow: boxshadow,
            float: "right"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          disabled={manrow.selected == false ? true : false}
          className={
            id +
            name +
            (actions.mode == "manpower" ? "manpower" : "") +
            " " +
            "uncheck"
          }
        >
          {this.state.designationData != null &&
            this.state.designationData.map((designation, index) => {
              <option value={designation.designation} id={designation.cost}>
                {designation.designation}
              </option>;
            })}
        </select>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    /* isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.userDesignationStatus,
    isServerMsg: state.serverStatus.userDesignationMessage, */
    token: state.auth.token,
    payloadFetchData: state.serverData.fetchDesignationList
    /* userFieldAccess: state.serverStatus.userDesignationAccess */
  };
};

export default connect(
  mapStateToProps,
  actions
)(SelectManpower);
