import React, { Component } from "react";
import ManTable from "./mantable";
import Canvas from "../canvas";

import "./index.css";
class Row extends Component {
  state = {
    styles: this.props.newstyles
  };
  sminput = {
    textAlign: "center",
    border: "1px solid #e9e9e9 ",
    width: "86px",
    color: "#78849e",
    height: "30px",
    backgroundColor: "white",
    borderRadius: "1px",

    fontSize: "15px"
  };
  newrow = {
    height: "auto",
    position: "relative",
    marginBottom: "3px",
    background: "white"
  };
  componentWillMount = () => {
    this.setState({
      start: this.props.row.start,
      end: this.props.row.end
    });
  };
  lginput = {
    // width: this.state.styles.lginput,
    marginTop: "0px",
    color: "#78849e",
    height: "30px",
    borderRadius: "1px",
    backgroundColor: "white",
    padding: "inherit",
    paddingLeft: "5px",
    // marginLeft: this.props.actions.mode == "schedule2" ? "37px" : "0px",
    fontSize: "15px"
  };
  formatdate = date => {
    var d = new Date(date);
    console.log(d);

    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };
  handleStartChange = e => {
    if (e.target.name == "start") {
      var newDate = new Date(e.target.value);
      var rstart = e.target.value;
      var date = this.formatdate(e.target.value);
      console.log("old => ", date);
      var startdate = new Date(date);
      newDate.setDate(startdate.getDate() + parseInt(this.props.row.days));
      console.log("new => ", newDate);
      newDate = this.formatdate(newDate);
      var id = this.props.row.id;
      var e1 = {
        target: {
          name: "end",
          id: id.toString(),
          value: newDate
        }
      };
      console.log(newDate);
      this.props.onChange.onChange1(e1, this.props.name);
      this.setState({
        start: e.target.value,
        end: newDate
      });
    } else {
      this.setState({
        end: e.target.value
      });
    }
  };
  render() {
    let {
      actions,
      name,
      id,
      onChange,
      row,
      newstyles,
      hierarchy,
      manpower,
      manhandlers,
      selected
    } = this.props;
    let edit = actions.edit;
    let border, boxshadow, lgmarginleft;
    let lgwidth = hierarchy == false ? "95%" : "calc(95% - 20px)"; //gaurav100%" : "calc(100% - 20px)";
    let lgmargin = hierarchy == false ? 0 : 20;
    if (edit == false) {
      border = "0px solid #e9e9e9";
      boxshadow = "none";
    } else {
      border = "1px solid #e9e9e9";
      boxshadow = "rgba(0, 0, 0, 0.1) 5px 5px 10px";
    }
    if (actions.mode == "schedule") {
      lgmarginleft = lgmargin + 15 + "px";
    } else {
      lgmarginleft = lgmargin + 20 + "px";
    }

    return (
      <React.Fragment>
        <div
          class="row no-gutters"
          style={{
            ...this.newrow
          }}
        >
          <div
            className={
              actions.mode == "schedule"
                ? "row-responsive"
                : "man-row-responsive"
            }
            id={actions.mode == "schedule" && !actions.edit ? "task-header" :
              actions.mode == "schedule" && actions.edit ? "task-header-edit" : "task-header-manpower"}
            // class={this.state.styles.col}
            style={{
              width:
                actions.mode == "schedule" && edit
                  ? "810px" //gaurav? "67%"
                  : actions.mode == "schedule"
                    ? "900px" //gaurav? "69%"
                    : actions.mode == "manpower" && actions.manedit == false
                      ? "450px"
                      : "350px", //gaurav: "30%",
              // maxWidth: edit ? "390px" : "380px",
              marginRight: actions.mode == "schedule" ? "0px" : "0px", //gaurav"45px",
              marginTop: "4px"
            }}
          >
            <Canvas
              id="myCanvas"
              hierarchy={row.hierarchy}
              w={row.hierarchy == false ? "30px" : "49px"}
              actions={actions}
              row={row}
            />
            <input
              name="task"
              id={row.id}
              type="text"
              style={{
                ...this.lginput,
                border: border,
                boxShadow: boxshadow,
                width: lgwidth,
                marginLeft: lgmarginleft
              }}
              disabled={row.selected == true ? false : true}
              value={row.task}
              onChange={e => onChange.onChange1(e, name)}
              className={
                id +
                name +
                (actions.mode == "schedule" ? "schedule" : "") +
                " " +
                "uncheck" +
                " schedule-task-responsive"
              }
            />
          </div>
          <div
            className={
              "col nopadding" +
              (actions.mode == "schedule"
                ? " col-responsive"
                : " man-col-responsive")
            }
            style={{
              // marginLeft: edit == false ? "140px" : "0px"
              maxWidth: actions.mode == "schedule" ? "50%" : "400px", //gaurav"fit-content",
              // paddingLeft: edit ? "75px" : "5px",
              // marginLeft: edit ? "90px" : "100px",

              marginTop: "6px",

            }}
          >
            <div
              className={name + "schedule1"}
              style={{
                float: "left",
                display: "flex",
                flexDirection: "row",
                width: "100%"
              }}
            >
              {/* <div
                style={{
                  width:
                    actions.mode == "manpower" && !actions.manedit
                      ? "20%"
                      : actions.manedit
                      ? "12%"
                      : "20%"
                }}
              /> */}
              <div
                //className="schedule-days-responsive"
                style={{
                  width:
                    actions.mode == "manpower" && actions.manedit == false
                      ? "100px" //gaurav? "60%"
                      : actions.manedit
                        ? "100px"
                        : "150px" //gaurav: "32%"
                }}
              >
                <input
                  name="days"
                  id={row.id}
                  type="number"
                  value={row.days}
                  style={{
                    ...this.sminput,
                    width: actions.mode == "manpower" ? "100%" : "100%", //gaurav"150%" : "100%",
                    /* actions.manedit && actions.mode == "manpower"
                      ? "28%"
                      : actions.mode == "manpower"
                        ? "25%"
                        : "32%", */
                    /* marginLeft: actions.manedit
                      ? "21%"
                      : actions.mode == "manpower"
                        ? "35%"
                        : "20%", */
                    border: border,
                    boxShadow: boxshadow,

                    zIndex: "1"
                  }}
                  disabled={row.selected == true ? false : true}
                  onChange={e => onChange.onChange1(e, name)}
                  className={
                    id +
                    name +
                    (actions.mode == "schedule" ? "schedule" : "") +
                    " " +
                    "uncheck"
                  }
                  min={1}
                />
              </div>
              <div
                className="schedule-start-responsive"
                style={{
                  width:
                    actions.mode == "manpower" && actions.manedit == false
                      ? "150px"
                      : actions.manedit
                        ? "150px" //gaurav"22%"
                        : "150px" //: "34%" //gaurav: "24%"
                }}
              >
                <input
                  name="start"
                  id={row.id}
                  type="number"
                  value={row.start}
                  style={{
                    ...this.sminput,
                    border: border,
                    boxShadow: boxshadow,
                    width: actions.mode == "manpower" ? "100%" : "100%", //gaurav"60%" : "100%",
                    textAlign: "center",
                    /*  actions.manedit
                       ? "22%"
                       : actions.mode == "manpower"
                         ? "19%"
                         : "22%" */ background:
                      "#fff no-repeat",

                    //marginLeft: actions.mode == "manpower" ? "-10px" : "0" //gaurav"10px" : "0"
                  }}
                  disabled={row.selected == true ? false : true}
                  onChange={e =>
                    onChange.onChange1(e, name)

                  }
                  className={
                    id +
                    name +
                    (actions.mode == "schedule" ? "schedule" : "") +
                    " " +
                    "uncheck"
                  }
                  min={row.precedencevalue == "" ? 1 : row.min}
                />
              </div>
              <div
                className="schedule-end-responsive"
                style={{
                  width:
                    actions.mode == "manpower" && actions.manedit == false
                      ? "150px"
                      : "150px" //gaurav: "23%"
                }}
              >
                <input
                  name="end"
                  id={row.id}
                  type="number"
                  value={
                    row.end
                  }
                  style={{
                    ...this.sminput,
                    border: border,
                    boxShadow: boxshadow,
                    width: actions.mode == "manpower" ? "100%" : "100%", //gaurav"60%" : "100%",
                    /* actions.mode == "manpower" && !actions.manedit
                      ? "15%"
                      : "22%", */
                  }}
                  onBlur={e => onChange.inputblur(e, name)}
                  disabled={row.selected == true ? false : true}
                  onChange={e => onChange.onChange1(e, name)}
                  className={
                    id +
                    name +
                    (actions.mode == "schedule" ? "schedule" : "") +
                    " " +
                    "uncheck"
                  }
                  min={row.precedencevalue == "" ? 1 : row.min}
                />
              </div>
            </div>
          </div>
          {actions.mode == "manpower" && (
            <React.Fragment>
              <div
                id={actions.manedit ? "manpower-edit" : ""}
                style={{

                  float: "right",
                  width: actions.manedit ? "600px" : "500px"
                }}
              >
                <ManTable
                  toggle={this.props.toggle}
                  manpower={manpower}
                  actions={actions}
                  id={row.id}
                  name={name}
                  manhandlers={manhandlers}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Row;
