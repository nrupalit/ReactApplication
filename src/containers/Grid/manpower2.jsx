import React from "react";
import "./Estimation/estimation.css"
const Manpower2 = props => {
  console.log(props);
  let columns = props.columns;
  return (
    <div
      id={props.edit ? "manpower-table" : ""}
      className="head divbig"
      style={{
        width: props.width ? props.width : props.edit ? "29.25%" : "29.35%", // float: "right",

      }}
    >
      <div className="subheaddiv1">
        <label className="title-label">{props.label1}</label>
      </div>
      <div style={{ display: "inline", height: "50%", width: "100%" }}>
        <div className="subheaddiv2" style={{ width: "30%" }}>
          <label className="title-label">{columns[0] ? columns[0] : "A"}</label>
        </div>
        <div className="subheaddiv2" style={{ width: "20%" }}>
          <label className="title-label">{columns[1] ? columns[1] : "A"}</label>
        </div>
        <div className="subheaddiv2" style={{ width: "20%" }}>
          <label className="title-label">{columns[2] ? columns[2] : "A"}</label>
        </div>
        <div className="subheaddiv2" style={{ width: "30%", border: "none" }}>
          <label className="title-label">{columns[3] ? columns[3] : "A"}</label>
        </div>
      </div>
    </div>
  );
};

export default Manpower2;
