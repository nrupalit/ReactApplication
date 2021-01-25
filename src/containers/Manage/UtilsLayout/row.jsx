import React, { Component } from "react";

class Row extends Component {
  state = {
    actions: this.props.actions
  };
  sminput = {
    marginRight: "8px",
    marginLeft: "15px",
    textAlign: "center",
    boxShadow: () => {
      this.props.getStyles(2);
    },
    border: "1px solid #e9e9e9 ",
    width: "12vw",
    //marginTop: "5px",
    color: "#78849e",
    height: "30px",
    borderRadius: "2px",
    backgroundColor: () => {
      this.props.getStyles(1);
    }
  };

  lginput = {
    width: "25vw",
    boxShadow: () => {
      this.props.getStyles(2);
    },
    border: "1px solid #e9e9e9 ",
    marginTop: "0px",
    marginRight: "15px",
    color: "#78849e",
    height: "30px",
    borderRadius: "2px",
    backgroundColor: () => {
      this.props.getStyles(1);
    }
  };
  render() {
    let { actions, name, id, onChange, row } = this.props;
    let edit = actions.edit;
    return (
      <React.Fragment>
        <div
          class="container"
          style={{
            display: "inline",
            width: "200px"
          }}
        >
          <div
            class="row"
            style={{
              height: "4px",
              width: "100vw",
              position: "relative",
              top: "-18px",
              marginBottom: "3px"
            }}
          >
            <div
              class="col-3"
              style={{
                marginLeft: edit == false ? "30px" : "0px"
                // marginTop: "3px"
              }}
            >
              <input
                name="task"
                id={row.id}
                type="text"
                style={this.lginput}
                disabled={edit == false ? true : false}
                value={row.task}
                onChange={e => onChange(e, name)}
                min={1}
                className={id}
              />
            </div>
            <div
              class="col"
              style={{
                marginLeft: edit == false ? "140px" : "0px"
              }}
            >
              <input
                name="days"
                id={row.id}
                type="number"
                value={row.days}
                style={this.sminput}
                disabled={edit == false ? true : false}
                onChange={e => onChange(e, name)}
                min={1}
                className={id}
              />
              <input
                name="start"
                id={row.id}
                type="number"
                value={row.start}
                style={this.sminput}
                disabled={edit == false ? true : false}
                onChange={e => onChange(e, name)}
                min={1}
                className={id}
              />
              <input
                name="end"
                id={row.id}
                type="number"
                value={row.end}
                style={this.sminput}
                disabled={edit == false ? true : false}
                onChange={e => onChange(e, name)}
                min={1}
                className={id}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Row;
