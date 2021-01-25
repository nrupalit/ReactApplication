import React from 'react';
import './serverstatus.css'
import Backdrop from 'Layout/Backdrop/Backdrop';
const ServerError = (props) => {
  // console.log(props.modalHeader);
  let show = (

    <div className="modal-dialog">
      <div className="modal-content" >
        <div className="modal-header">
          <img src={require('assets/icons/LogoF.png')} alt="Logo" height={30} width={30}
            style={{
              position: "relative"
            }} />

          <h2 style={{ paddingLeft: "10px", paddingRight: "10px" }} className="modal-title mx-auto ml-3">{props.modalHeader}</h2>
          <span className={"fas fa-times fa-2x"} style={{

            position: "relative",
            top: "15px",
            right: "20px"
          }}
            onClick={props.click} />
        </div>
        <div className="modal-body mx-auto">
          {props.modalCase == 200 ? (
            <img src={require("../../assets/icons/checked.svg")} width="70px" height="70px" />
          ) : <img src={require("../../assets/icons/cancel.svg")} width="70px" height="70px" />
          }
        </div>
        {/* <div className="modal-footer">
              <button type="button" className="btn-lg btn-danger" onClick={props.click}>Close</button>
          </div> */}
      </div>
    </div>
  )
  return (
    <Backdrop>
      <div className="B2B--ServerError">
        {show}
        {props.children}
      </div>
    </Backdrop>
  )
}

export default ServerError;