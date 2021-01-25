import React, { Component } from "react";
import { connect } from "react-redux";
import "./estimation.css"
import * as actions from "../../../actions/action_authentication.js";
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
  color: "rgb(120, 132, 158)"
};
class SelectManpower extends Component {
  state = {
    designationData: null
  };

  componentWillMount = () => {
    console.log("!!!!", this.props);
    /* if (this.props.payloadFetchData == null) {
      this.props.fetchUserDesignationList({}, this.props.token);
    } */
  };

  componentWillReceiveProps(props) {
    if (props.payloadFetchData != null) {
      //console.log(props.payloadFetchData);
      this.setState({ designationData: props.payloadFetchData }, () => {
        console.log(this.state.designationData);
      });
    }
  }

  render() {
    let mode = this.props.mode;

    let {
      actions,
      key,
      id,
      rowid,
      manrow,
      name,
      onChange,
      fetchUserDesignationList,
      type,
      disabled
    } = this.props;
    console.log("actions.editactions.edit", actions.manedit);

    let edit = actions.manedit;
    let border, boxshadow;
    let typeInUse = manrow.type;
    let showall = actions.showall;
    if (mode == "plan" || mode == null) {
      type = "type";
    } else if (mode == "revised") {
      type = "revised_type";
    } else if (mode == "actual") {
      type = "actual_type";
    }

    if (edit == false) {
      border = "0px solid #e9e9e9";
      boxshadow = "none";
    } else {
      border = "1px solid #e9e9e9";
      boxshadow = "rgba(0, 0, 0, 0.1) 5px 5px 10px";
    }
    console.log("LLLL")
    console.log(manrow)
    if (!this.props.isEdit) {
      console.log("this.state.designationData", this.state.designationData);
      console.log("actions.showall", showall);

      return (
        <>
          {this.state.designationData != null &&
            this.state.designationData.map((designation, index) => {
              if (typeInUse == designation.designation) {
                return (
                  <div
                    className={
                      "1002Pre-Designmanpower uncheck" +
                      (actions.showall ? " man-select-responsive" : "")
                    }
                    id={edit == true ? " manpower-select-edit" : ""}
                    style={{
                      color: "rgb(120, 132, 158)",
                      //width: this.props.stage == "execution" ? "90px" : "100px",
                      textAlign: "center",
                      display:
                        this.props.stage == "execution"
                          ? "inline-block"
                          : "block",
                      marginLeft:
                        this.props.stage == "execution" ? "15px" : "0px",
                      wordBreak: "break-all",
                      fontSize: "15px",
                      height: "30px",
                      lineHeight: "2"
                    }}
                  >
                    {designation.designation}
                  </div>
                );
              } else {
                return <></>;
              }
            })}
        </>
      );
    } else {
      return (
        <select
          name={type}
          id={id + (edit == true ? " manpower-select-edit" : "")}
          //value={manrow.type}
          style={{
            ...input,
            width: mode == null || edit == true ? "120px" : "6%",
            border: border,
            boxShadow: boxshadow,
            maxWidth: mode == null || edit == true ? "120px" : "6%",
            marginRight: "0",
            fontSize: "15px"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          disabled={mode == "plan" ? true : false}
          className={
            id +
            name +
            (actions.mode == "manpower" ? "manpower" : "") +
            " " +
            "uncheck"
          }
        >
          {this.state.designationData != null &&
            this.state.designationData.map((designation, index) =>
              typeInUse == designation.designation ? (
                <>
                  <option value={designation.designation} selected="selected">
                    {designation.designation}
                  </option>
                </>
              ) : (
                  <>
                    <option value={designation.designation}>
                      {designation.designation}
                    </option>
                  </>
                )
            )}
        </select>
      );
    }
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
