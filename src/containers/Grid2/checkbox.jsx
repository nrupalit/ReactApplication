import React, { Component } from "react";
import "./checkbox.scss";

class CheckBox extends Component {
  render() {
    return (
      <React.Fragment>
        <label className="checkcontainer">
          {
            this.props.manpower 
            ? 
            (<input type="checkbox" name="tickbox" onChange={this.props.handleManCheckboxCheck}  />)
            :
            (<input type="checkbox" name="tickbox" onChange={this.props.handleCheckboxCheck}  />)
          }
          <span className="checkmark" />
        </label>
      </React.Fragment>
    );
  }
}

export default CheckBox;
