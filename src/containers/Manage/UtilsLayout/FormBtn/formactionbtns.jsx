import React, { Component } from "react";
import cx from 'classnames';
import {CSVLink} from 'react-csv';

import Bootstrap from './../../../../Bootstrap//bootstrap.module.css'

class FormActionBtns extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  style = {
    margin: "6px",
    borderRadius: "15px",
    width: "100px",
    float: "right",
    color: this.props.actionbtn.color
  };

  render() {
    let { actionbtn } = this.props;
    return ( 
      <div className="formbtns">
        <button
          type="button"
          className={cx(Bootstrap.btn,Bootstrap['btn-outline-dark'])}
          style={this.style}
          onClick={actionbtn.onClick}
        >
{actionbtn.name} &nbsp;
          <span className={actionbtn.iclass} />
        </button>       
      </div>

    );
  }
}

export default FormActionBtns;
