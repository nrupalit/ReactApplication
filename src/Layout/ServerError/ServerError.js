import React from "react";
import "./servererror.css";
import Backdrop from "Layout/Backdrop/Backdrop";
const ServerError = props => {
  return (
    <Backdrop>
      <div className="B2B--ServerError">
        <div className="modal-dialog" style={{ height: "50%", weight: "20%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <img
                src={require("assets/icons/LogoF.png")}
                alt="Logo"
                height={30}
                width={30}
                style={{
                  position: "absolute"
                }}
              />
              <h1 className="modal-title mx-auto ml-3">D2B Server Error</h1>
              <span
                className={"fas fa-times fa-2x"}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "20px"
                }}
                onClick={props.click}
              />
            </div>
            <div className="modal-body mx-auto">
              <img
                src={require("../../assets/icons/cancel.svg")}
                width="70px"
                height="70px"
              />
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn-lg btn-danger" onClick={props.click}>Close</button> */}
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </Backdrop>
  );
};

export default ServerError;
