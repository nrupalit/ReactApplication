import React, { Component } from 'react'
import { CSVLink,CSVDownload } from "react-csv";
export default class ExcelComponent extends Component {
  render() {
    let headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" }
      ];
      
     let data = [
        { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
      ];  
    return (
      <div>
            <CSVLink data={data} headers={headers} 
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank">
            Download me
            </CSVLink>;
      </div>
    )
  }
}
