import React, { Component } from "react";
import FormActionBtns from "../formactionbtns";
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";
import { Redirect, Link } from "react-router-dom"
import hoc from "../HOC/hoc";
import Table from "./table";
import Schedule from "../schedule";
import Schedule2 from "../schedule2";
import ScheduleBox from "../schedulebox";
import ManPowerBox from "../manpowerbox";
import Manpower2 from "../manpower2";
import { parse } from "path";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";
import ServerStatus from "Layout/ServerSucess/ServerStatus";

import "./estimation.css"

class ProjectPlanEstimation extends Component {
  state = {
    id: 1000,
    actions: {
      manedit: false,
      edit: false,
      s2edit: false,
      mode: this.props.newprops.mode,
      whomtoscan: [],
      schedulechecks: []
    },
    processArray: "",
    rows: [],
    status: this.props.newprops.estmt_status,
    label1: {
      days: 3,
      start: 1,
      end: 3
    },
    flags: false,
    mlabel1: {
      persons: 0,
      mandays: 0,
      cost: 0
    },
    buffer: [],
    designationData: null
  };

  getFunctionReference = () => {
    if (this.state.actions.mode == "schedule") {
      let obj = {
        edit: this.onEdit,
        add: this.onAdd,
        sort: this.onSortEnd,
        delete: this.onDelete,
        save: this.onSave,
        submit: this.onSubmit
      };
      return obj;
    } else if (this.state.actions.mode == "manpower") {
      return {
        edit: this.onManEdit,
        add: this.onManAdd,
        delete: this.onManDelete,
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
      console.clear();
      arraytable.map(table => {
        let x = this.removeEdits(table);
        this.state.processArray.filter(process =>
          this.setState({
            processArray: [...this.state.processArray]
          })
        );
      });
      this.removeBg();
    }
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

  skeleton = (source, res) => {
    var o = Array.isArray(source) ? [] : {};
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        var t = typeof source[key];
        o[key] =
          t == "object"
            ? this.skeleton(source[key])
            : { string: "", number: 0, boolean: false }[t];
        o["column"] = [res, "", res, "", "", ""];
        //o["selected"] = true
      }
    }
    return o;
  };

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  addProcess = p => {
    var res;
    this.state.processArray.map(process => (res = process.column[0]));
    var alpha = res.charCodeAt(0) + 1;
    let task_table = p.task_list;
    let newtask = this.skeleton(task_table[0]);
    let newprocess = this.skeleton(p, String.fromCharCode(alpha));
    newprocess.p_id = this.state.processArray.length + 1;
    newprocess.task_list = [newtask];
    this.setState({
      processArray: [...this.state.processArray, newprocess]
    });
  };

  onAdd = () => {
    let table, newtable, id;
    this.state.processArray.filter(process => {
      if (process.check == true) {
        this.addProcess(process);
      } else {
        table = process.task_list;
        for (var j = 0; j < table.length; j++) {
          if (table[j].selected == true) {
            id = j + 1;
            let newdata = this.skeleton(table[j]);
            newdata.id = table.length + 1;
            j = j + 1
            newdata.selected = true

            newtable = table.splice(id, 0, newdata);

            this.setState(
              {
                processArray: [...this.state.processArray]
              },
              () => {
                let className =
                  newdata.id +
                  process.column[2] +
                  (this.state.actions.mode == "schedule" ? "schedule" : "");
                this.state.buffer.push(className);
                for (let k = 0; k < this.state.buffer.length; k++) {
                  let element = document.getElementsByClassName(this.state.buffer[k]);
                  for (let i = 0; i < element.length; i++) {
                    element[i].style.backgroundColor = "#5fcc6a";
                    element[i].style.color = "white";
                  }
                }
              }
            );
            break;
          }
        }
        /* let data = table.map((o, index) => {
          if (o.selected == true) {
            id = index + 1;
            let newdata = this.skeleton(o);
            newdata.id = table.length + 1;

            newtable = table.splice(id, 0, newdata);

            this.setState(
              {
                processArray: [...this.state.processArray]
              },
              () => {
                let className =
                  newdata.id +
                  process.column[2] +
                  (this.state.actions.mode == "schedule" ? "schedule" : "");
                this.state.buffer.push(className);
                for(let k = 0; k<this.state.buffer.length;k++) {
                let element = document.getElementsByClassName(this.state.buffer[k]);
                for (let i = 0; i < element.length; i++) {
                  element[i].style.backgroundColor = "#5fcc6a";
                  element[i].style.color = "white";
                }
              }}
            );
          }
        }); */
      }
    });
  };

  addEach(table, id) {
    let len = table.length;
    let newtable = [];
    let flag = false;
    let newrow;
    let selectcount = 0;
    let mode = this.state.actions.mode;
    if (this.state.actions.mode == "schedule") {
      newrow = {
        task: "",
        days: "",
        start: "",
        end: "",
        selected: false,
        min: 1,
        precedencevalue: "",
        hierarchy: false
      };
    } else if (this.state.actions.mode == "manpower") {
      newrow = {
        type: "",
        persons: "",
        mandays: "",
        cost: "",
        selected: false
      };
    }

    table.map((obj, i) => {
      if (obj.selected == true) {
        flag = true;
        selectcount += 1;
        newtable.push(obj);
        if (mode == "schedule") {
          newtable.push({ ...newrow, id: Math.random() + id });
        } else {
          newtable.push({ ...newrow, manid: Math.random() + id });
        }
      } else {
        newtable.push(obj);
      }
    });
    if (flag == false) {
      if (this.state.actions.mode == "schedule") {
        newtable.push({ ...newrow, id: Math.random() + id });
      }
    }
    return { newtable: newtable, selectcount: selectcount };
  }

  getCount = (si, table) => {
    let count = 0;
    for (let z = si; z < table.length; z++) {
      let obj = table[z];
      if (obj.hierarchy == true) {
        count = count + 1;
      } else {
        break;
      }
    }
    return count;
  };

  onDelete = () => {
    let table;
    let newtable = this.state.processArray;
    this.state.processArray.map((process, index) => {
      //let indexes = [];
      if (process.check == false) {
        table = process.task_list;
        if (table.length == 1 && table[0].selected == true) {
          newtable.splice(index, 1)
          this.setState({
            processArray: [...newtable]
          })
        }
        else {
          for (var i = 0; i < table.length; i++) {
            if (table[i].selected == true) {
              console.log("AA")
              table.splice(i, 1)
              i--;
            }
          }
          console.log(table)
          /* for(let i=0;i<indexes.length;i++) {
            table.splice(indexes[i]-i,1);
          } */
          this.setState({
            processArray: [...this.state.processArray]
          });
        }
      } else {
        newtable.splice(index, 1);
        this.setState({
          processArray: [...newtable]
        });
      }
    });
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
            Total_cost: m.cost
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
              task.end
            ],
            manpower: manp
          };
        } else {
          //console.log("!!!",task.priority);
          sub_t = {
            type: task.hierarchy ? "sub_task" : "task",
            display_priority: task.priority,
            column_data: [
              task.alpha,
              task.alpha2,
              task.task,
              task.days,
              task.start,
              task.end
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
    let data = this.state.processArray;
    data.map(process => {
      this.removeEdits(process.task_list);
    })
    console.log(data);
    let rows = this.prepareAPI(data);
    console.log(rows);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    console.log("OOOOOOO")
    console.log(newData)
    newData.Rows.map(o => {
      o.tasks.map(task => {
        if (task.column_data[2] == "") {
          flags = true
          msg = "PLease Enter valid task name"
        }
        if (task.column_data[3] == 0 || task.column_data[3] == 0 || task.column_data[3] == 0) {
          flags = true
          msg = "Days cannot be zero"
        }
        /* (task.manpower.map(man => {
          if (man.Type_name == "" || man.Mandays == 0 || man.Persons == 0 || man.Total_cost == 0) {
            flags = true
            msg = "Please Enter valid manpower"
          }
        })) */
        if (task.column_data[6]) {
          task.column_data[6].sub_tasks.map(sub => {
            if (sub.column_data[2] == "") {
              flags = true
              msg = "PLease Enter valid task name"
            }
          })
        }
      })
    })
    if (flags == true) {
      this.setState({ flags: true, Errormsg: msg })
    }
    else {
      let template = JSON.stringify(newData);
      console.log("In onSave() =>", newData);
      const dockProject = this.props.newprops.isDock[0];
      console.log(dockProject)
      var body;
      if (dockProject.project_type == "Design and Build") {
        body = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: "Design"
        };
      }
      else {
        body = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: dockProject.project_type
        };
      }
      let actions = this.state.actions;
      actions["edit"] = !actions.edit;
      var bodydata
      if (dockProject.project_type == "Design and Build") {
        bodydata = {
          project_id: dockProject._id,
          prj_type: "Design",
          sub_type: "Estimate"
        };
      }
      else {
        bodydata = {
          project_id: dockProject._id,
          prj_type: dockProject.project_type,
          sub_type: "Estimate"
        };
      }

      this.removeBg();
      console.log(bodydata)
      this.props.newprops.editTemplate(body, this.props.newprops.token);

      this.props.newprops.templatePage(bodydata, this.props.newprops.token);

      this.setState({ actions: actions, status: this.props.newprops.estmt_status });
      this.props.newprops.updateProps()
    }

    //this.forceUpdate()
  };

  removeBg() {
    let table;
    this.state.processArray.map(process => {
      table = process.task_list;
      let data = table.map((o, index) => {

        let id = index - 1;
        let name = process.column[2];
        let mode = this.state.actions.mode == "schedule" ? "schedule" : "";
        let element = document.getElementsByClassName(id + name + mode);
        let element1 = document.getElementsByClassName("uncheck")
        for (let i = 0; i < element.length; i++) {
          element[i].style.backgroundColor = "white";
          element[i].style.color = "#78849e";
        }
        console.log("qqqq")
        console.log(element1)
        for (let i = 0; i < element1.length; i++) {
          element1[i].style.backgroundColor = "white";
          element1[i].style.color = "#78849e";
        }
      });
    });
  }

  /*  onSubmit = () => {
     let data = this.state.processArray;
     console.log(data);
     let rows = this.prepareAPI(data);
     console.log(rows);
     let newData = this.props.newprops.data;
     newData.Rows = rows;
     let template = JSON.stringify(newData);
     const dockProject = this.props.newprops.isDock[0];
     console.log(dockProject)
     const body = {
       project_id: dockProject._id,
       type: "Submit",
       template: template,
       project_type: dockProject.project_type
     };
     this.props.newprops.editTemplate(body, this.props.newprops.token)
     const bodydata1 = {
       project_id: dockProject._id,
       prj_type: dockProject.project_type,
       sub_type: "Execute"
     };
     this.props.newprops.templatePage(bodydata1, this.props.newprops.token)
     let actions = this.state.actions;
     actions["edit"] = false;
     this.setState({ actions: actions });
   }; */
  onSubmit = () => {
    var flags = false
    var msg
    let data = this.state.processArray;
    console.log(data);
    let rows = this.prepareAPI(data);
    console.log(rows);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    console.log("OOOOOOO")
    console.log(newData)
    newData.Rows.map(o => {
      o.tasks.map(task => {
        if (task.column_data[2] == "") {
          flags = true
          msg = "PLease Enter valid task name"
        }
        if (task.column_data[3] == 0 || task.column_data[3] == 0 || task.column_data[3] == 0) {
          flags = true
          msg = "Days cannot be zero"
        }
        (task.manpower.map(man => {
          if (man.Type_name == "" || man.Mandays == 0 || man.Persons == 0 || man.Total_cost == 0) {
            flags = true
            msg = "Please Enter valid manpower"
          }
        }))
        if (task.column_data[6]) {
          task.column_data[6].sub_tasks.map(sub => {
            if (sub.column_data[2] == "") {
              flags = true
              msg = "PLease Enter valid task name"
            }
          })
        }
      })
    })
    if (flags == true) {
      this.setState({ flags: true, Errormsg: msg })
    }
    else {
      let template = JSON.stringify(newData);
      console.log("In onSave() =>", newData);
      const dockProject = this.props.newprops.isDock[0];
      console.log(dockProject)
      var body
      if (dockProject.project_type == "Design and Build") {
        body = {
          project_id: dockProject._id,
          type: "Submit",
          template: template,
          project_type: "Design"
        };
      }
      else {
        body = {
          project_id: dockProject._id,
          type: "Submit",
          template: template,
          project_type: dockProject.project_type
        };
      }
      let actions = this.state.actions;
      actions["edit"] = false;
      var bodydata
      if (dockProject.project_type == "Design and Build") {
        bodydata = {
          project_id: dockProject._id,
          prj_type: "Design",
          sub_type: "Estimate"
        };
      }
      else {
        bodydata = {
          project_id: dockProject._id,
          prj_type: dockProject.project_type,
          sub_type: "Estimate"
        };
      }

      this.removeBg();
      console.log(bodydata)
      this.props.newprops.editTemplate(body, this.props.newprops.token);

      this.props.newprops.templatePage(bodydata, this.props.newprops.token);

      this.setState({ actions: actions, status: this.props.newprops.estmt_status });
      this.props.newprops.updateProps()
    }
  }
  getStyles = id => {
    let value;
    let edit = this.state.actions.edit;
    let manedit = this.state.actions.manedit;
    if (id == 1) {
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

  unCheckAll(name, table, id) {
    let select;
    let mode = this.state.actions.mode;
    let x = this.state.actions.schedulechecks;
    //Here mode=="schedule conditions"
    table.map(o => {
      if (o.id == id) {
        let checked = o["selected"];
        if (checked == false) {
          x.pull(name);
        } else {
          for (var i = x.length - 1; i >= 0; i--) {
            if (x[i] === name) {
              x.splice(i, 1);
              break; //<-- Uncomment  if only the first term has to be removed
            }
          }
        }
        o["selected"] = !o["selected"];
        select = o["selected"];
      }
    });

    let bg = select == true ? "#f69999" : "white";
    let color = select == true ? "white" : "#78849e";
    let element = document.getElementsByClassName(id);
    for (let i = 0; i < element.length; i++) {
      element[i].style.backgroundColor = bg;
      element[i].style.color = color;
    }
    this.state.processArray.filter(process => {
      if (id == process.column[0].toLowerCase) {
        this.setState({
          processArray: [...this.state.processArray],
          [this.state.actions.schedulechecks]: x
        });
      }
    });
  }

  onCheck = (id, name) => {
    let table;
    this.state.processArray.filter(process => {
      if (id == process.column[0].toLowerCase()) {
        process.check = !process.check;
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
      if (name == process.column[2]) {
        table = process.task_list;
        this.processCheck(name, table, id);
      }
    });
    this.setState({ buffer: [] })
    console.log(this.state.processArray)
  };
  processCheck(name, table, id) {
    let select;
    let mode = this.state.actions.mode;
    let x = this.state.actions.schedulechecks;
    //Here mode=="schedule conditions"
    table.map(o => {
      if (o.id == id) {
        let checked = o["selected"];
        if (checked == false) {
          x.push(name);
        } else {
          for (var i = x.length - 1; i >= 0; i--) {
            if (x[i] === name) {
              x.splice(i, 1);
              break; //<-- Uncomment  if only the first term has to be removed
            }
          }
        }
        o["selected"] = !o["selected"];
        select = o["selected"];
      }
    });

    let bg = select == true ? "#f69999" : "white";
    let color = select == true ? "white" : "#78849e";
    let element = document.getElementsByClassName(id + name + "schedule");
    for (let i = 0; i < element.length; i++) {

      element[i].style.backgroundColor = bg;
      element[i].style.color = color;

    }
    this.state.processArray.filter(process => {
      if (id == process.column[0].toLowerCase) {
        this.setState({
          processArray: [...this.state.processArray],
          [this.state.actions.schedulechecks]: x
        });
      }
    });
  }

  onChange = (event, name) => {
    console.log(event.target.id)
    let variable = event.target.name; //Will get variable to be changed
    let id = event.target.id; //Will get object to be changed
    let value = event.target.value; //Will get input value
    let table, newtable;
    this.state.processArray.filter(process => {
      if (name == process.column[2]) {
        table = process.task_list;
        newtable = this.onChangeEach(table, variable, value, id);
        let label = this.setLabel(newtable);
        var ctask = newtable.find(item => item.id == id.charAt(id.length - 1));
        console.log("CCCCC")
        console.log(ctask)
        if (variable == "start" || variable == "days") {
          var ctask_start = ctask.start;
          var ctask_days = ctask.days;
          var ctask_end =
            ctask_days && ctask_start
              ? parseInt(ctask_start) + parseInt(ctask_days) - 1
              : 0;
          ctask.end = ctask_end;
        } else if (variable == "task") {
          document.getElementById(id).value = event.target.value;
          ctask.task = event.target.value;
          console.log(this.state.processArray);
        }
        this.setState({
          processArray: [...this.state.processArray]
        });
        console.log(this.state.processArray);
      }
    });
  };

  onChange2 = (event, pid) => {
    console.log("$$$$$$$$$$$");
    let variable = event.target.name; //Will get variable to be changed
    console.log("variable " + variable);
    let id = event.target.id; //Will get object to be changed
    console.log("id " + id);
    let value = event.target.value; //Will get input value
    console.log("value " + value);
    console.log(document.getElementById(id).value);
    document.getElementById(id).value = event.target.value;

    let processes = this.state.processArray;
    let p = processes.find(process => process.p_id == pid);
    p.column[2] = event.target.value;
    this.setState({
      processArray: [...this.state.processArray]
    });
    console.log("$$$$$$$$$$$");
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
  onManAdd = () => {
    let scan = this.state.actions.whomtoscan;
    this.state.processArray.filter(process => {
      if (scan.indexOf(process.column[2]) != -1) {
        let count = this.getOccurences(scan, process.column[2]);
        if (count > 1) {
          return;
        }
        let id = this.randomIntFromInterval(101, 999);
        let newtable = this.onManAddEach(process.task_list, id);
        let space = this.computeSpaces(this.deleteSpaces(newtable));
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });
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
    return newtable;
  };
  onManAddEach = (table, id) => {
    let man1 = [];
    table.map((pre, i) => {
      let newtable = this.addEach(pre.manpower, id + i);
      let newmanobj = newtable.newtable;
      let selectcount = newtable.selectcount;
      pre.manpower = newmanobj;
      man1.push(pre);
    });
    return man1;
  };
  onManDelete = () => {
    let scan = this.state.actions.whomtoscan;
    let actions = this.state.actions;
    this.state.processArray.filter(process => {
      if (scan.indexOf(process.column[2]) != -1) {
        let editedtable = this.onManDeleteEach(process.task_list);
        let newtable = this.computeSpaces(this.deleteSpaces(editedtable));
        let obj = scan.filter(o => o != process.column[2]);
        actions["whomtoscan"] = obj;
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });
  };
  onManDeleteEach = table => {
    let editedtable = [];
    let filtertable = table.filter(o => o.manpower.length > 0);
    filtertable.map(pre => {
      let newman = pre.manpower.filter(o => o.selected == false);
      pre.manpower = newman;
      editedtable.push(pre);
    });

    return editedtable;
  };
  onManSave = () => {
    var flags = false
    var msg
    let data = this.state.processArray;
    console.log(data);
    let rows = this.prepareAPI(data);
    console.log(rows);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    console.log("OOOOOOO")
    console.log(newData)
    newData.Rows.map(o => {
      o.tasks.map(task => {
        if (task.column_data[2] == "") {
          flags = true
          msg = "Please Enter valid task name"
        }
        if (task.column_data[3] == 0 || task.column_data[3] == 0 || task.column_data[3] == 0) {
          flags = true
          msg = "Days cannot be zero"
        }
        (task.manpower.map(man => {
          if (man.Type_name == "" || man.Mandays == 0 || man.Persons == 0 || man.Total_cost == 0) {
            flags = true
            msg = "Please Enter valid manpower"
          }
        }))
        if (task.column_data[6]) {
          task.column_data[6].sub_tasks.map(sub => {
            if (sub.column_data[2] == "") {
              flags = true
              msg = "PLease Enter valid task name"
            }
          })
        }
      })
    })
    if (flags == true) {
      this.setState({ flags: true, Errormsg: msg })
    }
    else {
      let template = JSON.stringify(newData);
      console.log("In onSave() =>", newData);
      const dockProject = this.props.newprops.isDock[0];
      console.log(dockProject)
      var body;
      if (dockProject.project_type == "Design and Build") {
        body = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: "Design"
        };
      }
      else {
        body = {
          project_id: dockProject._id,
          type: "Save",
          template: template,
          project_type: dockProject.project_type
        };
      }
      let actions = this.state.actions;
      actions["edit"] = false;

      var bodydata
      if (dockProject.project_type == "Design and Build") {
        bodydata = {
          project_id: dockProject._id,
          prj_type: "Design",
          sub_type: "Estimate"
        };
      }
      else {
        bodydata = {
          project_id: dockProject._id,
          prj_type: dockProject.project_type,
          sub_type: "Estimate"
        };
      }

      this.removeBg();
      console.log(bodydata)
      this.props.newprops.editTemplate(body, this.props.newprops.token);

      this.props.newprops.templatePage(bodydata, this.props.newprops.token);

      this.setState({ actions: actions, status: this.props.newprops.estmt_status });
      this.props.newprops.updateProps()
    }
    //this.forceUpdate();
  };

  onManSubmit = () => {
    var flags = false
    var msg
    let data = this.state.processArray;
    console.log(data);
    let rows = this.prepareAPI(data);
    console.log(rows);
    let newData = this.props.newprops.data;
    newData.Rows = rows;
    console.log("OOOOOOO")
    console.log(newData)
    newData.Rows.map(o => {
      o.tasks.map(task => {
        if (task.column_data[2] == "") {
          flags = true
          msg = "PLease Enter valid task name"
        }
        if (task.column_data[3] == 0 || task.column_data[3] == 0 || task.column_data[3] == 0) {
          flags = true
          msg = "Days cannot be zero"
        }
        (task.manpower.map(man => {
          if (man.Type_name == "" || man.Mandays == 0 || man.Persons == 0 || man.Total_cost == 0) {
            flags = true
            msg = "Please Enter valid manpower"
          }
        }))
        if (task.column_data[6]) {
          task.column_data[6].sub_tasks.map(sub => {
            if (sub.column_data[2] == "") {
              flags = true
              msg = "PLease Enter valid task name"
            }
          })
        }
      })
    })
    if (flags == true) {
      this.setState({ flags: true, Errormsg: msg })
    }
    else {
      let template = JSON.stringify(newData);
      console.log("In onSave() =>", newData);
      const dockProject = this.props.newprops.isDock[0];
      console.log(dockProject)
      var body
      if (dockProject.project_type == "Design and Build") {
        body = {
          project_id: dockProject._id,
          type: "Submit",
          template: template,
          project_type: "Design"
        };
      }
      else {
        body = {
          project_id: dockProject._id,
          type: "Submit",
          template: template,
          project_type: dockProject.project_type
        };
      }


      let actions = this.state.actions;
      actions["edit"] = false;
      var bodydata
      if (dockProject.project_type == "Design and Build") {
        bodydata = {
          project_id: dockProject._id,
          prj_type: "Design",
          sub_type: "Estimate"
        };
      }
      else {
        bodydata = {
          project_id: dockProject._id,
          prj_type: dockProject.project_type,
          sub_type: "Estimate"
        };
      }

      this.removeBg();
      console.log(bodydata)
      this.props.newprops.editTemplate(body, this.props.newprops.token);

      this.props.newprops.templatePage(bodydata, this.props.newprops.token);

      this.setState({ actions: actions, status: this.props.newprops.estmt_status });
      this.props.newprops.updateProps()
    }
  }

  onManCheck = (name, rowid, manid) => {
    let table;
    this.state.processArray.filter(process => {
      if (name == process.column[2]) {
        table = process.task_list;
        this.onProcessManCheck(table, rowid, manid, name);
      }
    });
  };

  onProcessManCheck = (table, rowid, manid, name) => {
    let x = this.state.actions.whomtoscan;
    table.map(o => {
      if (o.id == rowid) {
        o.manpower.map(mo => {
          if (mo.manid == manid) {
            let select = mo["selected"];
            if (select == false) {
              x.push(name);
            } else {
              for (var i = x.length - 1; i >= 0; i--) {
                if (x[i] === name) {
                  x.splice(i, 1);
                  break; //<-- Uncomment  if only the first term has to be removed
                }
              }
            }
            mo["selected"] = !mo["selected"];
            let paint = mo["selected"];

            let bg = paint == true ? "#f69999" : "white";
            let color = paint == true ? "white" : "#78849e";
            let elements = document.getElementsByClassName(manid + name + "manpower");
            for (let i = 0; i < elements.length; i++) {
              elements[i].style.backgroundColor = bg;
              elements[i].style.color = color;
              if (elements[i].getAttribute("name") != "cost") {
                elements[i].removeAttribute("disabled");
              }
            }
          }
        });
      }
    });
    this.state.processArray.filter(process => {
      if (name == process.column[2])
        this.setState({
          processArray: [...this.state.processArray]
        }, () => {
          console.log("TTT =>", this.state.processArray)
        });
    });
    this.setState({ [table]: table, [this.state.actions.whomtoscan]: x });
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
        }, () => { console.log("Hiii", this.state.processArray) });
      }
    });

  };

  onManChangeEach = (table, value, rowid, manid, attribute) => {
    let pre = table.filter(o => o.id == rowid);
    let manobj = pre[0].manpower.filter(o => o.manid == manid)[0];
    manobj[attribute] = value;
    let cost = 0;
    this.state.designationData.map((designation, index) => {
      if (designation.designation == manobj.type) {
        cost = designation.cost;

      }
    });
    if (attribute == "persons" || attribute == "mandays" || attribute == "type") {
      manobj["cost"] = manobj["persons"] * manobj["mandays"] * cost;
    }

    return table;
  };
  gotoExecute = () => {
    const dockProject = this.props.newprops.isDock[0]
    return <Redirect to={"/project_plan/execution/" + dockProject.project_id} />
  }
  submitbtn = {
    name: "Next",
    bclass: "btn btn-outline-dark mybutton",
    iclass: "fa fa-angle-right",

  }
  actionbtn = [
    {
      id: 1,
      name: "Submit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-angle-right",
      onClick: this.getFunctionReference().submit
    },
    {
      id: 5,
      name: "Edit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-pencil",
      onClick: this.getFunctionReference().edit
    }
  ];
  actionbtnsall = [
    {
      id: 1,
      name: "Submit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-angle-right",
      onClick: this.getFunctionReference().submit,
      color: "white"
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
      name: "Delete",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-trash",
      onClick: this.getFunctionReference().delete
    },
    {
      id: 4,
      name: "Add",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-plus",
      onClick: this.getFunctionReference().add
    },
    {
      id: 5,
      name: "Edit",
      bclass: "btn btn-outline-dark mybutton",
      iclass: "fa fa-pencil",
      onClick: this.getFunctionReference().edit
    }
  ];
  section = {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    fontSize: "14px"
  };
  sectionedit = {
    //  width: "100%",
    height: "100vh",
    margin: "0 auto",
    fontSize: "14px"
  };
  task = {
    width: "614px",
    backgroundColor: "#344466",
    color: "white",
    height: "80px",
    textAlign: "center",
    paddingTop: "10px",
    float: "left"
  };

  headdiv = {
    float: "left",
    width: this.state.actions.mode == "schedule2" ? "175px" : "185px",
    height: "80px",

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
        console.log(table);
        let newtable = this.onPrecedenceChange(table, id, value);
        console.log(newtable);
        process.task_list = newtable;
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });
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
        console.log("in");
        this.computePrecedence(event, table);
      }
      else {
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
    console.log(rchar);
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
      console.log(obj);
      console.log(hobj);
      if (num < obj[1] && obj[0].hierarchy == false) {
        let temp = hobj[num - 1];
        if (temp.min != "" && temp.start != "" && temp.end != "") {
          let start = parseInt(temp.start);
          let end = parseInt(temp.end);
          let max = Math.max(start, end);
          let days = parseInt(obj[0].days);
          obj[0].min = max + 1;
          obj[0].start = end + 1;
          obj[0].end = obj[0].start + days - 1
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
              let days = parseInt(obj[0].days)
              obj[0].min = max + 1;
              obj[0].start = end + 1;
              obj[0].end = obj[0].start + days - 1
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
    this.setState({
      processArray: [...this.state.processArray]
    });
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

  // Completed Correctly

  makeHierarchy = () => {
    let scan = this.state.actions.schedulechecks;

    this.state.processArray.filter(process => {
      if (scan.indexOf(process.column[2]) != -1) {
        let newtable = this.shift(process.task_list);
        this.setState({
          processArray: [...this.state.processArray]
        });
      }
    });
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
      priority: task.display_priority,
      selected: false,
      precedencevalue: "",
      hierarchy: hie,
      slabel: "",
      min: 1,
      manpower: ([] = task.manpower.map(man => {
        id++;
        id = "100" + id;
        return {
          manedit: false,
          manid: id,
          type: man.Type_name,
          persons: man.Persons,
          mandays: man.Mandays,
          cost: man.Total_cost,
          selected: false,
          mlabel: ""
        };
      }))
    };
    return newData;
  };

  prepareState = rows => {
    var id = 0;
    var singleProcessTasks = [];
    var processData = [];
    let processDetails = [];
    rows.map(process => {
      var singleProcess = [];
      process.tasks.map(task => {
        id++;
        if (task.column_data[6]) {
          singleProcess.push(this.createTask(task, id, false));
          task.column_data[6].sub_tasks.map(sub_task => {
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
    console.log(this.props.newprops)
    this.props.newprops.fetchUserDesignationList({}, this.props.token);
    const dockProject = this.props.newprops.isDock[0];
    console.log("AAAAAA")
    /* const bodydata1 = {
      project_id: dockProject._id,
      prj_type: dockProject.project_type,
      sub_type: "Execute"
    };
    this.props.newprops.templatePage(bodydata1, this.props.newprops.token) */

    let rows = this.props.newprops.data.Rows;
    console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
    console.log(this.props.newprops.data);

    console.log(rows)
    if (rows) {
      let data = this.prepareState(rows);
      console.log(rows);
      console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
      console.log(data);
      this.setState({
        processArray: data
      });
    }

  }

  componentWillReceiveProps(props) {
    if (props.newprops.payloadFetchData != null) {
      console.log("KKKK", props.newprops.payloadFetchData);
      this.setState({ designationData: props.newprops.payloadFetchData });
    }
  }
  // Completed Correctly

  shift = table => {
    let newtable = [];
    table.map((o, i) => {
      if (o.selected == true) {
        if (i > 0) {
          o.hierarchy = !o["hierarchy"];
          // let e = document.getElementsByClassName(o.id)[0];
          // e.style.marginLeft = "20px";
          // e.style.width = "560px";
        }
        newtable.push(o);
      } else {
        newtable.push(o);
      }
    });
    return table;
  };
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
        return "100%";
      } else {
        return "100%";
      }
    }
  };
  getBorderWidth = () => {
    let mode = this.state.actions.mode;
    if (mode == "schedule") {
      return "877px";
    } else if (mode == "manpower") {
      return "1251px";
    } else if (mode == "schedule2") {
      return "1353px";
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
  resetflag = () => {
    this.setState({
      flags: false
    })
  }



  render() {
    console.log("PPP")
    console.log(this.state.processArray)

    var { styles, mode } = this.props.newprops;
    console.log(styles);
    let edit = this.state.actions.edit;
    let manedit = this.state.actions.manedit;
    if (mode == "schedule2") {
      this.actionbtn = this.actionbtn.filter(
        o => o.name == "Edit" || o.name == "Save"
      );
    }
    console.log(this.props.newprops)
    let data = this.props.newprops.data;
    const dockProject = this.props.newprops.isDock[0]
    return (


      <React.Fragment>
        {
          this.state.Loading ?
            <Backdrop>
              <Spinner />
            </Backdrop> : null
        }
        {this.props.newprops.isLoading ? (
          <Backdrop>
            <Spinner />
          </Backdrop>
        ) : null}
        {
          this.state.flags == true ? <Backdrop>
            <ServerStatus
              modalHeader={this.state.Errormsg}
              modalCase={"202"}
              click={this.resetflag}
            ></ServerStatus>
          </Backdrop > : null
        }
        {
          this.props.newprops.server_status == "200" ? <Backdrop>
            <ServerStatus
              modalHeader={"Success"}
              modalCase={"200"}
              click={this.refreshSucess}
            ></ServerStatus>
          </Backdrop> : null
        }
        <section className={mode == "manpower" ? "man-estimate-responsive" : ""} style={edit || manedit ? this.sectionedit : this.section}>
          <div
            style={{
              backgroundColor: "#987c46",
              width: this.computeDesingBarWidth(styles),
              height: "50px",
              position: "relative"
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
                {this.props.newprops.isDock[0].project_type}
              </label>
            </div>
            {this.props.newprops.templateTable.design_estmt_status && this.props.newprops.templateTable.design_estmt_status == "Close"
              || this.props.newprops.templateTable.build_estmt_status && this.props.newprops.templateTable.build_estmt_status == "Close" ?
              <Link to={"/project_plan/execution/" + dockProject.project_id}> <FormActionBtns actionbtn={this.submitbtn} /></Link> : null}

            {(this.props.newprops.templateTable.design_estmt_status && this.props.newprops.templateTable.design_estmt_status == "Open"
              || this.props.newprops.templateTable.build_estmt_status && this.props.newprops.templateTable.build_estmt_status == "Open")
              && !manedit &&
              !edit &&
              this.actionbtn.map(b => (
                <FormActionBtns actionbtn={b} key={b.id} />
              ))}
            {(this.props.newprops.templateTable.design_estmt_status && this.props.newprops.templateTable.design_estmt_status == "Open"
              || this.props.newprops.templateTable.build_estmt_status && this.props.newprops.templateTable.build_estmt_status == "Open")
              && edit &&
              this.actionbtnsall.map(b => (
                <FormActionBtns actionbtn={b} key={b.id} />
              ))}
            {(this.props.newprops.templateTable.design_estmt_status && this.props.newprops.templateTable.design_estmt_status == "Open"
              || this.props.newprops.templateTable.build_estmt_status && this.props.newprops.templateTable.build_estmt_status == "Open")
              && manedit &&
              this.actionbtnsall.map(b => (
                <FormActionBtns actionbtn={b} key={b.id} />
              ))}
            {(this.props.newprops.templateTable.design_estmt_status && this.props.newprops.templateTable.design_estmt_status == "Open"
              || this.props.newprops.templateTable.build_estmt_status && this.props.newprops.templateTable.build_estmt_status == "Open")
              && mode == "schedule" && edit && (
                <div className="formbtns">
                  <button
                    type="button"
                    className="btn btn-outline-dark mybutton"
                    style={{
                      left: this.state.actions.edit == false ? "255px" : "455px"
                    }}
                    onClick={this.makeHierarchy}
                  >
                    Shift &nbsp;
                  <span className="fa fa-angle-right" />
                  </button>
                </div>
              )}
          </div>

          <div style={{ width: "100%" }}>
            {this.state.actions.edit && (
              <div
                style={{
                  width: "90px",//"90px",
                  height: "80px",
                  float: "left",
                  backgroundColor: "#344466",
                  borderRight: "1px solid white"
                }}
              />
            )}

            <div
              className={"srhead" + (mode == "schedule" ? " srhead-responsive" : "")}

              style={{
                width: this.state.actions.edit == false ? "100px" : "100px",
                borderRight: "1px solid white"
              }}
            >
              <div
                className="sr"
                style={{
                  width: "50%",
                  borderRight: "1px solid white"
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
            <div
              className={"task "}
              id={this.state.actions.mode == "schedule" && !this.state.actions.edit ? "table-header" : this.state.actions.mode
                == "schedule" ? "table-header-edit" : "table-header-manpower"}
              style={{
                width:
                  this.state.actions.edit && mode == "schedule"
                    ? "810px"//gaurav? "64.8%"
                    : mode == "schedule"
                      ? "900px"//gaurav? "71.2%"
                      : this.state.actions.manedit
                        ? "350px"//gaurav? "35%"
                        : "450px"//gaurav: "41.8%"
              }}
            >
              <label className="title-label">
                {data != null && data.columns != null ? data.columns[2] : ""}
              </label>
            </div>
            <Schedule
              width={mode == "schedule" ? "150px" : "100px"}
              mode={mode}
              type="estimate"
              columns={data != null && data.columns != null ? data.columns : ""}
            />
            <Schedule2
              width="300px"
              type="estimate"
              columns={data != null && data.columns != null ? data.columns : ""}
              label1="Plan Date"
              headdiv={this.headdiv}
              mode={mode}
            />
            {mode == "manpower" && (
              <React.Fragment>
                {this.state.actions.manedit && (
                  <span
                    style={{
                      ...this.headdiv,
                      width: "100px",
                      backgroundColor: "#344466",
                      borderRight: "1px solid white"
                    }}
                  />
                )}
                <Manpower2
                  width={this.state.actions.manedit ? "500px" : "500px"}
                  edit={this.state.actions.manedit}
                  columns={
                    data != null && data.manpower_columns != null
                      ? data.manpower_columns
                      : ""
                  }
                  //toggle={this.props.projectToggle}
                  label1="Man Power"
                />
              </React.Fragment>
            )}
          </div>

          {this.state.processArray && this.state.processArray.map(process => {
            return (
              <div
                style={{
                  clear: "both",
                  position: "relative",
                  width: this.computeDesingBarWidth(styles)
                }}
                className={process.column[0] + "class"}
              >
                <Table
                  toggle={this.props.projectToggle}
                  process={process}
                  actions={this.state.actions}
                  getStyles={this.getStyles}
                  newstyles={styles}
                  onCheck={this.onCheck}
                  onChange={{
                    onChange1: this.onChange,
                    onChange2: this.onChange2,
                    precedence: this.precedence,
                    blur: this.onPrecedenceBlur,
                    inputblur: this.onInputBlur
                  }}
                  manhandlers={{
                    onChange: this.onManChange,
                    onCheck: this.onManCheck
                  }}

                />
                {edit == false && manedit == false && (
                  <div
                    className="borderBottom"
                    style={{ float: "right", width: "96%" }}
                  />
                )}

                {mode == "schedule" && (
                  <ScheduleBox
                    edit={this.state.actions.edit}
                    process={process}
                  />
                )}

                {mode == "manpower" && (
                  <ManPowerBox
                    edit={this.state.actions.manedit}
                    process={process}
                  />
                )}
              </div>
            );
          })}
        </section>
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,
    projectData: state.projectData.project,
    templateTable: state.projectData.templatePage,
    // estmt_status: state.projectData.templatePage.design_estmt_status,
    isDock: state.projectData.dockProject,
    auth: state.auth,
    newProject: state.projectData.newProject,
    token: state.auth.token,
    status_estmt: state.projectData.estmt_status,
    server_status: state.projectData.server_status,
    payloadFetchData: state.serverData.fetchDesignationList,
    isProjectPin: state.utilityLayout.isProjectPin
    //projectToggle: state.utilityLayout.projectSidebar,
  }
};

// const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  actions
)(hoc(ProjectPlanEstimation));
