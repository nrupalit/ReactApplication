import React from "react";

const Schedule2 = props => {
  let arr = props.columns ? props.columns[4].split(" - ") : ["", ""];
  let arr2 = props.columns ? props.columns[5].split(" - ") : ["", ""];
  let width = props.width != null ? props.width : "20%"; //"13.25%";
  return (
    <div
      className={
        "head headdiv " +
        (props.type == "estimate" && props.mode == "schedule"
          ? "head-headdiv-responsive"
          : "")
      }
      style={{
        display: props.showall,
        width: width,
        //float: props.mode == "schedule" ? "right" : "",
        borderRight: props.mode != "schedule" ? "1px solid white" : ""
      }}
    >
      <div className="subheaddiv1">
        <label className="title-label">{props.label1}</label>
      </div>
      <div style={{ display: "inline", height: "50%", width: "100%" }}>
        <div className="subheaddiv2">
          <label className="title-label">{arr[1]}</label>
        </div>

        <div
          className="subheaddiv2"
          style={{ float: "right", borderRight: "0" }}
        >
          <label className="title-label">{arr2[1]}</label>
        </div>
      </div>
    </div>
  );
};
export default Schedule2;
