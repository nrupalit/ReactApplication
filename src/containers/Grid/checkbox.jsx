import React, { Component } from "react";
import "./check.scss";
class CheckBox extends Component {
  state = {};
  render() {
    let { actions, name, id, onCheck, manCheck, rowid } = this.props;
    let edit = actions.mode === "schedule" ? actions.edit : actions.manedit;

    return (
      <React.Fragment>
        <label
          class="checkcontainer"
          style={{
            visibility: edit == false ? "hidden" : "visible",
            marginTop: "3px"
          }}
        >
          <span style={{ opacity: 0 }}>.</span>
          <input
            id={id + name}
            type="checkbox"
            onChange={() => {
              if (actions.mode == "schedule") {
                onCheck(id, name);
              } else if (actions.mode == "manpower") {
                manCheck(name, rowid, id);
              }
            }}
          />
          <span class="checkmark" />
        </label>
      </React.Fragment>
    );
  }
}

export default CheckBox;
