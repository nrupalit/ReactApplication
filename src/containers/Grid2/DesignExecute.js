import React, { Component } from "react";
import { connect } from "react-redux";
import HOC from "HOC/ProjectHOC";
import { dockTheProject, templatePage, hideProjectSidebar, hideResourcesSidebar, fetchUserDesignationList } from "actions/action_authentication";

import Navbar from "components/NavBar/Navbar";
import LeftSidebar from "components/SideBar/left/leftsidebar.jsx";
import RightSidebar from "components/SideBar/right/rightsidebar.jsx";
// import ServerStatus from "Layout/ServerSucess/ServerStatus";
// import Backdrop from "Layout/Backdrop/Backdrop";
// import Spinner from "Layout/Spinner/Spinner";
// import ServerError from "Layout/ServerError/ServerError";
import "./execute.css"
import "./main.css";
// import Checkbox from "./checkbox";
// import thunk from "redux-thunk";

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


let hardcodedTemplateData =
{
    "template_id": 1,
    "template_name": "D & B",
    "columns": [
        "SR",
        "PR",
        "Process / Task",
        "Schedule Days",
        "Plan Date - Start",
        "Plan Date - End",
        "Revised Date - Start",
        "Revised Date - End",
        "Actual Date - Start",
        "Actual Date - End",
        "Completion",
        "Update Comment"
    ],
    "manpower_columns": [
        "Type",
        "Persons",
        "Mandays",
        "Total Cost",
        "Revised Type",
        "Revised Persons",
        "Revised Mandays",
        "Revised Total Cost",
        "Actual Type",
        "Actual Persons",
        "Actual Mandays",
        "Actual Total Cost",
        "Update Comment"
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
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
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
                        2,
                        "2",
                        2,
                        "2",
                        2,
                        50,
                        "Hello"
                    ],
                    "manpower": [
                        {
                            "Type": 2,
                            "Type_name": "Designer 1",
                            "Persons": 1,
                            "Mandays": 3,
                            "Total_cost": 3750,
                            "Revised_Type_name": "Designer 1",
                            "Revised_Persons": 1,
                            "Revised_Mandays": 3,
                            "Revised_Total_cost": 3750,
                            "Actual_Type_name": "Designer 1",
                            "Actual_Persons": 1,
                            "Actual_Mandays": 3,
                            "Actual_Total_cost": 3750,
                            "Update_Comment": "Update"
                        },
                        {
                            "Type": 2,
                            "Type_name": "Designer 1",
                            "Persons": 1,
                            "Mandays": 3,
                            "Total_cost": 3750,
                            "Revised_Type_name": "Designer 1",
                            "Revised_Persons": 1,
                            "Revised_Mandays": 3,
                            "Revised_Total_cost": 3750,
                            "Actual_Type_name": "Designer 1",
                            "Actual_Persons": 1,
                            "Actual_Mandays": 3,
                            "Actual_Total_cost": 3750,
                            "Update_Comment": "Update"
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
                                3,
                                "2",
                                2,
                                "2",
                                2,
                                50,
                                "Hello"
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
                "Pre-Design",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
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
                        8,
                        "2",
                        2,
                        "2",
                        2,
                        50,
                        "Hello"
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
                                3,
                                "2",
                                2,
                                "2",
                                2,
                                50,
                                "Hello"
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
                                    "Type_name": "Designer 1",
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
                                3,
                                "2",
                                2,
                                "2",
                                2,
                                50,
                                "Hello"
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
                        0,
                        "2",
                        2,
                        "2",
                        2,
                        50,
                        "Hello"
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
                                0,
                                "2",
                                2,
                                "2",
                                2,
                                50,
                                "Hello"
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
                "Pre-Design",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
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
                        3,
                        "2",
                        2,
                        "2",
                        2,
                        50,
                        "Hello"
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
                }
            ]
        }
    ]
}



class DesignExecute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateData: null,
            design_estmt_status: null,
            editmode: false,
            maneditmode: false,
            designationData: null
        };
    }

    handleEditBtn = () => {

        const duplicateData = this.state.templateData
        this.setState({
            duplicateData: duplicateData,
            editmode: true
        });
    }

    handleManEditBtn = () => {
        this.setState({
            maneditmode: true
        });
    }

    handleCancelBtn = () => {

        // HIGHLY IMPORTANT: ALSO UPDATE TEMPLATE DATA STATE ACCORDINGLY
        this.setState({
            editmode: false,
            templateData: JSON.parse(this.props.templateInfo.template)
        });
    }

    handleManCancelBtn = () => {
        this.setState({
            maneditmode: false
        })
    }
    // START | FUNCTION TO HANDLE CLICK ON SAVE BUTTON
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
                sub_type: "Execute"
            };
        } else {
            bodydata = {
                project_id: dockedProject._id,
                prj_type: dockedProject.project_type,
                sub_type: "Execute"
            };
        }
        this.props.templatePage(bodydata, this.props.token);

        this.setState({ editmode: false, maneditmode: false });
    }
    // START | FUNCTION TO HANDLE CLICK ON SAVE BUTTON
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
    formatdateday = date => {
        var d = new Date(date);
        console.log(d);

        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [day, month, year].join("-");
    };
    // START | FUNCTION TO HANDLE ONCHANGE EVENT ON EACH CELL INPUT
    handleInputChange = (event, i, j, k, l) => {
        // console.log(i, j, k, l, event.target.value);

        let templateData = this.state.templateData;
        if (k === null && l === null) {
            templateData.Rows[i].column_data[j] = event.target.value;
        } else if (l === null) {
            templateData.Rows[i].tasks[j].column_data[k] = event.target.value;
            if (k == 6 || k == 8) {
                var date = new Date(event.target.value)
                var newDate = new Date()
                var newDate = newDate.setDate(date.getDate() + parseInt(templateData.Rows[i].tasks[j].column_data[3]) - 1)
                console.log(newDate)
                var datevalue = this.formatdate(newDate)
                console.log(datevalue)
                templateData.Rows[i].tasks[j].column_data[k + 1] = datevalue;
            }
        } else {
            templateData.Rows[i].tasks[j].sub_tasks[k].column_data[l] = event.target.value;
            if (l == 6 || l == 8) {
                var date = new Date(event.target.value)
                var newDate = new Date()
                var newDate = newDate.setDate(date.getDate() + parseInt(templateData.Rows[i].tasks[j].sub_tasks[k].column_data[3]) - 1)
                console.log(newDate)
                var datevalue = this.formatdate(newDate)
                console.log(datevalue)
                templateData.Rows[i].tasks[j].sub_tasks[k].column_data[l + 1] = datevalue;
            }
        }
        this.setState({ templateData });

    }
    // END | FUNCTION TO HANDLE ONCHANGE EVENT ON EACH CELL INPUT
    // START MANPOWER INPUT HANDLE
    handleManpowerChange = (event, i, j, k, l) => {
        let templateData = this.state.templateData;
        if (k == null) {
            let newVal = event.target.name;
            templateData.Rows[i].tasks[j].manpower[l][newVal] = event.target.value
        }
        else {
            let newVal = event.target.name;
            templateData.Rows[i].tasks[j].sub_tasks[k].manpower[l][newVal] = event.target.value
        }
        this.setState({ templateData });
    }
    // END MANPOWER INPUT HANDLE
    // START MANPOWER
    displayManpower = () => {
        let templateData = this.state.templateData;
        let editmode = this.state.editmode;
        let maneditmode = this.state.maneditmode;
        if (templateData !== null) {

            let Rows = templateData.Rows;
            let columns = templateData.columns;
            let manpower_columns = templateData.manpower_columns;

            let totalCols = manpower_columns.length + 3;
            let colNames = columns.map((col, i) => {
                if (i < 3)
                    return (
                        <td align="center" key={i}>{col}</td>
                    )
            });
            let mancolNames = manpower_columns.map((col, i) => {
                if (i > 3 && i < 12) {
                    let c = col.split(" ")
                    return (
                        <td align="center" key={i}>{c[1]}</td>
                    )
                }
                return (
                    <td align="center" key={i}>{col}</td>
                )
            });

            // i = process, j = task, k = subtask
            let tableData;
            tableData = Rows.map((process, i) => {

                let tasks = process.tasks.map((task, j) => {

                    let sub_tasks;
                    if (task.sub_tasks !== undefined) {
                        sub_tasks = task.sub_tasks.map((sub_task, k) => {

                            return (
                                <React.Fragment key={k}>
                                    <tr style={{ color: "rgb(120, 132, 158)" }} className="row-table">
                                        {sub_task.column_data.map((col, l) => {
                                            if (l < 3)
                                                return (
                                                    <td key={l} className={l === 2 ? 'subtask-row' : null}
                                                        rowSpan={sub_task.manpower.length} >
                                                        {col}
                                                    </td>
                                                )
                                        })}
                                        <td key={1}>{sub_task.manpower[0].Type_name}</td>
                                        <td key={2}>{sub_task.manpower[0].Persons}</td>
                                        <td key={3}>{sub_task.manpower[0].Mandays}</td>
                                        <td key={4}>{sub_task.manpower[0].Total_cost}</td>
                                        <td key={1}>
                                                {this.state.maneditmode ?
                                                <select onChange={e => this.handleSelectList(e, i, j, k, 0,"Revised")}>
                                                    <option value="Choose Manpower">Choose Manpower</option>
                                                {this.state.designationData != null &&
                                                    this.state.designationData.map((designation, index) =>
                                                    sub_task.manpower[0].Revised_Type_name == designation.designation ? (
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
                                                </select> : sub_task.manpower[0].Revised_Type_name 
                                                }
                                            </td>
                                        <td align="center">
                                            {maneditmode == true ? <input type="number" value={sub_task.manpower[0].Revised_Persons}
                                                onChange={e => this.handleManpowerChange(e, i, j, k, 0)} className="manpower-input"
                                                name={"Revised_Persons"}>

                                            </input> : sub_task.manpower[0].Revised_Persons}
                                        </td>
                                        <td align="center">
                                            {maneditmode == true ? <input type="number" value={sub_task.manpower[0].Revised_Mandays}
                                                onChange={e => this.handleManpowerChange(e, i, j, k, 0)} className="manpower-input"
                                                name={"Revised_Mandays"}>

                                            </input> : sub_task.manpower[0].Revised_Mandays}
                                        </td>
                                        <td key={4}>
                                        {this.state.maneditmode ? 
                                            (
                                            this.state.designationData != null &&
                                            this.state.designationData.map((designation, index) => {
                                                return (
                                                sub_task.manpower[0].Revised_Type_name == designation.designation ? (
                                                <input type="text" disabled="true" value={sub_task.manpower[0].Revised_Total_cost=designation.cost*sub_task.manpower[0].Revised_Persons*sub_task.manpower[0].Revised_Mandays} />
                                                ) : null
                                            
                                            )
                                                })
                                            ) : sub_task.manpower[0].Revised_Total_cost}
                                        </td>
                                        <td key={1}>
                                                {this.state.maneditmode ?
                                                <select onChange={e => this.handleSelectList(e, i, j, k, 0,"Actual")}>
                                                    <option value="Choose Manpower">Choose Manpower</option>
                                                {this.state.designationData != null &&
                                                    this.state.designationData.map((designation, index) =>
                                                    sub_task.manpower[0].Actual_Type_name == designation.designation ? (
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
                                                </select> : sub_task.manpower[0].Actual_Type_name 
                                                }
                                            </td>
                                        <td align="center">
                                            {maneditmode == true ? <input type="number" value={sub_task.manpower[0].Actual_Persons}
                                                onChange={e => this.handleManpowerChange(e, i, j, k, 0)} className="manpower-input"
                                                name={"Actual_Persons"}>

                                            </input> : sub_task.manpower[0].Actual_Persons}
                                        </td>
                                        <td align="center">
                                            {maneditmode == true ? <input type="number" value={sub_task.manpower[0].Actual_Mandays}
                                                onChange={e => this.handleManpowerChange(e, i, j, k, 0)} className="manpower-input"
                                                name={"Actual_Mandays"}>

                                            </input> : sub_task.manpower[0].Actual_Mandays}
                                        </td>
                                        <td key={4}>
                                        {this.state.maneditmode ? 
                                            (
                                            this.state.designationData != null &&
                                            this.state.designationData.map((designation, index) => {
                                                return (
                                                sub_task.manpower[0].Actual_Type_name == designation.designation ? (
                                                <input type="text" disabled="true" value={sub_task.manpower[0].Actual_Total_cost=designation.cost*sub_task.manpower[0].Actual_Persons*sub_task.manpower[0].Actual_Mandays} />
                                                ) : null
                                            
                                            )
                                                })
                                            ) : sub_task.manpower[0].Actual_Total_cost}
                                        </td>
                                        <td align="center">
                                            {maneditmode == true ? <input type="text" value={sub_task.manpower[0].Update_Comment}
                                                onChange={e => this.handleManpowerChange(e, i, j, k, 0)} className="manpower-input"
                                                name={"Update_Comment"}>

                                            </input> : sub_task.manpower[0].Update_Comment}
                                        </td>
                                    </tr>
                                    {sub_task.manpower.length > 1 ?
                                        sub_task.manpower.map((col, index) => {
                                            if (index > 0)
                                                return (
                                                    <tr key={index} style={{ color: "rgb(120, 132, 158)" }} className="row-table">
                                                        <td key={1}>{col.Type_name}</td>
                                                        <td key={2}>{col.Persons}</td>
                                                        <td key={3}>{col.Mandays}</td>
                                                        <td key={4}>{col.Total_cost}</td>
                                                        <td key={1}>
                                                            {this.state.maneditmode ?
                                                            <select onChange={e => this.handleSelectList(e, i, j, k, index,"Revised")}>
                                                                <option value="Choose Manpower">Choose Manpower</option>
                                                            {this.state.designationData != null &&
                                                                this.state.designationData.map((designation, index) =>
                                                                    col.Revised_Type_name == designation.designation ? (
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
                                                            </select> : col.Revised_Type_name 
                                                            }
                                                        </td>
                                                        <td align="center">
                                                            {maneditmode == true ? <input type="number" value={col.Revised_Persons}
                                                                onChange={e => this.handleManpowerChange(e, i, j, k, index)}
                                                                className="manpower-input"
                                                                name={"Revised_Persons"}>

                                                            </input> : col.Revised_Persons}
                                                        </td>
                                                        <td align="center">
                                                            {maneditmode == true ? <input type="number" value={col.Revised_Mandays}
                                                                onChange={e => this.handleManpowerChange(e, i, j, k, index)}
                                                                className="manpower-input"
                                                                name={"Revised_Mandays"}>

                                                            </input> : col.Revised_Mandays}
                                                        </td>
                                                        <td key={4}>
                                                            {this.state.maneditmode ? 
                                                                (
                                                                this.state.designationData != null &&
                                                                this.state.designationData.map((designation, index) => {
                                                                    return (
                                                                    col.Revised_Type_name == designation.designation ? (
                                                                    <input type="text" disabled="true" value={col.Revised_Total_cost=designation.cost*col.Revised_Persons*col.Revised_Mandays} />
                                                                    ) : null
                                                                
                                                                )
                                                                    })
                                                                ) : col.Revised_Total_cost}
                                                        </td>
                                                        <td key={1}>
                                                            {this.state.maneditmode ?
                                                            <select onChange={e => this.handleSelectList(e, i, j, k, index,"Actual")}>
                                                                <option value="Choose Manpower">Choose Manpower</option>
                                                            {this.state.designationData != null &&
                                                                this.state.designationData.map((designation, index) =>
                                                                    col.Actual_Type_name == designation.designation ? (
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
                                                            </select> : col.Actual_Type_name 
                                                            }
                                                        </td>
                                                        <td align="center">
                                                            {maneditmode == true ? <input type="number" value={col.Actual_Persons}
                                                                onChange={e => this.handleManpowerChange(e, i, j, k, index)}
                                                                className="manpower-input"
                                                                name={"Actual_Persons"}>

                                                            </input> : col.Actual_Persons}
                                                        </td>
                                                        <td align="center">
                                                            {maneditmode == true ? <input type="number" value={col.Actual_Mandays}
                                                                onChange={e => this.handleManpowerChange(e, i, j, k, index)}
                                                                className="manpower-input"
                                                                name={"Actual_Mandays"}>

                                                            </input> : col.Actual_Mandays}
                                                        </td>
                                                        <td key={4}>
                                                            {this.state.maneditmode ? 
                                                                (
                                                                this.state.designationData != null &&
                                                                this.state.designationData.map((designation, index) => {
                                                                    return (
                                                                    col.Actual_Type_name == designation.designation ? (
                                                                    <input type="text" disabled="true" value={col.Actual_Total_cost=designation.cost*col.Actual_Persons*col.Actual_Mandays} />
                                                                    ) : null
                                                                
                                                                )
                                                                    })
                                                                ) : col.Actual_Total_cost}
                                                        </td>
                                                        <td align="center">
                                                            {maneditmode == true ? <input type="text" value={col.Update_Comment}
                                                                onChange={e => this.handleManpowerChange(e, i, j, k, index)}
                                                                className="manpower-input"
                                                                name={"Update_Comment"}>

                                                            </input> : col.Update_Comment}
                                                        </td>
                                                    </tr>
                                                )
                                        })
                                        : null}
                                </React.Fragment>
                            )

                        })
                    }

                    return (
                        <React.Fragment key={j}>

                            <tr style={{ color: "rgb(120, 132, 158)" }} className="row-table">
                                {task.column_data.map((col, ind) => {

                                    if (ind < 3) {
                                        return (
                                            <td key={ind} rowSpan={task.manpower.length} >

                                                {col}
                                            </td>
                                        )
                                    }
                                })}
                                <td key={1}>{task.manpower[0].Type_name}</td>
                                <td key={2}>{task.manpower[0].Persons}</td>
                                <td key={3}>{task.manpower[0].Mandays}</td>
                                <td key={4}>{task.manpower[0].Total_cost}</td>
                                <td key={1}>
                                    {this.state.maneditmode ?
                                    <select onChange={e => this.handleSelectList(e, i, j, null, 0,"Revised")}>
                                        <option value="Choose Manpower">Choose Manpower</option>
                                    {this.state.designationData != null &&
                                        this.state.designationData.map((designation, index) =>
                                            task.manpower[0].Revised_Type_name == designation.designation ? (
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
                                    </select> : task.manpower[0].Revised_Type_name 
                                    }
                                </td>
                                <td align="center">
                                    {maneditmode == true ? <input type="number" value={task.manpower[0].Revised_Persons}
                                        onChange={e => this.handleManpowerChange(e, i, j, null, 0)}
                                        className="manpower-input"
                                        name={"Revised_Persons"}>

                                    </input> : task.manpower[0].Revised_Persons}
                                </td>
                                <td align="center">
                                    {maneditmode == true ? <input type="number" value={task.manpower[0].Revised_Mandays}
                                        onChange={e => this.handleManpowerChange(e, i, j, null, 0)}
                                        className="manpower-input"
                                        name={"Revised_Mandays"}>

                                    </input> : task.manpower[0].Revised_Mandays}
                                </td>
                                <td key={4}>
                                    {this.state.maneditmode ? 
                                    (
                                    this.state.designationData != null &&
                                    this.state.designationData.map((designation, index) => {
                                        return (
                                        task.manpower[0].Revised_Type_name == designation.designation ? (
                                        <input type="text" disabled="true" value={task.manpower[0].Revised_Total_cost=designation.cost*task.manpower[0].Revised_Persons*task.manpower[0].Revised_Mandays} />
                                        ) : null
                                    
                                    )
                                        })
                                    ) : task.manpower[0].Revised_Total_cost}
                                </td>
                                <td key={1}>
                                    {this.state.maneditmode ?
                                    <select onChange={e => this.handleSelectList(e, i, j, null, 0,"Actual")}>
                                        <option value="Choose Manpower">Choose Manpower</option>
                                    {this.state.designationData != null &&
                                        this.state.designationData.map((designation, index) =>
                                            task.manpower[0].Actual_Type_name == designation.designation ? (
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
                                    </select> : task.manpower[0].Actual_Type_name 
                                    }
                                </td>
                                <td align="center">
                                    {maneditmode == true ? <input type="number" value={task.manpower[0].Actual_Persons}
                                        onChange={e => this.handleManpowerChange(e, i, j, null, 0)}
                                        className="manpower-input"
                                        name={"Actual_Persons"}>

                                    </input> : task.manpower[0].Actual_Persons}
                                </td>
                                <td align="center">
                                    {maneditmode == true ? <input type="number" value={task.manpower[0].Actual_Mandays}
                                        onChange={e => this.handleManpowerChange(e, i, j, null, 0)}
                                        className="manpower-input"
                                        name={"Actual_Mandays"}>

                                    </input> : task.manpower[0].Actual_Mandays}
                                </td>
                                <td key={4}>
                                    {this.state.maneditmode ? 
                                    (
                                    this.state.designationData != null &&
                                    this.state.designationData.map((designation, index) => {
                                        return (
                                        task.manpower[0].Actual_Type_name == designation.designation ? (
                                        <input type="text" disabled="true" value={task.manpower[0].Actual_Total_cost=designation.cost*task.manpower[0].Actual_Persons*task.manpower[0].Actual_Mandays} />
                                        ) : null
                                    
                                    )
                                        })
                                    ) : task.manpower[0].Actual_Total_cost}
                                </td>
                                <td align="center">
                                    {maneditmode == true ? <input type="text" value={task.manpower[0].Update_Comment}
                                        onChange={e => this.handleManpowerChange(e, i, j, null, 0)}
                                        className="manpower-input"
                                        name={"Update_Comment"}>

                                    </input> : task.manpower[0].Update_Comment}
                                </td>
                            </tr>
                            {task.manpower.length > 1 ?
                                task.manpower.map((col, index) => {
                                    if (index > 0)
                                        return (<tr key={index} style={{ color: "rgb(120, 132, 158)" }} className="row-table">
                                           <td key={1}>{col.Type_name}</td>
                                            <td key={2}>{col.Persons}</td>
                                            <td key={3}>{col.Mandays}</td>
                                            <td key={4}>{col.Total_cost}</td>
                                            {/* <td >
                                                {editmode == true ? <input type="text" value={col.Revised_Type_name}
                                                    onChange={e => this.handleManpowerChange(e, i, j, null, index)}
                                                    className="manpower-input"
                                                    name={"Revised_Type_Name"}>

                                                </input> : col.Revised_Type_name}
                                            </td> */}
                                            <td key={1}>
                                                {this.state.maneditmode ?
                                                <select onChange={e => this.handleSelectList(e, i, j, null, index,"Revised")}>
                                                    <option value="Choose Manpower">Choose Manpower</option>
                                                {this.state.designationData != null &&
                                                    this.state.designationData.map((designation, index) =>
                                                        col.Revised_Type_name == designation.designation ? (
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
                                                </select> : col.Revised_Type_name 
                                                }
                                            </td>
                                            <td align="center">
                                                {maneditmode == true ? <input type="number" value={col.Revised_Persons}
                                                    onChange={e => this.handleManpowerChange(e, i, j, null, index)}
                                                    className="manpower-input"
                                                    name={"Revised_Persons"}>

                                                </input> : col.Revised_Persons}
                                            </td>
                                            <td align="center">
                                                {maneditmode == true ? <input type="number" value={col.Revised_Mandays}
                                                    onChange={e => this.handleManpowerChange(e, i, j, null, index)}
                                                    className="manpower-input"
                                                    name={"Revised_Mandays"}>

                                                </input> : col.Revised_Mandays}
                                            </td>
                                            <td key={4}>
                                                {this.state.maneditmode ? 
                                                (
                                                this.state.designationData != null &&
                                                this.state.designationData.map((designation, index) => {
                                                    return (
                                                    col.Revised_Type_name == designation.designation ? (
                                                    <input type="text" disabled="true" value={col.Revised_Total_cost=designation.cost*col.Revised_Persons*col.Revised_Mandays} />
                                                    ) : null
                                                
                                                )
                                                    })
                                                ) : col.Revised_Total_cost}
                                            </td>
                                            <td key={1}>
                                                {this.state.maneditmode ?
                                                <select onChange={e => this.handleSelectList(e, i, j, null, index,"Actual")}>
                                                    <option value="Choose Manpower">Choose Manpower</option>
                                                {this.state.designationData != null &&
                                                    this.state.designationData.map((designation, index) =>
                                                        col.Actual_Type_name == designation.designation ? (
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
                                                </select> : col.Actual_Type_name 
                                                }
                                            </td>
                                            <td align="center">
                                                {maneditmode == true ? <input type="number" value={col.Actual_Persons}
                                                    onChange={e => this.handleManpowerChange(e, i, j, null, index)}
                                                    className="manpower-input"
                                                    name={"Actual_Persons"}>

                                                </input> : col.Actual_Persons}
                                            </td>
                                            <td align="center">
                                                {maneditmode == true ? <input type="number" value={col.Actual_Mandays}
                                                    onChange={e => this.handleManpowerChange(e, i, j, null, index)}
                                                    className="manpower-input"
                                                    name={"Actual_Mandays"}>

                                                </input> : col.Actual_Mandays}
                                            </td>
                                            <td key={4}>
                                                {this.state.maneditmode ? 
                                                (
                                                this.state.designationData != null &&
                                                this.state.designationData.map((designation, index) => {
                                                    return (
                                                    col.Actual_Type_name == designation.designation ? (
                                                    <input type="text" disabled="true" value={col.Actual_Total_cost=designation.cost*col.Actual_Persons*col.Actual_Mandays} />
                                                    ) : null
                                                
                                                )
                                                    })
                                                ) : col.Actual_Total_cost}
                                            </td>
                                            <td align="center">
                                                {maneditmode == true ? <input type="text" value={col.Update_Comment}
                                                    onChange={e => this.handleManpowerChange(e, i, j, null, index)}
                                                    className="manpower-input"
                                                    name={"Update_Comment"}>

                                                </input> : col.Update_Comment}
                                            </td>
                                        </tr>)
                                })
                                : null}


                            {/* <tr>
                                {task.column_data.map((col, ind) => {
                                    if (ind < 3) {
                                        return (
                                            <td key={ind} rowSpan={task.manpower.length}>

                                                {col}
                                            </td>
                                        )
                                    }
                                })}
                            </tr>

                            {
                                task.manpower.map((col, index) => {
                                    if (index == 0) {
                                        return (
                                            <>
                                                <td>
                                                    {col.Type_name}
                                                </td>
                                                <td>
                                                    {col.Persons}
                                                </td>
                                                <td>
                                                    {col.Mandays}
                                                </td>
                                                <td>
                                                    {col.Total_cost}
                                                </td>
                                                <td >
                                                    {col.Revised_Type_name}
                                                </td>
                                                <td>
                                                    {col.Revised_Persons}
                                                </td>
                                                <td>
                                                    {col.Revised_Mandays}
                                                </td>
                                                <td>
                                                    {col.Revised_Total_cost}
                                                </td>
                                                <td >
                                                    {col.Actual_Type_name}
                                                </td>
                                                <td>
                                                    {col.Actual_Persons}
                                                </td>
                                                <td>
                                                    {col.Actual_Mandays}
                                                </td>
                                                <td>
                                                    {col.Actual_Total_cost}
                                                </td>

                                            </>
                                        )
                                    }
                                    else {
                                        return (
                                            <tr>
                                                <td>
                                                    {col.Type_name}
                                                </td>
                                                <td>
                                                    {col.Persons}
                                                </td>
                                                <td>
                                                    {col.Mandays}
                                                </td>
                                                <td>
                                                    {col.Total_cost}
                                                </td>
                                                <td >
                                                    {col.Revised_Type_name}
                                                </td>
                                                <td>
                                                    {col.Revised_Persons}
                                                </td>
                                                <td>
                                                    {col.Revised_Mandays}
                                                </td>
                                                <td>
                                                    {col.Revised_Total_cost}
                                                </td>
                                                <td >
                                                    {col.Actual_Type_name}
                                                </td>
                                                <td>
                                                    {col.Actual_Persons}
                                                </td>
                                                <td>
                                                    {col.Actual_Mandays}
                                                </td>
                                                <td>
                                                    {col.Actual_Total_cost}
                                                </td>

                                            </tr>
                                        )
                                    }
                                })

                            }
 */}


                            {sub_tasks}
                        </React.Fragment>
                    )

                })

                return (
                    <React.Fragment key={i}>
                        <tr className="process-row">
                            {process.column_data.map((col, ind) => {
                                if (ind < 16)
                                    return (
                                        <td key={ind}>
                                            {
                                                col
                                            }
                                            {/* {col}
                    {ind === 2 
                      ? <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, ind, null, null)} /> 
                      : null
                    } */}
                                        </td>
                                    )
                            })}
                        </tr>
                        {tasks}
                    </React.Fragment>
                )
            });


            return (
                <div className="table-responsive">
                    <table className="table table-bordered" style={{ color: "#454f63" }}>
                        <tbody>
                            <tr>
                                <td className="thead1" colSpan={totalCols} >

                                    {
                                        maneditmode === true
                                            ?
                                            <>
                                                <button type="button" onClick={this.saveEditedForm} className="btn btn-outline-dark mybutton">Save <span className="fa fa-save"></span></button>

                                                <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleManCancelBtn}>Cancel</button>
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
                                <td colSpan={3}></td>
                                <td colSpan={4} align="center">Plan</td>
                                <td colSpan={4} align="center">Revised</td>
                                <td colSpan={4} align="center">Actual</td>
                                <td></td>
                            </tr>
                            <tr className="colNames">
                                {colNames}
                                {mancolNames}
                            </tr>

                            {tableData}

                        </tbody>
                    </table>
                </div>
            )

        }
    }
    // END MANPOWER

    // START | FUNCTION TO PROPERLY DISPLAY NESTED TABLE DATA
    displayTemplate = () => {
        let templateData = this.state.templateData;
        let editmode = this.state.editmode;
        if (templateData !== null) {

            let Rows = templateData.Rows;
            let columns = templateData.columns;
            let manpower_columns = templateData.manpower_columns;

            let totalCols = columns.length;
            let colNames = columns.map((col, i) => {
                if (i > 3 && i < 10) {
                    let c = col.split(" - ")
                    return (
                        <td key={i} align="center">{c[1]}</td>
                    )
                }
                return (
                    <td key={i} align="center">{col}</td>
                )
            });

            // i = process, j = task, k = subtask
            let tableData;
            tableData = Rows.map((process, i) => {

                let tasks = process.tasks.map((task, j) => {

                    let sub_tasks;
                    if (task.sub_tasks !== undefined) {
                        sub_tasks = task.sub_tasks.map((sub_task, k) => {

                            return (
                                <tr key={k} className="row-table">
                                    {sub_task.column_data.map((col, l) => {
                                        return (
                                            <td align={l > 2 ? "center" : "left"} key={l} className={l === 2 ? 'subtask-row' : null}
                                                style={{ color: "rgb(120, 132, 158)" }}>
                                                {editmode == true && l > 5 && l < 10 ? <input type="date" value={col}
                                                    style={{ color: "rgb(120, 132, 158)" }}
                                                    onChange={(e) => this.handleInputChange(e, i, j, k, l)} /> : editmode == true &&
                                                        l == 10 ? <input type="number" value={col}
                                                            onChange={(e) => this.handleInputChange(e, i, j, k, l)} /> :
                                                        editmode == true &&
                                                            l > 5 ? <input type="text" value={col}
                                                                onChange={(e) => this.handleInputChange(e, i, j, k, l)} /> : l == 10 ?
                                                                <div className="progress" style={{ height: "20px" }}>
                                                                    <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                                        aria-valuemin="0" aria-valuemax="100"
                                                                        style={{
                                                                            width: col + "%", backgroundColor: "rgb(120, 132, 158)"

                                                                        }}>
                                                                        {col}%
  </div>
                                                                </div>
                                                                : (l > 5 && l < 10) && col != ""
                                                                    ? this.formatdateday(new Date(col)) : col}

                                            </td>
                                        )
                                    })}
                                </tr>
                            )

                        })
                    }

                    return (
                        <React.Fragment key={j}>
                            <tr className="row-table">
                                {task.column_data.map((col, ind) => {
                                    if (ind < 12)
                                        return (
                                            <td align={ind > 2 ? "center" : "left"} key={ind} style={{
                                                color: "rgb(120, 132, 158)",

                                            }} >

                                                {editmode == true && ind > 5 && ind < 10 ? <input type="date" value={col}
                                                    style={{ color: "rgb(120, 132, 158)" }}
                                                    onChange={(e) => this.handleInputChange(e, i, j, ind, null)} /> : editmode == true &&
                                                        ind == 10 ? <input type="number" value={col}
                                                            onChange={(e) => this.handleInputChange(e, i, j, ind, null)} /> :
                                                        editmode == true && ind > 5
                                                            ? <input type="text" value={col}
                                                                onChange={(e) => this.handleInputChange(e, i, j, ind, null)} /> : ind == 10 ?
                                                                <div className="progress" style={{ height: "20px" }}>
                                                                    <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                                        aria-valuemin="0" aria-valuemax="100"
                                                                        style={{
                                                                            width: col + "%", backgroundColor: "rgb(120, 132, 158)"

                                                                        }}>
                                                                        {col}%
</div>
                                                                </div>
                                                                : (ind > 5 && ind < 10) && col != ""
                                                                    ? this.formatdateday(new Date(col)) : col}
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
                                if (ind < 12) {
                                    return (
                                        <td key={ind}>
                                            {
                                                col
                                            }
                                            {/* {col}
                {ind === 2 
                  ? <input type="text" value={col} onChange={(e) => this.handleInputChange(e, i, ind, null, null)} /> 
                  : null
                } */}
                                        </td>
                                    )
                                }
                            })}
                        </tr>
                        {tasks}
                    </React.Fragment>
                )
            });


            return (
                <div className="table-responsive" id="Schedule_Table">
                    <table className="table table-bordered" style={{ color: "#454f63" }}>
                        <tbody>
                            <tr>
                                <td className="thead1" colSpan={totalCols}>

                                    {
                                        editmode === true
                                            ?
                                            <>
                                                <button type="button" className="btn btn-outline-dark mybutton" onClick={this.saveEditedForm}>Save <span className="fa fa-save"></span></button>

                                                <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleCancelBtn}>Cancel</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-outline-dark mybutton">Submit <span className="fa fa-angle-right"></span></button>

                                                <button type="button" className="btn btn-outline-dark mybutton" onClick={this.handleEditBtn}>Edit <span className="fa fa-pencil"></span></button>
                                            </>
                                    }


                                </td>
                            </tr>
                            <tr className="colNames">
                                <td colSpan={4}>

                                </td>
                                <td colSpan={2} align="center">Plan Date</td>
                                <td colSpan={2} align="center">Revised Date</td>
                                <td colSpan={2} align="center">Actual Date</td>
                                <td colSpan={2}></td>

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

    handleSelectList = (e, i, j, k, a, type) => {
        let modifiedTemplateData = this.state.templateData;
        let processes = modifiedTemplateData.Rows;

        let process = processes[i];
        let task = process.tasks[j];
        let manpowerData = this.state.designationData;

        let typeName, persons, mandays, totalCost;

        if(type === "Plan") {
            typeName = "Type_name";
            persons = "Persons";
            mandays = "Mandays";
            totalCost = "Total_cost";
        }
        else if(type === "Revised") {
            typeName = "Revised_Type_name";
            persons = "Revised_Persons";
            mandays = "Revised_Mandays";
            totalCost = "Revised_Total_cost";
        }
        else if(type === "Actual") {
            typeName = "Actual_Type_name";
            persons = "Actual_Persons";
            mandays = "Actual_Mandays";
            totalCost = "Actual_Total_cost";
        }

        if(k == null) {
            task.manpower[a][typeName] = e.target.value;
            for(let b = 0; b < manpowerData.length; b++) {
            if(manpowerData[b].designation == e.target.value) {
                task.manpower[a][totalCost] = manpowerData[b].cost * task.manpower[a][persons] * task.manpower[a][mandays];
            }
            }
        }
        else {
            let sub_task = task.sub_tasks[k];
            sub_task.manpower[a][typeName] = e.target.value;
            for(let b = 0; b < manpowerData.length; b++) {
            if(manpowerData[b].designation == e.target.value) {
                sub_task.manpower[a][totalCost] = manpowerData[b].cost * sub_task.manpower[a][persons] * sub_task.manpower[a][mandays];
            }
            }
        }

        this.setState({ templateData: modifiedTemplateData});
        }
        
    componentDidMount() {
        let projectUrl = this.props.history.location.pathname.split("/");
        let project_id = projectUrl[projectUrl.length - 1];
        let bodydata2 = { project_id: project_id };
        this.props.dockTheProject(bodydata2, this.props.token);

        /* let dockedProject = this.props.dockedProject[0];
        var bodydata;
        if (dockedProject.project_type == "Design and Build") {
            bodydata = {
                project_id: dockedProject._id,
                prj_type: "Design",
                sub_type: "Execute"
            };
        }
        else {
            bodydata = {
                project_id: dockedProject._id,
                prj_type: dockedProject.project_type,
                sub_type: "Execute"
            };
        }


        this.props.templatePage(bodydata, this.props.token);
 */

        this.props.fetchUserDesignationList({},this.props.token);
        this.setState({
            //templateData: JSON.parse(this.props.templateInfo.template),
            templateData: hardcodedTemplateData, // using hardcoded data to test restructured template data
            //  design_estmt_status: this.props.templateInfo.design_estmt_status
        });

    }

    componentWillReceiveProps = props => {
        if (props.payloadFetchData != null) {
          //console.log(props.payloadFetchData);
          this.setState({ designationData: props.payloadFetchData });
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.templateData !== prevState.templateData) {
            // console.log('comp updated');

            // let temData = this.state.templateData;
            // if(temData) {
            //   // temData = JSON.parse(temData);
            //   this.prepareState(temData.Rows, temData.columns);
            //   // let organizedTempData = this.prepareState2(temData.Rows, temData.columns);
            //   // this.setState({organizedTempData});
            // }
        }
    }


    render() {
        // console.log(this.state.templateData);
        // let temData = this.state.templateData;
        let temData = this.state.templateData;
        // let editmode = this.state.templateData;

        return (
            <>
                <Navbar />
                <LeftSidebar history={this.props.history} />
                <RightSidebar history={this.props.history} />
                <div className="page-container" onClick={(e) => { this.props.hideProjectSidebar(); this.props.hideResourcesSidebar() }}>

                    <h3 className="px-3 py-3">Project Name (Project Id: ) > Design > Execution <span>(status: {this.state.design_estmt_status})</span></h3>

                    {/* START | TABS */}
                    <ul className="nav tabs-ul" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#schedule" id="navlinkshow">Schedule</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#manpower" id="navlinkshow">Manpower</a>
                        </li>
                    </ul>
                    {/* END | TABS */}

                    {/* START | TAB CONTENT */}
                    <div className="tab-content">
                        <div id="schedule" className="tab-pane active">

                            {this.displayTemplate()}

                        </div>
                        <div id="manpower" className="tab-pane fade">
                            <div id="manpower" className="tab-pane">

                                {this.displayManpower()}

                            </div>
                        </div>
                    </div>
                    {/* END | TAB CONTENT */}



                </div>
            </>
        )
    }
}

const mapStateToProps = state => {

    return {
        token: state.auth.token,
        isLoading: state.utilityLayout.isLoading,
        isServerError: state.utilityLayout.isServerError,
        isServerStatus: state.serverStatus.projectDetailStatus,
        isServerMessage: state.serverStatus.projectDetailMessage,
        // projectData: state.projectData.project,
        // isDock: state.projectData.dockProject,
        dockedProject: state.projectData.dockedProject,
        payloadFetchData: state.serverData.fetchDesignationList,
        // auth: state.auth,
        // newProject: state.projectData.newProject,
        templateInfo: state.projectData.templatePageExec

    };
};

export default HOC(
    connect(
        mapStateToProps,
        { dockTheProject, templatePage, hideProjectSidebar, hideResourcesSidebar, fetchUserDesignationList }
    )(DesignExecute)
);
