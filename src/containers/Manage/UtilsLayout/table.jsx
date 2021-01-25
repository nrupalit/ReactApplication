import React, { Component } from "react";
import CheckBox from "./checkbox";
import Row from "./row";
class Table extends Component {
  // state={
  //   edit:this.props.actions.edit
  // };
  left = {
    backgroundColor: "#e9e9e9",
    height: "auto",
    textAlign: "right",
    width: "150px",
    //minHeight: "130px",
    clear: "both",
    float: "left"
  };
  right = {
    //border: "2px solid black",
    backgroundColor: "#e9e9e9",
    height: "auto",
    // minHeight: "130px",
    //minWidth: "450px",
    width: "auto",
    minWidth: "1024px",
    //overflowX: "auto",
    padding: "10px",
    paddingTop: "0px",
    paddingBottom: "0px",
    //border: "2px solid red",
    boxShadow: "5px 5px 15px rgba(255,255,255)"
  };
  section = {
    width: "auto",
    maxWidth: "1185px",
    height: "auto",
    // minHeight: "200px",
    // margin: "0 auto",
    //overflow: "auto",
    marginBottom: "20px",
    overflowY: "hidden",
    overflowX: "hidden"
  };
  leftbar = {
    backgroundColor: "#78849e",
    textAlign: "right",
    width: "150px",
    marginBottom: "5px",
    float: "left",
    boxShadow: "5px 5px 15px rgba(255,255,255,0.1)",
    height: "36px"
  };
  rightbar = {
    backgroundColor: "#78849e",
    width: "auto",
    minWidth: "1024px",
    marginBottom: "5px",
    marginTop: "1px",
    height: "36px",
    boxShadow: "0px 0px 0px rgba(255,255,255,0.1)",
    position: "relative"
  };
  render() {
    let {
      table,
      name,
      actions,
      getStyles,
      cid,
      onCheck,
      onChange,
      Label
    } = this.props;
    return (
      <React.Fragment>
        <section style={this.section}>
          {actions.edit && (
            <div>
              <div style={this.leftbar}>
                <CheckBox
                  actions={actions}
                  getStyles={getStyles}
                  id={cid}
                  key={cid}
                  name={cid}
                  onCheck={onCheck}
                />
              </div>
            </div>
          )}
          <div style={{ marginLeft: actions.edit == false ? "0px" : "160px" }}>
            <div style={this.rightbar}>
              <label
                style={{
                  position: "relative",
                  top: "2px",
                  left: "2vw",
                  color: "white"
                }}
              >
                {name}
              </label>
              <label
                style={{
                  position: "absolute",
                  top: "2px",
                  left: actions.edit == false ? "43vw" : "32vw",
                  color: "white"
                }}
              >
                {Label.days}
              </label>
              <label
                style={{
                  position: "absolute",
                  top: "2px",
                  right: actions.edit == false ? "20vw" : "21vw",
                  color: "white"
                }}
              >
                {Label.start}
              </label>
              <label
                style={{
                  position: "absolute",
                  top: "2px",
                  right: actions.edit == false ? "6.5vw" : "6.8vw",
                  color: "white"
                }}
              >
                {Label.end}
              </label>
            </div>
          </div>
          {actions.edit && (
            <div style={this.left}>
              <div>
                {table.map(pre => (
                  <CheckBox
                    key={pre.id}
                    id={pre.id}
                    actions={actions}
                    getStyles={getStyles}
                    name={name}
                    onCheck={onCheck}
                  />
                ))}
              </div>
            </div>
          )}
          <div style={{ marginLeft: actions.edit == false ? "0px" : "160px" }}>
            <div style={this.right}>
              {table.map(pre => (
                <Row
                  key={pre.id}
                  actions={actions}
                  getStyles={getStyles}
                  id={pre.id}
                  onChange={onChange}
                  name={name}
                  row={pre}
                />
              ))}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Table;
