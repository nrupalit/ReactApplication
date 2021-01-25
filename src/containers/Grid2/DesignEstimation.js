import React, { Component } from "react";
import { connect } from "react-redux";
import HOC from "HOC/ProjectHOC";
import { dockTheProject, templatePage, hideProjectSidebar, fetchUserDesignationList } from "actions/action_authentication";
import { Redirect } from "react-router-dom";

import Navbar from "components/NavBar/Navbar";
import LeftSidebar from "components/SideBar/left/leftsidebar.jsx";
import RightSidebar from "components/SideBar/right/rightsidebar.jsx";
import ServerStatus from "Layout/ServerSucess/ServerStatus";
import Backdrop from "Layout/Backdrop/Backdrop";
import Spinner from "Layout/Spinner/Spinner";
import ServerError from "Layout/ServerError/ServerError";

import "./main.css";

import Checkbox from "./checkbox";

// TASKS TO DO
// HANDLE SAVE BTN
// HANDLE SUBMIT BTN
// HANDLE CANCEL BTN
// INPUT FIELD ONLY TO PROPER CELLS

// CHECKBOX - ADD [HANDLE MULTIPLE CHECKS ALSO]
// CHECKBOX - DELETE [HANDLE MULTIPLE CHECKS ALSO]
// SHIFT OPERATION
// DRAG AND DROP A ROW
// UNIFYING SCHEDULE AND MANPOWER INTO ONE
// HANDLE SERIAL NUMBERS
// SHOW TOTAL FOR DAYS AND MANPOWER
// HANDLE DISPLAY PRIORITY


// PR - Predecessor (column 2) - it is used to calculate a task's start and end date based on end date of its predecessor

/*
// START | GAURAV'S JSON
let hardcodedTemplateData = 
{
  "template_id": 1,
  "template_name": "D & B",
  "columns": [
    "SR",
    "PR",
    "Process / Task",
    "Schedule Days",
    "Plan Day No - Start",
    "Plan Day No - End"
  ],
  "manpower_columns": [
    "",
    "Type",
    "Persons",
    "Mandays",
    "Total Cost"
  ],
  "Rows": [
    {
      "type": "process",
      "display_priority": 1,
      "column_data": [
        "A",
        "",
        "Pre-Design",
        "",
        "",
        ""
      ],
      "tasks": [
        {
          "type": "task",
          "display_priority": 1,
          "column_data": [
            "1",
            "",
            "Design Scope 123",
            "1",
            "2",
            2
          ],
          "manpower": [
            {
              "Type": 2,
              "Type_name": "Junior",
              "Persons": 1,
              "Mandays": 3,
              "Total_cost": 3750
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Design Scope",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Software Tester And Developer",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "process",
      "display_priority": 0,
      "column_data": [
        "B",
        "",
        "Design Process",
        "",
        "",
        ""
      ],
      "tasks": [
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "hello 2",
            "5",
            "6",
            10
          ],
          "manpower": [
            {
              "Type": 4,
              "Type_name": "Software Tester And Developer",
              "Persons": "1",
              "Mandays": "1",
              "Total_cost": 500
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Hello subtask 22",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Software Tester And Developer",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                }
              ]
            },
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Hello subtask 44",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Software Tester And Developer",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                }
              ]
            }
          ]
        },
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "hello 2",
            "5",
            "6",
            0
          ],
          "manpower": [
            {
              "Type": -1000,
              "Type_name": "Software Tester And Developer",
              "Persons": 1,
              "Mandays": 1,
              "Total_cost": 0
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "display_priority": 0,
              "column_data": [
                "",
                "",
                "hey",
                "5",
                "4",
                0
              ],
              "manpower": [
                {
                  "Type": 5,
                  "Type_name": "Software Tester And Developer",
                  "Persons": 1,
                  "Mandays": 1,
                  "Total_cost": 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "process",
      "display_priority": 0,
      "column_data": [
        "C",
        "",
        "Process C",
        "",
        "",
        ""
      ],
      "tasks": [
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "it is C",
            "2",
            "2",
            3
          ],
          "manpower": [
            {
              "Type": 6,
              "Type_name": "Software Tester And Developer",
              "Persons": 1,
              "Mandays": 1,
              "Total_cost": 0
            }
          ]
        }
      ]
    }
  ]
}
// END | GAURAV'S JSON
*/



// START | ABHILASH'S JSON
let hardcodedTemplateData = 
{
  "template_id": 1,
  "template_name": "D & B",
  "columns": [
    "SR",
    "PR",
    "Process / Task",
    "Schedule Days",
    "Plan Day No - Start",
    "Plan Day No - End"
  ],
  "manpower_columns": [
    "Type",
    "Persons",
    "Mandays",
    "Total Cost"
  ],
  "Rows": [
    {
      "type": "process",
      "display_priority": 1,
      "column_data": [
        "A",
        "",
        "Pre-Design",
        "",
        "",
        ""
      ],
      "tasks": [
        {
          "type": "task",
          "display_priority": 1,
          "column_data": [
            "1",
            "",
            "Design Scope 123",
            "1",
            "2",
            2
          ],
          "manpower": [
            {
              "Type": 2,
              "Type_name": "Designer 1",
              "Persons": 1,
              "Mandays": 3,
              "Total_cost": 3750
            },
            {
              "Type": 2,
              "Type_name": "Designer 2",
              "Persons": 1,
              "Mandays": 3,
              "Total_cost": 10000
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Design Scope",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Designer 1",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "process",
      "display_priority": 0,
      "column_data": [
        "B",
        "",
        "Design Process",
        "",
        "",
        ""
      ],
      "tasks": [
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "hello 2",
            "5",
            "6",
            10
          ],
          "manpower": [
            {
              "Type": 4,
              "Type_name": "Carpenter",
              "Persons": "1",
              "Mandays": "1",
              "Total_cost": 500
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Hello subtask 22",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Designer 1",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                },
                {
                  "Type": 3,
                  "Type_name": "Designer 22",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 6000
                }
              ]
            },
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Hello subtask 44",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Designer 1",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                }
              ]
            }
          ]
        },
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "hello 2",
            "5",
            "6",
            0
          ],
          "manpower": [
            {
              "Type": -1000,
              "Type_name": "",
              "Persons": "",
              "Mandays": "",
              "Total_cost": 0
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "display_priority": 0,
              "column_data": [
                "",
                "",
                "hey",
                "5",
                "4",
                0
              ],
              "manpower": [
                {
                  "Type": 5,
                  "Type_name": "",
                  "Persons": "",
                  "Mandays": "",
                  "Total_cost": 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "process",
      "display_priority": 0,
      "column_data": [
        "C",
        "",
        "Process C",
        "",
        "",
        ""
      ],
      "tasks": [
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "it is C",
            "2",
            "2",
            3
          ],
          "manpower": [
            {
              "Type": 6,
              "Type_name": "",
              "Persons": "",
              "Mandays": "",
              "Total_cost": 0
            }
          ]
        },
        {
          "type": "task",
          "display_priority": 0,
          "column_data": [
            "",
            "",
            "it is DD",
            "2",
            "2",
            3
          ],
          "manpower": [
            {
              "Type": 6,
              "Type_name": "",
              "Persons": "",
              "Mandays": "",
              "Total_cost": 0
            }
          ],
          "sub_tasks": [
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Hello subtask 22",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Designer 1",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                },
                {
                  "Type": 3,
                  "Type_name": "Designer 22",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 6000
                }
              ]
            },
            {
              "type": "sub_task",
              "column_data": [
                "1",
                "",
                "Hello subtask 44",
                "2",
                "2",
                3
              ],
              "manpower": [
                {
                  "Type": 3,
                  "Type_name": "Designer 1",
                  "Persons": 1,
                  "Mandays": 3,
                  "Total_cost": 3750
                }
              ]
            }
          ]

        }

      ]
    }
  ]
}
// END | ABHILASH'S JSON


// let tempDataBeforeEdit = null;
class DesignEstimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateData: null,
      design_estmt_status: null,
      editmode: false,
      // tempDataBeforeEdit: null,
      checkedCheckboxes: [],

      // maneditmode: false,
      // manCheckedCheckboxes: [],
      // designationList: null,

      // Gaurav's state
      initialTemplateData: null,
      designationData: null,
      maneditmode: false,
      manCheckedCheckboxes: []
    };
    // this.baseState = this.state;
  }

  ///////////////////////////// START | MANPOWER TAB FUNCTIONS /////////////////////////////////////////////






  // START | GAURAV'S CODE

  //MANPOWER FUNCTIONS
  handleManEditBtn = () => {
    this.setState({maneditmode: true});
  }

  handleManCancelBtn = () => {
    this.setState({maneditmode: false});
  }

  handleSelectList = (e, i, j, k, a) => {
    let modifiedTemplateData = this.state.templateData;
    let processes = modifiedTemplateData.Rows;

    let process = processes[i];
    let task = process.tasks[j];
    let manpowerData = this.state.designationData;

    if(k == null) {
      task.manpower[a].Type_name = e.target.value;
      for(let b = 0; b < manpowerData.length; b++) {
        if(manpowerData[b].designation == e.target.value) {
          task.manpower[a].Total_cost = manpowerData[b].cost * task.manpower[a].Persons * task.manpower[a].Mandays;
        }
      }
    }
    else {
      let sub_task = task.sub_tasks[k];
      sub_task.manpower[a].Type_name = e.target.value;
      for(let b = 0; b < manpowerData.length; b++) {
        if(manpowerData[b].designation == e.target.value) {
          sub_task.manpower[a].Total_cost = manpowerData[b].cost * sub_task.manpower[a].Persons * sub_task.manpower[a].Mandays;
        }
      }
    }

    this.setState({ templateData: modifiedTemplateData});
    /* for(let l = 0; l < processes.length; l++) {
      let tasks = processes[l].tasks;
      for(let b = 0; b < tasks.length; b++) {
        if( k == null ) {
          let manp = tasks[b].manpower[a];
          manp.Type_name = e.target.value;
        }
        else {
          let sub_tasks = tasks[b].sub_tasks;
          for(let c = 0; c < sub_tasks.length; c++) {
            if( c == k ) {
              let manp = sub_tasks[c].manpower[a];
              manp.Type_name = e.target.value;
            }
          }
        }
      }
    } */
  }

  handleManCheckboxCheck = (event, i, j, k, l) => {
    // console.log(event.target.checked); // true or false
    // console.log('hey');
    // console.log(i);
    // console.log(event.target.checked);
    // alert("in handleCheckboxCheck");
    const manCheckedCheckboxes = this.state.manCheckedCheckboxes;
    let index;
    if(event.target.checked) {
      manCheckedCheckboxes.push([i, j, k, l]);
    } else {
      for(var a=0;a<manCheckedCheckboxes.length;a++) {
        if(manCheckedCheckboxes[a][0] === i && manCheckedCheckboxes[a][1] === j && manCheckedCheckboxes[a][2] === k && manCheckedCheckboxes[a][3] == l) {
          index = a;
        }
      }
      manCheckedCheckboxes.splice(index, 1);
      this.setState({ manCheckedCheckboxes });
    }
    this.setState({ manCheckedCheckboxes });
    // console.log(this.state.checkedCheckboxes);
  }

  handleManInputChange = (event,i,j,k,l,type) => {

    let templateData = this.state.templateData;
    if( k ===  null) {
      templateData.Rows[i].tasks[j].manpower[l][type] = event.target.value;
    }
    else {
      templateData.Rows[i].tasks[j].sub_tasks[k].manpower[l][type] = event.target.value;
    }
    this.setState({ templateData });
  }


  handleManAddBtn = () => {
    
    let modifiedTemplateData = this.state.templateData;
    let manCheckedCheckboxes = this.state.manCheckedCheckboxes;
    if(manCheckedCheckboxes.length == 0) {
      alert("Please select one row for Add operation");
      return;
    }
    if(manCheckedCheckboxes.length > 1) {
      alert("Please select only one row for Add operation");
    }
    //alert(JSON.stringify(manCheckedCheckboxes));
    let row = manCheckedCheckboxes[0];

    let process = modifiedTemplateData.Rows[row[0]];

    let task = process.tasks[row[1]];
    if(row[2] === null) {
      let manp = {};
      manp.Type="";
      manp.Type_name="";
      manp.Persons="";
      manp.Mandays="";
      manp.Total_cost="";
      manp.default = ""
      task.manpower.splice(row[3] + 1,0,manp);
    }
    else {
      let subTask = task.sub_tasks[row[2]];
      let manp = {};
      manp.Type="";
      manp.Type_name="";
      manp.Persons="";
      manp.Mandays="";
      manp.Total_cost="";
      manp.default="";
      subTask.manpower.splice(row[3] + 1,0,manp);
    }
    //this.setState({manCheckedCheckboxes : []});
    this.setState({templateData: modifiedTemplateData});
  }

  handleManDeleteBtn = () => {
    let manCheckedCheckboxes = this.state.manCheckedCheckboxes;
    if(manCheckedCheckboxes.length == 0) {
      alert("Please select at least one row for Delete operation");
      return;
    }
    let modifiedTemplateData = this.state.templateData;
    let defaultManpower = {
      Type: "",
      Type_name: "",
      Persons: "",
      Mandays: "",
      Total_cost: "",
    }
    for(let i = 0; i < manCheckedCheckboxes.length; i++) {
      let e = manCheckedCheckboxes[i];
      let process = modifiedTemplateData.Rows[e[0]];
      let task = process.tasks[e[1]];
      if(e[2] == null) {
        task.manpower.splice(e[3],1);  
        task.manpower.splice(e[3],0,defaultManpower);      
      }
      else {
        task.sub_tasks[e[2]].manpower.splice(e[3],1);
        task.sub_tasks[e[2]].manpower.splice(e[3],0,defaultManpower);
      }
    }
    console.log("defaultManpower", defaultManpower);
    //let deletedTaskCount = 0, deletedSubTaskCount = 0;
    let processes = modifiedTemplateData.Rows;
    for(let a = 0; a < processes.length; a++) {
      let process = processes[a];
      for(let b = 0; b < process.tasks.length; b++) {
        let task = process.tasks[b];
        if(task.manpower.length > 0) {
          for(let c = 0; c < task.manpower.length;) {
            if(task.manpower[c].Persons == "" && task.manpower[c].default == null ) {
              task.manpower.splice(c,1);
              if(task.manpower.length == 0) {
                let defaultManp = {
                  Type: "",
                  Type_name: "",
                  Persons: "",
                  Mandays: "",
                  Total_cost: "",
                }
                task.manpower.splice(0,0,defaultManp);
                break;
              }
              continue;
            }
            c++;
          }
        }
        if(task.sub_tasks != null) {
          for(let d = 0; d < task.sub_tasks.length; d++) {
            let subTask = task.sub_tasks[d];
            if(subTask.manpower.length > 0) {
              for(let f = 0; f < subTask.manpower.length;) {
                if(subTask.manpower[f].Persons == "" && subTask.manpower[f].default == null ) {
                  subTask.manpower.splice(f,1);
                  if(subTask.manpower.length == 0) {
                    let defaultManp = {
                      Type: "",
                      Type_name: "",
                      Persons: "",
                      Mandays: "",
                      Total_cost: "",
                    }
                    subTask.manpower.splice(0,0,defaultManp);
                    break;
                  }
                  continue;
                }
                f++;
              }
            }
          }
        }
      }
    }

    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    for(let a = 0; a < checkboxes.length; a++) {
      checkboxes[a].checked = false;
    }
    this.setState({manCheckedCheckboxes : []});
    this.setState({ templateData : modifiedTemplateData});
  }





  // handleManAddBtn = () => {
    
  //   let modifiedTemplateData = this.state.templateData;
  //   let manCheckedCheckboxes = this.state.manCheckedCheckboxes;
  //   if(manCheckedCheckboxes.length > 1) {
  //     alert("Please select only one row for Add operation");
  //   }
  //   let row = manCheckedCheckboxes[0];
  //   let process = modifiedTemplateData.Rows[row[0]];
  //   let task = process.tasks[row[1]];
  //   if(row[2] === null) {
  //     let manp = {};
  //     manp.Type="";
  //     manp.Type_name="";
  //     manp.Persons="";
  //     manp.Mandays="";
  //     manp.Total_cost="";
  //     task.manpower.splice(row[3] + 1,0,manp);
  //   }
  //   else {
  //     let subTask = task.sub_tasks[row[2]];
  //     let manp = {};
  //     manp.Type="";
  //     manp.Type_name="";
  //     manp.Persons="";
  //     manp.Mandays="";
  //     manp.Total_cost="";
  //     subTask.manpower.splice(row[3] + 1,0,manp);
  //   }
  //   //this.setState({manCheckedCheckboxes : []});
  //   this.setState({templateData: modifiedTemplateData});
  // }

  // handleManDeleteBtn = () => {
  //   let manCheckedCheckboxes = this.state.manCheckedCheckboxes;
  //   let modifiedTemplateData = this.state.templateData;
  //   let defaultManpower = {
  //     Type: "",
  //     Type_name: "",
  //     Persons: "",
  //     Mandays: "",
  //     Total_cost: ""
  //   }
  //   for(let i = 0; i < manCheckedCheckboxes.length; i++) {
  //     let e = manCheckedCheckboxes[i];
  //     let process = modifiedTemplateData.Rows[e[0]];
  //     let task = process.tasks[e[1]];
  //     if(e[2] == null) {
  //       task.manpower.splice(e[3],1);  
  //       task.manpower.splice(e[3],0,defaultManpower);      
  //     }
  //     else {
  //       task.sub_tasks[e[2]].manpower.splice(e[3],1);
  //       task.sub_tasks[e[2]].manpower.splice(e[3],0,defaultManpower);
  //     }
  //   }
  //   console.log("defaultManpower", defaultManpower);
  //   //let deletedTaskCount = 0, deletedSubTaskCount = 0;
  //   let processes = modifiedTemplateData.Rows;
  //   for(let a = 0; a < processes.length; a++) {
  //     let process = processes[a];
  //     for(let b = 0; b < process.tasks.length; b++) {
  //       let task = process.tasks[b];
  //       if(task.manpower.length > 0) {
  //         for(let c = 0; c < task.manpower.length;) {
  //           if(task.manpower[c].Persons == "") {
  //             task.manpower.splice(c,1);
  //             if(task.manpower.length == 0) {
  //               task.manpower.splice(0,0,defaultManpower);
  //               break;
  //             }
  //             continue;
  //           }
  //           c++;
  //         }
  //       }
  //       if(task.sub_tasks != null) {
  //         for(let d = 0; d < task.sub_tasks.length; d++) {
  //           let subTask = task.sub_tasks[d];
  //           if(subTask.manpower.length > 0) {
  //             for(let f = 0; f < subTask.manpower.length;) {
  //               if(subTask.manpower[f].Persons == "") {
  //                 subTask.manpower.splice(f,1);
  //                 if(subTask.manpower.length == 0) {
  //                   subTask.manpower.splice(0,0,defaultManpower);
  //                   break;
  //                 }
  //                 continue;
  //               }
  //               f++;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   let checkboxes = document.querySelectorAll("input[type=checkbox]");
  //   for(let a = 0; a < checkboxes.length; a++) {
  //     checkboxes[a].checked = false;
  //   }
  //   this.setState({manCheckedCheckboxes : []});
  //   this.setState({ templateData : modifiedTemplateData});
  // }




  displayTemplateManpower = () => {
    let templateData = this.state.templateData;
    let editmode = this.state.editmode;
    let manColNames = null;
    if(templateData !== null) {
      // console.log(templateData);
      let Rows = templateData.Rows;
      let columns = templateData.columns;
      let manpower_columns = templateData.manpower_columns;
      let totalCols = columns.length + manpower_columns.length;

      let colNames = columns.map((col, i) => {
        return (
          <td key={i}>{col}</td>
        )
      });
      
      manColNames = manpower_columns.map((col, i) => {
        return (
          <>
          {i === 0 ? <td key={0}></td> : null}
          <td key={i}>{col}</td>
          </>
        )
      });
      
      // i = process, j = task, k = subtask
      let tableData;
      tableData = Rows.map((process, i) => {

        let tasks = process.tasks.map((task, j) => {

          let sub_tasks;
          if(task.sub_tasks !== undefined) {
            
            // alert('in displayTemplateManpower ')
            sub_tasks = task.sub_tasks.map((sub_task, k) => {

              return (
                <>
                <tr key={k} className="manpower-row">
                  {sub_task.column_data.map((col, l) => {
                    return (
                      <td key={l} className={l===2 ? 'subtask-row' : null}>
                        {col}
                        {/* <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, j, k, l)} /> */}
                      </td>
                    )
                  })}
                  {sub_task.manpower.map((manp,a) => {
                    if(a===0) {
                    return (
                      <>
                      <td style={{width:"93px"}}>
                        {this.state.maneditmode &&
                        <Checkbox handleManCheckboxCheck={(e) => this.handleManCheckboxCheck(e, i, j, k,a)} manpower={true} />
                        }
                      </td>
                      <td key={1}>
                      {this.state.maneditmode ?
                      <select onChange={e => this.handleSelectList(e, i, j, k, a)}>
                        <option value="Choose Manpower">Choose Manpower</option>
                      {this.state.designationData != null &&
                          this.state.designationData.map((designation, index) =>
                            manp.Type_name == designation.designation ? (
                              <>
                                <option value={designation.designation} selected="selected">
                                  {designation.designation}
                                </option>
                              </>
                            ) : (
                                <>
                                  <option value={designation.designation}>
                                    {designation.designation}
                                  </option>
                                </>
                              )
                          )}
                      </select> : manp.Type_name 
                      }
                      </td>
                      <td key={2}>
                      {this.state.maneditmode ? <input type="text" value={manp.Persons} onChange={(e) => this.handleManInputChange(e, i, j, k, a,"Persons")} /> : manp.Persons }
                      </td>
                      <td key={3}>
                      {this.state.maneditmode ? <input type="text" value={manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, k, a,"Mandays")}/> : manp.Mandays }
                      </td>
                      <td key={4}>
                      {this.state.maneditmode ? 
                         (
                          this.state.designationData != null &&
                          this.state.designationData.map((designation, index) => {
                            return (
                            manp.Type_name == designation.designation ? (
                              <input type="text" disabled="true" value={designation.cost*manp.Persons*manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, k, a,"Total_cost")}/>
                            ) : null
                           
                          )
                            })
                         ) : manp.Total_cost}
                      </td>
                      </>
                    )
                    }
                  })}
                </tr>
                <>
                {sub_task.manpower.length > 1 &&
                <>
                  {
                    sub_task.manpower.map((manp,a) => {
                    if(a !== 0) {
                    return (
                      <tr className="manpower-row">
                      <td colSpan="6"></td>
                      <td style={{width:"93px"}}>
                      {
                        this.state.maneditmode &&
                        <Checkbox handleManCheckboxCheck={(e) => this.handleManCheckboxCheck(e, i, j, k,a)}  manpower={true}/>
                      }
                      </td>
                      <td key={1}>
                      {this.state.maneditmode ?
                      <select onChange={e => this.handleSelectList(e, i, j, k, a)}>
                        <option value="Choose Manpower">Choose Manpower</option>
                      {this.state.designationData != null &&
                          this.state.designationData.map((designation, index) =>
                            manp.Type_name == designation.designation ? (
                              <>
                                <option value={designation.designation} selected="selected">
                                  {designation.designation}
                                </option>
                              </>
                            ) : (
                                <>
                                  <option value={designation.designation}>
                                    {designation.designation}
                                  </option>
                                </>
                              )
                          )}
                      </select> : manp.Type_name 
                      }
                      </td>
                      <td key={2}>
                      {this.state.maneditmode ? <input type="text" value={manp.Persons} onChange={(e) => this.handleManInputChange(e, i, j, k, a,"Persons")} /> : manp.Persons }
                      </td>
                      <td key={3}>
                      {this.state.maneditmode ? <input type="text" value={manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, k, a,"Mandays")}/> : manp.Mandays }
                      </td>
                      <td key={4}>
                      {this.state.maneditmode ? 
                         (
                          this.state.designationData != null &&
                          this.state.designationData.map((designation, index) => {
                            return (
                            manp.Type_name == designation.designation ? (
                              <input type="text" disabled="true" value={designation.cost*manp.Persons*manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, k, a,"Total_cost")}/>
                            ) : null
                           
                          )
                            })
                         ) : manp.Total_cost}
                      </td>
                      </tr>
                    )
                    }
                  })}
                </>
              } 
              </>
                </>
              )

            })
          }
          // return null
          return (
            <React.Fragment key={j}>
              <tr key={j} className="manpower-row">
                {task.column_data.map((col, ind) => {
                  return (
                    <td key={ind}>
                      {col}
                      {/* <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, j, ind, null)} /> */}
                    </td>
                  )
                })}
                {task.manpower.map((manp,a) => {
                    if(a === 0) {
                    return (
                      <>
                      <td style={{width:"93px"}}>
                      {
                        this.state.maneditmode &&
                        <Checkbox handleManCheckboxCheck={(e) => this.handleManCheckboxCheck(e, i, j, null,a)}  manpower={true}/>
                      }
                      </td>
                      <td key={1}>
                        {this.state.maneditmode ?
                        <select onChange={e => this.handleSelectList(e, i, j, null, a)}>
                          <option value="Choose Manpower">Choose Manpower</option>
                        {this.state.designationData != null &&
                            this.state.designationData.map((designation, index) =>
                              manp.Type_name == designation.designation ? (
                                <>
                                  <option value={designation.designation} selected="selected">
                                    {designation.designation}
                                  </option>
                                </>
                              ) : (
                                  <>
                                    <option value={designation.designation}>
                                      {designation.designation}
                                    </option>
                                  </>
                                )
                            )}
                        </select> : manp.Type_name 
                        }
                      </td>
                      <td key={2}>
                      {this.state.maneditmode ? <input type="text" value={manp.Persons} onChange={(e) => this.handleManInputChange(e, i, j, null, a,"Persons")} /> : manp.Persons }
                      </td>
                      <td key={3}>
                      {this.state.maneditmode ? <input type="text" value={manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, null, a,"Mandays")}/> : manp.Mandays }
                      </td>
                      <td key={4}>
                      {this.state.maneditmode ? 
                         (
                          this.state.designationData != null &&
                          this.state.designationData.map((designation, index) => {
                            return (
                            manp.Type_name == designation.designation ? (
                              <input type="text" disabled="true" value={designation.cost*manp.Persons*manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, null, a,"Total_cost")}/>
                            ) : null
                           
                          )
                            })
                         ) : manp.Total_cost}
                      </td>
                      </>
                    )
                    }
                  })}
              </tr>
              {task.manpower.length > 1 &&
                <>
                  {task.manpower.map((manp,a) => {
                    if(a !== 0) {
                    return (
                      <tr className="manpower-row">
                      <td colSpan="6"></td>
                      <td style={{width:"93px"}}>
                      {
                        this.state.maneditmode &&
                        <Checkbox handleManCheckboxCheck={(e) => this.handleManCheckboxCheck(e, i, j, null,a)}  manpower={true}/>
                      }</td>
                      <td key={1}>
                        {this.state.maneditmode ?
                        <select onChange={e => this.handleSelectList(e, i, j, null, a)}>
                          <option value="Choose Manpower">Choose Manpower</option>
                        {this.state.designationData != null &&
                            this.state.designationData.map((designation, index) =>
                              manp.Type_name == designation.designation ? (
                                <>
                                  <option value={designation.designation} selected="selected">
                                    {designation.designation}
                                  </option>
                                </>
                              ) : (
                                  <>
                                    <option value={designation.designation}>
                                      {designation.designation}
                                    </option>
                                  </>
                                )
                            )}
                        </select> : manp.Type_name 
                        }
                      </td>
                      <td key={2}>
                      {this.state.maneditmode ? <input type="text" value={manp.Persons} onChange={(e) => this.handleManInputChange(e, i, j, null, a,"Persons")} /> : manp.Persons }
                      </td>
                      <td key={3}>
                      {this.state.maneditmode ? <input type="text" value={manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, null, a,"Mandays")}/> : manp.Mandays }
                      </td>
                      <td key={4}>
                      {this.state.maneditmode ? 
                         (
                          this.state.designationData != null &&
                          this.state.designationData.map((designation, index) => {
                            return (
                            manp.Type_name == designation.designation ? (
                              <input type="text" disabled="true" value={designation.cost*manp.Persons*manp.Mandays} onChange={(e) => this.handleManInputChange(e, i, j, null, a,"Total_cost")}/>
                            ) : null
                           
                          )
                            })
                         ) : manp.Total_cost}
                      </td>
                      </tr>
                    )
                    }
                  })}
                </>
              } 
              {sub_tasks}
            </React.Fragment>
          )

        })

        return (
          <React.Fragment key={i}>
            <tr className="process-row">
              {process.column_data.map((col, ind) => {
                return (
                  <td key={ind}>
                    {
                      this.state.editmode === true
                      ? 
                        ind === 2 
                          ? <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, ind, null, null)} /> 
                          : col
                        
                      : col
                    }
                    {/* {col}
                    {ind === 2 
                      ? <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, ind, null, null)} /> 
                      : null
                    } */}
                  </td>
                )
              })}
              {
              <>
              <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </>
              }
            
            </tr>
            {tasks}
          </React.Fragment>
        )
      });


      return(
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="thead1" colSpan={totalCols + 1}>

                  {
                    this.state.maneditmode === true
                    ?
                      <>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManCancelBtn}>Save <span className="fa fa-save"></span></button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManAddBtn}>Add <span className="fa fa-plus"></span></button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.saveEditedForm}>Cancel</button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManDeleteBtn}>Delete</button>
                      </>
                    :
                      <>
                        <button type="button" className="btn btn-outline-dark mybutton">Submit <span className="fa fa-angle-right"></span></button>

                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManEditBtn}>Edit <span className="fa fa-pencil"></span></button>
                      </>
                  }

                  
                </td>
              </tr>
              <tr className="colNames">
                {colNames}
                {manColNames}
              </tr>

              {tableData}

            </tbody>
          </table>
        </div>
      )

    }
  }
  // END | GAURAV'S CODE


















  
  
/*
  handleManEditBtn = () => {
    this.setState({maneditmode: true});
  }

  // START | FUNCTION TO CALCULATE TOTAL COST BASED ON TYPE, PERSONS AND MANDAYS
  calTotalCost = (templateData, a, i, j, k) => {
    let total;
    if(k === null) {
      total = templateData.Rows[i].tasks[j].manpower[a]['Persons'] * templateData.Rows[i].tasks[j].manpower[a]['Mandays'];
    } else {
      total = templateData.Rows[i].tasks[j].sub_tasks[k].manpower[a]['Persons'] * templateData.Rows[i].tasks[j].sub_tasks[k].manpower[a]['Mandays'];
    }
    return total;
  }
  // END | FUNCTION TO CALCULATE TOTAL COST BASED ON TYPE, PERSONS AND MANDAYS

  handleInputChangeManp = (event, a, i, j, k, type) => {
    let {templateData} = this.state;
    if( k ===  null) {
      templateData.Rows[i].tasks[j].manpower[a][type] = event.target.value;
      // when changing Type, Persons or Mandays, update the Total Cost accordingly
      templateData.Rows[i].tasks[j].manpower[a]['Total_cost'] = this.calTotalCost(templateData, a, i, j, k );
    } else {
      templateData.Rows[i].tasks[j].sub_tasks[k].manpower[a][type] = event.target.value;
      // when changing Type, Persons or Mandays, update the Total Cost accordingly
      templateData.Rows[i].tasks[j].sub_tasks[k].manpower[a]['Total_cost'] = this.calTotalCost(templateData, a, i, j, k );
    }
    this.setState({ templateData });
  }

  manpowerRows = (manp, a, i, j, k) => {
    let { maneditmode, designationList } = this.state;
    console.log(designationList);
    return (
      <React.Fragment key={a}>

        <td>
          {
            maneditmode === true
            ? 
              <select>
              {designationList !== null && designationList.map((des, b) => {
                return (
                  <option key={b}>
                    {des.designation}
                  </option>
                )
              })}
              </select>
            : manp.Type_name
          }
        </td>
        <td>
          {
            maneditmode === true
            ? <input type='number' value={manp.Persons} onChange={(e) => this.handleInputChangeManp(e, a, i, j, k, 'Persons')} />
            : manp.Persons
          }
        </td>
        <td>
          {
            maneditmode === true
            ? <input type='number' value={manp.Mandays} onChange={(e) => this.handleInputChangeManp(e, a, i, j, k, 'Mandays')} />
            : manp.Mandays
          }
        </td>
        <td>{manp.Total_cost}</td>

      </React.Fragment>
    )
  }

  // START | FUNCTION TO PROPERLY DISPLAY NESTED TABLE DATA FOR MANPOWER
  displayTemplateManpower = () => {
    // let templateData = this.state.templateData;
    // let editmode = this.state.editmode;
    let { maneditmode, design_estmt_status, templateData } = this.state;
    let manColNames = null;
    if(templateData !== null) {
      console.log(templateData);
      let Rows = templateData.Rows;
      let columns = templateData.columns;
      let manpower_columns = templateData.manpower_columns;
      let totalCols = columns.length + manpower_columns.length;

      let colNames = columns.map((col, i) => {
        return (
          <td key={i}>{col}</td>
        )
      });

      manColNames = manpower_columns.map((col, i) => {
        return (
          <td key={i}>{col}</td>
        )
      });
      
      // i = process, j = task, k = subtask
      let tableData;
      tableData = Rows.map((process, i) => {

        let tasks = process.tasks.map((task, j) => {

          let sub_tasks;
          if(task.sub_tasks !== undefined) {
            sub_tasks = task.sub_tasks.map((sub_task, k) => {

              return (
                <React.Fragment key={k}>
                  <tr>
                    {
                      sub_task.column_data.map((col, l) => {
                        return (
                          <td key={l} className={l===2 ? 'subtask-row' : null}>{col}</td>
                        )
                      })
                    }
                    {
                      sub_task.manpower.map((manp, a) => {
                        if(a===0) {
                          return ( <React.Fragment key={a}>{this.manpowerRows(manp, a, i, j, k)}</React.Fragment> )
                        }
                      })
                    }
                  </tr>

                  {
                    sub_task.manpower.length > 1
                    ? 
                      <tr>
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                        {
                          sub_task.manpower.map((manp, a) => {
                            if(a > 0) {
                              return ( <React.Fragment key={a}>{this.manpowerRows(manp, a, i, j, k)}</React.Fragment> )
                            }
                            
                          })
                        }
                      </tr>
                    : null
                  }

                </React.Fragment>
              )

            })
          }

          return (
            <React.Fragment key={j}>
              <tr>
                {
                  task.column_data.map((col, ind) => {
                    return (
                      <td key={ind}>{col}</td>
                    )
                  })
                }
                {
                  task.manpower.map((manp, a) => {
                    if(a===0) {
                      return ( <React.Fragment key={a}>{this.manpowerRows(manp, a, i, j, null)}</React.Fragment> )
                    }
                  })
                }
              </tr>

              {
                task.manpower.length > 1
                ? 
                  <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td>
                    {
                      task.manpower.map((manp, a) => {
                        if(a > 0) {
                          return ( <React.Fragment key={a}>{this.manpowerRows(manp, a, i, j, null)}</React.Fragment> )
                        }
                        
                      })
                    }
                  </tr>
                : null
              }

              {sub_tasks}
            </React.Fragment>
          )

        })

        return (
          <React.Fragment key={i}>
            <tr className="process-row">
              {process.column_data.map((col, ind) => {
                return (
                  <td key={ind}>{col}</td>
                )
              })}
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {tasks}
          </React.Fragment>
        )
      });


      return(
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="thead1" colSpan={totalCols}>

                  {
                    this.state.maneditmode === true
                    ?
                      <>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.saveManEditedForm}>Save <span className="fa fa-save"></span></button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManCancelBtn}>Cancel</button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManAddBtn}>Add <span className="fa fa-plus"></span></button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManDeleteBtn}>Delete <span className="fa fa-trash"></span></button>
                      </>
                    :
                      <>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManEditBtn}>Edit <span className="fa fa-pencil"></span></button>
                      </>
                  }

                  
                </td>
              </tr>
              <tr className="colNames">
                {colNames}
                {manColNames}
              </tr>

              {tableData}

            </tbody>
          </table>
        </div>
      )

    }
  }
  */


  // END | FUNCTION TO PROPERLY DISPLAY NESTED TABLE DATA FOR MANPOWER

  ///////////////////////////// END | MANPOWER TAB FUNCTIONS /////////////////////////////////////////////




  ///////////////////////////// START | SCHEDULE TAB FUNCTIONS /////////////////////////////////////////////



  // START | FUNCTION TO HANDLE CLICK ON SAVE BUTTON || COMMON FOR SCHEDULE AND MANPOWER
  saveEditedForm = () => {
    // do front end validations, stringify the state (templateData) and send it to backend. take response and show updated values in table accordingly and make editmode to false
    let templateData = JSON.stringify(this.state.templateData);
    // templateData = JSON.stringify(templateData);
    // console.log(templateData);

    let dockedProject = this.props.dockedProject[0];
    let body;
    if (dockedProject.project_type === "Design and Build") {
      body = {
        project_id: dockedProject._id,
        type: "Save",
        template: templateData,
        project_type: "Design"
      };
    } else {
      body = {
        project_id: dockedProject._id,
        type: "Save",
        template: templateData,
        project_type: dockedProject.project_type
      };
    }
    this.props.editTemplate(body, this.props.token);

    let bodydata;
    if (dockedProject.project_type === "Design and Build") {
      bodydata = {
        project_id: dockedProject._id,
        prj_type: "Design",
        sub_type: "Estimate"
      };
    } else {
      bodydata = {
        project_id: dockedProject._id,
        prj_type: dockedProject.project_type,
        sub_type: "Estimate"
      };
    }
    this.props.templatePage(bodydata, this.props.token);

    // remove all checkboxes and update state accordingly
    let checkboxes = document.getElementsByName('tickbox');
    for(var a = 0; a < checkboxes.length; a++){
      if(checkboxes[a].checked === true) {
        checkboxes[a].checked = false;
      }
    }
    this.setState({ checkedCheckboxes: [], editmode: false });



    // this.setState({
    //   templateData: JSON.parse(this.props.templateInfo.template),
    //   design_estmt_status: this.props.templateInfo.design_estmt_status
    // });
  }
  // START | FUNCTION TO HANDLE CLICK ON SAVE BUTTON || COMMON FOR SCHEDULE AND MANPOWER




  // START | FUNCTION TO SHIFT A ROW
  handleShiftBtn = () => {
    let mT = this.state.templateData; // mT - modified template
    let checkedCheckboxes = this.state.checkedCheckboxes;

    if(checkedCheckboxes.length === 0) {
      alert('Please select a row to shift');
      return;
    } else if(checkedCheckboxes.length > 1) {
      alert("Please select only one row for Shift operation");
      return;
    }

    let i = checkedCheckboxes[0][0];
    let j = checkedCheckboxes[0][1];
    let k = checkedCheckboxes[0][2];

    if(j === null && k === null) {
      // process
      alert('Shift operation is not valid for Process');
      return;
    } else if(k === null) {
      // task
      // if selected task is first one, it can not be converted into subtask, since it won't have any parent
      if (j === 0) {
        alert('First task cannot be made subtask');
        return;
      } else {
        
        let rowtoshift = mT.Rows[i].tasks[j];
        rowtoshift.type = 'sub_task';

        let thesubtasks;
        if(rowtoshift.sub_tasks === undefined) {
          // rowtoshift doesn't have subtasks
          thesubtasks = rowtoshift;

          let prevsubtasks = [];
          // check if new parent has subtasks
          if(mT.Rows[i].tasks[j-1].sub_tasks !== undefined) {
            prevsubtasks = mT.Rows[i].tasks[j-1].sub_tasks;
          } 
          let finalsubtasks = prevsubtasks.concat(thesubtasks);
          mT.Rows[i].tasks[j-1].sub_tasks = finalsubtasks;

        } else {

          let prevsubtasks = [];
          if(mT.Rows[i].tasks[j-1].sub_tasks !== undefined) {
            prevsubtasks = mT.Rows[i].tasks[j-1].sub_tasks;
          } 

          thesubtasks = rowtoshift.sub_tasks;
          thesubtasks.unshift(rowtoshift);
          let finalsubtasks = prevsubtasks.concat(thesubtasks);
          mT.Rows[i].tasks[j-1].sub_tasks = finalsubtasks;

        }

        mT.Rows[i].tasks.splice(j, 1);
      }

    } else {
      // subtask
      let rowtoshift = mT.Rows[i].tasks[j].sub_tasks[k];
      rowtoshift.type = 'task';
      let removedsubtasks = mT.Rows[i].tasks[j].sub_tasks.splice(k, mT.Rows[i].tasks[j].sub_tasks.length - k);
      removedsubtasks.splice(0, 1);

      rowtoshift.sub_tasks = removedsubtasks;
      mT.Rows[i].tasks.splice(j + 1, 0, rowtoshift); // add row to tasks array

    }


    this.setState({ templateData : mT }, () => {
      let checkboxes = document.getElementsByName('tickbox');
      for(var a = 0; a < checkboxes.length; a++){
        if(checkboxes[a].checked === true) {
          checkboxes[a].checked = false;
        }
      }
      this.setState({ checkedCheckboxes: [] });
    });

  }
  // END | FUNCTION TO SHIFT A ROW




  // START | FUNCTION TO HANDLE DELETE BUTTON
  handleDeleteBtn = () => {
    let mT = this.state.templateData; // mT - modified template
    let checkedCheckboxes = this.state.checkedCheckboxes;

    if(checkedCheckboxes.length === 0) {
      alert('Please select a row to delete');
      return;
    } else if(checkedCheckboxes.length > 1) {
      alert("Please select only one row for Delete operation");
      return;
    }

    let i = checkedCheckboxes[0][0];
    let j = checkedCheckboxes[0][1];
    let k = checkedCheckboxes[0][2];

    if(j === null && k === null) {

      for(let a = i + 1; a < mT.Rows.length; a++) {
        let char = mT.Rows[a].column_data[0];
        let decrementedChar = String.fromCharCode(char.charCodeAt(0) - 1);
        mT.Rows[a].column_data[0] = decrementedChar;
      }
      mT.Rows.splice(i, 1);

    } else if(k === null) {

      for(let a = j + 1; a < mT.Rows[i].tasks.length; a++) {
        let char = mT.Rows[i].tasks[a].column_data[0];
        let decrementedChar = String.fromCharCode(char.charCodeAt(0) - 1);
        mT.Rows[i].tasks[a].column_data[0] = decrementedChar;
      }
      mT.Rows[i].tasks.splice(j, 1);

    } else {

      for(let a = k + 1; a < mT.Rows[i].tasks[j].sub_tasks.length; a++) {
        let char = mT.Rows[i].tasks[j].sub_tasks[a].column_data[0];
        let decrementedChar = String.fromCharCode(char.charCodeAt(0) - 1);
        mT.Rows[i].tasks[j].sub_tasks[a].column_data[0] = decrementedChar;
      }
      mT.Rows[i].tasks[j].sub_tasks.splice(k, 1);

    }

    // HIGHLY IMPORTANT : remove all checks from all checkboxes OR update DOM carefully and update state

    this.setState({ templateData : mT }, () => {
      let checkboxes = document.getElementsByName('tickbox');
      // console.log(checkboxes);
      for(var a = 0; a < checkboxes.length; a++){
        if(checkboxes[a].checked === true) {
          checkboxes[a].checked = false;
        }
      }
      this.setState({ checkedCheckboxes: [] });
    });

  }
  // END | FUNCTION TO HANDLE DELETE BUTTON

  // START | FUNCTION TO HANDLE CLICK ON ADD BUTTON
  handleAddBtn = () => {
    // console.log(this.state.checkedCheckboxes);
    // alert('add btn clicked');
    // check how many checkboxes r checked. if multiple checkboxes r checked, ask the user to check only one checkbox to add a sibling row. if only one checkbox is checked, proceed with sibling row creation.
    // while creating sibling row, the row should be created as immediate sibling, hence indices should be moved by one

    let mT = this.state.templateData; // mT - modified template
    let checkedCheckboxes = this.state.checkedCheckboxes;
    if(checkedCheckboxes.length === 0) {
      alert('Please select a row to add sibling row');
      return;
    } else if(checkedCheckboxes.length > 1) {
      alert("Please select only one row for Add operation");
      return;
    }

    let row = checkedCheckboxes[0];
    let i = row[0];
    let j = row[1];
    let k = row[2];


    if(j === null && k === null) {
      // process
      // while creating a process, create a task with it
      let char = mT.Rows[i].column_data[0];
      let incrementedChar = String.fromCharCode(char.charCodeAt(0) + 1);

      let newProcess = {};
      newProcess.type = 'process';
      newProcess.display_priority = 0;
      newProcess.column_data = [incrementedChar, '', 'New Process', '', '', ''];

      let newTask = {};
      newTask.type = "task";
      newTask.display_priority = 0;
      newTask.column_data = ["1","","","0","0","0"];
      // newTask.manpower = [];
      newTask.manpower = [ {Type: '', Type_name: '', Persons: '', Mandays: '', Total_cost: ''} ];
      newProcess.tasks = [newTask];
      mT.Rows.splice(i + 1, 0, newProcess);

      for(let a = i + 2; a < mT.Rows.length; a++) {
        let char = mT.Rows[a].column_data[0];
        incrementedChar = String.fromCharCode(char.charCodeAt(0) + 1);
        mT.Rows[a].column_data[0] = incrementedChar;
      }


    } else if(k === null) {
      // task
      let char = mT.Rows[i].tasks[j].column_data[0];
      let incrementedChar = String.fromCharCode(char.charCodeAt(0) + 1);

      let newTask = {};
      newTask.type = "task";
      newTask.display_priority = 0;
      newTask.column_data = [incrementedChar,"","New Task","0","0","0"];
      // newTask.manpower = [];
      newTask.manpower = [ {Type: '', Type_name: '', Persons: '', Mandays: '', Total_cost: ''} ];

      mT.Rows[i].tasks.splice(j + 1, 0, newTask);

      for(let a = j + 2; a < mT.Rows[i].tasks.length; a++) {
        let char = mT.Rows[i].tasks[a].column_data[0];
        incrementedChar = String.fromCharCode(char.charCodeAt(0) + 1);
        mT.Rows[i].tasks[a].column_data[0] = incrementedChar;
      }

    } else {
      // sub task
      let char = mT.Rows[i].tasks[j].sub_tasks[k].column_data[0];
      let incrementedChar = String.fromCharCode(char.charCodeAt(0) + 1);

      let newSubtask = {};
      newSubtask.type = "sub_task";
      newSubtask.display_priority = 0;
      newSubtask.column_data = [incrementedChar,"","New Sub-Task","0","0","0"];
      // newSubtask.manpower = [];
      newSubtask.manpower = [ {Type: '', Type_name: '', Persons: '', Mandays: '', Total_cost: ''} ];

      mT.Rows[i].tasks[j].sub_tasks.splice(k + 1, 0, newSubtask);

      for(let a = k + 2; a < mT.Rows[i].tasks[j].sub_tasks.length; a++) {
        let char = mT.Rows[i].tasks[j].sub_tasks[a].column_data[0];
        incrementedChar = String.fromCharCode(char.charCodeAt(0) + 1);
        mT.Rows[i].tasks[j].sub_tasks[a].column_data[0] = incrementedChar;
      }

    }

    // console.log(mT);

    this.setState({templateData : mT});

    // here, I want i, j and k value (row tracing) of single checked checkbox
  }
  // START | FUNCTION TO HANDLE CLICK ON ADD BUTTON

  // START | FUNCTION TO HANDLE ONCHANGE EVENT ON CHECKBOX
  handleCheckboxCheck = (event, i, j, k) => {
    // console.log(event.target.checked); // true or false
    // alert("in handleCheckboxCheck");
    const checkedCheckboxes = this.state.checkedCheckboxes;
    let index;
    if(event.target.checked) {
      checkedCheckboxes.push([i, j, k]);
    } else {
      for(var a = 0; a < checkedCheckboxes.length; a++){
        if(checkedCheckboxes[a][0] === i && checkedCheckboxes[a][1] === j && checkedCheckboxes[a][2] === k) {
          index = a;
        }
      }
      checkedCheckboxes.splice(index, 1);
    }
    this.setState({ checkedCheckboxes });
    // console.log(this.state.checkedCheckboxes);
  }
  // END | FUNCTION TO HANDLE ONCHANGE EVENT ON CHECKBOX



  
  handleEditBtn = () => {
    // const tempDataBeforeEdit = this.state.templateData;
    // tempDataBeforeEdit = Object.assign({}, this.state.templateData);
    // console.log(this.state.templateData);
    // this.setState({ editmode: true, tempDataBeforeEdit });
    this.setState({ editmode: true });
  }

  handleCancelBtn = () => {
    // const templateData = this.state.tempDataBeforeEdit;
    // let templateData = Object.assign({}, tempDataBeforeEdit);
    // this.setState({ editmode: false, templateData });
    // HIGHLY IMPORTANT: ALSO UPDATE TEMPLATE DATA STATE ACCORDINGLY
    // this.setState(this.baseState);
    // to handle cancel: when clicked on edit btn, save the current state in a variable so we have initial state. And if cancel is clicked we can assign that initial state to latest state
    this.setState({ editmode: false });
  }




  // START | FUNCTION TO CALCULATE PLAN END DAY ON ONCHANGE OF 3RD AND 4TH COLUMN
  calculateEndDay = (templateData, i, j, k, l) => {
    let t;
    if( l === null ) { // means a task row
      t = templateData.Rows[i].tasks[j];
    } else {
      t = templateData.Rows[i].tasks[j].sub_tasks[k];
    }
    let endDay = (parseInt(t.column_data[4]) || 0) + (parseInt(t.column_data[3]) || 0) - 1;
    if(endDay === -1) {endDay = 0;}
    return endDay;
  }
  // END | FUNCTION TO CALCULATE PLAN END DAY ON ONCHANGE OF 3RD AND 4TH COLUMN

  // START | FUNCTION TO HANDLE ONCHANGE EVENT ON EACH CELL INPUT [AND SETTING STATE ACCORDINGLY]
  handleInputChange = (event, i, j, k, l) => {
    // console.log(i, j, k, l, event.target.value);

    let templateData = this.state.templateData;
    if( k ===  null && l === null) {
      templateData.Rows[i].column_data[j] = event.target.value;
    } else if(l === null) {
      templateData.Rows[i].tasks[j].column_data[k] = event.target.value;
      // when editing schedule days or plan start days, update end day
      if(k === 3 || k === 4){
        templateData.Rows[i].tasks[j].column_data[5] = this.calculateEndDay(templateData, i, j, k, l);
      }
    } else {
      templateData.Rows[i].tasks[j].sub_tasks[k].column_data[l] = event.target.value;
      if(l === 3 || l === 4) {
        templateData.Rows[i].tasks[j].sub_tasks[k].column_data[5] = this.calculateEndDay(templateData, i, j, k, l);
      }
    }
    this.setState({ templateData });

  }
  // END | FUNCTION TO HANDLE ONCHANGE EVENT ON EACH CELL INPUT


  // START | FUNCTION TO PROPERLY DISPLAY NESTED TABLE DATA
  displayTemplate = () => {
    console.log("displaytemplate function called.", templateData);
    // let templateData = this.state.templateData;
    // let editmode,  = this.state;
    let { editmode, design_estmt_status, templateData } = this.state;
    if(templateData !== null) {
      // console.log(templateData);
      // templateData = JSON.parse(templateData);
      // console.log(templateData);
      let Rows = templateData.Rows;
      let columns = templateData.columns;
      let manpower_columns = templateData.manpower_columns;
      // console.log(Rows, columns, manpower_columns);

      let totalCols = columns.length;
      let colNames = columns.map((col, i) => {
        return (
          <td key={i}>{col}</td>
        )
      });

      // i = process, j = task, k = subtask
      let tableData;
      tableData = Rows.map((process, i) => {
        console.log(process.tasks);
        
        let tasks = process.tasks.map((task, j) => {

          let sub_tasks;
          console.log(task);
          
          if(task.sub_tasks !== undefined) {
            sub_tasks = task.sub_tasks.map((sub_task, k) => {


              return (
                <>
                  <tr key={k}>
                    {sub_task.column_data.map((col, l) => {
                      return (
                        <td key={l} className={l===2 ? 'subtask-row' : null}>
                          {
                            this.state.editmode === true
                            ? 
                              l === 2 || l===3 || l=== 4
                                ? <input type={l === 2 ? 'text' :'number'} value={col} onChange={(e) => this.handleInputChange(e, i, j, k, l)} /> 
                                : l === 0
                                  ? <><Checkbox handleCheckboxCheck={(e) => this.handleCheckboxCheck(e, i, j, k)} />{col}</>
                                  : col
                              
                            : col
                          }
                        </td>
                      )
                    })}
                  </tr>
                </>
              )

            })
          }

          return (
            <React.Fragment key={j}>
              <tr>
               {task.column_data.map((col, ind) => {
                 if(ind==6){
                   return false
                 }
                  return (
                    <td key={ind}>
                      {/* {console.log("asddaa",col,ind)} */}
                      {
                        this.state.editmode === true
                        ? 
                          ind === 2 || ind === 3 || ind === 4
                            ? <input type={ind === 2 ? 'text' :'number'} value={col} onChange={(e) => this.handleInputChange(e, i, j, ind, null)} /> 
                            : ind === 0
                              ? <><Checkbox handleCheckboxCheck={(e) => this.handleCheckboxCheck(e, i, j, null)} />{col}</>
                              : col
                          
                        : <>{col}</>
                      }
                    </td>
                    
                  )
                })} 
              </tr>
              {sub_tasks}
            </React.Fragment>
          )

        })

        return (
          <React.Fragment key={i}>
            <tr className="process-row">
              {process.column_data.map((col, ind) => {
                return (
                  <td key={ind}>
                    {
                      editmode === true
                      ? 
                        ind === 2 
                          ? <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, ind, null, null)} /> 
                          : ind === 0
                            ? <><Checkbox handleCheckboxCheck={(e) => this.handleCheckboxCheck(e, i, null, null)} />{col}</>
                            : col
                        
                      : col
                    }
                  </td>
                )
              })}
            </tr>
            {tasks}
          </React.Fragment>
        )
      });


      return(
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="thead1" colSpan={totalCols + 1}> 
                  {
                    this.state.editmode === true
                    ?
                      <>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.saveEditedForm}>Save <span className="fa fa-save"></span></button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleCancelBtn}>Cancel</button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleShiftBtn}>Shift</button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleAddBtn}>Add <span className="fa fa-plus"></span></button>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleDeleteBtn}>Delete <span className="fa fa-trash"></span></button>
                      </>
                    :
                      design_estmt_status === 'Open'
                      ?
                      <>
                        <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleEditBtn}>Edit <span className="fa fa-pencil"></span></button>
                      </>
                      :
                      null
                      
                  }

                  
                </td>
              </tr>
              <tr className="colNames">
                {colNames}
              </tr>

              {tableData}

            </tbody>
          </table>
        </div>
      )

    }
  }
  // END | FUNCTION TO PROPERLY DISPLAY NESTED TABLE DATA

  ///////////////////////////// END | SCHEDULE TAB FUNCTIONS /////////////////////////////////////////////


  // START | FUNCTION TO HANDLE SUBMIT BUTTON
  handleSubmitBtn = () => {

    let templateData = JSON.stringify(this.state.templateData);
    let dockedProject = this.props.dockedProject[0];

    var body;
    if (dockedProject.project_type == "Design and Build") {
      body = {
        project_id: dockedProject._id,
        type: "Submit",
        template: templateData,
        project_type: "Design"
      };
    } else {
      body = {
        project_id: dockedProject._id,
        type: "Submit",
        template: templateData,
        project_type: dockedProject.project_type
      };
    }
    this.props.editTemplate(body, this.props.token);
    //  this should be remove from here
    let bodydata;
    if (dockedProject.project_type === "Design and Build") {
      bodydata = {
        project_id: dockedProject._id,
        prj_type: "Design",
        sub_type: "Estimate"
      };
    } else {
      bodydata = {
        project_id: dockedProject._id,
        prj_type: dockedProject.project_type,
        sub_type: "Estimate"
      };
    }
    this.props.templatePage(bodydata, this.props.token);

    // this.setState({ design_estmt_status: 'Close' });
    // update the state

  }
  // END | FUNCTION TO HANDLE SUBMIT BUTTON
  //  templatePage should call over here
  gotoNextStage = () => {
    let dockedProject = this.props.dockedProject[0];
    this.props.history.push('/project_plan/design_execution/' + dockedProject.project_id);
  }

  showSubmitOrNext = () => {
    let { editmode, design_estmt_status } = this.state;

    if(editmode === false && design_estmt_status === 'Open') {
      return (
        <button type="button" className="btn btn-outline-dark mybutton submit-btn" onClick={this.handleSubmitBtn}>Submit <span className="fa fa-angle-right"></span></button>
      )
    } 
    else if(editmode === true && design_estmt_status === 'Close') {
      return (
        <>
          <button type="button" className="btn btn-outline-dark mybutton submit-btn" style={{width: 'auto'}} onClick={this.gotoNextStage}>Estimation submitted. Go to Execution <span className="fa fa-angle-right"></span></button>
        </>
      )
    }

  }

  componentWillMount() {
    console.log("DesignEstimation called");
    let projectUrl = this.props.history.location.pathname.split("/");
    let project_id = projectUrl[projectUrl.length-1];
    let bodydata2 = { project_id: project_id };
    this.props.dockTheProject(bodydata2, this.props.token,()=>{
      let dockedProject = this.props.dockedProject[0];
      // This is called in wrong place
    var bodydata;
    if (dockedProject.project_type === "Design and Build") {
      bodydata = {
        project_id: dockedProject._id,
        prj_type: "Design",
        sub_type: "Estimate"
      };
    } else {
      bodydata = {
        project_id: dockedProject._id,
        prj_type: dockedProject.project_type,
        sub_type: "Estimate"
      };
    }

    // Nrupali edited.. Need to import Template
    this.props.templatePage(bodydata, this.props.token,()=>{
     this.setState({templateData: JSON.parse(this.props.templateInfo.template||{})})
     console.log(this.props.templateInfo.template)
    });
    
    // // this.props.fetchUserDesignationList({},this.props.token);
    this.props.fetchUserDesignationList({},this.props.token,()=>{
     this.setState({ design_estmt_status: this.props.templateInfo.design_estmt_status})
     console.log("hello", this.state.design_estmt_status);
     
    });
   

    // this.setState({
    //   // templateData: hardcodedTemplateData,
    //   templateData: JSON.parse(this.props.templateInfo.template),
    //   design_estmt_status: this.props.templateInfo.design_estmt_status,
    //   // designationList: this.props.DesignationList
    // });
    });

    


    
    // console.log(this.state.templateData);
  }

  componentWillReceiveProps = props => {
    if (props.payloadFetchData != null) {
      //console.log(props.payloadFetchData);
      this.setState({ designationData: props.payloadFetchData });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.state.templateData);

    if(this.state.templateData !== prevState.templateData) {
      // console.log('comp updated');
      
    }

    if(this.props.templateInfo !== prevProps.templateInfo) {
      // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOO');
      // console.log(this.props.templateInfo);
      // this.setState({
      //   templateData: JSON.parse(this.props.templateInfo.template),
      //   design_estmt_status: this.props.templateInfo.design_estmt_status
      // });
    }

    // if(this.props.DesignationList !== prevProps.DesignationList) {
    //   // console.log(this.props.DesignationList);
    //   this.setState({ designationList: this.props.DesignationList });
    // }

    
  }


  render() {
    // let { design_estmt_status, editmode } = this.state;
    
    return (
      <>
        <Navbar />
        <LeftSidebar history={this.props.history} />
        <RightSidebar history={this.props.history} />
        <div className="page-container" onClick={this.props.hideProjectSidebar}>

          <h3 className="px-3 py-3">Project Name (Project Id: ) > Design > Estimation <span>(status: {this.state.design_estmt_status})</span></h3>

          {/* START | TABS */}
          <ul className="nav tabs-ul" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#schedule" id="navlinkshow">Schedule</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#manpower" id="navlinkshow">Manpower</a>
            </li>
            {this.showSubmitOrNext()}
          </ul>
          {/* END | TABS */}

          {/* START | TAB CONTENT */}
          <div className="tab-content">
            <div id="schedule" className="tab-pane active">
              {this.displayTemplate()}
            </div>
            <div id="manpower" className="tab-pane fade">
              {this.displayTemplateManpower()}
            </div>
          </div>
          {/* END | TAB CONTENT */}

          

        </div>
      </>  
    )
  }
}

const mapStateToProps = state => {
  console.log("DockedProject called.",state.projectData.dockedProject[0]);
  return {
    token: state.auth.token,
    isLoading: state.utilityLayout.isLoading,
    isServerError: state.utilityLayout.isServerError,
    isServerStatus: state.serverStatus.projectDetailStatus,
    isServerMessage: state.serverStatus.projectDetailMessage,

    dockedProject: state.projectData.dockedProject,
    templateInfo: state.projectData.templatePage,
    // DesignationList: state.serverData.fetchDesignationList,
    payloadFetchData: state.serverData.fetchDesignationList
    
  };
};

export default HOC(
  connect(
    mapStateToProps,
    { dockTheProject, templatePage, hideProjectSidebar, fetchUserDesignationList }
  )(DesignEstimation)
);