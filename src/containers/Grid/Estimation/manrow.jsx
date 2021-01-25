import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/action_authentication.js";
import SelectManpower from "./SelectManpower.jsx";

var rowstyle = {
  width: "100px",
  height: "28px",
  margin: "2px"
};
var input = {
  // border: "1px solid rgb(233, 233, 233)",
  borderRadius: "1px",
  height: "30px",
  //marginRight: "2px",
  backgroundColor: "white",
  textAlign: "center",
  color: "rgb(120, 132, 158)"
};
class ManRow extends Component {


  render() {
    let { actions, key, id, rowid, manrow, name, onChange } = this.props;
    let edit = actions.manedit;
    let border, boxshadow;
    if (edit == false) {
      border = "0px solid #e9e9e9";
      boxshadow = "none";
    } else {
      border = "1px solid #e9e9e9";
      boxshadow = "rgba(0, 0, 0, 0.1) 5px 5px 10px";
    }
    let cost = 0;

    if (document.getElementById("hidden_cost" + manrow.manid)) {
      console.log(document.getElementById("hidden_cost" + manrow.manid));
      cost = document.getElementById("hidden_cost" + manrow.manid).value;
    }
    return (
      <div
        style={{ rowstyle, float: "right", marginTop: "2px", lineHeight: "24px", marginLeft: edit ? "10px" : "" }}
        className="manpower"
      >
        <input
          //className={id}
          name="cost"
          type="text"
          key={key}
          id={id}
          value={manrow.cost}
          style={{
            ...input,
            width: edit ? "29%" : "30%",
            border: border,
            boxShadow: boxshadow,
            float: "right"
          }}
          className={
            id +
            name +
            (actions.mode == "manpower" ? "manpower" : "") +
            " " +
            "uncheck"
          }
          onChange={e => onChange(e, name, rowid, id)}
          type="number"
          min={0}
          disabled="true"
        />
        <input
          //className={id}
          name="mandays"
          type="text"
          key={key}
          id={id}
          value={manrow.mandays}
          style={{
            ...input,
            width: edit ? "20%" : "20%",
            border: border,
            boxShadow: boxshadow,
            float: "right"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          type="number"
          disabled={manrow.selected == false ? true : false}
          min={0}
          className={
            id +
            name +
            (actions.mode == "manpower" ? "manpower" : "") +
            " " +
            "uncheck"
          }
        />

        <input
          //className={id}
          name="persons"
          type="number"
          key={key}
          id={id}
          value={manrow.persons}
          style={{
            ...input,
            width: edit ? "20%" : "20%",
            border: border,
            boxShadow: boxshadow,
            float: "right"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          disabled={manrow.selected == false ? true : false}
          min={0}
          className={
            id +
            name +
            (actions.mode == "manpower" ? "manpower" : "") +
            " " +
            "uncheck"
          }
        />
        {/* <SelectManpower
        toggle={props.toggle}
        key={manrow.manid}
        id={manrow.manid}
        actions={actions}
        name={name}
        rowid={id}
        manrow={manrow}
        onChange={onChange}
      /> */}
        <SelectManpower
          actions={actions}
          key={key}
          id={id}
          rowid={rowid}
          manrow={manrow}
          name={name}
          onChange={onChange}
          isEdit={actions.manedit}
        />
      </div>
    );
  }
}

export default ManRow;
