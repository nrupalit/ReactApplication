import React, { Component } from "react";
import CheckBox from "../checkbox";
import RowExecution from "./row2";
class TableExecution extends Component {
  // state={
  //   edit:this.props.actions.edit
  // };
  titleName = {
    width: "390px",
    boxShadow: "rgba(255, 255, 255, 0.1) 0px 0px 0px",
    position: "relative",
    marginLeft: "1px",
    color: "white"
  };
  titleLabelMan = {
    width: "300px",
    marginLeft: "1px",
    paddingLeft: "20px"
  };
  editCheckProcess = {
    position: "absolute"
  };

  mansection = {
    width: "auto",
    height: "auto",
    overflowY: "hidden",
    overflowX: "hidden"
  };

  section = {
    width: "auto",
    Width: this.props.actions.manedit ? "2400px" : "1260px",
    height: "auto",
    overflowY: "hidden",
    overflowX: "hidden"
  };

  leftinput = {
    width: "30px",
    borderRadius: "3px",
    border: "1px solid grey",
    marginTop: "5px",
    height: "22px"
  };

  computeLabel(table) {
    let labels = [];
    var x = 96;
    let counter = 0;
    let counter2 = 0;
    let mlength;
    let flag = 0;
    if (table) {
      table.map((o, i) => {
        mlength = o.manpower.length;
        if (o.hierarchy == true) {
          flag = 1;
          counter += 1;
          counter2 += 1;
          x = x + 1;
          let c = String.fromCharCode(x);
          labels.push(c);
        } else {
          if (flag == 1) {
            // x -= 1;
            x = Math.abs(x - counter2);
            flag = 0;
            counter2 = 0;
          }
          labels.push(i + 1 - counter);
        }
      });
    }
    return labels;
  }

  render() {
    let {
      process,
      actions,
      getStyles,
      display,
      onChange,
      manhandlers
    } = this.props;
    let showall = actions.showall;
    let newlable = this.computeLabel(process.task_list).map(o => o);
    let name = process.column[2];
    let alpha = process.column[0];
    let cid = process.column[0].toLowerCase();
    let p_id = process.p_id;
    return (
      <section
        style={
          this.props.actions.mode == "schedule" ? this.section : this.mansection
        }
      >
        <React.Fragment key={p_id}>
          <div style={{ display: "inline-block", width: "100%" }}>
            <div
              className={
                "titleLabel" +
                (this.props.actions.mode == "manpower" && !showall
                  ? " title-label-responsive"
                  : "")
              }
              style={{
                width: showall ? "4.45%" : "6.45%",
                textAlign: "left",
                borderRight: "1px solid white"
              }}
            >
              <label className="title-label" style={{ color: "white" }}>
                {alpha}
              </label>
            </div>
            <div
              className="subhead"
              style={
                // actions.mode == "schedule" ? this.titleName : this.titleLabelMan,
                {
                  width:
                    this.props.actions.edit &&
                      this.props.actions.mode == "schedule"
                      ? "23.5%" //"26%" //gaurav? "24%"
                      : this.props.actions.mode == "schedule"
                        ? "26%"
                        : "10.8%"
                }
              }
            >
              <label className="title-label" style={{ marginLeft: "30px" }}>
                {name}
              </label>
            </div>
            <div
              className="bar"
              style={{
                width: this.props.actions.mode == "schedule" ? "7%" : "5%",
                display: display,
                borderLeft: "1px solid white",
                borderRight: "1px solid white"
              }}
            />
            <div
              className="bar"
              style={{
                width: this.props.actions.mode == "schedule" ? "15.25%" : "8%", //gaurav"13.25%" : "7%",
                display: display,
                borderRight: "1px solid white"
              }}
            />
            <div
              className="bar"
              style={{
                width: this.props.actions.mode == "schedule" ? "15.25%" : "8%", //gaurav"13.25%" : "7%",
                display: display,
                borderRight: "1px solid white"
              }}
            />
            <div
              className="bar"
              style={{
                width: this.props.actions.mode == "schedule" ? "15.25%" : "8%", //gaurav"13.25%" : "7%",
                display: display,
                borderRight: "1px solid white"
              }}
            />
            <div
              className="bar"
              style={{
                width: this.props.actions.mode == "schedule" ? "7.1%" : "5%",
                display: display,
                borderRight: "1px solid white"
              }}
            />
            <div
              className="bar"
              style={{
                width:
                  this.props.actions.mode == "schedule" &&
                    this.props.actions.edit
                    ? "8.6%"
                    : this.props.actions.mode == "schedule"
                      ? "7.6%"
                      : "4.5%", //gaurav"9.75%" : "5%",
                display: display,
                borderRight: "1px solid white"
              }}
            />
            <div
              className="bar"
              style={{
                width: this.props.actions.mode == "schedule" ? "0" : "40px",
                display:
                  this.props.actions.mode == "schedule" ? "none" : "inherit",
                borderRight: "1px solid white"
              }}
            />
            {actions.mode == "manpower" && (
              <>
                <div
                  className="bar"
                  style={{ width: actions.showall ? "12.5%" : "20%" }}
                />
                <div
                  className="bar"
                  style={{ width: actions.showall ? "12.5%" : "20%" }}
                />
                <div
                  className="bar"
                  style={{ width: actions.showall ? "12.5%" : "20%" }}
                />
                <div
                  className="bar"
                  style={{ width: actions.showall ? "5%" : "7.5%" }}
                />
              </>
            )}
          </div>
        </React.Fragment>
        {process.task_list.map((pre, i) => (
          <React.Fragment>
            <div
              style={{
                display: actions.mode == "schedule" ? "block" : "block",
                width: actions.mode == "schedule" ? "100%" : "2890px"
              }}
            >
              <div
                className="precedenceLabel"
                style={{ width: actions.mode == "schedule" ? "3.2%" : "2%" }}
              >
                <label style={{ marginBottom: "0.6rem" }}>{newlable[i]}</label>
              </div>

              <div
                className="precedenceInput"
                style={{ width: actions.mode == "schedule" ? "3.2%" : "2%" }}
              >
                <input
                  className="leftInput"
                  name={name}
                  id={pre.id}
                  value={pre.precedencevalue}
                  onChange={e => onChange.precedence(e)}
                  onBlur={e => onChange.blur(e)}
                  type="text"
                  style={{ textAlign: "right", width: "80%" }}
                  disabled={true}
                />
              </div>

              <RowExecution
                key={pre.id}
                actions={actions}
                getStyles={getStyles}
                id={pre.id}
                onChange={onChange}
                name={name}
                display={display}
                manpower={pre.manpower}
                revised={pre.revised}
                actual={pre.actual}
                manhandlers={manhandlers}
                row={pre}
                newstyles={this.props.newstyles}
                hierarchy={pre.hierarchy}
              />
            </div>
          </React.Fragment>
        ))}
      </section>
    );
  }
}

export default TableExecution;
