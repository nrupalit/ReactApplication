import React from "react";

import "./Backdrop.css";

const backdrop = props => (
  // props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null

  <div
    className="Backdrop"
    style={
      props.zIndexLevel == "2" ? { zIndex: "1000000" } : { zIndex: "100000" }
    }
  >
    {props.children}
  </div>
);

export default backdrop;
