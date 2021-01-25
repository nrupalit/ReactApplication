import React from "react";

const Schedule = props => {
  let arr = props.columns ? props.columns[3].split(" ") : ["", ""];
  let width = props.width != null ? props.width : "12%";
  return (
    <div
      className={
        "head schedule " +
        (props.type == "estimate" && props.mode == "schedule"
          ? "head-schedule-responsive"
          : "")
      }
      style={{
        display: props.showall,
        width: width,
        borderLeft: "1px solid white",
        borderRight: "1px  solid white"
      }}
    >
      <div className="sm margin">
        <label className="title-label">{arr[0]}</label>
      </div>
      <div className="sm">
        <label className="title-label">{arr[1]}</label>
      </div>
    </div>
  );
};
export default Schedule;
