import React, { Component } from "react";
class Canvas extends Component {
  canvas = {
    width: this.props.w,
    height: "30px",
    borderLeft: "1px solid black",
    position: "absolute",
    // left: this.props.hierarchy == false ? "-4px" : "8px",
    zIndex: "-1"
  };

  render() {
    let { actions, hierarchy, row } = this.props;
    let mode = actions.mode;
    let left;
    let visible;

    if (mode == "schedule" || mode == "manpower") {
      if (hierarchy == false) {
        left = "-4px";
      } else {
        if (actions.edit == false) {
          left = "21px";
        } else {
          left = "16px";
        }
      }
    }
    if (mode == "manpower" && row.manpower.length == 0) {
      visible = "hidden";
    } else {
      visible = "visible";
    }
    return (
      <svg style={{ ...this.canvas, left: left, visibility: 'hidden' }}>
        <line
          x1="0"
          y1="15"
          x2="22"
          y2="15"
          style={{ stroke: "black", strokeWidth: 0.6 }}
        />
      </svg>
    );
  }
}

export default Canvas;
