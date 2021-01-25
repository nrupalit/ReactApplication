import React from "react";
import "./Estimation/estimation.css"
const style = {
  height: "30px",
  display: "inline-flex",
  border: "1px solid black",
  float: "left",
  position: "relative",
  margin: "5px 0px",
  marginBottom: "30px"
};

const ManPowerBox = props => {
  let { edit, process, slabel, mlabel } = props;
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

  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  if (process) {
    var totaldays = 0;
    process.task_list.map(
      task => (totaldays += parseInt(task.days) ? parseInt(task.days) : 0)
    );

    let days = process.task_list.map(task => parseInt(task.days));

    var day = 0;
    process.task_list.map(task => (day += 1));
    if (day == 1) {
      totaldays = parseInt(process.task_list[0].days);
    }

    let startdays = process.task_list.map(task => (task.start) ? parseInt(task.start) : 0);
    console.log(startdays)
    console.log(Math.min(...startdays))

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








    let totalpersons = flatten(
      process.task_list.map(task =>
        task.manpower.map(man =>
          parseInt(man.persons) ? parseInt(man.persons) : 0
        )
      )
    );

    if (days[1] && totalpersons[1]) {
      var persons = totalpersons.reduce((acc, val) => {
        return acc + val;
      });
      let totalmandays = flatten(
        process.task_list.map(task =>
          task.manpower.map(man =>
            parseInt(man.mandays) ? parseInt(man.mandays) : 0
          )
        )
      );
      var mandays = totalmandays.reduce((acc, val) => {
        return acc + val;
      });
      let totalcosts = flatten(
        process.task_list.map(task =>
          task.manpower.map(man =>
            parseInt(man.cost) ? parseInt(man.cost) : 0
          )
        )
      );
      var cost = totalcosts.reduce((acc, val) => {
        return acc + val;
      });
    }
    if (process.task_list.length == 1) {
      var persons = 0;
      var mandays = 0;
      var totalcosts = 0;

      process.task_list[0].manpower.map(
        man => (persons = persons + parseInt(man.persons ? man.persons : 0))
      );
      process.task_list[0].manpower.map(
        man => (mandays = mandays + parseInt(man.mandays ? man.mandays : 0))
      );

      process.task_list[0].manpower.map(
        man => (cost = totalcosts + parseInt(man.cost ? man.cost : 0))
      );
      console.log(persons);
    }
  }

  return (
    <div style={{ width: "100%", float: "right", lineHeight: "25px" }}>
      <div
        id={edit ? "manpowerbox-edit" : ""}
        style={{
          border: edit ? "1px solid #707070" : "none",
          height: "30px",
          float: "right",
          width: edit ? "1000px" : "900px",
          margin: "5px 0px",
          marginBottom: "30px"
        }}
      >
        <div
          style={{
            width: edit ? "400px" : "400px",
            float: "left",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div style={{ textAlign: "center", width: edit ? "100px" : "100px" }}>
            <label style={{ color: "#2a6cf8" }}>
              {process ? totaldays : slabel.days}
            </label>
          </div>
          <div style={{ textAlign: "center", width: edit ? "150px" : "150px" }}>
            <label style={{ color: "#2a6cf8" }}>
              {process ? start : slabel.start}
            </label>
          </div>
          <div style={{ textAlign: "center", width: edit ? "150px" : "150px" }}>
            <label style={{ color: "#2a6cf8" }}>
              {process ? end : slabel.end}
            </label>
          </div>
        </div>
        <div id={edit ? "manpower-right-edit" : ""} style={{ width: edit == true ? "490px" : "350px", float: "right" }}>
          <div
            style={{
              float: "right",
              width: edit ? "30%" : "150px",
              textAlign: "center"
            }}
          >
            <label style={{ color: "#2a6cf8" }}>
              {process ? cost : mlabel.cost}
            </label>
          </div>
          <div
            style={{
              float: "right",
              width: edit ? "20%" : "100px",
              textAlign: "center"
            }}
          >
            <label style={{ color: "#2a6cf8" }}>
              {process ? mandays : mlabel.mandays}
            </label>
          </div>
          <div
            style={{
              float: "right",
              width: edit ? "20%" : "100px",
              textAlign: "center"
            }}
          >
            <label
              style={{
                color: "#2a6cf8"
              }}
            >
              {process ? persons : mlabel.persons}
            </label>
          </div>
        </div>
      </div>
    </div>
    /* <div
      style={{
        ...style,
        width: edit == true ? "58%" : "53%",
        left: edit == true ? "42%" : "48%"
      }}
    >
      <div style={{ width: "52%", float: "left" }}>
        <label style={{ marginLeft: edit ? "17%" : "20%", color: "blue" }}>
          {process ? totaldays : slabel.days}
        </label>
        <label style={{ marginLeft: edit ? "25%" : "35%", color: "blue" }}>
          {process ? start : slabel.start}
        </label>
        <label style={{ marginLeft: edit ? "22%" : "31%", color: "blue" }}>
          {process ? end : slabel.end}
        </label>
      </div>
      <div style={{ width: edit == true ? "585px" : "650px", float: "right" }}>
        <label
          style={{
            marginLeft: edit == true ? "225px" : "205px",
            color: "blue"
          }}
        >
          {process ? persons : mlabel.persons}
        </label>
        <label style={{ marginLeft: edit ? "70px" : "76px", color: "blue" }}>
          {process ? mandays : mlabel.mandays}
        </label>
        <label style={{ marginLeft: edit ? "80px" : "60px", color: "blue" }}>
          {process ? cost : mlabel.cost}
        </label>
      </div>
    </div> */
  );
};
export default ManPowerBox;
