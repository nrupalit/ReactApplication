import React from "react";
const FormActionBtns = props => {
  let { actionbtn } = props;

  return (
    <div class="formbtns">
      <button
        type="button"
        className="btn btn-outline-dark mybutton"
        onClick={actionbtn.onClick}
      >
        {actionbtn.name} &nbsp;
        <span className={actionbtn.iclass} />
      </button>
    </div>
  );
};

export default FormActionBtns;
