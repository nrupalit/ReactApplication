import React from "react";

const Schedule3 = props => {
  let arr = props.columns ? props.columns[4].split(" - ") : ["", ""];
  let arr2 = props.columns ? props.columns[5].split(" - ") : ["", ""];
  return (
    <div
      className="head headdiv"
      style={{
        display: props.showall,
        width: "13.25%",
        float: props.mode == "schedule" ? "right" : "",
        borderRight: "1px solid white"
      }}
    >
      <div className="subheaddiv1">
        <label className="title-label">{props.label1}</label>
      </div>
      <div style={{ display: "inline", height: "50%", width: "100%" }}>
        <div className="subheaddiv2">
          <label className="title-label">%</label>
        </div>
      </div>
    </div>
  );
};
export default Schedule2;
