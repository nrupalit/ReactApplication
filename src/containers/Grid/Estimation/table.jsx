import React, { Component } from "react";
import CheckBox from "../checkbox";
import Row from "./row";
import Dragula from "react-dragula";
import "./estimation.css"
class Table extends Component {
  editCheckProcess = {
    position: "absolute",
    width: "120px"
  };
  mansection = {
    width: "auto",
    //minWidth: this.props.actions.edit ? "1400px" : "1260px",
    height: "auto",
    overflowY: "hidden",
    overflowX: "hidden"
  };

  section = {
    width: "auto",
    Width: this.props.actions.manedit ? "1400px" : "1260px",
    height: "auto",
    overflowY: "hidden",
    overflowX: "hidden"
  };

  leftinput = {
    width: "30px",
    borderRadius: "3px",
    border: "1px solid grey",
    marginTop: "5px",
    height: "22px",
    paddingLeft: "5px"
  };

  titleStyles = {
    backgroundColor: "#78849e",
    border: "none",
    color: "white"
  };
  titleEditStyles = {
    paddingLeft: "5px",
    backgroundColor: "white",
    border: "none",
    color: "#78849e"
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

  dragulaDecorator1 = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  };

  render() {
    let {
      process,
      actions,
      getStyles,
      onCheck,
      onChange,
      manhandlers
    } = this.props;
    console.log(this.props.actions);
    let newlable = this.computeLabel(process.task_list).map(o => o);
    let name = process.column[2];
    let alpha = process.column[0];
    let cid = process.column[0].toLowerCase();
    let p_id = process.p_id;
    var docs = document.getElementById("1Pre-Design");
    console.log(docs);
    return (
      <section
        style={
          this.props.actions.mode == "schedule" ? this.section : this.mansection
        }
      >
        <div
          ref={this.dragulaDecorator1}
          key={p_id}
          className={`process_${p_id}`}
        >
          <React.Fragment>
            <div style={{ flexDirection: "row", height: "42px" }}>
              {actions.edit && (
                <div
                  style={
                    this.props.actions.mode == "schedule"
                      ? this.editCheckProcess
                      : null

                  }

                >
                  <CheckBox
                    actions={actions}
                    getStyles={getStyles}
                    id={cid}
                    key={cid}
                    name={cid}
                    onCheck={onCheck}
                  />
                </div>
              )}
              <div
                className={
                  "titleLabel"

                }
                style={{
                  width: actions.edit ? "190px" : "100px",
                  textAlign: actions.edit ? "" : "left",
                  borderRight: "1px solid white"
                }}
              >
                <label className="title-label" style={{ color: "white" }}>
                  {alpha}
                </label>
              </div>
              <div
                className={
                  this.props.actions.mode == "schedule"
                    ? "titleName sch process-responsive"
                    : "titleName man"
                }
                id={actions.mode == "schedule" && !actions.edit ? "process-header" : actions.mode == "schedule" &&
                  actions.edit ? "process-header-edit" : "process-header-manpower"}
                style={{
                  minWidth: "0px",
                  width:
                    actions.edit && actions.mode == "schedule"
                      ? "1260px"
                      : actions.mode == "schedule"
                        ? "1350px"
                        : actions.manedit
                          ? "850px"
                          : "850px",
                  float: actions.mode == "schedule" ? "right" : "",
                  textAlign: "left",
                  borderRight: actions.mode == "manpower" ? "1px solid white" : "none"
                }}
              >
                <input
                  name="process"
                  id={"P" + process.p_id}
                  type="text"
                  style={actions.edit ? this.titleEditStyles : this.titleStyles}
                  disabled={actions.edit == false ? true : false}
                  value={name != "" ? name : null}
                  onChange={e => onChange.onChange2(e, process.p_id)}
                  className={"P" + process.p_id}
                />
              </div>
              {actions.mode == "manpower" && (
                <div
                  className="bar"
                  style={{
                    width: actions.manedit == false ? "500px" : "500px",
                    float: "right"

                  }}
                />
              )}
            </div>
          </React.Fragment>
          {process.task_list.map((pre, i) => (
            <React.Fragment>
              <div
                style={{
                  flexDirection: "row"
                  // display: actions.mode == "schedule" ? "inline-block" : "block"
                }}
              >
                {actions.edit && (
                  <div
                    style={{
                      float: "left",
                      width: "90px",
                      textAlign: "left",
                      maxHeight: "35px"
                    }}
                  >
                    <div
                      style={{
                        float: "left",
                        width: "50px",
                        textAlign: "center"
                      }}
                    >
                      {" "}
                      <span
                        style={{ paddingTop: "10px" }}
                        className="fa fa-arrows-v"
                      />{" "}
                    </div>
                    <div style={{ position: "absolute" }}>
                      <CheckBox
                        key={pre.id}
                        id={pre.id}
                        p_id={process.p_id}
                        actions={actions}
                        getStyles={getStyles}
                        name={name}
                        onCheck={onCheck}
                      />
                    </div>
                  </div>
                )}
                <div className="precedenceLabel">
                  <label style={{ marginBottom: "0.6rem" }}>
                    {newlable[i]}
                  </label>
                </div>

                <div className={"precedenceInput"}>
                  <input
                    className={"leftInput"}
                    name={name}
                    id={pre.id}
                    value={pre.precedencevalue}
                    onChange={e => onChange.precedence(e)}
                    onBlur={e => onChange.blur(e)}
                    type="text"
                    style={{ textAlign: "center" }}
                    disabled={
                      actions.mode == "schedule" && actions.edit ? false : true
                    }
                  />
                </div>
                <Row
                  toggle={this.props.toggle}
                  key={pre.id}
                  actions={actions}
                  getStyles={getStyles}
                  id={pre.id}
                  onChange={onChange}
                  name={name}
                  manpower={pre.manpower}
                  manhandlers={manhandlers}
                  row={pre}
                  newstyles={this.props.newstyles}
                  hierarchy={pre.hierarchy}
                  selected={pre.selected}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }
}

export default Table;
