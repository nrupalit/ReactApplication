import React from "react";
const totalbox = {
  width: "308px",
  height: "30px",
  float: "left",
  position: "relative",
  marginBottom: "10px",
  marginTop: "5px"
};
const ScheduleBox = props => {
  const formatdate = date => {
    var d = new Date(date);
    console.log(d);

    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };
  let { edit, label, process } = props;
  if (process) {
    var length = 0;
    process.task_list.map(task => (length += 1));
    if (length == 1) {
      console.log("11111");
      var totaldays = process.task_list[0].days ? process.task_list[0].days : 0;
      var start = process.task_list[0].start ? process.task_list[0].start : 0;
      var end = process.task_list[0].end ? process.task_list[0].end : 0;
    } else {
      var totaldays = 0;
      process.task_list.map(
        task => (totaldays += parseInt(task.days) ? parseInt(task.days) : 0)
      );

      let startdays = process.task_list.map(task => task.start ? parseInt(task.start) : 0);
      console.log(startdays)
      var start1
      start1 = startdays[0]
      startdays.map(day => {
        if (day && Date.parse(day) < Date.parse(start1)) {
          start1 = day;
        }
      })
      var start = Math.min(...startdays)
      /* var start = 99999;
      process.task_list.map(pre =>
        parseInt(pre.start) < start ? start = parseInt(pre.start) : start
      ) */
      /*  var start = startdays[1]
         ? startdays.reduce((acc, val) => {
           return acc;
         })
         : null; */
      let enddays = process.task_list.map(task => task.end ? parseInt(task.end) : 0);
      console.log(enddays)
      var end;
      /* process.task_list.map(pre =>

        parseInt(pre.end) > end ? end = parseInt(pre.end) : end

      ) */

      end = Math.max(...enddays)
      /* var end = enddays[1]
        ? enddays.reduce((acc, val) => {
          return val;
        })
        : null; */
      // let newedit = 'edit'+process.column[0];
      // edit = process[newedit];
    }
  }

  return (
    <div
      className="schedule-box-responsive"
      style={{
        ...totalbox,
        border: edit == true ? "1px solid #707070" : "none",
        float: "right",
        width: "450px", //gaurav"22.5%",
        lineHeight: "25px",
        display: "flex",
        flexDirection: "row",
        textAlign: "center"
      }}
    >
      {" "}
      <div className="schedule-box-1-responsive" style={{ width: "150px" }}>
        <label style={{ color: "#2a6cf8" }}>
          {process ? totaldays : label.days}
        </label>
      </div>
      <div style={{ width: "150px" }}>
        <label style={{ color: "#2a6cf8" }}>
          {process ? start : label.start}
        </label>
      </div>
      <div style={{ width: "150px" }}>
        <label style={{ color: "#2a6cf8" }}>{process ? end : label.end}</label>
      </div>
    </div>
  );
};

export default ScheduleBox;
