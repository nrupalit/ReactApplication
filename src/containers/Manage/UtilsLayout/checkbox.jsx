import React, { Component } from "react";
class CheckBox extends Component {
  state = {};
  render() {
    let { actions, name, id, onCheck } = this.props;
    let edit = actions.edit;

    return (
      <div>
        <label
          class="checkcontainer"
          style={{
            visibility: edit == false ? "hidden" : "visible",
            marginTop: "3px"
          }}
        >
          <span style={{ opacity: 0 }}>One</span>
          <input type="checkbox" onChange={() => onCheck(id, name)} />
          <span class="checkmark" />
        </label>
      </div>
    );
  }
}

export default CheckBox;
