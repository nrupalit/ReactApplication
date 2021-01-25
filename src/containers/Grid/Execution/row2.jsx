import React, { Component } from "react";
import ManTableExecution from "./mantable2";
import Canvas from "../canvas";
import Dragula from "react-dragula";
import "../dragula.css";
import { Progress } from "reactstrap";
// import DatePicker from "react-datepicker";
import "./datepicker.css";
import "./index.css";
// import moment from "moment";
class RowExecution extends Component {
  state = {
    styles: this.props.newstyles,
    startDate: new Date()
  };
  componentWillMount = () => {
    this.setState({
      start: this.props.row.start,
      end: this.props.row.end,
      rstart: this.props.row.rstart,
      rend: this.props.row.rend,
      astart: this.props.row.astart,
      aend: this.props.row.aend
    })
  }
  handlePlanChange = (e) => {

    var start = e.target.value
    var newDate = new Date();
    var date = this.formatdate(e.target.value)
    console.log(date)
    var startdate = new Date(e.target.value)
    newDate.setDate(startdate.getDate() + parseInt(this.props.row.days - 1))
    console.log(newDate)
    newDate = this.formatdate(newDate)
    var id = this.props.row.id
    var e1 = {
      target: {
        name: "end",
        id: id.toString(),
        value: newDate
      }
    }
    console.log(newDate)
    this.props.onChange.onChange1(e1, this.props.name)
    console.log(newDate)
    this.setState({
      start: e.target.value,
      end: newDate
    })
  }
  handleRevisedStartChange = (e) => {
    if (e.target.name == "rstart") {
      console.log(e.target.value)
      var newDate = new Date()
      var rstart = e.target.value
      var date = this.formatdate(e.target.value)
      console.log(date)
      var startdate = new Date(e.target.value)
      newDate.setDate(startdate.getDate() + parseInt(this.props.row.days - 1))
      console.log(newDate)
      newDate = this.formatdate(newDate)
      var id = this.props.row.id
      var e1 = {
        target: {
          name: "rend",
          id: id.toString(),
          value: newDate
        }
      };
      console.log(newDate);
      this.props.onChange.onChange1(e1, this.props.name);
      console.log(newDate);
      this.setState({
        rstart: e.target.value,
        rend: newDate
      });
    } else {
      this.setState({
        rend: e.target.value
      });
    }
  };
  handleActualStartChange = e => {
    if (e.target.name == "astart") {
      console.log(e.target.value)
      var newDate = new Date()
      var rstart = e.target.value
      var date = this.formatdate(e.target.value)
      console.log(date)
      var startdate = new Date(e.target.value)
      newDate.setDate(startdate.getDate() + parseInt(this.props.row.days - 1))
      console.log(newDate)
      newDate = this.formatdate(newDate)
      var id = this.props.row.id
      var e1 = {
        target: {
          name: "aend",
          id: id.toString(),
          value: newDate
        }
      };
      console.log(newDate);
      this.props.onChange.onChange1(e1, this.props.name);
      console.log(newDate);
      this.setState({
        astart: e.target.value,
        aend: newDate
      });
    } else {
      this.setState({
        aend: e.target.value
      });
    }
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

    return [day, month, year].join("/");
  };
  sminput = {
    textAlign: "center",
    border: "1px solid #e9e9e9 ",
    width: "86px",
    color: "#78849e",
    height: "30px",
    backgroundColor: "white",
    borderRadius: "1px",
    marginLeft: "6px",
    fontSize: "15px",
    lineHeight: "21px",
    marginTop: "0px",
    padding: "inherit"
  };
  newrow = {
    height: "auto",
    position: "relative",
    marginBottom: "3px",
    background: "white"
  };

  lginput = {
    // width: this.state.styles.lginput,
    marginTop: "0px",
    color: "#78849e",
    height: "30px",
    borderRadius: "1px",
    backgroundColor: "white",
    padding: "inherit",
    // marginLeft: this.props.actions.mode == "schedule2" ? "37px" : "0px",
    fontSize: "15px"
  };

  dragulaDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
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
      display,
      hierarchy,
      manpower,
      revised,
      actual,
      manhandlers
    } = this.props;
    let edit = actions.edit;
    let showall = actions.showall;

    let border, boxshadow, s2border, s2boxshadow, lgmarginleft;
    let lgwidth = hierarchy == false ? newstyles.lginput : "360px";
    let lgmargin = hierarchy == false ? 0 : 20;
    if (edit == false) {
      border = "0px solid #e9e9e9";
      boxshadow = "none";
      s2border = "0px solid #e9e9e9";
      s2boxshadow = "none";
    } else {
      border = "0px solid #e9e9e9";
      boxshadow = "none";
      s2border = "1px solid #e9e9e9";
      s2boxshadow = "rgba(0, 0, 0, 0.1) 5px 5px 10px";
    }
    if (actions.mode == "schedule") {
      lgmarginleft = lgmargin + 30 + "px";
    } else {
      lgmarginleft = lgmargin + 20 + "px";
    }

    return (
      <React.Fragment>
        <div
          class="row"
          style={{
            ...this.newrow
          }}
        >
          <div
            className={
              actions.mode == "manpower" && showall
                ? "execute-task-responsive"
                : ""
            }
            style={{
              width:
                actions.mode == "schedule" ? "26%" : showall ? "8.5%" : "5.5%",
              maxWidth:
                actions.mode == "schedule" ? "26%" : showall ? "8.5%" : "5.5%"
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
                width: "100%",
                marginLeft: "35px" //lgmarginleft
              }}
              disabled={true}
              value={row.task}
              className={id}
            />
          </div>
          <div
            class="col"
            style={{
              // marginLeft: edit == false ? "140px" : "0px"
              maxWidth: "fit-content",
              paddingLeft: edit ? "0px" : "5px",
              marginLeft: edit ? "0px" : "10px",
              paddingRight: edit ? "0px" : "5px",
              display: display,
              width: "950px",
              // maxWidth: "950px"
            }}
          >
            <span
              className={name + " schedule1"}
              style={{
                width: "100%",
                marginLeft: "0%", //gaurav "1%",
                display: "flex",
                flexDirection: "row"
              }}
            >
              <input
                name="days"
                id={row.id}
                type="number"
                className="sminput"
                value={row.days}
                style={{
                  ...this.sminput,
                  width: showall ? "19%" : "12%", //gaurav"12%",
                  marginLeft: !edit && actions.mode == "schedule" ? "10px" : this.state.styles.smi1margin,
                  border: border,
                  boxShadow: boxshadow,
                  zIndex: "1"
                  //marginRight: "2%"
                }}
                disabled={true}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-days-responsive"
                    : (!edit && showall) || !edit
                      ? " input-days-responsive"
                      : "")
                }
                min={1}
              />

              <input
                name="start"
                id={row.id}
                type="date"
                value={row.start}
                style={{
                  ...this.sminput,
                  border: s2border,
                  boxShadow: s2boxshadow,
                  width: showall ? "9%" : "9.5%", //gaurav"9.5%",
                  fontSize: "12px",
                  fontAlign: "right",
                  marginLeft: !edit && showall ? "0" : !edit ? "15px" : "0", //gaurav,
                  marginRight: "0",
                  background: "#fff"
                }}
                onBlur={e => onChange.inputblur(e, name)}
                disabled={edit == false ? true : false}
                onChange={e => {
                  onChange.onChange1(e, name);
                  this.handlePlanChange(e);
                }}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-responsive"
                    : (!edit && showall) || !edit
                      ? " input-responsive"
                      : "")
                }
                min={row.precedencevalue == "" ? 1 : row.min}
              />

              {/* <DatePicker
                name="start"
                id={row.id + " " + "datpicker"}
                selected={this.state.PlanstartDate}
                onChange={this.handlePlanStartChange}
                name="startDate"
                dateFormat="dd/MM/yyyy"
                disabled={edit ? false : true}
                className={edit ? "red-border-edit" : "red-border"}
              />


              <DatePicker
                name="end"
                id={row.id}
                className={edit ? "red-border-edit" : "red-border"}
                value={this.state.PlanendDate}
                selected={this.state.PlanendDate}
                onChange={this.handlePlanEndChange}
                name="endDate"
                dateFormat="dd/MM/yyyy"
                disabled={edit ? false : true}


              /> */}

              <input
                name="end"
                id={row.id}
                type="date"
                value={row.end}
                style={{
                  ...this.sminput,
                  border: border,
                  boxShadow: boxshadow,
                  width: showall ? "9%" : "9.5%", //gaurav"9.5%",
                  fontSize: "12px",
                  fontAlign: "right",
                  marginLeft: !edit ? "15px" : "1%",
                  marginRight: "0",
                  background: "#fff"
                }}
                disabled={true}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-responsive"
                    : (!edit && showall) || !edit
                      ? " input-responsive"
                      : "")
                }
                min={row.precedencevalue == "" ? 1 : row.min}
              />
              {/* <DatePicker
                name="rstart"
                id={row.id}
                className={edit ? "red-border-edit" : "red-border"}
                selected={this.state.RevisedstartDate}
                onChange={this.handleRevisedStartChange}
                name="startDate"
                dateFormat="dd/MM/yyyy"
                disabled={edit ? false : true}
              />


              <DatePicker
                name="rend"
                id={row.id}
                className={edit ? "red-border-edit" : "red-border"}
                value={this.state.RevisedendDate}
                selected={this.state.RevisedendDate}
                onChange={this.handleRevisedEndChange}
                name="endDate"
                dateFormat="dd/MM/yyyy"
                disabled={edit ? false : true}


              />
              <DatePicker
                name="astart"
                id={row.id}
                className={edit ? "red-border-edit" : "red-border"}
                selected={this.state.ActualstartDate}
                onChange={this.handleActualStartChange}
                name="startDate"
                dateFormat="dd/MM/yyyy"
                disabled={edit ? false : true}
              />


              <DatePicker
                name="aend"
                id={row.id}
                className={edit ? "red-border-edit" : "red-border"}
                value={this.state.ActualendDate}
                selected={this.state.ActualendDate}
                onChange={this.handleActualEndChange}
                name="endDate"
                dateFormat="dd/MM/yyyy"
                disabled={edit ? false : true}


              /> */}

              <input
                name="rstart"
                id={row.id + " " + ""}
                type="date"
                value={this.state.rstart}
                style={{
                  ...this.sminput,
                  border: s2border,
                  boxShadow: s2boxshadow,
                  width: showall ? "9%" : "9.5%", //gaurav"9.5%",
                  fontSize: "12px",
                  fontAlign: "right",
                  background: "#fff",
                  marginLeft: !edit ? "15px" : "1%",
                  marginRight: "0"
                  //marginRight: !edit ? "0" : "2%"
                }}
                onBlur={e => onChange.inputblur(e, name)}
                disabled={edit == false ? true : false}
                onChange={e => {
                  onChange.onChange1(e, name);
                  this.handleRevisedStartChange(e);
                }}
                min={1}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-responsive"
                    : (!edit && showall) || !edit
                      ? " input-responsive"
                      : "")
                }
              />
              <input
                name="rend"
                id={row.id}
                type="date"
                value={this.state.rend}
                style={{
                  ...this.sminput,
                  border: s2border,
                  boxShadow: s2boxshadow,
                  width: showall ? "9%" : "9.5%", //gaurav"9.5%",
                  fontSize: "12px",
                  fontAlign: "right",
                  background:
                    "#fff",
                  marginLeft: !edit ? "15px" : "1%",
                  marginRight: "0"
                  //marginRight: !edit ? "0" : "2%"
                }}
                onBlur={e => onChange.inputblur(e, name)}
                disabled={edit == false ? true : false}
                onChange={e => {
                  onChange.onChange1(e, name);
                  this.handleRevisedStartChange(e);
                }}
                min={1}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-responsive"
                    : (!edit && showall) || !edit
                      ? " input-responsive"
                      : "")
                }
              />
              <input
                name="astart"
                id={row.id}
                type="date"
                value={this.state.astart}
                style={{
                  ...this.sminput,
                  border: s2border,
                  boxShadow: s2boxshadow,
                  width: showall ? "9%" : "9.5%", //gaurav"9.5%",
                  fontSize: "12px",
                  fontAlign: "right",
                  background: "#fff",
                  marginLeft: !edit ? "15px" : "1%",
                  marginRight: "0"
                }}
                onBlur={e => onChange.inputblur(e, name)}
                disabled={edit == false ? true : false}
                onChange={e => {
                  onChange.onChange1(e, name);
                  this.handleActualStartChange(e);
                }}
                min={1}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-responsive"
                    : (!edit && showall) || !edit
                      ? " input-responsive"
                      : "")
                }
              />
              <input
                name="aend"
                id={row.id}
                type="date"
                value={this.state.aend}
                style={{
                  ...this.sminput,
                  border: s2border,
                  boxShadow: s2boxshadow,
                  width: showall ? "9%" : "9.5%", //gaurav"9.5%",
                  fontSize: "12px",
                  fontAlign: "right",
                  background: "#fff",
                  marginLeft: !edit ? "15px" : "1%",
                  marginRight: "0"
                }}
                onBlur={e => onChange.inputblur(e, name)}
                disabled={edit == false ? true : false}
                ononChange={e => {
                  onChange.onChange1(e, name);
                  this.handleActualStartChange(e);
                }}
                min={1}
                className={
                  id +
                  (actions.mode == "manpower"
                    ? " man-input-responsive"
                    : (!edit && showall) || !edit
                      ? " input-responsive input-last-responsive"
                      : " input-last-responsive")
                }
              />

              {!edit && (
                <div
                  className="myprogress-bar"
                  style={{ width: actions.mode == "schedule" ? "10%" : "8%" }}
                >
                  <div className="text-center" style={{ marginLeft: "20px" }}>
                    {row.completion}%
                  </div>
                  <Progress value={row.completion} />
                </div>
              )}

              {edit && (
                <input
                  name="completion"
                  id={row.id}
                  type="number"
                  value={row.completion}
                  max="100"
                  style={{
                    ...this.sminput,
                    width: showall && edit ? "10%" : !edit ? "15%" : "12%",
                    border: s2border,
                    boxShadow: s2boxshadow
                  }}
                  onBlur={e => onChange.inputblur(e, name)}
                  disabled={edit == false ? true : false}
                  onChange={e => onChange.onChange1(e, name)}
                  min={1}
                  className={id}
                />
              )}

              <input
                name="comment"
                id={row.id}
                type="text"
                value={row.comment}
                style={{
                  ...this.sminput,
                  width:
                    actions.mode == "schedule" && edit
                      ? "15%"
                      : !edit
                        ? "12%"
                        : "232px",
                  marginRight: "0px",
                  border: s2border,
                  boxShadow: s2boxshadow
                }}
                onBlur={e => onChange.inputblur(e, name)}
                disabled={edit == false ? true : false}
                onChange={e => onChange.onChange1(e, name)}
                min={1}
                className={id}
              />
            </span>
          </div>
          {actions.mode == "manpower" && (
            <React.Fragment>
              {/* <div
                style={{
                  width: "40px",
                  backgroundColor: "black",
                  height: "100%"
                }}
              /> */}
              <div
                className="man"
                style={{ marginLeft: showall ? "2.5%" : "0.5%" }} //gaurav"0%" : "0.5%" }}
                ref={this.dragulaDecorator}
              >
                <ManTableExecution
                  manpower={manpower}
                  revised={revised}
                  actual={actual}
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

export default RowExecution;
