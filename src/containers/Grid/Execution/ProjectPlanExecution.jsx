import React, { Component } from "react";
import TableExecution from "./table2";
import FormActionBtns from "../formactionbtns";
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";
import hoc from "../HOC/hoc";
import Schedule2 from "../schedule2";
import Schedule from "../schedule";
import Comment from "./comment";
import Manpower2 from "../manpower2";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import ServerStatus from "Layout/ServerSucess/ServerStatus";

class ProjectPlanExecution extends Component {
  state = {
    // mode: this.props.newprops.mode,
    id: 1000, //this id should be much greater than the ids of respective rows in table.
    actions: {
      manedit: false,
      edit: false,
      mode: this.props.newprops.mode,
      whomtoscan: [],
      schedulechecks: [],
      showall: false
    },
    processArray: "",

    label1: {
      days: 3,
      start: 1,
      end: 3
    },

    mlabel1: {
      persons: 0,
      mandays: 0,
      cost: 0
    }
    ,
    flags: false,
    Errormsg: "",
    designationData: null
  };

  getFunctionReference = () => {
    if (this.state.actions.mode == "schedule") {
      let obj = {
        edit: this.onEdit,
        save: this.onSave,
        submit: this.onSubmit
      };
      return obj;
    } else if (this.state.actions.mode == "manpower") {
      return {
        edit: this.onManEdit,
        save: this.onManSave,
        submit: this.onManSubmit
      };
    }
  };

  onEdit = () => {
    let actions = this.state.actions;
    let scan = this.state.actions.schedulechecks;
    if (actions.edit == true) {
      let arraytable = this.getProperTable(scan);
      //console.clear();
      arraytable.map(table => {
        let x = this.removeEdits(table);
        this.state.processArray.filter(process =>
          this.setState({
            processArray: [...this.state.processArray]
          })
        );
      });
    }
    console.log(this.state.processArray)
    actions["edit"] = !actions.edit;
    this.setState({ actions: actions });
  };
  removeEdits = table => {
    table.map(o => {
      o.selected = false;
      let element = document.getElementsByClassName(o.id);
      for (let i = 0; i < element.length; i++) {
        element[i].style.backgroundColor = "white";
        element[i].style.color = "#78849e";
      }
    });
    return table;
  };

  getProperTable = scan => {
    let table = [];
    this.state.processArray.filter(process => {
      if (scan.indexOf(process.column[2]) != -1) {
        table.push(process.task_list);
      }
    });
    return table;
  };

  skeleton = (source, isArray) => {
    var o = Array.isArray(source) ? [] : {};
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        var t = typeof source[key];
        o[key] =
          t == "object"
            ? this.skeleton(source[key])
            : { string: "", number: 0, boolean: false }[t];
      }
    }
    return o;
  };

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  getCount = (si, table) => {
    console.log("Start", si);
    let count = 0;
    for (let z = si; z < table.length; z++) {
      let obj = table[z];
      if (obj.hierarchy == true) {
        count = count + 1;
      } else {
        break;
      }
    }
    console.log("Count", count);
    return count;
  };

  prepareAPI = data => {
    let singleprocess,
      ptask,
      tasktree,
      sub_t,
      sub_tasks,
      processes,
      manp,
      man,
      fulltree,
      newlist;
    processes = data.map(process => {
      ptask = process.task_list.map(task => {
        manp = task.manpower.map(m => {
          man = {
            Type: m.manid - 1000,
            Type_name: m.type,
            Persons: m.persons,
            Mandays: m.mandays,
            Total_cost: m.cost,
            actual_name: "",
            actual_mandays: m.actual_mandays,
            actual_persons: m.actual_persons,
            actual_total_cost: m.actual_total_cost,
            actual_type: m.actual_type,
            revised_mandays: m.revised_mandays,
            revised_name: "",
            revised_persons: m.revised_persons,
            revised_total_cost: m.revised_total_cost,
            revised_type: m.revised_type,
            update_comment: m.update_comment
          };
          return man;
        });
        if (task.hierarchy == false) {
          fulltree = tasktree = {
            type: task.hierarchy ? "sub_task" : "task",
            display_priority: task.priority,
            column_data: [
              task.alpha,
              task.alpha2,
              task.task,
              task.days,
              task.start,
              task.end,
              task.rstart,
              task.rend,
              task.astart,
              task.aend,
              task.completion,
              task.comment
            ],
            manpower: manp
          };
        } else {
          sub_t = {
            type: task.hierarchy ? "sub_task" : "task",
            display_priority: task.priority,
            column_data: [
              task.alpha,
              task.alpha2,
              task.task,
              task.days,
              task.start,
              task.end,
              task.rstart,
              task.rend,
              task.astart,
              task.aend,
              task.completion,
              task.comment
            ],
            manpower: manp
          };
          sub_tasks = { sub_tasks: [] };
          sub_tasks.sub_tasks.push(sub_t);
          tasktree.column_data.push(sub_tasks);
        }
        return fulltree;
      });

      newlist = ptask.reduce((acc, val) => {
        return acc.includes(val) ? acc : [...acc, val];
      }, []);

      singleprocess = {
        type: "process",
        display_priority: process.priority,
        column_data: process.column,
        tasks: newlist
      };
      return singleprocess;
    });
    return processes;
  };

  onSave = () => {
    var flags = false
    var msg
    let actions = this.state.actions
    let data = this.state.processArray;
    //console.clear();
    let rows = this.prepareAPI(data);
    console.log("outgoing", rows);
    console.log("outgoing", this.props.newprops.data);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    console.log(newData)
    newData.Rows.map(process => {
      process.tasks.map(task => {
        if (task.column_data[6] == 0 || task.column_data[7] == 0 || task.column_data[8] == 0 || task.column_data[9] == 0) {
          flags = true
          msg = "Please Enter valid Date"
        }
        if (task.column_data[12]) {
          task.column_data[12].sub_tasks.map(sub_task => {
            if (sub_task.column_data[6] == 0 || sub_task.column_data[7] == 0 || sub_task.column_data[8] == 0 || sub_task.column_data[9] == 0) {
              flags = true
              msg = "Please Enter valid Date"
            }
          })
        }
        /* task.manpower.map(man => {
          if (man.actual_name == "" || man.revised_name == "") {
            flags = true
            msg = "Enter valid Manpower Type"
          }
          else if (man.actual_persons == 0 || man.revised_persons == 0 || man.actual_mandays == 0 || man.actual_total_cost == 0
            || man.revised_mandays == 0 || man.revised_total_cost == 0) {
            flags = true
            msg = "Enter valid manpower data"
          }
        }) */
      })
    })
    if (flags == true) {
      this.setState({ flags: true, Errormsg: msg })
    }
    else {
      let template = JSON.stringify(newData);
      console.log(template)
      const dockProject = this.props.newprops.isDock[0];
      var bodyData
      if (dockProject.project_type == "Design and Build") {
        bodyData = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: "Design"
        };
      }
      else {
        bodyData = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: dockProject.project_type
        };
      }
      console.log(this.props, bodyData);
      this.props.newprops.editExecute(bodyData, this.props.newprops.token);
      actions["edit"] = !actions.edit
      //this.setState({ actions: actions })
      var bodydata
      if (dockProject.project_type == "Design and Build") {
        bodydata = {
          project_id: dockProject._id,
          prj_type: "Design",
          sub_type: "Execute"
        };
      }
      else {
        bodydata = {
          project_id: dockProject._id,
          prj_type: dockProject.project_type, //,
          sub_type: "Execute"
        };
      }
      this.props.newprops.templatePage(bodydata, this.props.newprops.token)

      this.setState({ actions: actions })
    }
    this.forceUpdate();
  };

  onSubmit = () => {
    let actions = this.state.actions
    let data = this.state.processArray;
    let rows = this.prepareAPI(data);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    let template = JSON.stringify(newData);
    const dockProject = this.props.newprops.isDock[0];
    const bodyData = {
      project_id: dockProject._id,
      type: "Submit",
      template: template,
      project_type: dockProject.project_type
    };
    console.log(this.props, bodyData);
    this.props.newprops.editExecute(bodyData, this.props.newprops.token);
    actions["edit"] = false;
    this.setState({ actions: actions })
    console.clear();
    console.log(data);
  };
  getStyles = id => {
    let value;
    let edit = this.state.actions.edit;
    let manedit = this.state.actions.manedit;
    if (id == 1) {
      // value = edit == false ? "unset" : "1px solid #e9e9e9 ";
      value = edit == false ? "0px solid #e9e9e9" : "1px solid #e9e9e9";
      return value;
    } else if (id == 2) {
      value = edit == false ? "none" : "rgba(0, 0, 0, 0.1) 5px 5px 10px";
      return value;
    } else if (id == 3) {
      value = edit == false ? "100px" : "160px";
      return value;
    }
  };

  onChange = (event, name) => {
    let days = 0,
      start = [],
      end = [];
    let variable = event.target.name; //Will get variable to be changed
    let id = event.target.id; //Will get object to be changed
    let value = event.target.value; //Will get input value
    let table, newtable;
    this.state.processArray.filter(process => {
      if (name == process.column[2]) {
        table = process.task_list;
        newtable = this.onChangeEach(table, variable, value, id);
        let label = this.setLabel(newtable);

        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });
    console.log("onChange", newtable, id);
  };

  setLabel(table) {
    let days = 0;
    let start = [];
    let end = [];
    let fstart = 0;
    let fend = 0;
    table.map(o => {
      if (o.days != "") {
        days = days + parseInt(o.days);
      }
      if (o.start != "") {
        start.push(parseInt(o.start));
        fstart = Math.min.apply(null, start);
      }
      if (o.end != "") {
        end.push(parseInt(o.end));
        fend = Math.max.apply(null, end);
      }
    });
    days = days <= 0 ? "" : days;
    fstart = fstart <= 0 ? "" : fstart;
    fend = fend <= 0 ? "" : fend;
    let label = {
      days: days,
      start: fstart,
      end: fend
    };
    return label;
  }

  setManLabel = (table, attr, label) => {
    let sum = 0;
    table.map(o => {
      o.manpower.map(man => {
        let value = man[attr];
        if (value != "") {
          sum += parseInt(value);
        }
      });
    });
    label[attr] = sum;
    return label;
  };

  onChangeEach(table, variable, value, id) {
    console.log("onChangeEach", variable);
    table.map(o => {
      if (o.id == id) {

        o[variable] = value;

      }
    });
    return table;
  }

  onManEdit = () => {

    let actions = this.state.actions;
    if (actions.manedit == true) {
      let arraytable = this.getProperTable(this.state.actions.whomtoscan);
      arraytable.map(table => {
        let x = this.onManRemoveEdits(table);
        this.setState({ [table]: x });
      });
    }
    actions["manedit"] = !actions.manedit;
    this.setState({ actions: actions });
  };

  onManRemoveEdits = table => {
    table.map(o => {
      o.manpower.map(man => {
        man.selected = false;
        let elements = document.getElementsByClassName(man.manid);
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.backgroundColor = "white";
          elements[i].style.color = "#78849e";
        }
      });
      // this.setState({ [t]: t });
    });
    // this.setState({ [t]: t });
    return table;
  };

  getOccurences = (scan, name) => {
    let count = 0;
    scan.map(o => {
      if (o == name) {
        count += 1;
      }
      if (count > 1) {
        alert("Add One By One");
      }
    });
    return count;
  };

  deleteSpaces = table => {
    let newtable = table.filter(o => o.manpower.length > 0);
    console.log(newtable);
    return newtable;
  };

  onManSave = () => {
    var flags = false
    var msg
    let actions = this.state.actions
    let data = this.state.processArray;
    //console.clear();
    let rows = this.prepareAPI(data);
    console.log("outgoing", rows);
    console.log("outgoing", this.props.newprops.data);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    console.log(newData)
    newData.Rows.map(process => {
      process.tasks.map(task => {
        if (task.column_data[6] == 0 || task.column_data[7] == 0 || task.column_data[8] == 0 || task.column_data[9] == 0) {
          flags = true
          msg = "Please Enter valid Date"
        }
        if (task.column_data[12]) {
          task.column_data[12].sub_tasks.map(sub_task => {
            if (sub_task.column_data[6] == 0 || sub_task.column_data[7] == 0 || sub_task.column_data[8] == 0 || sub_task.column_data[9] == 0) {
              flags = true
              msg = "Please Enter valid date"
            }
          })
        }
        /*  task.manpower.map(man => {
           if (man.actual_type == "" && man.revised_type == "") {
             flags = true
             msg = "Enter valid Manpower Type"
           }
           else if (man.actual_persons == 0 || man.revised_persons == 0 || man.actual_mandays == 0 || man.actual_total_cost == 0
             || man.revised_mandays == 0 || man.revised_total_cost == 0) {
             flags = true
             msg = "Enter valid manpower data"
           }
         }) */
      })
    })
    if (flags == true) {
      this.setState({ flags: true, Errormsg: msg })
    }
    else {
      let template = JSON.stringify(newData);
      console.log(template)
      const dockProject = this.props.newprops.isDock[0];
      var bodyData
      if (dockProject.project_type == "Design and Build") {
        bodyData = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: "Design"
        };
      }
      else {
        bodyData = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: dockProject.project_type
        };
      }
      console.log(this.props, bodyData);
      this.props.newprops.editExecute(bodyData, this.props.newprops.token);
      actions["edit"] = !actions.edit
      //this.setState({ actions: actions })
      var bodydata
      if (dockProject.project_type == "Design and Build") {
        bodydata = {
          project_id: dockProject._id,
          prj_type: "Design",
          sub_type: "Execute"
        };
      }
      else {
        bodydata = {
          project_id: dockProject._id,
          prj_type: dockProject.project_type, //,
          sub_type: "Execute"
        };
      }
      this.props.newprops.templatePage(bodydata, this.props.newprops.token)

      this.setState({ actions: actions })
    }
    this.forceUpdate();
  };

  onManSubmit = () => {
    let data = this.state.processArray;
    console.clear();
    let rows = this.prepareAPI(data);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    let template = JSON.stringify(newData);
    const dockProject = this.props.newprops.isDock[0];
    const body = {
      project_id: dockProject._id,
      type: "Submit",
      template: template,
      project_type: dockProject.project_type
    };
    let actions = this.state.actions;
    actions["manedit"] = false;

    const bodydata = {
      project_id: dockProject._id,
      prj_type: dockProject.project_type,
      sub_type: "Execute"
    };

    this.props.newprops.editExecute(body, this.props.newprops.token);
    this.props.newprops.templatePage(bodydata, this.props.newprops.token);
    this.props.newprops.templatePage(bodydata, this.props.newprops.token);
    this.props.newprops.templatePage(bodydata, this.props.newprops.token);
    this.setState({ actions: actions });
  };

  onManChange = (event, name, rowid, manid) => {

    let value = event.target.value;
    let attribute = event.target.name;

    this.state.processArray.filter(process => {
      if (name == process.column[2]) {
        let table = process.task_list;
        let newtable = this.onManChangeEach(
          table,
          value,
          rowid,
          manid,
          attribute
        );
        let newlabel = this.setManLabel(table, attribute, this.state.mlabel1);
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });
  };

  onManChangeEach = (table, value, rowid, manid, attribute) => {
    let pre = table.filter(o => o.id == rowid);
    let manobj = pre[0].manpower.filter(o => o.manid == manid)[0];
    manobj[attribute] = value;
    let cost = 0;
    if (attribute == "persons" || attribute == "mandays" || attribute == "type") {
      this.state.designationData.map((designation, index) => {
        if (designation.designation == manobj.type) {
          cost = designation.cost;

          manobj["cost"] = manobj["persons"] * manobj["mandays"] * cost;
        }
      });
    }
    if (attribute == "revised_persons" || attribute == "revised_mandays" || attribute == "revised_type") {

      this.state.designationData.map((designation, index) => {
        if (designation.designation == manobj.revised_type) {
          cost = designation.cost;

          manobj["revised_total_cost"] = manobj["revised_persons"] * manobj["revised_mandays"] * cost;
        }
      });
    }
    if (attribute == "actual_persons" || attribute == "actual_mandays" || attribute == "actual_type") {
      this.state.designationData.map((designation, index) => {
        if (designation.designation == manobj.actual_type) {
          cost = designation.cost;

          manobj["actual_total_cost"] = manobj["actual_persons"] * manobj["actual_mandays"] * cost;
        }
      });
    }
    return table;
  };

  actionbtnall = [
    {
      id: 1,
      name: "Submit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-angle-right",
      onClick: this.getFunctionReference().submit
    },
    {
      id: 2,
      name: "Save",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-save",
      onClick: this.getFunctionReference().save
    },
    {
      id: 3,
      name: "Edit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-pencil",
      onClick: this.getFunctionReference().edit
    }
  ];
  actionbtn = [
    {
      id: 1,
      name: "Submit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-angle-right",
      onClick: this.getFunctionReference().submit
    },

    {
      id: 2,
      name: "Edit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-pencil",
      onClick: this.getFunctionReference().edit
    }
  ];
  show = () => {
    if (this.state.actions.mode == "manpower") {
      return "inherit";
    } else {
      return "inherit";
    }
  };
  hide = () => {
    if (this.state.actions.mode == "manpower") {
      return "none";
    } else {
      return "inherit";
    }
  };

  computeSpaces = table => {
    let temp = [];
    table.map(obj => {
      let len = obj.manpower.length;
      if (len > 1) {
        let toadd = len;
        temp.push(obj);
        for (let i = 0; i < toadd - 1; i++) {
          temp.push({
            id: Math.random() * 100,
            manpower: [],
            precedencevalue: "",
            hierarchy: false
          });
        }
      } else {
        temp.push(obj);
      }
    });
    return temp;
  };
  precedence = event => {
    let value = event.target.value;
    let name = event.target.name;
    let id = event.target.id;
    let table;
    this.state.processArray.filter(process => {
      if (name == process.column[2]) {
        table = process.task_list;
        let newtable = this.onPrecedenceChange(table, id, value);
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });

    // if (name == "Pre-Design") {
    //   table = this.state.predesign;
    //   let newtable = this.onPrecedenceChange(table, id, value);
    //   this.setState({ predesign: newtable });
    // } else if (name == "Plans & Designs") {
    //   table = this.state.plan;
    //   let newtable = this.onPrecedenceChange(table, id, value);
    //   this.setState({ plan: newtable });
    // } else if (name == "Detail Drawings") {
    //   table = this.state.detail;
    //   let newtable = this.onPrecedenceChange(table, id, value);
    //   this.setState({ detail: newtable });
    // }
  };
  onPrecedenceChange = (table, id, value) => {
    let obj = table.filter(o => o.id == id);
    let len = value.length;
    let fchar = value.slice(0, 1);
    let rchar = value.slice(1, len);
    obj[0].precedencevalue = fchar.toUpperCase() + rchar.toLowerCase();

    return table;
  };
  onPrecedenceBlur = event => {
    let table;
    let fchar = event.target.value.slice(0, 1);
    let name = event.target.name;
    let id = event.target.id;

    this.state.processArray.filter(process => {
      if (fchar == process.column[0] && name == process.column[2]) {
        table = process.task_list;
        this.computePrecedence(event, table);
      } else {
        if (
          fchar != "A" ||
          fchar != "B" ||
          fchar != "C" ||
          fchar != "D" ||
          fchar != "E" ||
          fchar != "F" ||
          fchar != "G"
        ) {
          if (fchar.length > 0) {
            alert("Please Enter Correct Table");
          }
        }
        if (name == process.column[2]) {
          this.removePrecedence(process.task_list, id);
        }
      }
    });

    // if (fchar == "A" && name == "Pre-Design") {
    //   table = this.state.predesign;
    //   this.computePrecedence(event, table);
    // } else if (fchar == "B" && name == "Plans & Designs") {
    //   table = this.state.plan;
    //   this.computePrecedence(event, table);
    // } else if (fchar == "C" && name == "Detail Drawings") {
    //   table = this.state.detail;
    //   this.computePrecedence(event, table);
    // } else {
    //   if (fchar != "A" || fchar != "B" || fchar != "C") {
    //     if (fchar.length > 0) {
    //       alert("Please Enter Correct Table");
    //     }
    //   }
    //   if (name == "Pre-Design") {
    //     this.removePrecedence(this.state.predesign, id);
    //   } else if (name == "Plans & Designs") {
    //     this.removePrecedence(this.state.plan, id);
    //   } else if (name == "Detail Drawings") {
    //     this.removePrecedence(this.state.detail, id);
    //   }
    // }
  };
  removePrecedence = (table, id) => {
    let obj = table.filter(o => o.id == id)[0];
    obj.min = 1;
    obj.precedencevalue = "";
    this.setState({ [table]: table });
  };
  computePrecedence = (event, table) => {
    let value = event.target.value;
    let vallen = value.length;
    let id = event.target.id;
    let rchar = value.slice(1, vallen);
    let rcharlen = rchar.length;
    if (isFinite(rchar) == true) {
      let num = parseInt(rchar);
      let counter = 0;
      let obj = [];
      let hobj = [];
      table.forEach(o => {
        if (o.hierarchy == false) {
          counter += 1;
          hobj.push(o);
        }
        if (o.id == id) {
          obj.push(o, counter);
          return;
        }
      });

      if (num < obj[1] && obj[0].hierarchy == false) {
        let temp = hobj[num - 1];
        if (temp.min != "" && temp.start != "" && temp.end != "") {
          let start = parseInt(temp.start);
          let end = parseInt(temp.end);
          let max = Math.max(start, end);
          obj[0].min = max + 1;
          obj[0].start = end + 1;
          this.setState({ [table]: table });
        } else {
          alert("Please Complete the Upper Inputs");
          this.removePrecedence(table, id);
          return;
        }
      } else {
        alert("Wrong Precedence");
        this.removePrecedence(table, id);
        return;
      }
    } else if (isFinite(rchar) == false && rcharlen == 1) {
      let obj = [];
      table.forEach((o, i) => {
        if (o.id == id) {
          obj.push(o, i + 1);
          return;
        }
      });

      if (obj[0].hierarchy == true) {
        let hobj = [];
        for (let i = obj[1] - 1; i > 0; i--) {
          if (table[i - 1].hierarchy == false) {
            hobj.push(table[i - 1], i);
            break;
          }
        }
        let diff = obj[1] - hobj[1];
        let alpha = rchar.charCodeAt(0) - 96;
        if (alpha < 1 || alpha > 26) {
          alert("Wrong Precedence");
          this.removePrecedence(table, id);
          return;
        } else {
          if (alpha < diff && alpha != diff) {
            let temp = table[hobj[1] + alpha - 1];
            if (temp.min != "" && temp.start != "" && temp.end != "") {
              let start = parseInt(temp.start);
              let end = parseInt(temp.end);
              let max = Math.max(start, end);
              obj[0].min = max + 1;
              obj[0].start = end + 1;
              this.setState({ [table]: table });
            } else {
              alert("Please Complete Upper Inputs");
              this.removePrecedence(table, id);
              return;
            }
          } else {
            alert("Wrong Precedence");
            this.removePrecedence(table, id);
            return;
          }
        }
      } else {
        alert("Wrong Precedence");
        this.removePrecedence(table, id);
        return;
      }
    } else {
      alert("Wrong Precedence");
      this.removePrecedence(table, id);
      return;
    }
  };

  onInputBlur = (event, name) => {
    let id = event.target.id;
    let obj = [];
    // if (name == "Pre-Design") {
    //   let table = this.state.predesign;
    //   table.forEach((o, i) => {
    //     if (o.id == id) {
    //       obj.push(o, i);
    //     }
    //   });
    //   table[obj[1] + 1].min = parseInt(obj[0].end) + 1;
    //   table[obj[1] + 1].start = parseInt(obj[0].end) + 1;
    //   this.setState({ predesign: table });
    // }
  };

  sortEnd = table => {
    let newtable = [];
    table.map((o, i) => { });
  };

  // Completed Correctly

  createTask = (task, id, hie) => {
    let newData = {
      tedit: false,
      id: id,
      alpha: task.column_data[0],
      alpha2: task.column_data[1],
      task: task.column_data[2],
      days: task.column_data[3],
      start: task.column_data[4],
      end: task.column_data[5],
      rstart: task.column_data[6],
      rend: task.column_data[7],
      astart: task.column_data[8],
      aend: task.column_data[9],
      completion: task.column_data[10],
      comment: task.column_data[11],
      priority: task.display_priority,
      selected: false,
      precedencevalue: "",
      hierarchy: hie,
      slabel: "",
      min: 1,
      manpower: ([] = task.manpower.map(man => {
        id++;
        return {
          manedit: false,
          manid: "100" + id,
          type: man.Type_name,
          persons: man.Persons,
          mandays: man.Mandays,
          cost: man.Total_cost,
          actual_mandays: man.actual_mandays,
          actual_name: man.actual_name,
          actual_persons: man.actual_persons,
          actual_total_cost: man.actual_total_cost,
          actual_type: man.actual_type,
          revised_mandays: man.revised_mandays,
          revised_name: man.revised_name,
          revised_persons: man.revised_persons,
          revised_total_cost: man.revised_total_cost,
          revised_type: man.revised_type,
          update_comment: man.update_comment,
          seleted: false,
          mlabel: ""
        };
      }))
    };
    return newData;
  };

  prepareState = rows => {
    console.log(rows)
    var id = 0;
    var singleProcessTasks = [];
    var processData = [];
    let processDetails = [];
    rows.map(process => {
      var singleProcess = [];
      process.tasks.map(task => {
        id++;
        console.log(task)
        let subtask = task.column_data[12];
        if (subtask) {
          singleProcess.push(this.createTask(task, id, false));
          subtask.sub_tasks.map(sub_task => {
            id++;
            singleProcess.push(this.createTask(sub_task, id, true));
          });
        } else {
          singleProcess.push(this.createTask(task, id, false));
        }
        singleProcessTasks.push(singleProcess);
        for (var i = 0; i < singleProcessTasks.length; i++) {
          processData = {
            p_id: i,
            task_list: singleProcess,
            column: process.column_data,
            priority: process.display_priority,
            ["check"]: false,
            ["edit" + process.column_data[0]]: false
          };
        }
      });
      processDetails.push(processData);
    });
    return processDetails;
  };

  componentWillMount() {
    console.log("qwertyu")
    console.log("mounted")
    this.props.newprops.fetchUserDesignationList({}, this.props.token);
    const dockProject = this.props.newprops.isDock[0]
    /* const bodydata = {
      project_id: dockProject._id,
      prj_type: dockProject.project_type,
      sub_type: "Execute"
    };
    this.props.newprops.templatePage(bodydata, this.props.newprops.token) */
    console.log(this.props.newprops)
    let rows = this.props.newprops.data.Rows;

    console.log(rows)
    if (rows) {
      let data = this.prepareState(rows);
      this.setState({
        processArray: data
      });
    }
  }
  componentDidMount = () => {
    let progressBars = document.querySelectorAll(".progress");
    for (let i = 0; i < progressBars.length; i++) {
      progressBars[i].style.marginLeft = "20px";
    }

    console.log("mounted")
    const dockProject = this.props.newprops.isDock[0]
    /* const bodydata = {
      project_id: dockProject._id,
      prj_type: dockProject.project_type,
      sub_type: "Execute"
    };
    this.props.newprops.templatePage(bodydata, this.props.newprops.token) */
  }
  computeDesingBarWidth = styles => {
    let mode = this.state.actions.mode;
    let actions = this.state.actions;
    if (mode == "schedule") {
      if (actions.edit == true) {
        return "100%";
      } else {
        return "100%";
      }
    } else if ("manpower") {
      if (actions.manedit == true) {
        if (actions.showall == true) {
          return "100%";
        } else if (actions.showall == false) {
          return "100%";
        } else return "100%";
      } else {
        if (actions.showall == true) {
          return "100%";
        } else {
          return "100%";
        }
      }
    }
  };
  getBorderWidth = () => {
    let mode = this.state.actions.mode;
    if (mode == "schedule") {
      return "1470px";
    } else if (mode == "manpower") {
      return "1651px";
    }
  };
  refreshSucess = () => {
    this.props.newprops.hideStatus();
    this.setState({ Loading: true })
    setTimeout(this.reload, 400)
  }
  reload = () => {
    this.setState({ Loading: false })
    window.location.reload()
  }
  showAll = () => {
    this.setState(
      Object.assign(this.state.actions, {
        showall: !this.state.actions.showall
      })
    );
  };
  resetFlag = () => {
    this.setState({
      flags: false,
      Errormsg: ""
    })
  }
  componentWillReceiveProps(props) {
    if (props.newprops.payloadFetchData != null) {
      console.log("KKKK", props.newprops.payloadFetchData);
      this.setState({ designationData: props.newprops.payloadFetchData });
    }
  }

  render() {
    var { styles, mode } = this.props.newprops;

    let edit = this.state.actions.edit;
    let manedit = this.state.actions.manedit;
    let showall = this.state.actions.showall;
    let data = this.props.newprops.data;
    console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    console.log(data);
    return (
      <React.Fragment>
        {
          this.state.Loading ?
            <Backdrop>
              <Spinner />
            </Backdrop> : null
        }
        {
          this.state.flags == true ?
            <Backdrop>
              <ServerStatus
                modalHeader={this.state.Errormsg}
                modalCase={"202"}
                click={this.resetFlag}
              ></ServerStatus>
            </Backdrop> : null
        }
        {this.props.newprops.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}
        {
          this.props.newprops.server_status == 200 ?
            <Backdrop>
              <ServerStatus
                modalHeader={"Success"}
                modalCase={"200"}
                click={this.refreshSucess}
              ></ServerStatus>
            </Backdrop>
            :
            null
        }
        <section
          className={this.state.actions.mode == "schedule" ? "schedule-execute-responsive" : "man-execute-responsive"}
          style={{
            width: this.props.newprops.isProjectSidebar && this.state.actions.mode == "schedule" ? "96%" : this.state.actions.mode == "schedule" ? this.computeDesingBarWidth(styles) :
              this.state.actions.mode == "manpower" && showall ? "200%" : "125%",
            //width: "100%",
            fontSize: "14px"
          }}
        >
          <div
            style={{
              backgroundColor: "#987c46",
              width: this.computeDesingBarWidth(styles),
              height: "50px",
              position: "relative",
              width: this.state.actions.mode == "schedule" || showall ? "100%" : "87.25%"
            }}
          >
            <div style={{ float: "left" }}>
              <label
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "30px",
                  color: "white"
                }}
              >
                Design
              </label>
            </div>
            {this.state.actions.mode == "schedule" && this.state.actions.edit && this.actionbtnall.map(b => (
              <FormActionBtns actionbtn={b} key={b.id} />
            ))}
            {this.state.actions.mode == "manpower" && this.state.actions.manedit && this.actionbtnall.map(b => (
              <FormActionBtns actionbtn={b} key={b.id} />
            ))}
            {(!this.state.actions.manedit && !this.state.actions.edit) && this.actionbtn.map(b => (
              <FormActionBtns actionbtn={b} key={b.id} />
            ))}
          </div>
          <div style={{ width: "100%" }}>
            <div
              className={"srhead" + (this.state.actions.mode == "manpower" && !showall ? " man-srhead-responsive" : "")}
              style={{
                width: this.state.actions.edit == false && showall ? "4.4%" : this.state.actions.edit == false ? "6.4%" : "6.4%",

              }}
            >
              <div
                className="sr"
                style={{
                  width: "49%"
                }}
              >
                <label className="title-label">
                  {data != null && data.columns != null ? data.columns[0] : ""}
                </label>
              </div>
              <div
                className="pr"
                style={{
                  width: this.state.actions.edit == false ? "50%" : "50%"
                }}
              >
                <label className="title-label">
                  {data != null && data.columns != null ? data.columns[1] : ""}
                </label>
              </div>
            </div>
            <div className="task" style={{
              width: this.state.actions.mode == "schedule" && this.state.actions.edit ? "23.5%" : //gaurav"26%" :
                this.state.actions.edit ? "26%" : this.state.actions.mode == "manpower" ? "10.8%" : "26%"
            }}>
              <label className="title-label">Process / Task</label>
            </div>
            <div
              className="pr"
              style={{
                width: "40px"
              }}
            ></div>

            <Schedule columns={data != null && data.columns != null ? data.columns : ""}
              showall={showall ? this.show() : this.hide()} width={mode == "schedule" ? "7%" : "5%"} />
            <Schedule2
              label1="Plan Date"

              showall={showall ? this.show() : this.hide()}
              columns={data != null && data.columns != null ? data.columns : ""}
              headdiv={this.headdiv}
              mode={mode}
              width={mode == "schedule" ? "15.25%" : mode == "manpower" && showall ? "8%" : "8%"}//gaurav"13.25%" : "7%"}
            />
            <Schedule2
              label1="Revised Date"

              showall={showall ? this.show() : this.hide()}
              columns={data != null && data.columns != null ? data.columns : ""}
              headdiv={this.headdiv}
              mode={mode}
              width={mode == "schedule" ? "15.25%" : mode == "manpower" && showall ? "8%" : "8%"}//gaurav"13.25%" : "7%"}
            />
            <Schedule2
              label1="Actual Date"

              showall={showall ? this.show() : this.hide()}
              columns={data != null && data.columns != null ? data.columns : ""}

              headdiv={this.headdiv}
              mode={mode}
              width={mode == "schedule" ? "15.25%" : mode == "manpower" && showall ? "8%" : "8%"}//gaurav"13.25%" : "7%"}
            />



            <div
              className="head headdiv"
              style={{
                display: showall ? this.show() : this.hide(),
                width: (mode == "schedule" ? "7%" : "5%")
              }}
            >
              <div className="sm margin">
                <label className="title-label">Completion</label>
              </div>
              <div className="sm">
                <label className="title-label">%</label>
              </div>
            </div>

            <Comment

              width={mode == "schedule" && this.state.actions.edit ? "8.6%" : mode == "schedule" ? "7.7%" : mode == "manpower" && showall ? "4.5%" : "7.5%"}//gaurav"9.75%" : "5%"}
              display={showall ? this.show() : this.hide()}
            />


            {mode == "manpower" && (
              <React.Fragment>
                <div
                  className="head headdiv"
                  style={{
                    //display: this.props.showall,
                    width: "40px",
                    borderLeft: "1px solid white",
                    borderRight: "1px  solid white"
                  }}
                >
                  <div className="sm margin">
                    <label className="title-label">
                      {mode == "manpower" && (
                        <div
                          className="manpowerbar"
                          style={{ left: showall ? "1355px" : "312px" }}
                        >
                          <span
                            onClick={this.showAll}
                            style={{
                              fontSize: "18px",
                              marginTop: "0px",
                              color: "white"
                            }}
                            class="fa fa-align-left"
                          />
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="sm">
                    <label className="title-label">{" "}</label>
                  </div>
                </div>
                <Manpower2
                  width={showall ? "12.5%" : "20%"}
                  label1="Plan"
                  columns={
                    data != null && data.manpower_columns != null
                      ? data.manpower_columns
                      : ""
                  } />
                <Manpower2 label1="Revised"
                  width={showall ? "12.5%" : "20%"}
                  columns={
                    data != null && data.manpower_columns != null
                      ? data.manpower_columns
                      : ""
                  } />
                <Manpower2 label1="Actual"
                  width={showall ? "12.5%" : "20%"}
                  columns={
                    data != null && data.manpower_columns != null
                      ? data.manpower_columns
                      : ""
                  } />
                <Comment width={mode == "manpower" && !showall ? "7.5%" : mode == "manpower" && showall ? "4.9%" : "5%"} display="inherit" />

              </React.Fragment>
            )}
          </div>

          {this.state.processArray && this.state.processArray.map(process => {
            return (
              <div
                style={{ clear: "both", position: "relative" }}
                className={process.column[0] + "class"}
              >
                {/* mode == "manpower" && (
                  <div
                    className="manpowerbar"
                    style={{ left: showall ? "1355px" : "275px" }}
                  >
                    <span
                      onClick={this.showAll}
                      style={{
                        fontSize: "18px",
                        marginTop: "12px",
                        color: "white"
                      }}
                      class="fa fa-align-left"
                    />
                  </div>
                ) */}
                <TableExecution
                  process={process}
                  actions={this.state.actions}
                  getStyles={this.getStyles}
                  newstyles={styles}
                  display={showall ? this.show() : this.hide()}
                  onChange={{
                    onChange1: this.onChange,
                    precedence: this.precedence,
                    blur: this.onPrecedenceBlur,
                    inputblur: this.onInputBlur
                  }}
                  manhandlers={{
                    onChange: this.onManChange
                  }}
                  isProjectSidebar={this.props.newprops.isProjectSidebar}
                />
              </div>
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.utilityLayout.isLoading,
  isServerError: state.utilityLayout.isServerError,
  isServerStatus: state.serverStatus.projectDetailStatus,
  isServerMessage: state.serverStatus.projectDetailMessage,
  projectData: state.projectData.project,
  templateTable: state.projectData.templatePage,
  isDock: state.projectData.dockProject,
  auth: state.auth,
  newProject: state.projectData.newProject,
  token: state.auth.token,
  server_status: state.projectData.server_status,
  payloadFetchData: state.serverData.fetchDesignationList
});

export default connect(
  mapStateToProps,
  actions
)(hoc(ProjectPlanExecution));
